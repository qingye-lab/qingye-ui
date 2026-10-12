# 密码输入 PasswordInput

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/password-input
Source: packages/ui/src/components/password-input.tsx
Source SHA-256: d979e4856bb9c60fc9b12a6418bd99fa1067317850359c6843c8caeab43e87d3

输入密码，并可切换为明文核对。

## Decision
密码输入是组合，不是 Input 的一个模式：编辑边界（InputGroup）里放输入与一个显示密码的开关，都是公开部件。输入框只承载值；开关是附在边界上的另一个动作，名称固定为「显示密码」，按下与否由 aria-pressed 表达。开关不改内容、不提交表单；强度、规则与校验由应用给出。

## Notes
- 不得阻止粘贴，也不得阻止密码管理器自动填充（WCAG 3.3.8 可访问认证）：组件没有任何 paste、drop 或关闭自动填充的处理；调用方不要通过 onPaste 的 preventDefault、autoComplete="off" 或把输入拆成多个字段来拦截。
- 此前写作 Input type="password" 的用法改为 PasswordInput；Input 的 visibilityToggle / visible / defaultVisible / onVisibleChange / showLabel 已移除。

## Use and ownership
- 登录、设置或修改密码。
- Avoid: 一次性验证码用 OtpField。
- Avoid: 用 placeholder 写密码规则：规则写在 FieldDescription。
- Library: 共同边界、开关的名称与按下状态、受控或非受控的可见性。
- Application: 密码值、规则说明、校验事实与提交结果。

## Composition
- 与 FieldLabel、FieldDescription、FieldError 共处；autoComplete 写 current-password 或 new-password。

## Responsive behavior
- 宽度由所在容器决定；几何与 Input 相同，跟随密度轴。

## Customization
- className、style、render 与 ref 属于真实 input；controlClassName 属于编辑边界；showLabel 改写开关的名称。

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
InputGroup + Input（type=password）+ 显示密码的开关。
- visible / defaultVisible / onVisibleChange: boolean / boolean / (visible) => void; default defaultVisible: false. 密码是否以明文显示；支持受控与非受控。
- showLabel: string. 开关的稳定名称，默认从 locale 读取；aria-pressed 表达当前是否可见。
- value / defaultValue / onChange / onValueChange: InputProps. 受控与非受控值；切换可见性不改变值。
- disabled: boolean; default false. 输入禁用时开关一并禁用，同样服从 Field 与原生 fieldset。
- className / style / render / ref: InputProps. 全部作用于真实 input。
- controlClassName: string. 作用于编辑边界，例如宽度。
- 其余 InputProps（除 type / unstyled）: InputProps. autoComplete、name、form、aria-* 等原样透传；默认关闭自动大写、自动更正与拼写检查。autoComplete 应写 current-password（登录）或 new-password（设置）；未传时开发环境在控制台警告，生产环境不提示。

## Keyboard
- Tab / Shift+Tab: 在输入与开关之间移动；禁用的开关不进入顺序。
- Enter / Space: 焦点在开关上时切换可见性，不提交表单。

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
