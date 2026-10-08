# 页面标题 PageHeader

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/page-header
Source: packages/ui/src/components/page-header.tsx
Source SHA-256: 2ddf687ece1fb57e7e294da98ac5051c921f14bf493d7e3393828b5b60b3cd9d

页面名称、上下文与相关动作共置。

## Decision
header 按任务关系共置内容；无自动面包屑、路由或维护者标签。标题层级独立于视觉文字档。

## Notes
- 无需动作时省略动作槽；不复制已经明确的路径或操作说明。

## Use and ownership
- 页面名称和与本任务有关的动作需要共置。
- Avoid: 普通章节标题使用 Heading；持续的成组操作使用 Toolbar。
- Library: 标题、上下文与动作的关系布局。
- Application: 页面名称、标题层级、内容事实与动作可用性。

## Composition
- PageHeader：原生 header。
- PageHeaderContent / PageHeaderDescription / PageHeaderActions：div / p / div 内容槽。
- PageHeaderTitle：复用 Heading。

## Responsive behavior
- 标题与动作可换行，保留原生焦点顺序。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

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
原生 header。
- children / render / ref / native props: useRender.ComponentProps<header>. 结构、ARIA、ref 与事件传入实际 header。

### PageHeaderContent / PageHeaderDescription / PageHeaderActions
div / p / div 内容槽。
- children / render / ref / native props: useRender.ComponentProps<div | p>. 应用提供上下文与真实操作，动作使用公共 Button 或链接。

### PageHeaderTitle
复用 Heading。
- level / step / render / ref / Heading props: HeadingProps; default level=1, step="chapter". 嵌入章节时调整 level；文字尺度是既有预设。

## Keyboard

## Source examples
### 名称与任务动作
Source: apps/docs/src/content/page-header/demos/01-title.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye_lab/ui/components/page-header";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "名称与任务动作", titleEn: "Name and task actions" } satisfies DemoMeta;
export default function Demo() {
  const [count, setCount] = useState(0);
  return <Stack><PageHeader><PageHeaderContent><PageHeaderTitle level={3}>内容</PageHeaderTitle><PageHeaderDescription>{count} 项</PageHeaderDescription></PageHeaderContent><PageHeaderActions><Button onClick={() => setCount(count + 1)}>添加一项</Button></PageHeaderActions></PageHeader>{count > 0 && <Stack render={<ul />} className="m-0 list-none p-0">{Array.from({ length: count }, (_, index) => <Item render={<li />} key={index}><ItemTitle>条目 {index + 1}</ItemTitle></Item>)}</Stack>}</Stack>;
}
```
