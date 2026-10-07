# ScatterChart

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/scatter-chart
Source: packages/ui/src/components/scatter-chart.tsx
Source SHA-256: 71ae28bf00c3217f41070aa87f82556bb109f8a83639e2369adb44d67b2c91ce

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
- Public Recharts primitives with current Table and Empty; reuses Chart's Marker shapes and hover shell.

## Responsive behavior
- The centralized plot-height preset can be overridden; the table scrolls and wraps natively.

## Customization
- chart1..3 semantic colors; no separate scatter palette.

## Current exports
- ScatterChart: function; owner scatter-chart; PASS; props: ScatterChartProps
- ScatterChartProps: type; owner scatter-chart; PASS
- ScatterPoint: type; owner scatter-chart; PASS
- ScatterSeriesInput: type; owner scatter-chart; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: recharts
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ScatterChart
A named figure, named x/y axes, series-colored markers and a visible same-source Table.
- label: string. A nonempty semantic name for the actual data.
- state: "ready" | "empty" | "unknown" | "not-applicable"; default "ready". The actual chart-wide state. children describe non-data states.
- xLabel / yLabel: string. What the x and y axes measure, e.g. "records" and "failure rate".
- series: readonly { key: string; label: string; points: readonly { id: string; label: string; x: number; y: number }[] }[]. One to three series. A single series takes the first color without a legend; two or more take the chart1..3 order with distinct marker shapes. Every point needs a stable id and a nonempty name.
- formatX / formatY: (value: number) => ReactNode. Format known values; defaults to Intl number formatting for UILocale.

## Keyboard

## Source examples
### 记录数与失败率的关系
Source: apps/docs/src/content/scatter-chart/demos/01-relationship.tsx
```tsx
import { ScatterChart } from "@qingye/ui/components/scatter-chart";
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
import { ScatterChart } from "@qingye/ui/components/scatter-chart";
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
