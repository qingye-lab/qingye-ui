import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Carousel, type CarouselItem } from "../src/components/carousel";

const items: readonly CarouselItem[] = [
  { id: "first", label: "第一项", content: <input name="first" aria-label="第一输入" /> },
  { id: "second", label: "第二项", content: <input name="second" aria-label="第二输入" /> },
];
test("manual position and boundaries preserve focused controls and actual native input values", async () => {
  const user = userEvent.setup();
  const { container } = render(<form><Carousel label="有限内容" items={items} /></form>);
  expect(screen.getByRole("region", { name: "有限内容" })).toHaveAttribute("aria-roledescription", "轮播");
  expect(screen.getByRole("button", { name: "上一张" })).toHaveAttribute("aria-disabled", "true");
  await user.type(screen.getByRole("textbox", { name: "第一输入" }), "保留");
  const next = screen.getByRole("button", { name: "下一张" });
  await user.click(next);
  expect(next).toHaveFocus(); expect(next).toHaveAttribute("aria-disabled", "true");
  expect(screen.queryByRole("textbox", { name: "第一输入" })).toBeNull();
  expect(screen.getByText("第二项 · 第 2 张，共 2 张")).toBeVisible();
  await user.click(next); expect(screen.getByRole("textbox", { name: "第二输入" })).toBeVisible();
  await user.click(screen.getByRole("button", { name: "上一张" }));
  expect(screen.getByRole("textbox", { name: "第一输入" })).toHaveValue("保留");
  expect(new FormData(container.querySelector("form")!).get("first")).toBe("保留");
});
test("only root focus handles sequence keys, while a field retains its own arrow keys", async () => {
  const user = userEvent.setup(); render(<Carousel label="有限内容" items={items} />);
  const root = screen.getByRole("region", { name: "有限内容" });
  root.focus(); await user.keyboard("{End}"); expect(screen.getByRole("textbox", { name: "第二输入" })).toBeVisible();
  expect(root).toHaveFocus(); await user.keyboard("{Home}");
  await user.click(screen.getByRole("textbox", { name: "第一输入" }));
  await user.keyboard("{ArrowRight}"); expect(screen.getByRole("textbox", { name: "第一输入" })).toHaveFocus();
  root.focus(); await user.keyboard("{ArrowRight}"); expect(screen.getByRole("textbox", { name: "第二输入" })).toBeVisible();
  fireEvent.keyDown(root, { key: "Home" });
  expect(screen.getByRole("textbox", { name: "第一输入" })).toBeVisible();
});
test("controlled refusal preserves actual position; accepted external change restores only focus belonging to the old item", async () => {
  const user = userEvent.setup(), change = vi.fn();
  const fixture = (value: string) => <><Carousel label="有限内容" items={items} value={value} onValueChange={change} /><button>外部入口</button></>;
  const { rerender } = render(fixture("first"));
  await user.click(screen.getByRole("button", { name: "下一张" }));
  expect(change).toHaveBeenCalledWith("second"); expect(screen.getByRole("textbox", { name: "第一输入" })).toBeVisible();
  await user.click(screen.getByRole("textbox", { name: "第一输入" }));
  rerender(fixture("second")); expect(screen.getByRole("region", { name: "有限内容" })).toHaveFocus();
  const external = screen.getByRole("button", { name: "外部入口" }); await user.click(external);
  rerender(fixture("first")); expect(external).toHaveFocus();
});
test("removing a focused current item restores the reading root and leaves the remaining item available", async () => {
  const user = userEvent.setup();
  const { rerender } = render(<Carousel label="有限内容" items={items} defaultValue="second" />);
  await user.click(screen.getByRole("textbox", { name: "第二输入" }));
  rerender(<Carousel label="有限内容" items={items.slice(0, 1)} defaultValue="second" />);
  expect(screen.getByRole("region", { name: "有限内容" })).toHaveFocus();
  expect(screen.getByRole("textbox", { name: "第一输入" })).toBeVisible();
  expect(screen.getByText("第一项 · 第 1 张，共 1 张")).toBeVisible();
});
test("empty items have no fabricated position or navigation, and later content remains usable", () => {
  const { rerender } = render(<Carousel label="有限内容" items={[]} emptyContent="没有内容" />);
  expect(screen.getByText("没有内容")).toBeVisible(); expect(screen.queryByRole("button")).toBeNull();
  rerender(<Carousel label="有限内容" items={items} />);
  expect(screen.getByRole("textbox", { name: "第一输入" })).toBeVisible();
});
