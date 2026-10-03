import { render, screen, within } from "@testing-library/react";
import { expect, test, vi } from "vitest";
import { Chart, type ChartPlotData, type ChartRow } from "../src/components/chart";

const series = [{ key: "value", label: "系列" }];
const rows: readonly ChartRow[] = [
  { id: "zero", label: "零值", values: { value: 0 } },
  { id: "unknown", label: "未知项", values: { value: { state: "unknown", label: "尚未核实" } } },
  { id: "na", label: "不适用项", values: { value: { state: "not-applicable", label: "不适用" } } },
];
test("zero and explicit unavailable facts retain same-source numeric table and caller plot projection", () => {
  const plot = vi.fn((projection: ChartPlotData) => <div>{projection.categoryLabel}</div>);
  render(<Chart label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={rows} renderPlot={plot} />);
  const table = screen.getByRole("table", { name: "数值图" });
  expect(within(table).getByRole("cell", { name: "0" })).toBeVisible();
  expect(within(table).getByRole("cell", { name: "尚未核实" })).toHaveAttribute("data-state", "unknown");
  expect(within(table).getByRole("cell", { name: "不适用" })).toHaveAttribute("data-state", "not-applicable");
  expect(plot.mock.calls[0]![0].data.map(row => row.series0)).toEqual([0, null, null]);
  expect(screen.getByRole("figure", { name: "数值图" })).toBeVisible();
  expect(screen.getByText("数值")).toBeVisible(); expect(screen.getByRole("list")).toHaveTextContent("系列");
});
test("explicit empty, unknown and not-applicable states render caller facts without a fabricated numeric table or plot", () => {
  const { rerender } = render(<Chart label="数值图" state="empty">没有记录</Chart>);
  expect(screen.getByText("没有记录")).toBeVisible(); expect(screen.queryByRole("table")).toBeNull();
  rerender(<Chart label="数值图" state="unknown">结果尚未核实</Chart>); expect(screen.getByText("结果尚未核实")).toBeVisible();
  rerender(<Chart label="数值图" state="not-applicable">不适用</Chart>); expect(screen.getByText("不适用")).toBeVisible();
  const plot = vi.fn(() => <div>图</div>);
  rerender(<Chart label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={rows.slice(1)} renderPlot={plot} />);
  expect(plot).not.toHaveBeenCalled(); expect(screen.getByRole("table", { name: "数值图" })).toBeVisible();
});
test("nonfinite or missing numeric facts are rejected rather than represented as zero", () => {
  expect(() => render(<Chart label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={[{ id: "bad", label: "项", values: { value: NaN } }]} />)).toThrow(/finite numbers/);
  expect(() => render(<Chart label="数值图" categoryLabel="项" valueLabel="数值" series={series} rows={[{ id: "bad", label: "项", values: {} }]} />)).toThrow(/finite numbers/);
});
