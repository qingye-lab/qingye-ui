import { fireEvent, render, screen, within } from "@testing-library/react";
import { expect, test } from "vitest";
import { Heatmap, type HeatmapColumn, type HeatmapRow } from "../src/components/heatmap";

const columns: readonly HeatmapColumn[] = [{ key: "mon", label: "周一" }, { key: "tue", label: "周二" }, { key: "wed", label: "周三" }];
const rows: readonly HeatmapRow[] = [
  { id: "am", label: "上午", values: { mon: 12, tue: 0, wed: { state: "unknown", label: "尚未统计" } } },
  { id: "pm", label: "下午", values: { mon: 30, tue: 18, wed: 6 } },
];
const openTable = () => fireEvent.click(screen.getByRole("button", { name: "查看数据" }));

test("every cell is focusable and names its row, column and value or unavailable fact", () => {
  render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns} rows={rows} />);
  expect(screen.getByRole("img", { name: "上午周一：12" })).toBeVisible();
  expect(screen.getByRole("img", { name: "上午周三：尚未统计" })).toHaveAttribute("data-state", "unknown");
  expect(screen.getByRole("img", { name: "下午周二：18" })).toHaveAttribute("data-state", "known");
});

test("the equivalent data table retains the real grid including the unavailable cell", () => {
  render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns} rows={rows} />);
  openTable();
  const table = screen.getByRole("table", { name: "同步热度" });
  expect(within(table).getByRole("cell", { name: "尚未统计" })).toHaveAttribute("data-state", "unknown");
  expect(within(table).getByRole("cell", { name: "30" })).toBeVisible();
});

test("explicit non-data states render caller facts without a fabricated grid or table", () => {
  render(<Heatmap label="同步热度" state="empty">没有记录</Heatmap>);
  expect(screen.getByText("没有记录")).toBeVisible();
  expect(screen.queryByRole("table")).toBeNull();
});

test("fewer than two rows or columns, and a cell missing a column's fact, are rejected", () => {
  expect(() => render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns.slice(0, 1)} rows={rows} />)).toThrow(/two or more/);
  expect(() => render(<Heatmap label="同步热度" rowLabel="时段" columnLabel="星期" valueLabel="同步次数" columns={columns} rows={[rows[0]!, { id: "pm", label: "下午", values: { mon: 1, tue: 1 } }]} />)).toThrow(/finite numbers/);
});
