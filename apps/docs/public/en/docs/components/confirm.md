# Confirm

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/confirm
Source: packages/ui/src/components/confirm.tsx
Source SHA-256: 872303717eb2deacb43a5c70806eebba920ac0364d71e20500f286969a60d758

Await one explicit decision, then let the caller continue.

## Decision
await confirm(options) returns approval only; true does not mean a submission succeeded. While a decision is active or closing, later calls wait in order and open after the previous one has closed; each Promise settles on its own, and false only means the decision-maker declined. Use ConfirmAction when changes to an object, version, or change must invalidate approval.

## Notes
- One decision shows per provider; the rest wait in call order, including repeated calls in one event and during closing. A waiting call can be aborted by its signal and resolves false when its hook owner or the provider unmounts.
- Unmounting the useConfirm owner cancels its own pending decision. Retained functions also resolve false after the owner unmounts.
- Approval and execution are separate: this component accepts no request callback, displays no submitting state, and infers no success, failure, or unknown outcome.
- Use ConfirmAction for exact text checks and review after object or version changes; use AlertDialog for direct composition.

## Use and ownership
- A general flow must await one explicit decision before proceeding.
- Avoid: Objects, versions, or changes can invalidate approval; use ConfirmAction.
- Avoid: Execution progress, business outcomes, or notifications belong to the application and feedback components.
- Library: One pending decision, its boolean result, cancel, abort, unmount cleanup, and modal focus.
- Application: Decision content, object versions, permissions, submission state, request outcomes, and recovery content.

## Composition
- ConfirmProvider + useConfirm; the application continues with Button loading, try/finally, and error recovery.

## Responsive behavior
- Uses AlertDialog's available space, geometry, and focus mechanisms.

## Customization
- Explicit action names, tone, public popupProps, and existing themes.

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
- One decision shows per provider; the rest wait in call order, including repeated calls in one event and during closing. A waiting call can be aborted by its signal and resolves false when its hook owner or the provider unmounts.
- Required providers: ConfirmProvider
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context ConfirmContext: without a provider throws; provided by ConfirmProvider

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ConfirmProvider
Host one modal decision for descendant useConfirm calls without adding a wrapper element. Place it inside the application's UILocaleProvider.
- children: ReactNode. Application content using useConfirm. Unmounting the provider resolves an outstanding decision to false.

### useConfirm
Return a stable confirm(options): Promise<boolean> function. Requires a ConfirmProvider.
- title / description: ReactNode / ReactNode. Required and nonempty. The title names the decision; the description keeps necessary consequences visible and accessible. Options are captured per call; mutating the original options does not replace reviewed content.
- confirmLabel / cancelLabel: ReactNode / ReactNode; default required / locale.cancel. confirmLabel is required and names what this decision does (Remove, Leave); there is no generic Confirm default, and a missing or blank value throws TypeError. Cancel and Escape resolve false; backdrop presses do not dismiss.
- tone: ButtonTone; default 'neutral'. The affirmative button's consequence tone. Pass danger explicitly when needed; tone grants no permission.
- popupProps: Omit<AlertDialogPopupProps, 'children'>. Reuse public popup render, refs, ARIA, structural layers, and focus targets. Focus starts on the safe panel and returns to the element active at the call. Supply finalFocus with a surviving parent when the entry may be removed.
- signal: AbortSignal. An already-aborted call immediately resolves false. Aborting an active decision closes it and resolves false. This cancels the decision only, not a business request already started.
- Promise<boolean>: true | false. Approval immediately resolves true and closes. Cancellation, abort, or unmounting the hook owner or provider resolves false. Business execution does not wait for an exit animation. The application owns execution and recovery through Button loading, try/finally, and inline errors.

## Keyboard
- Tab / Shift+Tab: Cycle within the active modal. Focus starts on the panel, never automatically on the affirmative action.
- Enter / Space: Activate the focused explicit choice.
- Escape: Decline this decision and return to the calling entry or finalFocus target.

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
