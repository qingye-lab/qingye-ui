import { render, screen } from "@testing-library/react";
import { IconBell } from "@tabler/icons-react";
import { createRef } from "react";
import { expect, test } from "vitest";
import { Alert, AlertDescription, AlertTitle } from "../src/components/alert";
test("static local information does not gain an automatic announcement", () => {
  render(<Alert tone="warning"><AlertTitle>注意</AlertTitle><AlertDescription>条件尚未满足</AlertDescription></Alert>);
  expect(screen.queryByRole("alert")).toBeNull(); expect(screen.queryByRole("status")).toBeNull();
  expect(screen.getByText("条件尚未满足")).not.toHaveAttribute("aria-live");
});
test("an application can explicitly announce and compose a named native section", () => {
  const ref = createRef<HTMLDivElement>();
  render(<Alert ref={ref} role="alert" aria-labelledby="notice" render={<section />}><AlertTitle id="notice">已确认失败</AlertTitle><AlertDescription>保留原值</AlertDescription></Alert>);
  expect(ref.current).toBe(screen.getByRole("alert", { name: "已确认失败" })); expect(ref.current?.tagName).toBe("SECTION");
});
test("every tone except neutral has a default icon of its own shape and a screen-reader category prefix", () => {
  const shapes = new Set<string>();
  for (const [tone, prefix] of [["info", "提示："], ["warning", "警告："], ["danger", "危险："], ["success", "成功："]] as const) {
    const { container, unmount } = render(<Alert tone={tone}><AlertTitle>标题</AlertTitle></Alert>);
    const icon = container.querySelector("[data-slot=alert-icon]")!; expect(icon).toHaveAttribute("aria-hidden", "true"); shapes.add(icon.innerHTML);
    expect(screen.getByText(prefix)).toBeInTheDocument(); expect(container.firstElementChild).toHaveTextContent(`${prefix}标题`); unmount();
  }
  expect(shapes.size).toBe(4);
});
test("neutral has neither icon nor prefix", () => {
  const { container } = render(<Alert><AlertTitle>标题</AlertTitle></Alert>);
  expect(container.querySelector("svg")).toBeNull(); expect(container.querySelector("[data-slot=alert-category]")).toBeNull();
});
test("icon={false} removes the icon but keeps the category for assistive technology", () => {
  const { container } = render(<Alert tone="danger" icon={false}><AlertTitle>标题</AlertTitle></Alert>);
  expect(container.querySelector("svg")).toBeNull(); expect(screen.getByText("危险：")).toBeInTheDocument();
});
test("a caller's own icon replaces the default through the icon prop", () => {
  const { container } = render(<Alert tone="warning" icon={<IconBell data-testid="mine" aria-hidden="true" />}><AlertTitle>标题</AlertTitle></Alert>);
  expect(container.querySelectorAll("svg")).toHaveLength(1); expect(screen.getByTestId("mine")).toBeInTheDocument();
  expect(screen.getByText("警告：")).toBeInTheDocument();
});
