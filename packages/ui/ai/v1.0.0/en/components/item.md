# Item

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/item
Source: packages/ui/src/components/item.tsx
Source SHA-256: e13727a9c1c89fe005b40eccaa7a01c30d57027b66a9c511e897c3e54b56a850

Content, navigation and related actions.

## Decision
Items contain no built-in business objects. A whole-item link cannot contain interactive controls; separate links and buttons when secondary actions exist.

## Notes
- Never nest buttons, links or interactive controls inside an anchor; absent actions generate no fake entry.

## Use and ownership
- A general item needs a name, supplementary content, and related actions.
- Avoid: Use Table for multidimensional comparison; do not create links without an actual destination.
- Library: Item relationships, render forwarding, and focus.
- Application: Item content, actual navigation targets, and action states.

## Composition
- Item: A div that may render a li or standalone anchor.
- ItemContent / ItemTitle / ItemDescription / ItemActions: div / div / p / div relationship slots.
- ItemLink: A real navigation link.

## Responsive behavior
- Body text wraps while adjunct actions retain capacity.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- Item: function; owner item; PASS; props: ItemProps
- ItemActions: function; owner item; PASS; props: ItemActionsProps
- ItemActionsProps: type; owner item; PASS
- ItemContent: function; owner item; PASS; props: ItemContentProps
- ItemContentProps: type; owner item; PASS
- ItemDescription: function; owner item; PASS; props: ItemDescriptionProps
- ItemDescriptionProps: type; owner item; PASS
- ItemLink: function; owner item; PASS; props: ItemLinkProps
- ItemLinkProps: type; owner item; PASS
- ItemProps: type; owner item; PASS
- ItemTitle: function; owner item; PASS; props: ItemTitleProps
- ItemTitleProps: type; owner item; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Item
A div that may render a li or standalone anchor.
- render / ref / children / native props: useRender.ComponentProps<div>. Events and ref reach the actual element; explicitly render li inside a list.

### ItemContent / ItemTitle / ItemDescription / ItemActions
div / div / p / div relationship slots.
- children / render / ref / native props: useRender.ComponentProps<div | p>. The title is not automatically a document heading; compose public Button actions.

### ItemLink
A real navigation link.
- href / render / ref / native props: useRender.ComponentProps<a>. Preserve destinations, ARIA and caller events.

## Keyboard
- Tab / Enter: Actual links and buttons use native focus order.

## Source examples
### 入口与独立动作
Source: apps/docs/src/content/item/demos/01-entry.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemLink, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "入口与独立动作", titleEn: "Navigation and separate actions" } satisfies DemoMeta;

export default function Demo() {
  const [expanded, setExpanded] = useState(false);
  return <Stack render={<ul />} className="m-0 list-none p-0">
    <Item render={<li />}>
      <ItemContent>
        <ItemTitle><ItemLink href="/components/description-list">名称与值</ItemLink></ItemTitle>
        {expanded && <ItemDescription>用一行名称对一行值，名称按内容成列。</ItemDescription>}
      </ItemContent>
      <ItemActions><Button variant="quiet" aria-expanded={expanded} onClick={() => setExpanded(!expanded)}>{expanded ? "收起" : "展开"}</Button></ItemActions>
    </Item>
    <Item render={<li />}>
      <ItemContent><ItemTitle><ItemLink href="/components/table">比较表</ItemLink></ItemTitle></ItemContent>
    </Item>
  </Stack>;
}
```
