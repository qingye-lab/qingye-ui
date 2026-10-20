# 条目 Item

Package: @qingye_lab/ui@4.1.0
Import: @qingye_lab/ui/components/item
Source: packages/ui/src/components/item.tsx
Source SHA-256: 1f8aeb2d275d1293494b4ae60f7022b715f9ccbba1a5d159822caa9439489d23

内容、入口与附属动作的关系。

## Decision
条目不内建业务对象。整体链接不包含其他交互动作；有附属动作时链接与按钮保持兄弟关系。

## Notes
- 不在 a 中嵌套按钮、链接或其他交互控件；无需动作时不生成假入口。

## Use and ownership
- 一个通用条目需要名称、补充内容与相关动作。
- Avoid: 多维比较使用 Table；不为没有目的的条目生成链接。
- Avoid: 一行的主要动作不能藏进 reveal="hover"；触摸为主的界面不要用。
- Library: 条目关系、render 转发与焦点。
- Application: 条目内容、真实导航目标与操作状态。

## Composition
- Item：默认 div，可 render 为 li 或独立 a。整行只通向一个去处且行内没有别的交互元素时 render 为 a：渲染为 a[href] 或 button 时整行有悬停与按下反馈，两侧伸出一个留白，文字仍与列缘对齐；div 与 li 没有反馈。
- ItemContent / ItemTitle / ItemDescription：div / div / p 关系槽。
- ItemActions：行内的附属动作，默认一直可见。
- ItemLink：名称就是入口的真实导航链接，用在行内另有操作的条目上，操作放 ItemActions；整行只有一个去处时改用 Item render={<a />}。

## Responsive behavior
- 正文可换行，附属动作保留容量。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

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
默认 div，可 render 为 li 或独立 a。整行只通向一个去处且行内没有别的交互元素时 render 为 a：渲染为 a[href] 或 button 时整行有悬停与按下反馈，两侧伸出一个留白，文字仍与列缘对齐；div 与 li 没有反馈。
- render / ref / children / native props: useRender.ComponentProps<div>. 实际元素接收事件与 ref；列表中显式 render 为 li。

### ItemContent / ItemTitle / ItemDescription
div / div / p 关系槽。
- children / render / ref / native props: useRender.ComponentProps<div | p>. 标题不是默认章节标题。

### ItemActions
行内的附属动作，默认一直可见。
- reveal: "always" | "hover"; default "always". hover：操作平时淡出，行悬停、行内有焦点、行内有打开的菜单或浮层时显现；没有悬停能力的设备上恒显示。只改不透明度，按钮始终在 Tab 顺序与可访问树里。
- resting: React.ReactNode. 平时显示的内容，例如一个时间。与操作叠在同一格，格宽取两者中较宽者，显隐切换时这一行不发生位移；没有悬停能力的设备上与操作并排显示。
- children / render / ref / native props: useRender.ComponentProps<div>. 动作组合公共 Button。

### ItemLink
名称就是入口的真实导航链接，用在行内另有操作的条目上，操作放 ItemActions；整行只有一个去处时改用 Item render={<a />}。
- href / render / ref / native props: useRender.ComponentProps<a>. 保留目标、ARIA 和消费者事件。

## Keyboard
- Tab / Enter: 实际链接与按钮沿用原生顺序；reveal="hover" 的操作聚焦时随之显现。

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
