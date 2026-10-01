import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { ProgressCircle } from "../src/components/progress-circle";

test("exposes progressbar values and shows the formatted value", () => {
  render(<ProgressCircle aria-label="上传进度" showValue size="lg" value={68} />);
  const bar = screen.getByRole("progressbar", { name: "上传进度" });
  expect(bar).toHaveAttribute("aria-valuenow", "68");
  expect(bar).toHaveAttribute("aria-valuemin", "0");
  expect(bar).toHaveAttribute("aria-valuemax", "100");
  expect(bar).toHaveAttribute("aria-valuetext", "68%");
  expect(bar).toHaveTextContent("68%");
});

test("indeterminate omits aria-valuenow and reads as loading", () => {
  const { container } = render(<ProgressCircle aria-label="导出" value={null} />);
  const bar = screen.getByRole("progressbar", { name: "导出" });
  expect(bar).not.toHaveAttribute("aria-valuenow");
  expect(bar).toHaveAttribute("aria-valuetext", "正在加载");
  expect(container.querySelector("[data-slot=progress-circle-svg]")).toHaveClass("animate-spin");
});

test("hides the arc at zero and respects min/max", () => {
  const { container, rerender } = render(<ProgressCircle aria-label="任务" value={0} />);
  expect(container.querySelector("[data-slot=progress-circle-indicator]")).toHaveClass("opacity-0");
  rerender(<ProgressCircle aria-label="任务" max={24} value={18} />);
  expect(screen.getByRole("progressbar")).toHaveAttribute("aria-valuetext", "75%");
});
