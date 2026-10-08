# Chart

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/chart
Source: packages/ui/src/components/chart.tsx
Source SHA-256: 81a078d00a598526e2bbcb5996702a0d94dc030bfaf7fed0ff06de8af39c901e

Seven task-chosen forms—line, bar, area, area-stacked, bar-horizontal, bar-stacked and donut—with a same-source plot, named axes and an on-demand data table.

## Decision
Known zero, empty data, unknown and not-applicable values remain distinct. Unavailable values form gaps and retain their actual names in the table. Plots do not replace reachable numbers.

## Notes
- null, NaN, Infinity and missing keys cannot stand for zero. Use explicit unknown or not-applicable values.
- When every value is unavailable, no fabricated numeric axis is drawn; names, legend and table remain.
- The default plot supplements the data table, which provides assistive access once expanded; hover readouts enhance but never replace it.
- The visible Table retains full names. Axis collision handling does not mean records are missing.
- The browser owner verifies light/dark contrast: necessary graphics at least 3:1 against the actual background and text at least 4.5:1.
- Past five donut parts, or when precise comparison matters, use Proportion or bar/bar-horizontal instead. The relationship between two quantities is ScatterChart; a quantity over two categorical dimensions is Heatmap — both have a different data shape and are separate components, not a Chart type.

## Use and ownership
- Real values in shared units need graphical comparison with reachable numeric equivalents.
- Avoid: Mixed units, guessed results, connecting unavailable values as a reliable trend, or relying on color alone.
- Avoid: A donut with more than five parts, or where share must be compared precisely rather than glanced at.
- Library: Same-source projection, visible equivalent table, series shapes and basic naming.
- Application: Data, units, truth, state content and custom plotting.

## Composition
- Public Recharts primitives with current Table and Empty; one rows/series projection.

## Responsive behavior
- A centralized 12em plot height can be overridden. The table scrolls and wraps without cutting actual values.

## Customization
- Existing chart1..5 semantic colors, local plot roles and public renderPlot; no separate chart palette.

## Current exports
- AxisTick: function; owner chart; PASS; props: { x?: number; y?: number; textAnchor?: "start" | "middle" | "end"; verticalAnchor?: "start" | "middle" | "end"; payload?: { value: string | number }; formatter?: (value: string | number) => string }
- Chart: function; owner chart; PASS; props: ChartProps
- chartFrameClassName: const; owner chart; UNVERIFIED
- ChartHeader: function; owner chart; PASS; props: { titleId: string; label: React.ReactNode; legend?: React.ReactNode; toggle?: React.ReactNode }
- ChartMarker: type; owner chart; PASS
- ChartPlotData: type; owner chart; PASS
- ChartProjectedSeries: type; owner chart; PASS
- ChartProps: type; owner chart; PASS
- ChartRow: type; owner chart; PASS
- ChartSeries: type; owner chart; PASS
- ChartStyle: type; owner chart; PASS
- ChartType: type; owner chart; PASS
- ChartUnavailableValue: type; owner chart; PASS
- ChartValue: type; owner chart; PASS
- legendClassName: const; owner chart; UNVERIFIED
- LegendKey: function; owner chart; PASS; props: { series: ChartProjectedSeries; type: ChartType }
- MARK: const; owner chart; UNVERIFIED
- Marker: function; owner chart; PASS; props: { color: string; marker: ChartMarker; cx?: number; cy?: number }
- MARKERS: const; owner chart; PASS
- MarkerShape: function; owner chart; PASS; props: { marker: ChartMarker }
- PLOT_PRESETS: const; owner chart; PASS
- ReadoutTooltip: function; owner chart; PASS; props: { active?: boolean; payload?: readonly TooltipEntry[]; label?: string | number; series: readonly ChartProjectedSeries[]; format: (value: number, key: string, category: string) => React.ReactNode }
- readValue: function; owner chart; PASS; props: ChartRow
- SURFACE_GAP: const; owner chart; UNVERIFIED
- useChartData: function; owner chart; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: recharts
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Chart
A named figure, shared axis units, distinct series shapes and a visible same-source Table.
- label: string. A nonempty semantic name for the actual data.
- state: "ready" | "empty" | "unknown" | "not-applicable"; default "ready". The actual chart-wide state. children describe non-data states without invented numbers or axes.
- type: "line" | "bar" | "area" | "area-stacked" | "bar-horizontal" | "bar-stacked" | "donut". The form chosen by the task, not an appearance preference: line for trends over time/order; bar for category comparison; area for a quantity over time (a first-color wash for one series, translucent overlap by default for several); area-stacked for composition over time (opaque light bands with full-color top edges, touching); bar-horizontal for long category names or size-ordered rankings; bar-stacked for composition comparison between categories; donut only for an at-a-glance share of 2–5 parts in a single whole (rows must be exactly one). Required.
- categoryLabel / valueLabel: string. Nonempty category axis name and shared value units; donut draws no axis lines, but both names still label the equivalent table and the center readout.
- series: readonly { key: string; label: string }[]. One to five series in shared units (donut requires two to five). A single series takes the first color (text is ink, data is color) without a legend; two or more take the validated chart1..5 order with distinct marker shapes or legend swatches.
- rows: readonly ChartRow[]. Stable ids, category names and values: finite numbers or explicitly named unknown/not-applicable values. ready requires actual records; donut requires exactly one row, with every part a known non-negative number.
- total: number. Donut only: the whole's total. Defaults to the sum of its parts; a larger value folds the remainder into a neutral "rest" slice (groove-surface, not a sixth hue).
- formatValue: (value, series, row) => ReactNode. Format known values without changing data. Defaults to Intl number formatting for UILocale.
- renderPlot: (projection: ChartPlotData) => ReactNode. Replace the same-source plot. Gaps project to null; the default LineChart neither connects gaps nor animates. Names, legend and visible Table remain. Custom plots own their interaction and ARIA.
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
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "未知与空", titleEn: "Unknown and empty" };
export default function Demo() {
  return <Stack gap="section" className="w-full max-w-2xl">
    <Chart type="line" label="近五天延迟" categoryLabel="日期" valueLabel="毫秒" series={[{ key: "ms", label: "延迟" }]}
      rows={[{ id: "1", label: "10/01", values: { ms: 120 } }, { id: "2", label: "10/02", values: { ms: 140 } }, { id: "3", label: "10/03", values: { ms: { state: "unknown", label: "采集中断" } } }, { id: "4", label: "10/04", values: { ms: 110 } }, { id: "5", label: "10/05", values: { ms: 98 } }]} />
    <Chart label="本月失败原因" state="empty">本月没有失败记录。</Chart>
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
