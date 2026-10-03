import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { expect, test } from "vitest";
import { ProgressCircle } from "../src/components/progress-circle";
test("the circle keeps the same reliable progress role, range, zero and null semantics", () => {
  const ref = createRef<HTMLDivElement>();
  const fixture = (value: number | null) => <ProgressCircle ref={ref} value={value} min={-10} max={10} aria-labelledby="name" />;
  const { rerender } = render(<><span id="name">进度</span>{fixture(0)}</>);
  expect(ref.current).toBe(screen.getByRole("progressbar", { name: "进度" })); expect(ref.current).toHaveAttribute("aria-valuenow", "0");
  expect(ref.current).toHaveAttribute("aria-valuemin", "-10"); expect(ref.current).toHaveAttribute("aria-valuemax", "10");
  rerender(<><span id="name">进度</span>{fixture(null)}</>); expect(ref.current).not.toHaveAttribute("aria-valuenow");
});
test("a bad denominator is rejected instead of displaying a guessed percent", () => { expect(() => render(<ProgressCircle value={0} max={0} aria-label="进度" />)).toThrow(RangeError); });
