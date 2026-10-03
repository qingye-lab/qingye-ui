# StatusDot

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/status-dot
Source: packages/ui/src/components/status-dot.tsx
Source SHA-256: 590294f7c1634e157f5983792a592ef5adc93c77bc60336e2b45e01fe3b43227

A state graphic and its visible name.

## Decision
Waiting, in-progress, and unknown results remain distinct facts.

## Use and ownership
- Present an object's actual state.
- Avoid: Waiting, in-progress, and unknown results remain distinct facts.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Default names use locale; label may identify a specific object. The glyph is not a standalone Spinner.

## Responsive behavior
- Long status names in either language wrap; independent glyph dimensions do not replace names.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- StatusDot: function; owner status-dot; PASS; props: StatusDotProps
- StatusDotProps: type; owner status-dot; PASS
- StatusDotStatus: type; owner status-dot; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### StatusDot
Default names use locale; label may identify a specific object. The glyph is not a standalone Spinner.
- status: "online" | "offline" | "warning" | "error" | "info" | "neutral" | "pending" | "in-progress" | "unknown". Required actual application state.
- label: string. Replaces the default localized name while still describing the object's state.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

## Keyboard

## Source examples
### 状态
Source: apps/docs/src/content/status-dot/demos/01-states.tsx
```tsx
import { StatusDot } from "@qingye/ui/components/status-dot";
import { Inline } from "@qingye/ui/components/layout";
export const meta = { title: "状态", titleEn: "States" };
export default function Demo() { return <Inline>{(["online","offline","pending","in-progress","unknown","warning","error"] as const).map(status => <StatusDot key={status} status={status} />)}</Inline>; }
```
