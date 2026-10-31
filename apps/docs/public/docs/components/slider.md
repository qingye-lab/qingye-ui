# 滑块 Slider

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/slider
Source: packages/ui/src/components/slider.tsx
Source SHA-256: 836d2fa5c3b4ba8449b959f7b5f521c0ecaf427760c3edbd3a1c7309db591de5

在明确区间内输入数值或有序范围。

## Decision
Slider 输入真实数值。进度使用 Progress，测量结果使用 Meter；onValueCommitted 只表示当前交互提交。

## Notes
- 无效由 Field 或 SliderThumb 的 aria-invalid 声明：已填充段与抓手改为危险填充色，值不变。只读时在滑块下方给出「只读」说明。
- 必须给 SliderLabel 或每个 Thumb 的名称，多滑块名称需要区分。
- 原语交互按步进吸附；显式无效值会抛 RangeError。
- 4px 轨道厚度和 10rem 纵向长度是集中预设，修改 tokens/components.css 或项目主题；浏览器对比与几何仍需验收。
- Field 内滑块旁放精确输入（NumberField）时，给它一个 FieldItem 并把名称写在 NumberFieldInput 上；Field 的标签名的是滑块，两个控件不能共用一个 id。

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
- 控制高跟随密度轴，抓手跟随标签文字；窄屏增量照旧，触摸与真实拖动未在本子任务浏览器验收

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
- SliderThumb: function; owner slider; PASS; props: SliderThumbProps
- SliderThumbProps: type; owner slider; PASS
- SliderTrack: function; owner slider; PASS; props: SliderTrackProps
- SliderTrackProps: type; owner slider; PASS
- SliderValue: function; owner slider; PASS; props: SliderValueProps
- SliderValueProps: type; owner slider; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Slider
- `readOnly?`: `boolean`. 保留焦点与表单值，取消所有原语值变化。
- plus 295 inherited (@types/react 275, @base-ui/react 20); not expanded, see the installed declarations

### SliderControl
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### SliderIndicator
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### SliderLabel
- no props declared by this library
- plus 277 inherited (@types/react 274, @base-ui/react 3); not expanded, see the installed declarations

### SliderThumb
- no props declared by this library
- plus 283 inherited (@types/react 270, @base-ui/react 13); not expanded, see the installed declarations

### SliderTrack
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### SliderValue
- no props declared by this library
- plus 281 inherited (@types/react 277, @base-ui/react 4); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context ReadOnly: without a provider default-value; provided by Slider

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Slider
数值与范围状态，公开各部位供组合。
- value / defaultValue: number | readonly number[]. 受控值或非受控初值；未传时从 min 开始。数组每项对应一个带 index 的 Thumb。
- min / max / step / largeStep: number; default 0 / 100 / 1 / 10. 有限 min<max，正步进；min 是步进原点，max 必须落在步进上。越界、非有限或未对齐的显式值抛 RangeError，不静默纠正。
- minStepsBetweenValues / thumbCollisionBehavior: number / "push" | "swap" | "none"; default 0 / "push". 有序范围的最小间距和指针碰撞策略；显式数组必须满足间距。
- onValueChange / onValueCommitted: (value, details) => void. 即时值与本次操作提交；details.reason 对应 keyboard/drag/track-press/input-change，可取消变化。提交不等于持久化成功。
- disabled / readOnly: boolean; default false. 禁用不提交表单；只读保留名称、焦点、值和提交，取消所有原语变化。
- name / form: string. 表单名与外部 form；多个 Thumb 以同名字段重复序列化。
- orientation / thumbAlignment: "horizontal" | "vertical" / Base UI alignment; default "horizontal" / "edge". 工作高度跟随填值控件的一套几何；抓手跟随标签文字，密度不改它。edge 让端点位于工作范围内。
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
### 单个数值
Source: apps/docs/src/content/slider/demos/01-values.tsx
```tsx
import { Slider, SliderControl, SliderIndicator, SliderLabel, SliderThumb, SliderTrack, SliderValue } from "@qingye_lab/ui/components/slider";

export const meta = { title: "单个数值", titleEn: "One value" };

export default function Demo() {
  return <Slider defaultValue={60} min={0} max={100} step={5} className="w-full max-w-sm">
    <div className="flex items-center justify-between gap-(--qy-field-gap)">
      <SliderLabel>告警阈值</SliderLabel>
      <SliderValue>{(formatted) => `${formatted}%`}</SliderValue>
    </div>
    <SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl>
  </Slider>;
}
```

### 状态与方向
Source: apps/docs/src/content/slider/demos/02-states.tsx
```tsx
import { Field, FieldError, FieldGroup } from "@qingye_lab/ui/components/field";
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderLabel, SliderValue } from "@qingye_lab/ui/components/slider";

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

### 密度
Source: apps/docs/src/content/slider/demos/03-density.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { Slider, SliderControl, SliderTrack, SliderIndicator, SliderThumb, SliderValue } from "@qingye_lab/ui/components/slider";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "密度", titleEn: "Density" } satisfies DemoMeta;

const control = <SliderControl><SliderTrack><SliderIndicator /><SliderThumb /></SliderTrack></SliderControl>;

// 滑块的工作高度跟随填值控件角色层；抓手跟随标签文字，密度不改它。
export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-section-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Slider defaultValue={50}><div className="flex items-center justify-between gap-(--qy-field-gap)"><SliderValue /></div>{control}</Slider>
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```

### 单位与精确输入
Source: apps/docs/src/content/slider/demos/04-exact.tsx
```tsx
import { useState } from "react";
import { Field, FieldItem, FieldLabel } from "@qingye_lab/ui/components/field";
import { NumberField, NumberFieldGroup, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack, SliderValue } from "@qingye_lab/ui/components/slider";

export const meta = { title: "单位与精确输入", titleEn: "Unit and exact entry" };

export default function Demo() {
  const [threshold, setThreshold] = useState(60);

  return <Field className="w-full max-w-sm">
    {/* SliderValue 读 Slider 根的真实值，因此标签行必须在根之内。 */}
    <Slider name="threshold" value={threshold} onValueChange={setThreshold} min={0} max={100} step={5}>
      <div className="flex items-center justify-between gap-(--qy-field-gap)">
        <FieldLabel>告警阈值</FieldLabel>
        <SliderValue className="text-body-strong">{(formatted) => `${formatted}%`}</SliderValue>
      </div>
      <SliderControl><SliderTrack><SliderIndicator /><SliderThumb aria-label="告警阈值百分比" /></SliderTrack></SliderControl>
    </Slider>
    <div className="flex justify-between text-caption text-muted-foreground"><span>0%（每次同步都告警）</span><span>100%（从不告警）</span></div>
    {/* NumberField 的值可以是 null（空），只在有值时回写给滑块。FieldItem 给第二个控件自己的标签作用域，
     *  否则两个控件共用 Field 的 controlId。 */}
    <FieldItem className="items-center"><NumberField className="w-28" value={threshold} onValueChange={(next) => { if (next !== null) setThreshold(next); }} min={0} max={100} step={5}><NumberFieldGroup><NumberFieldInput aria-label="告警阈值，精确输入" /></NumberFieldGroup></NumberField><span className="text-support text-muted-foreground">%</span></FieldItem>
  </Field>;
}
```

### 有序区间
Source: apps/docs/src/content/slider/demos/05-range.tsx
```tsx
import { useState } from "react";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Slider, SliderControl, SliderIndicator, SliderThumb, SliderTrack, SliderValue } from "@qingye_lab/ui/components/slider";

export const meta = { title: "有序区间", titleEn: "Ordered range" };

export default function Demo() {
  const [range, setRange] = useState<readonly number[]>([20, 80]);

  return <Field className="w-full max-w-sm">
    <Slider name="retention" value={range} onValueChange={setRange} min={0} max={100} step={5} minStepsBetweenValues={2} thumbCollisionBehavior="none">
      <div className="flex items-center justify-between gap-(--qy-field-gap)">
        <FieldLabel>保留区间</FieldLabel>
        <SliderValue className="text-body-strong">{(formatted: readonly string[]) => `${formatted[0]}–${formatted[1]} 天`}</SliderValue>
      </div>
      <SliderControl><SliderTrack><SliderIndicator /><SliderThumb index={0} aria-label="保留天数下限" /><SliderThumb index={1} aria-label="保留天数上限" /></SliderTrack></SliderControl>
    </Slider>
    <div className="flex justify-between text-caption text-muted-foreground"><span>0 天</span><span>100 天</span></div>
  </Field>;
}
```
