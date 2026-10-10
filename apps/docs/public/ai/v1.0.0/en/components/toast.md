# Toast

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/toast
Source: packages/ui/src/components/toast.tsx
Source SHA-256: 4ffcd912864b23305f72a8274032a58450e4a3bb40cd7ecb181e0c74432568e0

Report recoverable, non-critical facts while the current work continues.

## Decision
A notification does not take focus. Unknown means no reliable result; failed means a confirmed failure. Dismissal only closes the notification. Keep field errors, irreversible consequences and decisions on the task surface or in a confirmation structure.

## Notes
- Hover, focus, and window blur pause automatic disappearance.
- A notice only presents the type the application gives it and infers nothing: no timeout turns it into unknown, and waiting, in-progress, unknown and failed notices stay until the application updates them or the user closes them. loadingTimeout is removed; when a deadline is needed the application times it and calls toastManager.update(id, { type: "unknown" }).
- In tests, scope text queries to the notification region (role=region) or use data-slot=toast-title: a priority=high notice also has a visually hidden announcement copy, removed once focus enters the region.
- Ordinary success is brief by default; failure/unknown stay but can close. Important facts and recovery entries remain on the object's page.
- Viewport and anchored notices consume shared notification layers, below document candidates and critical modal actions.

## Use and ownership
- Supplementary noncritical, recoverable facts without interrupting current work.
- Avoid: Notifications for every error, critical consequences only in closable messages, or completion declared when a request is merely sent.
- Library: Accessible primitives, presentation, closing, pauses, and keeping persistent states on screen.
- Application: Objects, actual outcomes, any waiting deadline and when a result counts as unknown, priority, business cancellation, verification, and retry.

## Composition
- One id connects waiting and outcomes; object pages retain failure, unknown, and verification entries.

## Responsive behavior
- Retains existing narrow control tokens; this page acceptance checked desktop ≥1100px only.

## Customization
- Existing style roles; duration/placement are choices or presets. motion.css fades in at the same position and exits immediately; text remains meaningful with reduced motion.

## Current exports
- anchoredToastManager: const; owner toast; PASS
- AnchoredToastProvider: function; owner toast; PASS; props: AnchoredToastProviderProps
- AnchoredToastProviderProps: interface; owner toast; PASS
- toastManager: const; owner toast; PASS
- ToastPosition: type; owner toast; PASS
- ToastPrimitive: reexport; owner toast; alias of Toast; UNVERIFIED
- ToastProvider: function; owner toast; PASS; props: ToastProviderProps
- ToastProviderProps: interface; owner toast; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ToastProvider
Mount once per notification channel.
- position: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"; default "bottom-right". Notification region placement.
- timeout: number; default 5000. Reading duration for ordinary/success notices; zero keeps them visible.
- limit: number; default 3. The primitive limits visible entries; overflow roots are hidden/inert. They cannot carry the only critical outcome.
- toastManager: Return value of ToastPrimitive.createToastManager(). Optional independent notification channel; omission uses the exported global manager.
- portalProps: ToastPrimitive.Portal.Props. Custom Portal containers, direction, language, and other attributes.

### toastManager.add(options)
Returns an id. Reusing an id updates in place.
- title / description: ReactNode. Objects, outcomes, and necessary recovery context.
- type: string. waiting/in-progress/unknown/failed/success; retains loading as in-progress, error as failed, info, and warning.
- timeout: number. Failure/unknown/waiting/in-progress remain persistent; other types close after their specified duration.
- priority: "low" | "high"; default "low". low uses polite status; high uses primitive alert. Failure never automatically interrupts announcements. For high the primitive adds a visually hidden alert copy outside the notification region for immediate announcement, so the title and description each exist twice in the DOM.
- actionProps: React.ComponentPropsWithoutRef<'button'>. Applications supply actions and actual handlers, invoked once; recovery entries remain on the page.
- data.rootProps: Forwardable ToastPrimitive.Root.Props. Forward id, ARIA, events, style, render, and refs, excluding children/className/toast/swipeDirection.

### toastManager.update(id, options)
Update the same object with actual outcomes. Specify timeout when leaving a persistent state; Promise success automatically restores Provider duration.

### toastManager.promise(promise, { loading, success, error })
In-progress becomes actual success/failure on the same notice. The notice sets no deadline and infers no outcome: it stays in progress however long it takes, until the promise settles or the application updates it. When a response is lost the application changes the notice to unknown; network rejection is not a business failure.

### toastManager.close(id?)
Close a specified notice or all notices without canceling or undoing business tasks.

### AnchoredToastProvider / anchoredToastManager
A separate channel for local notices; positionerProps.anchor identifies the associated element. data.tooltipStyle tightens internal spacing while retaining complete explanation and closing.

### ToastPrimitive
Base UI Toast primitive namespace; useToastManager manages the owning Provider channel.

## Keyboard
- F6: Deliberately enter the notification region.
- Tab: Reach notice actions/closing; focus pauses disappearance timing.
- Esc: Close the focused notice and return to the original focus.

## Source examples
### 类型
Source: apps/docs/src/content/toast/demos/01-types.tsx
```tsx
import { useEffect, useId } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { toastManager } from "@qingye_lab/ui/components/toast";

export const meta = { title: "类型", titleEn: "Types" };

const types = [
  ["info", "信息"],
  ["warning", "提醒"],
  ["waiting", "等待"],
  ["in-progress", "进行中"],
  ["unknown", "结果未知"],
  ["failed", "失败"],
  ["success", "成功"],
] as const;

export default function Demo() {
  const id = useId();
  useEffect(() => () => toastManager.close(id), [id]);
  return (
    <div className="flex gap-(--qy-action-gap)">
      {types.map(([type, label]) => (
        <Button key={type} variant="bordered" onClick={() => toastManager.add({ id, type, title: label, timeout: 5000 })}>
          {label}
        </Button>
      ))}
    </div>
  );
}
```

### 正文
Source: apps/docs/src/content/toast/demos/02-default.tsx
```tsx
import { useEffect, useId } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { toastManager } from "@qingye_lab/ui/components/toast";

export const meta = { title: "正文", titleEn: "Content" };

export default function Demo() {
  const id = useId();
  useEffect(() => () => toastManager.close(id), [id]);
  return (
    <div className="flex gap-(--qy-action-gap)">
      <Button variant="bordered" onClick={() => toastManager.add({ id, title: "青野 Qingye UI", timeout: 5000 })}>短文字</Button>
      <Button variant="bordered" onClick={() => toastManager.add({
        id,
        title: "青野 Qingye UI · Button / Input / Textarea / Popover / Tooltip / Toast",
        description: "按钮、输入框、多行输入、浮起面板、文字提示与通知。中文标点：，。；！？",
        timeout: 5000,
      })}>长文字</Button>
    </div>
  );
}
```

### 操作
Source: apps/docs/src/content/toast/demos/03-action.tsx
```tsx
import { useEffect, useId, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { toastManager } from "@qingye_lab/ui/components/toast";

export const meta = { title: "操作", titleEn: "Action" };

export default function Demo() {
  const id = useId();
  const [count, setCount] = useState(0);
  useEffect(() => () => toastManager.close(id), [id]);
  return (
    <div className="flex items-center gap-(--qy-action-gap)">
      <Button variant="bordered" onClick={() => toastManager.add({
        id,
        title: "带操作的通知",
        actionProps: { children: "加一", onClick: () => setCount((value) => value + 1) },
      })}>显示通知</Button>
      <output aria-live="polite" className="text-body">计数：{count}</output>
    </div>
  );
}
```

### 更新与关闭
Source: apps/docs/src/content/toast/demos/04-update.tsx
```tsx
import { useEffect, useId, useRef } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { ToastPrimitive } from "@qingye_lab/ui/components/toast";

export const meta = { title: "更新与关闭", titleEn: "Update and close" };

export default function Demo() {
  const id = useId();
  const manager = ToastPrimitive.useToastManager();
  const currentManager = useRef(manager);
  currentManager.current = manager;
  useEffect(() => () => currentManager.current.close(id), [id]);
  const visible = manager.toasts.some((notice) => notice.id === id);
  return (
    <div className="flex gap-(--qy-action-gap)">
      <Button variant="bordered" onClick={() => manager.add({ id, title: "通知", timeout: 0 })}>显示</Button>
      <Button variant="bordered" disabled={!visible} onClick={() => manager.update(id, { title: "文字已更新" })}>更新</Button>
      <Button variant="quiet" disabled={!visible} onClick={() => manager.close(id)}>关闭</Button>
    </div>
  );
}
```

### 堆叠
Source: apps/docs/src/content/toast/demos/05-stack.tsx
```tsx
import { useEffect, useRef } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { toastManager } from "@qingye_lab/ui/components/toast";

export const meta = { title: "堆叠", titleEn: "Stack" };

export default function Demo() {
  const count = useRef(0);
  const ids = useRef<string[]>([]);
  useEffect(() => () => ids.current.forEach((id) => toastManager.close(id)), []);
  return (
    <Button variant="bordered" onClick={() => {
      count.current += 1;
      ids.current.push(toastManager.add({ title: `通知 ${count.current}`, timeout: 5000 }));
    }}>添加通知</Button>
  );
}
```

### 关联入口
Source: apps/docs/src/content/toast/demos/06-anchored.tsx
```tsx
import { useEffect, useId, useRef } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { AnchoredToastProvider, ToastPrimitive } from "@qingye_lab/ui/components/toast";

export const meta = { title: "关联入口", titleEn: "Anchored notification" };

function Notices() {
  const id = useId();
  const manager = ToastPrimitive.useToastManager();
  const currentManager = useRef(manager);
  currentManager.current = manager;
  const normalAnchor = useRef<HTMLButtonElement>(null);
  const compactAnchor = useRef<HTMLButtonElement>(null);
  useEffect(() => () => {
    currentManager.current.close(`${id}-normal`);
    currentManager.current.close(`${id}-compact`);
  }, [id]);
  return (
    <div className="flex gap-(--qy-action-gap)">
      <Button ref={normalAnchor} variant="bordered" onClick={() => manager.add({
        id: `${id}-normal`,
        title: "关联通知",
        positionerProps: { anchor: normalAnchor.current },
      })}>普通</Button>
      <Button ref={compactAnchor} variant="bordered" onClick={() => manager.add({
        id: `${id}-compact`,
        title: "关联提示",
        positionerProps: { anchor: compactAnchor.current },
        data: { tooltipStyle: true },
      })}>紧凑</Button>
    </div>
  );
}

export default function Demo() {
  return <AnchoredToastProvider><Notices /></AnchoredToastProvider>;
}
```
