"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { ChartHeader, chartBaseClassName, chartName, chartPaperClassName, legendClassName, readValue, useChartData, type ChartFigureProps, type ChartRow, type ChartSeries, type ChartValue } from "./chart";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "./table";
import { READOUT_SURFACE } from "../chart-geometry";
import { useUILocale } from "../locale";
import { isList, isName, received, requireNamedItems } from "../require-name";
import { assertTone, toneColor, type Tone } from "../tone";
import { cn } from "../utils";

/** 与 Chart 的 rows/series 同一取值契约（finite number 或具名 unknown/not-applicable）。 */
export type HeatmapCellValue = ChartValue;
/** 列维度的一个取值；与 ChartSeries 同构，但不设 1–5 的身份色上限——它是另一个类别轴，不是数据系列。 */
export type HeatmapColumn = ChartSeries;
/** 行维度的一个取值；与 ChartRow 同构（稳定 id、名称、按列键取值）。 */
export type HeatmapRow = ChartRow;
/**
 * 一档：label 是档名；from 是该档的下界（含），第一档不写——它覆盖所有更小的值。
 * 档的边界与好坏由应用声明，组件不从数值猜；tone 只表达类别（危险、警示、成功、信息），不写则取墨。
 */
export type HeatmapLevel = { label: string; from?: number; tone?: Tone };
/** 行尾汇总：对这一行的一句话，由应用给出，组件不计算。 */
export type HeatmapRowSummary = { label: string; value: (row: HeatmapRow) => string };
/** 读数面对的一格；value 可能是未知/不适用，level 只在给出 levels 且该格有数值时存在。 */
export type HeatmapReadoutCell = { row: HeatmapRow; column: HeatmapColumn; value: HeatmapCellValue; level?: HeatmapLevel };
/** label 与 framed 同 Chart（ChartFigureProps）：外部名称（aria-labelledby / aria-label）给出时，figure 与 grid 都由它命名，图内不显示标题。 */
type HeatmapBaseProps = Omit<useRender.ComponentProps<"figure">, "children"> & ChartFigureProps;
export type HeatmapProps = HeatmapBaseProps & {
  /** 行维度叫什么，例如「星期」。 */
  rowLabel: string;
  /** 列维度叫什么，例如「时段」。 */
  columnLabel: string;
  /** 量的名字，例如「同步次数」。 */
  valueLabel: string;
  columns: readonly HeatmapColumn[];
  rows: readonly HeatmapRow[];
  /** 可以返回节点；可访问名称只取字符串或数字的结果，其余退回默认的数值格式。 */
  formatValue?: (value: number, row: HeatmapRow, column: HeatmapColumn) => React.ReactNode;
  /** 分档，2 到 5 档，浓淡随档次递增；给出后格子按所在的档上色，图例列出各档。 */
  levels?: readonly HeatmapLevel[];
  /** 行尾多出一列文字（等宽数字、右对齐），同时是等价数据表的最后一列。 */
  rowSummary?: HeatmapRowSummary;
  /** 替换悬停/聚焦读数里值的那一行。读数只是增强，名称与数据表仍是完整信息。 */
  renderReadout?: (cell: HeatmapReadoutCell) => React.ReactNode;
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
 * - 相邻格之间半分（默认 2px）纸色空隙，与柱状、堆叠柱同一机制（骨法用笔，一个范围一种机制，不描边）。
 *   这是 CSS 的 grid gap，直接读 --qy-fen-half（gap-fen-half），不经 JS，也就不必读系统尺度。
 *
 * 分档（levels）：
 * - 档由应用声明（随类赋彩：类别是事实，组件不从数值猜好坏）；给出时不再用连续色阶，
 *   格子取所在档的一块色，图例是各档的色块加档名。
 * - 浓淡随档次递增，与有无 tone 无关：第 i 档的浓度 = 12% + (i/(n−1))^1.35 × 范围。无 tone 的档只能排在有 tone 的档之前
 *   （墨是最淡的一类，排在后面会破坏递增；违反抛错）。范围的上端：
 *   无 tone 的档取墨，止于重墨 50%（焦墨满格会压过图名与读数，君位）；有 tone 的档取该类别色与纸调和到
 *   足色 100%。下端 12% 沿用连续色阶的下限。档数 2–5 是上限而非推导：五档以上相邻档的浓淡差
 *   小于一眼可辨（预设）；档的百分比是预设，浅深两种主题下各档填充的相对亮度单调变化已实测。
 * - 档名进入格子的可访问名称与读数，所以色相、浓淡都不是唯一的承载者（灰度检验）。
 * - 未知/不适用的格不属于任何一档，仍是斜纹。
 *
 * 语义（WAI-ARIA）：选用 grid 而不是「img + 漫游 tabindex」。
 * - 键盘模型就是 APG 的数据网格：整张图一个 Tab 停靠点，方向键、Home/End、Ctrl+Home/End 在格间移动，
 *   Tab 离开再回来落在上次所在的格（漫游 tabindex）。img 没有这套约定，读屏用户也得不到「第几行第几列」。
 * - 格子只读：grid 标 aria-readonly；每个 gridcell 自带完整名称（行名 + 列名 + 值 [+ 档名]）。
 *   可见的行列标题 aria-hidden，不做 rowheader/columnheader：名称已含行列，再暴露标题会让读屏
 *   在表格模式里每格重复一遍行名列名。行包装层用 subgrid 与外层同轨，不用 display: contents
 *   （后者在部分浏览器里会丢掉 row 语义）。
 * - 等价数据表仍按需展开，是完整信息；grid 是它的视觉对应物，不是它的替代。
 *
 * 焦点：线在格内（inset），外一道 2px 焦墨线，内再衬 1px 纸色线。格子的填充从纸色一路深到足色，
 * 单一线色不可能对所有深浅都 3:1（中间深浅处焦墨与纸色对填充都只有约 2.5:1，实测），
 * 所以两色并用：任一深浅的填充，焦墨线或纸色线至少有一条 ≥ 3:1。「衬一道纸色」是为这张图的
 * 填充跨度而设的预设，不是全库的焦点画法。
 */
const INK_FLOOR = 12; // 预设：浓度的百分比，不是长度
const INK_CEIL = 100; // 足色：数据是色，量最大处是颜料本色
const LEVEL_INK_CEIL = 50; // 无 tone 的档止于重墨（浓度百分比，预设）
const STEP = 1.35; // 预设：浓度的台阶随档次加大（r^1.35）。按「图形」状态色（--qy-*-graphic）实测：1.2 时浅色 n = 5 的「危险 → 警示」亮度失序（−0.001），1.35 使浅深两主题、n = 2…5、任意相邻类别组合的相对亮度都单调（n = 5 最小差 浅 0.012 / 深 0.009）；换状态色后须重测
const CELL = "calc(var(--qy-cai))"; // 格高一材
/* 未知 / 不适用的斜纹：纹线一线宽，纹距 1.5 分（默认 6px；格高一材，纹距随格走）。倍数 1.5 为预设；45° 是方向不是长度。 */
const HATCH = "bg-[repeating-linear-gradient(45deg,var(--qy-border)_0,var(--qy-border)_var(--qy-line-width),transparent_var(--qy-line-width),transparent_calc(1.5*var(--qy-fen)))] bg-surface";

type Paint = { background: string };
const mix = (color: string, pct: number) => `color-mix(in srgb, ${color} ${pct}%, var(--qy-surface))`;

function scalePaint(value: number, max: number): Paint {
  const pct = max > 0 ? INK_FLOOR + (value / max) * (INK_CEIL - INK_FLOOR) : INK_FLOOR;
  return { background: mix("var(--qy-chart-1)", pct) };
}
function levelPaint(index: number, count: number, tone?: Tone): Paint {
  const rank = (index / (count - 1)) ** STEP;
  if (!tone) return { background: mix("var(--qy-ink)", INK_FLOOR + rank * (LEVEL_INK_CEIL - INK_FLOOR)) };
  return { background: mix(toneColor[tone], INK_FLOOR + rank * (INK_CEIL - INK_FLOOR)) };
}
function checkLevels(levels: readonly HeatmapLevel[]) {
  if (levels.length < 2 || levels.length > 5) throw new RangeError("Heatmap levels require two to five levels; more steps than that are no longer told apart at a glance.");
  levels.forEach((level, index) => {
    if (!isName(level?.label)) throw new Error(`Heatmap levels[${index}] requires a nonempty label; received ${received(level?.label)}.`);
    assertTone(level.tone, "Heatmap level");
    if (index > 0 && !level.tone && levels[index - 1]!.tone) throw new RangeError("A Heatmap level without tone cannot follow one with tone: depth must grow with the level, and ink is the lightest step.");
    if (index === 0) { if (level.from !== undefined) throw new RangeError("The first Heatmap level covers every smaller value and takes no `from`."); return; }
    if (typeof level.from !== "number" || !Number.isFinite(level.from) || (index > 1 && level.from <= levels[index - 1]!.from!)) throw new RangeError("Heatmap level `from` values must be finite numbers, strictly increasing after the first level.");
  });
  // 档名比较时去掉首尾空白：图例与读数里「偏高」与「偏高 」看不出区别。
  const names = levels.map(level => level.label.trim());
  names.forEach((name, index) => { const first = names.indexOf(name); if (first !== index) throw new Error(`Heatmap levels[${index}] repeats the label "${name}" of levels[${first}]; level names must be unique.`); });
}
function levelIndexOf(levels: readonly HeatmapLevel[], value: number) {
  let index = 0;
  for (let i = 1; i < levels.length; i++) if (value >= levels[i]!.from!) index = i;
  return index;
}

type ActiveCell = HeatmapReadoutCell & { x: number; y: number };

/** 悬停/聚焦读数：与其余图表同一视觉外壳；只增强，不替代可聚焦格自身的 aria-label 与数据表。 */
function HeatmapReadout({ active, rowLabel, columnLabel, format, renderReadout }: { active: ActiveCell; rowLabel: string; columnLabel: string; format: (value: number) => React.ReactNode; renderReadout?: HeatmapProps["renderReadout"] }) {
  const { row, column, value, level } = active;
  /* 读数在格上方、水平居中，挂在滚动容器之外（容器会裁掉越界的部分）；左右越出绘图区时平移回来。 */
  const ref = React.useRef<HTMLDivElement>(null);
  const [dx, setDx] = React.useState(0);
  React.useLayoutEffect(() => {
    const el = ref.current, host = el?.parentElement;
    if (!el || !host) return;
    const rect = el.getBoundingClientRect(), box = host.getBoundingClientRect();
    setDx(rect.left < box.left ? box.left - rect.left : rect.right > box.right ? box.right - rect.right : 0);
  }, [active.x, active.y]);
  return <div ref={ref} role="tooltip" style={{ left: active.x, top: active.y, transform: `translate(calc(-50% + ${dx}px), calc(-100% - var(--qy-space-2)))` }} className={`pointer-events-none absolute z-10 grid w-max max-w-full gap-(--qy-space-1) ${READOUT_SURFACE}`}>
    <div className="flex min-w-0 items-center gap-(--qy-field-gap)"><span className="text-muted-foreground">{rowLabel}</span><span className="wrap-anywhere">{row.label}</span></div>
    <div className="flex min-w-0 items-center gap-(--qy-field-gap)"><span className="text-muted-foreground">{columnLabel}</span><span className="wrap-anywhere">{column.label}</span></div>
    {renderReadout ? renderReadout({ row, column, value, ...(level ? { level } : {}) }) : <div className="flex min-w-0 items-center gap-(--qy-field-gap)">
      <span className="text-body-strong numeric">{typeof value === "number" ? format(value) : value.label}</span>
      {level && <span className="text-muted-foreground wrap-anywhere">{level.label}</span>}
    </div>}
  </div>;
}

const FOCUS_RING = "outline-none focus-visible:shadow-[inset_0_0_0_var(--qy-focus-ring-width)_var(--qy-focus-ring-color),inset_0_0_0_calc(var(--qy-focus-ring-width)+1px)_var(--qy-surface)]";

/** 两个类别维度上的量：方格按花青单色相的顺序色阶（或应用声明的分档）着色，按需展开的等价数据表与悬停读数。 */
/** 图只画数据（用户裁决 2026-10-10：功能要纯粹）。没有网格可画时不渲染图，由调用方在原位放 Empty。 */
export function Heatmap({ label, framed = true, render, ref, className, rowLabel, columnLabel, valueLabel, columns, rows, formatValue, levels, rowSummary, renderReadout, ...native }: HeatmapProps) {
  if (!isName(label)) throw new Error(`Heatmap requires a nonempty accessible label; received ${received(label)}.`);
  const titleId = React.useId(); const dataView = useChartData();
  const naming = chartName(native, titleId);
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  const [active, setActive] = React.useState<ActiveCell | null>(null);
  const [stop, setStop] = React.useState({ row: 0, col: 0 });
  let content: React.ReactNode;
  // 名称与标识：先判类型再去空白（require-name.ts），错误写明是哪一项、缺什么。不是数组的 columns / rows 与不足两项同样处理。
  if (!isName(rowLabel)) throw new Error(`Heatmap requires a nonempty rowLabel naming the row dimension; received ${received(rowLabel)}.`);
  if (!isName(columnLabel)) throw new Error(`Heatmap requires a nonempty columnLabel naming the column dimension; received ${received(columnLabel)}.`);
  if (!isName(valueLabel)) throw new Error(`Heatmap requires a nonempty valueLabel naming the measured quantity; received ${received(valueLabel)}.`);
  if (!isList(columns) || !isList(rows) || columns.length < 2 || rows.length < 2) throw new RangeError("Heatmap requires two or more values on both the row and column dimensions; a single row or column is a Chart bar, not a grid.");
  requireNamedItems("Heatmap columns", columns, "key");
  requireNamedItems("Heatmap rows", rows, "id");
  if (levels) checkLevels(levels);
  if (rowSummary && typeof rowSummary.value !== "function") throw new Error(`Heatmap rowSummary requires a value function; received ${received(rowSummary.value)}.`);
  if (rowSummary && !isName(rowSummary.label)) throw new Error(`Heatmap rowSummary requires a nonempty label heading its column; received ${received(rowSummary.label)}.`);
  let max = 0, anyNumeric = false;
  const grid = rows.map(row => columns.map(column => { const value = readValue(row, column.key); if (typeof value === "number") { anyNumeric = true; max = Math.max(max, value); } return value; }));
  const format = (value: number, row: HeatmapRow, column: HeatmapColumn) => formatValue ? formatValue(value, row, column) : number.format(value);
  /* 名称只用字符串：formatValue 可以返回节点（图标、加粗），名称里放不下，退回默认的数值格式。 */
  const plain = (value: number, row: HeatmapRow, column: HeatmapColumn) => { const formatted = formatValue?.(value, row, column); return typeof formatted === "string" || typeof formatted === "number" ? String(formatted) : number.format(value); };
  const summaries = rowSummary ? rows.map(row => String(rowSummary.value(row))) : null;
  const lastCol = columns.length - (rowSummary ? 0 : 1); // 汇总列也是一格，参与方向键移动
  const stopRow = Math.min(stop.row, rows.length - 1), stopCol = Math.min(stop.col, lastCol);

  const show = (element: HTMLElement, cell: HeatmapReadoutCell) => {
    const rect = element.getBoundingClientRect(), host = element.closest("[data-slot=\"chart-plot\"]")!.getBoundingClientRect();
    setActive({ ...cell, x: rect.left - host.left + rect.width / 2, y: rect.top - host.top });
  };
  const onKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const from = (event.target as HTMLElement).closest<HTMLElement>("[data-row][data-col]");
    if (!from || event.altKey || event.metaKey) return;
    if (event.key === "Escape") { setActive(null); return; }
    const toward = getComputedStyle(event.currentTarget).direction === "rtl" ? -1 : 1; // RTL 下左右对调
    let r = Number(from.dataset.row), c = Number(from.dataset.col);
    switch (event.key) {
      case "ArrowRight": c += toward; break;
      case "ArrowLeft": c -= toward; break;
      case "ArrowDown": r += 1; break;
      case "ArrowUp": r -= 1; break;
      case "Home": c = 0; if (event.ctrlKey) r = 0; break;
      case "End": c = lastCol; if (event.ctrlKey) r = rows.length - 1; break;
      default: return;
    }
    event.preventDefault();
    r = Math.max(0, Math.min(rows.length - 1, r)); c = Math.max(0, Math.min(lastCol, c));
    event.currentTarget.querySelector<HTMLElement>(`[data-row="${r}"][data-col="${c}"]`)?.focus();
  };

  content = <>
    <div data-slot="chart-value-axis" className="min-w-0 text-dense text-muted-foreground wrap-anywhere">{valueLabel}</div>
    {anyNumeric && <div data-slot="chart-plot" className="relative min-w-0 w-full">
      <div className="min-w-0 w-full overflow-x-auto"><div role="grid" {...naming.name} aria-readonly="true" onKeyDown={onKeyDown} className="inline-grid min-w-full gap-fen-half" style={{ gridTemplateColumns: `max-content repeat(${columns.length}, minmax(${CELL}, 1fr))${rowSummary ? " max-content" : ""}` }}>
        <div aria-hidden="true" className="col-span-full grid grid-cols-subgrid">
          <span />
          {columns.map(column => <span key={column.key} className="flex min-w-0 items-end justify-center px-(--qy-space-1) text-dense text-muted-foreground wrap-anywhere">{column.label}</span>)}
          {rowSummary && <span className="flex min-w-0 items-end justify-end ps-(--qy-space-2) text-dense text-muted-foreground wrap-anywhere">{rowSummary.label}</span>}
        </div>
        {rows.map((row, rowIndex) => <div key={row.id} role="row" className="col-span-full grid grid-cols-subgrid">
          <span aria-hidden="true" className="flex items-center justify-end pe-(--qy-space-2) text-dense text-muted-foreground wrap-anywhere">{row.label}</span>
          {columns.map((column, columnIndex) => {
            const value = grid[rowIndex]![columnIndex]!;
            const known = typeof value === "number";
            const levelIndex = known && levels ? levelIndexOf(levels, value) : -1;
            const level = levelIndex >= 0 ? levels![levelIndex] : undefined;
            const paint = known ? (levels ? levelPaint(levelIndex, levels.length, level!.tone) : scalePaint(value, max)) : null;
            const text = known ? plain(value, row, column) : "";
            const name = known ? messages.heatmapCell(row.label, column.label, level ? messages.heatmapLevelled(text, level.label) : text) : messages.heatmapUnavailable(row.label, column.label, value.label);
            const cell: HeatmapReadoutCell = { row, column, value, ...(level ? { level } : {}) };
            return <div key={column.key} role="gridcell" tabIndex={rowIndex === stopRow && columnIndex === stopCol ? 0 : -1} aria-label={name} data-row={rowIndex} data-col={columnIndex} data-state={known ? "known" : value.state} data-level={level ? levelIndex : undefined}
              className={cn(FOCUS_RING, known ? undefined : HATCH)}
              style={{ height: CELL, background: paint?.background }}
              onMouseEnter={(event) => show(event.currentTarget, cell)}
              onMouseLeave={() => setActive(null)}
              onFocus={(event) => { setStop({ row: rowIndex, col: columnIndex }); show(event.currentTarget, cell); }}
              onBlur={() => setActive(null)} />;
          })}
          {summaries && <div role="gridcell" tabIndex={rowIndex === stopRow && columns.length === stopCol ? 0 : -1} aria-label={messages.heatmapCell(row.label, rowSummary!.label, summaries[rowIndex]!)} data-row={rowIndex} data-col={columns.length} data-slot="heatmap-summary"
            className={cn(FOCUS_RING, "flex min-w-0 items-center justify-end ps-(--qy-space-2) text-dense numeric")}
            style={{ height: CELL }}
            onFocus={() => { setStop({ row: rowIndex, col: columns.length }); setActive(null); }}>{summaries[rowIndex]}</div>}
        </div>)}
      </div></div>
      {active && <HeatmapReadout key={`${active.row.id}/${active.column.key}`} active={active} rowLabel={rowLabel} columnLabel={columnLabel} format={(value) => format(value, active.row, active.column)} renderReadout={renderReadout} />}
      <div aria-hidden="true" className="mt-(--qy-field-gap) flex items-center gap-(--qy-field-gap) text-dense text-muted-foreground">
        {levels
          ? <ul data-slot="heatmap-legend" className={cn(legendClassName, "text-dense")}>{levels.map((level, index) => <li key={level.label} className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere"><span data-slot="legend-key" data-level={index} className="size-(--qy-status-dot-size) shrink-0 rounded-(--qy-swatch-radius)" style={{ background: levelPaint(index, levels.length, level.tone).background }} /><span>{level.label}</span></li>)}</ul>
          : <>
            <span>{messages.heatmapScaleFrom}</span>
            <span data-slot="heatmap-scale-key" className="h-(--qy-space-2) w-16 rounded-xs" style={{ background: `linear-gradient(to right, ${scalePaint(0, 1).background}, ${scalePaint(1, 1).background})` }} />
            <span>{messages.heatmapScaleTo}</span>
          </>}
      </div>
    </div>}
    {dataView.open && <div id={dataView.id} data-slot="chart-data"><TableContainer><Table aria-label={label}><TableHeader><TableRow><TableHead>{rowLabel}</TableHead>{columns.map(column => <TableHead key={column.key}>{column.label}</TableHead>)}{rowSummary && <TableHead className="text-end">{rowSummary.label}</TableHead>}</TableRow></TableHeader><TableBody>
          {rows.map((row, rowIndex) => <TableRow key={row.id}><TableHead scope="row">{row.label}</TableHead>{columns.map((column, columnIndex) => { const value = grid[rowIndex]![columnIndex]!; const level = levels && typeof value === "number" ? levels[levelIndexOf(levels, value)] : undefined; return <TableCell key={column.key} className="numeric" data-state={typeof value === "number" ? "known" : value.state}>{typeof value === "number" ? format(value, row, column) : value.label}{level && <span className="block whitespace-nowrap text-muted-foreground">{level.label}</span>}</TableCell>; })}{summaries && <TableCell className="text-end numeric" data-slot="heatmap-summary">{summaries[rowIndex]}</TableCell>}</TableRow>)}
        </TableBody></Table></TableContainer></div>}
  </>;
  return useRender({ defaultTagName: "figure", render, ref, props: mergeProps(native, {
    "data-slot": "heatmap", "data-framed": framed, ...naming.name,
    className: cn(chartBaseClassName, framed && chartPaperClassName, className),
    children: <><ChartHeader titleId={naming.selfTitled ? titleId : undefined} label={label} toggle={dataView.toggle} />{content}</>,
  }) });
}
