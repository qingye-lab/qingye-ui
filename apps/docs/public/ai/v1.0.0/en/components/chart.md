# Chart

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/chart
Source: packages/ui/src/components/chart.tsx
Source SHA-256: 7b12444947da7cd1c48224581896499c93f59f57bed53eeb7de1ecb3c2226445

Present real data with a same-source plot, axes, legend and visible numeric table.

## Decision
Known zero, empty data, unknown and not-applicable values remain distinct. Unavailable values form gaps and retain their actual names in the table. Plots do not replace reachable numbers.

## Notes
- null, NaN, Infinity and missing keys cannot stand for zero. Use explicit unknown or not-applicable values.
- When every value is unavailable, no fabricated numeric axis is drawn; names, legend and table remain.
- The default plot supplements the visible numeric table, which provides assistive access. Custom renderPlot content is not forced aria-hidden.
- The visible Table retains full names. Axis collision handling does not mean records are missing.
- The browser owner verifies light/dark contrast: necessary graphics at least 3:1 against the actual background and text at least 4.5:1.

## Use and ownership
- Real values in shared units need graphical comparison with reachable numeric equivalents.
- Avoid: Mixed units, guessed results, connecting unavailable values as a reliable trend, or relying on color alone.
- Library: Same-source projection, visible equivalent table, series shapes and basic naming.
- Application: Data, units, truth, state content and custom plotting.

## Composition
- Public Recharts primitives with current Table and Empty; one rows/series projection.

## Responsive behavior
- A centralized 12em plot height can be overridden. The table scrolls and wraps without cutting actual values.

## Customization
- Existing chart1..5 semantic colors, local plot roles and public renderPlot; no separate chart palette.

## Current exports
- Chart: function; owner chart; PASS; props: ChartProps
- ChartMarker: type; owner chart; PASS
- ChartPlotData: type; owner chart; PASS
- ChartProjectedSeries: type; owner chart; PASS
- ChartProps: type; owner chart; PASS
- ChartRow: type; owner chart; PASS
- ChartSeries: type; owner chart; PASS
- ChartStyle: type; owner chart; PASS
- ChartUnavailableValue: type; owner chart; PASS
- ChartValue: type; owner chart; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: recharts
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Chart
A named figure, shared axis units, distinct series shapes and a visible same-source Table.
- label: string. A nonempty semantic name for the actual data.
- state: "ready" | "empty" | "unknown" | "not-applicable"; default "ready". The actual chart-wide state. children describe non-data states without invented numbers or axes.
- categoryLabel / valueLabel: string. Nonempty category axis name and shared value units.
- series: readonly { key: string; label: string }[]. One to five named series with unique keys and shared units, using existing chart1..5 colors and distinct markers/lines.
- rows: readonly ChartRow[]. Stable ids, category names and values: finite numbers or explicitly named unknown/not-applicable values. ready requires actual records.
- formatValue: (value, series, row) => ReactNode. Format known values without changing data. Defaults to Intl number formatting for UILocale.
- renderPlot: (projection: ChartPlotData) => ReactNode. Replace the same-source plot. Gaps project to null; the default LineChart neither connects gaps nor animates. Names, legend and visible Table remain. Custom plots own their interaction and ARIA.
- style / className / render / ref: ChartStyle / useRender composition. Root style overrides local plot-height/stroke-width/marker-size roles. Defaults of 12em/2px/8px are centralized presets consumed by the plot and legend.

## Keyboard

## Source examples
### 数值与显式未知
Source: apps/docs/src/content/chart/demos/01-states.tsx
```tsx
import { useState } from "react";
import { Chart, type ChartSeries } from "@qingye/ui/components/chart";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "数值与显式未知", titleEn: "Values and explicit unknowns" };
const series: readonly ChartSeries[] = Array.from({ length: 5 }, (_, index) => ({ key: `s${index}`, label: `系列 ${index + 1}` }));
export default function ChartDemo() {
  const [values, setValues] = useState(["0", "0", "0", "0", "0"]);
  return <Stack gap="panel" className="w-full max-w-lg"><div className="grid min-w-0 gap-(--qy-field-gap)">{series.map((item, index) => <Stack gap="field" key={item.key}><Label htmlFor={`chart-${item.key}`}>{item.label}</Label><Input id={`chart-${item.key}`} type="number" value={values[index]} onChange={event => { const draft = event.currentTarget.value; setValues(old => old.map((value, at) => at === index ? draft : value)); }} /></Stack>)}</div>
    <Chart label="输入数值" categoryLabel="项" valueLabel="数值" series={series} rows={[
      { id: "input", label: "输入", values: Object.fromEntries(series.map((item, index) => [item.key, values[index]!.trim() && Number.isFinite(Number(values[index])) ? Number(values[index]) : { state: "unknown" as const, label: "数值未完整" }])) },
      { id: "unknown", label: "未知", values: Object.fromEntries(series.map(item => [item.key, { state: "unknown" as const, label: "尚未核实" }])) },
      { id: "na", label: "不适用", values: Object.fromEntries(series.map(item => [item.key, { state: "not-applicable" as const, label: "不适用" }])) },
    ]} />
  </Stack>;
}
```
