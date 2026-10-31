# Copy button

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/copy-button
Source: packages/ui/src/components/copy-button.tsx
Source SHA-256: 965565edbc2678a8309773c65d579ec3f47bd4dcea6736ea630fe959a6d25817

Copy supplied text and reflect the clipboard write result.

## Decision
CopyButton uses useCopyToClipboard; success comes from the write Promise resolving. Feedback duration, the quiet default, and icons are choices or presets.

## Notes
- Clipboard access needs environment support and permission. Without the Clipboard API (for example on http) the selection copy command is used; only when both fail does the manual-copy message show, never silently.
- The button keeps its width when it switches to Copied: both labels share one cell and the wider sets the size.
- onCopySuccess confirms only writing the supplied text to the current clipboard, not saving or business completion.

## Use and ownership
- Copy known text.
- Avoid: Announcing business success after copying.
- Library: Clipboard waiting, actual outcome, and feedback.
- Application: Text content and subsequent handling.

## Composition
- Button + actual copy state/failure recovery.

## Responsive behavior
- Keep essential content and actions reachable in narrow containers; preserve the object, input, and focus when the layout changes.

## Customization
- Button's five profiles/variant and timeout.

## Current exports
- CopyButton: function; owner copy-button; PASS; props: CopyButtonProps
- CopyButtonProps: type; owner copy-button; PASS
- useCopyToClipboard: reexport; owner copy-button; UNVERIFIED

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### CopyButton
- `className?`: `string`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `onCopyError?`: `(error: unknown) => void`.
- `onCopySuccess?`: `() => void`.
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `timeout?`: `number`. Clears feedback only; success comes from writeText resolving.
- `tone?`: `"neutral" | "danger"`.
- `value`: `string`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 287 inherited (@types/react 284, @base-ui/react 3); not expanded, see the installed declarations

### useCopyToClipboard
- `onCopy?`: `() => void`.
- `onError?`: `(error: unknown) => void`.
- `timeout?`: `number`.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Clipboard access needs environment support and permission. Without the Clipboard API (for example on http) the selection copy command is used; only when both fail does the manual-copy message show, never silently.
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### CopyButton
Inherits Button's five profiles, emphasis, native/non-native render, and refs.
- value: string. The actual text to copy; never inferred from DOM or business objects.
- timeout: number; default 2000. A millisecond preset for clearing success feedback; it clears feedback without establishing success.
- onCopySuccess / onCopyError: () => void / (error: unknown) => void. Success callback after writeText resolves; rejection or an unavailable API invokes the error callback.
- size / shape / variant: ButtonProps; default md / label / quiet. Five matching control/text profiles; icon shape retains a localized action name.
- disabled / onClick / render / ref / ARIA: ButtonProps. Canceled events prevent writing; waiting blocks repeated activation. ref and render correspond to the actual button.

### useCopyToClipboard
The hook behind CopyButton, for when you need your own button form or trigger. Import from the package root or @qingye_lab/ui/hooks/use-copy-to-clipboard. Returns { copyToClipboard, isCopying, isCopied }: copyToClipboard(value) writes value; when navigator.clipboard is absent (for example on an http page) or rejects, it falls back to a temporary textarea + execCommand("copy") and returns focus to the previous element, and onError runs only if the fallback also fails. Only the latest call counts; no state updates after unmount. isCopying is true while the write is in flight; isCopied is true for timeout after a successful write; both are false after a failure.
- timeout: number; default 2000. Milliseconds isCopied stays true; clears feedback only and never establishes success.
- onCopy: () => void. Called once after a successful write (the write Promise resolved, or selection copy reported success).
- onError: (error: unknown) => void. Called when every write path failed; error is the Clipboard API rejection reason. Never silent.

## Keyboard
- Enter / Space: Start one copy when available; waiting never repeats the write.

## Source examples
### 复制文本
Source: apps/docs/src/content/copy-button/demos/01-copy.tsx
```tsx
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
export const meta = { title: "复制文本", titleEn: "Copy text" };
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)"><code className="text-body">Qingye</code><CopyButton value="Qingye" /><CopyButton value="Qingye" shape="icon" /><CopyButton value="Qingye" disabled /></div>;
}
```

### 五档
Source: apps/docs/src/content/copy-button/demos/02-sizes.tsx
```tsx
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
export const meta = { title: "五档", titleEn: "Sizes" };
export default function Demo() {
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <CopyButton key={size} value={size} size={size} variant="bordered">{size}</CopyButton>)}</div>;
}
```

### useCopyToClipboard
Source: apps/docs/src/content/copy-button/demos/03-hook.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { useCopyToClipboard } from "@qingye_lab/ui/hooks/use-copy-to-clipboard";
import { useUILocale } from "@qingye_lab/ui/locale";
export const meta = { title: "useCopyToClipboard", titleEn: "useCopyToClipboard" };
export default function Demo() {
  const { code, messages } = useUILocale();
  const en = code.startsWith("en");
  const [failed, setFailed] = useState(false);
  const { copyToClipboard, isCopied, isCopying } = useCopyToClipboard({ onCopy: () => setFailed(false), onError: () => setFailed(true) });
  return <div className="flex flex-wrap items-center gap-(--qy-action-gap)">
    <code className="text-body">npm i @qingye_lab/ui</code>
    <Button variant="bordered" loading={isCopying} onClick={() => copyToClipboard("npm i @qingye_lab/ui")}>{isCopied ? messages.copied : en ? "Copy command" : "复制命令"}</Button>
    {failed && <span role="status" className="text-support text-destructive-foreground">{messages.copyError}</span>}
  </div>;
}
```
