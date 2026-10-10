# 两维度的量 Heatmap

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/heatmap
Source: packages/ui/src/components/heatmap.tsx
Source SHA-256: ae4809ea85c1b1d0c6081f65e6ef79d1ffc66b4f93ece3a98d5a240d125e3d87

两个类别维度上的量，例如「星期 × 时段」的同步热度；单色顺序色阶（第一色由淡到足），可聚焦的格与按需展开的数据表。

## Decision
行列都是类别轴，不是数据系列——没有身份要区分，只有量的大小，因此只用一种色相：数据是色，取第一色（花青）与纸调和的 12% 到足色。未知/不适用格用清墨斜线纹，不进色阶，避免与真实的小量值混淆。

## Notes
- 每个格都可聚焦，aria-label 直接给出行、列与数值或未知原因，不依赖悬停就能读到。
- 悬停/聚焦读数只增强，不替代可聚焦格自身的名称与数据表。
- 相邻格之间 2px 纸色空隙，与柱状、堆叠柱同一机制。
- 少于两行或两列会抛出错误：那是 Chart 的 bar，不是网格。

## Use and ownership
- 两个类别维度组合出的量需要一眼看出热度分布，例如一周内各时段的同步次数。
- Avoid: 只有一个类别维度（用 Chart bar）；需要精确读出每个数值而不是找热点（用数据表或 Chart）。
- Library: 网格着色、可聚焦名称、可见等价表与基础校验。
- Application: 数据、量纲与真实性。

## Composition
- 手写 CSS 网格 + 当前 Table；复用 Chart 的 readValue 取值契约。没有可画的数据时，调用方在原位改放 Empty。

## Responsive behavior
- 网格随可用宽度收缩，超宽时横向滚动；表格原生滚动/换行。

## Customization
- 第一色的顺序色阶；不另造热力图调色板。

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
figure 名称、两个命名的类别轴、单色顺序色阶的网格与同源可见 Table。
- label: string. 非空真实语义名称。
- rowLabel / columnLabel / valueLabel: string. 行维度、列维度与量各自的名字，例如「时段」「星期」「同步次数」。
- columns: readonly { key: string; label: string }[]. 列维度的取值，2 个以上——与数据系列不同，没有身份色上限。
- rows: readonly ChartRow[]. 行维度的取值，2 个以上；每行必须对每个 column.key 给出 finite number 或 {state, label}。
- formatValue: (value, row, column) => ReactNode. 格式化已知数值；默认按 UILocale 数值 Intl。

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
