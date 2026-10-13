import { expect, test } from "vitest";
import { chartGeometry } from "../src/chart-geometry";
import { SYSTEM_UNITS_FALLBACK } from "../src/system-units";

test("default system units reproduce the pixel values the data graphics were drawn with", () => {
  expect(chartGeometry(SYSTEM_UNITS_FALLBACK)).toEqual({
    mark: 8, surfaceGap: 2, ring: 4, barMax: 24, barRadius: 4, labelGap: 4,
    stroke: 2, hairline: 1, keyWidth: 16, tickGap: 8, axisGutter: 8,
  });
});

test("lengths follow the fen, hairlines follow the line width, and neither leaks into the other", () => {
  const base = chartGeometry({ fen: 4, line: 1 });
  const wide = chartGeometry({ fen: 5, line: 2 });
  expect(wide.mark).toBe(10);
  expect(wide.surfaceGap).toBe(2.5);
  expect(wide.ring).toBe(2 * wide.surfaceGap);
  expect(wide.barMax).toBe(30);
  expect(wide.barRadius).toBe(5);
  expect(wide.labelGap).toBe(5);
  expect(wide.hairline).toBe(2);
  expect(chartGeometry({ fen: 4, line: 2 })).toEqual({ ...base, hairline: 2 });
  expect(chartGeometry({ fen: 5, line: 1 }).hairline).toBe(base.hairline);
});
