import { describe, expect, it } from "vitest";
import { resolveColumnWidths, type ColumnTrack } from "../src/column-widths";

const grow = (weight: number, min = 0, max = Infinity): ColumnTrack => ({ grow: weight, min, max });
const sum = (widths: number[]) => widths.reduce((total, width) => total + width, 0);

describe("resolveColumnWidths", () => {
  it("splits the remaining width by weight", () => {
    expect(resolveColumnWidths([{ base: 100 }, grow(1), grow(3)], 500)).toEqual([100, 100, 300]);
  });
  it("gives a capped column's surplus to the others", () => {
    expect(resolveColumnWidths([grow(1, 0, 120), grow(1)], 1000)).toEqual([120, 880]);
  });
  it("keeps a raised floor from inflating the other columns", () => {
    expect(resolveColumnWidths([grow(1, 300), grow(1, 50), grow(1, 50)], 450)).toEqual([300, 75, 75]);
  });
  it("lets floors win when the container is too narrow", () => {
    expect(resolveColumnWidths([{ base: 200 }, grow(1, 150), grow(1, 150)], 300)).toEqual([200, 150, 150]);
  });
  it("stops at the sum when every flexible column reaches its cap", () => {
    expect(resolveColumnWidths([{ base: 100 }, grow(1, 0, 200), grow(2, 0, 200)], 1000)).toEqual([100, 200, 200]);
  });
  it("re-distributes after a freeze uncovers a second violation", () => {
    expect(resolveColumnWidths([grow(1, 0, 100), grow(1, 0, 200), grow(1)], 900)).toEqual([100, 200, 600]);
  });
  it("fills the container exactly when fractions round", () => {
    expect(sum(resolveColumnWidths([grow(1), grow(1), grow(1)], 1000))).toBe(1000);
  });
});
