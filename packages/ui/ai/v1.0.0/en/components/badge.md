# Badge

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/badge
Source: packages/ui/src/components/badge.tsx
Source SHA-256: b242907ef4830b800cce0154c41b225bee52164ba08e8d5ee2671c3e5f115c9f

A short marker that keeps its content name without inferring state.

## Decision
Use StatusDot for actual states; a badge cannot establish success.

## Use and ownership
- Short categories, annotations, or emphasis markers.
- Avoid: Use StatusDot for actual states; a badge cannot establish success.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- className, style, and render belong to the marker; a marker has no size scale and matches the text it annotates.

## Responsive behavior
- The marker scales with the text it sits in; short markers may wrap without losing content.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

## Current exports
- Badge: function; owner badge; PASS; props: BadgeProps
- BadgeProps: type; owner badge; PASS
- BadgeTone: type; owner badge; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Badge
className, style, and render belong to the marker; a marker has no size scale and matches the text it annotates.
- variant: "neutral" | "emphasis"; default "neutral". neutral is medium-ink text; emphasis is full ink with medium weight, drawing attention without a state category, so it uses no hue.
- tone: "info" | "success" | "warning" | "danger". A state category declared by the caller: that state's text color with medium weight. The component never infers the category from text.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

## Keyboard

## Source examples
### 标记
Source: apps/docs/src/content/badge/demos/01-states.tsx
```tsx
import { Badge } from "@qingye/ui/components/badge";
import { Inline } from "@qingye/ui/components/layout";

export const meta = { title: "标记", titleEn: "Markers" };

// 标记没有尺寸档：它标注哪段文字就与哪段文字同大（用户裁决 2026-10-05）。
export default function Demo() {
  return (
    <div className="grid gap-(--qy-field-group-gap)">
      <Inline><Badge>草稿</Badge><Badge>已完成</Badge><Badge variant="emphasis">重点</Badge><Badge tone="warning">即将过期</Badge><Badge tone="danger">同步失败</Badge></Inline>
      <p className="text-support text-muted-foreground">与紧凑文字同行时 <Badge>待确认</Badge></p>
    </div>
  );
}
```
