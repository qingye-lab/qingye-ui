"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, ComposedChart, Line, LineChart, Pie, PieChart, ReferenceArea, ReferenceDot, ReferenceLine, ResponsiveContainer, Text as RechartsText, Tooltip, usePlotArea, XAxis, YAxis } from "recharts";
import * as React from "react";
import { Button } from "./button";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "./table";
import { ChartGeometryContext, chartGeometry, useChartGeometry, type ChartGeometry, READOUT_SURFACE } from "../chart-geometry";
import { useUILocale } from "../locale";
import { isList, isName, received, requireNamedItems } from "../require-name";
import { useSystemUnits } from "../system-units";
import { assertTone, toneColor, type Tone } from "../tone";
import { cn } from "../utils";

export { useChartGeometry, type ChartGeometry };
export type ChartUnavailableValue = { state: "unknown" | "not-applicable"; label: string };
export type ChartValue = number | ChartUnavailableValue;
export type ChartRow = { id: string; label: string; values: Readonly<Record<string, ChartValue>> };
export type ChartSeries = { key: string; label: string };
/**
 * Chart 的系列：在 ChartSeries 上多两个只有折线与图内状态才用得到的声明。
 * 另立类型而不加在 ChartSeries 上，因为 Heatmap 的列（HeatmapColumn）与 ChartSeries 同构，不该带上它们。
 * - context：背景系列，只用于 line——同一量的“其余”若干条，淡墨细线，不占身份色与标记；见下方「背景系列」。
 * - tone：系列的状态类别；非背景系列要么全部声明、要么都不声明，且不得重复。
 * - interpolation：只用于 line、area、area-stacked、area-share；见 ChartInterpolation。
 * - range：只用于 line 的非背景系列——这一条线在每一点上还有一段区间（如多次测量的最小、最大值），min / max 是 rows 里 values 的键，
 *   画成同色的淡带垫在线下，读数与数据表各多出区间的两端；见 RANGE_FILL_OPACITY。线本身仍是该系列 key 的值（均值、中位数等），不要求落在区间正中。
 */
/**
 * 两点之间怎么连：linear 直线；step 阶梯，值从该点起保持到下一点（step-after）。
 * 阶梯表达“值在两次变化之间保持不变”（设定值、阈值、库存）；不提供平滑曲线——曲线在两点之间画出数据里没有的值。
 */
export type ChartInterpolation = "linear" | "step";
export type ChartRange = { min: string; max: string };
export type ChartSeriesInput = ChartSeries & { context?: boolean; tone?: Tone; interpolation?: ChartInterpolation; range?: ChartRange };
/** 参照：量轴上的一个范围（带）或一个位置（线）。是墨不是色，名称必填并出现在图例与数据表。 */
export type ChartReference = { kind: "band"; from: number; to: number; label: string } | { kind: "line"; value: number; label: string };
/** 事件：落在类别轴某一行上的一件事；给 tone 时用类别色，否则用墨。 */
export type ChartEvent = { rowId: string; label: string; tone?: Tone };
/**
 * 由任务选定，不是外观偏好：line 随时间/次序的趋势；bar 类别间比较；area 随时间的量
 * （单系列第一色淡面，多系列默认各自半透叠放）；area-stacked 随时间的构成（同一时刻诸部分加总
 * 为整体，于是不透明的淡色带加足色上沿、彼此相切，与 bar-stacked 同一任务的连续版）；bar-horizontal 类别名长
 * 或按大小排序的排行；bar-stacked 类别之间的构成比较；bar-share / area-share 构成的占比怎样变（各行归一到该行之和，量轴 0–100%，
 * 读数与数据表同时给原值与占比）；donut 只用于 2–5 个部分、一眼占比的单个整体
 * （rows 必须正好一行——它不是多类别并排比较，而是一个整体的拆分；超过 5 部分改用 Proportion 或条形图）。
 */
/** 图的本体：排布与文字档，不含纸。Chart、ScatterChart、Heatmap 共用。 */
export const chartBaseClassName = "m-0 grid min-w-0 max-w-full gap-(--qy-field-gap) text-body text-foreground";
/**
 * 图的纸（绘事后素）：数据集合是独立对象，与比较表同一画法——纸本色、清墨线、面板圆角与内缘。
 * framed={false} 时不铺这张纸：图坐在已有的面上（无边框的 Section、Card、面板），线、底、圆角与内缘都由承载它的面给出，
 * 图的左右缘就是那个面的内容缘（基础层 §19：一列只有一条左缘）。与 TableContainer 的 framed 同名同义。
 */
export const chartPaperClassName = "rounded-panel border border-border bg-surface p-(--qy-panel-padding)";
/** 带纸的图（framed 的默认）。 */
export const chartFrameClassName = `${chartBaseClassName} ${chartPaperClassName}`;

/*
 * 文字是墨，数据是色：图里的字、轴、网格用墨阶；数据即使只有一个系列也取第一色（花青）。
 * 焦墨是正文最重的一级，一根焦墨实柱的面积远大于文字，会压过图名与读数（君位，染随面积）。
 * 堆叠面积是大面：填充取颜料与纸调和的淡色（不透明，带与带不互相混色），上沿一道足色线交代边界。
 */
const AREA_WASH = 28; // 预设：堆叠面积的淡色带里颜料占 28%，其余是纸色

export type ChartType = "line" | "bar" | "area" | "area-stacked" | "bar-horizontal" | "bar-stacked" | "bar-share" | "area-share" | "donut";
export type ChartMarker = "circle" | "square" | "triangle" | "diamond" | "cross";
/** context 系列不画标记：marker 对它是占位（取第一个形状），读取时以 context 为准。 */
export type ChartProjectedSeries = ChartSeries & { dataKey: string; color: string; marker: ChartMarker; context: boolean; tone?: Tone; interpolation?: ChartInterpolation; range?: ChartRange };
/**
 * 同源投影。bar-share / area-share 的 data 里是占比（0–1，该行各系列加总为 1；该行含未知值、不适用值或和为 0 时整行为 null，不画），
 * 原值在 raw（与 data 同序）；valueLabels 为真时由图形把格式化后的值标在柱的数据端。
 * 带 range 的系列：投影后的 range.min / range.max 是 data 里区间两端的键（与 dataKey 同一套 series0…命名；该点两端有一端不可得时对应值为 null）。
 */
export type ChartPlotData = { type: ChartType; data: Record<string, string | number | null>[]; series: readonly ChartProjectedSeries[]; categoryLabel: string; valueLabel: string; total?: number; references?: readonly ChartReference[]; events?: readonly ChartEvent[]; valueDomain?: readonly [number, number]; raw?: Record<string, number | null>[]; valueLabels?: boolean };
export type ChartStyle = React.CSSProperties & {
  "--qy-chart-plot-height"?: string;
};
/** 三种图共有的两项：纸与命名。 */
export type ChartFigureProps = {
  /**
   * 图的名字。默认显示为图内的标题（figcaption）并命名这个 figure。调用方传入 aria-labelledby 或 aria-label 时，
   * figure 由那个外部名称命名，图内不再显示标题（同一个名字不说两遍，NG1）；label 仍必填，它是等价数据表的名字。
   */
  label: string;
  /** false：图放在已有的面上（无边框的 Section、Card、面板），不再铺自己的纸——没有线、底、圆角与内缘。是否显示图内标题与它无关，只看有没有外部名称。 */
  framed?: boolean;
};
type ChartBaseProps = Omit<useRender.ComponentProps<"figure">, "children" | "style"> & ChartFigureProps & { style?: ChartStyle };
export type ChartProps = ChartBaseProps & {
  type: ChartType;
  categoryLabel: string;
  valueLabel: string;
  series: readonly ChartSeriesInput[];
  /** 有背景系列（series[].context）时必填：图例里合成一项的名字，例如「其余蚕室」。 */
  contextLabel?: string;
  rows: readonly ChartRow[];
  /** 量轴上的参照：目标带或参照线。画成墨，名称进图例与数据表；量轴范围自动算入。donut 不接受。 */
  references?: readonly ChartReference[];
  /** 落在类别轴某一行上的事件：基线处一个圆点，名称进悬停读数与数据表的一列。donut 不接受。 */
  events?: readonly ChartEvent[];
  /** 量轴范围，只对 line 生效：位置编码可以不从零起，长度与面积编码不行。其他类型传入即抛错。 */
  valueDomain?: readonly [number, number];
  /** 把格式化后的值标在柱的数据端，同时不再画量轴刻度与网格。只对 bar、bar-horizontal 生效，且只允许单系列；其他类型传入即抛错。 */
  valueLabels?: boolean;
  /** 只用于 donut：整体的总量。省略时等于各部分之和；大于之和时，剩余部分并入「其余」（groove-surface，不是第六种色相）。其他 type 不读取此值。 */
  total?: number;
  formatValue?: (value: number, series: ChartSeries, row: ChartRow) => React.ReactNode;
  renderPlot?: (projection: ChartPlotData) => React.ReactNode;
};

/*
 * 图的法度（基础层 §7「数据系列」；表达九法）：
 * - 文字是墨，数据是色：只有一个系列也取第一色（见上文；焦墨实柱会压过图名与读数），单系列不出图例——
 *   没有类别要区分（NG10）。两个以上按 --qy-chart-1…5 取色，顺序经过色觉校验；标记形状是第二通道，转成灰度仍可区分。
 * - 骨法用笔：线 2px；网格是清墨的一道细线，只画横线；基线用淡墨；不画刻度线与纵轴线。
 * - 应物象形：柱子细（≤ 6 分），数据端圆角 1 分，基线端方角——柱从基线长出来。
 *   相邻的柱之间留半分纸色空隙，不描边。标记 2 分，外加一圈纸色，交叉时仍可读。
 * - 绘事后素：不加阴影、渐变与入场动画（气韵生动：动只交代真实变化）。
 * - 文字不用数据色：轴、图例与读数用墨阶，色相只在标记上。
 * 图高 10 材，预设，调用方可覆写 --qy-chart-plot-height。
 * 几何的像素（线宽、标记、柱宽、圆角、空隙）不是写死的字面量：它们是 SVG 与 Recharts 属性上的数字，读不到 CSS 变量，
 * 由图的根节点读出分与线宽，经 chartGeometry（../chart-geometry）换算，每个长度与分的关系写在那里；默认令牌下与此前的字面量逐个相同。
 * 不是长度的值（占比、个数、层级）与不随模数走的值留在本文件，并标明预设。
 */
const STEP_TYPES = new Set<ChartType>(["line", "area", "area-stacked", "area-share"]);
const CHART_TYPES = new Set<ChartType>(["line", "bar", "area", "area-stacked", "bar-horizontal", "bar-stacked", "bar-share", "area-share", "donut"]);
export const PLOT_PRESETS: ChartStyle = { "--qy-chart-plot-height": "calc(10 * var(--qy-cai))" };
export const MARKERS: readonly ChartMarker[] = ["circle", "square", "triangle", "diamond", "cross"];
const BAR_CATEGORY_GAP = "24%"; // 预设：类别带里柱组之间的留白，占类别带的比例（比例不是长度，不随分走）
const AREA_FILL_OPACITY = 0.1; // 预设：单系列与多系列半透叠放面积的淡面浓度
/*
 * 区间带：一条线在每一点上的上下界，画成与该系列同色的一块淡染，垫在线与标记之下。
 * - 同色：带属于这条线，不另取色（色是身份；一条线只有一个身份）。淡：它是线的不确定范围，不是另一个数据，不能与线争位。
 * - 不描边：带的边界由染色本身给出（一个范围一种机制，同参照带）；线与带之间已有足色 2px 线分开。
 * - 浓度 0.14 是预设：试过 0.1（与面积图的淡面同值）在浅色纸上与网格线的墨色相近，读不出是一块带；0.14 在浅深两色下都能与纸分开又不压过线。
 *   图例的键同取此值，所以只改这一处。
 */
const RANGE_FILL_OPACITY = 0.14;
/*
 * 参照、背景系列与事件（用户批准 2026-10-12）：它们帮读者定位数据，自己不是数据，所以用墨不用色（NG10）。
 * - 参照带：8% 墨的染（--qy-surface-strong，清；静止的面，不借用悬停面）。画在网格之上、数据之下；带只是一块淡染，不描边（一个范围一种机制）。
 * - 参照线：一线宽（hairline，默认 1px）的浓墨（66%）虚线。线宽统一为线宽（§5）；与网格的清墨实线（8%）、基线的淡墨实线（24%）、悬停游标的重墨实线（50%）
 *   分得开靠两点：墨更深、是虚线。虚线读作“不是数据”，灰度下仍成立。取值（浓、4 3 的虚线）为预设；虚线的 4 与 3 是像素字面量，与分没有可名状的关系，不随模数走。
 * - 背景系列：一线宽（hairline）的淡墨（24%）实线，不画标记。默认比数据线（2px、足色）细一半、淡许多，一眼读成背景；取值为预设。
 *   （试过重墨 50%：六七条叠在一起成一团深灰，与主线争位；淡墨 24% 退到背景，线与线仍分得开。）
 *   数量上限 CONTEXT_MAX 为预设（同一屏能分辨“其余”的条数；超过时它们已是一团灰，应改用别的形式）。
 * - 事件点：半径 3 的实心圆加一圈纸色，比数据标记（默认 8px）小一圈，落在类别轴基线上；半径 3 为预设的像素字面量（与分没有可名状的关系，3 = ¾ 分，不取整成别的倍数）。
 * 参照与背景线都在数据后面：zIndex 低于 Recharts 默认的面（100）、柱（300）、线（400）。层级不是长度，两个 z 值为预设。
 */
const BAND_FILL = "var(--qy-surface-strong)";
const REF_LINE = "var(--qy-foreground-muted)";
const REF_DASH = "4 3";
const CONTEXT_COLOR = "var(--qy-groove-surface)";
const CONTEXT_MAX = 12;
// 事件点半径 3px（直径 6，介于半分空隙与 2 分标记之间：比标记小，读作「基线上的记号」而不是数据点）。预设；随字阶不随分，同 LABEL_LINE。
const EVENT_RADIUS = 3;
const Z_BAND = 50;
const Z_REF_LINE = 60;
/*
 * 占比构成（bar-share、area-share；用户批准 2026-10-12）：读的是“构成怎样变”，不是“多少”，所以每个类别（行）内各系列归一到该行之和，
 * 量轴固定 0–100%。画法就是 bar-stacked / area-stacked 的法度（部分互斥、加总为整体：不透明、彼此相切，2px 纸色空隙，淡色带加足色上沿），不另造一套。
 * - 刻度 0 / 25 / 50 / 75 / 100：四等分。读者读占比靠“一半”“四分之一”“四分之三”，四等分恰好落在这三处；20% 一格的五等分没有 50%。
 *   网格与刻度同位置，所以也是五条线，与其他图的横线数同量级。取四等分为预设，依据是读者找“一半”。
 * - 行内出现 unknown / not-applicable、或行和为 0 时不画该行：整体不可得，每一部分的占比都会是假的（名实相符）；
 *   该行没有图形可悬停，已知的原值只在数据表里如实列出，没有占比。负值抛错：占比的分母是各部分之和，负的部分没有“占整体多少”。
 *   not-applicable 与 unknown 一样处理：图上看不出这一部分是“不属于这一行”还是“没有量出”，要表达“不属于”，调用方传 0。
 * - 量轴上没有数量，所以不接受 references（0.5 是 50% 还是 0.5 个，没有可信的读法）；valueDomain 本来就只给 line。
 */
const SHARE_TICKS = [0, 0.25, 0.5, 0.75, 1] as const;
/*
 * 柱上标值（valueLabels；用户批准 2026-10-12）：柱少而要读准确值时，把数直接标在柱的数据端外侧，省去在轴上找刻度；
 * 标了值就不再画量轴刻度与网格（NG1：同一事实不说两遍），基线保留。
 * - 字：dense 档（12/16）、等宽数字、焦墨（标出的值就是读数，坐在刻度原来的位置，但比刻度更重要，所以比刻度的浓墨再深一级；文字不用数据色）。
 * - 与柱端的间距 labelGap = 1 分（默认 4px，与柱的圆角同一尺）；纵柱的字落在柱顶上方，负值落在柱底下方；横柱的字落在柱末端之后。
 * - 余量：不让绘图区把标签裁掉。纵柱的顶部余量 = 间距 + 一行字高（4 + 16）；横柱的右侧余量 = 间距 + 最宽那个标签的字宽。
 *   字宽按字符估算：中日韩字符占满一个字号（dense 档 12px，全角字宽 = 字号）；其余按等宽数字约 0.625 字号 = 7.5px，这个系数是预设（与量轴宽度同一估法）。
 *   LABEL_LINE（16）与上面的字宽估值是文字的度量：它们跟 dense 档的字号与行高走（桌面 12/16，行高即 4 分），随字阶不随分，所以不由分换算。
 * - 柱数上限 LABEL_ROWS_MAX = 12（预设）：每根柱的类别带得放得下一个标签，超过时标签互相压住，应改用表或不标值。
 * - 只允许单系列：并排的多系列柱每根都标数会挤成一片，且颜色已经分不出主次；堆叠与占比的段太窄放不下，不给。
 */
const LABEL_LINE = 16; // dense 档的行高（桌面）：文字度量，随字阶不随分
const LABEL_ROWS_MAX = 12;
const textAdvance = (text: string) => [...text].reduce((sum, char) => sum + (char.charCodeAt(0) >= 0x2e80 ? 12 : 7.5), 0);

/**
 * 标记的形：画在 mark × mark 的方框里（默认 8 × 8，圆角 1 = 边长的 1/8）。形状的比例是预设；方框的边长是 2 分，随分走。
 * 交叉的笔画是数据线宽（geo.stroke），不随方框缩放。
 */
export function MarkerShape({ marker }: { marker: ChartMarker }) {
  const { mark: m, stroke } = useChartGeometry();
  const h = m / 2;
  if (marker === "circle") return <circle cx={h} cy={h} r={h} />;
  if (marker === "square") return <rect width={m} height={m} rx={m / 8} />;
  if (marker === "triangle") return <path d={`M${h} 0 ${m} ${m}H0Z`} />;
  if (marker === "diamond") return <path d={`M${h} 0 ${m} ${h} ${h} ${m} 0 ${h}Z`} />;
  return <path d={`M0 ${h}H${m}M${h} 0V${m}`} fill="none" stroke="currentColor" strokeWidth={stroke} />;
}
/** 标记：外加一圈纸色（paint-order: stroke），压在线上或彼此交叉时仍然分得开。Scatter 复用。 */
export function Marker({ color, marker, cx, cy }: { color: string; marker: ChartMarker; cx?: number; cy?: number }) {
  const { mark, ring: ringWidth } = useChartGeometry();
  const ring = marker === "cross" ? undefined : { stroke: "var(--qy-surface)", strokeWidth: ringWidth, paintOrder: "stroke" as const };
  return <svg aria-hidden="true" viewBox={`0 0 ${mark} ${mark}`} width={mark} height={mark} x={cx === undefined ? undefined : cx - mark / 2} y={cy === undefined ? undefined : cy - mark / 2} fill="currentColor" style={{ color, overflow: "visible" }}><g {...ring}><MarkerShape marker={marker} /></g></svg>;
}
/** 图例的键与图形一致：折线是一段线加标记；填充类图形（柱、横向柱、堆叠柱、面积、环形）是一块方。 */
export function LegendKey({ series, type }: { series: ChartProjectedSeries; type: ChartType }) {
  const { mark, keyWidth, stroke, hairline } = useChartGeometry();
  const mid = mark / 2;
  if (type === "line" && series.context) return <svg aria-hidden="true" width={keyWidth} height={mark} viewBox={`0 0 ${keyWidth} ${mark}`} className="shrink-0 overflow-visible" style={{ color: series.color }}><path d={`M0 ${mid}H${keyWidth}`} stroke="currentColor" strokeWidth={hairline} strokeLinecap="round" /></svg>;
  if (type === "line") return <svg aria-hidden="true" width={keyWidth} height={mark} viewBox={`0 0 ${keyWidth} ${mark}`} className="shrink-0 overflow-visible" style={{ color: series.color }}>{series.range && <rect x={0} y={0} width={keyWidth} height={mark} fill="currentColor" fillOpacity={RANGE_FILL_OPACITY} />}<path d={`M0 ${mid}H${keyWidth}`} stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" /><svg x={(keyWidth - mark) / 2} y={0} width={mark} height={mark} viewBox={`0 0 ${mark} ${mark}`} fill="currentColor" overflow="visible"><MarkerShape marker={series.marker} /></svg></svg>;
  return <span data-slot="legend-key" aria-hidden="true" className="size-(--qy-status-dot-size) shrink-0 rounded-(--qy-swatch-radius)" style={{ background: series.color }} />;
}
/** 参照的键：带是同色的一块染，线是同样的一线宽虚线。 */
function ReferenceKey({ reference }: { reference: ChartReference }) {
  const { mark, keyWidth, hairline } = useChartGeometry();
  if (reference.kind === "band") return <span data-slot="legend-key" aria-hidden="true" className="h-(--qy-status-dot-size) shrink-0 rounded-(--qy-swatch-radius)" style={{ width: keyWidth, background: BAND_FILL }} />;
  return <svg aria-hidden="true" width={keyWidth} height={mark} viewBox={`0 0 ${keyWidth} ${mark}`} className="shrink-0 overflow-visible"><path d={`M0 ${mark / 2}H${keyWidth}`} stroke={REF_LINE} strokeWidth={hairline} strokeDasharray={REF_DASH} /></svg>;
}
export function AxisTick({ x = 0, y = 0, textAnchor = "middle", verticalAnchor = "start", payload, formatter }: { x?: number; y?: number; textAnchor?: "start" | "middle" | "end"; verticalAnchor?: "start" | "middle" | "end"; payload?: { value: string | number }; formatter?: (value: string | number) => string }) {
  return <RechartsText x={x} y={y} textAnchor={textAnchor} verticalAnchor={verticalAnchor} className="text-dense numeric" fill="var(--qy-foreground-muted)">{payload ? formatter?.(payload.value) ?? payload.value : ""}</RechartsText>;
}
/** 柱上的标值：墨阶文字，不用数据色。 */
const valueLabelClassName = "text-dense numeric";
const valueLabelFill = "var(--qy-foreground)";
/** 柱：数据端圆角、基线端方角；负值时圆角在下。纵向柱与横向柱共用，按轴互换坐标传入。label 给出时在数据端外侧标值（值为 0 的柱没有高度，仍标在基线上）。 */
function BarShape({ x = 0, y = 0, width = 0, height = 0, fill, value, label }: { x?: number; y?: number; width?: number; height?: number; fill?: string; value?: number | readonly number[]; label?: string | undefined }) {
  const { barRadius, labelGap } = useChartGeometry();
  const top = y + Math.min(0, height), h = Math.abs(height);
  const numeric = Array.isArray(value) ? value[1]! - value[0]! : (value as number | undefined) ?? 0;
  const text = label === undefined ? null : <text x={x + width / 2} y={numeric >= 0 ? top - labelGap : top + h + labelGap} textAnchor="middle" dominantBaseline={numeric >= 0 ? "auto" : "hanging"} className={valueLabelClassName} fill={valueLabelFill}>{label}</text>;
  if (!width || !height) return text ? <g>{text}</g> : <g />;
  const r = Math.min(barRadius, width / 2, h);
  const d = numeric >= 0
    ? `M${x},${top + h}V${top + r}Q${x},${top} ${x + r},${top}H${x + width - r}Q${x + width},${top} ${x + width},${top + r}V${top + h}Z`
    : `M${x},${top}V${top + h - r}Q${x},${top + h} ${x + r},${top + h}H${x + width - r}Q${x + width},${top + h} ${x + width},${top + h - r}V${top}Z`;
  return text ? <g><path d={d} fill={fill} />{text}</g> : <path d={d} fill={fill} />;
}
/** 横向柱：数据端（右端，假定非负）圆角，基线端（左端）方角——bar-horizontal 不支持负值。label 给出时标在末端之后。 */
function BarShapeHorizontal({ x = 0, y = 0, width = 0, height = 0, fill, label }: { x?: number; y?: number; width?: number; height?: number; fill?: string; label?: string | undefined }) {
  const { barRadius, labelGap } = useChartGeometry();
  const text = label === undefined ? null : <text x={x + width + labelGap} y={y + height / 2} textAnchor="start" dominantBaseline="central" className={valueLabelClassName} fill={valueLabelFill}>{label}</text>;
  if (!width || !height) return text ? <g>{text}</g> : <g />;
  const r = Math.min(barRadius, height / 2, width);
  const d = `M${x},${y}H${x + width - r}Q${x + width},${y} ${x + width},${y + r}V${y + height - r}Q${x + width},${y + height} ${x + width - r},${y + height}H${x}Z`;
  return text ? <g><path d={d} fill={fill} />{text}</g> : <path d={d} fill={fill} />;
}
/**
 * 一行里这一段是不是堆叠的最外端（isTop）或基线端（isBase）：看这一行里它之后 / 之前有没有有高度的段。
 * 末位系列在这一行是 0 或缺值时，实际的最外段是前一段，圆角应落在它身上；没有 payload 时按系列次序。
 */
function stackEdges(payload: Record<string, unknown> | undefined, keys: readonly string[], index: number) {
  if (!payload) return { isBase: index === 0, isTop: index === keys.length - 1 };
  const present = (key: string) => { const value = payload[key]; return typeof value === "number" && value > 0; };
  return { isBase: !keys.slice(0, index).some(present), isTop: !keys.slice(index + 1).some(present) };
}
/**
 * 堆叠柱的一段：段与段之间留一个空隙（surfaceGap，默认 2px）的纸色（骨法用笔，一个范围一种机制，不描边）；只有堆叠最外
 * 的数据端（isTop）才是圆角，基线端（isBase）方角，中间的段两端都方——假定非负值由基线向上叠加。
 * 填充类图（柱、堆叠、面积、环形）不加纹理（用户裁决 2026-10-30，看过红绿色弱模拟对比后定）：系列靠明度差、固定次序、
 * 这道纸色空隙和读数/数据表里的名称区分；纹理在大面积与细段上是噪点，盖过数据本身。
 */
function StackedBarShape({ x = 0, y = 0, width = 0, height = 0, fill, isBase, isTop }: { x?: number; y?: number; width?: number; height?: number; fill?: string; isBase?: boolean; isTop?: boolean }) {
  const { barRadius, surfaceGap } = useChartGeometry();
  if (!width || !height) return <g />;
  const top = y + (isTop ? 0 : surfaceGap / 2), bottom = y + height - (isBase ? 0 : surfaceGap / 2);
  const h = bottom - top;
  if (h <= 0) return <g />;
  const r = isTop ? Math.min(barRadius, width / 2, h) : 0;
  const d = r > 0
    ? `M${x},${bottom}V${top + r}Q${x},${top} ${x + r},${top}H${x + width - r}Q${x + width},${top} ${x + width},${top + r}V${bottom}Z`
    : `M${x},${top}H${x + width}V${bottom}H${x}Z`;
  return <path d={d} fill={fill} />;
}
type TooltipEntry = { dataKey?: string | number; value?: number | string | null; color?: string; payload?: { id?: string; [key: string]: unknown } };
type ChartBand = Extract<ChartReference, { kind: "band" }>;
/** 数值相对目标带的位置：高于、低于还是在内，以及差多少（带的两端含在内）。 */
function bandPosition(value: number, band: ChartBand) {
  // 差值取 12 位有效数字：27.2 − 26 在浮点里是 1.1999999999999993，读数里不该出现这种尾巴。
  const clean = (amount: number) => Number(amount.toPrecision(12));
  if (value > band.to) return { position: "above" as const, amount: clean(value - band.to) };
  if (value < band.from) return { position: "below" as const, amount: clean(band.from - value) };
  return { position: "within" as const, amount: 0 };
}
const nodeText = (node: React.ReactNode, fallback: string) => typeof node === "string" || typeof node === "number" ? String(node) : fallback;
/**
 * 悬停读数：数值在前、名称在后（读者已有系列，要的是数）；只增强，不替代数据表。
 * 背景系列不进读数（它们是背景，等价数据表里有）。有目标带时每个数值下多一行相对目标的位置；
 * 有多个带时只对第一个计算（位置要有唯一的比较对象，多个带各算一行会把读数拉长成表）。事件名列在数值之后。
 * 堆叠类（total 给出）在各系列之后多一行“合计”；占比类（share 给出）每个数值同时给原值与占比（图上的量是占比，原值要从读数里读）。
 */
export function ReadoutTooltip({ active, payload, label, series, format, band, eventsOf, share, total }: { active?: boolean; payload?: readonly TooltipEntry[]; label?: string | number; series: readonly ChartProjectedSeries[]; format: (value: number, key: string, category: string) => React.ReactNode; band?: ChartBand | undefined; eventsOf?: (rowId: string) => readonly ChartEvent[]; share?: { raw: (rowId: string, key: string) => string | null; percent: Intl.NumberFormat } | undefined; total?: ((rowId: string) => React.ReactNode) | undefined }) {
  const { code, messages } = useUILocale();
  if (!active || !payload?.length) return null;
  const rowId = payload[0]?.payload?.id ?? "";
  const rowEvents = eventsOf?.(rowId) ?? [];
  return <div className={`grid min-w-0 gap-(--qy-space-1) ${READOUT_SURFACE}`}>
    <div className="text-muted-foreground">{label}</div>
    {payload.map(entry => {
      const item = series.find(s => s.dataKey === entry.dataKey);
      if (!item || item.context) return null;
      const known = typeof entry.value === "number";
      const place = known && band ? bandPosition(entry.value as number, band) : undefined;
      // 区间：两端都已知才写；有一端不可得时读数不猜（数据表里有各自的状态）。格式与线上的读数同一个 format。
      const low = item.range ? entry.payload?.[item.range.min] : undefined, high = item.range ? entry.payload?.[item.range.max] : undefined;
      const rangeText = typeof low === "number" && typeof high === "number" ? messages.chartRange(nodeText(format(low, item.key, String(label)), new Intl.NumberFormat(code).format(low)), nodeText(format(high, item.key, String(label)), new Intl.NumberFormat(code).format(high))) : undefined;
      // 占比类：图上的量是占比，读数给“原值（占比）”。没有画的行（含未知值或和为 0）没有图形可悬停，读数不出现，已知原值在数据表里。
      const raw = share?.raw(rowId, item.key);
      const reading = share ? (known && raw !== null && raw !== undefined ? messages.proportionShare(raw, share.percent.format(entry.value as number)) : "—") : known ? format(entry.value as number, item.key, String(label)) : "—";
      return <div key={item.key} className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-(--qy-field-gap)">
        {/* 读数键是一段数据线：高 = 数据线宽（半分），宽 3 分是预设（短于图例键的 4 分，读数里只需认色）。合计行的空位与它同宽，数字列才对齐。 */}
        <span aria-hidden="true" className="h-fen-half w-3 shrink-0 rounded-full" style={{ background: item.color }} />
        <div className="flex min-w-0 items-center gap-(--qy-field-gap)">
          <span className="text-body-strong numeric">{reading}</span>
          <span className="min-w-0 text-muted-foreground wrap-anywhere">{item.label}</span>
        </div>
        {rangeText && <div data-slot="chart-range" className="col-start-2 text-dense text-muted-foreground numeric wrap-anywhere">{rangeText}</div>}
        {place && band && <div className="col-start-2 text-dense text-muted-foreground numeric wrap-anywhere">{messages.chartBandPosition(place.position, nodeText(format(place.amount, item.key, String(label)), new Intl.NumberFormat(code).format(place.amount)), band.label)}</div>}
      </div>;
    })}
    {total && <div data-slot="chart-total" className="grid min-w-0 grid-cols-[auto_minmax(0,1fr)] items-center gap-x-(--qy-field-gap)">
      <span aria-hidden="true" className="w-3 shrink-0" />
      <div className="flex min-w-0 items-center gap-(--qy-field-gap)">
        <span className="text-body-strong numeric">{total(rowId)}</span>
        <span className="min-w-0 text-muted-foreground wrap-anywhere">{messages.chartTotal}</span>
      </div>
    </div>}
    {rowEvents.map((event, index) => <div key={index} className="flex min-w-0 items-center gap-(--qy-field-gap)">
      <EventDot tone={event.tone} />
      <span className="min-w-0 wrap-anywhere">{event.label}</span>
    </div>)}
  </div>;
}
/** 事件点：读数里的小圆，与图中基线上的点同色（给 tone 时类别色，否则墨）。 */
function EventDot({ tone }: { tone?: Tone | undefined }) {
  return <svg aria-hidden="true" width={EVENT_RADIUS * 2} height={EVENT_RADIUS * 2} viewBox={`0 0 ${EVENT_RADIUS * 2} ${EVENT_RADIUS * 2}`} className="shrink-0" style={{ color: tone ? toneColor[tone] : "var(--qy-foreground)" }}><circle cx={EVENT_RADIUS} cy={EVENT_RADIUS} r={EVENT_RADIUS} fill="currentColor" /></svg>;
}
/**
 * 指定量轴范围时的刻度：Recharts 在 [20, 30] 上会取 23.3、26.7 这类不整的刻度再四舍五入成“23”“26”，读数与线对不上。
 * 步长取 1、2、2.5、5 乘 10 的幂（与散点同一规则），取使刻度不多于 6 个（五格，与散点“约四五格”同量级）的最小步长；刻度是步长的整倍数且落在范围内。
 */
function domainTicks([min, max]: readonly [number, number]) {
  const unit = Math.pow(10, Math.floor(Math.log10((max - min) / 5)));
  for (const step of [1, 2, 2.5, 5, 10].map(multiple => multiple * unit)) {
    const first = Math.ceil(min / step - 1e-9), last = Math.floor(max / step + 1e-9);
    if (last - first + 1 <= 6) return Array.from({ length: last - first + 1 }, (_, index) => Number(((first + index) * step).toPrecision(12)));
  }
  return [min, max];
}
/** 基线上的事件点（ReferenceDot 的 shape）：只借它的类别轴坐标，另一轴取绘图区的边——基线就是绘图区的底（横向柱是左缘）。 */
function EventMark({ cx, cy, horizontal, tone }: { cx?: number; cy?: number; horizontal: boolean; tone?: Tone | undefined }) {
  const area = usePlotArea();
  const { ring } = useChartGeometry();
  if (cx === undefined || cy === undefined || !area) return <g />;
  const x = horizontal ? area.x : cx, y = horizontal ? cy : area.y + area.height;
  return <circle cx={x} cy={y} r={EVENT_RADIUS} fill={tone ? toneColor[tone] : "var(--qy-foreground)"} stroke="var(--qy-surface)" strokeWidth={ring} paintOrder="stroke" />;
}
/** 环形图分段之间一个空隙（surfaceGap，默认 2px）的纸色：按中半径换算成角度，两侧各收进一半；不描边（骨法用笔）。 */
function DonutShape({ cx = 0, cy = 0, innerRadius = 0, outerRadius = 0, startAngle = 0, endAngle = 0, fill }: { cx?: number; cy?: number; innerRadius?: number; outerRadius?: number; startAngle?: number; endAngle?: number; fill?: string }) {
  const { surfaceGap } = useChartGeometry();
  const mid = (innerRadius + outerRadius) / 2 || 1;
  const gapDeg = (surfaceGap / mid) * (180 / Math.PI);
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
  return <div className={`grid min-w-0 gap-(--qy-space-1) ${READOUT_SURFACE}`}>
    <div className="flex min-w-0 items-center gap-(--qy-field-gap)">
      <span aria-hidden="true" className="size-(--qy-status-dot-size) shrink-0 rounded-(--qy-swatch-radius)" style={{ background: part.color }} />
      <span className="text-body-strong numeric">{number.format(part.value)}</span>
      <span className="min-w-0 text-muted-foreground wrap-anywhere">{part.label}</span>
    </div>
  </div>;
}
/** 阶梯取 step-after：值从该点起保持到下一点。记录是“这一刻起变成了这个值”，在记录之前不知道它已经变了；step-before 会把变化画到观测之前。 */
const curveOf = (item: ChartProjectedSeries) => item.interpolation === "step" ? "stepAfter" as const : "linear" as const;
/** 默认图形需要而投影里没有的：数字格式与由行算出的读数（占比、合计、柱上标值）。 */
type PlotExtras = {
  number: Intl.NumberFormat; format: (value: number, key: string, category: string) => React.ReactNode;
  percent?: Intl.NumberFormat; percentTick?: Intl.NumberFormat;
  rawText?: (rowId: string, key: string) => string | null; totalText?: (rowId: string) => React.ReactNode;
  labelText?: (value: number, rowId: string, key: string) => string; donutParts?: readonly DonutPart[];
};
function DefaultPlot({ type, data, series, valueLabel, total, references = [], events = [], valueDomain, valueLabels, number, format, percent, percentTick, rawText, totalText, labelText, donutParts }: ChartPlotData & PlotExtras) {
  const geo = useChartGeometry();
  if (type === "donut") {
    const cells = donutParts ?? [];
    const whole = total ?? cells.filter(cell => cell.key !== "__rest").reduce((acc, cell) => acc + cell.value, 0);
    return <div className="relative mx-auto aspect-square h-full max-h-full">
      <ResponsiveContainer width="100%" height="100%"><PieChart accessibilityLayer={false}>
        <Tooltip isAnimationActive={false} content={(props) => <DonutTooltip {...props as { active?: boolean; payload?: readonly { payload?: DonutPart }[] }} number={number} />} />
        {/* 绘图区对读屏隐藏（aria-hidden），数据由图例与数据表承担：扇区层不进 Tab 序（Recharts 的 Pie 默认 tabindex=0）。
            环的内径 62%（外径的比例）是预设，决定环的粗细。 */}
        <Pie data={cells as DonutPart[]} rootTabIndex={-1} dataKey="value" nameKey="label" innerRadius="62%" outerRadius="100%" startAngle={90} endAngle={-270} isAnimationActive={false} stroke="none" shape={(props: unknown) => { const { key, ...rest } = props as React.ComponentProps<typeof DonutShape> & { key?: React.Key }; return <DonutShape key={key} {...rest} />; }}>
          {cells.map(cell => <Cell key={cell.key} fill={cell.color} />)}
        </Pie>
      </PieChart></ResponsiveContainer>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div className="grid gap-(--qy-space-1)">
          <span className="text-metric text-foreground">{number.format(whole)}</span>
          <span className="text-support text-muted-foreground">{valueLabel}</span>
        </div>
      </div>
    </div>;
  }
  const horizontal = type === "bar-horizontal";
  const share = type === "bar-share" || type === "area-share";
  const stackedBars = type === "bar-stacked" || type === "bar-share";
  const stackedAreas = type === "area-stacked" || type === "area-share";
  const labelled = valueLabels === true && (type === "bar" || horizontal);
  // 网格只画需要的方向：数值轴是纵轴时画横线，数值轴是横轴（横向柱）时画竖线。标了值的柱不再画网格（NG1）。
  const grid = labelled ? null : <CartesianGrid vertical={horizontal} horizontal={!horizontal} stroke="var(--qy-border)" strokeWidth={geo.hairline} />;
  const values = data.flatMap(row => series.flatMap(item => [row[item.dataKey], ...(item.range ? [row[item.range.min], row[item.range.max]] : [])])).filter((value): value is number => typeof value === "number");
  const valueFormatter = (value: string | number) => typeof value === "number" ? (share && percentTick ? percentTick.format(value) : number.format(value)) : value;
  const band = references.find((reference): reference is ChartBand => reference.kind === "band");
  const eventsOf = (rowId: string) => events.filter(event => event.rowId === rowId);
  const tooltip = <Tooltip isAnimationActive={false} cursor={type === "line" ? { stroke: "var(--qy-border-input)", strokeWidth: geo.hairline } : { fill: "var(--qy-surface-hover)" }} content={(props) => <ReadoutTooltip {...props as { active?: boolean; payload?: readonly TooltipEntry[]; label?: string | number }} series={series} format={format} band={band} eventsOf={eventsOf} share={share && percent && rawText ? { raw: rawText, percent } : undefined} total={totalText} />} />;
  // 参照与事件：量轴方向画参照（纵向图是横带 / 横线，横向柱是竖带 / 竖线），画在数据后面。
  // ifOverflow="extendDomain"：Recharts 的参照默认越界即丢弃，这里显式把参照并入量轴范围（再由 "auto" 取整刻度）。
  const referenceMarks = references.map((reference, index) => {
    const side = reference.kind === "band" ? (horizontal ? { x1: reference.from, x2: reference.to } : { y1: reference.from, y2: reference.to }) : (horizontal ? { x: reference.value } : { y: reference.value });
    return reference.kind === "band"
      ? <ReferenceArea key={`ref${index}`} {...side} fill={BAND_FILL} fillOpacity={1} stroke="none" ifOverflow="extendDomain" zIndex={Z_BAND} />
      : <ReferenceLine key={`ref${index}`} {...side} stroke={REF_LINE} strokeWidth={geo.hairline} strokeDasharray={REF_DASH} ifOverflow="extendDomain" zIndex={Z_REF_LINE} />;
  });
  const refValues = references.flatMap(reference => reference.kind === "band" ? [reference.from, reference.to] : [reference.value]);
  const eventMarks = events.map((event, index) => {
    const row = data.find(record => record.id === event.rowId);
    if (!row) return null;
    // 点的另一轴坐标由 EventMark 取绘图区的边；y（或横向柱的 x）只需是个轴上存在的值，ifOverflow="visible" 保证不被丢弃。
    const at = (horizontal ? { x: 0, y: row.category as string } : { x: row.category as string, y: 0 }) as unknown as { x: number; y: number };
    return <ReferenceDot key={`event${index}`} {...at} r={EVENT_RADIUS} ifOverflow="visible" shape={(props: unknown) => <EventMark {...props as { cx?: number; cy?: number }} horizontal={horizontal} tone={event.tone} />} />;
  });
  // 量轴范围：默认从零起（柱与面积必须从零长出来）、上限取整；折线可由 valueDomain 指定，范围就是传入的两端；占比固定 0–100%。
  const lower = (min: number) => Math.min(0, min, ...refValues);
  const domain = share ? [0, 1] as [number, number] : valueDomain ? [valueDomain[0], valueDomain[1]] as [number, number] : [lower, "auto"] as [(min: number) => number, "auto"];
  // 标了值的柱：余量见 LABEL_LINE 上方的说明。图的默认边距 5 是 Recharts 的默认值（预设的像素字面量，与分没有可名状的关系），只在需要的一侧加大。
  const rowLabels = labelled && labelText ? data.flatMap(record => series.flatMap(item => typeof record[item.dataKey] === "number" ? [labelText(record[item.dataKey] as number, record.id as string, item.key)] : [])) : [];
  const labelMargin = { top: 5, right: 5, bottom: 5, left: 5 };
  if (labelled) { if (horizontal) labelMargin.right = Math.ceil(Math.max(0, ...rowLabels.map(textAdvance))) + geo.labelGap; else labelMargin.top = geo.labelGap + LABEL_LINE; }
  const labelFor = (props: { value?: unknown; payload?: { id?: string } }, key: string) => labelled && labelText && typeof props.value === "number" ? labelText(props.value, props.payload?.id ?? "", key) : undefined;
  if (horizontal) {
    // 横向柱：类别换到纵轴，数值换到横轴；纵轴宽按最长类别名估算（dense 12px，约 1 字 12px）。
    const longestLabel = Math.max(1, ...data.map(row => String(row.category).length));
    const valueAxis = labelled ? <XAxis type="number" hide domain={domain} /> : <XAxis type="number" domain={domain} tick={<AxisTick formatter={valueFormatter} />} tickLine={false} axisLine={false} />;
    const categoryAxis = <YAxis type="category" dataKey="category" tick={<AxisTick textAnchor="end" verticalAnchor="middle" />} tickLine={false} axisLine={{ stroke: "var(--qy-groove-surface)", strokeWidth: geo.hairline }} width={Math.ceil(longestLabel * 12) + geo.axisGutter} />;
    return <ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" accessibilityLayer={false} barGap={geo.surfaceGap} barCategoryGap={BAR_CATEGORY_GAP} {...(labelled ? { margin: labelMargin } : {})}>
      {grid}{valueAxis}{categoryAxis}{tooltip}{referenceMarks}
      {series.map(item => <Bar key={item.key} dataKey={item.dataKey} name={item.label} fill={item.color} maxBarSize={geo.barMax} isAnimationActive={false} shape={(props: unknown) => <BarShapeHorizontal {...props as React.ComponentProps<typeof BarShapeHorizontal>} label={labelFor(props as { value?: unknown; payload?: { id?: string } }, item.key)} />} />)}
      {eventMarks}
    </BarChart></ResponsiveContainer>;
  }
  // 折线两端留出半个标记加一圈纸色，端点不被切开；柱状由类别带自带留白。
  const categoryAxis = <XAxis dataKey="category" tick={<AxisTick />} tickLine={false} axisLine={{ stroke: "var(--qy-groove-surface)", strokeWidth: geo.hairline }} interval="preserveStartEnd" minTickGap={geo.tickGap} {...(type === "line" || type === "area" || stackedAreas ? { padding: { left: geo.mark, right: geo.mark } } : {})} />;
  // 轴宽按最长刻度文字估算（12px 等宽数字约 7.5px 一字）。上限取整后约多 25%，参照与指定范围的两端也要算进去。
  // 堆叠时轴读的是各行加总，不是单个部分：按加总估宽，否则最长刻度被截。占比轴固定，刻度是百分数。
  const extent = [...(type === "area-stacked" || type === "bar-stacked" ? data.map(row => series.reduce((sum, item) => sum + (typeof row[item.dataKey] === "number" ? row[item.dataKey] as number : 0), 0)) : values), ...refValues, ...(valueDomain ?? [])];
  const ticks = share ? [...SHARE_TICKS] : valueDomain ? domainTicks(valueDomain) : undefined;
  // 指定了范围时刻度是已知的，直接量刻度的文字（可能带小数）；否则按数据估算。
  const longest = share ? Math.max(...SHARE_TICKS.map(tick => (percentTick ?? number).format(tick).length)) : ticks ? Math.max(1, ...ticks.map(tick => number.format(tick).length)) : Math.max(1, ...extent.map(value => number.format(Math.ceil(Math.abs(value) * 1.25)).length + (value < 0 ? 1 : 0)));
  const valueAxis = labelled ? <YAxis hide domain={domain} /> : <YAxis domain={domain} {...(ticks ? { ticks } : {})} tick={<AxisTick textAnchor="end" verticalAnchor="middle" formatter={valueFormatter} />} tickLine={false} axisLine={false} width={Math.ceil(longest * 7.5) + geo.axisGutter} />;
  if (type === "bar") return <ResponsiveContainer width="100%" height="100%"><BarChart data={data} accessibilityLayer={false} barGap={geo.surfaceGap} barCategoryGap={BAR_CATEGORY_GAP} {...(labelled ? { margin: labelMargin } : {})}>
    {grid}{categoryAxis}{valueAxis}{tooltip}{referenceMarks}
    {series.map(item => <Bar key={item.key} dataKey={item.dataKey} name={item.label} fill={item.color} maxBarSize={geo.barMax} isAnimationActive={false} shape={(props: unknown) => <BarShape {...props as React.ComponentProps<typeof BarShape>} label={labelFor(props as { value?: unknown; payload?: { id?: string } }, item.key)} />} />)}
    {eventMarks}
  </BarChart></ResponsiveContainer>;
  if (stackedBars) {
    const keys = series.map(item => item.dataKey);
    return <ResponsiveContainer width="100%" height="100%"><BarChart data={data} accessibilityLayer={false} barCategoryGap={BAR_CATEGORY_GAP}>
      {grid}{categoryAxis}{valueAxis}{tooltip}{referenceMarks}
      {series.map((item, index) => <Bar key={item.key} dataKey={item.dataKey} name={item.label} stackId="qy-stack" fill={item.color} maxBarSize={geo.barMax} isAnimationActive={false}
        shape={(props: unknown) => { const { payload, ...rest } = props as React.ComponentProps<typeof StackedBarShape> & { payload?: Record<string, unknown> }; return <StackedBarShape {...rest} {...stackEdges(payload, keys, index)} />; }} />)}
      {eventMarks}
    </BarChart></ResponsiveContainer>;
  }
  if (type === "area" || stackedAreas) {
    return <ResponsiveContainer width="100%" height="100%"><AreaChart data={data} accessibilityLayer={false}>
      {grid}{categoryAxis}{valueAxis}{tooltip}{referenceMarks}
      {series.map(item => <Area key={item.key} dataKey={item.dataKey} name={item.label} type={curveOf(item)} {...(stackedAreas ? { stackId: "qy-area-stack" } : {})}
        stroke={item.color} strokeWidth={geo.stroke} strokeLinejoin="round" strokeLinecap="round" fill={stackedAreas ? `color-mix(in srgb, ${item.color} ${AREA_WASH}%, var(--qy-surface))` : item.color} fillOpacity={stackedAreas ? 1 : AREA_FILL_OPACITY}
        connectNulls={false} isAnimationActive={false} dot={false} activeDot={false} />)}
      {eventMarks}
    </AreaChart></ResponsiveContainer>;
  }
  // LineChart 只认线；区间带是面（Area），要同图并存须用 ComposedChart。没有区间时仍是 LineChart，不改变既有折线的构造。
  const Chart2D = series.some(item => item.range) ? ComposedChart : LineChart;
  return <ResponsiveContainer width="100%" height="100%"><Chart2D data={data} accessibilityLayer={false}>
    {grid}{categoryAxis}{valueAxis}{tooltip}{referenceMarks}
    <LineSeries data={data} series={series} />
    {eventMarks}
  </Chart2D></ResponsiveContainer>;
}
/*
 * 折线的系列。标记的疏密：相邻两点的间距小于两个标记宽（2 × mark，默认 16px，两个 8px 的标记并排连一圈纸色都放不下）时，
 * 每个标记已经叠在邻居上，不再增加信息，只剩一串糊；这时每个系列只画最后一个已知点的标记（读“现在”），形状照旧——
 * 身份的第二通道（形状）保留。间距按实际绘图宽度算：绘图区宽度（usePlotArea，已减去纵轴）减去横轴两端各一个 mark 的 padding，
 * 再除以间隔数（类别轴是点刻度，N 个点有 N−1 个间隔）。宽度未知（首帧为 0）时按疏的画，等量出后自然收敛。
 * 背景系列先画（在下），一线宽的淡墨线，不画标记，不参与疏密。
 */
function LineSeries({ data, series }: { data: ChartPlotData["data"]; series: readonly ChartProjectedSeries[] }) {
  const area = usePlotArea();
  const { mark, stroke, hairline } = useChartGeometry();
  const spacing = area && area.width > 0 && data.length > 1 ? (area.width - 2 * mark) / (data.length - 1) : Infinity;
  const dense = spacing < 2 * mark;
  const last = new Map(series.map(item => { let found = -1; data.forEach((record, index) => { if (typeof record[item.dataKey] === "number") found = index; }); return [item.dataKey, found] as const; }));
  const ordered = [...series.filter(item => item.context), ...series.filter(item => !item.context)];
  // 区间带先画，垫在所有线之下；一端不可得的点没有带（gap），与线的未知值同一规则。
  const bands = series.filter(item => item.range && !item.context);
  return <>{bands.map(item => <Area key={`${item.key}-range`} dataKey={(record: Record<string, string | number | null>) => { const low = record[item.range!.min], high = record[item.range!.max]; return typeof low === "number" && typeof high === "number" ? [low, high] : null; }} name={item.label} type={curveOf(item)}
      stroke="none" fill={item.color} fillOpacity={RANGE_FILL_OPACITY} tooltipType="none" legendType="none" connectNulls={false} isAnimationActive={false} dot={false} activeDot={false} />)}
    {ordered.map(item => item.context
    ? <Line key={item.key} dataKey={item.dataKey} name={item.label} type={curveOf(item)} stroke={item.color} strokeWidth={hairline} strokeLinejoin="round" strokeLinecap="round" connectNulls={false} isAnimationActive={false} activeDot={false} dot={false} />
    : <Line key={item.key} dataKey={item.dataKey} name={item.label} type={curveOf(item)} stroke={item.color} strokeWidth={stroke} strokeLinejoin="round" strokeLinecap="round" connectNulls={false} isAnimationActive={false} activeDot={false} dot={({ cx, cy, index }) => cx === undefined || cy === undefined || (dense && index !== last.get(item.dataKey)) ? <g key={index} /> : <Marker key={index} color={item.color} marker={item.marker} cx={cx} cy={cy} />} />)}</>;
}
export function readValue(row: ChartRow, key: string): ChartValue {
  const value = row.values?.[key];
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (value && typeof value === "object" && (value.state === "unknown" || value.state === "not-applicable") && isName(value.label)) return value;
  throw new TypeError(`Chart values must be finite numbers or explicitly named unknown/not-applicable values; row "${row.id}" has ${received(value)} for "${key}".`);
}

/** 同源的图形、命名的轴、图例（两个以上系列）与按需展开的等价数据表。 */
/** 「查看数据」：图的等价数据表按需展开在图下；按钮在标题栏右端，展开时像被按下。Chart、ScatterChart、Heatmap 共用。 */
export function useChartData() {
  const id = React.useId(); const [open, setOpen] = React.useState(false); const { messages } = useUILocale();
  const toggle = <Button data-slot="chart-data-toggle" variant="quiet" size="sm" aria-expanded={open} aria-controls={id} onClick={() => setOpen(value => !value)} className="-me-(--qy-control-sm-padding) shrink-0 whitespace-nowrap text-muted-foreground aria-expanded:bg-surface-selected aria-expanded:text-foreground">{messages.chartData}</Button>;
  return { id, open, toggle };
}

/**
 * 图由谁命名。调用方给了 aria-labelledby 或 aria-label（非空）时，名称在图外——通常是 SectionTitle：
 * figure 与图内需要名字的部位（Heatmap 的 grid）都用那个外部名称，图内不再显示标题。否则由图内的 figcaption 命名。
 * 返回 selfTitled（是否显示图内标题）与 name（放到被命名元素上的属性）。与 framed 无关：不铺纸而自带标题是合法的。
 */
export function chartName(native: { "aria-labelledby"?: string | undefined; "aria-label"?: string | undefined }, titleId: string): { selfTitled: boolean; name: { "aria-labelledby": string } | { "aria-label": string } } {
  const labelledby = native["aria-labelledby"], ariaLabel = native["aria-label"];
  if (isName(labelledby)) return { selfTitled: false, name: { "aria-labelledby": labelledby } };
  if (isName(ariaLabel)) return { selfTitled: false, name: { "aria-label": ariaLabel } };
  return { selfTitled: true, name: { "aria-labelledby": titleId } };
}

/**
 * 图的标题栏一行（经营位置）：图名在左；图例与「查看数据」在右，同一条行中线。三种图一种画法（NG3）。
 * 不给 titleId / label 时（图由外部名称命名）不画图名：图例与「查看数据」仍在图内、靠行尾、同一条行中线——
 * 「查看数据」展开的是这张图的等价数据表，属于图，不搬到图外。图例与按钮都没有时整行不渲染，不留空行。
 */
export function ChartHeader({ titleId, label, legend, toggle }: { titleId?: string | undefined; label?: React.ReactNode; legend?: React.ReactNode; toggle?: React.ReactNode }) {
  const titled = titleId !== undefined && label != null;
  if (!titled && !legend && !toggle) return null;
  return <div data-slot="chart-header" data-titled={titled} className={cn("mb-(--qy-field-gap) flex min-h-(--qy-control-sm) min-w-0 flex-wrap items-center gap-x-(--qy-panel-gap) gap-y-(--qy-field-gap) [&_[data-slot=button-content]]:whitespace-nowrap", !titled && "justify-end")}>
    {/* 图名所在的行恒为一个小号控件高：标题栏折行时，第一行的中线也不动。 */}
    {titled && <figcaption id={titleId} className="flex min-h-(--qy-control-sm) min-w-0 grow items-center text-heading wrap-anywhere">{label}</figcaption>}
    {legend}{toggle}
  </div>;
}

/** 图例：一行色块与名称，浓墨小字。 */
export const legendClassName = "m-0 flex min-w-0 list-none flex-wrap gap-x-(--qy-field-group-gap) gap-y-(--qy-field-gap) p-0 text-support text-muted-foreground";

/** 图只画数据（用户裁决 2026-10-10：功能要纯粹）。没有记录、结果未知或不适用时不渲染图，由调用方在原位放 Empty。 */
export function Chart({ label, framed = true, render, ref, className, style, type, categoryLabel, valueLabel, series, contextLabel, rows, references = [], events = [], valueDomain, valueLabels, total, formatValue, renderPlot, ...native }: ChartProps) {
  if (!isName(label)) throw new Error(`Chart requires a nonempty accessible label; received ${received(label)}.`);
  const titleId = React.useId(); const dataView = useChartData();
  const naming = chartName(native, titleId);
  // 几何从图自己的根节点读：嵌套的主题 / 密度根各自生效；首次渲染与服务端用默认令牌，与读到的相同时不多渲染一轮。
  const root = React.useRef<HTMLElement | null>(null);
  const units = useSystemUnits(root);
  const geometry = React.useMemo(() => chartGeometry(units), [units]);
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  // 占比与环形图例的百分数：与 Proportion 同一写法（最多一位小数）；占比轴的刻度是整数百分比（0 / 25 / 50 / 75 / 100）。
  const percent = React.useMemo(() => new Intl.NumberFormat(code, { style: "percent", maximumFractionDigits: 1 }), [code]);
  const percentTick = React.useMemo(() => new Intl.NumberFormat(code, { style: "percent", maximumFractionDigits: 0 }), [code]);
  let content: React.ReactNode; let legend: React.ReactNode = null;
  if (!type || !CHART_TYPES.has(type)) throw new Error(`Chart requires an explicit type from ${[...CHART_TYPES].join(", ")}; the form is chosen by the task, not left to default.`);
  // 名称与标识：先判类型再去空白（require-name.ts），错误写明是哪一项、缺什么。不是数组的 series / rows 与空数组同样处理——没有可画的东西。
  if (!isName(categoryLabel)) throw new Error(`Chart requires a nonempty categoryLabel naming the category axis; received ${received(categoryLabel)}.`);
  if (!isName(valueLabel)) throw new Error(`Chart requires a nonempty valueLabel naming the shared unit of the values; received ${received(valueLabel)}.`);
  if (isList(series)) requireNamedItems("Chart series", series, "key");
  const contextCount = isList(series) ? series.filter(item => item.context).length : 0;
  const identityCount = (isList(series) ? series.length : 0) - contextCount;
  if (identityCount < 1 || identityCount > MARKERS.length) throw new Error(`Chart requires one to five series, not counting context series, and received ${identityCount}; when there is nothing to plot, render Empty in its place.`);
  if (!isList(rows) || !rows.length) throw new Error(`Chart requires real rows and received ${isList(rows) ? "none" : received(rows)}; when there is nothing to plot, render Empty in its place.`);
  requireNamedItems("Chart rows", rows, "id");
  const share = type === "bar-share" || type === "area-share";
  const stacks = type === "bar-stacked" || type === "area-stacked" || share;
  if (stacks && series.length < 2) throw new RangeError(share ? `Chart type "${type}" divides each row among two or more series; a single series is always 100%.` : `Chart type "${type}" stacks two or more series into a composition; a single series is a plain ${type === "bar-stacked" ? "bar" : "area"}.`);
  if (type === "donut" && rows.length !== 1) throw new RangeError("Chart type \"donut\" shows one whole's composition, not category comparison; it requires exactly one row. Compare many categories' compositions with \"bar-stacked\" instead.");
  if (type === "donut" && (series.length < 2 || series.length > 5)) throw new RangeError("Chart type \"donut\" requires two to five parts for at-a-glance share; more parts or precise comparison should use Proportion or a bar chart.");
  // 背景系列：只有折线（位置编码）能把“其余”画成淡淡的一排线；柱、面积、环形用长度、面积、角度编码，淡了就读不出量。
  if (contextCount) {
    if (type !== "line") throw new RangeError(`Chart series "context" is for type "line" only; "${type}" encodes by length, area or angle, which a faint background series cannot carry honestly.`);
    if (contextCount > CONTEXT_MAX) throw new RangeError(`Chart allows at most ${CONTEXT_MAX} context series; beyond that they blur into one gray mass and a different form should carry the comparison.`);
    if (!isName(contextLabel)) throw new Error(`Chart with context series requires a nonempty contextLabel naming them together (e.g. the other rooms), which the legend shows as one entry; received ${received(contextLabel)}.`);
    if (series.some(item => item.context && item.tone !== undefined)) throw new RangeError("Chart context series cannot declare a tone; background is ink, not a category.");
  }
  // 状态色系列：要么全部非背景系列都声明，要么都不声明——半数有类别色、半数按次序取色，读者无从判断哪一种颜色在说类别；同一类别不重复。
  series.forEach(item => assertTone(item.tone, "Chart series"));
  const tones = series.filter(item => !item.context && item.tone !== undefined).map(item => item.tone!);
  if (tones.length && tones.length !== identityCount) throw new RangeError("Chart series tone must be declared on every non-context series or on none; mixing tone colors with ordered series colors makes the colors ambiguous.");
  if (new Set(tones).size !== tones.length) throw new RangeError("Chart series tones must be distinct; the same category is one color (NG3), so two series cannot share a tone.");
  // 插值：阶梯只有“随次序的量”才有——折线与各种面积；柱是类别各自的值，类别之间没有“保持”可言。
  series.forEach(item => {
    if (item.interpolation === undefined) return;
    if (item.interpolation !== "linear" && item.interpolation !== "step") throw new RangeError("Chart series interpolation must be \"linear\" or \"step\".");
    if (!STEP_TYPES.has(type)) throw new RangeError(`Chart series interpolation is for line, area, area-stacked and area-share only; "${type}" shows each category's own value, and nothing is held between categories.`);
  });
  // 区间：只有折线（位置编码）能把一段区间画成线后的一块带；柱与面积的长度、面积已经在编码量本身。背景系列只是背景，没有自己的区间。
  series.forEach(item => {
    if (item.range === undefined) return;
    if (type !== "line") throw new RangeError(`Chart series range is for type "line" only; "${type}" encodes by length, area or angle, and a band on it would be read as another quantity.`);
    if (item.context) throw new RangeError("Chart context series cannot declare a range; background is a plain faint line.");
    if (!isName(item.range.min) || !isName(item.range.max)) throw new Error(`Chart series "${item.label}" range requires nonempty min and max keys naming the row values of the band's two ends; received ${received(item.range)}.`);
    if (item.range.min === item.range.max) throw new RangeError(`Chart series "${item.label}" range min and max must be different keys; one value is a point, not a band.`);
  });
  // 堆叠与占比的面：各带共用同一条边界，一条阶梯、一条直线叠在一起边界对不上，必须同一种。
  if ((type === "area-stacked" || type === "area-share") && new Set(series.map(item => item.interpolation ?? "linear")).size > 1) throw new RangeError("Chart stacked areas share their boundaries, so every series must use the same interpolation.");
  // 柱上标值：只给单系列的 bar 与 bar-horizontal。
  if (valueLabels !== undefined) {
    if (type !== "bar" && type !== "bar-horizontal") throw new RangeError(`Chart valueLabels is for type "bar" and "bar-horizontal" only; "${type}" has segments or points with no room to label, and an axis already reads them.`);
    if (valueLabels) {
      if (identityCount !== 1) throw new RangeError("Chart valueLabels allows a single series; labels on every bar of side-by-side series crowd into one another.");
      if (rows.length > LABEL_ROWS_MAX) throw new RangeError(`Chart valueLabels allows at most ${LABEL_ROWS_MAX} rows; beyond that a label no longer fits its category and the axis should read the values.`);
    }
  }
  // 参照：名实相符——名称必填，数值有限，带必须有宽度；donut 没有量轴，无处放参照；占比轴上没有数量，参照没有可信的读法。
  if (references.length && type === "donut") throw new RangeError("Chart type \"donut\" has no value axis to hold references.");
  if (references.length && share) throw new RangeError(`Chart type "${type}" has a fixed 0–100% axis; a reference value would have no unambiguous reading on it.`);
  references.forEach((reference, index) => {
    if (!isName(reference?.label)) throw new Error(`Chart references[${index}] requires a nonempty label naming what it marks; received ${received(reference?.label)}.`);
    if (reference.kind === "band" ? !Number.isFinite(reference.from) || !Number.isFinite(reference.to) || !(reference.from < reference.to) : reference.kind !== "line" || !Number.isFinite(reference.value)) throw new RangeError("Chart references need finite values; a band needs from < to.");
  });
  const rowIds = new Set(rows.map(row => row.id));
  if (events.length && type === "donut") throw new RangeError("Chart type \"donut\" has no category axis to hold events.");
  events.forEach((event, index) => {
    if (!isName(event?.label)) throw new Error(`Chart events[${index}] requires a nonempty label naming what happened; received ${received(event?.label)}.`);
    if (!rowIds.has(event.rowId)) throw new RangeError(`Chart event "${event.label}" points at row "${event.rowId}", which does not exist.`);
    assertTone(event.tone, "Chart event");
  });
  // 量轴范围：只有位置编码可以不从零起；柱与面积的长度、面积编码一旦截断，数值比例就是假的。
  if (valueDomain !== undefined) {
    if (type !== "line") throw new RangeError(`Chart valueDomain is for type "line" only: "${type}" encodes by length, area or angle and must start at zero, so a truncated axis would misstate the proportions. Use a line chart for values in a narrow range.`);
    if (valueDomain.length !== 2 || !Number.isFinite(valueDomain[0]) || !Number.isFinite(valueDomain[1]) || !(valueDomain[0] < valueDomain[1])) throw new RangeError("Chart valueDomain must be [min, max] with finite numbers and min < max.");
    const [min, max] = valueDomain;
    const outside = references.some(reference => (reference.kind === "band" ? [reference.from, reference.to] : [reference.value]).some(value => value < min || value > max));
    if (outside) throw new RangeError("Chart references fall outside valueDomain; a clipped reference no longer matches its name.");
  }
  // 单系列且没有别的要说明时不画图例；带区间的线要靠图例键认出“这块淡染属于这条线”，所以带区间时仍画。
  const single = identityCount === 1 && !contextCount && !references.length && !series.some(item => item.range);
  // 次序：身份色与标记形状按非背景系列自己的次序取（背景系列不占名额）；声明了 tone 则取类别色。
  let identity = 0;
  const projected: ChartProjectedSeries[] = series.map((item, index) => {
    const dataKey = `series${index}`;
    const shape = { ...(item.interpolation ? { interpolation: item.interpolation } : {}), ...(item.range && !item.context ? { range: { min: `${dataKey}-min`, max: `${dataKey}-max` } } : {}) };
    if (item.context) return { key: item.key, label: item.label, dataKey, color: CONTEXT_COLOR, marker: MARKERS[0]!, context: true, ...shape };
    const order = identity++;
    return { key: item.key, label: item.label, dataKey, color: item.tone ? toneColor[item.tone] : `var(--qy-chart-${order + 1})`, marker: MARKERS[order]!, context: false, ...(item.tone ? { tone: item.tone } : {}), ...shape };
  });
  let numeric = false;
  const raw: Record<string, number | null>[] = [];
  const data = rows.map(row => {
    const record: Record<string, string | number | null> = { id: row.id, category: row.label };
    const rawRow: Record<string, number | null> = {};
    projected.forEach((item, seriesIndex) => {
      const value = readValue(row, item.key);
      if (type === "donut" && (typeof value !== "number" || value < 0)) throw new RangeError("Chart type \"donut\" requires every part's value to be a known, non-negative number; an unavailable or negative share has no wedge to draw. When the whole is unavailable, render Empty in place of the chart.");
      if (share && typeof value === "number" && value < 0) throw new RangeError(`Chart type "${type}" requires non-negative values: a share is a part of the row's sum, and a negative part has no share of the whole. Use a bar for values that cross zero.`);
      if (typeof value === "number" && valueDomain && (value < valueDomain[0] || value > valueDomain[1])) throw new RangeError(`Chart value ${value} of "${row.label}" falls outside valueDomain [${valueDomain[0]}, ${valueDomain[1]}]; cutting the data off would misstate it.`);
      if (typeof value === "number" && !share) numeric = true;
      rawRow[item.dataKey] = typeof value === "number" ? value : null;
      record[item.dataKey] = rawRow[item.dataKey]!;
      // 区间两端：与线同样必须有值（可显式未知）；两端都已知时下界不得大于上界，否则带是倒的，名实不符。
      const input = series[seriesIndex]?.range;
      if (item.range && input) {
        const low = readValue(row, input.min), high = readValue(row, input.max);
        if (typeof low === "number" && typeof high === "number" && low > high) throw new RangeError(`Chart range of "${item.label}" at "${row.label}" has min ${low} greater than max ${high}.`);
        for (const end of [low, high]) if (typeof end === "number" && valueDomain && (end < valueDomain[0] || end > valueDomain[1])) throw new RangeError(`Chart range value ${end} of "${row.label}" falls outside valueDomain [${valueDomain[0]}, ${valueDomain[1]}]; cutting the data off would misstate it.`);
        record[item.range.min] = typeof low === "number" ? low : null;
        record[item.range.max] = typeof high === "number" ? high : null;
      }
    });
    // 占比：整行的值都已知、和大于 0 才画，各系列除以该行之和；否则整行不画（见 SHARE_TICKS 处的说明）。
    if (share) {
      const parts = projected.map(item => rawRow[item.dataKey]!);
      const complete = parts.every(value => value !== null), sum = complete ? parts.reduce((acc, value) => acc + value, 0) : 0;
      projected.forEach(item => { record[item.dataKey] = complete && sum > 0 ? rawRow[item.dataKey]! / sum : null; });
      if (complete && sum > 0) numeric = true;
    }
    raw.push(rawRow);
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
  // 只取字符串或数字结果：SVG 文字与字符串拼接放不下节点，退回默认数值格式（与 Heatmap 的 plain 同一规则）。
  const plain = (value: number, item: ChartSeries, row: ChartRow) => nodeText(formatValue?.(value, item, row), number.format(value));
  const rowById = new Map(rows.map(row => [row.id, row]));
  const seriesByKey = new Map(series.map(item => [item.key, item]));
  // 合计：各部分加总。含任何一个不可得的值时不合计——已知部分的和不是合计，写成“合计”就名不副实；读数里记 “—”，数据表里写明缺项（messages.chartTotalPartial）。
  // 格式化沿用第一个系列：堆叠的系列共用一个量纲（valueLabel），按量纲写的格式适用；按系列身份区分的格式不在约定之内。
  const rowTotal = (row: ChartRow) => { let sum = 0; for (const item of series) { const value = readValue(row, item.key); if (typeof value !== "number") return null; sum += value; } return Number(sum.toPrecision(12)); };
  const totalOf = (row: ChartRow): React.ReactNode => { const sum = rowTotal(row); return sum === null ? null : formatValue?.(sum, series[0]!, row) ?? number.format(sum); };
  const totalText = stacks ? (rowId: string) => { const row = rowById.get(rowId); return (row ? totalOf(row) : null) ?? "—"; } : undefined;
  const rawText = share ? (rowId: string, key: string) => { const row = rowById.get(rowId), item = seriesByKey.get(key); if (!row || !item) return null; const value = readValue(row, key); return typeof value === "number" ? plain(value, item, row) : null; } : undefined;
  const labelText = valueLabels ? (value: number, rowId: string, key: string) => { const row = rowById.get(rowId), item = seriesByKey.get(key); return row && item ? plain(value, item, row) : number.format(value); } : undefined;
  // 环形图：部分与“其余”（总量大于各部分之和时），图例与图形同源。
  const donutParts: DonutPart[] | undefined = type === "donut" ? (() => {
    const parts = projected.map(item => ({ key: item.key, label: item.label, value: data[0]![item.dataKey] as number, color: item.color }));
    const rest = (total ?? parts.reduce((acc, part) => acc + part.value, 0)) - parts.reduce((acc, part) => acc + part.value, 0);
    return rest > 0 ? [...parts, { key: "__rest", label: messages.proportionRest, value: rest, color: "var(--qy-groove-surface)" }] : parts;
  })() : undefined;
  const projection: ChartPlotData = { type, data, series: projected, categoryLabel, valueLabel, ...(type === "donut" && total !== undefined ? { total } : {}), ...(references.length ? { references } : {}), ...(events.length ? { events } : {}), ...(valueDomain ? { valueDomain } : {}), ...(share ? { raw } : {}), ...(valueLabels ? { valueLabels: true } : {}) };
  const isDonut = type === "donut";
  // 图例：身份系列各一项；背景系列合成一项（淡墨线键 + contextLabel）；参照各一项（墨的键 + 名称）。
  const identitySeries = projected.filter(item => !item.context); const contextSeries = projected.find(item => item.context);
  legend = !single && <ul data-slot="chart-legend" className={legendClassName}>
    {identitySeries.map(item => <li key={item.key} className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere"><LegendKey series={item} type={type} /><span>{item.label}</span></li>)}
    {contextSeries && <li data-slot="chart-legend-context" className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere"><LegendKey series={contextSeries} type={type} /><span>{contextLabel}</span></li>}
    {references.map((reference, index) => <li key={`ref${index}`} data-slot="chart-legend-reference" className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere"><ReferenceKey reference={reference} /><span>{reference.label}</span></li>)}
  </ul>;
  /*
   * 环形图的图例带数值与占比，写法与 Proportion 的图例一致（名称、“值（占比）”，值用浓墨）。三列：键、名称、读数。
   * 读数一列右对齐并用等宽数字：这一列是用来比大小的，数位对齐才比得出（基础层 §19「数字列右对齐」；与本组件数据表的数值列同一规则）。
   * 键与名称之间是组内间隔，名称与读数之间是组间间隔，两者不同，所以读数列自带前导留白而不共用列间距。
   * 占比的分母是整体（total 或各部分之和）；整体为 0 时没有占比可言，只给值。“其余”取 messages.proportionRest，与 Proportion 同名。
   */
  const donutLegend = donutParts && (() => {
    const whole = donutParts.reduce((acc, part) => acc + part.value, 0);
    return <ul data-slot="chart-legend" className="m-0 grid w-fit min-w-0 max-w-full list-none grid-cols-[auto_minmax(0,1fr)_auto] gap-x-(--qy-field-gap) gap-y-(--qy-field-gap) p-0 text-support">
      {donutParts.map(part => {
        const item = seriesByKey.get(part.key);
        const text = item ? plain(part.value, item, rows[0]!) : nodeText(series[0] && formatValue?.(part.value, series[0], rows[0]!), number.format(part.value));
        return <li key={part.key} className="col-span-3 grid grid-cols-subgrid items-center">
          <span data-slot="legend-key" aria-hidden="true" className="size-(--qy-status-dot-size) shrink-0 rounded-(--qy-swatch-radius)" style={{ background: part.color }} />
          <span className="min-w-0 wrap-anywhere">{part.label}</span>
          <span className="ps-(--qy-field-group-gap) text-end numeric text-muted-foreground">{whole > 0 ? messages.proportionShare(text, percent.format(part.value / whole)) : text}</span>
        </li>;
      })}
    </ul>;
  })();
  const eventsByRow = (rowId: string) => events.filter(event => event.rowId === rowId);
  // 参照的数值与名称：等价数据表之下的表注（参照不是表里的一行一列，却是图上读得出的事实）。
  const referenceText = (reference: ChartReference) => reference.kind === "band" ? `${number.format(reference.from)}–${number.format(reference.to)}` : number.format(reference.value);
  content = <>
    {/* 看得见的只有量的名字（单位）：刻度上的类别（周一…、各来源）已经自说自话，再标「日期」是重复。
        类别轴名留给读屏与数据表的表头。 */}
    {!isDonut && <div data-slot="chart-value-axis" className="min-w-0 text-dense text-muted-foreground wrap-anywhere">{share ? messages.chartShareAxis(valueLabel) : valueLabel}</div>}
    {numeric && <div data-slot="chart-plot" aria-hidden={renderPlot ? undefined : true} style={{ height: "var(--qy-chart-plot-height)" }} className="min-w-0 w-full">{renderPlot ? renderPlot(projection) : <DefaultPlot {...projection} number={number} format={format} percent={percent} percentTick={percentTick} {...(rawText ? { rawText } : {})} {...(totalText ? { totalText } : {})} {...(labelText ? { labelText } : {})} {...(donutParts ? { donutParts } : {})} />}</div>}
    {isDonut && <div className="flex justify-center">{donutLegend}</div>}
    {!isDonut && <div data-slot="chart-category-axis" className="sr-only">{categoryLabel}</div>}
    {dataView.open && <div id={dataView.id} data-slot="chart-data" className="grid min-w-0 gap-(--qy-field-gap)">
      <TableContainer><Table aria-label={label}><TableHeader><TableRow><TableHead>{categoryLabel}</TableHead>{series.map(item => item.range ? [<TableHead key={item.key} numeric>{item.label}</TableHead>, <TableHead key={`${item.key}-min`} numeric>{messages.chartRangeMin(item.label)}</TableHead>, <TableHead key={`${item.key}-max`} numeric>{messages.chartRangeMax(item.label)}</TableHead>] : <TableHead key={item.key} numeric>{item.label}</TableHead>)}{stacks && <TableHead numeric>{messages.chartTotal}</TableHead>}{events.length > 0 && <TableHead>{messages.chartEvent}</TableHead>}</TableRow></TableHeader><TableBody>{rows.map((row, rowIndex) => <TableRow key={row.id}><TableHead scope="row">{row.label}</TableHead>{series.map((item, seriesIndex) => {
        const value = readValue(row, item.key);
        // 占比类：已知值写“原值（占比）”；该行没有算出占比（含不可得的值或和为 0）时只写原值。
        const fraction = share ? data[rowIndex]![projected[seriesIndex]!.dataKey] : null;
        const cell = typeof value !== "number" ? value.label : typeof fraction === "number" ? messages.proportionShare(plain(value, item, row), percent.format(fraction)) : formatValue?.(value, item, row) ?? number.format(value);
        const main = <TableCell key={item.key} numeric className="whitespace-nowrap" data-state={typeof value === "number" ? "known" : value.state}>{cell}</TableCell>;
        if (!item.range) return main;
        // 区间的两端各一列，写法同线上的值：已知写格式化值，不可得写它的名称。
        const ends = [item.range.min, item.range.max].map(end => { const edge = readValue(row, end); return <TableCell key={`${item.key}-${end}`} numeric className="whitespace-nowrap" data-state={typeof edge === "number" ? "known" : edge.state}>{typeof edge === "number" ? formatValue?.(edge, item, row) ?? number.format(edge) : edge.label}</TableCell>; });
        return [main, ...ends];
      })}{stacks && (() => { const sum = totalOf(row); return <TableCell data-slot="chart-total-cell" numeric className="whitespace-nowrap" data-state={sum === null ? "unknown" : "known"}>{sum === null ? messages.chartTotalPartial : sum}</TableCell>; })()}{events.length > 0 && <TableCell data-slot="chart-event-cell" className="whitespace-nowrap">{eventsByRow(row.id).map((event, index) => <span key={index} className="block">{event.label}</span>)}</TableCell>}</TableRow>)}</TableBody></Table></TableContainer>
      {references.length > 0 && <ul data-slot="chart-references" aria-label={messages.chartReferences} className={legendClassName}>{references.map((reference, index) => <li key={index} className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere"><span>{reference.label}</span><span className="numeric">{referenceText(reference)}</span></li>)}</ul>}
    </div>}
  </>;
  return useRender({ defaultTagName: "figure", render, ref: [ref ?? null, root], props: mergeProps(native, {
    "data-slot": "chart", "data-type": type, "data-framed": framed, ...naming.name,
    className: cn(chartBaseClassName, framed && chartPaperClassName, className),
    style: { ...PLOT_PRESETS, ...style }, children: <ChartGeometryContext.Provider value={geometry}>
      {/* 环形图的图例在环下：它是一个整体的几部分，名称挨着环读；标题栏只留图名与「查看数据」。 */}
      <ChartHeader titleId={naming.selfTitled ? titleId : undefined} label={label} legend={type === "donut" ? null : legend} toggle={dataView.toggle} />
      {content}
    </ChartGeometryContext.Provider>,
  }) });
}
