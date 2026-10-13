# PasswordInput

Package: @qingye_lab/ui@4.0.0
Import: @qingye_lab/ui/components/password-input
Source: packages/ui/src/components/password-input.tsx
Source SHA-256: d979e4856bb9c60fc9b12a6418bd99fa1067317850359c6843c8caeab43e87d3

Enter a password and switch to plain text to check it.

## Decision
PasswordInput is a composition, not a mode of Input: the input and a show-password toggle sit inside one editing boundary (InputGroup), both public parts. The input only holds the value; the toggle is a separate action on the boundary with the stable name “Show password”, its state expressed by aria-pressed. The toggle changes no content and submits no form; strength, rules and validation come from the application.

## Notes
- Never block pasting or password-manager autofill (WCAG 3.3.8, Accessible Authentication): the component has no paste, drop or autofill-disabling handling, and callers should not add one through onPaste preventDefault, autoComplete="off", or by splitting the input into several fields.
- Replace Input type="password" with PasswordInput; Input's visibilityToggle / visible / defaultVisible / onVisibleChange / showLabel are removed.

## Use and ownership
- Signing in, or setting or changing a password.
- Avoid: Use OtpField for one-time codes.
- Avoid: Password rules in a placeholder: write them in FieldDescription.
- Library: The shared boundary, the toggle's name and pressed state, and controlled or uncontrolled visibility.
- Application: The password value, rule text, validation facts and the submission outcome.

## Composition
- Pair with FieldLabel, FieldDescription and FieldError; set autoComplete to current-password or new-password.

## Responsive behavior
- Width follows the container; geometry matches Input and follows the density axis.

## Customization
- className, style, render and ref belong to the real input; controlClassName belongs to the editing boundary; showLabel renames the toggle.

## Current exports
- PasswordInput: function; owner password-input; PASS; props: PasswordInputProps
- PasswordInputProps: type; owner password-input; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### PasswordInput
- `controlClassName?`: `string`. 编辑边界的样式入口；className / style / render 始终属于真实输入。
- `defaultVisible?`: `boolean`.
- `nativeInput?`: `boolean`. 已由 FieldControl 等原语注册时，直接渲染原生输入，避免重复注册。
- `onVisibleChange?`: `(visible: boolean) => void`.
- `showLabel?`: `string`. 开关的稳定名称，默认从 locale 读取；aria-pressed 表达密码当前是否可见。
- `size?`: `number | undefined`. 原生 input.size 的字符宽度含义；与呈现无关，由原生属性承担。
- `visible?`: `boolean`. 密码当前是否以明文显示；与 defaultVisible 分别支持受控与非受控。
- plus 308 inherited (@types/react 302, @base-ui/react 6); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### PasswordInput
InputGroup + Input (type=password) + a show-password toggle.
- visible / defaultVisible / onVisibleChange: boolean / boolean / (visible) => void; default defaultVisible: false. Whether the password is shown as plain text; controlled or uncontrolled.
- showLabel: string. Stable toggle name, read from the locale by default; aria-pressed reports visibility.
- value / defaultValue / onChange / onValueChange: InputProps. Controlled and uncontrolled values; switching visibility never changes the value.
- disabled: boolean; default false. The toggle is disabled with the input, also following Field and a native fieldset.
- className / style / render / ref: InputProps. Applied to the real input.
- controlClassName: string. Applied to the editing boundary, e.g. its width.
- Other InputProps (except type / unstyled): InputProps. autoComplete, name, form, aria-* and the rest are forwarded; auto-capitalisation, auto-correction and spell checking are off by default. Set autoComplete to current-password (sign in) or new-password (set); when missing, development logs a console warning and production stays silent.

## Keyboard
- Tab / Shift+Tab: Move between the input and the toggle; a disabled toggle leaves the tab order.
- Enter / Space: On the toggle: switch visibility without submitting the form.

## Source examples
### 密码
Source: apps/docs/src/content/password-input/demos/01-password.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { PasswordInput } from "@qingye_lab/ui/components/password-input";

export const meta = { title: "密码", titleEn: "Password" };

export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>新密码</FieldLabel><PasswordInput autoComplete="new-password" defaultValue="qingye-2026" /></Field>;
}
```

### 两处共用一个可见性
Source: apps/docs/src/content/password-input/demos/02-controlled.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { PasswordInput } from "@qingye_lab/ui/components/password-input";
import { useState } from "react";

export const meta = { title: "两处共用一个可见性", titleEn: "One visibility for two fields" };

export default function Demo() {
  const [visible, setVisible] = useState(false);
  return (
    <Stack gap="fields" className="w-full max-w-sm">
      <Field><FieldLabel>新密码</FieldLabel><PasswordInput autoComplete="new-password" defaultValue="qingye-2026" visible={visible} onVisibleChange={setVisible} /></Field>
      <Field><FieldLabel>再输入一次</FieldLabel><PasswordInput autoComplete="new-password" defaultValue="qingye-2026" visible={visible} onVisibleChange={setVisible} /></Field>
    </Stack>
  );
}
```

### 状态
Source: apps/docs/src/content/password-input/demos/03-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Stack } from "@qingye_lab/ui/components/layout";
import { PasswordInput } from "@qingye_lab/ui/components/password-input";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <Stack gap="fields" className="w-full max-w-sm">
      <Field disabled><FieldLabel>禁用</FieldLabel><PasswordInput autoComplete="current-password" defaultValue="qingye-2026" /></Field>
      <Field invalid><FieldLabel>当前密码</FieldLabel><PasswordInput autoComplete="current-password" defaultValue="qingye" /><FieldError>密码不正确</FieldError></Field>
    </Stack>
  );
}
```
