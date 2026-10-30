# 复制按钮 CopyButton

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/copy-button
Source: packages/ui/src/components/copy-button.tsx
Source SHA-256: 965565edbc2678a8309773c65d579ec3f47bd4dcea6736ea630fe959a6d25817

复制给定文本，并呈现剪贴板实际写入结果。

## Decision
CopyButton 复用 useCopyToClipboard，成功从写入 Promise resolve 建立。反馈时间、quiet 默认和图标是选择/预设。

## Notes
- 剪贴板需要运行环境支持与权限；http 等非安全上下文没有 Clipboard API 时改用选区复制，两条路都失败才显示「复制失败，请手动复制」，不静默。
- 切换到「已复制」时按钮宽度不变：两条文字叠放，取较宽者。
- onCopySuccess 只确认传入文本写入当前剪贴板，不表示保存或业务完成。

## Use and ownership
- 复制已知文本
- Avoid: 复制后直接宣称业务成功
- Library: 剪贴板等待/实际结果/反馈
- Application: 文本内容、复制后处理

## Composition
- Button + 实际复制状态/失败恢复

## Responsive behavior
- 窄容器保留必要内容与可达操作；布局改变时保留对象、输入和焦点。

## Customization
- Button 五档/variant 与 timeout

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
- 剪贴板需要运行环境支持与权限；http 等非安全上下文没有 Clipboard API 时改用选区复制，两条路都失败才显示「复制失败，请手动复制」，不静默。
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### CopyButton
继承 Button 的五档、强调、原生/非原生 render 与 ref。
- value: string. 本次复制的真实文本；不从 DOM 或业务对象猜测。
- timeout: number; default 2000. 清除成功反馈的毫秒预设，只清反馈，不建立成功。
- onCopySuccess / onCopyError: () => void / (error: unknown) => void. writeText resolve 后成功回调；拒绝或 API 不可用走失败回调。
- size / shape / variant: ButtonProps; default md / label / quiet. 五档继承同档 control/text；icon 形态仍有本地化动作名称。
- disabled / onClick / render / ref / ARIA: ButtonProps. 事件取消阻止写入，等待时屏蔽重复激活；ref 与 render 对应真实按钮。

### useCopyToClipboard
CopyButton 背后的 hook；需要自己的按钮外形或触发时机时直接用它。从包根或 @qingye_lab/ui/hooks/use-copy-to-clipboard 导入。返回 { copyToClipboard, isCopying, isCopied }：copyToClipboard(value) 写入 value，navigator.clipboard 不存在（如 http 页面）或被拒绝时回退到临时 textarea + execCommand("copy") 并把焦点还给原元素，回退也失败才走 onError；重复调用只认最后一次，卸载后不再更新状态。isCopying 在写入进行中；isCopied 在写入成功后的 timeout 内为 true；失败时两者都为 false。
- timeout: number; default 2000. isCopied 保持为 true 的毫秒数，只清反馈，不建立成功。
- onCopy: () => void. 写入成功后调用一次（来自写入 Promise resolve 或选区复制返回成功）。
- onError: (error: unknown) => void. 所有写入路径都失败时调用，error 是 Clipboard API 的拒绝原因；不静默。

## Keyboard
- Enter / Space: 可用时启动一次复制；等待期间不重复写入。

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
