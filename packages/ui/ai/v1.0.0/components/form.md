# 表单 Form

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/form
Source: packages/ui/src/components/form.tsx
Source SHA-256: 709b9bf716341fea67ac612ce770cc44ec07f68b6308a5e9766a2efa06cf93bd

原生字段提交范围与重置上下文。

## Decision
Form 不推断校验或提交结果。应用使用原生 onSubmit 与 FormData，显式给 Field.invalid 和就地 FieldError；失败或取消不自动清空输入。

## Notes
- FieldError.errors 是调用方给出的错误，Field.invalid 单独由调用方声明。

## Use and ownership
- 字段需要一个真实提交或重置范围。
- Avoid: 把容器当作保存服务、成功状态或自动校验上下文。
- Library: 原生表单元素与组合入口。
- Application: 草稿、显式校验、请求、外部错误与结果。

## Composition
- Field / Fieldset 命名字段和范围；FieldGroup 或布局组件安排关系；Button 明确声明 type。

## Responsive behavior
- Form 不强加围合或字段布局。

## Customization
- 原生属性与事件、render、className、style 和 ref 属于实际 form。

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
真实原生 form，无内置请求和错误聚合。
- onSubmit / onReset: native form event handlers. 原生事件，支持 preventDefault；提交值由应用使用 FormData 读取。
- action / method / noValidate / id / name: native form props. 保留平台提交与约束校验；不默认关闭 constraint validation。
- render / ref / ARIA / className / style: useRender.ComponentProps<form>. 保留原生组合。render 必须继续承载实际表单语义。

## Keyboard
- Enter: 按平台规则进行隐式提交；原生约束可阻止无效值提交。

## Source examples
### 提交值
Source: apps/docs/src/content/form/demos/01-submit.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";
import { Stack } from "@qingye/ui/components/layout";

export const meta = { title: "提交值", titleEn: "Submitted value" };
export default function Demo() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  return <Form className="w-full max-w-sm" onSubmit={event => { event.preventDefault(); setSubmitted(String(new FormData(event.currentTarget).get("value") ?? "")); }}><Stack gap="fields"><Field name="value"><FieldLabel>工作区名称</FieldLabel><Input /></Field><Button type="submit">提交</Button>{submitted !== null && <output aria-label="提交值" className="text-body wrap-break-word">{submitted || "空值"}</output>}</Stack></Form>;
}
```

### 字段错误与重置
Source: apps/docs/src/content/form/demos/02-error-and-reset.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { ButtonGroup } from "@qingye/ui/components/button-group";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";
import { Stack } from "@qingye/ui/components/layout";

export const meta = { title: "字段错误与重置", titleEn: "Field error and reset" };
export default function Demo() {
  return <Form className="w-full max-w-sm" onSubmit={event => event.preventDefault()}><Stack gap="fields"><Field name="value" invalid><FieldLabel>工作区标识</FieldLabel><Input defaultValue="qingye" /><FieldError errors={[{ message: "已被占用" }]} /></Field><ButtonGroup aria-label="表单动作"><Button type="submit">提交</Button><Button type="reset" variant="bordered">重置</Button></ButtonGroup></Stack></Form>;
}
```
