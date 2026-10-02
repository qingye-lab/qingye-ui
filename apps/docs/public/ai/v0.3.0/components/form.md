# 表单 Form

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/form
Source: packages/ui/src/components/form.tsx
Source SHA-256: 6afac1b936e124aefeaa6a3d53f79f89e8b069d2f430417895d6b70fcaec545d

基于 Base UI Form：提交时统一校验，把焦点移到第一个错误字段，并按字段名显示服务端返回的错误。

## Use and ownership
- 组织一组输入与一个明确提交动作，让校验与修正保持在原位。
- Avoid: 浏览器校验通过和 onSubmit 触发都不代表后端保存成功。
- Library: 提交、原生校验与字段错误分派。
- Application: 草稿、请求、版本、结果未知和恢复流程。

## Composition
- Form 与具名 Field 关联提交值和 errors；提交按钮名称表达真实后果。

## Responsive behavior
- 提交反馈保留已填写的控件；小屏按阅读和修正顺序安排字段。

## Customization
- errors 接收服务端字段消息，应用决定何时清除或重新校验。

## Current exports
- Form: function; owner form; PASS; props: FormPrimitive.Props
- FormPrimitive: reexport; owner form; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, react
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Form
渲染 <form>，与内部 Field 协同校验。
- onFormSubmit: (values, details) => void. 校验通过后调用，values 以 Field 的 name 为键。
- onSubmit: (event) => void. 原生提交事件；需要 FormData 时使用。
- errors: Record<string, string | string[]>. 外部错误（如服务端），按 name 显示在对应 FieldError 中，字段修改后自动清除。
- validationMode: "onSubmit" | "onBlur" | "onChange"; default "onSubmit". 所有字段的默认校验时机。
- actionsRef: RefObject<{ validate }>. 手动触发校验。

## Keyboard
- Enter: 在单行输入框中提交表单。
- Tab: 按顺序在字段间移动；提交失败时焦点落在第一个错误字段。

## Source examples
### 完整表单
Source: apps/docs/src/content/form/demos/01-complete.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";
import { Switch } from "@qingye/ui/components/switch";
import { Textarea } from "@qingye/ui/components/textarea";
import { useState } from "react";

export const meta = {
  title: "完整表单",
  description:
    "直接点“提交申请”查看校验，焦点会移到第一个错误字段。企业名称填“言青科技”可模拟服务端返回的重名错误，修改后错误自动消失。",
};

export default function Demo() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  async function submit(values: Record<string, unknown>) {
    setLoading(true);
    setDone(false);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setLoading(false);
    if (String(values.company).includes("言青科技")) {
      setErrors({ company: "该企业已开通账户，请联系管理员邀请你加入。" });
      return;
    }
    setErrors({});
    setDone(true);
  }

  return (
    <Form className="flex w-full max-w-md flex-col gap-6" errors={errors} onFormSubmit={submit}>
      <FieldGroup>
        <Field name="company" validate={(value) => (value ? null : "请填写企业名称。")}>
          <FieldLabel>企业名称</FieldLabel>
          <Input aria-required placeholder="与营业执照一致" />
          {/* Shows the validate() message, or the server error from Form errors. */}
          <FieldError />
        </Field>
        <Field name="email">
          <FieldLabel>管理员邮箱</FieldLabel>
          <Input autoComplete="email" placeholder="name@company.com" required type="email" />
          <FieldDescription>开通结果和登录链接会发送到这个邮箱。</FieldDescription>
          <FieldError match="valueMissing">请填写管理员邮箱。</FieldError>
          <FieldError match="typeMismatch">邮箱格式不正确。</FieldError>
        </Field>
        <Field name="note">
          <FieldLabel>
            使用场景 <span className="font-normal text-muted-foreground">选填</span>
          </FieldLabel>
          <Textarea placeholder="例如：管理 3 个仓库的 200 台传感器" />
        </Field>
      </FieldGroup>

      <Fieldset>
        <FieldsetLegend>通知</FieldsetLegend>
        <Field name="weeklyReport" orientation="horizontal">
          <FieldContent>
            <FieldLabel>每周运维报告</FieldLabel>
            <FieldDescription>每周一 9:00 发送设备在线率与告警汇总。</FieldDescription>
          </FieldContent>
          <Switch defaultChecked />
        </Field>
        <Field name="productNews" orientation="horizontal">
          <FieldContent>
            <FieldLabel>产品更新</FieldLabel>
            <FieldDescription>新功能上线时通知，每月不超过 2 封。</FieldDescription>
          </FieldContent>
          <Switch />
        </Field>
      </Fieldset>

      <Field name="terms" orientation="horizontal">
        <Checkbox required />
        <FieldContent>
          <FieldLabel>我已阅读并同意《企业服务协议》</FieldLabel>
          <FieldError match="valueMissing">请先同意服务协议。</FieldError>
        </FieldContent>
      </Field>

      <div className="flex flex-col-reverse gap-2 sm:flex-row sm:items-center sm:justify-end">
        {done ? (
          <p className="text-success-foreground text-sm sm:me-auto" data-motion="fade-in" role="status">
            申请已提交，我们会在 1 个工作日内审核。
          </p>
        ) : null}
        <Button type="reset" variant="ghost">
          重置
        </Button>
        <Button loading={loading} type="submit">
          提交申请
        </Button>
      </div>
    </Form>
  );
}
```

### 服务端错误
Source: apps/docs/src/content/form/demos/02-server-errors.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Form } from "@qingye/ui/components/form";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = {
  title: "服务端错误",
  description: "把接口返回的字段错误交给 errors，空的 <FieldError /> 会显示对应字段的错误；修改字段后自动清除。",
};

type Errors = Record<string, string | string[]>;

async function createDevice(values: Record<string, unknown>): Promise<Errors> {
  await new Promise((resolve) => setTimeout(resolve, 600));
  const errors: Errors = {};
  if (!/^[A-Z]{2}-\d{3}$/.test(String(values.code))) errors.code = "编号格式为两位大写字母 + 三位数字，例如 HZ-031。";
  if (String(values.code) === "HZ-031") errors.code = "编号 HZ-031 已被“温湿度传感器”占用。";
  if (!String(values.name).trim()) errors.name = "请填写设备名称。";
  return errors;
}

export default function Demo() {
  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);
  return (
    <Form
      className="flex w-full max-w-xs flex-col gap-4"
      errors={errors}
      onFormSubmit={async (values) => {
        setLoading(true);
        setErrors(await createDevice(values));
        setLoading(false);
      }}
    >
      <Field name="code">
        <FieldLabel>设备编号</FieldLabel>
        <Input defaultValue="HZ-031" />
        <FieldError />
      </Field>
      <Field name="name">
        <FieldLabel>设备名称</FieldLabel>
        <Input placeholder="例如：2 号库温湿度传感器" />
        <FieldError />
      </Field>
      <Button loading={loading} type="submit">
        添加设备
      </Button>
    </Form>
  );
}
```

