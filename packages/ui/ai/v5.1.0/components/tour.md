# 新手引导 Tour

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/tour
Source: packages/ui/src/components/tour.tsx
Source SHA-256: 2b2d6f7b97214df0371feb91848cbbaa00f3fc9e2133dbb55939529ec9dcbf2c

依次指向页面上的元素并逐步说明的非阻断引导，可选聚光遮罩。

## Decision
引导只指路，不替用户完成任务，也不阻断页面：遮罩不拦截指针，只有 Esc 是退出。找不到锚点的步骤会被跳过，「第 N / M 步」的 M 只数实际能走的步数；结束后是否不再提示由应用记录。

## Notes
- 浮层是非模态 dialog，名称取自当前步骤的标题，说明取自 description。
- 步骤的 target 用函数或 ref 时，锚点晚于 Tour 出现也能被找到；缺失的步骤在开发环境给出警告。
- 开启 spotlight 后页面依然可操作；需要阻断时用 Dialog。
- 减弱动效时遮罩的洞直接到位，滚动不再平滑。

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
按 steps 顺序把浮层锚定到各步的元素；定位复用 Popover，锚点在视口外时先滚入视口。
- steps: TourStep[]. 每步含 target（元素、ref 或返回元素的函数）、title、description、side、align。锚点只在打开与换步时解析。
- open / defaultOpen: boolean; default false. 受控 / 非受控打开状态。Tour 只请求关闭，打开由应用决定。
- onOpenChange: (open, { reason }) => void. reason 为 finish、skip、escape 或 unavailable（没有任何一步的锚点可用）。
- step / defaultStep: number; default 0. 当前步在 steps 中的下标，受控 / 非受控。非受控时结束后回到起点。
- onStepChange: (step: number) => void. 换步时调用，参数是新步的下标；被跳过的步不会出现。
- onFinish / onSkip: () => void / (step) => void. 在最后一步点「完成」，或在某步点「跳过」。随后各自触发 onOpenChange。
- spotlight: boolean; default false. 在锚点处挖洞的遮罩；不拦截指针，随窗口尺寸与滚动跟随锚点。
- className: string. 追加到浮层。

## Keyboard
- ← / →: 上一步 / 下一步（RTL 下方向相反）；焦点在输入控件内时不处理。
- Esc: 退出引导并把焦点还给打开之前的位置。
- Tab / Shift+Tab: 在浮层内的按钮间移动，也可回到页面。

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
