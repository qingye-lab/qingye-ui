import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "../src/components/toggle-group";

const items = <><ToggleGroupItem value="alpha">甲</ToggleGroupItem><ToggleGroupItem value="beta" disabled>乙</ToggleGroupItem><ToggleGroupItem value="gamma">丙</ToggleGroupItem></>;

test("single mode replaces pressed item and can return to an empty selection", async () => {
  const change = vi.fn(); render(<ToggleGroup aria-label="候选" defaultValue={["alpha"]} onValueChange={change}>{items}</ToggleGroup>);
  await userEvent.click(screen.getByRole("button", { name: "丙" }));
  expect(change).toHaveBeenLastCalledWith(["gamma"], expect.any(Object));
  expect(screen.getByRole("button", { name: "甲" })).toHaveAttribute("aria-pressed", "false");
  await userEvent.click(screen.getByRole("button", { name: "丙" })); expect(change).toHaveBeenLastCalledWith([], expect.any(Object));
});

test("multiple mode keeps other pressed facts; controlled state requires caller update", async () => {
  const change = vi.fn(); const { rerender } = render(<ToggleGroup multiple defaultValue={["alpha"]} onValueChange={change}>{items}</ToggleGroup>);
  await userEvent.click(screen.getByRole("button", { name: "丙" })); expect(change).toHaveBeenLastCalledWith(["alpha", "gamma"], expect.any(Object));
  rerender(<ToggleGroup key="controlled" multiple value={["alpha"]} onValueChange={change}>{items}</ToggleGroup>);
  await userEvent.click(screen.getByRole("button", { name: "丙" })); expect(screen.getByRole("button", { name: "丙" })).toHaveAttribute("aria-pressed", "false");
});

test("arrows move focus past disabled items without changing pressed value; Space selects", async () => {
  const change = vi.fn(); render(<ToggleGroup defaultValue={["alpha"]} onValueChange={change}>{items}</ToggleGroup>);
  await userEvent.tab(); expect(screen.getByRole("button", { name: "甲" })).toHaveFocus();
  await userEvent.keyboard("{ArrowRight}"); expect(screen.getByRole("button", { name: "丙" })).toHaveFocus(); expect(change).not.toHaveBeenCalled();
  await userEvent.keyboard(" "); expect(change).toHaveBeenLastCalledWith(["gamma"], expect.any(Object));
});

test("vertical non-looping navigation and disabled group enforce their own boundaries", async () => {
  const change = vi.fn(); const { rerender } = render(<ToggleGroup orientation="vertical" loopFocus={false}>{items}</ToggleGroup>);
  await userEvent.tab(); await userEvent.keyboard("{ArrowDown}{ArrowDown}"); expect(screen.getByRole("button", { name: "丙" })).toHaveFocus();
  rerender(<ToggleGroup disabled onValueChange={change}>{items}</ToggleGroup>);
  await userEvent.click(screen.getByRole("button", { name: "甲" })); expect(change).not.toHaveBeenCalled();
  expect(screen.getByRole("button", { name: "甲" })).toBeDisabled();
});

test("composition keeps refs, native attributes/events and the group size at items", async () => {
  const ref = createRef<HTMLDivElement>(); const click = vi.fn();
  render(<ToggleGroup ref={ref} render={<div data-rendered="yes" />} size="xl" aria-label="候选" onClick={click} className="caller-group"><ToggleGroupItem value="alpha" data-caller="yes">甲</ToggleGroupItem></ToggleGroup>);
  expect(ref.current).toBe(screen.getByRole("group")); expect(ref.current).toHaveClass("caller-group");
  const item = screen.getByRole("button"); expect(item).toHaveAttribute("data-slot", "toggle-group-item"); expect(item).toHaveClass("text-control-xl-mobile", "sm:text-control-xl");
  await userEvent.click(item); expect(click).toHaveBeenCalled();
});
