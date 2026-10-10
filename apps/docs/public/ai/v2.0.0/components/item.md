# 条目 Item

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/item
Source: packages/ui/src/components/item.tsx
Source SHA-256: e13727a9c1c89fe005b40eccaa7a01c30d57027b66a9c511e897c3e54b56a850

内容、入口与附属动作的关系。

## Decision
条目不内建业务对象。整体链接不包含其他交互动作；有附属动作时链接与按钮保持兄弟关系。

## Notes
- 不在 a 中嵌套按钮、链接或其他交互控件；无需动作时不生成假入口。

## Use and ownership
- 一个通用条目需要名称、补充内容与相关动作。
- Avoid: 多维比较使用 Table；不为没有目的的条目生成链接。
- Library: 条目关系、render 转发与焦点。
- Application: 条目内容、真实导航目标与操作状态。

## Composition
- Item：默认 div，可 render 为 li 或独立 a。
- ItemContent / ItemTitle / ItemDescription / ItemActions：div / div / p / div 关系槽。
- ItemLink：真实导航链接。

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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Item
默认 div，可 render 为 li 或独立 a。
- render / ref / children / native props: useRender.ComponentProps<div>. 实际元素接收事件与 ref；列表中显式 render 为 li。

### ItemContent / ItemTitle / ItemDescription / ItemActions
div / div / p / div 关系槽。
- children / render / ref / native props: useRender.ComponentProps<div | p>. 标题不是默认章节标题；动作组合公共 Button。

### ItemLink
真实导航链接。
- href / render / ref / native props: useRender.ComponentProps<a>. 保留目标、ARIA 和消费者事件。

## Keyboard
- Tab / Enter: 实际链接与按钮沿用原生顺序。

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
