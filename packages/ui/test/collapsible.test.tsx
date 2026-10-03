import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test } from "vitest";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "../src/components/collapsible";
import { Input } from "../src/components/input";

test("closing and reopening the same section retains its value and accessible relationship", async () => {
  const user = userEvent.setup();
  render(<Collapsible defaultOpen><CollapsibleTrigger>展开</CollapsibleTrigger><CollapsiblePanel><Input aria-label="值" /></CollapsiblePanel></Collapsible>);
  const trigger = screen.getByRole("button", { name: "展开" });
  const input = screen.getByRole("textbox", { name: "值" });
  expect(document.getElementById(trigger.getAttribute("aria-controls")!)).toContainElement(input);
  await user.type(input, "保留"); await user.click(trigger);
  expect(trigger).toHaveAttribute("aria-expanded", "false"); expect(input).toHaveValue("保留");
  await user.keyboard("{Enter}");
  expect(trigger).toHaveAttribute("aria-expanded", "true"); expect(screen.getByRole("textbox", { name: "值" })).toBe(input);
});
test("disabled and explicitly canceled disclosure never claims an opened section", async () => {
  const user = userEvent.setup();
  const fixture = (disabled: boolean) => <Collapsible disabled={disabled} onOpenChange={(_, details) => details.cancel()}><CollapsibleTrigger>展开</CollapsibleTrigger><CollapsiblePanel>内容</CollapsiblePanel></Collapsible>;
  const { rerender } = render(fixture(true));
  await user.click(screen.getByRole("button")); expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
  rerender(fixture(false)); await user.click(screen.getByRole("button")); expect(screen.getByRole("button")).toHaveAttribute("aria-expanded", "false");
});
