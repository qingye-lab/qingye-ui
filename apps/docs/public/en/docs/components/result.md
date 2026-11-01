# Result

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/result
Source: packages/ui/src/components/result.tsx
Source SHA-256: 68a37124c7872d1d121516a465cd9f9fe0d764871e5ee1f9ce9b58399d44e43e

The outcome of one action: a mark, a title, an explanation and where to go next.

## Decision
Versus Empty: Empty says "there is no content here yet" and is the state of a region (zero results, unknown, not applicable); Result says "how that thing ended" and is the receipt of an action, its tone decided by the event and always paired with where to go next. Versus Alert: Alert is a line beside an object that is still present and takes no layout; Result replaces that content and occupies its own block. Tone has a differently shaped icon and a screen-reader-only prefix besides hue; removing the icon does not remove the tone. It never announces itself; the application decides from the real event whether to speak it.

## Notes
- Outcomes that are neither success nor failure (such as no permission) have no dedicated status; use tone plus your own icon.

## Use and ownership
- After a submission, save or request ends, a whole block must say how it ended and what comes next.
- Avoid: Use Empty when a region simply has no content; use Alert when the object remains and a side note is enough.
- Library: Tone hue, icon and screen-reader prefix, and spacing between parts.
- Application: The outcome's facts, tone, copy, role and next destination.

## Composition
- Mark, title, description and actions run top to bottom, start-aligned; actions compose public controls.

## Responsive behavior
- Title, description and actions wrap fully; not centered, not boxed.

## Customization
- icon may be your own node or false; for non-success/failure outcomes such as no permission, use neutral or warning with your own icon.

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
A div whose tone the caller declares.
- tone: "neutral" | "info" | "success" | "warning" | "danger"; default "neutral". The outcome's category, declared from the real event; the component never guesses from text.
- icon: React.ReactNode | false. Defaults to the tone's icon (neutral has none); a node replaces it; false removes the mark.
- children / render / ref / native props: useRender.ComponentProps<div>. Not automatically an alert or status.

### ResultTitle
A Heading composition.
- level / step / Heading props: HeadingProps. Document relationships determine heading level.

### ResultDescription / ResultActions
p explanation and div destinations.
- children / render / ref / native props: useRender.ComponentProps<p | div>. Compose public controls for actions.

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
