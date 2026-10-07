import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";
import { Sparkline } from "../src/components/sparkline";

test("the accessible name summarises what is measured, its endpoints and its range", () => {
  render(<Sparkline label="近 6 周同步次数" values={[12, 18, 9, 22, 20, 24]} />);
  expect(screen.getByRole("img", { name: "近 6 周同步次数：从 12 到 24，最低 9，最高 24" })).toBeInTheDocument();
});

test("unknown points break the line instead of becoming zero, and the current point is marked", () => {
  const { container } = render(<Sparkline label="延迟" values={[3, 4, null, 5, 6]} />);
  // 两段：3→4 与 5→6；未知点不连线、也不画到零。
  expect(container.querySelectorAll("path")).toHaveLength(2);
  expect(container.querySelectorAll("circle")).toHaveLength(1);
  expect(screen.getByRole("img")).toHaveAccessibleName("延迟：从 3 到 6，最低 3，最高 6");
});

test("no known values is stated rather than drawn as a flat line", () => {
  const { container } = render(<Sparkline label="错误数" values={[null, null]} />);
  expect(screen.getByRole("img", { name: "错误数：没有可用的数值" })).toBeInTheDocument();
  expect(container.querySelector("path")).toBeNull();
  expect(() => render(<Sparkline label="x" values={[NaN]} />)).toThrow(TypeError);
});
