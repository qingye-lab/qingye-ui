import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, vi } from "vitest";
import { Chip } from "../src/components/chip";
import { UILocaleProvider } from "../src/locale";
import { enUS } from "../src/locales/en-US";

test("a removable chip names its remove action after its text", () => {
  render(<Chip onRemove={() => {}}>设计</Chip>);
  expect(screen.getByText("设计")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "移除 设计" })).toBeInTheDocument();
});

test("the remove name follows the locale", () => {
  render(<UILocaleProvider locale={enUS}><Chip onRemove={() => {}}>Design</Chip></UILocaleProvider>);
  expect(screen.getByRole("button", { name: "Remove Design" })).toBeInTheDocument();
});

test("without onRemove the chip is plain text with no button", () => {
  render(<Chip>设计</Chip>);
  expect(screen.queryByRole("button")).toBeNull();
});

test("click, Enter, Space, Backspace and Delete each remove once", async () => {
  const user = userEvent.setup();
  const onRemove = vi.fn();
  render(<Chip onRemove={onRemove}>设计</Chip>);
  const button = screen.getByRole("button", { name: "移除 设计" });
  await user.click(button);
  expect(onRemove).toHaveBeenCalledTimes(1);
  button.focus();
  await user.keyboard("{Enter}");
  expect(onRemove).toHaveBeenCalledTimes(2);
  await user.keyboard(" ");
  expect(onRemove).toHaveBeenCalledTimes(3);
  await user.keyboard("{Backspace}");
  expect(onRemove).toHaveBeenCalledTimes(4);
  await user.keyboard("{Delete}");
  expect(onRemove).toHaveBeenCalledTimes(5);
});

test("a disabled chip cannot be removed", async () => {
  const user = userEvent.setup();
  const onRemove = vi.fn();
  render(<Chip disabled onRemove={onRemove}>设计</Chip>);
  const button = screen.getByRole("button", { name: "移除 设计" });
  expect(button).toBeDisabled();
  await user.click(button);
  expect(onRemove).not.toHaveBeenCalled();
});
