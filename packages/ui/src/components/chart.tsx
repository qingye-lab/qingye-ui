"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Text as RechartsText, Tooltip, XAxis, YAxis } from "recharts";
import * as React from "react";
import { Button } from "./button";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "./table";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type ChartUnavailableValue = { state: "unknown" | "not-applicable"; label: string };
export type ChartValue = number | ChartUnavailableValue;
export type ChartRow = { id: string; label: string; values: Readonly<Record<string, ChartValue>> };
export type ChartSeries = { key: string; label: string };
/**
 * 由任务选定，不是外观偏好：line 随时间/次序的趋势；bar 类别间比较；area 随时间的量
 * （单系列第一色淡面，多系列默认各自半透叠放）；area-stacked 随时间的构成（同一时刻诸部分加总
 * 为整体，于是不透明的淡色带加足色上沿、彼此相切，与 bar-stacked 同一任务的连续版）；bar-horizontal 类别名长
 * 或按大小排序的排行；bar-stacked 类别之间的构成比较；donut 只用于 2–5 个部分、一眼占比的单个整体
 * （rows 必须正好一行——它不是多类别并排比较，而是一个整体的拆分；超过 5 部分改用 Proportion 或条形图）。
 */
/** 图的纸（绘事后素）：数据集合是独立对象，与比较表同一画法——纸本色、清墨线、面板圆角与内缘。 */
export const chartFrameClassName = "m-0 grid min-w-0 max-w-full gap-(--qy-field-gap) rounded-panel border border-border bg-surface p-(--qy-panel-padding) text-body text-foreground";

/*
 * 文字是墨，数据是色：图里的字、轴、网格用墨阶；数据即使只有一个系列也取第一色（花青）。
 * 焦墨是正文最重的一级，一根焦墨实柱的面积远大于文字，会压过图名与读数（君位，染随面积）。
 * 堆叠面积是大面：填充取颜料与纸调和的淡色（不透明，带与带不互相混色），上沿一道足色线交代边界。
 */
const AREA_WASH = 28;

export type ChartType = "line" | "bar" | "area" | "area-stacked" | "bar-horizontal" | "bar-stacked" | "donut";
export type ChartMarker = "circle" | "square" | "triangle" | "diamond" | "cross";
export type ChartProjectedSeries = ChartSeries & { dataKey: string; color: string; marker: ChartMarker };
export type ChartPlotData = { type: ChartType; data: Record<string, string | number | null>[]; series: readonly ChartProjectedSeries[]; categoryLabel: string; valueLabel: string; total?: number };
export type ChartStyle = React.CSSProperties & {
  "--qy-chart-plot-height"?: string;
};
type ChartBaseProps = Omit<useRender.ComponentProps<"figure">, "children" | "style"> & { label: string; style?: ChartStyle };
export type ChartProps = ChartBaseProps & {
  type: ChartType;
  categoryLabel: string;
  valueLabel: string;
  series: readonly ChartSeries[];
  rows: readonly ChartRow[];
  /** 只用于 donut：整体的总量。省略时等于各部分之和；大于之和时，剩余部分并入「其余」（groove-surface，不是第六种色相）。其他 type 不读取此值。 */
  total?: number;
  formatValue?: (value: number, series: ChartSeries, row: ChartRow) => React.ReactNode;
  renderPlot?: (projection: ChartPlotData) => React.ReactNode;
};

/*
 * 图的法度（基础层 §7「数据系列」；表达九法）：
 * - 墨分五色：只有一个系列时用焦墨，不用色相——没有类别要区分（NG10）。两个以上才按
 *   --qy-chart-1…5 取色，顺序经过色觉校验；标记形状是第二通道，转成灰度仍可区分。
 * - 骨法用笔：线 2px；网格是清墨的一道细线，只画横线；基线用淡墨；不画刻度线与纵轴线。
 * - 应物象形：柱子细（≤ 6 分），数据端圆角 1 分，基线端方角——柱从基线长出来。
 *   相邻的柱之间留半分纸色空隙，不描边。标记 2 分，外加一圈纸色，交叉时仍可读。
 * - 绘事后素：不加阴影、渐变与入场动画（气韵生动：动只交代真实变化）。
 * - 文字不用数据色：轴、图例与读数用墨阶，色相只在标记上。
 * 图高 10 材，预设，调用方可覆写 --qy-chart-plot-height。
 */
const CHART_TYPES = new Set<ChartType>(["line", "bar", "area", "area-stacked", "bar-horizontal", "bar-stacked", "donut"]);
export const PLOT_PRESETS: ChartStyle = { "--qy-chart-plot-height": "calc(10 * var(--qy-cai))" };
export const MARKERS: readonly ChartMarker[] = ["circle", "square", "triangle", "diamond", "cross"];
export const MARK = 8;
const STROKE = 2;
const BAR_MAX = 24;
const BAR_RADIUS = 4;
export const SURFACE_GAP = 2;

export function MarkerShape({ marker }: { marker: ChartMarker }) {
  if (marker === "circle") return <circle cx="4" cy="4" r="4" />;
  if (marker === "square") return <rect width="8" height="8" rx="1" />;
  if (marker === "triangle") return <path d="M4 0 8 8H0Z" />;
  if (marker === "diamond") return <path d="M4 0 8 4 4 8 0 4Z" />;
  return <path d="M0 4H8M4 0V8" fill="none" stroke="currentColor" strokeWidth={STROKE} />;
}
/** 标记：外加一圈纸色（paint-order: stroke），压在线上或彼此交叉时仍然分得开。Scatter 复用。 */
export function Marker({ color, marker, cx, cy }: { color: string; marker: ChartMarker; cx?: number; cy?: number }) {
  const ring = marker === "cross" ? undefined : { stroke: "var(--qy-surface)", strokeWidth: SURFACE_GAP * 2, paintOrder: "stroke" as const };
  return <svg aria-hidden="true" viewBox="0 0 8 8" width={MARK} height={MARK} x={cx === undefined ? undefined : cx - MARK / 2} y={cy === undefined ? undefined : cy - MARK / 2} fill="currentColor" style={{ color, overflow: "visible" }}><g {...ring}><MarkerShape marker={marker} /></g></svg>;
}
/** 图例的键与图形一致：折线是一段线加标记；填充类图形（柱、横向柱、堆叠柱、面积、环形）是一块方。 */
export function LegendKey({ series, type }: { series: ChartProjectedSeries; type: ChartType }) {
  if (type === "line") return <svg aria-hidden="true" width={16} height={MARK} viewBox="0 0 16 8" className="shrink-0 overflow-visible" style={{ color: series.color }}><path d="M0 4H16" stroke="currentColor" strokeWidth={STROKE} strokeLinecap="round" /><svg x={4} y={0} width={8} height={8} viewBox="0 0 8 8" fill="currentColor" overflow="visible"><MarkerShape marker={series.marker} /></svg></svg>;
  return <span aria-hidden="true" className="size-(--qy-status-dot-size) shrink-0 rounded-[calc(var(--qy-status-dot-size)/4)]" style={{ background: series.color }} />;
}
export function AxisTick({ x = 0, y = 0, textAnchor = "middle", verticalAnchor = "start", payload, formatter }: { x?: number; y?: number; textAnchor?: "start" | "middle" | "end"; verticalAnchor?: "start" | "middle" | "end"; payload?: { value: string | number }; formatter?: (value: string | number) => string }) {
  return <RechartsText x={x} y={y} textAnchor={textAnchor} verticalAnchor={verticalAnchor} className="text-dense numeric" fill="var(--qy-foreground-muted)">{payload ? formatter?.(payload.value) ?? payload.value : ""}</RechartsText>;
}
/** 柱：数据端圆角、基线端方角；负值时圆角在下。纵向柱与横向柱共用，按轴互换坐标传入。 */
function BarShape({ x = 0, y = 0, width = 0, height = 0, fill, value }: { x?: number; y?: number; width?: number; height?: number; fill?: string; value?: number | readonly number[] }) {
  if (!width || !height) return <g />;
  const top = y + Math.min(0, height), h = Math.abs(height);
  const numeric = Array.isArray(value) ? value[1]! - value[0]! : (value as number | undefined) ?? 0;
  const r = Math.min(BAR_RADIUS, width / 2, h);
  const d = numeric >= 0
    ? `M${x},${top + h}V${top + r}Q${x},${top} ${x + r},${top}H${x + width - r}Q${x + width},${top} ${x + width},${top + r}V${top + h}Z`
    : `M${x},${top}V${top + h - r}Q${x},${top + h} ${x + r},${top + h}H${x + width - r}Q${x + width},${top + h} ${x + width},${top + h - r}V${top}Z`;
  return <path d={d} fill={fill} />;
}
/** 横向柱：数据端（右端，假定非负）圆角，基线端（左端）方角——bar-horizontal 不支持负值。 */
function BarShapeHorizontal({ x = 0, y = 0, width = 0, height = 0, fill }: { x?: number; y?: number; width?: number; height?: number; fill?: string }) {
  if (!width || !height) return <g />;
  const r = Math.min(BAR_RADIUS, height / 2, width);
  const d = `M${x},${y}H${x + width - r}Q${x + width},${y} ${x + width},${y + r}V${y + height - r}Q${x + width},${y + height} ${x + width - r},${y + height}H${x}Z`;
  return <path d={d} fill={fill} />;
}
/**
 * 堆叠柱的一段：段与段之间留 2px 纸色空隙（骨法用笔，一个范围一种机制，不描边）；只有堆叠最外
 * 的数据端（isTop）才是圆角，基线端（isBase）方角，中间的段两端都方——假定非负值由基线向上叠加。
 */
function StackedBarShape({ x = 0, y = 0, width = 0, height = 0, fill, isBase, isTop }: { x?: number; y?: number; width?: number; height?: number; fill?: string; isBase?: boolean; isTop?: boolean }) {
  if (!width || !height) return <g />;
  const top = y + (isTop ? 0 : SURFACE_GAP / 2), bottom = y + height - (isBase ? 0 : SURFACE_GAP / 2);
  const h = bottom - top;
  if (h <= 0) return <g />;
  const r = isTop ? Math.min(BAR_RADIUS, width / 2, h) : 0;
  const d = r > 0
    ? `M${x},${bottom}V${top + r}Q${x},${top} ${x + r},${top}H${x + width - r}Q${x + width},${top} ${x + width},${top + r}V${bottom}Z`
    : `M${x},${top}H${x + width}V${bottom}H${x}Z`;
  return <path d={d} fill={fill} />;
}
type TooltipEntry = { dataKey?: string | number; value?: number | string | null; color?: string };
/** 悬停读数：数值在前、名称在后（读者已有系列，要的是数）；只增强，不替代数据表。 */
export function ReadoutTooltip({ active, payload, label, series, format }: { active?: boolean; payload?: readonly TooltipEntry[]; label?: string | number; series: readonly ChartProjectedSeries[]; format: (value: number, key: string, category: string) => React.ReactNode }) {
  if (!active || !payload?.length) return null;
  return <div className="grid min-w-0 gap-(--qy-space-1) rounded-overlay border border-border bg-popover px-(--qy-fill-padding) py-(--qy-space-2) text-support text-popover-foreground shadow-(--qy-shadow-raised)">
    <div className="text-muted-foreground">{label}</div>
    {payload.map(entry => {
      const item = series.find(s => s.dataKey === entry.dataKey);
      if (!item) return null;
      return <div key={item.key} className="flex min-w-0 items-center gap-(--qy-field-gap)">
        <span aria-hidden="true" className="h-0.5 w-3 shrink-0 rounded-full" style={{ background: item.color }} />
        <span className="text-body-strong numeric">{typeof entry.value === "number" ? format(entry.value, item.key, String(label)) : "—"}</span>
        <span className="min-w-0 text-muted-foreground wrap-anywhere">{item.label}</span>
      </div>;
    })}
  </div>;
}
/** 环形图分段之间 2px 纸色空隙：按中半径换算成角度，两侧各收进一半；不描边（骨法用笔）。 */
function DonutShape({ cx = 0, cy = 0, innerRadius = 0, outerRadius = 0, startAngle = 0, endAngle = 0, fill }: { cx?: number; cy?: number; innerRadius?: number; outerRadius?: number; startAngle?: number; endAngle?: number; fill?: string }) {
  const mid = (innerRadius + outerRadius) / 2 || 1;
  const gapDeg = (SURFACE_GAP / mid) * (180 / Math.PI);
  // recharts 按整体 startAngle/endAngle 的符号决定每段角度是递增还是递减；先取小大再各收进半个空隙，
  // 与方向无关都能画出同一段弧，收窄后仍对称。
  const lo = Math.min(startAngle, endAngle), hi = Math.max(startAngle, endAngle);
  const start = lo + gapDeg / 2, end = hi - gapDeg / 2;
  if (end <= start) return <g />;
  const point = (angle: number, r: number) => { const rad = (-angle * Math.PI) / 180; return [cx + r * Math.cos(rad), cy + r * Math.sin(rad)]; };
  const large = end - start > 180 ? 1 : 0;
  const [ox1, oy1] = point(start, outerRadius), [ox2, oy2] = point(end, outerRadius);
  const [ix1, iy1] = point(end, innerRadius), [ix2, iy2] = point(start, innerRadius);
  const d = `M${ox1},${oy1} A${outerRadius},${outerRadius} 0 ${large} 0 ${ox2},${oy2} L${ix1},${iy1} A${innerRadius},${innerRadius} 0 ${large} 1 ${ix2},${iy2} Z`;
  return <path d={d} fill={fill} />;
}
type DonutPart = { key: string; label: string; value: number; color: string };
/** 环形图悬停读数：与 ReadoutTooltip 同一视觉外壳，内容是「部分」而不是「系列在某一类别下的值」。 */
function DonutTooltip({ active, payload, number }: { active?: boolean; payload?: readonly { payload?: DonutPart }[]; number: Intl.NumberFormat }) {
  const part = active ? payload?.[0]?.payload : undefined;
  if (!part) return null;
  return <div className="grid min-w-0 gap-(--qy-space-1) rounded-overlay border border-border bg-popover px-(--qy-fill-padding) py-(--qy-space-2) text-support text-popover-foreground shadow-(--qy-shadow-raised)">
    <div className="flex min-w-0 items-center gap-(--qy-field-gap)">
      <span aria-hidden="true" className="size-(--qy-status-dot-size) shrink-0 rounded-[calc(var(--qy-status-dot-size)/4)]" style={{ background: part.color }} />
      <span className="text-body-strong numeric">{number.format(part.value)}</span>
      <span className="min-w-0 text-muted-foreground wrap-anywhere">{part.label}</span>
    </div>
  </div>;
}
function DefaultPlot({ type, data, series, valueLabel, total, number, format }: ChartPlotData & { number: Intl.NumberFormat; format: (value: number, key: string, category: string) => React.ReactNode }) {
  if (type === "donut") {
    const parts: DonutPart[] = series.map(item => ({ key: item.key, label: item.label, value: (data[0]?.[item.dataKey] as number | undefined) ?? 0, color: item.color }));
    const sum = parts.reduce((acc, part) => acc + part.value, 0);
    const whole = total ?? sum;
    const rest = whole - sum;
    const cells = rest > 0 ? [...parts, { key: "__rest", label: valueLabel, value: rest, color: "var(--qy-groove-surface)" }] : parts;
    return <div className="relative mx-auto aspect-square h-full max-h-full">
      <ResponsiveContainer width="100%" height="100%"><PieChart>
        <Tooltip isAnimationActive={false} content={(props) => <DonutTooltip {...props as { active?: boolean; payload?: readonly { payload?: DonutPart }[] }} number={number} />} />
        <Pie data={cells} dataKey="value" nameKey="label" innerRadius="62%" outerRadius="100%" startAngle={90} endAngle={-270} isAnimationActive={false} stroke="none" shape={(props: unknown) => { const { key, ...rest } = props as React.ComponentProps<typeof DonutShape> & { key?: React.Key }; return <DonutShape key={key} {...rest} />; }}>
          {cells.map(cell => <Cell key={cell.key} fill={cell.color} />)}
        </Pie>
      </PieChart></ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div className="grid gap-(--qy-space-1)">
          <span className="text-metric numeric text-foreground">{number.format(whole)}</span>
          <span className="text-support text-muted-foreground">{valueLabel}</span>
        </div>
      </div>
    </div>;
  }
  const horizontal = type === "bar-horizontal";
  // 网格只画需要的方向：数值轴是纵轴时画横线，数值轴是横轴（横向柱）时画竖线。
  const grid = <CartesianGrid vertical={horizontal} horizontal={!horizontal} stroke="var(--qy-border)" strokeWidth={1} />;
  const values = data.flatMap(row => series.map(item => row[item.dataKey])).filter((value): value is number => typeof value === "number");
  const valueFormatter = (value: string | number) => typeof value === "number" ? number.format(value) : value;
  const tooltip = <Tooltip isAnimationActive={false} cursor={type === "line" ? { stroke: "var(--qy-border-input)", strokeWidth: 1 } : { fill: "var(--qy-surface-inset)" }} content={(props) => <ReadoutTooltip {...props as { active?: boolean; payload?: readonly TooltipEntry[]; label?: string | number }} series={series} format={format} />} />;
  if (horizontal) {
    // 横向柱：类别换到纵轴，数值换到横轴；纵轴宽按最长类别名估算（dense 12px，约 1 字 12px）。
    const longestLabel = Math.max(1, ...data.map(row => String(row.category).length));
    const valueAxis = <XAxis type="number" domain={[(min: number) => Math.min(0, min), "auto"]} tick={<AxisTick formatter={valueFormatter} />} tickLine={false} axisLine={false} />;
    const categoryAxis = <YAxis type="category" dataKey="category" tick={<AxisTick textAnchor="end" verticalAnchor="middle" />} tickLine={false} axisLine={{ stroke: "var(--qy-groove-surface)", strokeWidth: 1 }} width={Math.ceil(longestLabel * 12) + 8} />;
    return <ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" accessibilityLayer={false} barGap={SURFACE_GAP} barCategoryGap="24%">
      {grid}{valueAxis}{categoryAxis}{tooltip}
      {series.map(item => <Bar key={item.key} dataKey={item.dataKey} name={item.label} fill={item.color} maxBarSize={BAR_MAX} isAnimationActive={false} shape={(props: unknown) => <BarShapeHorizontal {...props as React.ComponentProps<typeof BarShapeHorizontal>} />} />)}
    </BarChart></ResponsiveContainer>;
  }
  // 折线两端留出半个标记加一圈纸色，端点不被切开；柱状由类别带自带留白。
  const categoryAxis = <XAxis dataKey="category" tick={<AxisTick />} tickLine={false} axisLine={{ stroke: "var(--qy-groove-surface)", strokeWidth: 1 }} interval="preserveStartEnd" minTickGap={8} {...(type === "line" || type === "area" || type === "area-stacked" ? { padding: { left: MARK, right: MARK } } : {})} />;
  // 纵轴从零起（柱与面积必须从零长出来），上限取整；轴宽按最长刻度文字估算（12px 等宽数字约 7.5px 一字）。
  // 堆叠时轴读的是各行加总，不是单个部分：按加总估宽，否则最长刻度被截。
  const extent = type === "area-stacked" || type === "bar-stacked" ? data.map(row => series.reduce((sum, item) => sum + (typeof row[item.dataKey] === "number" ? row[item.dataKey] as number : 0), 0)) : values;
  const longest = Math.max(1, ...extent.map(value => number.format(Math.ceil(Math.abs(value) * 1.25)).length + (value < 0 ? 1 : 0)));
  const valueAxis = <YAxis domain={[(min: number) => Math.min(0, min), "auto"]} tick={<AxisTick textAnchor="end" verticalAnchor="middle" formatter={valueFormatter} />} tickLine={false} axisLine={false} width={Math.ceil(longest * 7.5) + 8} />;
  if (type === "bar") return <ResponsiveContainer width="100%" height="100%"><BarChart data={data} accessibilityLayer={false} barGap={SURFACE_GAP} barCategoryGap="24%">
    {grid}{categoryAxis}{valueAxis}{tooltip}
    {series.map(item => <Bar key={item.key} dataKey={item.dataKey} name={item.label} fill={item.color} maxBarSize={BAR_MAX} isAnimationActive={false} shape={(props: unknown) => <BarShape {...props as React.ComponentProps<typeof BarShape>} />} />)}
  </BarChart></ResponsiveContainer>;
  if (type === "bar-stacked") return <ResponsiveContainer width="100%" height="100%"><BarChart data={data} accessibilityLayer={false} barCategoryGap="24%">
    {grid}{categoryAxis}{valueAxis}{tooltip}
    {series.map((item, index) => <Bar key={item.key} dataKey={item.dataKey} name={item.label} stackId="qy-stack" fill={item.color} maxBarSize={BAR_MAX} isAnimationActive={false}
      shape={(props: unknown) => <StackedBarShape {...props as React.ComponentProps<typeof StackedBarShape>} isBase={index === 0} isTop={index === series.length - 1} />} />)}
  </BarChart></ResponsiveContainer>;
  if (type === "area" || type === "area-stacked") {
    const stacked = type === "area-stacked";
    return <ResponsiveContainer width="100%" height="100%"><AreaChart data={data} accessibilityLayer={false}>
      {grid}{categoryAxis}{valueAxis}{tooltip}
      {series.map(item => <Area key={item.key} dataKey={item.dataKey} name={item.label} type="linear" {...(stacked ? { stackId: "qy-area-stack" } : {})}
        stroke={item.color} strokeWidth={STROKE} strokeLinejoin="round" strokeLinecap="round" fill={stacked ? `color-mix(in srgb, ${item.color} ${AREA_WASH}%, var(--qy-surface))` : item.color} fillOpacity={stacked ? 1 : 0.1}
        connectNulls={false} isAnimationActive={false} dot={false} activeDot={false} />)}
    </AreaChart></ResponsiveContainer>;
  }
  return <ResponsiveContainer width="100%" height="100%"><LineChart data={data} accessibilityLayer={false}>
    {grid}{categoryAxis}{valueAxis}{tooltip}
    {series.map(item => <Line key={item.key} dataKey={item.dataKey} name={item.label} type="linear" stroke={item.color} strokeWidth={STROKE} strokeLinejoin="round" strokeLinecap="round" connectNulls={false} isAnimationActive={false} activeDot={false} dot={({ cx, cy, index }) => cx === undefined || cy === undefined ? <g key={index} /> : <Marker key={index} color={item.color} marker={item.marker} cx={cx} cy={cy} />} />)}
  </LineChart></ResponsiveContainer>;
}
export function readValue(row: ChartRow, key: string): ChartValue {
  const value = row.values[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value && typeof value === "object" && (value.state === "unknown" || value.state === "not-applicable") && value.label.trim()) return value;
  throw new TypeError("Chart values must be finite numbers or explicitly named unknown/not-applicable values.");
}

/** 同源的图形、命名的轴、图例（两个以上系列）与按需展开的等价数据表。 */
/** 「查看数据」：图的等价数据表按需展开在图下；按钮在标题栏右端，展开时像被按下。Chart、ScatterChart、Heatmap 共用。 */
export function useChartData() {
  const id = React.useId(); const [open, setOpen] = React.useState(false); const { messages } = useUILocale();
  const toggle = <Button data-slot="chart-data-toggle" variant="quiet" size="sm" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)} className="-me-(--qy-control-sm-padding) shrink-0 whitespace-nowrap text-muted-foreground aria-expanded:bg-(--qy-surface-active) aria-expanded:text-foreground">{messages.chartData}</Button>;
  return { id, open, toggle };
}

/** 图的标题栏一行（经营位置）：图名在左；图例与「查看数据」在右，同一条行中线。三种图一种画法（NG3）。 */
export function ChartHeader({ titleId, label, legend, toggle }: { titleId: string; label: React.ReactNode; legend?: React.ReactNode; toggle?: React.ReactNode }) {
  return <div data-slot="chart-header" className="mb-(--qy-field-gap) flex min-h-(--qy-control-sm) min-w-0 flex-wrap items-center gap-x-(--qy-panel-gap) gap-y-(--qy-field-gap) [&_[data-slot=button-content]]:whitespace-nowrap">
    {/* 图名所在的行恒为一个小号控件高：标题栏折行时，第一行的中线也不动。 */}
    <figcaption id={titleId} className="flex min-h-(--qy-control-sm) min-w-0 grow items-center text-heading wrap-anywhere">{label}</figcaption>
    {legend}{toggle}
  </div>;
}

/** 图例：一行色块与名称，浓墨小字。 */
export const legendClassName = "m-0 flex min-w-0 list-none flex-wrap gap-x-(--qy-field-group-gap) gap-y-(--qy-field-gap) p-0 text-support text-muted-foreground";

/** 图只画数据（用户裁决 2026-10-10：功能要纯粹）。没有记录、结果未知或不适用时不渲染图，由调用方在原位放 Empty。 */
export function Chart({ label, render, ref, className, style, type, categoryLabel, valueLabel, series, rows, total, formatValue, renderPlot, ...native }: ChartProps) {
  if (!label.trim()) throw new Error("Chart requires a nonempty accessible label.");
  const titleId = React.useId(); const dataView = useChartData();
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  let content: React.ReactNode; let legend: React.ReactNode = null;
  if (!type || !CHART_TYPES.has(type)) throw new Error(`Chart requires an explicit type from ${[...CHART_TYPES].join(", ")}; the form is chosen by the task, not left to default.`);
  if (!categoryLabel?.trim() || !valueLabel?.trim() || !series?.length || series.length > MARKERS.length || !rows?.length) throw new Error("Chart requires named axes, one to five series and real rows; when there is nothing to plot, render Empty in its place.");
  if (new Set(series.map(item => item.key)).size !== series.length || series.some(item => !item.key.trim() || !item.label.trim()) || new Set(rows.map(row => row.id)).size !== rows.length || rows.some(row => !row.id.trim() || !row.label.trim())) throw new Error("Chart series and rows require unique stable ids and nonempty names.");
  if ((type === "bar-stacked" || type === "area-stacked") && series.length < 2) throw new RangeError(`Chart type "${type}" stacks two or more series into a composition; a single series is a plain ${type === "bar-stacked" ? "bar" : "area"}.`);
  if (type === "donut" && rows.length !== 1) throw new RangeError("Chart type \"donut\" shows one whole's composition, not category comparison; it requires exactly one row. Compare many categories' compositions with \"bar-stacked\" instead.");
  if (type === "donut" && (series.length < 2 || series.length > 5)) throw new RangeError("Chart type \"donut\" requires two to five parts for at-a-glance share; more parts or precise comparison should use Proportion or a bar chart.");
  const single = series.length === 1;
  const projected = series.map((item, index) => ({ ...item, dataKey: `series${index}`, color: `var(--qy-chart-${index + 1})`, marker: MARKERS[index]! }));
  let numeric = false;
  const data = rows.map(row => {
    const record: Record<string, string | number | null> = { id: row.id, category: row.label };
    projected.forEach(item => {
      const value = readValue(row, item.key);
      if (type === "donut" && (typeof value !== "number" || value < 0)) throw new RangeError("Chart type \"donut\" requires every part's value to be a known, non-negative number; an unavailable or negative share has no wedge to draw. When the whole is unavailable, render Empty in place of the chart.");
      if (typeof value === "number") numeric = true;
      record[item.dataKey] = typeof value === "number" ? value : null;
    });
    return record;
  });
  if (type === "donut") {
    const sum = projected.reduce((acc, item) => acc + (data[0]![item.dataKey] as number), 0);
    if (total !== undefined && (!Number.isFinite(total) || total < sum)) throw new RangeError("Chart type \"donut\" total must be a finite number at least the sum of its parts.");
  }
  const format = (value: number, key: string, category: string) => {
    const item = series.find(s => s.key === key); const row = rows.find(r => r.label === category);
    return item && row && formatValue ? formatValue(value, item, row) : number.format(value);
  };
  const projection: ChartPlotData = { type, data, series: projected, categoryLabel, valueLabel, ...(type === "donut" && total !== undefined ? { total } : {}) };
  const isDonut = type === "donut";
  legend = !single && <ul data-slot="chart-legend" className={legendClassName}>{projected.map(item => <li key={item.key} className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere"><LegendKey series={item} type={type} /><span>{item.label}</span></li>)}</ul>;
  content = <>
    {/* 看得见的只有量的名字（单位）：刻度上的类别（周一…、各来源）已经自说自话，再标「日期」是重复。
        类别轴名留给读屏与数据表的表头。 */}
    {!isDonut && <div data-slot="chart-value-axis" className="min-w-0 text-dense text-muted-foreground wrap-anywhere">{valueLabel}</div>}
    {numeric && <div data-slot="chart-plot" aria-hidden={renderPlot ? undefined : true} style={{ height: "var(--qy-chart-plot-height)" }} className="min-w-0 w-full">{renderPlot ? renderPlot(projection) : <DefaultPlot {...projection} number={number} format={format} />}</div>}
    {isDonut && <div className="flex justify-center [&_[data-slot=chart-legend]]:justify-center">{legend}</div>}
    {!isDonut && <div data-slot="chart-category-axis" className="sr-only">{categoryLabel}</div>}
    {dataView.open && <div id={dataView.id} data-slot="chart-data"><TableContainer><Table aria-label={label}><TableHeader><TableRow><TableHead>{categoryLabel}</TableHead>{series.map(item => <TableHead key={item.key} className="text-end">{item.label}</TableHead>)}</TableRow></TableHeader><TableBody>{rows.map(row => <TableRow key={row.id}><TableHead scope="row">{row.label}</TableHead>{series.map(item => { const value = readValue(row, item.key); return <TableCell key={item.key} className="text-end numeric" data-state={typeof value === "number" ? "known" : value.state}>{typeof value === "number" ? formatValue?.(value, item, row) ?? number.format(value) : value.label}</TableCell>; })}</TableRow>)}</TableBody></Table></TableContainer></div>}
  </>;
  return useRender({ defaultTagName: "figure", render, ref, props: mergeProps(native, {
    "data-slot": "chart", "data-type": type, "aria-labelledby": titleId,
    className: cn(chartFrameClassName, className),
    style: { ...PLOT_PRESETS, ...style }, children: <>
      {/* 环形图的图例在环下：它是一个整体的几部分，名称挨着环读；标题栏只留图名与「查看数据」。 */}
      <ChartHeader titleId={titleId} label={label} legend={type === "donut" ? null : legend} toggle={dataView.toggle} />
      {content}
    </>,
  }) });
}
