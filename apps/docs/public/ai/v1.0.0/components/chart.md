# 图表 Chart

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/chart
Source: packages/ui/src/components/chart.tsx
Source SHA-256: 665f8e2dba10328154c68fc5b349ac2846a8675e45a343b66079911f8ddf1474

七种由任务选定的形式——折线、柱状、面积、堆叠面积、横向柱、堆叠柱、环形；同源的图形、命名的轴与按需展开的数据表。

## Decision
已知0、无记录、未知和不适用分别成立；未知值形成gap，表格保留其真实名称。图形不替代可达数值。

## Notes
- null、NaN、Infinity、缺失键不能表示0；用显式unknown或not-applicable表达。
- 所有值均未知时不画虚假数值轴，名称、图例与表格保留。
- 默认图形为数据表的视觉补充，辅助技术使用展开后的数据表；悬停读数只增强，不替代数据表。
- 长名称在可见Table保留，图形轴的公共碰撞处理不表示记录丢失。
- 浅深必要图形对真实背景至少3:1、文字至少4.5:1，由浏览器owner核实。
- donut 超过5个部分或需要精确比较时改用 Proportion 或 bar/bar-horizontal；两个量的关系用 ScatterChart，两个类别维度上的量用 Heatmap——它们数据形状不同，是独立组件而不是 Chart 的 type。

## Use and ownership
- 真实共享量纲数据需要图形比较，且等价值可达。
- Avoid: 混合量纲、猜测结果、把缺值连成可靠趋势或仅靠颜色。
- Avoid: 环形超过5个部分，或占比需要精确比较而不是一眼大小。
- Library: 同源投影、可见等价表、系列形态和基础名称。
- Application: 数据、量纲、真实性、状态文字与自定义图形。

## Composition
- Recharts公开原语 + 当前Table/Empty；同一rows/series投影。

## Responsive behavior
- 图高集中12em可覆写，表格原生滚动/换行；不裁掉实际值。

## Customization
- chart1..5语义角色；局部plot roles与公开renderPlot，不另造图表调色板。

## Current exports
- AxisTick: function; owner chart; PASS; props: { x?: number; y?: number; textAnchor?: "start" | "middle" | "end"; verticalAnchor?: "start" | "middle" | "end"; payload?: { value: string | number }; formatter?: (value: string | number) => string }
- BAR_MAX: const; owner chart; UNVERIFIED
- BAR_RADIUS: const; owner chart; UNVERIFIED
- Chart: function; owner chart; PASS; props: ChartProps
- chartFrameClassName: const; owner chart; UNVERIFIED
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
- LegendKey: function; owner chart; PASS; props: { series: ChartProjectedSeries; type: ChartType }
- MARK: const; owner chart; UNVERIFIED
- Marker: function; owner chart; PASS; props: { color: string; marker: ChartMarker; cx?: number; cy?: number }
- MARKERS: const; owner chart; PASS
- MarkerShape: function; owner chart; PASS; props: { marker: ChartMarker }
- PLOT_PRESETS: const; owner chart; PASS
- ReadoutTooltip: function; owner chart; PASS; props: { active?: boolean; payload?: readonly TooltipEntry[]; label?: string | number; series: readonly ChartProjectedSeries[]; format: (value: number, key: string, category: string) => React.ReactNode }
- readValue: function; owner chart; PASS; props: ChartRow
- STROKE: const; owner chart; UNVERIFIED
- SURFACE_GAP: const; owner chart; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: recharts
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Chart
figure名称、共同轴量纲、不同系列形态与同源可见Table。
- label: string. 非空真实语义名称。
- state: "ready" | "empty" | "unknown" | "not-applicable"; default "ready". 真实整图事实；非ready由children表达，不造数字或坐标轴。
- type: "line" | "bar" | "area" | "area-stacked" | "bar-horizontal" | "bar-stacked" | "donut". 由任务选定的形式，不是外观偏好：line 随时间/次序的趋势；bar 类别间比较；area 随时间的量（单系列第一色淡面，多系列默认半透叠放）；area-stacked 随时间的构成（淡色带加足色上沿，彼此相切）；bar-horizontal 类别名长或按大小排序的排行；bar-stacked 类别间的构成比较；donut 只用于 2–5 个部分、一眼占比的单个整体（rows 必须正好一行）。必填。
- categoryLabel / valueLabel: string. 非空分类轴名与共享量纲/单位；donut 不画轴线，但两个名字仍用于等价数据表与中心读数的说明文字。
- series: readonly { key: string; label: string }[]. 1至5个同量纲系列（donut 要求2至5个）。只有一个系列时取第一色（文字是墨，数据是色）、不显示图例；两个以上按 chart1..5 的校验顺序取色，并配不同标记形状或图例方块。
- rows: readonly ChartRow[]. 稳定id、分类名称与values；值为finite number或{state:unknown|not-applicable,label}。ready必须有真实记录；donut 要求正好一行，且每个部分必须是已知的非负数。
- total: number. 只用于 donut：整体的总量。省略时等于各部分之和；大于之和时，剩余部分并入「其余」（groove-surface，不是第六种色相）。
- formatValue: (value, series, row) => ReactNode. 格式化已知数值；默认按UILocale数值Intl，不改数据。
- renderPlot: (projection: ChartPlotData) => ReactNode. 替换同源图形；gap为null，默认LineChart不连接gap且不动画。名称、图例与可见Table始终保留。自定义图形承担自身交互/ARIA。
- style / className / render / ref: ChartStyle / useRender组合. 根style可覆写 --qy-chart-plot-height（默认 10 材）。线宽、标记与柱宽是图的法度，不开放逐个配置。

## Keyboard

## Source examples
### 趋势：折线
Source: apps/docs/src/content/chart/demos/01-trend.tsx
```tsx
import { Chart } from "@qingye/ui/components/chart";
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
import { Chart } from "@qingye/ui/components/chart";
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
import { Chart } from "@qingye/ui/components/chart";
import { Stack } from "@qingye/ui/components/layout";
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
import { Chart } from "@qingye/ui/components/chart";
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
import { Chart } from "@qingye/ui/components/chart";
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
import { Chart } from "@qingye/ui/components/chart";
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
import { Chart } from "@qingye/ui/components/chart";
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
import { Chart } from "@qingye/ui/components/chart";
export const meta = { title: "一眼占比：环形", titleEn: "At-a-glance share: donut" };
export default function Demo() {
  return <Chart type="donut" className="w-full max-w-xs" label="本周记录来源占比" categoryLabel="周" valueLabel="记录数"
    series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]}
    rows={[{ id: "week", label: "本周", values: { api: 3254, scheduled: 1180, manual: 206 } }]} />;
}
```
