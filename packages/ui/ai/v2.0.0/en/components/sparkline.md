# Sparkline

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/sparkline
Source: packages/ui/src/components/sparkline.tsx
Source SHA-256: 6bdcb8341745f74716030677ccef202bdb9017cc6a56aaa264d50382e9a0804e

A small line set in a line of text, showing how a reading has recently changed.

## Decision
One module tall, the line in medium ink and the current point in full ink, without hue. Unknown points break the line rather than becoming zero. The accessible name states the endpoints and the range.

## Use and ownership
- A reading needs a shape showing whether it has recently improved or worsened.
- Avoid: Use Chart to read exact values or compare several series.
- Library: Shape, broken lines at unknown points, and the accessible summary.
- Application: Values, time range, and formatting.

## Composition
- Place beside StatValue, in a table cell, or in text; the caller supplies the name and reading.

## Responsive behavior
- Fixed width that wraps with text.

## Customization
- Colors come from the ink ladder; hue is not configurable.

## Current exports
- Sparkline: function; owner sparkline; PASS; props: SparklineProps
- SparklineProps: type; owner sparkline; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Sparkline
Ordered values and what they measure.
- label: string. What the line measures; part of the accessible name.
- values: readonly (number | null)[]. Ordered values; null is unknown and breaks the line.
- format: (value: number) => string. Formatting for values in the accessible summary.
- width: number; default 100. Plot width in px, five modules by default; the height is always one module.

## Keyboard

## Source examples
### 读数旁的趋势
Source: apps/docs/src/content/sparkline/demos/01-inline.tsx
```tsx
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
export const meta = { title: "读数旁的趋势", titleEn: "Trend beside a reading" };
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) text-body">
    <p className="m-0 flex items-center gap-(--qy-field-gap)">近 12 周同步次数 <Sparkline label="近 12 周同步次数" values={[38, 41, 39, 45, 52, 48, 50, 57, 55, 61, 58, 64]} /> <span className="numeric">64</span></p>
    <p className="m-0 flex items-center gap-(--qy-field-gap)">平均延迟 <Sparkline label="平均延迟" values={[180, 172, null, 160, 151, 149, 140]} format={n => `${n} 毫秒`} /> <span className="numeric">140 毫秒</span></p>
  </div>;
}
```
