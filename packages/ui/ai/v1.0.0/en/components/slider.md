# Slider

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/slider
Source: packages/ui/src/components/slider.tsx
Source SHA-256: d391e8a36257aeefed300d4fcc33092473aba83c810781808cc103fb259f2550

Enter a number or an ordered range within explicit bounds.

## Decision
Slider inputs actual numeric values. Use Progress for progress and Meter for measurements; onValueCommitted indicates only the current interaction's commit.

## Notes
- Provide SliderLabel or a name for each Thumb; multiple-thumb names must differ.
- Primitive interaction snaps to steps; explicit invalid values throw RangeError.
- 4px track thickness and 10rem vertical length are central presets, adjustable in tokens/components.css or project themes. Actual browser contrast/geometry still require acceptance.

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
Value and range state with public parts for composition.
- value / defaultValue: number | readonly number[]. Controlled or uncontrolled initial value; omission starts at min. Each array entry corresponds to an indexed Thumb.
- min / max / step / largeStep: number; default 0 / 100 / 1 / 10. Finite min<max and positive steps; min is the origin and max must align. Explicit out-of-range, nonfinite, or misaligned values throw RangeError without silent correction.
- minStepsBetweenValues / thumbCollisionBehavior: number / "push" | "swap" | "none"; default 0 / "push". Minimum separation and pointer collision strategy for an ordered range; explicit arrays must satisfy spacing.
- onValueChange / onValueCommitted: (value, details) => void. Immediate changes and the current interaction's commit. details.reason identifies keyboard/drag/track-press/input-change; changes are cancelable. Commit does not establish successful persistence.
- disabled / readOnly: boolean; default false. Disabled excludes form submission. Read-only retains names, focus, values, and submission while canceling primitive changes.
- name / form: string. Form name and external form; multiple Thumbs serialize repeated fields under the same name.
- size / orientation / thumbAlignment: SliderSize / "horizontal" | "vertical" / Base UI alignment; default "md" / "horizontal" / "edge". Five matching control/text-control profiles; edge keeps endpoints within the workspace.
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
