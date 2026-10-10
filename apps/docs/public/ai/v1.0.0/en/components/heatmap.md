# Heatmap

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/heatmap
Source: packages/ui/src/components/heatmap.tsx
Source SHA-256: ae4809ea85c1b1d0c6081f65e6ef79d1ffc66b4f93ece3a98d5a240d125e3d87

A quantity over two categorical dimensions, such as sync activity by weekday and hour; a single-hue sequential scale (the first series color, light to full), focusable cells and an on-demand data table.

## Decision
Rows and columns are both categorical axes, not data series — there is no identity to distinguish, only magnitude, so it uses one hue: data is color, the first series color (huaqing) mixed with paper from 12% to full. Unknown/not-applicable cells carry a diagonal ink hatch instead of a scale step, so they are never mistaken for a small real value.

## Notes
- Every cell is focusable; its aria-label states the row, column and value or unavailable reason directly, reachable without hovering.
- Hover/focus readouts only enhance; they never replace the focusable cell's own name or the data table.
- Adjacent cells carry the same 2px surface-color gap as bars and stacked bars.
- Fewer than two rows or columns throws: that is a Chart bar, not a grid.

## Use and ownership
- A quantity formed by two categorical dimensions needs an at-a-glance heat pattern, e.g. sync counts by hour across a week.
- Avoid: Only one categorical dimension (use Chart bar); reading every exact value rather than spotting hot spots (use a data table or Chart).
- Library: Grid coloring, focusable naming, the visible equivalent table and basic validation.
- Application: Data, units and truth.

## Composition
- A hand-built CSS grid with the current Table; reuses Chart's readValue contract. With nothing to plot, the caller renders Empty in place of the heatmap.

## Responsive behavior
- The grid shrinks with available width and scrolls horizontally when it would overflow; the table scrolls and wraps natively.

## Customization
- The first series color's sequential scale; no separate heatmap palette.

## Current exports
- Heatmap: function; owner heatmap; PASS; props: HeatmapProps
- HeatmapCellValue: type; owner heatmap; PASS
- HeatmapColumn: type; owner heatmap; PASS
- HeatmapProps: type; owner heatmap; PASS
- HeatmapRow: type; owner heatmap; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: recharts
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Heatmap
A named figure, two named categorical axes, a single-hue sequential grid and a visible same-source Table.
- label: string. A nonempty semantic name for the actual data.
- rowLabel / columnLabel / valueLabel: string. Names for the row dimension, column dimension and the measured quantity, e.g. "hour", "weekday", "syncs".
- columns: readonly { key: string; label: string }[]. The column dimension's values, two or more — unlike a data series, there is no identity-color cap.
- rows: readonly ChartRow[]. The row dimension's values, two or more; every row must supply a finite number or {state, label} for every column key.
- formatValue: (value, row, column) => ReactNode. Format known values; defaults to Intl number formatting for UILocale.

## Keyboard

## Source examples
### 每周时段的同步热度
Source: apps/docs/src/content/heatmap/demos/01-sync-heatmap.tsx
```tsx
import { Heatmap } from "@qingye_lab/ui/components/heatmap";
export const meta = { title: "每周时段的同步热度", titleEn: "Sync activity by weekday and hour" };
const days = [
  { key: "mon", label: "周一" }, { key: "tue", label: "周二" }, { key: "wed", label: "周三" },
  { key: "thu", label: "周四" }, { key: "fri", label: "周五" }, { key: "sat", label: "周六" }, { key: "sun", label: "周日" },
];
const hours = ["00 时", "06 时", "12 时", "18 时"];
const counts: Record<string, number[]> = {
  mon: [2, 18, 42, 30], tue: [1, 20, 46, 28], wed: [3, 16, 38, 25],
  thu: [2, 22, 50, 33], fri: [4, 19, 44, 29], sat: [0, 6, 14, 10], sun: [0, 4, 9, 7],
};
export default function Demo() {
  return <Heatmap className="w-full max-w-2xl" label="每周时段的同步次数" rowLabel="时段" columnLabel="星期" valueLabel="同步次数"
    columns={days}
    rows={hours.map((hour, index) => ({ id: hour, label: hour, values: Object.fromEntries(days.map(day => [day.key, counts[day.key]![index]!])) }))} />;
}
```

### 含未统计格
Source: apps/docs/src/content/heatmap/demos/02-unknown.tsx
```tsx
import { Heatmap } from "@qingye_lab/ui/components/heatmap";
export const meta = { title: "含未统计格", titleEn: "With an unavailable cell" };
const days = [{ key: "mon", label: "周一" }, { key: "tue", label: "周二" }, { key: "wed", label: "周三" }];
export default function Demo() {
  return <Heatmap className="w-full max-w-md" label="近三日的同步次数" rowLabel="时段" columnLabel="星期" valueLabel="同步次数"
    columns={days}
    rows={[
      { id: "am", label: "上午", values: { mon: 12, tue: 9, wed: { state: "unknown", label: "采集中断" } } },
      { id: "pm", label: "下午", values: { mon: 30, tue: 18, wed: 6 } },
    ]} />;
}
```
