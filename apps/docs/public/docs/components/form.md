# 表单 Form

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/form
Source: packages/ui/src/components/form.tsx
Source SHA-256: 694187e034dce87a7c83e9e39b7976299568ecbefde556432eb49619dd98468b

原生字段提交范围与重置上下文。

## Decision
Form 不推断校验或提交结果。应用使用原生 onSubmit 与 FormData，显式给 Field.invalid 和就地 FieldError；失败或取消不自动清空输入。

## Notes
- FieldError.errors 是调用方给出的错误，Field.invalid 单独由调用方声明。
- 不提供 Form 的自动落焦点选项：Form 不知道应用何时设置了 invalid，也不推断校验；原生约束校验（未设 noValidate）本来就由浏览器聚焦第一个无效控件。应用自行校验时调用 focusFirstInvalid。

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
真实原生 form，无内置请求和错误聚合。
- onSubmit / onReset: native form event handlers. 原生事件，支持 preventDefault；提交值由应用使用 FormData 读取。
- action / method / noValidate / id / name: native form props. 保留平台提交与约束校验；不默认关闭 constraint validation。
- render / ref / ARIA / className / style: useRender.ComponentProps<form>. 保留原生组合。render 必须继续承载实际表单语义。

### focusFirstInvalid(form)
纯函数：按文档顺序聚焦 form 里第一个无效字段并 scrollIntoView({ block: "nearest" })，找到返回 true。无效 = aria-invalid="true" 或原生 :invalid 的 input/select/textarea；落点是用户看得见、键盘本来就能走到的部件（Select 触发器、Checkbox/Switch 的标记、Radio、Slider 滑块、OtpField 输入等），跳过禁用、aria-hidden、不可见与 tabindex=-1 的隐藏原生副本。由应用在设置完 Field.invalid 后调用（先让 aria-invalid 渲染，再调用，例如放进 effect）；Form 自身不调用它，默认行为不变。

## Keyboard
- Enter: 按平台规则进行隐式提交；原生约束可阻止无效值提交。

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
