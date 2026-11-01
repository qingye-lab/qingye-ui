# Progress

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/progress
Source: packages/ui/src/components/progress.tsx
Source SHA-256: 7a3b24ee301227032c1bfbb846e94f5949e7fc9578d5f0279700a65277c1accb

Confirmed task completion or an explicit indeterminate state.

## Decision
Animation and time establish no completion fact. Zero differs from null. A discrete quantity uses segments: the gaps are transparent cuts made by a mask, not a painted color, and the value must sit on a cell boundary, never half a cell. When the value changes the fill travels to its new length (nothing animates on first render; with reduced motion or keyboard input it lands at once). The move is feedback, not a completion fact.

## Notes
- Stage a long task by what is known: submitted but uncountable uses value={null}, processing counts confirmed items, and afterwards an Alert states completion or partial failure, lists the failed items and offers a retry. The bar does not carry the outcome.

## Use and ownership
- A reliable completion ratio exists, or work is known to be underway without a ratio.
- Avoid: Animation and time establish no completion fact. Zero differs from null.
- Library: Native semantics, public composition, and centralized roles.
- Application: Objects, content, values, states, and request outcomes.

## Composition
- Label names the task; Value defaults to localized in-progress for actual null, with caller formatting taking precedence.
- A stage bar of n levels uses segments={n}; stage names come from getAriaValueText or aria-valuetext, for example "Fourth instar, stage 4 of 7".

## Responsive behavior
- Task names and formatted readings wrap; an independent progress role controls track thickness.

## Customization
- Public render/refs, ARIA, events, and styles; keep theme axes independent.

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
Label names the task; Value defaults to localized in-progress for actual null, with caller formatting taking precedence.
- value: number | null. Confirmed value; only null is indeterminate and omits aria-valuenow.
- min / max: number. A finite increasing range with a finite denominator; invalid or out-of-range values throw RangeError.
- segments: number. A discrete scale of n levels: the track splits into n equal cells with a 2px transparent gap. n is an integer of 2 or more; value cannot be null and (value − min) must be a whole multiple of (max − min)/n, otherwise RangeError is thrown. Name stages with getAriaValueText.
- format / locale / getAriaValueText: Base UI Progress props. Number formatting follows locale, defaulting to UILocale. Actual null uses existing buttonInProgress ARIA text; getAriaValueText takes precedence.
- render / ref / native props: current public component props. Forward attributes, events, and refs to the actual element; adjust presentation through className/style.

### ProgressLabel
Registers the actual task's accessible name.

### ProgressValue
Confirmed readings retain number formatting; actual null defaults to localized in-progress, with a children callback taking precedence.

### ProgressTrack
The visual progress track consumes an independent thickness role.

### ProgressIndicator
Confirmed progress ratio; the indeterminate state is a moving narrow band with the same form as determinate progress, only its position unknown.

### ProgressPrimitive
Public Base UI Progress primitive.

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
