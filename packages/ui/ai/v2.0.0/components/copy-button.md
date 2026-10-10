# 复制按钮 CopyButton

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/copy-button
Source: packages/ui/src/components/copy-button.tsx
Source SHA-256: e32b98103aa3bf15b34d2ad66fd8d36798420497234dca30484c8f09838cb9c7

复制给定文本，并呈现剪贴板实际写入结果。

## Decision
CopyButton 复用 useCopyToClipboard，成功从写入 Promise resolve 建立。反馈时间、quiet 默认和图标是选择/预设。

## Notes
- 剪贴板需要运行环境支持与权限；失败保留手动复制提示。
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

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CopyButton
继承 Button 的五档、强调、原生/非原生 render 与 ref。
- value: string. 本次复制的真实文本；不从 DOM 或业务对象猜测。
- timeout: number; default 2000. 清除成功反馈的毫秒预设，只清反馈，不建立成功。
- onCopySuccess / onCopyError: () => void / (error: unknown) => void. writeText resolve 后成功回调；拒绝或 API 不可用走失败回调。
- size / shape / variant: ButtonProps; default md / label / quiet. 五档继承同档 control/text；icon 形态仍有本地化动作名称。
- disabled / onClick / render / ref / ARIA: ButtonProps. 事件取消阻止写入，等待时屏蔽重复激活；ref 与 render 对应真实按钮。

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
