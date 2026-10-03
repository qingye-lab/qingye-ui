import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { createRef } from "react";
import { expect, test, vi } from "vitest";
import { Toggle } from "../src/components/toggle";

test("Space and Enter toggle pressed while the accessible name stays stable", async () => {
  const change = vi.fn(); render(<Toggle onPressedChange={change}>加粗</Toggle>);
  const toggle = screen.getByRole("button", { name: "加粗" });
  await userEvent.tab(); await userEvent.keyboard(" ");
  expect(toggle).toHaveAttribute("aria-pressed", "true");
  expect(change).toHaveBeenLastCalledWith(true, expect.any(Object));
  await userEvent.keyboard("{Enter}"); expect(toggle).toHaveAttribute("aria-pressed", "false");
  expect(toggle).toHaveAccessibleName("加粗");
});

test("controlled pressed requires caller update; cancellation and disabled prevent changes", async () => {
  const change = vi.fn(); const { rerender } = render(<Toggle pressed={false} onPressedChange={change}>加粗</Toggle>);
  await userEvent.click(screen.getByRole("button")); expect(change).toHaveBeenCalledWith(true, expect.any(Object));
  expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  rerender(<Toggle key="cancel" onPressedChange={(_, details) => details.cancel()}>加粗</Toggle>);
  await userEvent.click(screen.getByRole("button")); expect(screen.getByRole("button")).toHaveAttribute("aria-pressed", "false");
  change.mockClear(); rerender(<Toggle disabled defaultPressed onPressedChange={change}>加粗</Toggle>);
  await userEvent.click(screen.getByRole("button")); expect(change).not.toHaveBeenCalled(); expect(screen.getByRole("button")).toBeDisabled();
});

test("render/ref/events and state style callbacks survive; size keeps its matching text role", async () => {
  const ref = createRef<HTMLButtonElement>(); const click = vi.fn();
  render(<Toggle ref={ref} size="lg" defaultPressed render={<button data-rendered="yes" />} aria-describedby="details" onClick={click} className={state => state.pressed ? "caller-pressed" : "caller-unpressed"} style={{ color: "var(--qy-foreground)" }}>加粗</Toggle>);
  const toggle = screen.getByRole("button"); expect(ref.current).toBe(toggle); expect(toggle).toHaveAttribute("data-rendered", "yes");
  expect(toggle).toHaveAttribute("aria-describedby", "details"); expect(toggle).toHaveClass("caller-pressed", "text-control-lg-mobile", "sm:text-control-lg");
  await userEvent.click(toggle); expect(click).toHaveBeenCalled(); expect(toggle).toHaveClass("caller-unpressed");
});
