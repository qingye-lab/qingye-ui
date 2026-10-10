# 步骤 Steps

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/steps
Source: packages/ui/src/components/steps.tsx
Source SHA-256: 9620517d67de460eb5986d9eb8a445c6f41a7b4bad8d7316f6c38ab874df9495

应用事实决定的有序过程。

## Decision
序号不证明完成；每项状态显式传入，只有 current 获得 aria-current=step。

## Notes
- 不能由当前索引把之前各项自动标记完成。

## Use and ownership
- 有明确顺序和状态事实的过程。
- Avoid: 时间事件用 Timeline；平级页面入口用导航链接。
- Library: 顺序语义、可见状态名称与当前步骤标记。
- Application: 每一步的完成、当前位置、错误与恢复动作。

## Composition
- Steps：有名称的 ol。
- Step：一个 li，状态独立于前后位置。
- StepTitle / StepDescription：div / p 内容槽。

## Responsive behavior
- 内容纵向排列并换行，不隐藏状态。

## Customization
- 先使用当前属性与组合，再调整项目集中主题；共享缺口在公共库修复。
- 品牌、明暗和密度分别配置，主题不改变权限或保存策略。

## Current exports
- Step: function; owner steps; PASS; props: StepProps
- StepDescription: function; owner steps; PASS; props: StepDescriptionProps
- StepDescriptionProps: type; owner steps; PASS
- StepProps: type; owner steps; PASS
- Steps: function; owner steps; PASS; props: StepsProps
- StepsProps: type; owner steps; PASS
- StepState: type; owner steps; PASS
- StepTitle: function; owner steps; PASS; props: StepTitleProps
- StepTitleProps: type; owner steps; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Steps
有名称的 ol。
- aria-label / render / ref / native props: useRender.ComponentProps<ol>. 默认名称来自 locale。

### Step
一个 li，状态独立于前后位置。
- state: "upcoming" | "current" | "complete" | "error". 必填的应用事实，提供本地化辅助名称。
- render / ref / native props: useRender.ComponentProps<li>. 状态不自动产生导航。

### StepTitle / StepDescription
div / p 内容槽。
- children / render / ref / native props: useRender.ComponentProps<div | p>. 应用提供标题、解释和恢复链接。

## Keyboard

## Source examples
### 明确的过程状态
Source: apps/docs/src/content/steps/demos/01-progress.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Step, StepDescription, Steps, StepTitle, type StepState } from "@qingye_lab/ui/components/steps";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "明确的过程状态", titleEn: "Explicit process states" } satisfies DemoMeta;
export default function Demo() {
  const [state, setState] = useState<StepState>("current");
  return <Stack><Steps><Step state={state}><StepTitle>第一步</StepTitle><StepDescription>{state === "complete" ? "已标记完成" : "等待标记完成"}</StepDescription></Step><Step state="upcoming"><StepTitle>第二步</StepTitle></Step><Step state="error"><StepTitle>第三步</StepTitle><StepDescription>需要重新编辑</StepDescription></Step></Steps><Button className="self-start" variant="bordered" onClick={() => setState(state === "complete" ? "current" : "complete")}>{state === "complete" ? "返回进行中" : "标记完成"}</Button></Stack>;
}
```
