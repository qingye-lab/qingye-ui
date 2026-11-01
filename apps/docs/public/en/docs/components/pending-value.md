# PendingValue

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/pending-value
Source: packages/ui/src/components/pending-value.tsx
Source SHA-256: fb8550fe64f13a3f78a7d664a9afebac67328f26c997a51d3a2daebcf48e5f85

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### PendingValue
- `actions?`: `React.ReactNode`.
- `label`: `string`.
- `numeric?`: `boolean`. 原值是数字（金额、数量、计数）时设为 true，用等宽数字对齐；文本、日期等非数字值保持 false。预设 false：等宽数字只对数字成立，不能替每个值声称。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### PendingValue
Put the original value in children and verification/recovery entries in actions; applications supply both.
- label: string. A required nonblank object name.
- children: ReactNode. The original value; zero remains zero and missing never becomes zero.
- numeric: boolean; default false. Set to true when the original value is a number (amount, quantity, count) to align it with tabular figures; leave false for text, dates and other non-numeric values.
- actions: ReactNode. Actual application verification/recovery entries; the component sends no request.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

## Keyboard

## Source examples
### 保留原值
Source: apps/docs/src/content/pending-value/demos/01-states.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { PendingValue } from "@qingye_lab/ui/components/pending-value";
export const meta = { title: "保留原值", titleEn: "Original value retained" };
export default function Demo() { return <PendingValue label="值" numeric actions={<Button variant="bordered">核实</Button>}>{0}</PendingValue>; }
```
