import { act, fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldDescription, FieldError, FieldLabel } from "../src/components/field";
import { OtpField } from "../src/components/otp-field";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("an over-capacity initial value can recover through Backspace while insertion is rejected whole", async () => {
  render(<OtpField length={4} defaultValue="012345" aria-label="编码" />);
  const input = screen.getByRole("textbox") as HTMLInputElement;
  input.focus();
  input.setSelectionRange(6, 6);
  await userEvent.keyboard("{Backspace}");
  expect(input).toHaveValue("01234");
  await userEvent.keyboard("{Backspace}");
  expect(input).toHaveValue("0123");
  fireEvent.change(input, { target: { value: "012345" } });
  expect(input).toHaveValue("0123");
  expect(screen.getByRole("status")).toHaveTextContent("最多输入 4 个字符");
});

test("text retains leading zero and registers Field once with render/ref/ARIA", async () => {
  const ref = createRef<HTMLInputElement>();
  const { container } = render(<form><Field invalid><FieldLabel>编码</FieldLabel><OtpField length={4} defaultValue="0123" name="code" ref={ref} render={<input data-custom="yes" />} /><FieldDescription>四个字符</FieldDescription><FieldError>尚未核对</FieldError></Field></form>);
  const input = screen.getByRole("textbox", { name: "编码" });
  expect(ref.current).toBe(input);
  expect(input).toHaveAttribute("type", "text");
  expect(input).toHaveValue("0123");
  expect(input).toHaveAccessibleDescription("四个字符 尚未核对");
  expect(input).toHaveAttribute("aria-invalid", "true");
  expect(input).toHaveAttribute("data-custom", "yes");
  expect(new FormData(container.querySelector("form")!).get("code")).toBe("0123");
  expect(container.querySelectorAll("[data-slot=otp-field-segment]")).toHaveLength(4);
  expect(screen.queryByText("成功")).not.toBeInTheDocument();
});

test("segment click selects its character; typing, direction and backspace use native text selection", async () => {
  const user = userEvent.setup();
  const { container } = render(<OtpField aria-label="编码" length={4} defaultValue="0123" />);
  const input = screen.getByRole("textbox") as HTMLInputElement;
  const segments = container.querySelectorAll("[data-slot=otp-field-segment]");
  fireEvent.pointerDown(segments[1], { button: 0 });
  expect(input).toHaveFocus();
  expect(input.selectionStart).toBe(1);
  expect(input.selectionEnd).toBe(2);
  await user.keyboard("9");
  expect(input).toHaveValue("0923");
  await user.keyboard("{ArrowLeft}{Backspace}");
  expect(input).toHaveValue("923");
});

test("paste replaces a selection, but over-capacity paste is rejected whole and explained", async () => {
  const user = userEvent.setup();
  render(<UILocaleProvider locale={enUS}><OtpField aria-label="Code" length={4} defaultValue="01" /></UILocaleProvider>);
  const input = screen.getByRole("textbox") as HTMLInputElement;
  await user.tab();
  input.setSelectionRange(0, 2);
  await user.paste("0072");
  expect(input).toHaveValue("0072");
  input.setSelectionRange(0, 4);
  await user.paste("12345");
  expect(input).toHaveValue("0072");
  expect(screen.getByRole("status")).toHaveTextContent("this insertion was not added");
  expect(input).toHaveAccessibleDescription("Use at most 4 characters; this insertion was not added");
});

test("controlled rejection preserves caller value and external values are not truncated", async () => {
  const change = vi.fn();
  const { rerender, container } = render(<OtpField aria-label="编码" length={4} value="01" onValueChange={change} />);
  await userEvent.tab();
  await userEvent.keyboard("2");
  expect(screen.getByRole("textbox")).toHaveValue("01");
  expect(change).toHaveBeenCalled();
  rerender(<OtpField aria-label="编码" length={4} value="012345" onValueChange={change} />);
  expect(screen.getByRole("textbox")).toHaveValue("012345");
  expect(container.querySelectorAll("[data-slot=otp-field-segment]")).toHaveLength(6);
});

test.each(["disabled", "readOnly"] as const)("%s retains text and correct form participation", async state => {
  const change = vi.fn();
  const { container } = render(<form><OtpField aria-label="编码" length={4} name="code" defaultValue="0012" {...{ [state]: true }} onValueChange={change} /></form>);
  await userEvent.tab();
  if (state === "readOnly") expect(screen.getByRole("textbox")).toHaveFocus();
  await userEvent.keyboard("9{Backspace}");
  expect(screen.getByRole("textbox")).toHaveValue("0012");
  expect(change).not.toHaveBeenCalled();
  expect(new FormData(container.querySelector("form")!).get("code")).toBe(state === "disabled" ? null : "0012");
});

test("native reset restores uncontrolled text without reporting a user change", async () => {
  const change = vi.fn();
  const { container } = render(<form><OtpField length={4} aria-label="编码" defaultValue="01" onValueChange={change} /></form>);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "92" } });
  change.mockClear();
  await act(async () => container.querySelector("form")!.reset());
  expect(screen.getByRole("textbox")).toHaveValue("01");
  expect(change).not.toHaveBeenCalled();
});

test("Field disabled governs the single real input and excludes its text from FormData", () => {
  const { container } = render(<form><Field disabled><FieldLabel>编码</FieldLabel><OtpField name="code" length={4} defaultValue="0012" /></Field></form>);
  const input = screen.getByRole("textbox", { name: "编码" });
  expect(input).toBeDisabled();
  fireEvent.pointerDown(container.querySelector("[data-slot=otp-field-segment]")!, { button: 0 });
  expect(input).not.toHaveFocus();
  expect(new FormData(container.querySelector("form")!).has("code")).toBe(false);
});

test("caller cancellation stops a change without replacing text or reporting acceptance", () => {
  const change = vi.fn();
  render(<OtpField length={4} aria-label="编码" defaultValue="01" onValueChange={change} onChange={event => event.preventBaseUIHandler()} />);
  fireEvent.change(screen.getByRole("textbox"), { target: { value: "92" } });
  expect(screen.getByRole("textbox")).toHaveValue("01");
  expect(change).not.toHaveBeenCalled();
});
