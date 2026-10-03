# ConfirmAction

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/confirm-action
Source: packages/ui/src/components/confirm-action.tsx
Source SHA-256: e2f89c0cd00ce4ed718ac07fcb0f37476caefe0d4c870beca1d1ac5da5061fdb

Confirm a specific object, version, and change; review again when content changes.

## Decision
Confirmation targets the reviewed opening snapshot. Changed identity, version, change, or consequence invalidates prior approval. Reviewing again clears confirmation text. onConfirm is a request; resolving a Promise neither infers success nor closes the dialog.

## Notes
- Restoring old content does not revive old approval; review again.
- The application owns action attempts and outcomes. There is no custom timeout, fake success, or automatic retry.
- Layering, sizes, focus, and consequence association use current public components and centralized presets.

## Use and ownership
- Confirm a specific object, version, and change; review again when content changes.
- Avoid: Do not substitute styling for semantics; distinguish empty, unknown, and zero values.
- Library: Open state, reviewed snapshot, invalidation notice, and optional confirmation input.
- Application: Objects, versions, changes, permissions, action states, and outcomes.

## Composition
- ConfirmAction + explicit snapshot/text + application state/onConfirm.

## Responsive behavior
- Five matching control/text profiles; the modal consumes shared space and focus mechanisms.

## Customization
- Public part props, children, and existing theme roles.

## Current exports
- ConfirmAction: function; owner confirm-action; PASS; props: ConfirmActionProps
- ConfirmActionPrimitive: reexport; owner confirm-action; alias of AlertDialogPrimitive; UNVERIFIED
- ConfirmActionProps: type; owner confirm-action; PASS
- ConfirmActionSnapshot: type; owner confirm-action; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ConfirmAction
A confirmation composition of AlertDialog, ButtonProtection, and optional Field/Input.
- snapshot: { objectId: string; objectLabel: string; version: string | number; change: string; consequence: string }. All fields are required and meaningful; comparisons include every field. Opening captures an immutable copy. Confirmation receives only a reviewed copy that still matches current facts.
- title / triggerLabel / actionLabel: ReactNode. The caller names the real object and action. Consequences remain visible and linked to confirmation.
- onConfirm: (snapshot, event) => void. Request only: no network, result ownership, or automatic closing. The application expresses permissions, waiting, failure, and unknown results through state and content.
- state / disabled: ButtonState / boolean; default 'idle' / false. waiting, in-progress, and unknown block requests. Busy/unknown retain Button's focusable ARIA-disabled behavior; explicit disabled is native. Back only closes this UI.
- confirmationText / confirmationLabel: string / ReactNode. Optional exact text match with a required visible label. FieldDescription shows the expected text. Reviewing or reopening clears prior input.
- open / defaultOpen / onOpenChange: AlertDialog public props. Controlled or uncontrolled opening. onOpenChange details.cancel() can reject it; the controlled caller decides opening and closing.
- size / tone: InputSize / ButtonTone; default 'md' / 'danger'. Input and actions share one of five control/text profiles. Tone expresses consequences without granting permission.
- triggerProps / confirmProps / inputProps / popupProps: Current public component props. Customize real outlets' render, refs, ARIA, and events. Canceling confirmProps.onClick blocks a request. A danger trigger still requires visible consequence association on its page.
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
import { Button } from "@qingye/ui/components/button";
import { Inline } from "@qingye/ui/components/layout";
import { ConfirmAction, type ConfirmActionSnapshot } from "@qingye/ui/components/confirm-action";
export const meta = { title: "当前快照", titleEn: "Current snapshot" };
export default function Demo() {
  const [version, setVersion] = useState(1);
  const [requested, setRequested] = useState<ConfirmActionSnapshot>();
  const snapshot = { objectId: "A", objectLabel: "A", version, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };
  return <Inline><ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" confirmationText="A" confirmationLabel="输入 A" onConfirm={setRequested}>
    <div className="flex flex-wrap items-center gap-(--qy-action-gap)"><Button variant="quiet" onClick={() => setVersion(value => value + 1)}>版本 +1</Button>{requested && <output className="text-support text-muted-foreground">请求：{requested.objectLabel} · {requested.version}</output>}</div>
  </ConfirmAction></Inline>;
}
```

### 五档与未知
Source: apps/docs/src/content/confirm-action/demos/02-sizes.tsx
```tsx
import { ConfirmAction } from "@qingye/ui/components/confirm-action";
export const meta = { title: "五档与未知", titleEn: "Five sizes and unknown" };
const snapshot = { objectId: "A", objectLabel: "A", version: 1, change: "A → B", consequence: "应用此变更后，以 B 替换 A。" };
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <ConfirmAction key={size} size={size} snapshot={snapshot} title={`${size} · A → B`} triggerLabel={size} actionLabel="请求 A → B" confirmationText="A" confirmationLabel="输入 A" onConfirm={() => {}} />)}<ConfirmAction snapshot={snapshot} title="核对 A → B" triggerLabel="核对 A" actionLabel="请求 A → B" state="unknown" onConfirm={() => {}} /></div>;
}
```
