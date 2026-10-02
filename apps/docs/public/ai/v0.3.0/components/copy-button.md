# 复制按钮 CopyButton

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/copy-button
Source: packages/ui/src/components/copy-button.tsx
Source SHA-256: 5cc8d591b31dc91729cc1ce34ab443b1974840effe1dcba2c5d88354a722a6aa

把一段文本复制到剪贴板，并在按钮上就地确认。用于 API 密钥、邀请链接、订单号、命令等。

## Use and ownership
- 把一段文本复制到剪贴板，并在按钮上就地确认。用于 API 密钥、邀请链接、订单号、命令等。
- Avoid: 不要让样式替代语义；空值、未知与零分别表达。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 数据、权限、动作范围、异步结果与持久化。

## Current exports
- CopyButton: function; owner copy-button; PASS; props: CopyButtonProps
- CopyButtonProps: type; owner copy-button; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- 剪贴板需要安全上下文（HTTPS 或 localhost）；失败时按钮显示“复制失败”，并调用 onCopyError，可在其中引导用户手动复制。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CopyButton
基于 Button，接受其全部样式属性（variant 默认 outline）。结果通过礼貌的 live region 播报。
- value: string | () => string. 要复制的文本；传函数时在点击瞬间取值。
- timeout: number; default 2000. “已复制 / 复制失败”状态保持的毫秒数；0 表示一直保持。
- onCopy: () => void. 复制成功后调用。
- onCopyError: (error: unknown) => void. 剪贴板不可用或浏览器拒绝写入时调用。
- copyLabel: string; default locale: copy. 按钮文字；仅图标时作为 aria-label。
- copiedLabel: string; default locale: copied. 复制成功后的播报文字（视觉上由对勾图标确认）。
- errorLabel: string; default locale: copyFailed. 复制失败时替换按钮文字，并播报。
- size: ButtonProps["size"]; default "default". icon-* 尺寸只显示图标；其余尺寸在无 children 时显示 copyLabel。
- children: ReactNode. 自定义按钮文字。

### useCopyToClipboard
底层 Hook：{ copyToClipboard, isCopied }，参数 { timeout, onCopy, onError }。

## Keyboard
- Enter / Space: 复制。

## Source examples
### 默认
Source: apps/docs/src/content/copy-button/demos/01-default.tsx
```tsx
import { CopyButton } from "@qingye/ui/components/copy-button";

export const meta = { title: "默认", description: "点击后图标变为对勾，2 秒后恢复；读屏会播报“已复制”。" };

export default function Demo() {
  return <CopyButton value="https://qingye.example/invite/7KQ2-M9XP" />;
}
```

### 样式与尺寸
Source: apps/docs/src/content/copy-button/demos/02-variants.tsx
```tsx
import { CopyButton } from "@qingye/ui/components/copy-button";

export const meta = { title: "样式与尺寸", description: "透传 Button 的 variant 与 size；icon-* 尺寸只显示图标。" };

export default function Demo() {
  return (
    <>
      <CopyButton size="sm" value="SO-20260930-0042" variant="ghost" />
      <CopyButton value="SO-20260930-0042" variant="secondary" />
      <CopyButton size="lg" value="SO-20260930-0042" variant="default" />
      <CopyButton copyLabel="复制订单号" size="icon-sm" value="SO-20260930-0042" variant="ghost" />
      <CopyButton copyLabel="复制订单号" size="icon" value="SO-20260930-0042" />
    </>
  );
}
```

### 自定义文字
Source: apps/docs/src/content/copy-button/demos/03-custom-label.tsx
```tsx
import { CopyButton } from "@qingye/ui/components/copy-button";

export const meta = { title: "自定义文字", description: "用 children 写明复制的内容。" };

export default function Demo() {
  return <CopyButton value="pnpm add @qingye/ui">复制安装命令</CopyButton>;
}
```

### 组合：密钥输入框
Source: apps/docs/src/content/copy-button/demos/04-in-input.tsx
```tsx
import { CopyButton } from "@qingye/ui/components/copy-button";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";

export const meta = { title: "组合：密钥输入框", description: "放进 InputGroupAddon，复制只读字段的内容。" };

const key = "yq_live_4f9a2c7e81b0d3";

export default function Demo() {
  return (
    <InputGroup className="max-w-xs">
      <InputGroupInput aria-label="API 密钥" className="font-mono" defaultValue={key} readOnly />
      <InputGroupAddon align="inline-end">
        <CopyButton copyLabel="复制 API 密钥" size="icon-xs" value={key} variant="ghost" />
      </InputGroupAddon>
    </InputGroup>
  );
}
```

