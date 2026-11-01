# ConfirmAction

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/confirm-action
Source: packages/ui/src/components/confirm-action.tsx
Source SHA-256: f06004bed955d140e115ce34060d56d54831d3dbc8d17efe55605ec8fb1a643d

Confirm a specific object, version, and change; review again when content changes.

## Decision
Confirmation targets the reviewed opening snapshot. Changed identity, version, change, or consequence invalidates prior approval. Reviewing again clears confirmation text. onConfirm is a request; resolving a Promise neither infers success nor closes the dialog.

## Notes
- Restoring old content does not revive old approval; review again.
- The application owns action attempts and outcomes. There is no custom timeout, fake success, or automatic retry.
- Layering, sizes, focus, and consequence association use current public components and centralized presets.
- Use ConfirmProvider + useConfirm for a general awaited boolean decision; retain this component for object, version, and change protection.
- While a request is in flight the dialog cannot be closed (not by Esc, outside press or Back); once the result arrives, the application decides when to close it. This component does not keep failed objects or their reasons, and they do not return once the dialog closes: the application should write them to the page before closing (an Alert listing which objects failed and why, with retry or dismiss) and keep them until the user deals with them. See "Failures stay on the page".

## Use and ownership
- Confirm a specific object, version, and change; review again when content changes.
- Avoid: Do not substitute styling for semantics; distinguish empty, unknown, and zero values.
- Library: Open state, reviewed snapshot, invalidation notice, and optional confirmation input.
- Application: Objects, versions, changes, permissions, action states, and outcomes.

## Composition
- ConfirmAction + explicit snapshot/text + application loading/onConfirm; express the result with Alert or Toast.

## Responsive behavior
- Five matching control/text profiles; the modal consumes shared space and focus mechanisms.

## Customization
- Public part props, children, and existing theme roles.

## Current exports
- ConfirmAction: function; owner confirm-action; PASS; props: ConfirmActionProps
- ConfirmActionPrimitive: reexport; owner confirm-action; alias of AlertDialogPrimitive; UNVERIFIED
- ConfirmActionProps: type; owner confirm-action; PASS
- ConfirmActionSnapshot: type; owner confirm-action; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ConfirmAction
- `actionLabel`: `React.ReactNode`.
- `children?`: `React.ReactNode`.
- `confirmationLabel?`: `React.ReactNode`.
- `confirmationText?`: `string`.
- `confirmProps?`: `Omit<ButtonProps, "children" | "loading" | "disabled" | "tone">`.
- `disabled?`: `boolean`.
- `inputProps?`: `Omit<InputProps, "value" | "defaultValue" | "type" | "name" | "form" | "disabled" | "readOnly" | "size" | "onValueChange">`.
- `loading?`: `boolean`. 请求已发出、结果未到：两枚按钮都表示忙碌并挡住再次请求，对话框也不能被关闭（Esc、点外部、返回都不行）——关闭会让读者以为请求已取消。结果由应用用提示组件表达。
- `onConfirm`: `(snapshot: ConfirmActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void`.
- `popupProps?`: `AlertDialogPopupProps`.
- `snapshot`: `ConfirmActionSnapshot`.
- `title`: `React.ReactNode`.
- `tone?`: `"neutral" | "danger"`.
- `triggerLabel`: `React.ReactNode`.
- `triggerProps?`: `Omit<ButtonProps, "children" | "loading" | "disabled">`.
- plus 8 inherited (@base-ui/react 8); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Use ConfirmProvider + useConfirm for a general awaited boolean decision; retain this component for object, version, and change protection.
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ConfirmAction
A confirmation composition of AlertDialog and optional Field/Input; the consequence is the dialog's description.
- snapshot: { objectId: string; objectLabel: string; version: string | number; change: string; consequence: string }. All fields are required and meaningful; comparisons include every field. Opening captures an immutable copy. Confirmation receives only a reviewed copy that still matches current facts.
- title / triggerLabel / actionLabel: ReactNode. The caller names the real object and action. Consequences remain visible and linked to confirmation.
- onConfirm: (snapshot, event) => void. Request only: no network, result ownership, or automatic closing. The application expresses a pending request through loading, and permissions, failure and unknown results through feedback components in children.
- loading / disabled: boolean / boolean; default false / false. loading means the request is sent and its result has not arrived: both the entry and the confirm action show busy and block another request, keeping Button's focusable ARIA-disabled behavior; explicit disabled is native. Back only closes this UI.
- confirmationText / confirmationLabel: string / ReactNode. Optional exact text match with a required visible label. FieldDescription shows the expected text. Reviewing or reopening clears prior input.
- open / defaultOpen / onOpenChange: AlertDialog public props. Controlled or uncontrolled opening. onOpenChange details.cancel() can reject it; the controlled caller decides opening and closing.
- tone: ButtonTone; default 'danger'. The confirmation input follows the one fill-control geometry (density axis); action buttons keep Button size steps because size expresses position. Tone expresses consequences without granting permission.
- triggerProps / confirmProps / inputProps / popupProps: Current public component props. Customize real outlets' render, refs, ARIA, and events. Canceling confirmProps.onClick blocks a request. The entry only opens the confirmation; the dialog states the consequence.
- children: ReactNode. Additional real review content or application-provided state and recovery outlets in the panel.

### ConfirmActionPrimitive
The installed AlertDialog primitive namespace.

## Keyboard
- Enter / Space: Open confirmation or request the current snapshot; invalidated and blocked states do not activate.
- Tab / Shift+Tab: Move through the real modal, confirmation input, and actions.
- Escape / Back: Leave confirmation and return to its trigger without implying background cancellation.

## Source examples
### 当前快照
Source: apps/docs/src/content/confirm-action/demos/01-snapshot.tsx
```tsx
import { useState } from "react";
import { ConfirmAction, type ConfirmActionSnapshot } from "@qingye_lab/ui/components/confirm-action";
export const meta = { title: "当前快照", titleEn: "Current snapshot" };
const snapshot = { objectId: "A", objectLabel: "A", version: 1, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };
export default function Demo() {
  const [requested, setRequested] = useState<ConfirmActionSnapshot>();
  return <ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" confirmationText="A" confirmationLabel="输入 A" onConfirm={setRequested}>
    {requested && <output className="text-support text-muted-foreground">请求：{requested.objectLabel} · {requested.version}</output>}
  </ConfirmAction>;
}
```

### 请求中
Source: apps/docs/src/content/confirm-action/demos/02-outcome.tsx
```tsx
import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";

export const meta = { title: "请求中", titleEn: "Requesting" };

const snapshot = { objectId: "A", objectLabel: "A", version: 1, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };

// 请求发出后两枚按钮都表示忙碌并挡住再次请求；控件不以超时或动画宣布结果。
export default function Demo() {
  return <ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" loading onConfirm={() => {}} />;
}
```

### 版本变化后重新核对
Source: apps/docs/src/content/confirm-action/demos/03-version.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Inline } from "@qingye_lab/ui/components/layout";
import { ConfirmAction, type ConfirmActionSnapshot } from "@qingye_lab/ui/components/confirm-action";
export const meta = { title: "版本变化后重新核对", titleEn: "Re-review after a version change" };
export default function Demo() {
  const [version, setVersion] = useState(1);
  const [requested, setRequested] = useState<ConfirmActionSnapshot>();
  const snapshot = { objectId: "A", objectLabel: "A", version, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };
  return <Inline><ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" confirmationText="A" confirmationLabel="输入 A" onConfirm={setRequested}>
    <div className="flex flex-wrap items-center gap-(--qy-action-gap)"><Button variant="quiet" onClick={() => setVersion(value => value + 1)}>版本 +1</Button>{requested && <output className="text-support text-muted-foreground">请求：{requested.objectLabel} · {requested.version}</output>}</div>
  </ConfirmAction></Inline>;
}
```

### 失败结果留在页面上
Source: apps/docs/src/content/confirm-action/demos/04-failure.tsx
```tsx
import { useEffect, useRef, useState } from "react";
import { Alert, AlertDescription, AlertTitle } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";
import { Stack } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
export const meta = { title: "失败结果留在页面上", titleEn: "Failures stay on the page" };

// 失败的对象与原因由应用持有：确认框随请求结束关闭，但结果不能跟着一起消失——它写进页面上的 Alert，留到应用自己清除。
type Failure = { name: string; reason: string };
export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const t = (zh: string, enText: string) => en ? enText : zh;
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failures, setFailures] = useState<Failure[]>([]);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  useEffect(() => () => clearTimeout(timer.current), []);
  const snapshot = { objectId: "batch-3", objectLabel: t("3 份记录", "3 records"), version: 1, change: t("同步到归档", "Sync to archive"), consequence: t("同步后，这 3 份记录在归档里以当前内容为准。", "After syncing, the archive holds the current content of these 3 records.") };
  return <Stack gap="field">
    <ConfirmAction snapshot={snapshot} open={open} onOpenChange={next => setOpen(next)} loading={loading} title={t("同步 3 份记录", "Sync 3 records")} triggerLabel={t("同步", "Sync")} actionLabel={t("同步到归档", "Sync to archive")} tone="neutral"
      onConfirm={() => {
        setLoading(true); setFailures([]);
        timer.current = setTimeout(() => {
          // 请求的结果到了：先把失败交给页面，再结束进行中、关闭确认框。
          setFailures([{ name: t("桑园采叶记录", "Mulberry log"), reason: t("归档中已有更新的版本", "A newer version exists in the archive") }, { name: t("茧质抽检", "Cocoon inspection"), reason: t("网络中断，结果未知", "Network lost, outcome unknown") }]);
          setLoading(false); setOpen(false);
        }, 800);
      }} />
    {failures.length > 0 && <Alert tone="danger">
      <AlertTitle>{t(`${failures.length} 份记录没有同步`, `${failures.length} records were not synced`)}</AlertTitle>
      <AlertDescription><ul className="m-0 grid list-none gap-(--qy-field-gap) p-0">{failures.map(item => <li key={item.name}>{item.name} · {item.reason}</li>)}</ul></AlertDescription>
      <Button variant="bordered" onClick={() => setFailures([])}>{t("知道了", "Dismiss")}</Button>
    </Alert>}
  </Stack>;
}
```
