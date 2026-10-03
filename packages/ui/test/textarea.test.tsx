import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef, useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { Textarea } from "../src/components/textarea";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("Field labels the real textarea and associates explanation and supplied error", async () => {
  render(<Field invalid><FieldLabel>名称</FieldLabel><Textarea defaultValue="保留草稿" /><FieldDescription>说明</FieldDescription><FieldError>输入无效</FieldError></Field>);
  const control = screen.getByRole("textbox", { name: "名称" });
  expect(control.tagName).toBe("TEXTAREA");
  expect(control).toHaveValue("保留草稿");
  expect(control).toHaveAttribute("aria-invalid", "true");
  expect(control).toHaveAccessibleDescription("说明 输入无效");
  await userEvent.click(screen.getByText("名称"));
  expect(control).toHaveFocus();
});

test("required and error content do not infer invalid on blur or native invalid events", async () => {
  const { rerender } = render(<Field><FieldLabel>备注</FieldLabel><Textarea required /><FieldError>应用提供的内容</FieldError></Field>);
  const control = screen.getByRole("textbox");
  await userEvent.tab();
  await userEvent.tab();
  expect(control).not.toHaveAttribute("aria-invalid", "true");
  expect((control as HTMLTextAreaElement).checkValidity()).toBe(false);
  expect(control).not.toHaveAttribute("aria-invalid", "true");
  rerender(<Field invalid><FieldLabel>备注</FieldLabel><Textarea required /><FieldError>应用提供的内容</FieldError></Field>);
  expect(control).toHaveAttribute("aria-invalid", "true");
  rerender(<Field invalid={false}><FieldLabel>备注</FieldLabel><Textarea required /></Field>);
  expect(control).not.toHaveAttribute("aria-invalid", "true");
});

test("standalone aria-invalid stays caller-owned", () => {
  const { rerender } = render(<Textarea aria-label="备注" aria-invalid="false" defaultValue="未核实" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "false");
  rerender(<Textarea aria-label="备注" aria-invalid="true" defaultValue="未核实" />);
  expect(screen.getByRole("textbox")).toHaveAttribute("aria-invalid", "true");
  expect(screen.getByRole("textbox")).toHaveValue("未核实");
});

test("uncontrolled multiline editing emits real value changes and enforces native maxLength", async () => {
  const change = vi.fn();
  render(<Textarea aria-label="备注" defaultValue="" onValueChange={change} maxLength={4} />);
  await userEvent.type(screen.getByRole("textbox"), "a{Enter}bcd");
  expect(screen.getByRole("textbox")).toHaveValue("a\nbc");
  expect(change).toHaveBeenLastCalledWith("a\nbc", expect.any(Object));
});

test("controlled values follow the caller and remain unchanged without an update", async () => {
  const change = vi.fn();
  const { rerender } = render(<Textarea aria-label="备注" value="固定" onValueChange={change} />);
  await userEvent.type(screen.getByRole("textbox"), "x");
  expect(change).toHaveBeenCalled();
  expect(screen.getByRole("textbox")).toHaveValue("固定");
  function Editor() { const [value, setValue] = useState("草稿"); return <Textarea aria-label="备注" value={value} onValueChange={setValue} />; }
  rerender(<Editor />);
  await userEvent.type(screen.getByRole("textbox"), "x");
  expect(screen.getByRole("textbox")).toHaveValue("草稿x");
});

test("disabled skips Tab and submission; readonly is focusable, immutable and submitted", async () => {
  const { container } = render(<UILocaleProvider locale={enUS}><form><Textarea aria-label="不可用" disabled name="disabled" defaultValue="omit" /><Textarea aria-label="备注" readOnly name="note" defaultValue="retain" /><button>继续</button></form></UILocaleProvider>);
  await userEvent.tab();
  expect(screen.getByRole("textbox", { name: "备注" })).toHaveFocus();
  await userEvent.type(screen.getByRole("textbox", { name: "备注" }), "x");
  expect(screen.getByRole("textbox", { name: "备注" })).toHaveValue("retain");
  expect(screen.getByText("Read only")).toBeInTheDocument();
  const data = new FormData(container.querySelector("form")!);
  expect(data.has("disabled")).toBe(false);
  expect(data.get("note")).toBe("retain");
  await userEvent.tab();
  expect(screen.getByRole("button")).toHaveFocus();
});

test("uncontrolled form reset restores the default without inventing a value callback", async () => {
  const change = vi.fn();
  const { container } = render(<form><Textarea aria-label="备注" defaultValue="原值" onValueChange={change} /></form>);
  await userEvent.type(screen.getByRole("textbox"), "草稿");
  change.mockClear();
  await act(async () => container.querySelector("form")!.reset());
  expect(screen.getByRole("textbox")).toHaveValue("原值");
  expect(change).not.toHaveBeenCalled();
});

test("Field disabled applies real native disabling and does not claim readonly", async () => {
  render(<Field disabled><FieldLabel>备注</FieldLabel><Textarea defaultValue="保留" /></Field>);
  const control = screen.getByRole("textbox");
  expect(control).toBeDisabled();
  expect(screen.queryByText("只读")).not.toBeInTheDocument();
  await userEvent.tab();
  expect(control).not.toHaveFocus();
});

test("render-supplied readonly is reflected and ref callback cleanup is preserved", () => {
  const cleanup = vi.fn();
  const ref = vi.fn(() => cleanup);
  const { unmount } = render(<Textarea aria-label="备注" ref={ref} render={<textarea readOnly />} />);
  expect(screen.getByRole("textbox")).toHaveAttribute("readonly");
  expect(screen.getByText("只读")).toBeInTheDocument();
  unmount();
  expect(cleanup).toHaveBeenCalledOnce();
});

test("native properties, typed events, custom render and ref reach the textarea", async () => {
  const ref = createRef<HTMLTextAreaElement>();
  const event = vi.fn();
  render(<Textarea ref={ref} aria-label="备注" id="example" name="example" rows={5} wrap="hard" data-object="caller" onChange={(e) => event(e.currentTarget.tagName)} render={<textarea data-rendered="yes" rows={5} />} className={(s) => s.focused ? "caller-focused" : "caller-rest"} style={{ color: "var(--qy-foreground)" }} />);
  const control = screen.getByRole("textbox");
  expect(ref.current).toBe(control);
  expect(control).toHaveAttribute("rows", "5");
  expect(control).toHaveAttribute("wrap", "hard");
  expect(control).toHaveAttribute("data-rendered", "yes");
  expect(control).toHaveAttribute("data-object", "caller");
  await userEvent.type(control, "x");
  expect(event).toHaveBeenCalledWith("TEXTAREA");
  expect(control).toHaveClass("caller-focused");
  expect(control).toHaveStyle({ color: "var(--qy-foreground)" });
});

test.each(["xs", "sm", "md", "lg", "xl"] as const)("%s uses the same named text, bordered padding and narrow geometry", (size) => {
  render(<Textarea aria-label="备注" size={size} />);
  const control = screen.getByRole("textbox");
  expect(control).toHaveClass(`text-control-${size}-mobile`, `sm:text-control-${size}`);
  expect(control.style.getPropertyValue("--qy-textarea-padding")).toBe(`var(--qy-control-${size}-padding-bordered)`);
  expect(control.style.getPropertyValue("--qy-textarea-height-narrow")).toBe(`var(--qy-control-${size}-narrow)`);
  expect(control).toHaveAttribute("rows", "3");
});
