# 两维度的量 Heatmap

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/heatmap
Source: packages/ui/src/components/heatmap.tsx
Source SHA-256: 5391179dc66b84007b34083c21d0987deff96fd286fed3d8c0216f3cf54a6801

两个类别维度上的量，例如「星期 × 时段」的同步热度；单色顺序色阶（第一色由淡到足）或应用声明的分档，可用键盘逐格读，另有按需展开的数据表。

## Decision
行列都是类别轴，不是数据系列——没有身份要区分，只有量的大小，因此只用一种色相：数据是色，取第一色（花青）与纸调和的 12% 到足色。未知/不适用格用清墨斜线纹，不进色阶，避免与真实的小量值混淆。给出 levels 时改按档上色：档由应用声明，浓淡随档次递增，去掉色相仍读得出次序；档名进入格子的名称与读数。

## Notes
- 整张图是一个 grid，只有一个 Tab 停靠点；每个格是只读的 gridcell，aria-label 直接给出行、列、数值（有分档时再加档名）或未知原因，不依赖悬停就能读到。
- 悬停/聚焦读数只增强，不替代可聚焦格自身的名称与数据表。
- 相邻格之间 2px 纸色空隙，与柱状、堆叠柱同一机制。
- 少于两行或两列会抛出错误：那是 Chart 的 bar，不是网格。
- 分档的边界与好坏由应用声明；组件不从数值猜，也不计算行尾汇总。

## Use and ownership
- 两个类别维度组合出的量需要一眼看出热度分布，例如一周内各时段的同步次数。
- Avoid: 只有一个类别维度（用 Chart bar）；需要精确读出每个数值而不是找热点（用数据表或 Chart）。
- Library: 网格着色、键盘移动与唯一的 Tab 停靠点、可聚焦名称、可见等价表与基础校验。
- Application: 数据、量纲与真实性；分档的边界与好坏；行尾汇总的内容与读数里的补充事实。

## Composition
- 手写 CSS 网格 + 当前 Table；复用 Chart 的 readValue 取值契约。没有可画的数据时，调用方在原位改放 Empty。

## Responsive behavior
- 网格随可用宽度收缩，超宽时横向滚动；表格原生滚动/换行。

## Customization
- 第一色的顺序色阶或应用声明的分档；不另造热力图调色板。

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
figure 名称、两个命名的类别轴、单色顺序色阶的网格与同源可见 Table。
- label: string. 非空真实语义名称。
- framed: boolean; default true. false：图放在已有的面上（无边框的 Section、Card、面板），不铺自己的纸——没有线、底、圆角与内缘，图的左右缘就是承载面的内容缘。与 TableContainer 的 framed 同义。是否显示图内标题与它无关。
- aria-labelledby / aria-label: string. 外部名称：传入非空的 aria-labelledby（如 SectionTitle 的 id）或 aria-label 时，figure 由它命名，图内不显示标题；图例与「查看数据」仍在图内、靠行尾，二者都没有时标题栏整行不渲染。不传时由图内标题命名。label 仍必填，是等价数据表的名字。
- rowLabel / columnLabel / valueLabel: string. 行维度、列维度与量各自的名字，例如「时段」「星期」「同步次数」。
- columns: readonly { key: string; label: string }[]. 列维度的取值，2 个以上——与数据系列不同，没有身份色上限。
- rows: readonly ChartRow[]. 行维度的取值，2 个以上；每行必须对每个 column.key 给出 finite number 或 {state, label}。
- formatValue: (value, row, column) => ReactNode. 格式化已知数值；默认按 UILocale 数值 Intl。可以返回节点用于读数与数据表；格子的可访问名称只取字符串或数字的结果，其余退回默认格式。
- levels: readonly { label: string; from?: number; tone?: Tone }[]. 分档，2 到 5 档。第一档不写 from（覆盖更小的值），其后每档 from 严格递增；档名非空且互不相同，违反抛错。给出后格子按所在的档上色，图例是各档的色块加档名；没有 tone 的档取墨，有 tone 的档取该类别色，浓淡随档次递增。未知格不属于任何一档。
- rowSummary: { label: string; value: (row) => string }. 行尾多出一列文字（等宽数字、右对齐），列头是 label，同时是等价数据表的最后一列。它是对这一行的汇总，由应用给出，组件不计算。
- renderReadout: (cell: { row; column; value; level? }) => ReactNode. 替换悬停与聚焦读数里值的那一行；不给时显示值，有分档时在值后带档名。读数只是增强，格子的名称与数据表仍是完整信息。

## Keyboard
- ← / → / ↑ / ↓: 在格间移动焦点（含行尾汇总格）；右到左书写方向下左右对调。
- Home / End: 到本行第一格 / 最后一格。
- Ctrl + Home / Ctrl + End: 到整张图的第一格 / 最后一格。
- Tab: 整张图只有一个停靠点；离开后再回来，焦点落在上次所在的格。
- Esc: 收起读数，焦点不动。

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
