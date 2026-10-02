# 密码输入框 PasswordInput

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/password-input
Source: packages/ui/src/components/password-input.tsx
Source SHA-256: e9536d3af196b68a3528d92d2ddf776de311b9f5ff407190c998ff8872dc74a9

带显示 / 隐藏切换的密码输入框，用于登录、注册与修改密码。

## Use and ownership
- 带显示 / 隐藏切换的密码输入框，用于登录、注册与修改密码。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- PasswordInput: function; owner password-input; PASS; props: PasswordInputProps
- PasswordInputProps: type; owner password-input; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### PasswordInput
基于 InputGroup。className 作用于外框，其余属性（name、autoComplete、required、ref…）透传给 <input>。
- size: "sm" | "default" | "lg"; default "default". 输入框尺寸，切换按钮随之调整。
- visible / defaultVisible: boolean; default false. 受控 / 非受控：是否以明文显示。
- onVisibleChange: (visible: boolean) => void. 切换显示状态时调用。
- showLabel: string; default locale: showPassword. 切换按钮的可访问名称。
- autoComplete: string. 登录用 current-password，注册与改密用 new-password。

## Keyboard
- Tab: 从输入框移到显示 / 隐藏按钮。
- Enter / Space: 在按钮上切换明文显示。

## Source examples
### 默认
Source: apps/docs/src/content/password-input/demos/01-default.tsx
```tsx
import { PasswordInput } from "@qingye/ui/components/password-input";

export const meta = { title: "默认", description: "点击眼睛图标在明文与掩码之间切换。" };

export default function Demo() {
  return (
    <PasswordInput
      aria-label="密码"
      autoComplete="current-password"
      className="max-w-xs"
      defaultValue="hangzhou-2026"
      placeholder="输入密码"
    />
  );
}
```

### 尺寸
Source: apps/docs/src/content/password-input/demos/02-sizes.tsx
```tsx
import { PasswordInput } from "@qingye/ui/components/password-input";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <PasswordInput aria-label="密码（小）" placeholder="小 sm" size="sm" />
      <PasswordInput aria-label="密码" placeholder="默认 default" />
      <PasswordInput aria-label="密码（大）" placeholder="大 lg" size="lg" />
    </div>
  );
}
```

### 配合 Field
Source: apps/docs/src/content/password-input/demos/03-field.tsx
```tsx
import { Field, FieldDescription, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { PasswordInput } from "@qingye/ui/components/password-input";

export const meta = { title: "配合 Field", description: "标签、规则说明与校验信息。提交后未满足 minLength 时显示错误。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <Field>
        <FieldLabel>新密码</FieldLabel>
        <PasswordInput autoComplete="new-password" minLength={8} required />
        <FieldDescription>至少 8 位，建议包含字母与数字。</FieldDescription>
      </Field>
      <Field invalid>
        <FieldLabel>确认密码</FieldLabel>
        <PasswordInput autoComplete="new-password" defaultValue="hangzhou" />
        <FieldError>两次输入的密码不一致。</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel>当前密码</FieldLabel>
        <PasswordInput defaultValue="unchanged" />
      </Field>
    </div>
  );
}
```

### 受控
Source: apps/docs/src/content/password-input/demos/04-controlled.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Label } from "@qingye/ui/components/label";
import { PasswordInput } from "@qingye/ui/components/password-input";
import { useState } from "react";

export const meta = {
  title: "受控",
  description: "用 visible 与 onVisibleChange 让外部控件同步显示状态，例如同时控制两个密码框。",
};

export default function Demo() {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      <PasswordInput aria-label="新密码" onVisibleChange={setVisible} placeholder="新密码" visible={visible} />
      <PasswordInput aria-label="确认新密码" onVisibleChange={setVisible} placeholder="确认新密码" visible={visible} />
      <Label>
        <Checkbox checked={visible} onCheckedChange={setVisible} />
        显示密码
      </Label>
    </div>
  );
}
```

