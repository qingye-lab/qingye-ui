import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Switch } from "../src/components/switch";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";

test("Field names the switch, activates it and registers both explanation and error", async () => {
  render(<Field invalid><FieldLabel>启用</FieldLabel><Switch /><FieldDescription>说明</FieldDescription><FieldError>输入无效</FieldError></Field>);
  const control = screen.getByRole("switch", { name: "启用" });
  expect(control).toHaveAccessibleDescription("说明 输入无效");
  expect(control).toHaveAttribute("aria-invalid", "true");
  await userEvent.click(screen.getByText("启用"));
  expect(control).toBeChecked();
});

test("wrapping label names and activates the switch", async () => {
  render(<label><Switch />启用</label>);
  await userEvent.click(screen.getByText("启用"));
  expect(screen.getByRole("switch", { name: "启用" })).toBeChecked();
});

test("an unchecked required switch and error content do not infer invalid", async () => {
  const { container, rerender } = render(<Field><FieldLabel>启用</FieldLabel><Switch required /><FieldError>调用方说明</FieldError></Field>);
  const control = screen.getByRole("switch");
  await userEvent.tab(); await userEvent.tab();
  expect(container.querySelector<HTMLInputElement>("input")!.checkValidity()).toBe(false);
  expect(control).not.toHaveAttribute("aria-invalid", "true");
  rerender(<Field invalid><FieldLabel>启用</FieldLabel><Switch /><FieldError>调用方说明</FieldError></Field>);
  expect(control).toHaveAttribute("aria-invalid", "true");
  rerender(<Field invalid={false}><FieldLabel>启用</FieldLabel><Switch /></Field>);
  expect(control).not.toHaveAttribute("aria-invalid", "true");
});

test("Space switches an uncontrolled value both ways without changing the accessible name", async () => {
  const change = vi.fn();
  render(<Switch aria-label="启用" defaultChecked onCheckedChange={change} />);
  const control = screen.getByRole("switch");
  await userEvent.tab(); await userEvent.keyboard(" ");
  expect(control).not.toBeChecked();
  expect(change).toHaveBeenLastCalledWith(false, expect.any(Object));
  await userEvent.keyboard(" ");
  expect(control).toBeChecked();
  expect(control).toHaveAccessibleName("启用");
});

test("controlled setting changes the current application state immediately", async () => {
  function Setting() { const [enabled, setEnabled] = useState(false); return <><Switch aria-label="启用" checked={enabled} onCheckedChange={setEnabled} /><output>{enabled ? "已启用" : "已关闭"}</output></>; }
  render(<Setting />);
  await userEvent.click(screen.getByRole("switch"));
  expect(screen.getByText("已启用")).toBeInTheDocument();
  expect(screen.getByRole("switch")).toBeChecked();
});

test("controlled value stays caller-owned when a callback does not update it", async () => {
  const change = vi.fn();
  const { rerender } = render(<Switch aria-label="启用" checked={false} onCheckedChange={change} />);
  await userEvent.click(screen.getByRole("switch"));
  expect(change).toHaveBeenCalledWith(true, expect.any(Object));
  expect(screen.getByRole("switch")).not.toBeChecked();
  rerender(<Switch aria-label="启用" checked onCheckedChange={change} />);
  expect(screen.getByRole("switch")).toBeChecked();
});

test("canceling the primitive change preserves the current setting", async () => {
  render(<Switch aria-label="启用" onCheckedChange={(_, details) => details.cancel()} />);
  await userEvent.click(screen.getByRole("switch"));
  expect(screen.getByRole("switch")).not.toBeChecked();
});

test("disabled is excluded from Tab and form data; readonly remains immutable and submitted", async () => {
  const change = vi.fn();
  const { container } = render(<form><Switch disabled defaultChecked name="disabled" aria-label="禁用" /><Switch readOnly defaultChecked name="enabled" value="yes" aria-label="只读" onCheckedChange={change} /><button>继续</button></form>);
  await userEvent.tab();
  expect(screen.getByRole("switch", { name: "只读" })).toHaveFocus();
  await userEvent.keyboard(" ");
  await userEvent.click(screen.getByRole("switch", { name: "只读" }));
  expect(screen.getByRole("switch", { name: "只读" })).toBeChecked();
  expect(change).not.toHaveBeenCalled();
  const data = new FormData(container.querySelector("form")!);
  expect(data.has("disabled")).toBe(false);
  expect(data.get("enabled")).toBe("yes");
  await userEvent.tab(); expect(screen.getByRole("button")).toHaveFocus();
});

test("caller ARIA, ref, render and state styles reach the actual switch", () => {
  const ref = createRef<HTMLElement>();
  render(<Switch ref={ref} aria-label="启用" aria-invalid="true" aria-describedby="extra" nativeButton render={<button data-rendered="yes" />} className={(s) => s.checked ? "caller-on" : "caller-off"} style={(s) => ({ color: s.checked ? "var(--qy-primary)" : "var(--qy-foreground)" })} />);
  const control = screen.getByRole("switch");
  expect(ref.current).toBe(control);
  expect(control.tagName).toBe("BUTTON");
  expect(control).toHaveAttribute("data-rendered", "yes");
  expect(control).toHaveAttribute("aria-describedby", "extra");
  expect(control).toHaveAttribute("aria-invalid", "true");
  expect(control).toHaveClass("caller-off");
  expect(control).toHaveStyle({ color: "var(--qy-foreground)" });
});

test("Field disabled is honored without changing the active setting", async () => {
  const change = vi.fn();
  render(<Field disabled><FieldLabel>启用</FieldLabel><Switch defaultChecked onCheckedChange={change} /></Field>);
  const control = screen.getByRole("switch");
  expect(control).toHaveAttribute("data-disabled");
  await userEvent.click(control);
  expect(change).not.toHaveBeenCalled();
  expect(control).toBeChecked();
});
