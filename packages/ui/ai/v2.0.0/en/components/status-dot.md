# StatusDot

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/status-dot
Source: packages/ui/src/components/status-dot.tsx
Source SHA-256: c5b530fc9dc8cfd05cc82eff59807dd3d2d9f1be1bbc76ec103e3517b8b169ce

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
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Inline } from "@qingye_lab/ui/components/layout";
export const meta = { title: "状态", titleEn: "States" };
export default function Demo() { return <Inline>{(["online","offline","pending","in-progress","unknown","warning","error"] as const).map(status => <StatusDot key={status} status={status} />)}</Inline>; }
```
