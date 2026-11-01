# 结果 Result

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/result
Source: packages/ui/src/components/result.tsx
Source SHA-256: 68a37124c7872d1d121516a465cd9f9fe0d764871e5ee1f9ce9b58399d44e43e

一次操作的结局：标记、标题、说明与去向。

## Decision
与 Empty 的分工：Empty 说「这里还没有内容」，是一块区域的状态（零结果、未知、不适用）；Result 说「刚才那件事的结局」，是一次动作的回执，类别由事件决定，并总带着下一步的去向。与 Alert 的分工：Alert 是在场对象旁的一句提示，不占版面；Result 取代该处内容，独占一块。类别除色相外还有形状不同的图标和只给读屏的前缀；去掉图标不等于去掉类别。不自动宣告，是否读出由应用按真实事件决定。

## Notes
- 非成败的结局（例如没有权限）没有单独的 status；用 tone 加自己的 icon。

## Use and ownership
- 一次提交、保存或申请结束后，需要独占一块告诉用户结局和下一步。
- Avoid: 区域里本来就没有内容用 Empty；对象仍在、只需旁注一句用 Alert。
- Library: 类别的色相、图标与读屏前缀，及各部分的间隔。
- Application: 结局的事实、tone、文案、role 与去向。

## Composition
- 标记、标题、说明、动作自上而下，左对齐；动作复用公共控件。

## Responsive behavior
- 标题、说明与动作完整换行；不居中，不加框。

## Customization
- icon 可换成自己的节点或 false；没有权限这类非成败结果用 neutral 或 warning 加自己的 icon。

## Current exports
- Result: function; owner result; PASS; props: ResultProps
- ResultActions: function; owner result; PASS; props: ResultActionsProps
- ResultActionsProps: type; owner result; PASS
- ResultDescription: function; owner result; PASS; props: ResultDescriptionProps
- ResultDescriptionProps: type; owner result; PASS
- ResultProps: type; owner result; PASS
- ResultTitle: function; owner result; PASS; props: ResultTitleProps
- ResultTitleProps: type; owner result; PASS
- ResultTone: type; owner result; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Result
- `icon?`: `React.ReactNode | false`. 状态标记。省略时按 tone 给默认图标（neutral 没有）；传节点则用它；`false` 不放标记。
- `tone?`: `"neutral" | "info" | "warning" | "danger" | "success"`. 这次操作的结果类别，由调用方按真实事件声明；组件不从文字或数值猜成败。 「没有权限」这类不是成败的结果，用 neutral 或 warning 加自己的 icon，类别仍由调用方判断。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ResultActions
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ResultDescription
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ResultTitle
- `level?`: `1 | 2 | 3 | 4 | 5 | 6`. Document outline, independent of the visual text step.
- `numeric?`: `boolean`.
- `step?`: `"body" | "caption" | "label" | "title" | "display-xl" | "display-lg" | "display" | "chapter" | "heading" | "body-strong" | "reading" | "prose" | "prose-strong" | "prose-h1" | "prose-h2" | "prose-h3" | "support" | "support-mobile" | "support-strong" | "support-strong-mobile" | "dense" | "dense-mobile" | "dense-strong" | "dense-strong-mobile" | "caption-strong" | "label-mobile" | "metric" | "metric-lg" | "micro" | "control-xs" | "control-xs-mobile" | "control-sm" | "control-sm…`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Result
div，类别由调用方声明。
- tone: "neutral" | "info" | "success" | "warning" | "danger"; default "neutral". 结局的类别，按真实事件声明；组件不从文字猜成败。
- icon: React.ReactNode | false. 省略时按 tone 给默认图标（neutral 没有）；传节点则替换；false 不放标记。
- children / render / ref / native props: useRender.ComponentProps<div>. 不自动成为 alert 或 status。

### ResultTitle
复用 Heading。
- level / step / Heading props: HeadingProps. 标题层级由文档关系决定。

### ResultDescription / ResultActions
p 说明与 div 去向。
- children / render / ref / native props: useRender.ComponentProps<p | div>. 动作复用公共组件。

## Keyboard

## Source examples
### 成功、失败与提示
Source: apps/docs/src/content/result/demos/01-tones.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Grid } from "@qingye_lab/ui/components/layout";
import { Result, ResultActions, ResultDescription, ResultTitle } from "@qingye_lab/ui/components/result";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "成功、失败与提示", titleEn: "Success, failure and notice" } satisfies DemoMeta;

export default function Demo() {
  return <Grid columns={2} gap="section">
    <Result tone="success"><ResultTitle level={3}>已保存</ResultTitle><ResultDescription>修改已写入，下次打开即可看到。</ResultDescription><ResultActions><Button>返回列表</Button></ResultActions></Result>
    <Result tone="danger" role="alert"><ResultTitle level={3}>保存失败</ResultTitle><ResultDescription>网络中断，修改还在这个页面里，没有丢失。</ResultDescription><ResultActions><Button>重试</Button><Button variant="quiet">返回</Button></ResultActions></Result>
    <Result tone="warning"><ResultTitle level={3}>部分文件未上传</ResultTitle><ResultDescription>3 个文件中有 1 个超过大小限制。</ResultDescription><ResultActions><Button>查看文件</Button></ResultActions></Result>
    <Result tone="info"><ResultTitle level={3}>正在审核</ResultTitle><ResultDescription>审核通过后会通知你。</ResultDescription></Result>
  </Grid>;
}
```

### 没有权限：自己的标记
Source: apps/docs/src/content/result/demos/02-custom-icon.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { Result, ResultActions, ResultDescription, ResultTitle } from "@qingye_lab/ui/components/result";
import { IconLock } from "@tabler/icons-react";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "没有权限：自己的标记", titleEn: "No permission: your own mark" } satisfies DemoMeta;

// 没有权限不是成功也不是失败：类别用 warning（仍有形状与读屏前缀），标记换成锁。
export default function Demo() {
  return <Result tone="warning" icon={<IconLock aria-hidden="true" />}>
    <ResultTitle level={3}>你没有查看这份文档的权限</ResultTitle>
    <ResultDescription>向文档所有者申请访问，或回到你有权限的文档。</ResultDescription>
    <ResultActions><Button>申请访问</Button><Button variant="quiet">返回首页</Button></ResultActions>
  </Result>;
}
```
