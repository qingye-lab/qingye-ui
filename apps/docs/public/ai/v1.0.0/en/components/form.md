# Form

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/form
Source: packages/ui/src/components/form.tsx
Source SHA-256: 709b9bf716341fea67ac612ce770cc44ec07f68b6308a5e9766a2efa06cf93bd

A native field submission scope and reset context.

## Decision
Form infers no validation or submission outcome. Use native onSubmit and FormData, with explicit Field.invalid and local FieldError; failure or cancellation never clears input automatically.

## Notes
- FieldError.errors contains caller-provided messages; Field.invalid is separately declared by the caller.

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
- Form: function; owner form; PASS; props: FormProps
- FormProps: type; owner form; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Form
A real native form with no request or error aggregation.
- onSubmit / onReset: native form event handlers. Native events with preventDefault; the application reads values using FormData.
- action / method / noValidate / id / name: native form props. Keeps platform submission and constraints; native validation remains enabled by default.
- render / ref / ARIA / className / style: useRender.ComponentProps<form>. Native composition props; render must keep actual form semantics.

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
