# PageHeader

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/page-header
Source: packages/ui/src/components/page-header.tsx
Source SHA-256: 2ddf687ece1fb57e7e294da98ac5051c921f14bf493d7e3393828b5b60b3cd9d

Co-locate a page name, context and related actions.

## Decision
A header co-locates task-related content without automatic breadcrumbs, routing or maintainer labels. Heading level is independent of visual scale.

## Notes
- Omit absent actions; do not duplicate an already clear path or action instructions.

## Use and ownership
- A page name and actions for its current task need to appear together.
- Avoid: Use Heading for ordinary section titles and Toolbar for persistent grouped operations.
- Library: Relationship layout for titles, context, and actions.
- Application: Page names, heading levels, content facts, and action availability.

## Composition
- PageHeader: A native header.
- PageHeaderContent / PageHeaderDescription / PageHeaderActions: div / p / div content slots.
- PageHeaderTitle: A Heading composition.

## Responsive behavior
- Titles and actions wrap while retaining native focus order.

## Customization
- Use the current props and composition first, then adjust the project's central theme; fix shared gaps in the public library.
- Configure brand, light or dark mode, and density separately; themes do not change permissions or save policies.

## Current exports
- PageHeader: function; owner page-header; PASS; props: PageHeaderProps
- PageHeaderActions: function; owner page-header; PASS; props: PageHeaderActionsProps
- PageHeaderActionsProps: type; owner page-header; PASS
- PageHeaderContent: function; owner page-header; PASS; props: PageHeaderContentProps
- PageHeaderContentProps: type; owner page-header; PASS
- PageHeaderDescription: function; owner page-header; PASS; props: PageHeaderDescriptionProps
- PageHeaderDescriptionProps: type; owner page-header; PASS
- PageHeaderProps: type; owner page-header; PASS
- PageHeaderTitle: function; owner page-header; PASS; props: PageHeaderTitleProps
- PageHeaderTitleProps: type; owner page-header; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### PageHeader
A native header.
- children / render / ref / native props: useRender.ComponentProps<header>. Structure, ARIA, refs and events reach the actual header.

### PageHeaderContent / PageHeaderDescription / PageHeaderActions
div / p / div content slots.
- children / render / ref / native props: useRender.ComponentProps<div | p>. The caller provides context and actual actions using public Button or links.

### PageHeaderTitle
A Heading composition.
- level / step / render / ref / Heading props: HeadingProps; default level=1, step="chapter". Adjust level for nested sections; text scale is an existing preset.

## Keyboard

## Source examples
### 名称与任务动作
Source: apps/docs/src/content/page-header/demos/01-title.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Item, ItemTitle } from "@qingye/ui/components/item";
import { Stack } from "@qingye/ui/components/layout";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye/ui/components/page-header";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "名称与任务动作", titleEn: "Name and task actions" } satisfies DemoMeta;
export default function Demo() {
  const [count, setCount] = useState(0);
  return <Stack><PageHeader><PageHeaderContent><PageHeaderTitle level={3}>内容</PageHeaderTitle><PageHeaderDescription>{count} 项</PageHeaderDescription></PageHeaderContent><PageHeaderActions><Button onClick={() => setCount(count + 1)}>添加一项</Button></PageHeaderActions></PageHeader>{count > 0 && <Stack render={<ul />} className="m-0 list-none p-0">{Array.from({ length: count }, (_, index) => <Item render={<li />} key={index}><ItemTitle>条目 {index + 1}</ItemTitle></Item>)}</Stack>}</Stack>;
}
```
