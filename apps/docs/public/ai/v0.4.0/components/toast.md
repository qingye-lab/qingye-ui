# 通知 Toast

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/toast
Source: packages/ui/src/components/toast.tsx
Source SHA-256: 59e04532dff441f50f345231a1a7d3c9c06c03c9f59deb5abdf2a99d7ac80edc

补充可恢复、非关键的操作事实，保持当前工作不中断。

## Use and ownership
- 非关键、可恢复、无需打断当前工作的补充事实。
- Avoid: 所有错误都用通知；关键后果只留在可关闭消息里；请求发出就宣布完成。
- Library: 可访问原语、呈现、关闭、暂停、等待期限与长期状态。
- Application: 对象、真实结果、优先级、业务取消、核对和重试。

## Composition
- 同一 id 连接等待和结果；对象页面保留失败、未知与核对入口。

## Responsive behavior
- 组件保留已有控件 narrow token；本次页面验证仅桌面≥1100px。

## Customization
- 样式使用既有角色；时限与位置是选择/预设。入场由 motion.css 原位淡入、退出即时，减少动态效果后文字仍成立。

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
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ToastProvider
同一通知通道挂载一次。
- position: "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right"; default "bottom-right". 通知区域的位置。
- timeout: number; default 5000. 普通通知与成功的阅读时限，0 为持续显示。
- loadingTimeout: number; default 30000. 1—2147483647 的整数毫秒。等待/进行中到期仅转为持续 unknown，不推断后台结果；悬停不延长结果期限。
- limit: number; default 3. 原语限制可见条数，超额根隐藏且 inert；不能作为关键结果的唯一承载。
- toastManager: ToastPrimitive.createToastManager() 的返回值. 可选的独立通知通道；省略时用导出的全局 manager。
- portalProps: ToastPrimitive.Portal.Props. 自定义 Portal 容器、方向和语言等属性。

### toastManager.add(options)
返回 id。相同 id 原位更新。
- title / description: ReactNode. 对象、结果与必要恢复依据。
- type: string. waiting / in-progress / unknown / failed / success；保留 loading（进行中）、error（失败）、info 与 warning。
- timeout: number. 失败/未知/等待/进行中强制持续显示，其他类型按指定时限关闭。
- priority: "low" | "high"; default "low". low 使用礼貌 status；high 使用原语 alert。失败不自动打断播报。
- actionProps: React.ComponentPropsWithoutRef<'button'>. 应用提供操作与真实处理器，只执行一次；恢复落点仍留在页面。
- data.rootProps: ToastPrimitive.Root.Props 的可透传部分. 透传 id、ARIA、事件、style、render 与 ref，不接管 children/className/toast/swipeDirection。

### toastManager.update(id, options)
用真实结果更新同一对象。离开持续状态时显式指定 timeout；Promise 成功自动恢复 Provider 时限。

### toastManager.promise(promise, { loading, success, error })
进行中→真实成功/失败；超期先转未知，迟到结果继续更新同一条。响应丢失须由应用保留未知，不能将网络拒绝当业务失败。

### toastManager.close(id?)
关闭指定/全部通知，不取消或撤销业务任务。

### AnchoredToastProvider / anchoredToastManager
局部通知单独通道；positionerProps.anchor 指向关联元素。data.tooltipStyle 收紧内缘，完整说明与关闭仍保留。

### ToastPrimitive
Base UI Toast 原语命名空间；useToastManager 可管理所在 Provider 通道。

## Keyboard
- F6: 主动进入通知区域。
- Tab: 到达通知操作与关闭，聚焦时暂停消失计时。
- Esc: 关闭聚焦通知并返回原焦点。

## Source examples
### 类型
Source: apps/docs/src/content/toast/demos/01-types.tsx
```tsx
import { useEffect, useId } from "react";
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

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
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

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
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

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
import { Button } from "@qingye/ui/components/button";
import { ToastPrimitive } from "@qingye/ui/components/toast";

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
import { Button } from "@qingye/ui/components/button";
import { toastManager } from "@qingye/ui/components/toast";

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
import { Button } from "@qingye/ui/components/button";
import { AnchoredToastProvider, ToastPrimitive } from "@qingye/ui/components/toast";

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

