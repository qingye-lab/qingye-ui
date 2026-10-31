# 进度 Progress

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/progress
Source: packages/ui/src/components/progress.tsx
Source SHA-256: 7a3b24ee301227032c1bfbb846e94f5949e7fc9578d5f0279700a65277c1accb

表达可靠分母的任务进度或明确不定状态。

## Decision
动画和时间不能提供完成事实；0 与 null 不同。离散的量用 segments 分格：空隙是遮罩切出的透明缝，不画底色；值必须落在格边界上，不显示半格。

## Notes
- 长任务按事实分阶段：已提交但无法计数用 value={null}，处理中数已确认的项，结束后用 Alert 说明完成或部分失败，列出失败项并给「重试失败项」。进度条不承担结果说明。

## Use and ownership
- 有可靠完成比例，或已知正在进行但缺少比例。
- Avoid: 动画和时间不能提供完成事实；0 与 null 不同。
- Library: 原生语义、公共组合与集中角色。
- Application: 对象、内容、值、状态与请求结果。

## Composition
- Label 关联任务；Value 默认按真实 null 显示已有 locale 的进行中，调用方格式化内容优先。
- 总共 n 级的阶段条用 segments={n}；阶段名由 getAriaValueText 或 aria-valuetext 给出，例如「四龄，第 4 / 7 阶段」。

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Progress
- `segments?`: `number`. 这个量是离散的 n 级时，轨道按 n 个等宽格分开（n 为 2 以上的整数）。值必须落在格的边界上， 且不能为 null（不定进度没有格可填）。格间空隙是透明的，规则见 utilities.css 的读数轨道分格。
- plus 284 inherited (@types/react 274, @base-ui/react 10); not expanded, see the installed declarations

### ProgressIndicator
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ProgressLabel
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ProgressTrack
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ProgressValue
- no props declared by this library
- plus 278 inherited (@types/react 274, @base-ui/react 4); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Progress
Label 关联任务；Value 默认按真实 null 显示已有 locale 的进行中，调用方格式化内容优先。
- value: number | null. 已确认值；null 才是不定进度，不输出 aria-valuenow。
- min / max: number. 有限递增范围且分母有限；越界或不合法输入抛 RangeError。
- segments: number. 离散的 n 级：轨道按 n 个等宽格分开，格间留 2px 透明空隙。n 为 2 以上的整数；value 不能为 null，且 (value − min) 必须是 (max − min)/n 的整数倍，否则抛 RangeError。阶段名用 getAriaValueText 给出。
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
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye_lab/ui/components/progress";
import { Stack } from "@qingye_lab/ui/components/layout";
export const meta = { title: "已确认与不定进度", titleEn: "Confirmed and indeterminate progress" };
export default function Demo() { return <Stack gap="fields" className="w-full max-w-sm">{([0,50,100,null] as const).map((value,index) => <Progress key={index} value={value}><ProgressLabel>进度</ProgressLabel><ProgressValue /><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>)}</Stack>; }
```

### 离散的阶段
Source: apps/docs/src/content/progress/demos/02-segments.tsx
```tsx
import { Stack } from "@qingye_lab/ui/components/layout";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye_lab/ui/components/progress";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "离散的阶段", titleEn: "Discrete stages" } satisfies DemoMeta;
const stages = ["一龄", "二龄", "三龄", "四龄", "五龄", "上蔟", "结茧"];
const text = (value: number | null) => value === null ? "" : `${stages[value - 1]}，第 ${value} / 7 阶段`;
export default function Demo() {
  return <Stack gap="fields" className="w-full max-w-sm">{[1, 4, 7].map(value => <Progress key={value} value={value} min={0} max={7} segments={7} getAriaValueText={(_, actual) => text(actual)}><ProgressLabel>蚕龄</ProgressLabel><ProgressValue>{(_, actual) => text(actual)}</ProgressValue><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>)}</Stack>;
}
```

### 批量任务：提交、处理、完成或部分失败
Source: apps/docs/src/content/progress/demos/03-batch-task.tsx
```tsx
import { useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye_lab/ui/components/progress";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "批量任务：提交、处理、完成或部分失败", titleEn: "Batch task: submitted, processing, done or partly failed", description: "用已有组件组合长任务的各阶段；下方按钮代替服务端返回。", descriptionEn: "Stages of a long task composed from existing components; the buttons below stand in for server replies." } satisfies DemoMeta;

type Item = "waiting" | "done" | "failed";
const total = 6;

export default function Demo() {
  // 任务事实由应用持有：已提交与否、每一项的结果。进度读数只数已确认的项，不用时间推断。
  const [items, setItems] = useState<Item[] | null>(null);
  const settled = items?.filter(item => item !== "waiting").length ?? 0;
  const failed = items?.flatMap((item, index) => item === "failed" ? [index + 1] : []) ?? [];
  const finished = items !== null && settled === total;
  const running = items !== null && !finished;
  const reply = (result: Item) => setItems(current => {
    if (!current) return current;
    const next = [...current];
    const index = next.indexOf("waiting");
    if (index >= 0) next[index] = result;
    return next;
  });
  return <Stack className="w-full max-w-sm">
    <Inline>
      <Button loading={running} disabled={items !== null && !running} onClick={() => setItems(Array<Item>(total).fill("waiting"))}>开始导入</Button>
      <Button variant="quiet" disabled={!running} onClick={() => reply("done")}>返回一项成功</Button>
      <Button variant="quiet" disabled={!running} onClick={() => reply("failed")}>返回一项失败</Button>
    </Inline>
    {items && <Progress value={settled === 0 ? null : settled} max={total} getAriaValueText={(_, actual) => actual === null ? "已提交，等待处理" : `已处理 ${actual} / ${total} 项`}>
      <ProgressLabel>导入</ProgressLabel>
      <ProgressValue>{(_, actual) => actual === null ? "已提交，等待处理" : `${actual} / ${total}`}</ProgressValue>
      <ProgressTrack><ProgressIndicator /></ProgressTrack>
    </Progress>}
    {finished && failed.length === 0 && <Alert tone="success" role="status"><AlertDescription>{total} 项已全部处理。</AlertDescription></Alert>}
    {finished && failed.length > 0 && <Alert tone="warning" role="alert">
      <Stack gap="field">
        <AlertTitle>{total - failed.length} 项已处理，{failed.length} 项失败</AlertTitle>
        <AlertDescription>已处理的项不会重复提交。</AlertDescription>
        <ul className="m-0 grid list-none gap-(--qy-field-gap) p-0 text-body">{failed.map(position => <li key={position}>第 {position} 项</li>)}</ul>
        <Inline><Button variant="bordered" onClick={() => setItems(current => current && current.map(item => item === "failed" ? "waiting" : item))}>重试失败项</Button></Inline>
      </Stack>
    </Alert>}
  </Stack>;
}
```
