# 进度 Progress

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/progress
Source: packages/ui/src/components/progress.tsx
Source SHA-256: 99f49aaaa91ae20d9c89758c574ca8a93d0ca08e17deeae3727c34e74fe370f2

表达可靠分母的任务进度或明确不定状态。

## Decision
动画和时间不能提供完成事实；0 与 null 不同。

## Use and ownership
- 有可靠完成比例，或已知正在进行但缺少比例。
- Avoid: 动画和时间不能提供完成事实；0 与 null 不同。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- Label 关联任务；Value 默认按真实 null 显示已有 locale 的进行中，调用方格式化内容优先。

## Responsive behavior
- 任务名称与格式化读数允许换行；轨厚由独立进度角色控制。

## Customization
- 使用公开 render/ref、ARIA、事件与样式；不混用主题三轴。

## Current exports
- Progress: function; owner progress; PASS; props: ProgressProps
- ProgressIndicator: function; owner progress; PASS; props: ProgressIndicatorProps
- ProgressIndicatorProps: type; owner progress; PASS
- ProgressLabel: function; owner progress; PASS; props: React.ComponentProps<typeof ProgressPrimitive.Label>
- ProgressPrimitive: reexport; owner progress; UNVERIFIED
- ProgressProps: type; owner progress; PASS
- ProgressTrack: function; owner progress; PASS; props: React.ComponentProps<typeof ProgressPrimitive.Track>
- ProgressValue: function; owner progress; PASS; props: React.ComponentProps<typeof ProgressPrimitive.Value>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Progress
Label 关联任务；Value 默认按真实 null 显示已有 locale 的进行中，调用方格式化内容优先。
- value: number | null. 已确认值；null 才是不定进度，不输出 aria-valuenow。
- min / max: number. 有限递增范围且分母有限；越界或不合法输入抛 RangeError。
- format / locale / getAriaValueText: Base UI Progress props. 数字格式跟随 locale（默认 UILocale）；真实 null 的默认 ARIA 文案使用现有 buttonInProgress，getAriaValueText 定制优先。
- render / ref / 原生属性: current public component props. 属性、事件与ref透传实际元素；样式由className/style调整。

### ProgressLabel
登记实际任务的可访问名称。

### ProgressValue
已确认读数保留数字格式；真实 null 默认显示本地化进行中，children 回调定制优先。

### ProgressTrack
实际进度的视觉轨道；消费独立轨厚角色。

### ProgressIndicator
已确认进度的比例；不定状态是一段移动的窄带，与确定态同形，只是位置不可知。

### ProgressPrimitive
Base UI Progress 公共原语。

## Keyboard

## Source examples
### 已确认与不定进度
Source: apps/docs/src/content/progress/demos/01-states.tsx
```tsx
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye/ui/components/progress";
import { Stack } from "@qingye/ui/components/layout";
export const meta = { title: "已确认与不定进度", titleEn: "Confirmed and indeterminate progress" };
export default function Demo() { return <Stack gap="fields" className="w-full max-w-sm">{([0,50,100,null] as const).map((value,index) => <Progress key={index} value={value}><ProgressLabel>进度</ProgressLabel><ProgressValue /><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>)}</Stack>; }
```
