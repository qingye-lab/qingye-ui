# Slider

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/slider
Source: packages/ui/src/components/slider.tsx
Source SHA-256: 836d2fa5c3b4ba8449b959f7b5f521c0ecaf427760c3edbd3a1c7309db591de5

Enter a number or an ordered range within explicit bounds.

## Decision
Slider inputs actual numeric values. Use Progress for progress and Meter for measurements; onValueCommitted indicates only the current interaction's commit.

## Notes
- Invalid comes from Field or aria-invalid on a SliderThumb: the filled segment and thumb switch to the danger fill and the value is unchanged. Read-only shows a read-only note below the slider.
- Provide SliderLabel or a name for each Thumb; multiple-thumb names must differ.
- Primitive interaction snaps to steps; explicit invalid values throw RangeError.
- 4px track thickness and 10rem vertical length are central presets, adjustable in tokens/components.css or project themes. Actual browser contrast/geometry still require acceptance.
- When an exact-entry NumberField sits beside a Slider inside a Field, give it a FieldItem and put its name on NumberFieldInput. The Field label names the Slider; two controls cannot share one id.

## Use and ownership
- Numeric values with explicit finite ranges and steps.
- Numeric intervals needing drag adjustment.
- Avoid: Use NumberField for precise typing.
- Avoid: Do not use Slider for progress or unknown task states.
- Library: Dragging, focus, keyboard, and uncontrolled values.
- Application: Controlled values, ranges/steps, invalid facts, and persistence.

## Composition
- Label/Value + Control → Track → Indicator/Thumb; FieldDescription/FieldError continue referring to the same input.

## Responsive behavior
- Control/thumb profiles retain five narrow-screen increments; this subtask did not browser-accept touch or actual dragging.

## Customization
- Named track-thickness/vertical-length presets are project-overridable; Thumb focus changes border color only.

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
Value and range state with public parts for composition.
- value / defaultValue: number | readonly number[]. Controlled or uncontrolled initial value; omission starts at min. Each array entry corresponds to an indexed Thumb.
- min / max / step / largeStep: number; default 0 / 100 / 1 / 10. Finite min<max and positive steps; min is the origin and max must align. Explicit out-of-range, nonfinite, or misaligned values throw RangeError without silent correction.
- minStepsBetweenValues / thumbCollisionBehavior: number / "push" | "swap" | "none"; default 0 / "push". Minimum separation and pointer collision strategy for an ordered range; explicit arrays must satisfy spacing.
- onValueChange / onValueCommitted: (value, details) => void. Immediate changes and the current interaction's commit. details.reason identifies keyboard/drag/track-press/input-change; changes are cancelable. Commit does not establish successful persistence.
- disabled / readOnly: boolean; default false. Disabled excludes form submission. Read-only retains names, focus, values, and submission while canceling primitive changes.
- name / form: string. Form name and external form; multiple Thumbs serialize repeated fields under the same name.
- orientation / thumbAlignment: "horizontal" | "vertical" / Base UI alignment; default "horizontal" / "edge". The working height follows the one fill-control geometry; the thumb follows its label text and is untouched by density. edge keeps endpoints within the workspace.
- format / locale / render / ref / className / style: Base UI props. Number formatting, locale, root composition, and primitive state styles; theme axes remain independent.

### SliderControl / SliderTrack / SliderIndicator
Interactive workspace, complete range, and actual input interval.
- render / ref / className / style: Base UI composition. Parts forward ARIA, data, and native events. Track thickness reads slider-track-size and vertical extent reads slider-vertical-length.

### SliderThumb
Draggable part containing an actual range input.
- index / aria-label / getAriaLabel: number / string / (index) => string. Specify each range Thumb's index and a name distinguishing its lower/upper meaning.
- getAriaValueText / aria-valuetext / inputRef: Base UI props. The default accessible value is a formatted number without added English bound labels. Supply units/value text as needed; inputRef and onKeyDown/onFocus/onBlur target the actual input.
- disabled / render / ref / className / style: Base UI composition. Per-item disabling and public composition; readOnly and Field invalid reach actual input ARIA.

### SliderLabel / SliderValue
Names associated with all Thumbs and actual numeric output. Value children receives formattedValues/values.

### SliderPrimitive
Base UI Slider primitive namespace.

## Keyboard
- Tab / Shift+Tab: Reach available thumbs in sequence.
- Arrow keys: Change by step, respecting orientation/RTL.
- Home / End: Reach permitted starting/ending bounds.
- PageUp / PageDown / Shift+Arrow keys: Change by largeStep within range and neighboring-value constraints.

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
    <FieldGroup className="grid w-full sm:grid-cols-2 items-start gap-(--qy-section-gap)">
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
