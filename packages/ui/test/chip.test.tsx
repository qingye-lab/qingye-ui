import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useState } from "react";
import { expect, test, vi } from "vitest";
import { Chip, ChipToggle } from "../src/components/chip";
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

test("a toggle chip exposes aria-pressed, uncontrolled", async () => {
  const user = userEvent.setup();
  const onPressedChange = vi.fn();
  render(<ChipToggle onPressedChange={onPressedChange}>未读</ChipToggle>);
  const chip = screen.getByRole("button", { name: "未读" });
  expect(chip).toHaveAttribute("aria-pressed", "false");
  await user.click(chip);
  expect(chip).toHaveAttribute("aria-pressed", "true");
  expect(onPressedChange).toHaveBeenLastCalledWith(true, expect.anything());
  await user.keyboard("{Enter}");
  expect(chip).toHaveAttribute("aria-pressed", "false");
});

test("a toggle chip follows its controlled pressed value", async () => {
  const user = userEvent.setup();
  function Controlled() {
    const [pressed, setPressed] = useState(true);
    return <><ChipToggle pressed={pressed} onPressedChange={setPressed}>未读</ChipToggle><output>{String(pressed)}</output></>;
  }
  render(<Controlled />);
  const chip = screen.getByRole("button", { name: "未读" });
  expect(chip).toHaveAttribute("aria-pressed", "true");
  await user.click(chip);
  expect(chip).toHaveAttribute("aria-pressed", "false");
  expect(screen.getByRole("status")).toHaveTextContent("false");
});

test("a disabled toggle chip does not change", async () => {
  const user = userEvent.setup();
  render(<ChipToggle disabled>未读</ChipToggle>);
  const chip = screen.getByRole("button", { name: "未读" });
  await user.click(chip);
  expect(chip).toHaveAttribute("aria-pressed", "false");
});
