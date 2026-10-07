"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { CartesianGrid, Scatter, ScatterChart as RechartsScatterChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import * as React from "react";
import { AxisTick, chartFrameClassName, MARK, MARKERS, Marker, PLOT_PRESETS, type ChartMarker, type ChartStyle } from "./chart";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "./collapsible";
import { Empty } from "./empty";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "./table";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type ScatterPoint = { id: string; label: string; x: number; y: number };
export type ScatterSeriesInput = { key: string; label: string; points: readonly ScatterPoint[] };
type ScatterBaseProps = Omit<useRender.ComponentProps<"figure">, "children" | "style"> & { label: string; style?: ChartStyle };
export type ScatterChartProps = ScatterBaseProps & ({
  state?: "ready";
  /** 横轴量的是什么，例如「记录数」。 */
  xLabel: string;
  /** 纵轴量的是什么，例如「失败率」。 */
  yLabel: string;
  /** 1 至 3 个系列：两个量的关系是全比较形式（任意两点都可能相邻），色觉校验按全比较口径最多 3 色。 */
  series: readonly ScatterSeriesInput[];
  formatX?: (value: number) => React.ReactNode;
  formatY?: (value: number) => React.ReactNode;
} | { state: "empty" | "unknown" | "not-applicable"; children: React.ReactNode });

type ProjectedPoint = ScatterPoint & { color: string; marker: ChartMarker; seriesLabel: string };

/*
 * 散点（基础层 §7；表达九法）：
 * - 两个量的关系，x、y 都是数值轴——这是散点的任务定义，不是违反「永远一个数值轴」：
 *   该禁令禁止的是同一类别/时间轴上叠两条不同量纲的 Y 轴（制造虚假相关），散点的 x/y
 *   本身就是被比较的两个量，二者同源同图，不存在第二条可拆的轴。
 * - 墨分五色：只有一个系列时用焦墨；两个以上按 chart-1..3 取色（全比较形式最多 3 个系列，
 *   数据可视化规范：全比较色觉校验比相邻校验更严，查看数据可视化规范中色阶校验方法），标记形状为第二通道。
 * - 标记 ≥ 8px、外加一圈纸色：与折线标记同一组件（Marker）。
 * - 命中区 ≥ 24px：标记外加一个透明命中圈，指针不必正中 8px 的点。
 * - 不画虚假零点：x/y 轴域按实际数据范围加少量留白，不强制从零起（散点不是从基线生长的柱）。
 */
const HIT_RADIUS = 12; // 24px 命中直径的一半
function PointShape({ cx, cy, payload }: { cx?: number; cy?: number; payload?: ProjectedPoint }) {
  if (cx === undefined || cy === undefined || !payload) return <g />;
  return <g>
    <circle cx={cx} cy={cy} r={HIT_RADIUS} fill="transparent" />
    <Marker color={payload.color} marker={payload.marker} cx={cx} cy={cy} />
  </g>;
}
function ScatterLegendKey({ color, marker }: { color: string; marker: ChartMarker }) {
  return <span className="inline-flex size-(--qy-status-dot-size) shrink-0 items-center justify-center"><Marker color={color} marker={marker} /></span>;
}
type ScatterTooltipPayload = { payload?: ProjectedPoint };
function ScatterReadout({ active, payload, xLabel, yLabel, formatX, formatY }: { active?: boolean; payload?: readonly ScatterTooltipPayload[]; xLabel: string; yLabel: string; formatX: (value: number) => React.ReactNode; formatY: (value: number) => React.ReactNode }) {
  const point = active ? payload?.[0]?.payload : undefined;
  if (!point) return null;
  return <div className="grid min-w-0 gap-(--qy-space-1) rounded-overlay border border-border bg-popover px-(--qy-fill-padding) py-(--qy-space-2) text-support text-popover-foreground shadow-(--qy-shadow-raised)">
    <div className="flex min-w-0 items-center gap-(--qy-field-gap)">
      <span aria-hidden="true" className="inline-flex shrink-0"><Marker color={point.color} marker={point.marker} /></span>
      <span className="min-w-0 text-body-strong wrap-anywhere">{point.label}</span>
    </div>
    <div className="flex min-w-0 items-center gap-(--qy-field-gap)"><span className="text-muted-foreground">{xLabel}</span><span className="numeric">{formatX(point.x)}</span></div>
    <div className="flex min-w-0 items-center gap-(--qy-field-gap)"><span className="text-muted-foreground">{yLabel}</span><span className="numeric">{formatY(point.y)}</span></div>
  </div>;
}

/** 两个量之间的关系：同源的散点图、命名的双轴、图例（两个以上系列）与按需展开的等价数据表。 */
/*
 * 散点的轴不从零起（点不是从基线长出来的），但刻度要能读：步长取 1、2、2.5、5 乘 10 的幂，
 * 约四到五格；点不落在轴线上（端点外推一步）；量全为非负时下限不低于零——不画不可能的负值。
 */
function niceScale(values: readonly number[], count = 5) {
  const lo = Math.min(...values), hi = Math.max(...values);
  const raw = (hi - lo || Math.abs(hi) || 1) / (count - 1);
  const magnitude = 10 ** Math.floor(Math.log10(raw));
  const step = [1, 2, 2.5, 5, 10].map(m => m * magnitude).find(candidate => candidate >= raw)!;
  let min = Math.floor(lo / step) * step, max = Math.ceil(hi / step) * step;
  if (min === lo && lo !== 0) min -= step;
  if (max === hi) max += step;
  if (lo >= 0) min = Math.max(0, min);
  const ticks: number[] = [];
  for (let value = min; value <= max + step / 2; value += step) ticks.push(Number(value.toPrecision(12)));
  return { min: ticks[0]!, max: ticks[ticks.length - 1]!, ticks };
}

export function ScatterChart({ label, state = "ready", render, ref, className, style, ...props }: ScatterChartProps) {
  if (!label.trim()) throw new Error("ScatterChart requires a nonempty accessible label.");
  const titleId = React.useId();
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  let content: React.ReactNode;
  const { xLabel, yLabel, series, formatX, formatY, children, ...native } = props as Omit<ScatterBaseProps, "label"> & Partial<Extract<ScatterChartProps, { state?: "ready" }>> & { children?: React.ReactNode };
  if (state !== "ready") content = <Empty state={state}>{children}</Empty>;
  else {
    if (!xLabel?.trim() || !yLabel?.trim() || !series?.length) throw new Error("ScatterChart ready state requires named axes and at least one series; use an explicit non-data state otherwise.");
    if (series.length > 3) throw new RangeError("ScatterChart compares every point against every other (an all-pairs form); it accepts at most three series. Fold the rest into \"Other\" or facet into separate charts.");
    if (new Set(series.map(item => item.key)).size !== series.length || series.some(item => !item.key.trim() || !item.label.trim())) throw new Error("ScatterChart series require unique stable keys and nonempty names.");
    const allPoints = series.flatMap(item => item.points);
    if (!allPoints.length) throw new Error("ScatterChart ready state requires at least one real point; use state=\"empty\" otherwise.");
    const ids = series.flatMap(item => item.points.map(point => `${item.key}:${point.id}`));
    if (new Set(ids).size !== ids.length || allPoints.some(point => !point.id.trim() || !point.label.trim())) throw new Error("ScatterChart points require unique stable ids (per series) and nonempty names.");
    if (allPoints.some(point => !Number.isFinite(point.x) || !Number.isFinite(point.y))) throw new TypeError("ScatterChart point x/y must be finite numbers.");
    const single = series.length === 1;
    const projected = series.map((item, index) => ({ ...item, color: `var(--qy-chart-${index + 1})`, marker: MARKERS[index]! }));
    const showX = formatX ?? ((value: number) => number.format(value));
    const showY = formatY ?? ((value: number) => number.format(value));
    const xs = allPoints.map(point => point.x), ys = allPoints.map(point => point.y);
    const x = niceScale(xs), y = niceScale(ys);
    const yWidth = Math.ceil(Math.max(...y.ticks.map(value => String(showY(value)).length)) * 7.5) + 8;
    content = <>
      {!single && <ul data-slot="chart-legend" className="flex min-w-0 flex-wrap gap-x-(--qy-panel-gap) gap-y-(--qy-field-gap) text-support">{projected.map(item => <li key={item.key} className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere"><ScatterLegendKey color={item.color} marker={item.marker} /><span>{item.label}</span></li>)}</ul>}
      <div data-slot="chart-value-axis" className="min-w-0 text-dense text-muted-foreground wrap-anywhere">{yLabel}</div>
      <div data-slot="chart-plot" style={{ height: "var(--qy-chart-plot-height)" }} className="min-w-0 w-full">
        <ResponsiveContainer width="100%" height="100%"><RechartsScatterChart accessibilityLayer={false} margin={{ top: MARK, right: MARK, bottom: 0, left: 0 }}>
          <CartesianGrid horizontal vertical stroke="var(--qy-border)" strokeWidth={1} />
          <XAxis type="number" dataKey="x" name={xLabel} domain={[x.min, x.max]} ticks={x.ticks} tick={<AxisTick formatter={value => typeof value === "number" ? String(showX(value)) : value} />} tickLine={false} axisLine={{ stroke: "var(--qy-groove-surface)", strokeWidth: 1 }} />
          <YAxis type="number" dataKey="y" name={yLabel} domain={[y.min, y.max]} ticks={y.ticks} tick={<AxisTick textAnchor="end" verticalAnchor="middle" formatter={value => typeof value === "number" ? String(showY(value)) : value} />} tickLine={false} axisLine={false} width={yWidth} />
          <Tooltip isAnimationActive={false} cursor={false} content={(tooltipProps) => <ScatterReadout {...tooltipProps as { active?: boolean; payload?: readonly ScatterTooltipPayload[] }} xLabel={xLabel} yLabel={yLabel} formatX={showX} formatY={showY} />} />
          {projected.map(item => <Scatter key={item.key} name={item.label} data={item.points.map(point => ({ ...point, color: item.color, marker: item.marker, seriesLabel: item.label }))} isAnimationActive={false} shape={(shapeProps: unknown) => <PointShape {...shapeProps as React.ComponentProps<typeof PointShape>} />} />)}
        </RechartsScatterChart></ResponsiveContainer>
      </div>
      <div data-slot="chart-category-axis" className="min-w-0 text-end text-dense text-muted-foreground wrap-anywhere">{xLabel}</div>
      <Collapsible data-slot="chart-data">
        <CollapsibleTrigger className="text-support text-muted-foreground">{messages.chartData}</CollapsibleTrigger>
        <CollapsiblePanel>
          <TableContainer><Table aria-label={label}><TableHeader><TableRow><TableHead>{messages.scatterPointColumn}</TableHead><TableHead>{xLabel}</TableHead><TableHead>{yLabel}</TableHead></TableRow></TableHeader><TableBody>
            {projected.flatMap(item => item.points.map(point => <TableRow key={`${item.key}:${point.id}`}>
              <TableHead scope="row">{single ? point.label : `${item.label} · ${point.label}`}</TableHead>
              <TableCell className="numeric">{showX(point.x)}</TableCell>
              <TableCell className="numeric">{showY(point.y)}</TableCell>
            </TableRow>))}
          </TableBody></Table></TableContainer>
        </CollapsiblePanel>
      </Collapsible>
    </>;
  }
  return useRender({ defaultTagName: "figure", render, ref, props: mergeProps(native, {
    "data-slot": "scatter-chart", "data-state": state, "aria-labelledby": titleId,
    className: cn(chartFrameClassName, className),
    style: { ...PLOT_PRESETS, ...style }, children: <><figcaption id={titleId} className="mb-(--qy-field-gap) min-w-0 text-heading wrap-anywhere">{label}</figcaption>{content}</>,
  }) });
}
