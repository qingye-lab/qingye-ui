import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { ToggleGroup, ToggleGroupItem } from "../src/components/toggle-group";

test.each(["default", "outline"] as const)("vertical %s groups keep focus movement separate from selection", async (variant) => {
  render(
    <ToggleGroup aria-label="视图" defaultValue={["list"]} orientation="vertical" variant={variant}>
      <ToggleGroupItem value="list">列表</ToggleGroupItem>
      <ToggleGroupItem disabled value="board">看板</ToggleGroupItem>
      <ToggleGroupItem value="calendar">日历</ToggleGroupItem>
    </ToggleGroup>,
  );
  const list = screen.getByRole("button", { name: "列表" });
  const calendar = screen.getByRole("button", { name: "日历" });
  expect(list).toHaveAttribute("aria-pressed", "true");
  list.focus();
  await userEvent.keyboard("{End}");
  expect(calendar).toHaveFocus();
  expect(calendar).toHaveAttribute("aria-pressed", "false");
  await userEvent.keyboard("{Enter}");
  expect(calendar).toHaveAttribute("aria-pressed", "true");
  expect(list).toHaveAttribute("aria-pressed", "false");
});
