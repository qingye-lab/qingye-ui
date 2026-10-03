# Badge

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/badge
Source: packages/ui/src/components/badge.tsx
Source SHA-256: 531a868f9e27b52394e0a5bce3089f9a51ef10ae16be266f1701362062c339a5

A short marker.

## Decision
Use StatusDot for actual states; a badge cannot establish success.

## Use and ownership
- Short categories, annotations, or emphasis markers.
- Avoid: Use StatusDot for actual states; a badge cannot establish success.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- className, style, and render belong to the marker; five sizes use matching text profiles.

## Responsive behavior
- Five matching text roles; short markers may wrap without losing content.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- Badge: function; owner badge; PASS; props: BadgeProps
- BadgeProps: type; owner badge; PASS
- BadgeSize: type; owner badge; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Badge
className, style, and render belong to the marker; five sizes use matching text profiles.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "sm". Matching text profiles enclosed with badge padding.
- variant: "neutral" | "emphasis"; default "neutral". Visual emphasis without encoding request state or permissions.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

## Keyboard

## Source examples
### 标记
Source: apps/docs/src/content/badge/demos/01-states.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "标记", titleEn: "Markers" };
export default function Demo() {
  return <Inline>{(["xs","sm","md","lg","xl"] as const).map(size => <Badge key={size} size={size}>{size}</Badge>)}<Badge variant="emphasis">重点</Badge></Inline>;
}
```
