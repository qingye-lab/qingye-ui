"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { ChartHeader, chartFrameClassName, readValue, useChartData, SURFACE_GAP, type ChartRow, type ChartSeries, type ChartValue } from "./chart";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "./table";
import { useUILocale } from "../locale";
import { cn } from "../utils";

/** 与 Chart 的 rows/series 同一取值契约（finite number 或具名 unknown/not-applicable）。 */
export type HeatmapCellValue = ChartValue;
/** 列维度的一个取值；与 ChartSeries 同构，但不设 1–5 的身份色上限——它是另一个类别轴，不是数据系列。 */
export type HeatmapColumn = ChartSeries;
/** 行维度的一个取值；与 ChartRow 同构（稳定 id、名称、按列键取值）。 */
export type HeatmapRow = ChartRow;
type HeatmapBaseProps = Omit<useRender.ComponentProps<"figure">, "children">;
export type HeatmapProps = HeatmapBaseProps & {
  label: string;
  /** 行维度叫什么，例如「星期」。 */
  rowLabel: string;
  /** 列维度叫什么，例如「时段」。 */
  columnLabel: string;
  /** 量的名字，例如「同步次数」。 */
  valueLabel: string;
  columns: readonly HeatmapColumn[];
  rows: readonly HeatmapRow[];
  formatValue?: (value: number, row: HeatmapRow, column: HeatmapColumn) => React.ReactNode;
};

/*
 * 热力图（基础层 §7「数据系列」；表达九法）：
 * - 两个类别维度 × 一个量：行、列都是类别轴，不是数据系列，没有身份要区分，因此不按 chart-1..5 取色相；
 *   量只取第一色（花青）一种色相，由与纸调和的 12% 到足色（数据是色，文字是墨）。
 * - 大小由浓淡承担，不由色相承担：去掉色相仍读得出大小（NG10）。
 * - 下限取 12%、不要求对纸 3:1：格子彼此相邻，读的是浓淡之差，不是一格对纸的对比；
 *   精确值由格子的名称、悬停读数与数据表承担。
 * - 未知/不适用不进色阶：进了色阶会被当成「很小的量」，与真实的零混淆（名实相符）；
 *   改用清墨斜线纹（45°，与数据可视化规范的纹理通道同一角度），纹理不是色阶的一级。
 * - 每个格都有可聚焦、可读的名称（行名+列名+值），不依赖悬停；悬停只增强。
 * - 相邻格之间 2px 纸色空隙，与柱状、堆叠柱同一机制（骨法用笔，一个范围一种机制，不描边）。
 */
const INK_FLOOR = 12;
const INK_CEIL = 100; // 足色：数据是色，量最大处是颜料本色
const CELL = "calc(var(--qy-cai))"; // 格高一材

function cellFill(value: number, max: number) {
  const pct = max > 0 ? INK_FLOOR + (value / max) * (INK_CEIL - INK_FLOOR) : INK_FLOOR;
  return `color-mix(in srgb, var(--qy-chart-1) ${pct}%, var(--qy-surface))`;
}

type ActiveCell = { row: HeatmapRow; column: HeatmapColumn; value: HeatmapCellValue; x: number; y: number };

/** 悬停/聚焦读数：与其余图表同一视觉外壳；只增强，不替代可聚焦格自身的 aria-label 与数据表。 */
function HeatmapReadout({ active, rowLabel, columnLabel, format }: { active: ActiveCell; rowLabel: string; columnLabel: string; format: (value: number) => React.ReactNode }) {
  return <div role="tooltip" style={{ left: active.x, top: active.y }} className="pointer-events-none absolute z-10 grid -translate-x-1/2 -translate-y-[calc(100%+var(--qy-space-2))] gap-(--qy-space-1) rounded-overlay border border-border bg-popover px-(--qy-fill-padding) py-(--qy-space-2) text-support text-popover-foreground shadow-(--qy-shadow-raised)">
    <div className="flex min-w-0 items-center gap-(--qy-field-gap)"><span className="text-muted-foreground">{rowLabel}</span><span className="wrap-anywhere">{active.row.label}</span></div>
    <div className="flex min-w-0 items-center gap-(--qy-field-gap)"><span className="text-muted-foreground">{columnLabel}</span><span className="wrap-anywhere">{active.column.label}</span></div>
    <div className="text-body-strong numeric">{typeof active.value === "number" ? format(active.value) : active.value.label}</div>
  </div>;
}

/** 两个类别维度上的量：方格按花青单色相的顺序色阶着色，按需展开的等价数据表与悬停读数。 */
/** 图只画数据（用户裁决 2026-10-10：功能要纯粹）。没有网格可画时不渲染图，由调用方在原位放 Empty。 */
export function Heatmap({ label, render, ref, className, rowLabel, columnLabel, valueLabel, columns, rows, formatValue, ...native }: HeatmapProps) {
  if (!label.trim()) throw new Error("Heatmap requires a nonempty accessible label.");
  const titleId = React.useId(); const dataView = useChartData();
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  const [active, setActive] = React.useState<ActiveCell | null>(null);
  let content: React.ReactNode;
  if (!rowLabel?.trim() || !columnLabel?.trim() || !valueLabel?.trim()) throw new Error("Heatmap requires named row, column and value axes.");
  if (!columns?.length || !rows?.length || columns.length < 2 || rows.length < 2) throw new RangeError("Heatmap requires two or more values on both the row and column dimensions; a single row or column is a Chart bar, not a grid.");
  if (new Set(columns.map(c => c.key)).size !== columns.length || columns.some(c => !c.key.trim() || !c.label.trim())) throw new Error("Heatmap columns require unique stable keys and nonempty names.");
  if (new Set(rows.map(r => r.id)).size !== rows.length || rows.some(r => !r.id.trim() || !r.label.trim())) throw new Error("Heatmap rows require unique stable ids and nonempty names.");
  let max = 0, anyNumeric = false;
  const grid = rows.map(row => columns.map(column => { const value = readValue(row, column.key); if (typeof value === "number") { anyNumeric = true; max = Math.max(max, value); } return value; }));
  const format = (value: number, row: HeatmapRow, column: HeatmapColumn) => formatValue ? formatValue(value, row, column) : number.format(value);
  content = <>
    <div data-slot="chart-value-axis" className="min-w-0 text-dense text-muted-foreground wrap-anywhere">{valueLabel}</div>
    {anyNumeric && <div data-slot="chart-plot" className="relative min-w-0 w-full overflow-x-auto">
      <div className="inline-grid min-w-full" style={{ gridTemplateColumns: `max-content repeat(${columns.length}, minmax(${CELL}, 1fr))`, gap: SURFACE_GAP }}>
        <span aria-hidden="true" />
        {columns.map(column => <span key={column.key} aria-hidden="true" className="flex min-w-0 items-end justify-center px-(--qy-space-1) text-dense text-muted-foreground wrap-anywhere">{column.label}</span>)}
        {rows.map((row, rowIndex) => <React.Fragment key={row.id}>
          <span aria-hidden="true" className="flex items-center justify-end pe-(--qy-space-2) text-dense text-muted-foreground wrap-anywhere">{row.label}</span>
          {columns.map((column, columnIndex) => {
            const value = grid[rowIndex]![columnIndex]!;
            const known = typeof value === "number";
            const name = known ? messages.heatmapCell(row.label, column.label, String(format(value, row, column))) : messages.heatmapUnavailable(row.label, column.label, value.label);
            return <div key={column.key} role="img" tabIndex={0} aria-label={name} data-state={known ? "known" : value.state}
              className={cn("outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-(--qy-focus-ring-color)", known ? undefined : "bg-[repeating-linear-gradient(45deg,var(--qy-border)_0,var(--qy-border)_1px,transparent_1px,transparent_6px)] bg-surface")}
              style={{ height: CELL, background: known ? cellFill(value, max) : undefined }}
              onMouseEnter={(event) => { const rect = event.currentTarget.getBoundingClientRect(), host = event.currentTarget.closest("[data-slot=\"chart-plot\"]")!.getBoundingClientRect(); setActive({ row, column, value, x: rect.left - host.left + rect.width / 2, y: rect.top - host.top }); }}
              onMouseLeave={() => setActive(null)}
              onFocus={(event) => { const rect = event.currentTarget.getBoundingClientRect(), host = event.currentTarget.closest("[data-slot=\"chart-plot\"]")!.getBoundingClientRect(); setActive({ row, column, value, x: rect.left - host.left + rect.width / 2, y: rect.top - host.top }); }}
              onBlur={() => setActive(null)} />;
          })}
        </React.Fragment>)}
      </div>
      {active && <HeatmapReadout active={active} rowLabel={rowLabel} columnLabel={columnLabel} format={(value) => format(value, active.row, active.column)} />}
      <div aria-hidden="true" className="mt-(--qy-field-gap) flex items-center gap-(--qy-field-gap) text-dense text-muted-foreground">
        <span>{messages.heatmapScaleFrom}</span>
        <span className="h-(--qy-space-2) w-16 rounded-xs" style={{ background: `linear-gradient(to right, ${cellFill(0, 1)}, ${cellFill(1, 1)})` }} />
        <span>{messages.heatmapScaleTo}</span>
      </div>
    </div>}
    {dataView.open && <div id={dataView.id} data-slot="chart-data"><TableContainer><Table aria-label={label}><TableHeader><TableRow><TableHead>{rowLabel}</TableHead>{columns.map(column => <TableHead key={column.key}>{column.label}</TableHead>)}</TableRow></TableHeader><TableBody>
          {rows.map((row, rowIndex) => <TableRow key={row.id}><TableHead scope="row">{row.label}</TableHead>{columns.map((column, columnIndex) => { const value = grid[rowIndex]![columnIndex]!; return <TableCell key={column.key} className="numeric" data-state={typeof value === "number" ? "known" : value.state}>{typeof value === "number" ? format(value, row, column) : value.label}</TableCell>; })}</TableRow>)}
        </TableBody></Table></TableContainer></div>}
  </>;
  return useRender({ defaultTagName: "figure", render, ref, props: mergeProps(native, {
    "data-slot": "heatmap", "aria-labelledby": titleId,
    className: cn(chartFrameClassName, className),
    children: <><ChartHeader titleId={titleId} label={label} toggle={dataView.toggle} />{content}</>,
  }) });
}
