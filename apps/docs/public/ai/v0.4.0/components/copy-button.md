# 复制按钮 CopyButton

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/copy-button
Source: packages/ui/src/components/copy-button.tsx
Source SHA-256: f6871f339a81f4b6bd7cc2721b9673932290c481e54923aaa6e61a21c6cef6e7

把一段文本复制到剪贴板，并在按钮上就地确认。用于 API 密钥、邀请链接、订单号、命令等。

## Use and ownership
- 将当前对象的明确文本复制到剪贴板，并在动作处反馈结果。
- Avoid: 请求发出就打对勾；旧请求的失败覆盖新结果；失败后隐藏原文本；把空串当作无请求。
- Library: 剪贴板请求归属、等待状态、反馈计时、卸载后回调抑制。
- Application: 被复制的对象和值、敏感数据策略、人工复制入口。

## Composition
- 复制值按原样写入，包括空串；等待复用 Button loading。成功与错误由 Clipboard Promise 结果决定；失败仍可重试和手动选择原文。

## Responsive behavior
- 图标按钮保留对象名称；成功不改变标签宽度，失败文字允许获得必要空间。

## Customization
- copyLabel/copiedLabel/errorLabel 说明对象与结果，timeout 决定反馈持续时间。

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
底层 Hook：{ copyToClipboard, isCopied, isCopying }，参数 { timeout, onCopy, onError }。最近一次调用拥有结果反馈；卸载后不再回调。

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

