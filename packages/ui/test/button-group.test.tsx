import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Button } from "../src/components/button";
import { ButtonGroup } from "../src/components/button-group";

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
  expect(screen.getByRole("group", { name: "操作" })).toHaveClass("gap-(--qy-action-gap)");
});

test("orientation, render, events, ref and custom classes reach the group", async () => {
  const ref = createRef<HTMLDivElement>();
  const click = vi.fn();
  render(<ButtonGroup aria-label="操作" ref={ref} orientation="vertical" className="gap-0" data-slot="caller-actions" render={<section />} onClick={click}><Button>应用</Button></ButtonGroup>);
  expect(ref.current?.tagName).toBe("SECTION");
  expect(ref.current).toHaveAttribute("data-orientation", "vertical");
  expect(ref.current).toHaveAttribute("data-slot", "caller-actions");
  expect(ref.current).toHaveClass("flex-col", "gap-0");
  expect(ref.current).not.toHaveClass("gap-(--qy-action-gap)");
  await userEvent.click(screen.getByRole("button", { name: "应用" }));
  expect(click).toHaveBeenCalledOnce();
});
