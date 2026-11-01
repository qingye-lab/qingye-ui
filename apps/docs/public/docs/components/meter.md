# 测量 Meter

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/meter
Source: packages/ui/src/components/meter.tsx
Source SHA-256: 9579a5e1dcfc8e727b00a72c3e2b16e1be3853063a55fdc4af3cd6a927040c7c

表达真实范围内的测量值。

## Decision
任务完成比例使用 Progress；未知测量不要填0。级别是「几级里的第几级」，用 segments 分格；状态类别 tone 由调用方声明，色相之外格数仍读得出级别。

## Use and ownership
- 表达测量值及单位。
- Avoid: 任务完成比例使用 Progress；未知测量不要填0。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- Label 关联名称，Value 展示实际读数，轨与指示不猜测好坏。
- 密集列表里的级别用 segments={3} 加 tone，不用 StatusDot：状态与程度是两件事。

## Responsive behavior
- 测量名称与格式化读数允许换行；轨厚由独立测量角色控制。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- Meter: function; owner meter; PASS; props: MeterProps
- MeterIndicator: function; owner meter; PASS; props: React.ComponentProps<typeof MeterPrimitive.Indicator>
- MeterLabel: function; owner meter; PASS; props: React.ComponentProps<typeof MeterPrimitive.Label>
- MeterPrimitive: reexport; owner meter; UNVERIFIED
- MeterProps: type; owner meter; PASS
- MeterTrack: function; owner meter; PASS; props: React.ComponentProps<typeof MeterPrimitive.Track>
- MeterValue: function; owner meter; PASS; props: React.ComponentProps<typeof MeterPrimitive.Value>

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Meter
- `segments?`: `number`. 这个量是离散的 n 级时，轨道按 n 个等宽格分开（n 为 2 以上的整数）。值必须落在格的边界上。 格间空隙是透明的，规则见 utilities.css 的读数轨道分格。
- `tone?`: `"info" | "warning" | "danger" | "success"`. 状态类别：由调用方声明，组件不从数值猜好坏（随类赋彩）。不给时指示用主色。
- plus 284 inherited (@types/react 274, @base-ui/react 10); not expanded, see the installed declarations

### MeterIndicator
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### MeterLabel
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### MeterTrack
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### MeterValue
- no props declared by this library
- plus 278 inherited (@types/react 274, @base-ui/react 4); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context MeterToneContext: without a provider nullable; provided by Meter

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Meter
Label 关联名称，Value 展示实际读数，轨与指示不猜测好坏。
- value / min / max: number. 已知有限值及递增范围；越界、非有限或倒置范围抛 RangeError。
- segments: number. 离散的 n 级：轨道按 n 个等宽格分开，格间留 2px 透明空隙。n 为 2 以上的整数；(value − min) 必须是 (max − min)/n 的整数倍，否则抛 RangeError。级别名用 getAriaValueText 给出。
- tone: "danger" | "warning" | "success" | "info". 指示的状态类别，由调用方声明，组件不从数值猜好坏；根上带 data-tone。不给时用主色。非法值抛 RangeError。
- format / locale / getAriaValueText: Base UI Meter props. 真实单位和可访问读数；locale 默认跟随 UILocale。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

### MeterLabel
登记测量对象的可访问名称。

### MeterValue
真实测量读数及调用方格式化内容。

### MeterTrack
测量范围的视觉轨道；消费独立轨厚角色。

### MeterIndicator
由公共 Meter 上下文计算实际测量比例。

### MeterPrimitive
Base UI Meter 公共原语。

## Keyboard

## Source examples
### 测量值
Source: apps/docs/src/content/meter/demos/01-states.tsx
```tsx
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye_lab/ui/components/meter";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "测量值", titleEn: "Measurements" };
export default function Demo() { return <Stack gap="fields" className="w-full max-w-sm">{[0,40,100].map(value => <Meter key={value} value={value}><MeterLabel>测量</MeterLabel><MeterValue /><MeterTrack><MeterIndicator /></MeterTrack></Meter>)}</Stack>; }
```

### 三级的级别
Source: apps/docs/src/content/meter/demos/02-levels.tsx
```tsx
import { Meter, MeterIndicator, MeterTrack } from "@qingye_lab/ui/components/meter";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "三级的级别", titleEn: "Three levels" } satisfies DemoMeta;
const levels = ["低", "中", "高"];
const rows: { name: string; level: 1 | 2 | 3; tone: "danger" | "warning" | "info" }[] = [
  { name: "三号蚕室温度偏离", level: 3, tone: "danger" },
  { name: "一号蚕室湿度偏离", level: 2, tone: "warning" },
  { name: "二号蚕室桑叶余量", level: 1, tone: "info" },
];
export default function Demo() {
  return <ul className="m-0 grid w-full max-w-xs list-none gap-(--qy-field-gap) p-0">{rows.map(row => <li key={row.name} className="flex min-w-0 items-center justify-between gap-(--qy-panel-gap)">
    <span className="min-w-0 text-body wrap-anywhere">{row.name}</span>
    <Meter className="w-16 shrink-0" aria-label={`${row.name}级别`} value={row.level} min={0} max={3} segments={3} tone={row.tone} getAriaValueText={(_, value) => levels[value - 1]!}><MeterTrack><MeterIndicator /></MeterTrack></Meter>
  </li>)}</ul>;
}
```
