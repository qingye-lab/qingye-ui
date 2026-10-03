# 真实数值 Chart

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/chart
Source: packages/ui/src/components/chart.tsx
Source SHA-256: 7b12444947da7cd1c48224581896499c93f59f57bed53eeb7de1ecb3c2226445

以同源图形、轴、图例和可见数值表呈现真实数据。

## Decision
已知0、无记录、未知和不适用分别成立；未知值形成gap，表格保留其真实名称。图形不替代可达数值。

## Notes
- null、NaN、Infinity、缺失键不能表示0；用显式unknown或not-applicable表达。
- 所有值均未知时不画虚假数值轴，名称、图例与表格保留。
- 默认图形为数值表的视觉补充，辅助技术使用可见表；自定义renderPlot不被强制aria-hidden。
- 长名称在可见Table保留，图形轴的公共碰撞处理不表示记录丢失。
- 浅深必要图形对真实背景至少3:1、文字至少4.5:1，由浏览器owner核实。

## Use and ownership
- 真实共享量纲数据需要图形比较，且等价值可达。
- Avoid: 混合量纲、猜测结果、把缺值连成可靠趋势或仅靠颜色。
- Library: 同源投影、可见等价表、系列形态和基础名称。
- Application: 数据、量纲、真实性、状态文字与自定义图形。

## Composition
- Recharts公开原语 + 当前Table/Empty；同一rows/series投影。

## Responsive behavior
- 图高集中12em可覆写，表格原生滚动/换行；不裁掉实际值。

## Customization
- chart1..5语义角色；局部plot roles与公开renderPlot，不另造图表调色板。

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
figure名称、共同轴量纲、不同系列形态与同源可见Table。
- label: string. 非空真实语义名称。
- state: "ready" | "empty" | "unknown" | "not-applicable"; default "ready". 真实整图事实；非ready由children表达，不造数字或坐标轴。
- categoryLabel / valueLabel: string. 非空分类轴名与共享量纲/单位。
- series: readonly { key: string; label: string }[]. 1至5个有唯一key与名称的同量纲系列，消费现有chart1..5及可区分marker/line。
- rows: readonly ChartRow[]. 稳定id、分类名称与values；值为finite number或{state:unknown|not-applicable,label}。ready必须有真实记录。
- formatValue: (value, series, row) => ReactNode. 格式化已知数值；默认按UILocale数值Intl，不改数据。
- renderPlot: (projection: ChartPlotData) => ReactNode. 替换同源图形；gap为null，默认LineChart不连接gap且不动画。名称、图例与可见Table始终保留。自定义图形承担自身交互/ARIA。
- style / className / render / ref: ChartStyle / useRender组合. 根style覆写局部plot-height/stroke-width/marker-size角色；默认12em/2px/8px为集中预设，实际图形和图例消费。

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
