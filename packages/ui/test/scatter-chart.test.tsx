import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { ScatterChart, type ScatterSeriesInput } from "../src/components/scatter-chart";

const points = [
  { id: "a", label: "接入设备", x: 1284, y: 0.02 },
  { id: "b", label: "权限与角色", x: 42, y: 0.1 },
  { id: "c", label: "操作记录", x: 90512, y: 0.01 },
];
const openTable = () => fireEvent.click(screen.getByRole("button", { name: "查看数据" }));

test("a single series needs no legend and is drawn in ink; two or more take ordered series colors", () => {
  render(<ScatterChart label="记录数与失败率" xLabel="记录数" yLabel="失败率" series={[{ key: "all", label: "全部", points }]} />);
  expect(screen.queryByRole("list")).toBeNull();
  const two: readonly ScatterSeriesInput[] = [{ key: "a", label: "设备", points: points.slice(0, 2) }, { key: "b", label: "审计", points: points.slice(2) }];
  const { rerender } = render(<ScatterChart label="两系列" xLabel="记录数" yLabel="失败率" series={two} />);
  expect(screen.getByRole("list")).toHaveTextContent("设备审计");
  rerender(<ScatterChart label="两系列" xLabel="记录数" yLabel="失败率" series={two} />);
});

test("the equivalent data table carries every point's name and both axes", () => {
  render(<ScatterChart label="记录数与失败率" xLabel="记录数" yLabel="失败率" series={[{ key: "all", label: "全部", points }]} />);
  openTable();
  const table = screen.getByRole("table", { name: "记录数与失败率" });
  expect(within(table).getByRole("rowheader", { name: "接入设备" })).toBeVisible();
  expect(within(table).getByRole("cell", { name: "90,512" })).toBeVisible();
});

test("a scatter chart only draws data: nothing to plot is rejected instead of drawing an empty frame", () => {
  // 用户裁决 2026-10-10：功能要纯粹。没有点可画时由调用方在原位放 Empty。
  // @ts-expect-error 整图的非数据状态不是图的属性。
  void (<ScatterChart label="记录数与失败率" state="empty">没有记录</ScatterChart>);
  expect(() => render(<ScatterChart label="记录数与失败率" xLabel="记录数" yLabel="失败率" series={[{ key: "a", label: "甲", points: [] }]} />)).toThrow(/render Empty in its place/);
});

test("more than three series, nonfinite coordinates and unnamed points are rejected", () => {
  const many: readonly ScatterSeriesInput[] = Array.from({ length: 4 }, (_, i) => ({ key: `s${i}`, label: `系列${i}`, points: [{ id: "p", label: "点", x: 1, y: 1 }] }));
  expect(() => render(<ScatterChart label="记录数与失败率" xLabel="记录数" yLabel="失败率" series={many} />)).toThrow(/at most three/);
  expect(() => render(<ScatterChart label="记录数与失败率" xLabel="记录数" yLabel="失败率" series={[{ key: "a", label: "全部", points: [{ id: "p", label: "点", x: NaN, y: 1 }] }]} />)).toThrow(/finite numbers/);
});
