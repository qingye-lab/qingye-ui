# Heatmap

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/heatmap
Source: packages/ui/src/components/heatmap.tsx
Source SHA-256: 5391179dc66b84007b34083c21d0987deff96fd286fed3d8c0216f3cf54a6801

A quantity over two categorical dimensions, such as sync activity by weekday and hour; a single-hue sequential scale (the first series color, light to full) or application-declared levels, readable cell by cell from the keyboard, with an on-demand data table.

## Decision
Rows and columns are both categorical axes, not data series — there is no identity to distinguish, only magnitude, so it uses one hue: data is color, the first series color (huaqing) mixed with paper from 12% to full. Unknown/not-applicable cells carry a diagonal ink hatch instead of a scale step, so they are never mistaken for a small real value. With levels, cells take the color of their level: the application declares the levels, depth grows with the level so the order survives without hue, and the level name joins each cell's name and the readout.

## Notes
- The chart is one grid with a single tab stop; every cell is a read-only gridcell whose aria-label states the row, column, value (plus the level name when levels are set) or unavailable reason, reachable without hovering.
- Hover/focus readouts only enhance; they never replace the focusable cell's own name or the data table.
- Adjacent cells carry the same 2px surface-color gap as bars and stacked bars.
- Fewer than two rows or columns throws: that is a Chart bar, not a grid.
- Level boundaries and what counts as bad are declared by the application; the component neither guesses from values nor computes the row summary.

## Use and ownership
- A quantity formed by two categorical dimensions needs an at-a-glance heat pattern, e.g. sync counts by hour across a week.
- Avoid: Only one categorical dimension (use Chart bar); reading every exact value rather than spotting hot spots (use a data table or Chart).
- Library: Grid coloring, keyboard movement with a single tab stop, focusable naming, the visible equivalent table and basic validation.
- Application: Data, units and truth; level boundaries and what counts as bad; the content of the row summary and any extra facts in the readout.

## Composition
- A hand-built CSS grid with the current Table; reuses Chart's readValue contract. With nothing to plot, the caller renders Empty in place of the heatmap.

## Responsive behavior
- The grid shrinks with available width and scrolls horizontally when it would overflow; the table scrolls and wraps natively.

## Customization
- The first series color's sequential scale or application-declared levels; no separate heatmap palette.

## Current exports
- Heatmap: function; owner heatmap; PASS; props: HeatmapProps
- HeatmapCellValue: type; owner heatmap; PASS
- HeatmapColumn: type; owner heatmap; PASS
- HeatmapLevel: type; owner heatmap; PASS
- HeatmapProps: type; owner heatmap; PASS
- HeatmapReadoutCell: type; owner heatmap; PASS
- HeatmapRow: type; owner heatmap; PASS
- HeatmapRowSummary: type; owner heatmap; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Heatmap
- `columnLabel`: `string`. 列维度叫什么，例如「时段」。
- `columns`: `readonly HeatmapColumn[]`.
- `formatValue?`: `(value: number, row: HeatmapRow, column: HeatmapColumn) => React.ReactNode`. 可以返回节点；可访问名称只取字符串或数字的结果，其余退回默认的数值格式。
- `framed?`: `boolean`. false：图放在已有的面上（无边框的 Section、Card、面板），不再铺自己的纸——没有线、底、圆角与内缘。是否显示图内标题与它无关，只看有没有外部名称。
- `label`: `string`. 图的名字。默认显示为图内的标题（figcaption）并命名这个 figure。调用方传入 aria-labelledby 或 aria-label 时， figure 由那个外部名称命名，图内不再显示标题（同一个名字不说两遍，NG1）；label 仍必填，它是等价数据表的名字。
- `levels?`: `readonly HeatmapLevel[]`. 分档，2 到 5 档，浓淡随档次递增；给出后格子按所在的档上色，图例列出各档。
- `renderReadout?`: `(cell: HeatmapReadoutCell) => React.ReactNode`. 替换悬停/聚焦读数里值的那一行。读数只是增强，名称与数据表仍是完整信息。
- `rowLabel`: `string`. 行维度叫什么，例如「星期」。
- `rows`: `readonly HeatmapRow[]`.
- `rowSummary?`: `HeatmapRowSummary`. 行尾多出一列文字（等宽数字、右对齐），同时是等价数据表的最后一列。
- `valueLabel`: `string`. 量的名字，例如「同步次数」。
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: recharts
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context ChartGeometryContext: without a provider default-value

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Heatmap
A named figure, two named categorical axes, a single-hue sequential grid and a visible same-source Table.
- label: string. A nonempty semantic name for the actual data.
- framed: boolean; default true. false: the chart sits on an existing surface (a borderless Section, Card or panel) and lays no paper of its own — no line, fill, radius or inner padding, so its edges are the host's content edges. Same meaning as TableContainer's framed. Whether the in-chart title shows is independent of it.
- aria-labelledby / aria-label: string. Outside name: a nonempty aria-labelledby (such as a SectionTitle id) or aria-label names the figure and the in-chart title is not drawn; the legend and Show data stay inside the figure at the row end, and with neither the header row is not rendered. Without one the in-chart title names it. label stays required and names the equivalent data table.
- rowLabel / columnLabel / valueLabel: string. Names for the row dimension, column dimension and the measured quantity, e.g. "hour", "weekday", "syncs".
- columns: readonly { key: string; label: string }[]. The column dimension's values, two or more — unlike a data series, there is no identity-color cap.
- rows: readonly ChartRow[]. The row dimension's values, two or more; every row must supply a finite number or {state, label} for every column key.
- formatValue: (value, row, column) => ReactNode. Format known values; defaults to Intl number formatting for UILocale. May return a node for the readout and data table; a cell's accessible name uses only a string or number result and otherwise falls back to the default format.
- levels: readonly { label: string; from?: number; tone?: Tone }[]. Two to five levels. The first omits from (it covers smaller values); each later from is strictly increasing; names are nonempty and distinct, otherwise it throws. Cells take the color of their level and the legend lists each level as a swatch and a name. A level without tone uses ink, a level with tone uses that category color, and depth grows with the level. Unknown cells belong to no level.
- rowSummary: { label: string; value: (row) => string }. Adds a trailing text column (tabular numerals, end-aligned) headed by label, also the last column of the equivalent data table. It summarizes the row; the application supplies it and the component computes nothing.
- renderReadout: (cell: { row; column; value; level? }) => ReactNode. Replaces the value line of the hover and focus readout; by default it shows the value, followed by the level name when levels are set. The readout only enhances; cell names and the data table stay the complete information.

## Keyboard
- Arrow keys: Move focus between cells, including the row-summary cell; left and right swap in right-to-left writing.
- Home / End: Go to the first / last cell of the row.
- Ctrl + Home / Ctrl + End: Go to the first / last cell of the grid.
- Tab: The grid is one tab stop; returning to it lands on the cell last focused.
- Esc: Dismiss the readout; focus stays.

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

### 分档、行尾汇总与读数
Source: apps/docs/src/content/heatmap/demos/03-levels.tsx
```tsx
import { Heatmap, type HeatmapLevel } from "@qingye_lab/ui/components/heatmap";
export const meta = { title: "分档、行尾汇总与读数", titleEn: "Levels, row summary and readout" };
const hours = ["08 时", "10 时", "12 时", "14 时", "16 时", "18 时"];
const temperature: Record<string, number[]> = {
  "1 号室": [24.2, 25.1, 26.4, 27.2, 26.0, 24.8],
  "2 号室": [24.6, 25.8, 27.3, 28.4, 27.1, 25.2],
  "3 号室": [25.0, 26.3, 27.9, 28.6, 28.2, 26.1],
  "4 号室": [25.4, 27.0, 29.0, 30.6, 30.1, 27.4],
  "5 号室": [24.0, 24.9, 25.7, 26.8, 26.2, 24.5],
};
const levels: readonly HeatmapLevel[] = [
  { label: "适宜" },
  { label: "偏暖", from: 26 },
  { label: "偏高", from: 28, tone: "warning" },
  { label: "过高", from: 30, tone: "danger" },
];
const humidity = (celsius: number) => Math.round(92 - (celsius - 24) * 3.2);
const mean = (values: number[]) => values.reduce((sum, value) => sum + value, 0) / values.length;
export default function Demo() {
  return <Heatmap className="w-full max-w-2xl" label="蚕室温度" rowLabel="蚕室" columnLabel="时刻" valueLabel="温度（℃）"
    columns={hours.map(hour => ({ key: hour, label: hour }))}
    rows={Object.entries(temperature).map(([room, values]) => ({ id: room, label: room, values: Object.fromEntries(hours.map((hour, index) => [hour, values[index]!])) }))}
    formatValue={(value) => value.toFixed(1)}
    levels={levels}
    rowSummary={{ label: "日均", value: (row) => mean(temperature[row.id]!).toFixed(1) }}
    renderReadout={({ value, level }) => typeof value === "number"
      ? <div className="grid gap-(--qy-space-1)"><div className="flex items-baseline gap-(--qy-field-gap)"><span className="text-body-strong numeric">{value.toFixed(1)} ℃</span>{level && <span className="text-muted-foreground">{level.label}</span>}</div><div className="text-muted-foreground numeric">湿度 {humidity(value)}%</div></div>
      : <div>{value.label}</div>} />;
}
```

### 放在区块里
Source: apps/docs/src/content/heatmap/demos/04-in-section.tsx
```tsx
import { Heatmap } from "@qingye_lab/ui/components/heatmap";
import { Section, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "放在区块里", titleEn: "Inside a section" } satisfies DemoMeta;

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
  return <Section className="w-full max-w-2xl">
    <SectionHeader><SectionTitle level={4} id="heatmap-section-sync">同步热度</SectionTitle></SectionHeader>
    <Heatmap framed={false} aria-labelledby="heatmap-section-sync" label="每周时段的同步次数" rowLabel="时段" columnLabel="星期" valueLabel="同步次数"
      columns={days}
      rows={hours.map((hour, index) => ({ id: hour, label: hour, values: Object.fromEntries(days.map(day => [day.key, counts[day.key]![index]!])) }))} />
  </Section>;
}
```
