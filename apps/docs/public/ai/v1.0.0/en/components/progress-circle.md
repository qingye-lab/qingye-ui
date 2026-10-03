# ProgressCircle

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/progress-circle
Source: packages/ui/src/components/progress-circle.tsx
Source SHA-256: 342de4e6b166caa5e0a97c61b62d32af272eb443e1b67cc0783b4e526551a6f7

The same confirmed progress contract in a circle.

## Decision
Do not use it as a standalone spinning animation; value=null when no reliable ratio exists.

## Use and ownership
- The position suits circular progress presentation.
- Avoid: Do not use it as a standalone spinning animation; value=null when no reliable ratio exists.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Uses Progress ranges, ARIA, and localized in-progress for actual null. Associate an external visible name through aria-labelledby.

## Responsive behavior
- Five independent circular dimension roles with matching text profiles; visible names/readings stay outside the fixed circle through aria-labelledby.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- ProgressCircle: function; owner progress-circle; PASS; props: ProgressCircleProps
- ProgressCirclePrimitive: reexport; owner progress-circle; alias of ProgressPrimitive; UNVERIFIED
- ProgressCircleProps: type; owner progress-circle; PASS
- ProgressCircleSize: type; owner progress-circle; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ProgressCircle
Uses Progress ranges, ARIA, and localized in-progress for actual null. Associate an external visible name through aria-labelledby.
- value / min / max: Progress props. The same reliable value, zero, null, and valid-range protocol as Progress.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". Independent circular dimension roles without changing progress facts.
- aria-label / aria-labelledby: string. The task name; keep its visible name outside the circle.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

### ProgressCirclePrimitive
The same public Base UI Progress primitive; the circle introduces no second task-state system.

## Keyboard

## Source examples
### 圆形进度
Source: apps/docs/src/content/progress-circle/demos/01-states.tsx
```tsx
import { useId } from "react";
import { ProgressCircle } from "@qingye/ui/components/progress-circle";
import { Inline, Stack } from "@qingye/ui/components/layout";
export const meta = { title: "圆形进度", titleEn: "Circular progress" };
export default function Demo() {
  const name = useId();
  return <Stack gap="fields"><span id={name} className="text-label">进度</span><Inline>{(["xs","sm","md","lg","xl"] as const).map(size => <Stack key={size} gap="field" align="center"><ProgressCircle size={size} value={50} aria-labelledby={name} /><span className="text-caption">50%</span></Stack>)}</Inline><Inline>{([0,100,null] as const).map((value,index) => <Stack key={index} gap="field" align="center"><ProgressCircle value={value} aria-labelledby={name} /><span className="text-caption">{value === null ? "进行中" : `${value}%`}</span></Stack>)}</Inline></Stack>;
}
```
