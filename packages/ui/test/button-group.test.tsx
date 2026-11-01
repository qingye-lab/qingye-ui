import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Button } from "../src/components/button";
import { ButtonGroup, ButtonGroupSeparator, ButtonGroupText } from "../src/components/button-group";

test("a named action group preserves each action and its native tab order", async () => {
  const user = userEvent.setup();
  render(<ButtonGroup aria-label="编辑"><Button>应用</Button><Button variant="quiet">重置</Button></ButtonGroup>);
  expect(screen.getByRole("group", { name: "编辑" })).toHaveAttribute("data-slot", "button-group");
  await user.tab();
  expect(screen.getByRole("button", { name: "应用" })).toHaveFocus();
  await user.tab();
  expect(screen.getByRole("button", { name: "重置" })).toHaveFocus();
  expect(screen.queryByRole("toolbar")).toBeNull();
});

test("a disabled member cannot activate and does not disable other actions", async () => {
  const disabled = vi.fn();
  const enabled = vi.fn();
  render(<ButtonGroup aria-labelledby="actions-name"><span id="actions-name">操作</span><Button disabled onClick={disabled}>应用</Button><Button onClick={enabled}>重置</Button></ButtonGroup>);
  await userEvent.click(screen.getByRole("button", { name: "应用" }));
  await userEvent.click(screen.getByRole("button", { name: "重置" }));
  expect(disabled).not.toHaveBeenCalled();
  expect(enabled).toHaveBeenCalledOnce();
});

test("orientation, render, events, ref and custom classes reach the group", async () => {
  const ref = createRef<HTMLDivElement>();
  const click = vi.fn();
  render(<ButtonGroup aria-label="操作" ref={ref} orientation="vertical" className="gap-0" data-slot="caller-actions" render={<section />} onClick={click}><Button>应用</Button></ButtonGroup>);
  expect(ref.current?.tagName).toBe("SECTION");
  expect(ref.current).toHaveAttribute("data-orientation", "vertical");
  expect(ref.current).toHaveAttribute("data-slot", "caller-actions");
  expect(ref.current).toHaveClass("flex-col", "gap-0");
  await userEvent.click(screen.getByRole("button", { name: "应用" }));
  expect(click).toHaveBeenCalledOnce();
});

test("a missing or blank group name fails explicitly, an aria-labelledby name is accepted", () => {
  expect(() => render(<ButtonGroup><Button>应用</Button></ButtonGroup>)).toThrow(/ButtonGroup requires a nonempty aria-label or aria-labelledby/);
  expect(() => render(<ButtonGroup aria-label=" "><Button>应用</Button></ButtonGroup>)).toThrow(/aria-label/);
  render(<><span id="scope">编辑</span><ButtonGroup aria-labelledby="scope"><Button>应用</Button></ButtonGroup></>);
  expect(screen.getByRole("group", { name: "编辑" })).toBeInTheDocument();
});

test("an attached group keeps its name, member focus order and the caller's role override", async () => {
  const user = userEvent.setup();
  render(<ButtonGroup aria-label="分页" attached><Button variant="bordered">上一页</Button><ButtonGroupText>3 / 12</ButtonGroupText><Button variant="bordered">下一页</Button></ButtonGroup>);
  const group = screen.getByRole("group", { name: "分页" });
  expect(group).toHaveAttribute("data-attached");
  await user.tab();
  expect(screen.getByRole("button", { name: "上一页" })).toHaveFocus();
  await user.tab();
  // 静态文字段不进焦点顺序，也不是按钮。
  expect(screen.getByRole("button", { name: "下一页" })).toHaveFocus();
  expect(screen.getByText("3 / 12")).toHaveAttribute("data-slot", "button-group-text");
  expect(screen.queryByRole("button", { name: "3 / 12" })).toBeNull();
});

test("a group is not attached unless asked, and the separator follows the group's axis", () => {
  const { rerender } = render(<ButtonGroup aria-label="操作"><Button>应用</Button><ButtonGroupSeparator decorative={false} /><Button>重置</Button></ButtonGroup>);
  expect(screen.getByRole("group", { name: "操作" })).not.toHaveAttribute("data-attached");
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  rerender(<ButtonGroup aria-label="操作" orientation="vertical"><Button>应用</Button><ButtonGroupSeparator decorative={false} /><Button>重置</Button></ButtonGroup>);
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "horizontal");
});

test("a separator is decorative by default and leaves the accessibility tree", () => {
  render(<ButtonGroup aria-label="操作" attached><Button>应用</Button><ButtonGroupSeparator /><Button>重置</Button></ButtonGroup>);
  expect(screen.queryByRole("separator")).toBeNull();
});
