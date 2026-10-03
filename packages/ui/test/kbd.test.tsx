import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Kbd } from "../src/components/kbd";
test("actual key text remains native kbd without registering an action", () => {
  render(<Kbd aria-label="Command">⌘</Kbd>);
  expect(screen.getByLabelText("Command").tagName).toBe("KBD");
  expect(screen.getByText("⌘")).not.toHaveAttribute("tabindex"); expect(screen.queryByRole("button")).toBeNull();
});
