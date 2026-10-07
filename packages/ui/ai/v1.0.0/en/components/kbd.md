# Kbd

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/kbd
Source: packages/ui/src/components/kbd.tsx
Source SHA-256: 9bd05176bc2643148c87c549a69cddb63fb6ffe48a2a15f4f1e00567f4491703

A native keyboard key display.

## Decision
Kbd neither registers keyboard listeners nor provides a clickable entry.

## Use and ownership
- Describe actually available keys.
- Avoid: Kbd neither registers keyboard listeners nor provides a clickable entry.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Compose native kbd content; the application determines platform keys.

## Responsive behavior
- Display actual keys natively; long key names may wrap without establishing click or touch entries.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- Kbd: function; owner kbd; PASS; props: KbdProps
- KbdProps: type; owner kbd; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Kbd
Compose native kbd content; the application determines platform key mappings.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

## Keyboard

## Source examples
### 键位
Source: apps/docs/src/content/kbd/demos/01-states.tsx
```tsx
import { Kbd } from "@qingye/ui/components/kbd";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "键位", titleEn: "Keys" };
export default function Demo() { return <Inline><Kbd>Ctrl</Kbd><Kbd>K</Kbd><Kbd aria-label="Command">⌘</Kbd><Kbd>Enter</Kbd></Inline>; }
```
