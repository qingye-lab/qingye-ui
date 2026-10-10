# 两量关系 ScatterChart

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/scatter-chart
Source: packages/ui/src/components/scatter-chart.tsx
Source SHA-256: 21d3648a2701ede7c48c181a2c7525f3c3eaf1131008e09ae2dba12e80e2fd26

两个数值量之间的关系；全比较形式，1 至 3 个系列，同源的散点图、命名的双轴与按需展开的数据表。

## Decision
x、y 都是数值轴——这是散点的任务定义，不是违反「永远一个数值轴」；该禁令禁止的是同一类别轴上叠两条不同量纲的 Y 轴制造虚假相关。全比较形式最多 3 个系列，超过应合并为「其他」或拆成多图。

## Notes
- 超过 3 个系列会抛出错误：全比较形式任意两点都可能相邻，色觉校验比相邻校验更严，更多系列应合并为「其他」或改用小图版面拆分。
- 点的命中区≥24px，大于 8px 的可见标记，指针不必正中标记。
- x、y 轴域按实际数据范围加少量留白，不强制从零起——散点不是从基线生长的柱。
- 悬停读数只增强，不替代按需展开的等价数据表。

## Use and ownership
- 需要看两个数值量之间是否存在关系，例如记录数与失败率。
- Avoid: 只有一个数值要展示（用 Stat）；随时间的单一趋势（用 Chart line/area）；类别之间的比较（用 Chart bar）。
- Library: 同源投影、可见等价表、标记形态与基础名称。
- Application: 数据、量纲、真实性与状态文字。

## Composition
- Recharts 公开原语 + 当前 Table；复用 Chart 的 Marker 标记与悬停外壳。没有可画的点时，调用方在原位改放 Empty。

## Responsive behavior
- 图高集中预设可覆写，表格原生滚动/换行。

## Customization
- chart1..3 语义色；不另造散点调色板。

## Current exports
- ScatterChart: function; owner scatter-chart; PASS; props: ScatterChartProps
- ScatterChartProps: type; owner scatter-chart; PASS
- ScatterPoint: type; owner scatter-chart; PASS
- ScatterSeriesInput: type; owner scatter-chart; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: recharts
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ScatterChart
figure 名称、命名的双轴、按系列着色的标记与同源可见 Table。
- label: string. 非空真实语义名称。
- xLabel / yLabel: string. 横轴与纵轴量的是什么，例如「记录数」「失败率」。
- series: readonly { key: string; label: string; points: readonly { id: string; label: string; x: number; y: number }[] }[]. 1 至 3 个系列。只有一个系列时取第一色、不显示图例；两个以上按 chart1..3 取色并配不同标记形状。每个点需要稳定 id 与非空名称。
- formatX / formatY: (value: number) => ReactNode. 格式化已知数值；默认按 UILocale 数值 Intl。

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
