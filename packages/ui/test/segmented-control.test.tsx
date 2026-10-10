import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { SegmentedControl, SegmentedControlItem } from "../src/components/segmented-control";
import { Field, FieldDescription, FieldError, FieldTitle } from "../src/components/field";

const items = <><SegmentedControlItem value="">空值</SegmentedControlItem><SegmentedControlItem value="disabled" disabled>禁用</SegmentedControlItem><SegmentedControlItem value="alpha">甲</SegmentedControlItem></>;

test("segments are radio value inputs; unselected and selected empty-string values differ", async () => {
  const { container } = render(<form><SegmentedControl name="choice" aria-label="候选">{items}</SegmentedControl></form>);
  expect(screen.getByRole("radiogroup", { name: "候选" })).toBeInTheDocument();
  expect(screen.queryByRole("tab")).not.toBeInTheDocument(); expect(new FormData(container.querySelector("form")!).has("choice")).toBe(false);
  await userEvent.click(screen.getByRole("radio", { name: "空值" }));
  expect(screen.getByRole("radio", { name: "空值" })).toBeChecked(); expect(new FormData(container.querySelector("form")!).get("choice")).toBe("");
  await userEvent.click(screen.getByRole("radio", { name: "空值" })); expect(screen.getByRole("radio", { name: "空值" })).toBeChecked();
});

test("arrows select while skipping disabled segments; Field keeps shared error and description", async () => {
  render(<Field invalid><FieldTitle id="label">候选</FieldTitle><SegmentedControl aria-labelledby="label" defaultValue="">{items}</SegmentedControl><FieldDescription>一个值</FieldDescription><FieldError>值无效</FieldError></Field>);
  await userEvent.tab(); await userEvent.keyboard("{ArrowRight}");
  const target = screen.getByRole("radio", { name: "甲" }); expect(target).toHaveFocus(); expect(target).toBeChecked();
  expect(target).toHaveAccessibleDescription("一个值 值无效"); expect(target).toHaveAttribute("aria-invalid", "true");
});

test("controlled updates, cancellation, readonly and disabled keep declared facts", async () => {
  const change = vi.fn(); const { rerender } = render(<SegmentedControl value="" onValueChange={change}>{items}</SegmentedControl>);
  await userEvent.click(screen.getByRole("radio", { name: "甲" })); expect(change).toHaveBeenCalledWith("alpha", expect.any(Object)); expect(screen.getByRole("radio", { name: "空值" })).toBeChecked();
  rerender(<SegmentedControl key="cancel" onValueChange={(_, details) => details.cancel()}>{items}</SegmentedControl>);
  await userEvent.click(screen.getByRole("radio", { name: "甲" })); expect(screen.getByRole("radio", { name: "甲" })).not.toBeChecked();
  change.mockClear(); rerender(<SegmentedControl key="readonly" readOnly defaultValue="alpha" onValueChange={change}>{items}</SegmentedControl>);
  await userEvent.click(screen.getByRole("radio", { name: "空值" })); expect(change).not.toHaveBeenCalled(); expect(screen.getByRole("radio", { name: "甲" })).toBeChecked();
  rerender(<SegmentedControl disabled>{items}</SegmentedControl>); expect(screen.getByRole("radio", { name: "甲" })).toBeDisabled();
});

test("group and item composition keep ref/render/events, ARIA and inherited five-step size", async () => {
  const ref = createRef<HTMLDivElement>(); const itemRef = createRef<HTMLElement>(); const click = vi.fn();
  render(<SegmentedControl ref={ref} size="lg" aria-label="候选" render={<div data-rendered="yes" />}><SegmentedControlItem value={0} ref={itemRef} aria-describedby="extra" className={state => state.checked ? "caller-checked" : "caller-unchecked"} onClick={click}>零</SegmentedControlItem></SegmentedControl>);
  expect(ref.current).toBe(screen.getByRole("radiogroup")); const item = screen.getByRole("radio"); expect(itemRef.current).toBe(item);
  expect(item).toHaveAttribute("aria-describedby", "extra"); expect(item).toHaveClass("text-control-lg-mobile", "sm:text-control-lg", "caller-unchecked");
  await userEvent.click(item); expect(item).toHaveClass("caller-checked"); expect(click).toHaveBeenCalled();
});
