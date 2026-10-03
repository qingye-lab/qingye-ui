# 滑块 Slider

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/slider
Source: packages/ui/src/components/slider.tsx
Source SHA-256: d391e8a36257aeefed300d4fcc33092473aba83c810781808cc103fb259f2550

在明确区间内输入数值或有序范围。

## Decision
Slider 输入真实数值。进度使用 Progress，测量结果使用 Meter；onValueCommitted 只表示当前交互提交。

## Notes
- 必须给 SliderLabel 或每个 Thumb 的名称，多滑块名称需要区分。
- 原语交互按步进吸附；显式无效值会抛 RangeError。
- 4px 轨道厚度和 10rem 纵向长度是集中预设，修改 tokens/components.css 或项目主题；浏览器对比与几何仍需验收。

## Use and ownership
- 有明确有限范围与步进的数值
- 需要拖动调整的数值区间
- Avoid: 精确键入使用 NumberField
- Avoid: 进度或未知任务状态不用 Slider
- Library: 拖动、焦点、键盘、非受控值
- Application: 受控值、区间与步进、invalid、持久化

## Composition
- Label/Value + Control → Track → Indicator/Thumb；FieldDescription/FieldError 继续关联同一输入

## Responsive behavior
- 控制高、滑块尺寸保持五档窄屏增量；触摸与真实拖动未在本子任务浏览器验收

## Customization
- 具名轨道厚度与纵向长度预设，项目可覆写；Thumb 边框聚焦只变色

## Current exports
- Slider: function; owner slider; PASS; props: SliderProps<Value>
- SliderControl: function; owner slider; PASS; props: SliderControlProps
- SliderControlProps: type; owner slider; PASS
- SliderIndicator: function; owner slider; PASS; props: SliderIndicatorProps
- SliderIndicatorProps: type; owner slider; PASS
- SliderLabel: function; owner slider; PASS; props: SliderLabelProps
- SliderLabelProps: type; owner slider; PASS
- SliderPrimitive: reexport; owner slider; UNVERIFIED
- SliderProps: type; owner slider; PASS
- SliderSize: type; owner slider; PASS
- SliderThumb: function; owner slider; PASS; props: SliderThumbProps
- SliderThumbProps: type; owner slider; PASS
- SliderTrack: function; owner slider; PASS; props: SliderTrackProps
- SliderTrackProps: type; owner slider; PASS
- SliderValue: function; owner slider; PASS; props: SliderValueProps
- SliderValueProps: type; owner slider; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Slider
数值与范围状态，公开各部位供组合。
- value / defaultValue: number | readonly number[]. 受控值或非受控初值；未传时从 min 开始。数组每项对应一个带 index 的 Thumb。
- min / max / step / largeStep: number; default 0 / 100 / 1 / 10. 有限 min<max，正步进；min 是步进原点，max 必须落在步进上。越界、非有限或未对齐的显式值抛 RangeError，不静默纠正。
- minStepsBetweenValues / thumbCollisionBehavior: number / "push" | "swap" | "none"; default 0 / "push". 有序范围的最小间距和指针碰撞策略；显式数组必须满足间距。
- onValueChange / onValueCommitted: (value, details) => void. 即时值与本次操作提交；details.reason 对应 keyboard/drag/track-press/input-change，可取消变化。提交不等于持久化成功。
- disabled / readOnly: boolean; default false. 禁用不提交表单；只读保留名称、焦点、值和提交，取消所有原语变化。
- name / form: string. 表单名与外部 form；多个 Thumb 以同名字段重复序列化。
- size / orientation / thumbAlignment: SliderSize / "horizontal" | "vertical" / Base UI alignment; default "md" / "horizontal" / "edge". 五档 control/text-control；edge 让端点位于工作范围内。
- format / locale / render / ref / className / style: Base UI props. 数值格式、语言、根部位和原语状态样式；主题轴独立。

### SliderControl / SliderTrack / SliderIndicator
交互工作区、完整范围与实际输入区间。
- render / ref / className / style: Base UI composition. 各部位透传 ARIA、data 与原生事件；轨道厚度读 slider-track-size，纵向工作长度读 slider-vertical-length。

### SliderThumb
可拖动部位，包含真实 range input。
- index / aria-label / getAriaLabel: number / string / (index) => string. 区间每个 Thumb 指定 index，并给出能区分上下限的名称。
- getAriaValueText / aria-valuetext / inputRef: Base UI props. 默认读屏值是格式化数值，不添加英语上下限文案。可传单位与读屏值；inputRef、onKeyDown/onFocus/onBlur 对应真实 input。
- disabled / render / ref / className / style: Base UI composition. 单项禁用与公开部位组合；readOnly 和 Field invalid 接到真实 input 的 ARIA。

### SliderLabel / SliderValue
关联所有 Thumb 的名称与实际数值 output。Value 的 children 接收 formattedValues/values。

### SliderPrimitive
Base UI Slider 原语命名空间。

## Keyboard
- Tab / Shift+Tab: 依次到达可用滑块。
- 方向键: 按 step 改值；方向与 orientation/RTL 一致。
- Home / End: 到达允许的起止端点。
- PageUp / PageDown / Shift+方向键: 按 largeStep 改值，受区间与相邻值约束。

## Source examples
### 数值与区间
Source: apps/docs/src/content/slider/demos/01-values.tsx
```tsx
import { useState } from "react";
import { FieldGroup } from "@qingye/ui/components/field";
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderLabel, SliderValue } from "@qingye/ui/components/slider";

export const meta = { title: "数值与区间", titleEn: "Value and range" };
export default function Demo() {
  const [value, setValue] = useState(25); const [range, setRange] = useState<readonly number[]>([20, 80]);
  return <FieldGroup className="grid sm:grid-cols-2">
    <Slider name="value" value={value} onValueChange={setValue} min={0} max={100} step={5}><div className="flex items-center justify-between gap-(--qy-field-gap)"><SliderLabel>数值</SliderLabel><SliderValue /></div><SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl></Slider>
    <Slider name="range" value={range} onValueChange={setRange} min={0} max={100} step={5} minStepsBetweenValues={2} thumbCollisionBehavior="none"><div className="flex items-center justify-between gap-(--qy-field-gap)"><SliderLabel>区间</SliderLabel><SliderValue>{formatted => formatted.join(" – ")}</SliderValue></div><SliderControl><SliderTrack><SliderIndicator /><SliderThumb index={0} aria-label="下限" /><SliderThumb index={1} aria-label="上限" /></SliderTrack></SliderControl></Slider>
  </FieldGroup>;
}
```

### 状态与方向
Source: apps/docs/src/content/slider/demos/02-states.tsx
```tsx
import { Field, FieldError, FieldGroup } from "@qingye/ui/components/field";
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderLabel, SliderValue } from "@qingye/ui/components/slider";

export const meta = { title: "状态与方向", titleEn: "States and orientation" };
const control = <SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl>;
export default function Demo() {
  return <FieldGroup className="grid sm:grid-cols-4">
    <Slider readOnly defaultValue={40}><SliderLabel>只读数值</SliderLabel><SliderValue />{control}</Slider>
    <Slider disabled defaultValue={60}><SliderLabel>禁用数值</SliderLabel><SliderValue />{control}</Slider>
    <Field invalid><Slider defaultValue={80}><SliderLabel>受限数值</SliderLabel><SliderValue />{control}</Slider><FieldError>数值应不超过 60</FieldError></Field>
    <Slider orientation="vertical" defaultValue={30}><SliderLabel>纵向数值</SliderLabel><SliderValue />{control}</Slider>
  </FieldGroup>;
}
```

### 尺寸
Source: apps/docs/src/content/slider/demos/03-sizes.tsx
```tsx
import { FieldGroup } from "@qingye/ui/components/field";
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderLabel, SliderValue, type SliderSize } from "@qingye/ui/components/slider";

export const meta = { title: "尺寸", titleEn: "Sizes" };
const sizes: SliderSize[] = ["xs", "sm", "md", "lg", "xl"];
export default function Demo() {
  return <FieldGroup>{sizes.map(size => <Slider key={size} size={size} defaultValue={50}><div className="flex items-center justify-between gap-(--qy-field-gap)"><SliderLabel>{size}</SliderLabel><SliderValue /></div><SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl></Slider>)}</FieldGroup>;
}
```
