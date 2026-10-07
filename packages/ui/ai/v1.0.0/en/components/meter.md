# Meter

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/meter
Source: packages/ui/src/components/meter.tsx
Source SHA-256: de0a572e25222332f6ee27c73e0a933fb66a5344d9c63f541af9882849be3383

A real measurement over a valid range.

## Decision
Use Progress for task completion. Unknown measurements must not become zero.

## Use and ownership
- Present measured values and units.
- Avoid: Use Progress for task completion. Unknown measurements must not become zero.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Label associates the name, Value presents the actual reading, and track/indicator infer no judgment.

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Meter
Label associates the name, Value presents the actual reading, and track/indicator infer no judgment.
- value / min / max: number. A known finite value in an increasing range; out-of-range, nonfinite, or reversed inputs throw RangeError.
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
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye/ui/components/meter";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "测量值", titleEn: "Measurements" };
export default function Demo() { return <Stack gap="fields" className="w-full max-w-sm">{[0,40,100].map(value => <Meter key={value} value={value}><MeterLabel>测量</MeterLabel><MeterValue /><MeterTrack><MeterIndicator /></MeterTrack></Meter>)}</Stack>; }
```
