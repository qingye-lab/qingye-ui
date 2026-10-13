# ScatterChart

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/scatter-chart
Source: packages/ui/src/components/scatter-chart.tsx
Source SHA-256: 21d3648a2701ede7c48c181a2c7525f3c3eaf1131008e09ae2dba12e80e2fd26

The relationship between two numeric quantities; an all-pairs form with one to three series, a same-source scatter plot, named axes and an on-demand data table.

## Decision
Both x and y are value axes by the task's own definition, not a violation of "always one value axis" — that ban targets stacking two different-unit Y-axes on one shared category axis, which fabricates correlation. As an all-pairs form it accepts at most three series; more should fold into "Other" or split into separate charts.

## Notes
- More than three series throws: as an all-pairs form any two points may sit adjacent, so its color-vision check is stricter than an adjacent check; fold extra series into "Other" or split into small multiples.
- Each point's hit area is at least 24px, larger than its visible 8px marker; the pointer need not land dead-center.
- The x and y domains pad slightly around the actual data range rather than forcing a zero baseline — a scatter point does not grow from a baseline like a bar.
- Hover readouts only enhance; they never replace the on-demand equivalent data table.

## Use and ownership
- Checking whether two numeric quantities are related, e.g. record count and failure rate.
- Avoid: A single number to show (use Stat); a single trend over time (use Chart line/area); comparison between categories (use Chart bar).
- Library: Same-source projection, visible equivalent table, marker shapes and basic naming.
- Application: Data, units, truth and state content.

## Composition
- Public Recharts primitives with the current Table; reuses Chart's Marker shapes and hover shell. With no point to plot, the caller renders Empty in place of the chart.

## Responsive behavior
- The centralized plot-height preset can be overridden; the table scrolls and wraps natively.

## Customization
- chart1..3 semantic colors; no separate scatter palette.

## Current exports
- ScatterChart: function; owner scatter-chart; PASS; props: ScatterChartProps
- ScatterChartProps: type; owner scatter-chart; PASS
- ScatterPoint: type; owner scatter-chart; PASS
- ScatterSeriesInput: type; owner scatter-chart; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ScatterChart
- `formatX?`: `(value: number) => React.ReactNode`.
- `formatY?`: `(value: number) => React.ReactNode`.
- `label`: `string`.
- `series`: `readonly ScatterSeriesInput[]`. 1 至 3 个系列：两个量的关系是全比较形式（任意两点都可能相邻），色觉校验按全比较口径最多 3 色。
- `style?`: `ChartStyle`.
- `xLabel`: `string`. 横轴量的是什么，例如「记录数」。
- `yLabel`: `string`. 纵轴量的是什么，例如「失败率」。
- plus 279 inherited (@types/react 278, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: recharts
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ScatterChart
A named figure, named x/y axes, series-colored markers and a visible same-source Table.
- label: string. A nonempty semantic name for the actual data.
- xLabel / yLabel: string. What the x and y axes measure, e.g. "records" and "failure rate".
- series: readonly { key: string; label: string; points: readonly { id: string; label: string; x: number; y: number }[] }[]. One to three series. A single series takes the first color without a legend; two or more take the chart1..3 order with distinct marker shapes. Every point needs a stable id and a nonempty name.
- formatX / formatY: (value: number) => ReactNode. Format known values; defaults to Intl number formatting for UILocale.

## Keyboard

## Source examples
### 记录数与失败率的关系
Source: apps/docs/src/content/scatter-chart/demos/01-relationship.tsx
```tsx
import { ScatterChart } from "@qingye_lab/ui/components/scatter-chart";
export const meta = { title: "记录数与失败率的关系", titleEn: "Records vs. failure rate" };
const collections = [
  { id: "devices", label: "接入设备", records: 1284, rate: 0.012 },
  { id: "roles", label: "权限与角色", records: 42, rate: 0.04 },
  { id: "regions", label: "区域与节点", records: 28, rate: 0.07 },
  { id: "webhooks", label: "回调地址", records: 6, rate: 0.18 },
  { id: "groups", label: "成员分组", records: 17, rate: 0.09 },
  { id: "tokens", label: "访问令牌", records: 3, rate: 0.21 },
  { id: "templates", label: "通知模板", records: 11, rate: 0.03 },
] as const;
export default function Demo() {
  return <ScatterChart className="w-full max-w-2xl" label="各集合记录数与失败率" xLabel="记录数" yLabel="失败率"
    series={[{ key: "all", label: "全部集合", points: collections.map(c => ({ id: c.id, label: c.label, x: c.records, y: c.rate })) }]}
    formatY={(value) => `${(value * 100).toFixed(1)}%`} />;
}
```

### 两个来源的记录数与失败率
Source: apps/docs/src/content/scatter-chart/demos/02-two-series.tsx
```tsx
import { ScatterChart } from "@qingye_lab/ui/components/scatter-chart";
export const meta = { title: "两个来源的记录数与失败率", titleEn: "Two sources, records vs. failure rate" };
export default function Demo() {
  return <ScatterChart className="w-full max-w-2xl" label="设备与审计来源的记录数与失败率" xLabel="记录数" yLabel="失败率"
    series={[
      { key: "device", label: "设备来源", points: [{ id: "d1", label: "接入设备", x: 1284, y: 0.012 }, { id: "d2", label: "回调地址", x: 6, y: 0.18 }, { id: "d3", label: "访问令牌", x: 3, y: 0.21 }] },
      { key: "audit", label: "审计来源", points: [{ id: "a1", label: "操作记录", x: 90512, y: 0.002 }, { id: "a2", label: "通知模板", x: 11, y: 0.03 }, { id: "a3", label: "成员分组", x: 17, y: 0.09 }] },
    ]}
    formatY={(value) => `${(value * 100).toFixed(1)}%`} />;
}
```
