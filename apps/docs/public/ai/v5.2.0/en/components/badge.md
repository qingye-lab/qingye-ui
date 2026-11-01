# Badge

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/badge
Source: packages/ui/src/components/badge.tsx
Source SHA-256: 66ce5024d8e432327ddecdc8ae5c1d05c62b636f6af042a2a8c895793156a326

A short marker that keeps its content name without inferring state.

## Decision
Use StatusDot for actual states; a badge cannot establish success.

## Notes
- tone shares one set of values and one hue per category with StatusDot; see StatusDot for which state belongs to which category.

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Badge
- `tone?`: `"info" | "warning" | "danger" | "success"`. 状态类别（随类赋彩）：只有标记确实表达这一类事实时才给。给出时自带强调。
- `variant?`: `"neutral" | "emphasis"`. neutral 只把这段文字分出来；emphasis 要读者注意到它，但不归入任何状态类别。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

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
import { Badge } from "@qingye_lab/ui/components/badge";
import { Inline } from "@qingye_lab/ui/components/layout";

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
