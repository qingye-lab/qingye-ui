# 空与未知 Empty

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/empty
Source: packages/ui/src/components/empty.tsx
Source SHA-256: 79d0c56344b661ec6edb67229e663d8b42f56036620bdcbc3c5a05711299f3c0

区分零结果、未知与不适用。

## Decision
调用方提供状态、名称和可执行入口；没有内容不自动建立卡片边界。

## Notes
- 保留刷新前的有效内容，不把尚未加载或不适用标成 0 条。

## Use and ownership
- 缺少内容时需要表达零、未知或不适用与可执行入口。
- Avoid: 等待中的内容使用适用的加载状态；刷新时保留已有内容。
- Library: 名称、说明与动作的关系结构。
- Application: 状态事实、原因、错误恢复与入口可用性。

## Composition
- Empty：div，状态必填。
- EmptyTitle：复用 Heading，默认 h2。
- EmptyDescription / EmptyActions：p 说明与 div 动作关系。

## Responsive behavior
- 名称与恢复动作完整换行。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

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
div，状态必填。
- state: "empty" | "unknown" | "not-applicable". 零结果、结果未知或任务不适用。
- children / render / ref / native props: useRender.ComponentProps<div>. 应用提供内容；不会自动成为 alert。

### EmptyTitle
复用 Heading，默认 h2。
- level / step / render / ref / Heading props: HeadingProps. 标题层级由文档关系决定。

### EmptyDescription / EmptyActions
p 说明与 div 动作关系。
- children / render / ref / native props: useRender.ComponentProps<p | div>. 动作复用公共组件与合法原生语义。

## Keyboard

## Source examples
### 零、未知与不适用
Source: apps/docs/src/content/empty/demos/01-states.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Empty, EmptyActions, EmptyDescription, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Item, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "零、未知与不适用", titleEn: "Zero, unknown and not applicable" } satisfies DemoMeta;
export default function Demo() {
  const [added, setAdded] = useState(false);
  return <Stack gap="section">{added ? <Item><ItemTitle>条目 1</ItemTitle></Item> : <Empty state="empty"><EmptyTitle level={3}>0 条内容</EmptyTitle><EmptyActions><Button onClick={() => setAdded(true)}>添加一项</Button></EmptyActions></Empty>}<Empty state="unknown"><EmptyTitle level={3}>结果未知</EmptyTitle><EmptyDescription>尚未提供结果</EmptyDescription></Empty><Empty state="not-applicable"><EmptyTitle level={3}>不适用</EmptyTitle></Empty></Stack>;
}
```
