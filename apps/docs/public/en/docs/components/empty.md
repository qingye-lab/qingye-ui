# Empty

Package: @qingye_lab/ui@4.1.0
Import: @qingye_lab/ui/components/empty
Source: packages/ui/src/components/empty.tsx
Source SHA-256: 9806b0c9c7f902d0f97e5d35050cece67dbd8636629dba29b4fa7c28c4147a58

Distinguish zero results, unknown and not applicable.

## Decision
The caller supplies state, names and real actions; missing content does not automatically require a card boundary.

## Notes
- Retain valid content while refreshing; do not label unloaded or inapplicable results as zero.

## Use and ownership
- Missing content needs truthful zero, unknown, or not-applicable facts and actionable entries.
- Avoid: Use an appropriate waiting state for pending content; retain existing content during refresh.
- Library: Relationship structure for names, descriptions, and actions.
- Application: State facts, reasons, error recovery, and available entries.

## Composition
- Empty: A div with required state.
- EmptyTitle: A Heading composition, defaulting to h2.
- EmptyDescription / EmptyActions: p explanation and div action grouping.

## Responsive behavior
- Names and recovery actions wrap fully.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- Empty: function; owner empty; PASS; props: EmptyProps
- EmptyActions: function; owner empty; PASS; props: EmptyActionsProps
- EmptyActionsProps: type; owner empty; PASS
- EmptyDescription: function; owner empty; PASS; props: EmptyDescriptionProps
- EmptyDescriptionProps: type; owner empty; PASS
- EmptyProps: type; owner empty; PASS
- EmptyState: type; owner empty; PASS
- EmptyTitle: function; owner empty; PASS; props: EmptyTitleProps
- EmptyTitleProps: type; owner empty; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Empty
- `state`: `"empty" | "unknown" | "not-applicable"`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### EmptyActions
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### EmptyDescription
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### EmptyTitle
- `level?`: `1 | 2 | 3 | 4 | 5 | 6`. Document outline, independent of the visual text step.
- `numeric?`: `boolean`.
- `step?`: `"body" | "caption" | "label" | "title" | "display-xl" | "display-lg" | "display" | "chapter" | "heading" | "body-strong" | "reading" | "prose" | "prose-strong" | "prose-h1" | "prose-h2" | "prose-h3" | "support" | "support-mobile" | "support-strong" | "support-strong-mobile" | "dense" | "dense-mobile" | "dense-strong" | "dense-strong-mobile" | "caption-strong" | "metric" | "metric-lg" | "micro" | "control-xs" | "control-xs-mobile" | "control-sm" | "control-sm-mobile" | "contr…`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Empty
A div with required state.
- state: "empty" | "unknown" | "not-applicable". Zero results, unknown results, or a task that does not apply.
- children / render / ref / native props: useRender.ComponentProps<div>. The caller supplies content; the component is not automatically an alert.

### EmptyTitle
A Heading composition, defaulting to h2.
- level / step / render / ref / Heading props: HeadingProps. Document relationships determine heading level.

### EmptyDescription / EmptyActions
p explanation and div action grouping.
- children / render / ref / native props: useRender.ComponentProps<p | div>. Compose public controls with valid native semantics.

## Keyboard

## Source examples
### 零结果
Source: apps/docs/src/content/empty/demos/01-states.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "零结果", titleEn: "Zero results" } satisfies DemoMeta;
export default function Demo() {
  return <Empty state="empty"><EmptyTitle level={3}>0 条内容</EmptyTitle><EmptyActions><Button>添加一项</Button></EmptyActions></Empty>;
}
```

### 未知与不适用
Source: apps/docs/src/content/empty/demos/02-unknown.tsx
```tsx
import { Empty, EmptyDescription, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "未知与不适用", titleEn: "Unknown and not applicable" } satisfies DemoMeta;
export default function Demo() {
  return <Stack gap="section"><Empty state="unknown"><EmptyTitle level={3}>结果未知</EmptyTitle><EmptyDescription>尚未提供结果</EmptyDescription></Empty><Empty state="not-applicable"><EmptyTitle level={3}>不适用</EmptyTitle></Empty></Stack>;
}
```
