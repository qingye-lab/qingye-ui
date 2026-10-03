"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Line, LineChart, ResponsiveContainer, Text as RechartsText, XAxis, YAxis } from "recharts";
import * as React from "react";
import { Empty } from "./empty";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "./table";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type ChartUnavailableValue = { state: "unknown" | "not-applicable"; label: string };
export type ChartValue = number | ChartUnavailableValue;
export type ChartRow = { id: string; label: string; values: Readonly<Record<string, ChartValue>> };
export type ChartSeries = { key: string; label: string };
export type ChartMarker = "circle" | "square" | "triangle" | "diamond" | "cross";
export type ChartProjectedSeries = ChartSeries & { dataKey: string; color: string; marker: ChartMarker; line: string };
export type ChartPlotData = { data: Record<string, string | number | null>[]; series: readonly ChartProjectedSeries[]; categoryLabel: string; valueLabel: string };
export type ChartStyle = React.CSSProperties & {
  "--qy-chart-plot-height"?: string;
  "--qy-chart-stroke-width"?: string | number;
  "--qy-chart-marker-size"?: string;
};
type ChartBaseProps = Omit<useRender.ComponentProps<"figure">, "children" | "style"> & { label: string; style?: ChartStyle };
export type ChartProps = ChartBaseProps & ({
  state?: "ready";
  categoryLabel: string;
  valueLabel: string;
  series: readonly ChartSeries[];
  rows: readonly ChartRow[];
  formatValue?: (value: number, series: ChartSeries, row: ChartRow) => React.ReactNode;
  renderPlot?: (projection: ChartPlotData) => React.ReactNode;
} | { state: "empty" | "unknown" | "not-applicable"; children: React.ReactNode });

// Central, reversible plot presets. Root style overrides these three local
// roles; graph and legend consume the same actual dimensions.
const PLOT_PRESETS: ChartStyle = { "--qy-chart-plot-height": "12em", "--qy-chart-stroke-width": 2, "--qy-chart-marker-size": "8px" };
const MARKERS: readonly ChartMarker[] = ["circle", "square", "triangle", "diamond", "cross"];
const LINES: readonly string[] = ["none", "4 2", "2 2", "8 2 2 2", "1 2"];
// Shapes use one normalized 8×8 viewBox; physical size comes from the local role.
function MarkerShape({ marker }: { marker: ChartMarker }) {
  if (marker === "circle") return <circle cx="4" cy="4" r="4" />;
  if (marker === "square") return <rect width="8" height="8" />;
  if (marker === "triangle") return <path d="M4 0 8 8H0Z" />;
  if (marker === "diamond") return <path d="M4 0 8 4 4 8 0 4Z" />;
  return <path d="M0 4H8M4 0V8" fill="none" stroke="currentColor" strokeWidth="var(--qy-chart-stroke-width)" />;
}
function Marker({ series, cx, cy }: { series: ChartProjectedSeries; cx?: number; cy?: number }) {
  return <svg aria-hidden="true" viewBox="0 0 8 8" width="var(--qy-chart-marker-size)" height="var(--qy-chart-marker-size)" x={cx === undefined ? undefined : `calc(${cx}px - var(--qy-chart-marker-size) / 2)`} y={cy === undefined ? undefined : `calc(${cy}px - var(--qy-chart-marker-size) / 2)`} fill="currentColor" style={{ color: series.color, overflow: "visible" }}><MarkerShape marker={series.marker} /></svg>;
}
function AxisTick({ x = 0, y = 0, textAnchor = "middle", verticalAnchor = "start", className, payload, formatter }: { className?: string; x?: number; y?: number; textAnchor?: "start" | "middle" | "end"; verticalAnchor?: "start" | "middle" | "end"; payload?: { value: string | number }; formatter?: (value: string | number) => string }) {
  return <RechartsText x={x} y={y} textAnchor={textAnchor} verticalAnchor={verticalAnchor} className={cn("text-support", className)} fill="var(--qy-foreground)">{payload ? formatter?.(payload.value) ?? payload.value : ""}</RechartsText>;
}
function DefaultPlot({ data, series, number }: ChartPlotData & { number: Intl.NumberFormat }) {
  return <ResponsiveContainer width="100%" height="100%"><LineChart data={data} accessibilityLayer={false}>
    <XAxis dataKey="category" tick={<AxisTick />} stroke="var(--qy-border-strong)" />
    <YAxis domain={["dataMin", "dataMax"]} tick={<AxisTick formatter={value => typeof value === "number" ? number.format(value) : value} />} stroke="var(--qy-border-strong)" width="auto" />
    {series.map(item => <Line key={item.key} dataKey={item.dataKey} name={item.label} type="linear" stroke={item.color} strokeWidth="var(--qy-chart-stroke-width)" strokeDasharray={item.line} connectNulls={false} isAnimationActive={false} activeDot={false} dot={({ cx, cy }) => cx === undefined || cy === undefined ? <g /> : <Marker series={item} cx={cx} cy={cy} />} />)}
  </LineChart></ResponsiveContainer>;
}
function readValue(row: ChartRow, key: string): ChartValue {
  const value = row.values[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value && typeof value === "object" && (value.state === "unknown" || value.state === "not-applicable") && value.label.trim()) return value;
  throw new TypeError("Chart values must be finite numbers or explicitly named unknown/not-applicable values.");
}

/** A same-source plot, named axes, series legend and visible equivalent table. */
export function Chart({ label, state = "ready", render, ref, className, style, ...props }: ChartProps) {
  if (!label.trim()) throw new Error("Chart requires a nonempty accessible label.");
  const titleId = React.useId();
  const { code } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  let content: React.ReactNode;
  const { categoryLabel, valueLabel, series, rows, formatValue, renderPlot, children, ...native } = props as Omit<ChartBaseProps, "label"> & Partial<Extract<ChartProps, { state?: "ready" }>> & { children?: React.ReactNode };
  if (state !== "ready") content = <Empty state={state}>{children}</Empty>;
  else {
    if (!categoryLabel?.trim() || !valueLabel?.trim() || !series?.length || series.length > MARKERS.length || !rows?.length) throw new Error("Chart ready state requires named axes, one to five series and real rows; use an explicit non-data state otherwise.");
    if (new Set(series.map(item => item.key)).size !== series.length || series.some(item => !item.key.trim() || !item.label.trim()) || new Set(rows.map(row => row.id)).size !== rows.length || rows.some(row => !row.id.trim() || !row.label.trim())) throw new Error("Chart series and rows require unique stable ids and nonempty names.");
    const projected = series.map((item, index) => ({ ...item, dataKey: `series${index}`, color: `var(--qy-chart-${index + 1})`, marker: MARKERS[index]!, line: LINES[index]! }));
    let numeric = false;
    const data = rows.map(row => {
      const record: Record<string, string | number | null> = { id: row.id, category: row.label };
      projected.forEach(item => { const value = readValue(row, item.key); if (typeof value === "number") numeric = true; record[item.dataKey] = typeof value === "number" ? value : null; });
      return record;
    });
    const projection: ChartPlotData = { data, series: projected, categoryLabel, valueLabel };
    content = <>
      <div data-slot="chart-value-axis" className="min-w-0 text-support wrap-anywhere">{valueLabel}</div>
      {numeric && <div data-slot="chart-plot" aria-hidden={renderPlot ? undefined : true} style={{ height: "var(--qy-chart-plot-height)" }} className="min-w-0 w-full">{renderPlot ? renderPlot(projection) : <DefaultPlot {...projection} number={number} />}</div>}
      <div data-slot="chart-category-axis" className="min-w-0 text-support wrap-anywhere">{categoryLabel}</div>
      <ul data-slot="chart-legend" className="flex min-w-0 flex-wrap gap-(--qy-action-gap) text-support">{projected.map(item => <li key={item.key} className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere"><Marker series={item} /><span>{item.label}</span></li>)}</ul>
      <TableContainer><Table aria-label={label}><TableHeader><TableRow><TableHead>{categoryLabel}</TableHead>{series.map(item => <TableHead key={item.key}>{item.label}</TableHead>)}</TableRow></TableHeader><TableBody>{rows.map(row => <TableRow key={row.id}><TableHead scope="row">{row.label}</TableHead>{series.map(item => { const value = readValue(row, item.key); return <TableCell key={item.key} data-state={typeof value === "number" ? "known" : value.state}>{typeof value === "number" ? formatValue?.(value, item, row) ?? number.format(value) : value.label}</TableCell>; })}</TableRow>)}</TableBody></Table></TableContainer>
    </>;
  }
  return useRender({ defaultTagName: "figure", render, ref, props: mergeProps(native, {
    "data-slot": "chart", "data-state": state, "aria-labelledby": titleId,
    className: cn("grid min-w-0 max-w-full gap-(--qy-panel-gap) text-body text-foreground", className),
    style: { ...PLOT_PRESETS, ...style }, children: <><figcaption id={titleId} className="min-w-0 text-heading wrap-anywhere">{label}</figcaption>{content}</>,
  }) });
}
