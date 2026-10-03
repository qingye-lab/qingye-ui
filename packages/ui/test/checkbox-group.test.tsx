import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { CheckboxGroup } from "../src/components/checkbox-group";
import { Checkbox } from "../src/components/checkbox";
import { Field, FieldDescription, FieldError, FieldTitle } from "../src/components/field";

const items = <><label><Checkbox value="alpha" />甲</label><label><Checkbox value="beta" />乙</label></>;

test("group owns a collection; labels change that collection and serialize selected values", async () => {
  const change = vi.fn();
  const { container } = render(<form><Field name="choices"><FieldTitle id="choices-label">候选</FieldTitle><CheckboxGroup aria-labelledby="choices-label" defaultValue={["alpha"]} onValueChange={change}>{items}</CheckboxGroup></Field></form>);
  expect(screen.getByRole("group", { name: "候选" })).toBeInTheDocument();
  await userEvent.click(screen.getByText("乙"));
  expect(change).toHaveBeenLastCalledWith(["alpha", "beta"], expect.any(Object));
  expect(new FormData(container.querySelector("form")!).getAll("choices")).toEqual(["alpha", "beta"]);
  await userEvent.click(screen.getByText("甲"));
  expect(change).toHaveBeenLastCalledWith(["beta"], expect.any(Object));
});

test("allValues provides exact parent scope and mixed is a real collection fact", async () => {
  render(<CheckboxGroup defaultValue={["alpha"]} allValues={["alpha", "beta"]}><Checkbox parent aria-label="全部" />{items}</CheckboxGroup>);
  const parent = screen.getByRole("checkbox", { name: "全部" });
  expect(parent).toHaveAttribute("aria-checked", "mixed");
  await userEvent.click(parent);
  expect(parent).toBeChecked();
  expect(screen.getByRole("checkbox", { name: "乙" })).toBeChecked();
  await userEvent.click(parent);
  expect(screen.getAllByRole("checkbox").every(item => item.getAttribute("aria-checked") === "false")).toBe(true);
});

test("controlled collection only follows application updates; change can be canceled", async () => {
  const change = vi.fn();
  const { rerender } = render(<CheckboxGroup value={["alpha"]} onValueChange={change}>{items}</CheckboxGroup>);
  await userEvent.click(screen.getByText("乙"));
  expect(change).toHaveBeenCalledWith(["alpha", "beta"], expect.any(Object));
  expect(screen.getByRole("checkbox", { name: "乙" })).not.toBeChecked();
  rerender(<CheckboxGroup defaultValue={[]} onValueChange={(_, details) => details.cancel()} key="cancel">{items}</CheckboxGroup>);
  await userEvent.click(screen.getByText("乙"));
  expect(screen.getByRole("checkbox", { name: "乙" })).not.toBeChecked();
});

test("disabled blocks descendants and Field links shared description/error", async () => {
  const change = vi.fn();
  render(<Field invalid><CheckboxGroup disabled onValueChange={change}>{items}</CheckboxGroup><FieldDescription>可选多个</FieldDescription><FieldError>范围无效</FieldError></Field>);
  for (const item of screen.getAllByRole("checkbox")) {
    expect(item).toHaveAttribute("data-disabled");
    expect(item).toHaveAccessibleDescription("可选多个 范围无效");
    await userEvent.click(item);
  }
  expect(change).not.toHaveBeenCalled();
});

test("group render/ref, state styles and native events are preserved", async () => {
  const ref = createRef<HTMLDivElement>(); const click = vi.fn();
  render(<CheckboxGroup ref={ref} render={<div data-rendered="yes" />} aria-label="候选" data-caller="yes" className={state => state.disabled ? "caller-disabled" : "caller-enabled"} style={{ color: "var(--qy-foreground)" }} onClick={click}>{items}</CheckboxGroup>);
  const group = screen.getByRole("group");
  expect(ref.current).toBe(group); expect(group).toHaveAttribute("data-rendered", "yes");
  expect(group).toHaveClass("caller-enabled"); expect(group).toHaveStyle({ color: "var(--qy-foreground)" });
  await userEvent.click(screen.getByText("甲")); expect(click).toHaveBeenCalled();
});
