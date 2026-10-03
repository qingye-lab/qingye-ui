import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test } from "vitest";
import { Separator } from "../src/components/separator";

test("semantic separators expose direction without entering the tab order", () => {
  const { rerender } = render(<Separator />);
  expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "horizontal");
  expect(screen.getByRole("separator")).not.toHaveAttribute("tabindex");
  rerender(<Separator orientation="vertical" />);
  expect(screen.getByRole("separator")).toHaveAttribute("aria-orientation", "vertical");
  expect(screen.getByRole("separator")).toHaveAttribute("data-orientation", "vertical");
});

test("decorative separators have presentation role and are hidden from the accessibility tree", () => {
  const { container } = render(<Separator decorative orientation="vertical" />);
  expect(screen.queryByRole("separator")).toBeNull();
  expect(container.firstElementChild).toHaveAttribute("role", "presentation");
  expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
});

test("the same separator can switch between semantic and decorative roles", () => {
  const { rerender } = render(<Separator decorative />);
  expect(screen.queryByRole("separator")).toBeNull();
  rerender(<Separator />);
  expect(screen.getByRole("separator")).not.toHaveAttribute("aria-hidden");
});

test("render, native props, refs and caller class functions are preserved", () => {
  const ref = createRef<HTMLDivElement>();
  render(<Separator ref={ref} render={<hr />} aria-label="分节" data-owner="settings" orientation="vertical" className={state => state.orientation === "vertical" ? "border-border" : "border-input"} />);
  const separator = screen.getByRole("separator", {name: "分节"});
  expect(separator.tagName).toBe("HR");
  expect(separator).toHaveAttribute("data-owner", "settings");
  expect(separator).toHaveClass("border-border");
  expect(separator).not.toHaveClass("border-border-strong");
  expect(ref.current).toBe(separator);
});
