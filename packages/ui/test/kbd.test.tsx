import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Kbd } from "../src/components/kbd";
test("actual key text remains native kbd without registering an action", () => {
  render(<Kbd>Enter</Kbd>);
  expect(screen.getByText("Enter").tagName).toBe("KBD");
  expect(screen.getByText("Enter")).not.toHaveAttribute("tabindex"); expect(screen.queryByRole("button")).toBeNull();
});
test("a glyph key is named by hidden text inside the element, not by aria-label (kbd has no role to carry one)", () => {
  const { container } = render(<Kbd><span aria-hidden="true">⌘</span><span className="sr-only">Command</span></Kbd>);
  expect(container.querySelector("kbd")).not.toHaveAttribute("aria-label");
  expect(screen.getByText("Command")).toBeInTheDocument();
});
