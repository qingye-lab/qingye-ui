import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Heading, Text } from "../src/components/typography";
import { TEXT_STEPS } from "../src/text-steps";

test.each([1, 2, 3, 4, 5, 6] as const)("h%s keeps its semantic level independently of the title visual step", level => {
  render(<Heading level={level} step="title">标题</Heading>);
  const heading = screen.getByRole("heading", { level });
  expect(heading.tagName).toBe(`H${level}`);
  expect(heading).toHaveClass("text-title");
  expect(heading).not.toHaveAttribute("aria-level");
});

test("changing the visual step preserves the outline and changing the outline preserves the step", () => {
  const { rerender } = render(<Heading level={1} step="heading">标题</Heading>);
  expect(screen.getByRole("heading", { level: 1 })).toHaveClass("text-heading");
  rerender(<Heading level={1} step="display">标题</Heading>);
  expect(screen.getByRole("heading", { level: 1 })).toHaveClass("text-display");
  rerender(<Heading level={6} step="display">标题</Heading>);
  expect(screen.getByRole("heading", { level: 6 })).toHaveClass("text-display");
});

test("every canonical text step has a complete class and no invented size", () => {
  const { container } = render(<>{TEXT_STEPS.map(step => <Text key={step} step={step}>{step}</Text>)}</>);
  for (const element of container.children) {
    const step = element.getAttribute("data-step")!;
    expect(element).toHaveClass(`text-${step}${["support", "support-strong", "dense", "dense-strong", "control-xs", "control-sm", "control-md", "control-lg", "control-xl"].includes(step) ? "-mobile" : ""}`);
  }
});

test("body, support and numeric have separate roles; zero and unknown remain distinct", () => {
  render(<><Text>内容</Text><Text step="support" className="text-muted-foreground">说明</Text>
    <Text numeric render={<span />} data-testid="zero">0</Text><Text data-testid="unknown">待核实</Text></>);
  expect(screen.getByText("内容").tagName).toBe("P");
  expect(screen.getByText("内容")).toHaveClass("text-body");
  expect(screen.getByText("说明")).toHaveClass("text-support-mobile", "sm:text-support", "text-muted-foreground");
  expect(screen.getByTestId("zero")).toHaveClass("numeric");
  expect(screen.getByTestId("zero").tagName).toBe("SPAN");
  expect(screen.getByTestId("unknown")).not.toHaveClass("numeric");
  expect(screen.getByTestId("unknown")).toHaveTextContent("待核实");
});

test("render controls the actual semantics and preserves native attributes, ref and handlers", () => {
  const ref = createRef<HTMLHeadingElement>();
  const handler = vi.fn();
  const renderHandler = vi.fn();
  render(<Heading ref={ref} level={2} render={<h4 onClick={renderHandler} />} id="example"
    title="名称" data-owner="caller" lang="zh-CN" onClick={handler}>标题</Heading>);
  const heading = screen.getByRole("heading", { level: 4 });
  expect(ref.current).toBe(heading);
  expect(heading).toHaveAttribute("id", "example");
  expect(heading).toHaveAttribute("title", "名称");
  expect(heading).toHaveAttribute("data-owner", "caller");
  expect(heading).toHaveAttribute("lang", "zh-CN");
  expect(heading).toHaveAttribute("data-slot", "heading");
  fireEvent.click(heading);
  expect(handler).toHaveBeenCalledOnce();
  expect(renderHandler).toHaveBeenCalledOnce();
});

test("Text function render and caller style/class overrides preserve the chosen semantic role", () => {
  render(<Text step="body" render={props => <aside {...props} />} className="text-reading text-muted-foreground" style={{ color: "inherit" }}>说明</Text>);
  const aside = screen.getByRole("complementary");
  expect(aside).toHaveClass("text-reading", "text-muted-foreground");
  expect(aside).not.toHaveClass("text-body");
  expect(aside).toHaveAttribute("data-slot", "text");
  expect(aside.style.color).toBe("inherit");
});

test("long Chinese punctuation and unbroken English retain content with wrapping capacity", () => {
  const chinese = "这是一段用于检查中文标点（括号）：并列内容、逗号，连续文本换行的完整文字。".repeat(10);
  const english = "LongUnbrokenContentWithoutSpacesForWrappingChecks".repeat(10);
  render(<><Heading lang="zh-CN">{chinese}</Heading><Text lang="en">{english}</Text></>);
  for (const content of [chinese, english]) {
    expect(screen.getByText(content)).toHaveClass("min-w-0", "max-w-full", "whitespace-normal", "wrap-anywhere");
    expect(screen.getByText(content)).not.toHaveClass("truncate");
  }
});
