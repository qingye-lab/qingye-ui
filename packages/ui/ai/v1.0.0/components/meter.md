# 测量 Meter

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/meter
Source: packages/ui/src/components/meter.tsx
Source SHA-256: de0a572e25222332f6ee27c73e0a933fb66a5344d9c63f541af9882849be3383

表达真实范围内的测量值。

## Decision
任务完成比例使用 Progress；未知测量不要填0。

## Use and ownership
- 表达测量值及单位。
- Avoid: 任务完成比例使用 Progress；未知测量不要填0。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- Label 关联名称，Value 展示实际读数，轨与指示不猜测好坏。

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Meter
Label 关联名称，Value 展示实际读数，轨与指示不猜测好坏。
- value / min / max: number. 已知有限值及递增范围；越界、非有限或倒置范围抛 RangeError。
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
