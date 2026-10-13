# 空与未知 Empty

Package: @qingye_lab/ui@4.0.0
Import: @qingye_lab/ui/components/empty
Source: packages/ui/src/components/empty.tsx
Source SHA-256: 9806b0c9c7f902d0f97e5d35050cece67dbd8636629dba29b4fa7c28c4147a58

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
