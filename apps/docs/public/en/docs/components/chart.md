# Chart

Package: @qingye_lab/ui@4.1.0
Import: @qingye_lab/ui/components/chart
Source: packages/ui/src/components/chart.tsx
Source SHA-256: 64c72499d5d4d77213cd679fbe2520d47cfae210c81ed255dd9227afc5c4a2c9

Nine task-chosen forms—line, bar, area, area-stacked, area-share, bar-horizontal, bar-stacked, bar-share and donut—with a same-source plot, named axes and an on-demand data table.

## Decision
A chart only draws data. A known zero, an unknown value and a not-applicable value remain distinct: unavailable values form gaps and retain their actual names in the table. When the whole chart has no records, an unknown result or does not apply, the chart is not rendered and the caller puts Empty in its place. Plots do not replace reachable numbers. References (target bands and lines), context series and events help locate the data without being data: they are ink, not color, and their names are required and appear in the legend and the data table. Only a line may leave zero on the value axis; bars and areas encode by length or area, so truncating them misstates proportions. Status colors (series[].tone) are declared by the application; the component never guesses good from bad by value. A step (series[].interpolation: "step") says the value is held between two changes and is step-after: a record means "from this moment the value is this", and step-before would draw the change before it was observed; there are no smooth curves, which draw values the data does not contain. Share composition (bar-share / area-share) reads how a composition changes rather than how much: each row is normalised to its own sum, the value axis is fixed at 0–100% with ticks 0/25/50/75/100; a row with an unknown or not-applicable value, or a sum of zero, is not drawn at all (the whole is unavailable, so every share would be false) while its known original values stay in the data table; negative values throw. Value labels (valueLabels) are for single-series bar and bar-horizontal only, and once values are labelled the value-axis ticks and grid are no longer drawn (one fact is not said twice). Readouts and tables of stacked and share forms give a total; a row with a missing part is not totaled and the table says so.

## Notes
- null, NaN, Infinity and missing keys cannot stand for zero. Use explicit unknown or not-applicable values.
- When every value is unavailable, no fabricated numeric axis is drawn; names, legend and table remain.
- The default plot supplements the data table, which provides assistive access once expanded; hover readouts enhance but never replace it.
- The visible Table retains full names. Axis collision handling does not mean records are missing.
- The browser owner verifies light/dark contrast: necessary graphics at least 3:1 against the actual background and text at least 4.5:1.
- When neighboring points on a line are closer than two marker widths (16px), only the last known point of each series keeps its marker, with its shape unchanged; with enough room every point is drawn.
- A status color (tone) must be backed by a name, position or value that carries the same fact: in the light theme danger and warning have similar lightness and are hard to tell apart under red-green color deficiency when adjacent, so the 2px paper gap between stacked segments, the legend order, and the names in the readout and data table are the fallback.
- Readouts of stacked and share forms end with a Total, and so does the data table; a row with an unknown or not-applicable value is not totaled (the sum of the known parts is not a total): the readout shows an em dash and the table says a part is missing.
- Each donut legend entry gives name, value and share (including the remainder when the total exceeds the sum of the parts); the value column is right-aligned with tabular figures and written as in the Proportion legend.
- Past five donut parts, or when precise comparison matters, use Proportion or bar/bar-horizontal instead. The relationship between two quantities is ScatterChart; a quantity over two categorical dimensions is Heatmap — both have a different data shape and are separate components, not a Chart type.

## Use and ownership
- Real values in shared units need graphical comparison with reachable numeric equivalents.
- Readers need to know whether a value is in range: use references for a target band or line rather than making them read it off the grid.
- One quantity is read against its peers: make the other series context series so only the one in question takes a color.
- A change has a known cause: mark it with events on the category axis; the name enters the readout and the data table.
- A line reads change inside a narrow interval (a ratio from 80% to 100%): use valueDomain; bars and areas cannot.
- The series are themselves status categories (succeeded, retrying, failed): use tone, declared by the application, never guessed from the value.
- A value is held between two changes (a setpoint, a threshold, stock): use interpolation: "step" instead of a straight line that invents values in between.
- How a composition changes matters more than how much: bar-share (across categories) or area-share (over time), with original value and share together in the readout and table.
- Few bars whose exact values must be read: use valueLabels to put the numbers on the bars and drop the ticks and grid.
- Switching the time range or metric: no prop for it — keep the range in application state, pick it with SegmentedControl, and let Chart only receive different rows.
- Avoid: Mixed units, guessed results, connecting unavailable values as a reliable trend, or relying on color alone.
- Avoid: A donut with more than five parts, or where share must be compared precisely rather than glanced at.
- Avoid: Truncating the value axis of bars or areas (valueDomain throws for them).
- Avoid: Using a reference, context line or event dot as the only carrier of data: they are ink and background, and the numbers are in the data table.
- Avoid: Mixing tone with ordered-color series, or two series of the same category.
- Avoid: Smooth curves between points (not offered: a curve draws values the data does not contain); reading absolute amounts off a share chart; labelling stacked segments or side-by-side bars (too narrow, labels crowd together; valueLabels does not accept them).
- Library: Same-source projection, visible equivalent table, series shapes and basic naming.
- Application: Data, units, truth, state content and custom plotting.

## Composition
- Public Recharts primitives with the current Table; one rows/series projection. With nothing to plot, the caller renders Empty in place of the chart.

## Responsive behavior
- A centralized 12em plot height can be overridden. The table scrolls and wraps without cutting actual values.

## Customization
- Existing chart1..5 semantic colors, local plot roles and public renderPlot; no separate chart palette. Series colors follow the fixed order, which is the color-vision-safe mechanism and is not freely configurable; status colors are only danger / warning / success / info.

## Current exports
- AxisTick: function; owner chart; PASS; props: { x?: number; y?: number; textAnchor?: "start" | "middle" | "end"; verticalAnchor?: "start" | "middle" | "end"; payload?: { value: string | number }; formatter?: (value: string | number) => string }
- Chart: function; owner chart; PASS; props: ChartProps
- chartBaseClassName: const; owner chart; UNVERIFIED
- ChartEvent: type; owner chart; PASS
- ChartFigureProps: type; owner chart; PASS
- chartFrameClassName: const; owner chart; UNVERIFIED
- ChartGeometry: reexport; owner chart; UNVERIFIED
- ChartHeader: function; owner chart; PASS; props: { titleId?: string | undefined; label?: React.ReactNode; legend?: React.ReactNode; toggle?: React.ReactNode }
- ChartInterpolation: type; owner chart; PASS
- ChartMarker: type; owner chart; PASS
- chartName: function; owner chart; PASS; props: { "aria-labelledby"?: string | undefined; "aria-label"?: string | undefined }
- chartPaperClassName: const; owner chart; UNVERIFIED
- ChartPlotData: type; owner chart; PASS
- ChartProjectedSeries: type; owner chart; PASS
- ChartProps: type; owner chart; PASS
- ChartReference: type; owner chart; PASS
- ChartRow: type; owner chart; PASS
- ChartSeries: type; owner chart; PASS
- ChartSeriesInput: type; owner chart; PASS
- ChartStyle: type; owner chart; PASS
- ChartType: type; owner chart; PASS
- ChartUnavailableValue: type; owner chart; PASS
- ChartValue: type; owner chart; PASS
- legendClassName: const; owner chart; UNVERIFIED
- LegendKey: function; owner chart; PASS; props: { series: ChartProjectedSeries; type: ChartType }
- Marker: function; owner chart; PASS; props: { color: string; marker: ChartMarker; cx?: number; cy?: number }
- MARKERS: const; owner chart; PASS
- MarkerShape: function; owner chart; PASS; props: { marker: ChartMarker }
- PLOT_PRESETS: const; owner chart; PASS
- ReadoutTooltip: function; owner chart; PASS; props: { active?: boolean; payload?: readonly TooltipEntry[]; label?: string | number; series: readonly ChartProjectedSeries[]; format: (value: number, key: string, category: string) => React.ReactNode; band?: ChartBand | undefined; eventsOf?: (rowId: string) => readonly ChartEvent[]; share?: { raw: (rowId: string, key: string) => string | null; percent: Intl.NumberFormat } | undefined; total?: ((rowId: string) => React.ReactNode) | undefined }
- readValue: function; owner chart; PASS; props: ChartRow
- useChartData: function; owner chart; PASS
- useChartGeometry: reexport; owner chart; UNVERIFIED

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### AxisTick
- `formatter?`: `(value: string | number) => string`.
- `payload?`: `{ value: string | number }`.
- `textAnchor?`: `"start" | "end" | "middle"`.
- `verticalAnchor?`: `"start" | "end" | "middle"`.
- `x?`: `number`.
- `y?`: `number`.

### Chart
- `categoryLabel`: `string`.
- `contextLabel?`: `string`. 有背景系列（series[].context）时必填：图例里合成一项的名字，例如「其余蚕室」。
- `events?`: `readonly ChartEvent[]`. 落在类别轴某一行上的事件：基线处一个圆点，名称进悬停读数与数据表的一列。donut 不接受。
- `formatValue?`: `(value: number, series: ChartSeries, row: ChartRow) => React.ReactNode`.
- `framed?`: `boolean`. false：图放在已有的面上（无边框的 Section、Card、面板），不再铺自己的纸——没有线、底、圆角与内缘。是否显示图内标题与它无关，只看有没有外部名称。
- `label`: `string`. 图的名字。默认显示为图内的标题（figcaption）并命名这个 figure。调用方传入 aria-labelledby 或 aria-label 时， figure 由那个外部名称命名，图内不再显示标题（同一个名字不说两遍，NG1）；label 仍必填，它是等价数据表的名字。
- `references?`: `readonly ChartReference[]`. 量轴上的参照：目标带或参照线。画成墨，名称进图例与数据表；量轴范围自动算入。donut 不接受。
- `renderPlot?`: `(projection: ChartPlotData) => React.ReactNode`.
- `rows`: `readonly ChartRow[]`.
- `series`: `readonly ChartSeriesInput[]`.
- `style?`: `ChartStyle`.
- `total?`: `number`. 只用于 donut：整体的总量。省略时等于各部分之和；大于之和时，剩余部分并入「其余」（groove-surface，不是第六种色相）。其他 type 不读取此值。
- `type`: `"area" | "line" | "bar" | "area-stacked" | "bar-horizontal" | "bar-stacked" | "bar-share" | "area-share" | "donut"`.
- `valueDomain?`: `readonly [number, number]`. 量轴范围，只对 line 生效：位置编码可以不从零起，长度与面积编码不行。其他类型传入即抛错。
- `valueLabel`: `string`.
- `valueLabels?`: `boolean`. 把格式化后的值标在柱的数据端，同时不再画量轴刻度与网格。只对 bar、bar-horizontal 生效，且只允许单系列；其他类型传入即抛错。
- plus 279 inherited (@types/react 278, @base-ui/react 1); not expanded, see the installed declarations

### ChartHeader
- `label?`: `React.ReactNode`.
- `legend?`: `React.ReactNode`.
- `titleId?`: `string | undefined`.
- `toggle?`: `React.ReactNode`.

### LegendKey
- `series`: `ChartProjectedSeries`.
- `type`: `"area" | "line" | "bar" | "area-stacked" | "bar-horizontal" | "bar-stacked" | "bar-share" | "area-share" | "donut"`.

### Marker
- `color`: `string`.
- `cx?`: `number`.
- `cy?`: `number`.
- `marker`: `"circle" | "square" | "triangle" | "diamond" | "cross"`.

### MarkerShape
- `marker`: `"circle" | "square" | "triangle" | "diamond" | "cross"`.

### ReadoutTooltip
- `active?`: `boolean`.
- `band?`: `ChartBand | undefined`.
- `eventsOf?`: `(rowId: string) => readonly ChartEvent[]`.
- `format`: `(value: number, key: string, category: string) => React.ReactNode`.
- `label?`: `string | number`.
- `payload?`: `readonly TooltipEntry[]`.
- `series`: `readonly ChartProjectedSeries[]`.
- `share?`: `{ raw: (rowId: string, key: string) => string | null; percent: Intl.NumberFormat } | undefined`.
- `total?`: `((rowId: string) => React.ReactNode) | undefined`.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: recharts
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context ChartGeometryContext: without a provider default-value; provided by Chart

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Chart
A named figure, shared axis units, distinct series shapes and a visible same-source Table.
- label: string. A nonempty semantic name for the actual data.
- framed: boolean; default true. false: the chart sits on an existing surface (a borderless Section, Card or panel) and lays no paper of its own — no line, fill, radius or inner padding, so its edges are the host's content edges. Same meaning as TableContainer's framed. Whether the in-chart title shows is independent of it.
- aria-labelledby / aria-label: string. Outside name: a nonempty aria-labelledby (such as a SectionTitle id) or aria-label names the figure and the in-chart title is not drawn; the legend and Show data stay inside the figure at the row end, and with neither the header row is not rendered. Without one the in-chart title names it. label stays required and names the equivalent data table.
- type: "line" | "bar" | "area" | "area-stacked" | "area-share" | "bar-horizontal" | "bar-stacked" | "bar-share" | "donut". The form chosen by the task, not an appearance preference: line for trends over time/order; bar for category comparison; area for a quantity over time (a first-color wash for one series, translucent overlap by default for several); area-stacked for composition over time (opaque light bands with full-color top edges, touching); bar-horizontal for long category names or size-ordered rankings; bar-stacked for composition comparison between categories; bar-share / area-share for how the share of a composition changes (each row is normalised to its own sum on a fixed 0–100% axis, with original value and share together in the readout and table; two or more series, no negative values; a row with an unknown / not-applicable value or a sum of zero is not drawn while its known original values stay in the data table; references and valueDomain are not accepted); donut only for an at-a-glance share of 2–5 parts in a single whole (rows must be exactly one). Required.
- categoryLabel / valueLabel: string. Nonempty category axis name and shared value units; donut draws no axis lines, but both names still label the equivalent table and the center readout.
- series: readonly { key: string; label: string; context?: boolean; tone?: Tone; interpolation?: "linear" | "step" }[]. One to five series in shared units (donut requires two to five; context series do not count). context: true is for line only: a faint ink hairline with no marker that takes no identity color or marker slot, at most 12; tone takes danger / warning / success / info, declared on every non-context series or none, with no repeated category (mixing or repeating throws). interpolation is linear (default) or step (a staircase, step-after: the value is held from that point to the next) and applies to line, area, area-stacked and area-share only, any other type throws; stacked and share areas share their boundaries, so every series must use the same one. A single series takes the first color (text is ink, data is color) without a legend; two or more take the validated chart1..5 order with distinct marker shapes or legend swatches.
- rows: readonly ChartRow[]. Stable ids, category names and values: finite numbers or explicitly named unknown/not-applicable values. ready requires actual records; donut requires exactly one row, with every part a known non-negative number.
- contextLabel: string. Required when there are context series: the one legend entry that stands for them (a faint ink key plus this name), e.g. "Other rooms". Their individual names appear only in the equivalent table. Throws when missing.
- references: ({ kind: "band"; from: number; to: number; label: string } | { kind: "line"; value: number; label: string })[]. References on the value axis: a target band or a reference line (horizontal for vertical charts, vertical for bar-horizontal). Drawn in ink behind the data; the value axis range includes them automatically. label is required and appears in the legend and in a note under the data table; a band needs from < to and finite values; a donut throws. With a band, the hover readout adds a line per value for its position against the target (above or below by how much, or within); with several bands only the first is used.
- events: readonly { rowId: string; label: string; tone?: Tone }[]. Events on a row of the category axis: a dot on the baseline (category color when tone is given, ink otherwise). The label appears in that row's hover readout and as an "Event" column of the data table. A missing rowId, or a donut, throws.
- valueDomain: readonly [number, number]. Value axis range, for line only: position encoding may leave zero, e.g. a ratio from 80% to 100%. Any other type throws a RangeError (bars and areas encode by length or area and must start at zero). min < max; a known value or reference outside the range throws, since cutting data off misstates it. Ticks are 1, 2, 2.5 or 5 times a power of ten, at most six.
- total: number. Donut only: the whole's total. Defaults to the sum of its parts; a larger value folds the remainder into a neutral "rest" slice (groove-surface, not a sixth hue).
- valueLabels: boolean. Put the formatted value just outside the data end of each bar (above a vertical bar, after the end of a horizontal one, on the other side for negative values); value-axis ticks and grid are then no longer drawn and the baseline stays. Only for bar and bar-horizontal, a single series and at most 12 rows (each category band must hold a label); any other type, several series or more rows throws. Text is ink, dense step, tabular figures; formatValue is read for strings or numbers only and falls back to the default number format when it returns a node.
- formatValue: (value, series, row) => ReactNode. Format known values without changing data. Defaults to Intl number formatting for UILocale. Totals, donut legend values and the remainder call it with the first series (stacked and donut series share one unit); share readouts, value labels and the donut legend read strings or numbers only.
- renderPlot: (projection: ChartPlotData) => ReactNode. Replace the same-source plot. Gaps project to null; the default LineChart neither connects gaps nor animates. Names, legend and visible Table remain. Custom plots own their interaction and ARIA; the projection carries references, events and valueDomain, and series carry context and tone, which a custom plot should honor (no markers on context series, references behind the data).
- style / className / render / ref: ChartStyle / useRender composition. Root style may override --qy-chart-plot-height (default 10 modules). Line width, markers and bar width are fixed by the chart's rules rather than configured individually.

## Keyboard

## Source examples
### 趋势：折线
Source: apps/docs/src/content/chart/demos/01-trend.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "趋势：折线", titleEn: "Trend: line" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const ok = [42, 48, 45, 51, 58, 31, 28];
const failed = [3, 2, 6, 1, 4, 0, 2];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="本周同步次数" categoryLabel="日期" valueLabel="次数"
    series={[{ key: "ok", label: "成功" }, { key: "failed", label: "失败" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { ok: ok[index]!, failed: failed[index]! } }))} />;
}
```

### 比较：柱状，单一系列用墨
Source: apps/docs/src/content/chart/demos/02-compare.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "比较：柱状，单一系列用墨", titleEn: "Comparison: bars, one series in ink" };
const sources = [["接口推送", 1284], ["定时导入", 912], ["数据库连接", 640], ["手动上传", 155]] as const;
export default function Demo() {
  return <Chart type="bar" className="w-full max-w-2xl" label="各来源记录数" categoryLabel="来源" valueLabel="记录数"
    series={[{ key: "count", label: "记录数" }]}
    rows={sources.map(([name, count]) => ({ id: name, label: name, values: { count } }))} />;
}
```

### 未知与空
Source: apps/docs/src/content/chart/demos/03-unknown.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
import { Empty, EmptyDescription, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "未知与空", titleEn: "Unknown and empty" };

const failures: { id: string; label: string; count: number }[] = [];

export default function Demo() {
  return <Stack gap="section" className="w-full max-w-2xl">
    <Chart type="line" label="近五天延迟" categoryLabel="日期" valueLabel="毫秒" series={[{ key: "ms", label: "延迟" }]}
      rows={[{ id: "1", label: "10/01", values: { ms: 120 } }, { id: "2", label: "10/02", values: { ms: 140 } }, { id: "3", label: "10/03", values: { ms: { state: "unknown", label: "采集中断" } } }, { id: "4", label: "10/04", values: { ms: 110 } }, { id: "5", label: "10/05", values: { ms: 98 } }]} />
    {failures.length > 0
      ? <Chart type="bar" label="本月失败原因" categoryLabel="原因" valueLabel="次数" series={[{ key: "count", label: "次数" }]} rows={failures.map(item => ({ id: item.id, label: item.label, values: { count: item.count } }))} />
      : <Empty state="empty"><EmptyTitle level={3}>本月失败原因</EmptyTitle><EmptyDescription>本月没有失败记录。</EmptyDescription></Empty>}
  </Stack>;
}
```

### 随时间的量：面积
Source: apps/docs/src/content/chart/demos/04-area.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "随时间的量：面积", titleEn: "Quantity over time: area" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const records = [812, 940, 1024, 980, 1180, 640, 560];
export default function Demo() {
  return <Chart type="area" className="w-full max-w-2xl" label="本周写入记录数" categoryLabel="日期" valueLabel="记录数"
    series={[{ key: "records", label: "记录数" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { records: records[index]! } }))} />;
}
```

### 随时间的构成：堆叠面积
Source: apps/docs/src/content/chart/demos/05-area-stacked.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "随时间的构成：堆叠面积", titleEn: "Composition over time: stacked area" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const api = [612, 640, 700, 680, 820, 440, 360];
const scheduled = [200, 260, 240, 220, 260, 150, 140];
const manual = [40, 30, 44, 36, 50, 20, 18];
export default function Demo() {
  return <Chart type="area-stacked" className="w-full max-w-2xl" label="本周各来源记录数" categoryLabel="日期" valueLabel="记录数"
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { api: api[index]!, scheduled: scheduled[index]!, manual: manual[index]! } }))} />;
}
```

### 排行：横向柱
Source: apps/docs/src/content/chart/demos/06-bar-horizontal.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "排行：横向柱", titleEn: "Ranking: horizontal bars" };
const sources = [["接入设备", 1284], ["权限与角色", 42], ["同步与导出", 0], ["操作记录", 90512], ["回调地址", 6]] as const;
export default function Demo() {
  return <Chart type="bar-horizontal" className="w-full max-w-2xl" label="各集合记录数" categoryLabel="集合" valueLabel="记录数"
    series={[{ key: "records", label: "记录数" }]}
    rows={[...sources].sort((a, b) => b[1] - a[1]).map(([name, records]) => ({ id: name, label: name, values: { records } }))} />;
}
```

### 构成比较：堆叠柱
Source: apps/docs/src/content/chart/demos/07-bar-stacked.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "构成比较：堆叠柱", titleEn: "Composition comparison: stacked bars" };
const sources = [["接口推送", 412, 9], ["定时导入", 288, 21], ["数据库连接", 197, 4], ["手动上传", 96, 12]] as const;
export default function Demo() {
  return <Chart type="bar-stacked" className="w-full max-w-2xl" label="各来源成功与失败" categoryLabel="来源" valueLabel="次数"
    series={[{ key: "success", label: "成功" }, { key: "failed", label: "失败" }]}
    rows={sources.map(([name, success, failed]) => ({ id: name, label: name, values: { success, failed } }))} />;
}
```

### 一眼占比：环形
Source: apps/docs/src/content/chart/demos/08-donut.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "一眼占比：环形", titleEn: "At-a-glance share: donut" };
export default function Demo() {
  return <Chart type="donut" className="w-full max-w-xs" label="本周记录来源占比" categoryLabel="周" valueLabel="记录数"
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={[{ id: "week", label: "本周", values: { api: 3254, scheduled: 1180, manual: 206 } }]} />;
}
```

### 参照：目标带、背景系列与事件
Source: apps/docs/src/content/chart/demos/09-reference.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "参照：目标带、背景系列与事件", titleEn: "Reference: target band, context series and events" };
const hours = ["08:00", "09:00", "10:00", "11:00", "12:00", "13:00", "14:00", "15:00", "16:00", "17:00", "18:00", "19:00"];
const room3 = [23.1, 23.8, 24.6, 26.4, 27.9, 27.2, 25.8, 24.9, 24.2, 23.6, 23.2, 22.8];
const others = [
  [22.6, 23.0, 23.7, 24.8, 25.9, 26.1, 25.2, 24.5, 24.0, 23.4, 23.0, 22.5],
  [23.4, 24.0, 24.9, 25.6, 26.3, 25.9, 25.1, 24.6, 24.1, 23.7, 23.3, 23.0],
  [22.2, 22.8, 23.5, 24.4, 25.2, 25.4, 24.9, 24.3, 23.8, 23.2, 22.7, 22.3],
  [23.8, 24.5, 25.3, 26.1, 26.6, 26.2, 25.5, 24.8, 24.3, 23.9, 23.5, 23.1],
  [22.9, 23.3, 24.1, 25.0, 25.7, 25.6, 25.0, 24.4, 23.9, 23.4, 23.0, 22.6],
  [23.0, 23.6, 24.3, 25.2, 25.8, 25.5, 24.8, 24.2, 23.8, 23.3, 22.9, 22.4],
];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="3 号蚕室今日温度" categoryLabel="时刻" valueLabel="温度（℃）"
    series={[{ key: "room3", label: "3 号蚕室" }, ...others.map((_, index) => ({ key: `other${index}`, label: `${[1, 2, 4, 5, 6, 7][index]} 号蚕室`, context: true }))]}
    contextLabel="其余蚕室"
    valueDomain={[20, 30]}
    references={[{ kind: "band", from: 22, to: 26, label: "适宜温度" }]}
    events={[{ rowId: "10:00", label: "开窗通风" }, { rowId: "15:00", label: "关窗保温" }]}
    formatValue={value => `${value} ℃`}
    rows={hours.map((hour, index) => ({ id: hour, label: hour, values: { room3: room3[index]!, ...Object.fromEntries(others.map((values, other) => [`other${other}`, values[index]!])) } }))} />;
}
```

### 量轴范围：折线取 80%–100%
Source: apps/docs/src/content/chart/demos/10-value-domain.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "量轴范围：折线取 80%–100%", titleEn: "Value domain: a line from 80% to 100%" };
const uptime = Array.from({ length: 60 }, (_, index) => Number((96.5 + 2 * Math.sin(index / 3) + 1.2 * Math.sin(index / 1.3)).toFixed(1)));
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="近 60 天在线率" categoryLabel="日期" valueLabel="在线率（%）"
    series={[{ key: "uptime", label: "在线率" }]}
    valueDomain={[80, 100]}
    references={[{ kind: "line", value: 95, label: "目标 95%" }]}
    formatValue={value => `${value}%`}
    rows={uptime.map((value, index) => ({ id: `d${index + 1}`, label: `${index + 1} 日`, values: { uptime: value } }))} />;
}
```

### 状态类别：堆叠柱按类别着色
Source: apps/docs/src/content/chart/demos/11-tone.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "状态类别：堆叠柱按类别着色", titleEn: "Status tone: stacked bars colored by category" };
const sources = [["接口推送", 148, 42, 24], ["定时导入", 96, 58, 31], ["数据库连接", 120, 18, 9], ["手动上传", 54, 12, 16]] as const;
export default function Demo() {
  return <Chart type="bar-stacked" className="w-full max-w-2xl" label="各来源本周同步结果" categoryLabel="来源" valueLabel="次数"
    series={[{ key: "success", label: "成功", tone: "success" }, { key: "retry", label: "重试中", tone: "warning" }, { key: "failed", label: "失败", tone: "danger" }]}
    rows={sources.map(([name, success, retry, failed]) => ({ id: name, label: name, values: { success, retry, failed } }))} />;
}
```

### 保持不变：设定值用阶梯
Source: apps/docs/src/content/chart/demos/12-step.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "保持不变：设定值用阶梯", titleEn: "Held between changes: a setpoint as steps" };
const hours = ["06:00", "08:00", "10:00", "12:00", "14:00", "16:00", "18:00", "20:00"];
const target = [23, 23, 25, 26, 26, 25, 24, 23];
const actual = [22.6, 23.1, 24.4, 25.7, 26.2, 25.4, 24.6, 23.5];
export default function Demo() {
  return <Chart type="line" className="w-full max-w-2xl" label="3 号蚕室温度" categoryLabel="时刻" valueLabel="温度（℃）"
    series={[{ key: "target", label: "设定温度", interpolation: "step" }, { key: "actual", label: "实测温度" }]}
    valueDomain={[20, 30]} formatValue={value => `${value} ℃`}
    rows={hours.map((hour, index) => ({ id: hour, label: hour, values: { target: target[index]!, actual: actual[index]! } }))} />;
}
```

### 构成占比：占比柱
Source: apps/docs/src/content/chart/demos/13-share.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "构成占比：占比柱", titleEn: "Composition share: share bars" };
const sources = [["接口推送", 412, 36, 9], ["定时导入", 288, 52, 21], ["数据库连接", 197, 8, 4], ["手动上传", 96, 18, 12]] as const;
export default function Demo() {
  return <Chart type="bar-share" className="w-full max-w-2xl" label="各来源本周同步结果占比" categoryLabel="来源" valueLabel="次数"
    series={[{ key: "success", label: "成功" }, { key: "retry", label: "重试" }, { key: "failed", label: "失败" }]}
    rows={[
      ...sources.map(([name, success, retry, failed]) => ({ id: name, label: name, values: { success, retry, failed } })),
      { id: "文件监听", label: "文件监听", values: { success: 64, retry: { state: "unknown" as const, label: "尚未统计" }, failed: 3 } },
    ]} />;
}
```

### 构成占比随时间：占比面积
Source: apps/docs/src/content/chart/demos/14-share-area.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "构成占比随时间：占比面积", titleEn: "Composition share over time: share area" };
const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const api = [612, 640, 700, 680, 820, 440, 360];
const scheduled = [200, 260, 240, 220, 260, 150, 140];
const manual = [40, 30, 44, 36, 50, 20, 18];
export default function Demo() {
  return <Chart type="area-share" className="w-full max-w-2xl" label="本周各来源记录数占比" categoryLabel="日期" valueLabel="记录数"
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={days.map((day, index) => ({ id: day, label: day, values: { api: api[index]!, scheduled: scheduled[index]!, manual: manual[index]! } }))} />;
}
```

### 读准确值：柱上标值
Source: apps/docs/src/content/chart/demos/15-value-labels.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "读准确值：柱上标值", titleEn: "Reading exact values: labels on bars" };
const sources = [["接口推送", 1284], ["定时导入", 912], ["数据库连接", 640], ["手动上传", 155], ["文件监听", 0]] as const;
export default function Demo() {
  return <Chart type="bar" className="w-full max-w-2xl" label="各来源记录数" categoryLabel="来源" valueLabel="记录数" valueLabels
    series={[{ key: "count", label: "记录数" }]}
    rows={sources.map(([name, count]) => ({ id: name, label: name, values: { count } }))} />;
}
```

### 读准确值：横向柱标值
Source: apps/docs/src/content/chart/demos/16-value-labels-horizontal.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "读准确值：横向柱标值", titleEn: "Reading exact values: labels on horizontal bars" };
const sources = [["接入设备", 1284], ["权限与角色", 42], ["同步与导出", 0], ["操作记录", 90512], ["回调地址", 6]] as const;
export default function Demo() {
  return <Chart type="bar-horizontal" className="w-full max-w-2xl" label="各集合记录数" categoryLabel="集合" valueLabel="记录数" valueLabels
    series={[{ key: "records", label: "记录数" }]}
    rows={[...sources].sort((a, b) => b[1] - a[1]).map(([name, records]) => ({ id: name, label: name, values: { records } }))} />;
}
```

### 一眼占比：环形带其余
Source: apps/docs/src/content/chart/demos/17-donut-total.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
export const meta = { title: "一眼占比：环形带其余", titleEn: "At-a-glance share: donut with a remainder" };
export default function Demo() {
  return <Chart type="donut" className="w-full max-w-xs" label="本周记录来源占比" categoryLabel="周" valueLabel="记录数" total={5000}
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={[{ id: "week", label: "本周", values: { api: 3254, scheduled: 1180, manual: 206 } }]} />;
}
```

### 切换时间范围
Source: apps/docs/src/content/chart/demos/18-range.tsx
```tsx
import { useState } from "react";
import { Chart } from "@qingye_lab/ui/components/chart";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
export const meta = { title: "切换时间范围", titleEn: "Switching the time range" };
const days = Array.from({ length: 30 }, (_, index) => { const date = new Date(2026, 8, 13 + index); return { id: `d${index}`, label: `${date.getMonth() + 1}/${date.getDate()}`, count: 40 + Math.round(12 * Math.sin(index / 2.3)) - (index % 7 < 2 ? 14 : 0) }; });
export default function Demo() {
  const [range, setRange] = useState<"7" | "30">("7");
  const shown = days.slice(-Number(range));
  return <div className="grid w-full max-w-2xl justify-items-start gap-(--qy-field-group-gap)">
    <SegmentedControl aria-label="时间范围" value={range} onValueChange={value => setRange(value as "7" | "30")}>
      <SegmentedControlItem value="7">近 7 日</SegmentedControlItem>
      <SegmentedControlItem value="30">近 30 日</SegmentedControlItem>
    </SegmentedControl>
    <Chart type="line" className="w-full" label="每日同步次数" categoryLabel="日期" valueLabel="次数"
      series={[{ key: "count", label: "同步次数" }]}
      rows={shown.map(day => ({ id: day.id, label: day.label, values: { count: day.count } }))} />
  </div>;
}
```

### 放在区块里
Source: apps/docs/src/content/chart/demos/19-in-section.tsx
```tsx
import { Chart } from "@qingye_lab/ui/components/chart";
import { Section, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "放在区块里", titleEn: "Inside a section" } satisfies DemoMeta;

const days = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];
const ok = [42, 48, 45, 51, 58, 31, 28];
const failed = [3, 2, 6, 1, 4, 0, 2];

export default function Demo() {
  return <Section className="w-full max-w-2xl">
    <SectionHeader><SectionTitle level={4} id="chart-section-sync">本周同步</SectionTitle></SectionHeader>
    <Chart framed={false} aria-labelledby="chart-section-sync" type="line" label="本周同步次数" categoryLabel="日期" valueLabel="次数"
      series={[{ key: "ok", label: "成功" }, { key: "failed", label: "失败" }]}
      rows={days.map((day, index) => ({ id: day, label: day, values: { ok: ok[index]!, failed: failed[index]! } }))} />
  </Section>;
}
```
