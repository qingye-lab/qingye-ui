# Meter

Package: @qingye_lab/ui@5.6.0
Import: @qingye_lab/ui/components/meter
Source: packages/ui/src/components/meter.tsx
Source SHA-256: 3b1233fa556bb4efd1a827ee8adfc0c4e36155e61816f0c7f378a8b23e793ca9

A real measurement over a valid range.

## Decision
Use Progress for task completion. Unknown measurements must not become zero. When the reading itself counts whole cells, use segments and the screen reader still reads the reading; an ordered level of an object reads as the level's name, so use SeverityMark. tone is declared by the caller, and the cell count or reading still carries the fact without hue. When the value changes the fill travels to its new length (nothing animates on first render; with reduced motion or keyboard input it lands at once).

## Use and ownership
- Present a measurement over a valid range, with its unit; screen readers read the reading.
- Avoid: Use Progress for task completion. Unknown measurements must not become zero.
- Avoid: Use SeverityMark when an object has an ordered level read as its name (such as high, medium, low); use StatusDot for which state an object is in.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Label associates the name, Value presents the actual reading, and track/indicator infer no judgment.
- segments only splits a reading that itself counts whole cells; getAriaValueText reads the actual reading and unit. A row's level uses SeverityMark.

## Responsive behavior
- Measurement names and formatted readings wrap; an independent measurement role controls track thickness.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

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
Label associates the name, Value presents the actual reading, and track/indicator infer no judgment.
- value / min / max: number. A known finite value in an increasing range; out-of-range, nonfinite, or reversed inputs throw RangeError.
- segments: number. A reading counted in n whole cells: the track splits into n equal cells with a 2px transparent gap. n is an integer of 2 or more; (value − min) must be a whole multiple of (max − min)/n, otherwise RangeError is thrown. Give the actual reading and unit with getAriaValueText.
- tone: "danger" | "warning" | "success" | "info". The indicator's status category, declared by the caller; the component does not guess good or bad from the value. The root carries data-tone. Omitted, the primary color is used. An invalid value throws RangeError.
- format / locale / getAriaValueText: Base UI Meter props. Actual units and accessible readings; locale defaults to UILocale.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

### MeterLabel
Registers the measured object's accessible name.

### MeterValue
Actual measurement and caller-formatted content.

### MeterTrack
A visual measurement range using an independent track-thickness role.

### MeterIndicator
Computes the actual measurement ratio from public Meter context.

### MeterPrimitive
Public Base UI Meter primitive.

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
