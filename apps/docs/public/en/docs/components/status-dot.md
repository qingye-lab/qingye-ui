# StatusDot

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/status-dot
Source: packages/ui/src/components/status-dot.tsx
Source SHA-256: 460a2c7c93aa7bbf779ca0c9ad7e6f47f2d7fc13190afd17b95f4717319e3c74

A state graphic and its visible name.

## Decision
Waiting, in-progress, and unknown results remain distinct facts.

## Notes
- Each state belongs to one fixed category: online is success, error is danger, warning and unknown are warning, and info, pending and in-progress are info; offline and neutral carry no hue. The same category has the same hue in Badge.
- An unknown outcome needs the reader to verify it, so it is a warning: neither a failure nor a success. neutral is a state with no category; use label to say what it is.

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### StatusDot
- `label?`: `string`.
- `status`: `"neutral" | "info" | "warning" | "pending" | "error" | "unknown" | "online" | "offline" | "in-progress"`.
- plus 280 inherited (@types/react 279, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

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
