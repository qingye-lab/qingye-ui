# Kbd

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/kbd
Source: packages/ui/src/components/kbd.tsx
Source SHA-256: a7fd414dd93120240d7eb2c1508627c3b2130c780ede7f079f4bd4ea04e7ec2f

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Kbd
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Kbd
Compose native kbd content; the application determines platform key mappings.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

## Keyboard

## Source examples
### 键位
Source: apps/docs/src/content/kbd/demos/01-states.tsx
```tsx
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "键位", titleEn: "Keys" };
export default function Demo() { return <Inline><Kbd>Ctrl</Kbd><Kbd>K</Kbd><Kbd><span aria-hidden="true">⌘</span><span className="sr-only">Command</span></Kbd><Kbd>Enter</Kbd></Inline>; }
```
