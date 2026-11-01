# Tour

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/tour
Source: packages/ui/src/components/tour.tsx
Source SHA-256: add2cb8a6f949f9311df5c9e87450d71245d3caf1742edad83564a2edcb9e35b

A non-modal, step-by-step guide that points at page elements one after another, with an optional spotlight.

## Decision
A tour only points the way: it neither does the task for the user nor blocks the page. The mask does not intercept the pointer and only Escape exits. Steps without an anchor are skipped, and M in "Step N of M" counts only the steps that can be shown. The application records whether the tour should not appear again.

## Notes
- The popup is a non-modal dialog named by the current step's title and described by its description.
- Function and ref targets are found even when the anchor appears after Tour mounts. Missing steps warn in development.
- The page stays operable with spotlight on. Use Dialog when blocking is needed.
- With reduced motion the cutout jumps into place and scrolling is no longer smooth.

## Use and ownership
- 首次使用时依次指出几处关键入口。
- Avoid: 把必须完成的操作放进引导；用遮罩阻断页面；步数过多。
- Library: 当前步、可用步的解析与跳过、焦点移入与返回、定位。
- Application: 何时开始、是否已看过、受控的 open 与 step。

## Composition
- 锚点是页面上已有的元素；Tour 只持有当前步与打开请求，不改动锚点。

## Responsive behavior
- 浮层宽度受可用宽度限制；锚点在视口外时先滚入。

## Customization
- 浮层宽度与方向可调；遮罩外扩与圆角随系统尺度，不单设令牌。

## Current exports
- Tour: function; owner tour; PASS; props: TourProps
- TourCloseReason: type; owner tour; PASS
- TourOpenChangeDetails: interface; owner tour; PASS
- TourProps: interface; owner tour; PASS
- TourStep: interface; owner tour; PASS
- TourTarget: type; owner tour; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Tour
- `className?`: `string`.
- `defaultOpen?`: `boolean`.
- `defaultStep?`: `number`.
- `onFinish?`: `() => void`. 在最后一步点「完成」。随后 onOpenChange(false, { reason: "finish" })。
- `onOpenChange?`: `(open: boolean, details: TourOpenChangeDetails) => void`. 引导请求关闭时调用；应用决定受控状态。打开由应用负责，Tour 自己不会请求打开。
- `onSkip?`: `(step: number) => void`. 点「跳过」，参数是跳过时所在步骤的下标。随后 onOpenChange(false, { reason: "skip" })。
- `onStepChange?`: `(step: number) => void`. 换步时调用，参数是新步骤在 `steps` 中的下标（被跳过的步骤不会出现）。
- `open?`: `boolean`. 受控 / 非受控打开状态。
- `spotlight?`: `boolean`. 在锚点处挖洞的聚光遮罩；遮罩不拦截指针，引导始终是非阻断的。默认不显示。
- `step?`: `number`. 当前步骤在 `steps` 中的下标（受控 / 非受控）。
- `steps`: `readonly TourStep[]`. 按顺序的引导步骤。步数与顺序在打开期间视为固定；锚点只在打开与换步时解析。

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, react-dom, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context FloatingLayerContext: without a provider default-value; provided by FloatingLayerScope

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Tour
Anchors a popup to each step's element in order, reusing Popover positioning. Scrolls the anchor into view first when it is outside the viewport.
- steps: TourStep[]. Each step has target (element, ref or function returning an element), title, description, side and align. Anchors are resolved on open and on step change.
- open / defaultOpen: boolean; default false. Controlled / uncontrolled open state. Tour only requests closing; the application decides to open.
- onOpenChange: (open, { reason }) => void. reason is finish, skip, escape or unavailable (no step has a usable anchor).
- step / defaultStep: number; default 0. Index of the current step in steps, controlled / uncontrolled. An uncontrolled step returns to the start after the tour ends.
- onStepChange: (step: number) => void. Called with the new step index; skipped steps never appear.
- onFinish / onSkip: () => void / (step) => void. Called on Done at the last step or Skip at any step, each followed by onOpenChange.
- spotlight: boolean; default false. A mask with a cutout at the anchor. It does not intercept the pointer and follows window size and scroll.
- className: string. Appended to the popup.

## Keyboard
- ← / →: Previous / next step (reversed in RTL). Ignored while focus is in an input control.
- Esc: Exit the tour and return focus to where it was before opening.
- Tab / Shift+Tab: Move between the popup's buttons, or back to the page.

## Source examples
### 分步引导
Source: apps/docs/src/content/tour/demos/01-basic.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Tour, type TourStep } from "@qingye_lab/ui/components/tour";

export const meta = { title: "分步引导", titleEn: "Step by step" };

const steps: TourStep[] = [
  { target: () => document.getElementById("tour-basic-new"), title: "新建", description: "从这里开始一份新的内容。" },
  { target: () => document.getElementById("tour-basic-import"), title: "导入", description: "把已有的文件带进来。" },
  { target: () => document.getElementById("tour-basic-share"), title: "分享", description: "完成后交给其他人。", side: "top" },
];

export default function Demo() {
  const [open, setOpen] = useState(false);
  return (
    <Inline gap="actions">
      <Button id="tour-basic-new" variant="bordered">新建</Button>
      <Button id="tour-basic-import" variant="bordered">导入</Button>
      <Button id="tour-basic-share" variant="bordered">分享</Button>
      <Button variant="quiet" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour steps={steps} open={open} onOpenChange={next => setOpen(next)} />
    </Inline>
  );
}
```

### 聚光遮罩
Source: apps/docs/src/content/tour/demos/02-spotlight.tsx
```tsx
import { useRef, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Tour } from "@qingye_lab/ui/components/tour";

export const meta = { title: "聚光遮罩", titleEn: "Spotlight" };

export default function Demo() {
  const first = useRef<HTMLButtonElement>(null);
  const second = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  return (
    <Inline gap="actions">
      <Button ref={first} variant="bordered">筛选</Button>
      <Button ref={second} variant="bordered">排序</Button>
      <Button variant="quiet" onClick={() => setOpen(true)}>开始引导</Button>
      <Tour
        spotlight
        open={open}
        onOpenChange={next => setOpen(next)}
        steps={[
          { target: first, title: "筛选", description: "缩小范围。" },
          { target: second, title: "排序", description: "调整先后。" },
        ]}
      />
    </Inline>
  );
}
```

### 受控的步骤与结束
Source: apps/docs/src/content/tour/demos/03-controlled-step.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Tour, type TourStep } from "@qingye_lab/ui/components/tour";

export const meta = { title: "受控的步骤与结束", titleEn: "Controlled step and ending" };

const steps: TourStep[] = [
  { target: () => document.getElementById("tour-controlled-a"), title: "第一处" },
  { target: () => document.getElementById("tour-controlled-b"), title: "第二处" },
  { target: () => document.getElementById("tour-controlled-missing"), title: "不在页面上的一步" },
];

export default function Demo() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [result, setResult] = useState("尚未开始");
  return (
    <Inline gap="actions">
      <Button id="tour-controlled-a" variant="bordered">甲</Button>
      <Button id="tour-controlled-b" variant="bordered">乙</Button>
      <Button variant="quiet" onClick={() => { setStep(0); setOpen(true); }}>开始引导</Button>
      <span className="text-body text-muted-foreground" role="status">{result}</span>
      <Tour
        steps={steps}
        open={open}
        step={step}
        onStepChange={setStep}
        onOpenChange={(next, { reason }) => {
          setOpen(next);
          if (!next) setResult(reason === "finish" ? "已完成" : reason === "skip" ? "已跳过" : "已退出");
        }}
      />
    </Inline>
  );
}
```
