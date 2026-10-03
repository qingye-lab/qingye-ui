import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Inline, Stack, type LayoutGap } from "../src/components/layout";

const roles: [LayoutGap, string][] = [
  ["field", "--qy-field-gap"], ["fields", "--qy-field-group-gap"],
  ["actions", "--qy-action-gap"], ["panel", "--qy-panel-gap"], ["section", "--qy-section-gap"],
];

test.each(roles)("Stack and Inline consume the %s relationship token", (gap, token) => {
  const { container } = render(<><Stack gap={gap}>内容</Stack><Inline gap={gap}>操作</Inline></>);
  for (const element of container.children) {
    expect(element).toHaveClass(`gap-(${token})`);
    expect(element).toHaveAttribute("data-gap", gap);
    expect(element.className).not.toMatch(/gap-\d/);
  }
});

test("defaults group content vertically and wrap adjacent actions without assigning ARIA roles", () => {
  const { container } = render(<><Stack /><Inline /></>);
  expect(container.children[0]).toHaveClass("flex-col", "items-stretch", "gap-(--qy-panel-gap)");
  expect(container.children[1]).toHaveClass("flex-wrap", "items-center", "gap-(--qy-action-gap)");
  expect(container.children[0]).toHaveAttribute("data-slot", "stack");
  expect(container.children[1]).toHaveAttribute("data-slot", "inline");
  expect(container.querySelector("[role]")).toBeNull();
});

test("render makes a named section and forwards native attributes, styles, ref and both event handlers", () => {
  const ref = createRef<HTMLDivElement>();
  const caller = vi.fn();
  const elementHandler = vi.fn();
  render(<Stack ref={ref} gap="section" render={<section onClick={elementHandler} />}
    aria-label="说明" dir="rtl" lang="ar" data-density="compact" data-owner="caller"
    onClick={caller} style={{ gap: "var(--qy-section-gap)" }} className="items-start">内容</Stack>);
  const section = screen.getByRole("region", { name: "说明" });
  expect(section.tagName).toBe("SECTION");
  expect(ref.current).toBe(section);
  expect(section).toHaveAttribute("lang", "ar");
  expect(section).toHaveAttribute("dir", "rtl");
  expect(section).toHaveAttribute("data-density", "compact");
  expect(section).toHaveAttribute("data-owner", "caller");
  expect(section).toHaveStyle({ gap: "var(--qy-section-gap)" });
  expect(section).toHaveClass("items-start");
  expect(section).not.toHaveClass("items-stretch");
  fireEvent.click(section);
  expect(caller).toHaveBeenCalledOnce();
  expect(elementHandler).toHaveBeenCalledOnce();
});

test("Inline supports function render, explicit no-wrap and alignment without losing children", () => {
  render(<Inline wrap={false} align="baseline" render={props => <nav {...props} aria-label="导航" />}>
    <a href="#example">说明</a><button>导出</button>
  </Inline>);
  expect(screen.getByRole("navigation")).toHaveClass("flex-nowrap", "items-baseline");
  expect(screen.getByRole("navigation")).not.toHaveClass("flex-wrap");
  expect(screen.getByRole("link")).toHaveAttribute("href", "#example");
  expect(screen.getByRole("button")).toHaveTextContent("导出");
});

test("long bilingual content is retained and flex children can shrink instead of forcing overflow", () => {
  const content = "这是一段用于检查中文标点（括号）：并列内容、逗号，连续文本换行的完整文字。".repeat(10) + "LongUnbrokenContentWithoutSpacesForWrappingChecks".repeat(12);
  render(<Inline><Stack data-testid="long"><p>{content}</p></Stack><button>查看</button></Inline>);
  expect(screen.getByTestId("long")).toHaveTextContent(content);
});
