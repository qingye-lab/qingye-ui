# 测量 Meter

Package: @qingye_lab/ui@5.6.0
Import: @qingye_lab/ui/components/meter
Source: packages/ui/src/components/meter.tsx
Source SHA-256: 3b1233fa556bb4efd1a827ee8adfc0c4e36155e61816f0c7f378a8b23e793ca9

表达真实范围内的测量值。

## Decision
任务完成比例使用 Progress；未知测量不要填0。读数本身是若干整格时用 segments 分格，读屏读出的仍是读数；对象的有序级别读出的是级别名称，用 SeverityMark。状态类别 tone 由调用方声明，色相之外格数或读数仍承担同一事实。值变化时填充长度过渡到新长度（首次渲染不动；减少动效或键盘操作下立即到位）。

## Use and ownership
- 表达一个有效范围内的测量值及单位，读屏读出读数。
- Avoid: 任务完成比例使用 Progress；未知测量不要填0。
- Avoid: 对象带有一个有次序的级别、读出的是级别名称（如高、中、低）时用 SeverityMark；对象处于哪一种状态用 StatusDot。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- Label 关联名称，Value 展示实际读数，轨与指示不猜测好坏。
- segments 只给本身以整格计的读数分格，getAriaValueText 读出实际读数与单位；一行对象的级别用 SeverityMark。

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
- `segments?`: `number`. 读数本身以整格计（如四格里剩几格）时，轨道按 n 个等宽格分开（n 为 2 以上的整数）。值必须落在格的边界上。 格间空隙是透明的，规则见 utilities.css 的读数轨道分格。
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
- segments: number. 以 n 个整格计的读数：轨道按 n 个等宽格分开，格间留 2px 透明空隙。n 为 2 以上的整数；(value − min) 必须是 (max − min)/n 的整数倍，否则抛 RangeError。实际读数与单位用 getAriaValueText 给出。
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

### 以整格计的读数
Source: apps/docs/src/content/meter/demos/02-levels.tsx
```tsx
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye_lab/ui/components/meter";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "以整格计的读数", titleEn: "Readings in whole cells" } satisfies DemoMeta;
const rows = [
  { name: "一号蚕室桑叶余量", value: 3 },
  { name: "二号蚕室桑叶余量", value: 1 },
  { name: "三号蚕室桑叶余量", value: 0 },
];
const reading = (value: number) => `${value} / 4 筐`;
export default function Demo() {
  return <Stack gap="fields" className="w-full max-w-xs">{rows.map(row => <Meter key={row.name} value={row.value} min={0} max={4} segments={4} getAriaValueText={(_, value) => reading(value)}>
    <Inline gap="actions"><MeterLabel>{row.name}</MeterLabel><MeterValue className="ms-auto">{(_, value) => reading(value)}</MeterValue></Inline>
    <MeterTrack><MeterIndicator /></MeterTrack>
  </Meter>)}</Stack>;
}
```
