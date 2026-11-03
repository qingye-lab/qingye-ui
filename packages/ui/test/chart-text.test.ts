import { expect, test } from "vitest";
import { categoryAxisWidth, fitText, nodeText, textAdvance } from "../src/chart-text";

test("fitText leaves text that fits alone and cuts longer text to the room, ellipsis included", () => {
  expect(fitText("华东", 24)).toBe("华东");
  const cut = fitText("华东区域第三物流分拨中心", 60);
  expect(cut).toBe("华东区域…");
  expect(textAdvance(cut)).toBeLessThanOrEqual(60);
  expect(fitText("华东", 0)).toBe("…");
});

test("the category axis stops at the longest name and caps at a third of the plot", () => {
  expect(categoryAxisWidth(["华东", "华南"], 600, 8)).toBe(32);
  expect(categoryAxisWidth(["华东区域第三物流分拨中心冷链仓储运营"], 600, 8)).toBe(200);
  expect(categoryAxisWidth(["华东区域第三物流分拨中心冷链仓储运营"], 240, 8)).toBe(80);
  // 图还没量出来（宽 0）时不给负宽。
  expect(categoryAxisWidth(["华东"], 0, 8)).toBe(8);
});

test("nodeText only passes strings and numbers through", () => {
  expect(nodeText("1 万", "1")).toBe("1 万");
  expect(nodeText(2, "1")).toBe("2");
  expect(nodeText({} as never, "1")).toBe("1");
});
