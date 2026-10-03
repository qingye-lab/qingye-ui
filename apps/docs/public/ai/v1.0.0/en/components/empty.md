# Empty

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/empty
Source: packages/ui/src/components/empty.tsx
Source SHA-256: 79d0c56344b661ec6edb67229e663d8b42f56036620bdcbc3c5a05711299f3c0

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
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
### 零、未知与不适用
Source: apps/docs/src/content/empty/demos/01-states.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Empty, EmptyActions, EmptyDescription, EmptyTitle } from "@qingye/ui/components/empty";
import { Item, ItemTitle } from "@qingye/ui/components/item";
import { Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "零、未知与不适用", titleEn: "Zero, unknown and not applicable" } satisfies DemoMeta;
export default function Demo() {
  const [added, setAdded] = useState(false);
  return <Stack gap="section">{added ? <Item><ItemTitle>条目 1</ItemTitle></Item> : <Empty state="empty"><EmptyTitle level={3}>0 条内容</EmptyTitle><EmptyActions><Button onClick={() => setAdded(true)}>添加一项</Button></EmptyActions></Empty>}<Empty state="unknown"><EmptyTitle level={3}>结果未知</EmptyTitle><EmptyDescription>尚未提供结果</EmptyDescription></Empty><Empty state="not-applicable"><EmptyTitle level={3}>不适用</EmptyTitle></Empty></Stack>;
}
```
