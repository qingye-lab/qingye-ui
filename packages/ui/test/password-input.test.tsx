import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldLabel } from "../src/components/field";
import { PasswordInput } from "../src/components/password-input";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("it is a composition of public parts: one boundary holding the real password input and a named toggle", () => {
  const { container } = render(<PasswordInput aria-label="密码" defaultValue="qingye" />);
  const boundary = container.querySelector("[data-slot=password-input]")!;
  expect(boundary).toHaveClass("border", "border-input");
  const input = screen.getByLabelText("密码");
  expect(boundary).toContainElement(input);
  expect(input).toHaveAttribute("type", "password");
  expect(input).toHaveAttribute("autocapitalize", "none");
  expect(input).toHaveAttribute("spellcheck", "false");
  expect(input.closest("[data-slot=input-control]")).not.toHaveClass("border");
  const toggle = screen.getByRole("button", { name: "显示密码" });
  expect(toggle).toHaveAttribute("data-slot", "password-input-toggle");
  expect(toggle).toHaveAttribute("aria-pressed", "false");
  expect(toggle).toHaveAttribute("aria-controls", input.id);
});

test("the toggle switches visibility under a stable name, keeps the value and does not submit", async () => {
  const user = userEvent.setup();
  const onVisibleChange = vi.fn(); const onSubmit = vi.fn((event: React.FormEvent) => event.preventDefault());
  render(<form onSubmit={onSubmit}><PasswordInput aria-label="密码" defaultValue="qingye" onVisibleChange={onVisibleChange} /></form>);
  const input = screen.getByLabelText("密码");
  const toggle = screen.getByRole("button", { name: "显示密码" });
  await user.click(toggle);
  expect(input).toHaveAttribute("type", "text");
  expect(input).toHaveValue("qingye");
  expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(toggle).toHaveAccessibleName("显示密码");
  expect(onVisibleChange).toHaveBeenLastCalledWith(true);
  await user.keyboard(" ");
  expect(input).toHaveAttribute("type", "password");
  expect(onVisibleChange).toHaveBeenLastCalledWith(false);
  expect(onSubmit).not.toHaveBeenCalled();
});

test("controlled visibility changes only when the caller accepts it", async () => {
  const user = userEvent.setup();
  const onVisibleChange = vi.fn();
  const { rerender } = render(<PasswordInput aria-label="密码" visible={false} onVisibleChange={onVisibleChange} />);
  await user.click(screen.getByRole("button", { name: "显示密码" }));
  expect(onVisibleChange).toHaveBeenCalledWith(true);
  expect(screen.getByLabelText("密码")).toHaveAttribute("type", "password");
  rerender(<PasswordInput aria-label="密码" visible onVisibleChange={onVisibleChange} />);
  expect(screen.getByLabelText("密码")).toHaveAttribute("type", "text");
});

test.each(["disabled", "field", "fieldset"] as const)("the toggle is disabled with the real input (%s)", async (source) => {
  const onVisibleChange = vi.fn();
  const input = <PasswordInput aria-label="密码" defaultValue="qingye" disabled={source === "disabled"} onVisibleChange={onVisibleChange} />;
  render(source === "field" ? <Field disabled><FieldLabel>密码</FieldLabel>{input}</Field> : source === "fieldset" ? <fieldset disabled>{input}</fieldset> : input);
  const toggle = screen.getByRole("button", { name: "显示密码" });
  expect(toggle).toBeDisabled();
  await userEvent.click(toggle);
  expect(onVisibleChange).not.toHaveBeenCalled();
});

test("className, ref and id belong to the real input, controlClassName to the boundary, and the name follows the locale", () => {
  const ref = createRef<HTMLInputElement>();
  const { container } = render(<UILocaleProvider locale={enUS}><PasswordInput ref={ref} id="pw" aria-label="Password" className="caller-input" controlClassName="caller-boundary" /></UILocaleProvider>);
  const input = screen.getByLabelText("Password");
  expect(ref.current).toBe(input);
  expect(input).toHaveAttribute("id", "pw");
  expect(input).toHaveClass("caller-input");
  expect(container.querySelector("[data-slot=password-input]")).toHaveClass("caller-boundary");
  expect(screen.getByRole("button", { name: enUS.messages.showPassword })).toHaveAttribute("aria-controls", "pw");
});

test("a Field label names the password input, not the toggle", () => {
  render(<Field><FieldLabel>新密码</FieldLabel><PasswordInput showLabel="显示新密码" /></Field>);
  expect(screen.getByLabelText("新密码")).toHaveAttribute("type", "password");
  expect(screen.getByRole("button", { name: "显示新密码" })).toBeInTheDocument();
});
