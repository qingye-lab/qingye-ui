import type * as React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Chart, ReadoutTooltip, type ChartPlotData, type ChartProjectedSeries, type ChartRow } from "../src/components/chart";
import { toneColor } from "../src/tone";

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

const days: readonly ChartRow[] = ["周一", "周二", "周三", "周四"].map((day, index) => ({ id: day, label: day, values: { main: 20 + index, rest: 21 + index, other: 19 + index } }));
const lineProps = { type: "line", categoryLabel: "日", valueLabel: "温度", rows: days } as const;
const main = { key: "main", label: "三号室" };

test("references need a nonempty name, finite values and a band with width, and have no home on a donut", () => {
  const props = { ...lineProps, label: "图", series: [main] };
  expect(() => render(<Chart {...props} references={[{ kind: "line", value: 22, label: " " }]} />)).toThrow(/label/);
  expect(() => render(<Chart {...props} references={[{ kind: "band", from: 24, to: 22, label: "适宜" }]} />)).toThrow(/from < to/);
  expect(() => render(<Chart {...props} references={[{ kind: "line", value: NaN, label: "目标" }]} />)).toThrow(/finite/);
  const parts = [{ key: "a", label: "成功" }, { key: "b", label: "失败" }];
  expect(() => render(<Chart type="donut" label="环" categoryLabel="项" valueLabel="次" series={parts} rows={[{ id: "r", label: "本周", values: { a: 1, b: 2 } }]} references={[{ kind: "line", value: 1, label: "目标" }]} />)).toThrow(/donut/);
});

test("references are named in the legend and, with their values, beside the equivalent table", () => {
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  render(<Chart {...lineProps} label="图" series={[main]} renderPlot={plot} references={[{ kind: "band", from: 22, to: 26, label: "适宜温度" }, { kind: "line", value: 30, label: "报警线" }]} />);
  // 只有一个系列但有参照：图例要出现，否则参照没有名字。
  const legend = screen.getByRole("list");
  expect(within(legend).getAllByRole("listitem").map(item => item.textContent)).toEqual(["三号室", "适宜温度", "报警线"]);
  expect(plot.mock.calls[0]![0].references).toHaveLength(2);
  openTable();
  const notes = screen.getByRole("list", { name: "参照" });
  expect(notes).toHaveTextContent("适宜温度22–26");
  expect(notes).toHaveTextContent("报警线30");
});

test("a context series is only for line, needs a contextLabel, takes no identity color and shows as one legend entry", () => {
  const rest = [{ key: "rest", label: "二号室", context: true }, { key: "other", label: "四号室", context: true }];
  expect(() => render(<Chart {...lineProps} type="bar" label="图" series={[main, rest[0]!]} contextLabel="其余" />)).toThrow(/line/);
  expect(() => render(<Chart {...lineProps} label="图" series={[main, ...rest]} />)).toThrow(/contextLabel/);
  expect(() => render(<Chart {...lineProps} label="图" series={[main, { ...rest[0]!, tone: "danger" }]} contextLabel="其余" />)).toThrow(/tone/);
  expect(() => render(<Chart {...lineProps} label="图" series={rest} contextLabel="其余" />)).toThrow(/one to five series/);
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  render(<Chart {...lineProps} label="图" series={[main, ...rest]} contextLabel="其余蚕室" renderPlot={plot} />);
  const projected = plot.mock.calls[0]![0].series;
  expect(projected.map(item => [item.context, item.color])).toEqual([[false, "var(--qy-chart-1)"], [true, expect.not.stringContaining("--qy-chart-")], [true, expect.not.stringContaining("--qy-chart-")]]);
  // 图例：身份系列一项，背景系列合成一项；背景系列各自的名字不进图例。
  const items = within(screen.getByRole("list")).getAllByRole("listitem").map(item => item.textContent);
  expect(items).toEqual(["三号室", "其余蚕室"]);
  // 等价数据表列出全部系列。
  openTable();
  expect(within(screen.getByRole("table", { name: "图" })).getAllByRole("columnheader").map(cell => cell.textContent)).toEqual(["日", "三号室", "二号室", "四号室"]);
});

test("the next identity color skips context series, which take no quota of the five", () => {
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  render(<Chart {...lineProps} label="图" series={[{ key: "rest", label: "二号室", context: true }, main, { key: "other", label: "四号室" }]} contextLabel="其余" renderPlot={plot} />);
  expect(plot.mock.calls[0]![0].series.map(item => item.color)).toEqual([expect.not.stringContaining("--qy-chart-"), "var(--qy-chart-1)", "var(--qy-chart-2)"]);
});

test("events must point at an existing row, have names, and have no category axis on a donut; they join the table as a column", () => {
  const props = { ...lineProps, label: "图", series: [main] };
  expect(() => render(<Chart {...props} events={[{ rowId: "周九", label: "开窗" }]} />)).toThrow(/does not exist/);
  expect(() => render(<Chart {...props} events={[{ rowId: "周一", label: "" }]} />)).toThrow(/label/);
  // @ts-expect-error tone 必须是状态类别之一。
  expect(() => render(<Chart {...props} events={[{ rowId: "周一", label: "开窗", tone: "pink" }]} />)).toThrow(/tone/);
  const parts = [{ key: "a", label: "成功" }, { key: "b", label: "失败" }];
  expect(() => render(<Chart type="donut" label="环" categoryLabel="项" valueLabel="次" series={parts} rows={[{ id: "r", label: "本周", values: { a: 1, b: 2 } }]} events={[{ rowId: "r", label: "改版" }]} />)).toThrow(/donut/);
  render(<Chart {...props} events={[{ rowId: "周二", label: "开窗通风" }, { rowId: "周二", label: "关窗" }]} renderPlot={() => <div />} />);
  openTable();
  const table = screen.getByRole("table", { name: "图" });
  expect(within(table).getAllByRole("columnheader").map(cell => cell.textContent)).toEqual(["日", "三号室", "事件"]);
  const row = within(table).getByRole("row", { name: /周二/ });
  expect(row).toHaveTextContent("开窗通风关窗");
});

test("valueDomain is for line only; the other forms are length or area encodings that must start at zero", () => {
  for (const type of ["bar", "area", "bar-horizontal"] as const) {
    expect(() => render(<Chart {...lineProps} type={type} label="图" series={[main]} valueDomain={[10, 30]} />)).toThrow(/line.*start at zero/);
  }
  const props = { ...lineProps, label: "图", series: [main] };
  expect(() => render(<Chart {...props} valueDomain={[30, 10]} />)).toThrow(/min < max/);
  // 截掉数据与名实不符：已知值与参照都必须落在范围内。
  expect(() => render(<Chart {...props} valueDomain={[21, 30]} />)).toThrow(/outside valueDomain/);
  expect(() => render(<Chart {...props} valueDomain={[10, 30]} references={[{ kind: "line", value: 40, label: "报警" }]} />)).toThrow(/outside valueDomain/);
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  render(<Chart {...props} valueDomain={[10, 30]} renderPlot={plot} />);
  expect(plot.mock.calls[0]![0].valueDomain).toEqual([10, 30]);
});

test("series tone is all-or-none, distinct, and takes the status color in place of the ordered color", () => {
  const two = [{ key: "main", label: "成功", tone: "success" as const }, { key: "rest", label: "失败", tone: "danger" as const }];
  const props = { ...lineProps, type: "bar-stacked", label: "图" } as const;
  expect(() => render(<Chart {...props} series={[two[0]!, { key: "rest", label: "失败" }]} />)).toThrow(/every non-context series or on none/);
  expect(() => render(<Chart {...props} series={[two[0]!, { ...two[1]!, tone: "success" }]} />)).toThrow(/distinct/);
  // @ts-expect-error tone 必须是状态类别之一。
  expect(() => render(<Chart {...props} series={[{ ...two[0]!, tone: "pink" }, two[1]!]} />)).toThrow(/tone/);
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  render(<Chart {...props} series={two} renderPlot={plot} />);
  expect(plot.mock.calls[0]![0].series.map(item => item.color)).toEqual([toneColor.success, toneColor.danger]);
});

test("the readout lists only identity series, places each value against the first band, and names the row's events", () => {
  const series: ChartProjectedSeries[] = [
    { key: "main", label: "三号室", dataKey: "s0", color: "red", marker: "circle", context: false },
    { key: "rest", label: "其余", dataKey: "s1", color: "gray", marker: "circle", context: true },
  ];
  const band = { kind: "band" as const, from: 22, to: 26, label: "适宜温度" };
  const entry = (dataKey: string, value: number) => ({ dataKey, value, payload: { id: "周二" } });
  const { rerender } = render(<ReadoutTooltip active label="周二" series={series} format={value => `${value} ℃`} band={band} payload={[entry("s0", 27.2), entry("s1", 21)]} eventsOf={() => [{ rowId: "周二", label: "开窗通风" }]} />);
  expect(screen.getByText("27.2 ℃")).toBeVisible();
  expect(screen.queryByText("其余")).toBeNull();
  expect(screen.getByText("高于适宜温度 1.2 ℃")).toBeVisible();
  expect(screen.getByText("开窗通风")).toBeVisible();
  rerender(<ReadoutTooltip active label="周二" series={series} format={value => `${value} ℃`} band={band} payload={[entry("s0", 20.5)]} />);
  expect(screen.getByText("低于适宜温度 1.5 ℃")).toBeVisible();
  rerender(<ReadoutTooltip active label="周二" series={series} format={value => `${value} ℃`} band={band} payload={[entry("s0", 26)]} />);
  expect(screen.getByText("在适宜温度内")).toBeVisible();
  rerender(<ReadoutTooltip active label="周二" series={series} format={value => `${value} ℃`} payload={[entry("s0", 26)]} />);
  expect(screen.queryByText(/适宜温度/)).toBeNull();
});

const pair = [{ key: "a", label: "成功" }, { key: "b", label: "失败" }];
const pairRows: readonly ChartRow[] = [{ id: "r1", label: "接口", values: { a: 30, b: 10 } }, { id: "r2", label: "导入", values: { a: 1, b: 3 } }];
const pairProps = { categoryLabel: "来源", valueLabel: "次数", series: pair, rows: pairRows } as const;

test("a step is for line and area forms only, and stacked areas share one interpolation", () => {
  for (const type of ["bar", "bar-horizontal", "bar-stacked", "bar-share", "donut"] as const) {
    expect(() => render(<Chart type={type} label="图" {...pairProps} rows={type === "donut" ? pairRows.slice(0, 1) : pairRows} series={[{ ...pair[0]!, interpolation: "step" }, pair[1]!]} />)).toThrow(/interpolation/);
  }
  // @ts-expect-error 只有 linear 与 step。
  expect(() => render(<Chart type="line" label="图" {...pairProps} series={[{ ...pair[0]!, interpolation: "smooth" }, pair[1]!]} />)).toThrow(/linear.*step/);
  expect(() => render(<Chart type="area-stacked" label="图" {...pairProps} series={[{ ...pair[0]!, interpolation: "step" }, pair[1]!]} />)).toThrow(/same interpolation/);
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  render(<Chart type="line" label="图" {...pairProps} series={[{ ...pair[0]!, interpolation: "step" }, pair[1]!]} renderPlot={plot} />);
  expect(plot.mock.calls[0]![0].series.map(item => item.interpolation)).toEqual(["step", undefined]);
  render(<Chart type="area-share" label="图" {...pairProps} series={pair.map(item => ({ ...item, interpolation: "step" as const }))} renderPlot={plot} />);
  expect(plot.mock.calls.at(-1)![0].series.map(item => item.interpolation)).toEqual(["step", "step"]);
});

test("share forms divide each row among its series; an incomplete row is not drawn and the table shows what is known", () => {
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  const shareRows: readonly ChartRow[] = [
    ...pairRows,
    { id: "gap", label: "缺项", values: { a: 5, b: { state: "unknown", label: "尚未统计" } } },
    { id: "empty", label: "全零", values: { a: 0, b: 0 } },
  ];
  render(<Chart type="bar-share" label="占比" {...pairProps} rows={shareRows} renderPlot={plot} />);
  const projection = plot.mock.calls[0]![0];
  expect(projection.data.map(row => [row.series0, row.series1])).toEqual([[0.75, 0.25], [0.25, 0.75], [null, null], [null, null]]);
  expect(projection.raw!.map(row => [row.series0, row.series1])).toEqual([[30, 10], [1, 3], [5, null], [0, 0]]);
  openTable();
  const table = screen.getByRole("table", { name: "占比" });
  expect(within(table).getAllByRole("columnheader").map(cell => cell.textContent)).toEqual(["来源", "成功", "失败", "合计"]);
  const cells = (name: string) => within(within(table).getByRole("row", { name: new RegExp(name) })).getAllByRole("cell").map(cell => cell.textContent);
  // 原值与占比同时给出；未画的行只写已知的原值，合计在缺项时写明不合计。
  expect(cells("接口")).toEqual(["30（75%）", "10（25%）", "40"]);
  expect(cells("缺项")).toEqual(["5", "尚未统计", "缺项，未合计"]);
  expect(cells("全零")).toEqual(["0", "0", "0"]);
});

test("share forms reject negative values, a single series, references and a value domain", () => {
  const props = { type: "bar-share", label: "占比", ...pairProps } as const;
  expect(() => render(<Chart {...props} rows={[{ id: "r", label: "行", values: { a: -1, b: 3 } }]} />)).toThrow(/non-negative/);
  expect(() => render(<Chart {...props} series={[pair[0]!]} />)).toThrow(/always 100%/);
  expect(() => render(<Chart {...props} references={[{ kind: "line", value: 0.5, label: "半数" }]} />)).toThrow(/0–100%/);
  expect(() => render(<Chart {...props} type="area-share" valueDomain={[0, 1]} />)).toThrow(/line.*start at zero/);
  expect(() => render(<Chart {...props} series={[main, { key: "rest", label: "其余", context: true }]} contextLabel="其余" />)).toThrow(/line/);
});

test("stacked forms total each row; a row with an unavailable part is not totaled, in the table and in the readout", () => {
  const stackRows: readonly ChartRow[] = [pairRows[0]!, { id: "gap", label: "缺项", values: { a: 5, b: { state: "not-applicable", label: "不适用" } } }];
  render(<Chart type="bar-stacked" label="堆叠" {...pairProps} rows={stackRows} renderPlot={() => <div />} />);
  openTable();
  const table = screen.getByRole("table", { name: "堆叠" });
  expect(within(table).getAllByRole("columnheader").map(cell => cell.textContent)).toEqual(["来源", "成功", "失败", "合计"]);
  expect(within(within(table).getByRole("row", { name: /接口/ })).getAllByRole("cell").at(-1)).toHaveTextContent("40");
  expect(within(within(table).getByRole("row", { name: /缺项/ })).getAllByRole("cell").at(-1)).toHaveAttribute("data-state", "unknown");
});

test("the readout totals stacked rows and gives a share's original value with its percentage", () => {
  const items: ChartProjectedSeries[] = [
    { key: "a", label: "成功", dataKey: "s0", color: "red", marker: "circle", context: false },
    { key: "b", label: "失败", dataKey: "s1", color: "blue", marker: "square", context: false },
  ];
  const entry = (dataKey: string, value: number | null) => ({ dataKey, value, payload: { id: "r1" } });
  const raws: Record<string, string | null> = { a: "30", b: "10" };
  render(<ReadoutTooltip active label="接口" series={items} format={value => String(value)} payload={[entry("s0", 0.75), entry("s1", 0.25)]}
    share={{ raw: (_row, key) => raws[key] ?? null, percent: new Intl.NumberFormat("zh-CN", { style: "percent", maximumFractionDigits: 1 }) }} total={() => "40"} />);
  expect(screen.getByText("30（75%）")).toBeVisible();
  expect(screen.getByText("10（25%）")).toBeVisible();
  expect(screen.getByText("40")).toBeVisible();
  expect(screen.getByText("合计")).toBeVisible();
});

test("value labels are for a single-series bar or horizontal bar with few rows, and are passed to a custom plot", () => {
  const props = { label: "图", categoryLabel: "来源", valueLabel: "次数" } as const;
  for (const type of ["line", "area", "bar-stacked", "bar-share", "donut"] as const) {
    expect(() => render(<Chart {...props} type={type} series={pair} rows={type === "donut" ? pairRows.slice(0, 1) : pairRows} valueLabels />)).toThrow(/valueLabels/);
  }
  expect(() => render(<Chart {...props} type="bar" series={pair} rows={pairRows} valueLabels />)).toThrow(/single series/);
  const many = Array.from({ length: 13 }, (_, index) => ({ id: `r${index}`, label: `行${index}`, values: { a: index } }));
  expect(() => render(<Chart {...props} type="bar-horizontal" series={[pair[0]!]} rows={many} valueLabels />)).toThrow(/at most 12 rows/);
  const plot = vi.fn((_projection: ChartPlotData) => <div />);
  render(<Chart {...props} type="bar" series={[pair[0]!]} rows={many.slice(0, 3)} valueLabels renderPlot={plot} />);
  expect(plot.mock.calls[0]![0].valueLabels).toBe(true);
});

test("a donut's legend gives each part its value and share, and the remainder when the total is larger", () => {
  const parts = [{ key: "a", label: "成功" }, { key: "b", label: "失败" }];
  const props = { type: "donut", label: "环", categoryLabel: "周", valueLabel: "次数", series: parts, rows: [{ id: "w", label: "本周", values: { a: 3, b: 1 } }] } as const;
  const { unmount } = render(<Chart {...props} />);
  const items = () => within(screen.getByRole("list")).getAllByRole("listitem").map(item => item.textContent);
  expect(items()).toEqual(["成功3（75%）", "失败1（25%）"]);
  unmount();
  render(<Chart {...props} total={8} formatValue={value => `${value} 次`} />);
  expect(items()).toEqual(["成功3 次（37.5%）", "失败1 次（12.5%）", "其余4 次（50%）"]);
});

test("a missing name throws a readable Error naming the item, not a TypeError from .trim()", () => {
  const draw = (props: Partial<React.ComponentProps<typeof Chart>>) => () => render(<Chart type="line" label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={rows} {...props} />);
  const error = (fn: () => unknown) => { try { fn(); } catch (caught) { return caught as Error; } throw new Error("expected a throw"); };
  const missingSeries = error(draw({ series: [{ key: "value", label: "系列" }, { key: "humidity", label: undefined as unknown as string }] }));
  expect(missingSeries).not.toBeInstanceOf(TypeError);
  expect(missingSeries.message).toBe('Chart series[1] (key "humidity") requires a nonempty label; received undefined.');
  const missingRow = error(draw({ rows: [{ id: "r", label: undefined as unknown as string, values: { value: 1 } }] }));
  expect(missingRow).not.toBeInstanceOf(TypeError);
  expect(missingRow.message).toMatch(/Chart rows\[0\] \(id "r"\) requires a nonempty label; received undefined/);
  expect(error(draw({ rows: [{ id: undefined as unknown as string, label: "项", values: { value: 1 } }] })).message).toMatch(/Chart rows\[0\] requires a nonempty id/);
  expect(error(draw({ series: [{ key: "value", label: "甲" }, { key: "value", label: "乙" }] })).message).toMatch(/series\[1\] repeats the key "value"/);
  expect(error(draw({ label: undefined as unknown as string }))).not.toBeInstanceOf(TypeError);
  expect(error(draw({ rows: undefined as unknown as ChartRow[] })).message).toMatch(/real rows/);
});

test("framed={false} with an external name: no figcaption, the figure takes the outside name, the data toggle stays", () => {
  render(<section><h2 id="trend-title">本周趋势</h2><Chart framed={false} aria-labelledby="trend-title" type="line" label="本周同步次数" categoryLabel="项" valueLabel="数值" series={series} rows={rows} /></section>);
  const figure = screen.getByRole("figure", { name: "本周趋势" });
  expect(figure).toHaveAttribute("data-framed", "false");
  expect(figure.querySelector("figcaption")).toBeNull();
  openTable();
  expect(within(figure).getByRole("table", { name: "本周同步次数" })).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "查看数据" })).toHaveAttribute("aria-expanded", "true");
});

test("the default stays framed and self-titled; unframed without an outside name keeps its own title", () => {
  const { unmount } = render(<Chart type="line" label="本周同步次数" categoryLabel="项" valueLabel="数值" series={series} rows={rows} />);
  expect(screen.getByRole("figure", { name: "本周同步次数" })).toHaveAttribute("data-framed", "true");
  unmount();
  render(<Chart framed={false} type="line" label="本周同步次数" categoryLabel="项" valueLabel="数值" series={series} rows={rows} />);
  const figure = screen.getByRole("figure", { name: "本周同步次数" });
  expect(figure).toHaveAttribute("data-framed", "false");
  expect(figure.querySelector("figcaption")).toHaveTextContent("本周同步次数");
});
