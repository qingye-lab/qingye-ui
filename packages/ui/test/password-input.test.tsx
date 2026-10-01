import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Field, FieldLabel } from "../src/components/field";
import { PasswordInput } from "../src/components/password-input";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("toggles visibility with a stable label and aria-pressed", async () => {
  const user = userEvent.setup();
  render(<PasswordInput aria-label="密码" defaultValue="hangzhou-2026" />);
  const input = screen.getByLabelText("密码");
  const toggle = screen.getByRole("button", { name: "显示密码" });
  expect(input).toHaveAttribute("type", "password");
  expect(toggle).toHaveAttribute("aria-pressed", "false");
  expect(toggle).toHaveAttribute("aria-controls", input.id);

  await user.click(toggle);
  expect(input).toHaveAttribute("type", "text");
  expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(toggle).toHaveAccessibleName("显示密码");
  // Plain text must not be rewritten or sent to spell checkers.
  expect(input).toHaveAttribute("spellcheck", "false");
  expect(input).toHaveAttribute("autocapitalize", "none");
});

test("supports controlled visibility", async () => {
  const user = userEvent.setup();
  const onVisibleChange = vi.fn();
  function Pair() {
    const [visible, setVisible] = useState(false);
    return (
      <>
        <PasswordInput aria-label="新密码" onVisibleChange={(next) => { onVisibleChange(next); setVisible(next); }} visible={visible} />
        <PasswordInput aria-label="确认密码" onVisibleChange={setVisible} visible={visible} />
      </>
    );
  }
  render(<Pair />);
  await user.click(screen.getAllByRole("button", { name: "显示密码" })[0]!);
  expect(onVisibleChange).toHaveBeenCalledWith(true);
  expect(screen.getByLabelText("新密码")).toHaveAttribute("type", "text");
  expect(screen.getByLabelText("确认密码")).toHaveAttribute("type", "text");
});

test("follows a disabled Field and links its label", () => {
  render(
    <Field disabled>
      <FieldLabel>当前密码</FieldLabel>
      <PasswordInput />
    </Field>,
  );
  expect(screen.getByLabelText("当前密码")).toBeDisabled();
  expect(screen.getByRole("button", { name: "显示密码" })).toBeDisabled();
});

test("uses the locale for the toggle name and forwards refs", () => {
  let node: HTMLInputElement | null = null;
  render(
    <UILocaleProvider locale={enUS}>
      <PasswordInput aria-label="Password" ref={(element) => { node = element; }} />
    </UILocaleProvider>,
  );
  expect(screen.getByRole("button", { name: "Show password" })).toBeInTheDocument();
  expect(node).toBe(screen.getByLabelText("Password"));
});
