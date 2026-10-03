import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Checkbox } from "../src/components/checkbox";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { Textarea } from "../src/components/textarea";
import { Switch } from "../src/components/switch";

test("Field label activates checkbox and description/error ids reach the control", async () => {
  render(<Field invalid><FieldLabel>选项一</FieldLabel><Checkbox /><FieldDescription>说明</FieldDescription><FieldError>输入无效</FieldError></Field>);
  const control = screen.getByRole("checkbox", { name: "选项一" });
  expect(control).toHaveAccessibleDescription("说明 输入无效");
  expect(control).toHaveAttribute("aria-invalid", "true");
  await userEvent.click(screen.getByText("选项一"));
  expect(control).toBeChecked();
});

test("wrapping native label remains an accessible activation target", async () => {
  render(<label><Checkbox />选项二</label>);
  await userEvent.click(screen.getByText("选项二"));
  expect(screen.getByRole("checkbox", { name: "选项二" })).toBeChecked();
});

test("required, unchecked and supplied error text never infer invalid", async () => {
  const { container, rerender } = render(<Field><FieldLabel>选项</FieldLabel><Checkbox required /><FieldError>输入无效</FieldError></Field>);
  const control = screen.getByRole("checkbox");
  await userEvent.tab();
  await userEvent.tab();
  expect(container.querySelector<HTMLInputElement>("input")!.checkValidity()).toBe(false);
  expect(control).not.toHaveAttribute("aria-invalid", "true");
  rerender(<Field invalid><FieldLabel>选项</FieldLabel><Checkbox required /><FieldError>输入无效</FieldError></Field>);
  expect(control).toHaveAttribute("aria-invalid", "true");
  rerender(<Field invalid={false}><FieldLabel>选项</FieldLabel><Checkbox required /></Field>);
  expect(control).not.toHaveAttribute("aria-invalid", "true");
});

test("indeterminate exposes mixed and switches to the caller's all-selected fact", async () => {
  function Selection() {
    const [all, setAll] = useState(false);
    return <Checkbox aria-label="全部选项" checked={all} indeterminate={!all} onCheckedChange={setAll} />;
  }
  render(<Selection />);
  const control = screen.getByRole("checkbox");
  expect(control).toHaveAttribute("aria-checked", "mixed");
  expect(control).toHaveAttribute("data-indeterminate");
  await userEvent.tab();
  await userEvent.keyboard(" ");
  expect(control).toHaveAttribute("aria-checked", "true");
  expect(control).not.toHaveAttribute("data-indeterminate");
});

test("uncontrolled Space toggles both ways and callbacks carry the checked fact", async () => {
  const change = vi.fn();
  render(<Checkbox aria-label="选项" defaultChecked onCheckedChange={change} />);
  await userEvent.tab();
  await userEvent.keyboard(" ");
  expect(screen.getByRole("checkbox")).not.toBeChecked();
  expect(change).toHaveBeenLastCalledWith(false, expect.any(Object));
  await userEvent.keyboard(" ");
  expect(screen.getByRole("checkbox")).toBeChecked();
});

test("controlled value only changes when the application updates it", async () => {
  const change = vi.fn();
  const { rerender } = render(<Checkbox aria-label="选项" checked={false} onCheckedChange={change} />);
  await userEvent.click(screen.getByRole("checkbox"));
  expect(change).toHaveBeenCalledWith(true, expect.any(Object));
  expect(screen.getByRole("checkbox")).not.toBeChecked();
  rerender(<Checkbox aria-label="选项" checked onCheckedChange={change} />);
  expect(screen.getByRole("checkbox")).toBeChecked();
});

test("change cancellation keeps an uncontrolled value", async () => {
  render(<Checkbox aria-label="选项" onCheckedChange={(_, details) => details.cancel()} />);
  await userEvent.click(screen.getByRole("checkbox"));
  expect(screen.getByRole("checkbox")).not.toBeChecked();
});

test("disabled is skipped; readonly stays keyboard reachable and cannot toggle or call back", async () => {
  const change = vi.fn();
  const { container } = render(<form><Checkbox aria-label="禁用" disabled defaultChecked name="disabled" /><Checkbox aria-label="只读" readOnly defaultChecked name="choice" value="selected" onCheckedChange={change} /><button>继续</button></form>);
  await userEvent.tab();
  expect(screen.getByRole("checkbox", { name: "只读" })).toHaveFocus();
  await userEvent.keyboard(" ");
  await userEvent.click(screen.getByRole("checkbox", { name: "只读" }));
  expect(screen.getByRole("checkbox", { name: "只读" })).toBeChecked();
  expect(change).not.toHaveBeenCalled();
  const data = new FormData(container.querySelector("form")!);
  expect(data.has("disabled")).toBe(false);
  expect(data.get("choice")).toBe("selected");
});

test("Tab order follows actual textarea, checkbox, switch, action order", async () => {
  render(<><Textarea aria-label="备注" /><Checkbox aria-label="选项" /><Switch aria-label="开关" /><button>保存</button></>);
  for (const target of [screen.getByRole("textbox"), screen.getByRole("checkbox"), screen.getByRole("switch"), screen.getByRole("button")]) {
    await userEvent.tab(); expect(target).toHaveFocus();
  }
  await userEvent.tab({ shift: true });
  expect(screen.getByRole("switch")).toHaveFocus();
});

test("Field disabled is honored by the checkbox primitive", async () => {
  const change = vi.fn();
  render(<Field disabled><FieldLabel>选项</FieldLabel><Checkbox onCheckedChange={change} /></Field>);
  const control = screen.getByRole("checkbox");
  expect(control).toHaveAttribute("data-disabled");
  await userEvent.click(control);
  expect(change).not.toHaveBeenCalled();
  expect(control).not.toBeChecked();
});

test("refs, native-button render, consumer styles and explicit ARIA survive composition", () => {
  const ref = createRef<HTMLElement>();
  render(<Checkbox ref={ref} nativeButton render={<button data-rendered="yes" />} id="choice" aria-label="选项" aria-describedby="extra" aria-invalid="true" data-example="caller" className={(s) => s.checked ? "caller-checked" : "caller-unchecked"} style={{ color: "var(--qy-foreground)" }} />);
  const control = screen.getByRole("checkbox");
  expect(ref.current).toBe(control);
  expect(control.tagName).toBe("BUTTON");
  expect(control).toHaveAttribute("data-example", "caller");
  expect(control).toHaveAttribute("data-rendered", "yes");
  expect(control).toHaveAttribute("aria-describedby", "extra");
  expect(control).toHaveAttribute("aria-invalid", "true");
  expect(control).toHaveClass("caller-unchecked");
  expect(control).toHaveStyle({ color: "var(--qy-foreground)" });
});
