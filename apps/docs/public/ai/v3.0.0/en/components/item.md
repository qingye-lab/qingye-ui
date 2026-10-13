# Item

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/item
Source: packages/ui/src/components/item.tsx
Source SHA-256: 1f8aeb2d275d1293494b4ae60f7022b715f9ccbba1a5d159822caa9439489d23

Content, navigation and related actions.

## Decision
Items contain no built-in business objects. A whole-item link cannot contain interactive controls; separate links and buttons when secondary actions exist.

## Notes
- Never nest buttons, links or interactive controls inside an anchor; absent actions generate no fake entry.

## Use and ownership
- A general item needs a name, supplementary content, and related actions.
- Avoid: Use Table for multidimensional comparison; do not create links without an actual destination.
- Avoid: Never hide a row's primary action behind reveal="hover"; do not use it in touch-first interfaces.
- Library: Item relationships, render forwarding, and focus.
- Application: Item content, actual navigation targets, and action states.

## Composition
- Item: A div that may render a li or standalone anchor. Render an a when the whole row leads to one destination and holds no other interactive element: rendered as a[href] or button the row gets hover and pressed feedback, and the fill bleeds one padding past each side while the text stays on the column edge; a div or li gets none.
- ItemContent / ItemTitle / ItemDescription: div / div / p relationship slots.
- ItemActions: Secondary actions on the row, always visible by default.
- ItemLink: A real navigation link where the name is the entry, for rows that have their own actions in ItemActions; when the whole row is one destination use Item render={<a />} instead.

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Item
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ItemActions
- `resting?`: `React.ReactNode`. 平时显示的内容，例如一个时间。`reveal="hover"` 时与操作叠在同一格，格宽取两者中较宽者，显隐切换时这一行不发生位移。
- `reveal?`: `"always" | "hover"`. `always`（默认）：操作一直可见。`hover`：操作平时淡出，行悬停、行内有焦点、行内有打开的菜单或浮层时显现； 没有悬停能力的设备上恒显示。隐藏只改不透明度，按钮始终在 Tab 顺序与可访问树里。 一行的主要动作不要藏；触摸为主的界面不要用。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ItemContent
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ItemDescription
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ItemLink
- no props declared by this library
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

### ItemTitle
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Item
A div that may render a li or standalone anchor. Render an a when the whole row leads to one destination and holds no other interactive element: rendered as a[href] or button the row gets hover and pressed feedback, and the fill bleeds one padding past each side while the text stays on the column edge; a div or li gets none.
- render / ref / children / native props: useRender.ComponentProps<div>. Events and ref reach the actual element; explicitly render li inside a list.

### ItemContent / ItemTitle / ItemDescription
div / div / p relationship slots.
- children / render / ref / native props: useRender.ComponentProps<div | p>. The title is not automatically a document heading.

### ItemActions
Secondary actions on the row, always visible by default.
- reveal: "always" | "hover"; default "always". hover: the actions fade out at rest and appear while the row is hovered, holds focus, or holds an open menu or popup; on devices without hover they are always shown. Only opacity changes, so the buttons stay in tab order and the accessibility tree.
- resting: React.ReactNode. Content shown at rest, such as a time. It shares one cell with the actions, sized to the wider of the two, so the row does not shift when they swap; on devices without hover it sits beside the actions.
- children / render / ref / native props: useRender.ComponentProps<div>. Compose public Button actions.

### ItemLink
A real navigation link where the name is the entry, for rows that have their own actions in ItemActions; when the whole row is one destination use Item render={<a />} instead.
- href / render / ref / native props: useRender.ComponentProps<a>. Preserve destinations, ARIA and caller events.

## Keyboard
- Tab / Enter: Actual links and buttons use native focus order; actions under reveal="hover" appear when focused.

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

### 悬停显现的次要动作
Source: apps/docs/src/content/item/demos/02-reveal.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "悬停显现的次要动作", titleEn: "Secondary actions on hover" } satisfies DemoMeta;

const rows = [
  { name: "春季蚕室记录", note: "温度 24℃，湿度 72%", time: "08:30" },
  { name: "夏季蚕室记录", note: "温度 27℃，湿度 68%", time: "昨天" },
  { name: "秋季蚕室记录", note: "温度 22℃，湿度 75%", time: "周一" },
  { name: "冬季蚕室记录", note: "温度 18℃，湿度 70%", time: "10 月 6 日" },
];

export default function Demo() {
  return <Stack gap="field" render={<ul />} className="m-0 w-full max-w-lg list-none p-0">
    {rows.map(row => <Item render={<li />} key={row.name}>
      <ItemContent><ItemTitle>{row.name}</ItemTitle><ItemDescription>{row.note}</ItemDescription></ItemContent>
      <ItemActions reveal="hover" resting={<time>{row.time}</time>}>
        <Button variant="quiet" size="sm">重命名</Button>
        <Button variant="quiet" size="sm">归档</Button>
      </ItemActions>
    </Item>)}
  </Stack>;
}
```

### 整行是一个链接
Source: apps/docs/src/content/item/demos/03-row-link.tsx
```tsx
import { IconChevronRight } from "@tabler/icons-react";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "整行是一个链接", titleEn: "The whole row as one link" } satisfies DemoMeta;

const queue = [
  { id: "room-3", name: "蚕室 3", note: "待核对 2 条读数" },
  { id: "room-5", name: "蚕室 5", note: "湿度偏高 3 次" },
  { id: "room-8", name: "蚕室 8", note: "桑叶入库单待签收" },
];

export default function Demo() {
  return <Stack render={<ul />} className="m-0 w-full max-w-lg list-none p-0">
    {queue.map(row => <li key={row.id}>
      <Item render={<a href={`#${row.id}`} />}>
        <ItemContent><ItemTitle>{row.name}</ItemTitle><ItemDescription>{row.note}</ItemDescription></ItemContent>
        <IconChevronRight aria-hidden="true" className="size-(--qy-control-md-icon) shrink-0 text-muted-foreground rtl:-scale-x-100" />
      </Item>
    </li>)}
  </Stack>;
}
```
