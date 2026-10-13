import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { Heatmap, type HeatmapColumn, type HeatmapLevel, type HeatmapRow } from "../src/components/heatmap";

const columns: readonly HeatmapColumn[] = [{ key: "mon", label: "周一" }, { key: "tue", label: "周二" }, { key: "wed", label: "周三" }];
const rows: readonly HeatmapRow[] = [
  { id: "am", label: "上午", values: { mon: 12, tue: 0, wed: { state: "unknown", label: "尚未统计" } } },
  { id: "pm", label: "下午", values: { mon: 30, tue: 18, wed: 6 } },
];
const openTable = () => fireEvent.click(screen.getByRole("button", { name: "查看数据" }));

test("every cell names its row, column and value or unavailable fact", () => {
  render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns} rows={rows} />);
  expect(screen.getByRole("gridcell", { name: "上午 周一：12" })).toBeVisible();
  expect(screen.getByRole("gridcell", { name: "上午 周三：尚未统计" })).toHaveAttribute("data-state", "unknown");
  expect(screen.getByRole("gridcell", { name: "下午 周二：18" })).toHaveAttribute("data-state", "known");
});

test("the equivalent data table retains the real grid including the unavailable cell", () => {
  render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns} rows={rows} />);
  openTable();
  const table = screen.getByRole("table", { name: "同步热度" });
  expect(within(table).getByRole("cell", { name: "尚未统计" })).toHaveAttribute("data-state", "unknown");
  expect(within(table).getByRole("cell", { name: "30" })).toBeVisible();
});

test("a heatmap only draws data: a chart-wide non-data state is not one of its props", () => {
  // 用户裁决 2026-10-10：功能要纯粹。没有网格可画时由调用方在原位放 Empty。
  // @ts-expect-error 整图的非数据状态不是图的属性。
  void (<Heatmap label="同步热度" state="empty">没有记录</Heatmap>);
  expect(() => render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={[]} rows={[]} />)).toThrow(/two or more/);
});

test("fewer than two rows or columns, and a cell missing a column's fact, are rejected", () => {
  expect(() => render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns.slice(0, 1)} rows={rows} />)).toThrow(/two or more/);
  expect(() => render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns} rows={[rows[0]!, { id: "pm", label: "下午", values: { mon: 1, tue: 1 } }]} />)).toThrow(/finite numbers/);
});

const common = { label: "同步热度", rowLabel: "时段", columnLabel: "星期", valueLabel: "同步次数", columns, rows } as const;
const levels: readonly HeatmapLevel[] = [{ label: "平稳" }, { from: 10, label: "偏高", tone: "warning" }, { from: 20, label: "严重", tone: "danger" }];
const focus = (element: HTMLElement) => act(() => element.focus());
const cells = () => screen.getAllByRole("gridcell");

test("a formatValue that returns a node never leaks into the accessible name", () => {
  render(<Heatmap {...common} formatValue={(value) => <strong>{value} 次</strong>} />);
  expect(screen.getByRole("gridcell", { name: "上午 周一：12" })).toBeInTheDocument();
  expect(cells().every(cell => !cell.getAttribute("aria-label")!.includes("[object Object]"))).toBe(true);
  // 字符串结果照用。
  render(<Heatmap {...common} formatValue={(value) => `${value} 次`} />);
  expect(screen.getByRole("gridcell", { name: "上午 周一：12 次" })).toBeInTheDocument();
});

test("the whole grid is one tab stop and the arrow keys, Home and End move between cells", () => {
  render(<Heatmap {...common} />);
  const tabStops = () => cells().filter(cell => cell.tabIndex === 0);
  expect(tabStops()).toHaveLength(1);
  const grid = screen.getByRole("grid");
  const at = (name: string) => screen.getByRole("gridcell", { name });
  focus(at("上午 周一：12"));
  fireEvent.keyDown(document.activeElement!, { key: "ArrowRight" });
  expect(document.activeElement).toBe(at("上午 周二：0"));
  fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
  expect(document.activeElement).toBe(at("下午 周二：18"));
  fireEvent.keyDown(document.activeElement!, { key: "End" });
  expect(document.activeElement).toBe(at("下午 周三：6"));
  fireEvent.keyDown(document.activeElement!, { key: "Home" });
  expect(document.activeElement).toBe(at("下午 周一：30"));
  fireEvent.keyDown(document.activeElement!, { key: "End", ctrlKey: true });
  expect(document.activeElement).toBe(at("下午 周三：6"));
  fireEvent.keyDown(document.activeElement!, { key: "Home", ctrlKey: true });
  expect(document.activeElement).toBe(at("上午 周一：12"));
  fireEvent.keyDown(document.activeElement!, { key: "ArrowUp" });
  fireEvent.keyDown(document.activeElement!, { key: "ArrowLeft" });
  expect(document.activeElement).toBe(at("上午 周一：12"));
  // 离开再回来：唯一的停靠点跟着最后所在的格。
  fireEvent.keyDown(document.activeElement!, { key: "ArrowDown" });
  act(() => (document.activeElement as HTMLElement).blur());
  expect(tabStops()).toEqual([at("下午 周一：30")]);
  expect(grid).toHaveAttribute("aria-readonly", "true");
});

test("Escape dismisses the readout without moving focus", () => {
  render(<Heatmap {...common} />);
  const cell = screen.getByRole("gridcell", { name: "下午 周一：30" });
  focus(cell);
  expect(screen.getByRole("tooltip")).toHaveTextContent("30");
  fireEvent.keyDown(cell, { key: "Escape" });
  expect(screen.queryByRole("tooltip")).toBeNull();
  expect(document.activeElement).toBe(cell);
});

test("levels must be two to five named steps with a strictly increasing lower bound", () => {
  const draw = (steps: readonly HeatmapLevel[]) => () => render(<Heatmap {...common} levels={steps} />);
  expect(draw([{ label: "平稳" }])).toThrow(/two to five/);
  expect(draw(Array.from({ length: 6 }, (_, i) => (i === 0 ? { label: "0" } : { label: String(i), from: i })))).toThrow(/two to five/);
  expect(draw([{ label: "平稳", from: 0 }, { label: "偏高", from: 10 }])).toThrow(/first Heatmap level/);
  expect(draw([{ label: "平稳" }, { label: "偏高" }])).toThrow(/strictly increasing/);
  expect(draw([{ label: "平稳" }, { label: "偏高", from: 10 }, { label: "严重", from: 10 }])).toThrow(/strictly increasing/);
  expect(draw([{ label: "平稳" }, { label: "偏高", from: 20 }, { label: "严重", from: 10 }])).toThrow(/strictly increasing/);
  expect(draw([{ label: "平稳" }, { label: " ", from: 10 }])).toThrow(/nonempty/);
  expect(draw([{ label: "偏高" }, { label: "偏高", from: 10 }])).toThrow(/unique/);
  expect(draw([{ label: "平稳" }, { label: "偏高", from: 10, tone: "loud" as never }])).toThrow(/tone/);
  expect(draw([{ label: "偏高", tone: "warning" }, { label: "平稳", from: 10 }])).toThrow(/without tone/);
});

test("the level name joins the cell name and the readout; an unknown cell belongs to no level", () => {
  render(<Heatmap {...common} levels={levels} />);
  expect(screen.getByRole("gridcell", { name: "上午 周一：12，偏高" })).toHaveAttribute("data-level", "1");
  expect(screen.getByRole("gridcell", { name: "下午 周一：30，严重" })).toHaveAttribute("data-level", "2");
  expect(screen.getByRole("gridcell", { name: "上午 周二：0，平稳" })).toHaveAttribute("data-level", "0");
  const unknown = screen.getByRole("gridcell", { name: "上午 周三：尚未统计" });
  expect(unknown).not.toHaveAttribute("data-level");
  focus(screen.getByRole("gridcell", { name: "下午 周一：30，严重" }));
  expect(screen.getByRole("tooltip")).toHaveTextContent("30严重");
});

test("rowSummary adds a labelled last column to the grid and the equivalent data table", () => {
  render(<Heatmap {...common} rowSummary={{ label: "合计", value: (row) => `${Object.keys(row.values).length} 项` }} />);
  expect(screen.getByRole("gridcell", { name: "上午 合计：3 项" })).toBeVisible();
  // 汇总格也是格子：End 到行尾就是它，整张图仍只有一个停靠点。
  focus(screen.getByRole("gridcell", { name: "上午 周一：12" }));
  fireEvent.keyDown(document.activeElement!, { key: "End" });
  expect(document.activeElement).toBe(screen.getByRole("gridcell", { name: "上午 合计：3 项" }));
  expect(cells().filter(cell => cell.tabIndex === 0)).toHaveLength(1);
  openTable();
  const table = screen.getByRole("table", { name: "同步热度" });
  expect(within(table).getByRole("columnheader", { name: "合计" })).toBeVisible();
  expect(within(table).getAllByRole("cell", { name: "3 项" })).toHaveLength(2);
});

test("renderReadout replaces the value line only; row and column stay", () => {
  render(<Heatmap {...common} levels={levels} renderReadout={({ row, value, level }) => <div>{row.label}/{typeof value === "number" ? value * 2 : value.label}/{level?.label ?? "无档"}</div>} />);
  focus(screen.getByRole("gridcell", { name: "下午 周二：18，偏高" }));
  const tip = screen.getByRole("tooltip");
  expect(tip).toHaveTextContent("下午/36/偏高");
  expect(tip).toHaveTextContent("周二");
  focus(screen.getByRole("gridcell", { name: "上午 周三：尚未统计" }));
  expect(screen.getByRole("tooltip")).toHaveTextContent("上午/尚未统计/无档");
});

test("a missing row or column name throws a readable Error naming the item, not a TypeError", () => {
  const error = (fn: () => unknown) => { try { fn(); } catch (caught) { return caught as Error; } throw new Error("expected a throw"); };
  const column = error(() => render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={[columns[0]!, { key: "tue", label: undefined as unknown as string }]} rows={rows} />));
  expect(column).not.toBeInstanceOf(TypeError);
  expect(column.message).toBe('Heatmap columns[1] (key "tue") requires a nonempty label; received undefined.');
  const row = error(() => render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns} rows={[rows[0]!, { ...rows[1]!, label: undefined as unknown as string }]} />));
  expect(row).not.toBeInstanceOf(TypeError);
  expect(row.message).toMatch(/Heatmap rows\[1\] \(id "pm"\) requires a nonempty label/);
  expect(error(() => render(<Heatmap label="同步热度" rowLabel={undefined as unknown as string} columnLabel="星期" valueLabel="同步次数" columns={columns} rows={rows} />)).message).toMatch(/rowLabel/);
});

test("framed={false} with an external name names the figure and the grid from outside and drops the figcaption", () => {
  render(<section><h2 id="heat-title">同步热度</h2><Heatmap framed={false} aria-labelledby="heat-title" label="每周时段的同步次数" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns} rows={rows} /></section>);
  const figure = screen.getByRole("figure", { name: "同步热度" });
  expect(figure).toHaveAttribute("data-framed", "false");
  expect(figure.querySelector("figcaption")).toBeNull();
  expect(screen.getByRole("grid", { name: "同步热度" })).toBeInTheDocument();
  openTable();
  expect(within(figure).getByRole("table", { name: "每周时段的同步次数" })).toBeInTheDocument();
});
