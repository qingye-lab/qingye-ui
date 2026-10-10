import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Chart, type ChartPlotData, type ChartRow } from "../src/components/chart";

const series = [{ key: "value", label: "系列" }];
const rows: readonly ChartRow[] = [
  { id: "zero", label: "零值", values: { value: 0 } },
  { id: "unknown", label: "未知项", values: { value: { state: "unknown", label: "尚未核实" } } },
  { id: "na", label: "不适用项", values: { value: { state: "not-applicable", label: "不适用" } } },
];
const openTable = () => fireEvent.click(screen.getByRole("button", { name: "查看数据" }));

test("zero and explicit unavailable facts retain a same-source table and caller plot projection", () => {
  const plot = vi.fn((projection: ChartPlotData) => <div>{projection.categoryLabel}</div>);
  render(<Chart type="line" label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={rows} renderPlot={plot} />);
  // 数据表是等价物，按需展开（展开有据）：图是预览，表是深入。
  openTable();
  const table = screen.getByRole("table", { name: "数值图" });
  expect(within(table).getByRole("cell", { name: "0" })).toBeVisible();
  expect(within(table).getByRole("cell", { name: "尚未核实" })).toHaveAttribute("data-state", "unknown");
  expect(within(table).getByRole("cell", { name: "不适用" })).toHaveAttribute("data-state", "not-applicable");
  expect(plot.mock.calls[0]![0].data.map(row => row.series0)).toEqual([0, null, null]);
  expect(plot.mock.calls[0]![0].type).toBe("line");
  expect(screen.getByRole("figure", { name: "数值图" })).toBeVisible();
  expect(screen.getByText("数值")).toBeVisible();
});

test("a single series takes the first series color (data is color, text is ink) and needs no legend; two or more take ordered series colors and a legend", () => {
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  const { rerender } = render(<Chart type="bar" label="单系列" categoryLabel="项" valueLabel="数值" series={series} rows={rows.slice(0, 1)} renderPlot={plot} />);
  // 只有一种颜色时，标题已经说明画的是什么；图例框只是复述（NG1），色相也无类别可分（NG10）。
  expect(plot.mock.calls[0]![0].series[0]!.color).toBe("var(--qy-chart-1)");
  expect(screen.queryByRole("list")).toBeNull();
  const two = [{ key: "a", label: "成功" }, { key: "b", label: "失败" }];
  rerender(<Chart type="bar" label="两系列" categoryLabel="项" valueLabel="数值" series={two} rows={[{ id: "r", label: "周一", values: { a: 3, b: 1 } }]} renderPlot={plot} />);
  const projected = plot.mock.calls.at(-1)![0].series;
  expect(projected.map(item => item.color)).toEqual(["var(--qy-chart-1)", "var(--qy-chart-2)"]);
  expect(screen.getByRole("list")).toHaveTextContent("成功失败");
});

test("a chart only draws data: nothing to plot is rejected, and rows without any number draw no plot but keep the table", () => {
  // 用户裁决 2026-10-10：功能要纯粹。没有记录、未知或不适用由调用方在原位放 Empty，图不兼任。
  expect(() => render(<Chart type="line" label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={[]} />)).toThrow(/render Empty in its place/);
  // @ts-expect-error 整图的非数据状态不是图的属性。
  void (<Chart label="数值图" state="empty">没有记录</Chart>);
  const plot = vi.fn(() => <div>图</div>);
  const { rerender } = render(<div />);
  rerender(<Chart type="line" label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={rows.slice(1)} renderPlot={plot} />);
  expect(plot).not.toHaveBeenCalled(); openTable(); expect(screen.getByRole("table", { name: "数值图" })).toBeVisible();
});

test("nonfinite or missing numeric facts and an unchosen form are rejected", () => {
  expect(() => render(<Chart type="line" label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={[{ id: "bad", label: "项", values: { value: NaN } }]} />)).toThrow(/finite numbers/);
  expect(() => render(<Chart type="bar" label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={[{ id: "bad", label: "项", values: {} }]} />)).toThrow(/finite numbers/);
  // @ts-expect-error 形式由任务选定，必须显式给出。
  expect(() => render(<Chart label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={rows} />)).toThrow(/type/);
});

test("area and area-stacked render through AreaChart; a single series needs two or more to stack", () => {
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  const two = [{ key: "a", label: "成功" }, { key: "b", label: "失败" }];
  const areaRows = [{ id: "r", label: "周一", values: { a: 3, b: 1 } }];
  render(<Chart type="area" label="面积图" categoryLabel="项" valueLabel="数值" series={two} rows={areaRows} renderPlot={plot} />);
  expect(plot.mock.calls[0]![0].type).toBe("area");
  expect(() => render(<Chart type="area-stacked" label="面积图" categoryLabel="项" valueLabel="数值" series={series} rows={rows.slice(0, 1)} />)).toThrow(/stacks two or more/);
  render(<Chart type="area-stacked" label="堆叠面积图" categoryLabel="项" valueLabel="数值" series={two} rows={areaRows} renderPlot={plot} />);
  expect(plot.mock.calls.at(-1)![0].type).toBe("area-stacked");
});

test("bar-horizontal and bar-stacked reuse the same rows/series contract as bar", () => {
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  const two = [{ key: "a", label: "成功" }, { key: "b", label: "失败" }];
  const barRows = [{ id: "r", label: "来源名称很长的一个类别", values: { a: 3, b: 1 } }];
  render(<Chart type="bar-horizontal" label="横向柱" categoryLabel="来源" valueLabel="次数" series={two} rows={barRows} renderPlot={plot} />);
  expect(plot.mock.calls[0]![0].type).toBe("bar-horizontal");
  expect(() => render(<Chart type="bar-stacked" label="堆叠柱" categoryLabel="来源" valueLabel="次数" series={series} rows={rows.slice(0, 1)} />)).toThrow(/stacks two or more/);
  render(<Chart type="bar-stacked" label="堆叠柱" categoryLabel="来源" valueLabel="次数" series={two} rows={barRows} renderPlot={plot} />);
  expect(plot.mock.calls.at(-1)![0].type).toBe("bar-stacked");
});

test("donut requires exactly one row, two to five known non-negative parts, and folds a larger total into a rest slice", () => {
  const parts = [{ key: "a", label: "成功" }, { key: "b", label: "失败" }];
  const oneRow = [{ id: "r", label: "本周", values: { a: 3, b: 1 } }];
  // 多行不是一个整体的拆分，是多类别并排比较——donut 的任务边界。
  expect(() => render(<Chart type="donut" label="环形图" categoryLabel="项" valueLabel="次数" series={parts} rows={rows} />)).toThrow(/exactly one row/);
  // 少于两个部分没有「一眼占比」的意义；超过五个超出色觉校验顺序，应改用 Proportion 或条形图。
  expect(() => render(<Chart type="donut" label="环形图" categoryLabel="项" valueLabel="次数" series={[parts[0]!]} rows={oneRow} />)).toThrow(/two to five parts/);
  // 未知/负值没有扇形几何：整体不可得时由调用方改放 Empty，而不是逐部分的未知。
  expect(() => render(<Chart type="donut" label="环形图" categoryLabel="项" valueLabel="次数" series={parts} rows={[{ id: "r", label: "本周", values: { a: 3, b: { state: "unknown", label: "尚未统计" } } }]} />)).toThrow(/non-negative number/);
  const plot = vi.fn((projection: ChartPlotData) => <div>{projection.total}</div>);
  render(<Chart type="donut" label="环形图" categoryLabel="项" valueLabel="次数" series={parts} rows={oneRow} total={10} renderPlot={plot} />);
  expect(plot.mock.calls[0]![0].total).toBe(10);
  expect(plot.mock.calls[0]![0].type).toBe("donut");
});
