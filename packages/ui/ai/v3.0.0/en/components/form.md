# Form

Package: @qingye_lab/ui@3.0.0
Import: @qingye_lab/ui/components/form
Source: packages/ui/src/components/form.tsx
Source SHA-256: 694187e034dce87a7c83e9e39b7976299568ecbefde556432eb49619dd98468b

A native field submission scope and reset context.

## Decision
Form infers no validation or submission outcome. Use native onSubmit and FormData, with explicit Field.invalid and local FieldError; failure or cancellation never clears input automatically.

## Notes
- FieldError.errors contains caller-provided messages; Field.invalid is separately declared by the caller.
- Form has no auto-focus option: it cannot know when the application set invalid and infers no validation; native constraint validation (without noValidate) already makes the browser focus the first invalid control. Call focusFirstInvalid when the application validates itself.

## Use and ownership
- Fields need an actual submission or reset scope.
- Avoid: Treating a container as a saving service, success state, or automatic validation context.
- Library: The native form element and composition entry.
- Application: Drafts, explicit validation, requests, external errors, and outcomes.

## Composition
- Field/Fieldset name fields and scopes; FieldGroup or layout components organize relationships. Button declares type explicitly.

## Responsive behavior
- Form imposes neither enclosure nor field layout.

## Customization
- Native props/events, render, className, style, and refs belong to the actual form.

## Current exports
- focusFirstInvalid: function; owner external; PASS; props: HTMLFormElement
- Form: function; owner form; PASS; props: FormProps
- FormProps: type; owner form; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Form
- no props declared by this library
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Form
A real native form with no request or error aggregation.
- onSubmit / onReset: native form event handlers. Native events with preventDefault; the application reads values using FormData.
- action / method / noValidate / id / name: native form props. Keeps platform submission and constraints; native validation remains enabled by default.
- render / ref / ARIA / className / style: useRender.ComponentProps<form>. Native composition props; render must keep actual form semantics.

### focusFirstInvalid(form)
A pure function: focuses the first invalid field in document order and calls scrollIntoView({ block: "nearest" }); returns true when found. Invalid means aria-invalid="true" or a native :invalid input/select/textarea. It lands on the part the user can see and reach by keyboard (Select trigger, Checkbox/Switch mark, Radio, Slider thumb, OtpField input, ...), skipping disabled, aria-hidden, invisible, and tabindex=-1 hidden native copies. The application calls it after setting Field.invalid (let aria-invalid render first, e.g. in an effect); Form never calls it, so default behaviour is unchanged.

## Keyboard
- Enter: Implicit submission follows platform rules; native constraints can block invalid values.

## Source examples
### 提交值
Source: apps/docs/src/content/form/demos/01-submit.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Form } from "@qingye_lab/ui/components/form";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "提交值", titleEn: "Submitted value" };
export default function Demo() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  return <Form className="w-full max-w-sm" onSubmit={event => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get("value") ?? "")); }}><Stack gap="fields"><Field name="value"><FieldLabel>工作区名称</FieldLabel><Input /></Field><Button type="submit">提交</Button>{submitted !== null && <output aria-label="提交值" className="text-body wrap-break-word">{submitted || "空值"}</output>}</Stack></Form>;
}
```

### 字段错误与重置
Source: apps/docs/src/content/form/demos/02-error-and-reset.tsx
```tsx
import { Button } from "@qingye_lab/ui/components/button";
import { ButtonGroup } from "@qingye_lab/ui/components/button-group";
import { Field, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Form } from "@qingye_lab/ui/components/form";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "字段错误与重置", titleEn: "Field error and reset" };
export default function Demo() {
  return <Form className="w-full max-w-sm" onSubmit={event => event.preventDefault()}><Stack gap="fields"><Field name="value" invalid><FieldLabel>工作区标识</FieldLabel><Input defaultValue="qingye" /><FieldError errors={[{ message: "已被占用" }]} /></Field><ButtonGroup aria-label="表单动作"><Button type="submit">提交</Button><Button type="reset" variant="bordered">重置</Button></ButtonGroup></Stack></Form>;
}
```

### 失败后落焦点
Source: apps/docs/src/content/form/demos/03-focus-first-invalid.tsx
```tsx
import { useEffect, useRef, useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldContent, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Form, focusFirstInvalid } from "@qingye_lab/ui/components/form";
import { Input } from "@qingye_lab/ui/components/input";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";

export const meta = { title: "失败后落焦点", titleEn: "Focus after a failed submit" };
const roles = [{ value: "admin", label: "管理员" }, { value: "member", label: "成员" }];
type Errors = Partial<Record<"name" | "role" | "agree", string>>;
export default function Demo() {
  const form = useRef<HTMLFormElement>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [attempt, setAttempt] = useState(0);
  // 校验结果是应用的事实：先让 aria-invalid 渲染出来，再落焦点。
  useEffect(() => { if (attempt > 0 && form.current) focusFirstInvalid(form.current); }, [attempt]);
  return <Form ref={form} noValidate className="w-full max-w-sm" onSubmit={event => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setErrors({ ...(String(data.get("name") ?? "").trim() ? null : { name: "请填写名称" }), ...(data.get("role") ? null : { role: "请选择角色" }), ...(data.get("agree") ? null : { agree: "需要先阅读并同意" }) });
    setAttempt(count => count + 1);
  }}><Stack gap="fields">
    <Field name="name" invalid={!!errors.name}><FieldLabel>名称</FieldLabel><Input />{errors.name && <FieldError>{errors.name}</FieldError>}</Field>
    <Field name="role" invalid={!!errors.role}><FieldLabel>角色</FieldLabel><Select items={roles}><SelectTrigger><SelectValue /></SelectTrigger><SelectPopup>{roles.map(role => <SelectItem key={role.value} value={role.value}>{role.label}</SelectItem>)}</SelectPopup></Select>{errors.role && <FieldError>{errors.role}</FieldError>}</Field>
    <Field name="agree" invalid={!!errors.agree} orientation="horizontal"><Checkbox value="yes" /><FieldContent><FieldLabel>同意使用条款</FieldLabel>{errors.agree && <FieldError>{errors.agree}</FieldError>}</FieldContent></Field>
    <Button type="submit">提交</Button>
  </Stack></Form>;
}
```
