import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { StatusDot } from "../src/components/status-dot";

test("a dot without a visible label still announces its status", () => {
  const { container } = render(<StatusDot status="online" />);
  expect(screen.getByText("在线")).toHaveClass("sr-only");
  expect(container.querySelector("[data-slot=status-dot-indicator]")).toHaveAttribute("aria-hidden", "true");
});

test("visible label replaces the spoken fallback; pulse renders only for live states", () => {
  const { container, rerender } = render(
    <StatusDot pulse status="error">
      告警未处理
    </StatusDot>,
  );
  expect(screen.getByText("告警未处理")).not.toHaveClass("sr-only");
  expect(screen.queryByText("异常")).toBeNull();
  expect(container.querySelector("[data-slot=status-dot-pulse]")).not.toBeNull();

  rerender(<StatusDot label="打印机离线" pulse status="offline" />);
  expect(screen.getByText("打印机离线")).toHaveClass("sr-only");
  expect(container.querySelector("[data-slot=status-dot-pulse]")).toBeNull();
});
