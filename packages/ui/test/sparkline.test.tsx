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

test("an isolated known point between unknowns is drawn as a dot, not dropped", () => {
  const { container } = render(<Sparkline label="延迟" values={[1, null, 3, null, 5]} />);
  expect(container.querySelectorAll("path")).toHaveLength(0);
  // 两个孤立点画小点，末点由「当前点」标记承担，不重复。
  expect(container.querySelectorAll("[data-slot='sparkline-point']")).toHaveLength(2);
  expect(container.querySelectorAll("circle")).toHaveLength(3);
});

const band = { from: 40, to: 60, label: "达标区间" };

test("a target band must be a finite ascending range with a name", () => {
  const values = [50, 55];
  expect(() => render(<Sparkline label="x" values={values} band={{ from: 60, to: 40, label: "目标" }} />)).toThrow(RangeError);
  expect(() => render(<Sparkline label="x" values={values} band={{ from: 50, to: 50, label: "目标" }} />)).toThrow(RangeError);
  expect(() => render(<Sparkline label="x" values={values} band={{ from: 0, to: Infinity, label: "目标" }} />)).toThrow(RangeError);
  expect(() => render(<Sparkline label="x" values={values} band={{ from: 40, to: 60, label: " " }} />)).toThrow();
});

test("the summary states where the current value sits against the target", () => {
  const { rerender } = render(<Sparkline label="同步率" values={[50, 70]} band={band} />);
  expect(screen.getByRole("img")).toHaveAccessibleName("同步率：从 50 到 70，最低 50，最高 70；达标区间：40 至 60，当前高于目标");
  rerender(<Sparkline label="同步率" values={[50, 30]} band={band} />);
  expect(screen.getByRole("img")).toHaveAccessibleName("同步率：从 50 到 30，最低 30，最高 50；达标区间：40 至 60，当前低于目标");
  rerender(<Sparkline label="同步率" values={[30, 55, null]} band={band} />);
  expect(screen.getByRole("img")).toHaveAccessibleName("同步率：从 30 到 55，最低 30，最高 55；达标区间：40 至 60，当前在目标内");
});

test("with no known value only the target is stated", () => {
  const { container } = render(<Sparkline label="同步率" values={[null]} band={band} />);
  expect(screen.getByRole("img")).toHaveAccessibleName("同步率：没有可用的数值；达标区间：40 至 60");
  expect(container.querySelector("[data-slot='sparkline-band']")).not.toBeNull();
});

test("a band does not turn unknown points into a connected line", () => {
  const { container } = render(<Sparkline label="延迟" values={[3, 4, null, 5, 6]} band={{ from: 4, to: 5, label: "目标" }} />);
  expect(container.querySelectorAll("path")).toHaveLength(2);
  expect(container.querySelectorAll("[data-slot='sparkline-band']")).toHaveLength(1);
});

test("the band is placed by the union of the data and the band", () => {
  // 数据全在带上方：带仍在画面内，且在线的下方（y 更大）。
  const { container } = render(<Sparkline label="x" values={[80, 90]} band={band} />);
  const rect = container.querySelector("[data-slot='sparkline-band']")!;
  const y = Number(rect.getAttribute("y")), h = Number(rect.getAttribute("height"));
  expect(y).toBeGreaterThanOrEqual(0);
  expect(y + h).toBeLessThanOrEqual(20);
  const path = container.querySelector("path")!.getAttribute("d")!;
  const lineYs = [...path.matchAll(/,([0-9.]+)/g)].map(m => Number(m[1]));
  expect(Math.max(...lineYs)).toBeLessThan(y);
});

test("a single point with a band is placed against the band", () => {
  const { container } = render(<Sparkline label="x" values={[50]} band={band} />);
  const rect = container.querySelector("[data-slot='sparkline-band']")!;
  expect(Number(rect.getAttribute("height"))).toBeGreaterThan(0);
});

test("the declared tone is reflected on the root and an unknown tone throws", () => {
  const { rerender } = render(<Sparkline label="x" values={[1, 2]} tone="danger" />);
  expect(screen.getByRole("img")).toHaveAttribute("data-tone", "danger");
  rerender(<Sparkline label="x" values={[1, 2]} />);
  expect(screen.getByRole("img")).not.toHaveAttribute("data-tone");
  // @ts-expect-error 非法类别
  expect(() => render(<Sparkline label="x" values={[1, 2]} tone="loud" />)).toThrow(RangeError);
});

test("leaving the band does not change the tone by itself", () => {
  render(<Sparkline label="x" values={[50, 90]} band={band} />);
  expect(screen.getByRole("img")).not.toHaveAttribute("data-tone");
});
