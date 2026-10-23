# 异步确认 Confirm

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/confirm
Source: packages/ui/src/components/confirm.tsx
Source SHA-256: 8e43b4793db49eb00f83a8c0dd6f5d00ce9ecb1212afe1499a93a869cd4990d5

等待一次明确决定，再由调用方继续执行。

## Decision
await confirm(options) 只返回是否同意；true 不表示提交成功。当前决定及退场结束前，后续调用立即返回 false，不替换内容也不排队。涉及对象、版本或变更失效时使用 ConfirmAction。

## Notes
- 同一 Provider 同刻只处理一个决定；后续调用立即 false，包含同一事件中的重复调用与退场期间。
- 调用 useConfirm 的组件卸载会取消它自己的未决决定；保留的旧函数在卸载后也只返回 false。
- 授权与执行分开：组件不接收 onConfirm 请求函数，不显示提交中，不推断成功、失败或结果未知。
- 需要文字核对、对象与版本变化后重新审阅时使用 ConfirmAction；一般组合控制使用 AlertDialog。

## Use and ownership
- 一般流程需要在继续前等待一个明确决定。
- Avoid: 对象、版本或变更会改变而需要重新审阅；使用 ConfirmAction。
- Avoid: 执行中进度、业务结果或通知；由应用和反馈组件承接。
- Library: 单个未决决定、布尔结果、取消、中止、卸载清理与模态焦点。
- Application: 决定内容、对象版本、权限、提交状态、请求结果与恢复内容。

## Composition
- ConfirmProvider + useConfirm；确认后由应用 Button loading、try/finally 与错误恢复接续。

## Responsive behavior
- 直接消费 AlertDialog 的可用空间、几何与焦点机制。

## Customization
- 明确动作名称、tone、公共 popupProps 与现有主题。

## Current exports
- ConfirmFunction: type; owner confirm; PASS
- ConfirmOptions: type; owner confirm; PASS
- ConfirmProvider: function; owner confirm; PASS; props: ConfirmProviderProps
- ConfirmProviderProps: type; owner confirm; PASS
- useConfirm: function; owner confirm; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ConfirmProvider
- `children`: `React.ReactNode`.

### useConfirm
- takes no props

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- 同一 Provider 同刻只处理一个决定；后续调用立即 false，包含同一事件中的重复调用与退场期间。
- Required providers: ConfirmProvider
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context ConfirmContext: without a provider throws; provided by ConfirmProvider

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ConfirmProvider
为后代 useConfirm 承载一个模态决定，不额外渲染包裹元素。放在应用的 UILocaleProvider 内。
- children: ReactNode. 调用 useConfirm 的应用内容；Provider 卸载时未决 Promise 返回 false。

### useConfirm
返回稳定的 confirm(options): Promise<boolean>；必须位于 ConfirmProvider 内。
- title / description: ReactNode / ReactNode. 必需且非空；标题标识决定，说明持续显示必要后果并建立可访问关联。调用时捕获选项，之后修改原 options 不替换已读内容。
- confirmLabel / cancelLabel: ReactNode / ReactNode; default locale.confirm / locale.cancel. 明确继续与保留动作；显式文字优先。取消按钮和 Escape 都返回 false；点遮罩不关闭。
- tone: ButtonTone; default 'neutral'. 确认按钮的后果色调；需要危险色时显式传 danger，不赋予权限。
- popupProps: Omit<AlertDialogPopupProps, 'children'>. 复用公共浮层的 render、ref、ARIA、承载层和焦点入口。默认聚焦安全面板，关闭回到调用时的活动元素；入口可能移除时用 finalFocus 指向仍在的上级。
- signal: AbortSignal. 已中止的调用直接 false；决定中中止会关闭并返回 false。只中止此次决定，不取消已开始的业务请求。
- Promise<boolean>: true | false. 确认立即返回 true 并关窗；取消、中止、hook 调用方或 Provider 卸载均返回 false。业务执行不等待退场动画；应用用 Button loading、try/finally 和就地错误承接执行与恢复。

## Keyboard
- Tab / Shift+Tab: 在当前模态决定内循环；默认进入面板，不自动聚焦确认按钮。
- Enter / Space: 激活当前聚焦的明确选择。
- Escape: 拒绝此次决定，返回调用入口或 finalFocus。

## Source examples
### 等待决定
Source: apps/docs/src/content/confirm/demos/01-decision.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { ConfirmProvider, useConfirm } from "@qingye_lab/ui/components/confirm";

export const meta = { title: "等待决定", titleEn: "Await a decision" };

function Decision() {
  const confirm = useConfirm();
  const [decision, setDecision] = useState<string>();
  return <div className="grid justify-items-start gap-(--qy-field-gap)">
    <Button variant="bordered" onClick={async () => {
      const approved = await confirm({ title: "离开草稿？", description: "尚未提交的内容会留在本页，离开后需要重新打开。", confirmLabel: "离开", cancelLabel: "继续编辑" });
      setDecision(approved ? "决定：离开草稿" : "决定：继续编辑");
    }}>离开草稿</Button>
    {decision && <output className="text-support text-muted-foreground">{decision}</output>}
  </div>;
}

export default function Demo() { return <ConfirmProvider><Decision /></ConfirmProvider>; }
```

### 提交与失败恢复
Source: apps/docs/src/content/confirm/demos/02-submission.tsx
```tsx
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { ConfirmProvider, useConfirm } from "@qingye_lab/ui/components/confirm";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Textarea } from "@qingye_lab/ui/components/textarea";

export const meta = { title: "提交与失败恢复", titleEn: "Submission and recovery", description: "本地控制返回完成或失败，检查忙碌状态与保留的草稿。", descriptionEn: "Choose a local completion or failure to inspect busy state and retained drafts." };

function Submission() {
  const confirm = useConfirm();
  const [draft, setDraft] = useState("保留现有记录，再加入补充说明。");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [received, setReceived] = useState("");
  const response = useRef<{ resolve: () => void; reject: (error: Error) => void } | null>(null);
  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; response.current?.reject(new Error("演示已关闭")); };
  }, []);
  return <div className="grid min-w-0 gap-(--qy-panel-gap)">
    <Field><FieldLabel>草稿内容</FieldLabel><Textarea value={draft} disabled={busy} onChange={event => setDraft(event.currentTarget.value)} /></Field>
    <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
      <Button loading={busy} onClick={async () => {
        if (!await confirm({ title: "提交这份草稿？", description: "提交本页内容，失败时保留草稿以便重试。", confirmLabel: "提交", cancelLabel: "继续编辑" })) return;
        setBusy(true); setError(""); setReceived("");
        try {
          // 本地演示由下面的返回动作完成；真实应用在此 await 自己的请求。
          await new Promise<void>((resolve, reject) => { response.current = { resolve, reject }; });
          if (mounted.current) setReceived(draft);
        } catch {
          if (mounted.current) setError("提交失败，草稿已保留。可以修改后重试。");
        } finally {
          response.current = null;
          if (mounted.current) setBusy(false);
        }
      }}>提交草稿</Button>
      <Button variant="quiet" disabled={!busy} onClick={() => response.current?.reject(new Error("本地失败"))}>返回失败</Button>
      <Button variant="quiet" disabled={!busy} onClick={() => response.current?.resolve()}>返回完成</Button>
    </div>
    {error && <Alert role="alert" tone="danger"><AlertDescription>{error}</AlertDescription></Alert>}
    {received && <output className="text-support text-muted-foreground">本地接收：{received}</output>}
  </div>;
}

export default function Demo() { return <ConfirmProvider><Submission /></ConfirmProvider>; }
```
