# PendingValue

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/pending-value
Source: packages/ui/src/components/pending-value.tsx
Source SHA-256: d2594e95624d000ff805d6ab74bee01479420f7cbcfa48f75033e0feac7ad458

An unresolved write result with its original value.

## Decision
Unknown is not failure; never retry a dangerous write by default.

## Use and ownership
- A write occurred without a reliable outcome.
- Avoid: Unknown is not failure; never retry a dangerous write by default.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Original value in children and verification/recovery entries in actions; applications supply both.

## Responsive behavior
- Objects, original values, and unknown-result text wrap; actions use existing Group and actual caller entries.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- PendingValue: function; owner pending-value; PASS; props: PendingValueProps
- PendingValueProps: type; owner pending-value; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### PendingValue
Put the original value in children and verification/recovery entries in actions; applications supply both.
- label: string. A required nonblank object name.
- children: ReactNode. The original value; zero remains zero and missing never becomes zero.
- actions: ReactNode. Actual application verification/recovery entries; the component sends no request.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

## Keyboard

## Source examples
### 保留原值
Source: apps/docs/src/content/pending-value/demos/01-states.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { PendingValue } from "@qingye/ui/components/pending-value";
export const meta = { title: "保留原值", titleEn: "Original value retained" };
export default function Demo() { return <PendingValue label="值" actions={<Button variant="bordered">核实</Button>}>{0}</PendingValue>; }
```
