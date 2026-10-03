# 字段 Field

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/field
Source: packages/ui/src/components/field.tsx
Source SHA-256: 4f3e1980271449013140a6fefb8c901af3205262a643cbce344ed7df67e1676e

关联一个值的名称、控件、说明与调用方提供的错误。

## Use and ownership
- 一个值需要持续名称、必要说明或就地错误。
- Avoid: placeholder 代替名称；Toast 代替字段错误；超时冒充格式错误。
- Library: 名称、说明和错误的可访问连接；焦点、触及、禁用传播。
- Application: 值、规则、invalid、错误内容、草稿与送达结果。

## Composition
- Input 自动注册；原生控件通过 FieldControl 注册。Fieldset 命名共同范围，FieldGroup 只组织间隔。

## Responsive behavior
- 长名称与说明可换行；横向内容列可收缩；间距由字段角色决定。

## Customization
- className 最后合并，原生属性、状态样式函数、ref 和 render 透传；FieldTitle 不注册成 label。

## Current exports
- Field: function; owner field; PASS; props: FieldProps
- FieldContent: function; owner field; PASS; props: useRender.ComponentProps<"div">
- FieldControl: const; owner field; PASS
- FieldDescription: function; owner field; PASS; props: React.ComponentProps<typeof FieldPrimitive.Description>
- FieldError: function; owner field; PASS; props: FieldErrorProps
- FieldErrorProps: type; owner field; PASS
- FieldGroup: function; owner field; PASS; props: useRender.ComponentProps<"div">
- FieldItem: function; owner field; PASS; props: React.ComponentProps<typeof FieldPrimitive.Item>
- FieldLabel: function; owner field; PASS; props: React.ComponentProps<typeof FieldPrimitive.Label>
- FieldOrientation: type; owner field; PASS
- FieldPrimitive: reexport; owner field; UNVERIFIED
- FieldProps: type; owner field; PASS
- FieldSeparator: function; owner field; PASS; props: useRender.ComponentProps<"div"> & Pick<SeparatorProps, "decorative">
- FieldTitle: function; owner field; PASS; props: useRender.ComponentProps<"div">
- FieldValidity: const; owner field; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Field
Base UI Field.Root 的共同上下文；自动校验入口交给完整的 FieldPrimitive。
- orientation: "vertical" | "horizontal"; default "vertical". 纵向编辑或横向选项，不改变关联。
- invalid: boolean; default false. 由调用方声明。原生约束、失焦、错误内容不推断此状态。
- disabled: boolean; default false. 禁用关联控件，禁用值不参加原生提交。
- name / dirty / touched: Base UI Field.Root props. 字段名及调用方管理的编辑事实。
- className / style / render / ref: Base UI Field.Root props. 作用于字段根；样式支持状态函数。

### FieldLabel
自动命名注册控件，支持显式 htmlFor 与原语 nativeLabel/render。

### FieldDescription
必要辅助事实；注册到 aria-describedby。

### FieldError
只显示调用方错误，显示时加入 aria-describedby。
- children: ReactNode. 显式内容优先；无内容不生成浏览器或 Form 错误。
- errors: ReadonlyArray<{ message?: string } | undefined>. 忽略空项、去重；多条用列表。
- match: boolean | keyof ValidityState; default true. 保留原语过滤接口；false 隐藏。内容与 invalid 分别由调用方决定。

### FieldTitle
普通事实标题；用于自命名控件或无输入事实，不是 label。

### FieldContent
横向字段的名称、说明内容列。

### FieldGroup
字段之间的关系间隔，没有 group 语义。

### FieldSeparator
字段组分界；有文字时两侧线为装饰。

### FieldItem
同一 Field 内某个控件与标签的局部关联。

### FieldControl / FieldValidity / FieldPrimitive
直接的原语注册、状态读取与完整 API 出口。

## Keyboard
- Tab / Shift+Tab: 按文档顺序进入控件；点击关联标签聚焦或切换控件。

## Source examples
### 标签与说明
Source: apps/docs/src/content/field/demos/01-default.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "标签与说明", titleEn: "Label and description" };

export default function Demo() {
  return <Field className="w-full max-w-xs"><FieldLabel>设备名称</FieldLabel><Input defaultValue="青野" maxLength={20} /><FieldDescription>最多 20 个字。</FieldDescription></Field>;
}
```

### 校验
Source: apps/docs/src/content/field/demos/02-validation.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye/ui/components/button";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "校验", titleEn: "Validation" };

export default function Demo() {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string>();
  return (
    <form noValidate className="flex w-full max-w-xs flex-col gap-(--qy-field-group-gap)" onSubmit={(event) => {
      event.preventDefault();
      const input = event.currentTarget.elements.namedItem("email") as HTMLInputElement;
      setError(input.validity.valueMissing ? "请填写邮箱。" : input.validity.typeMismatch ? "邮箱地址不完整。" : undefined);
    }}>
      <Field invalid={Boolean(error)}><FieldLabel>邮箱</FieldLabel><Input name="email" required type="email" value={value} onValueChange={setValue} autoComplete="email" /><FieldError>{error}</FieldError></Field>
      <Button type="submit">校验</Button>
    </form>
  );
}
```

### 横向组合
Source: apps/docs/src/content/field/demos/03-horizontal.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye/ui/components/field";

export const meta = { title: "横向组合", titleEn: "Horizontal composition" };

export default function Demo() {
  return <Field orientation="horizontal" className="w-full max-w-md"><Checkbox defaultChecked /><FieldContent><FieldLabel>附加备注</FieldLabel><FieldDescription>可选。</FieldDescription></FieldContent></Field>;
}
```

### 字段组
Source: apps/docs/src/content/field/demos/04-group.tsx
```tsx
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "字段组", titleEn: "Field groups" };

export default function Demo() {
  return (
    <FieldGroup className="w-full max-w-sm">
      <Fieldset><FieldsetLegend>名称</FieldsetLegend><Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field><Field><FieldLabel>简称</FieldLabel><Input /></Field></Fieldset>
      <FieldSeparator>备注</FieldSeparator>
      <Field><FieldLabel>补充内容</FieldLabel><Input /></Field>
    </FieldGroup>
  );
}
```

### 标题与自命名控件
Source: apps/docs/src/content/field/demos/05-title.tsx
```tsx
import { useId } from "react";
import { Field, FieldDescription, FieldGroup, FieldTitle } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "标题与自命名控件", titleEn: "Title and self-named control" };

export default function Demo() {
  const titleId = useId();
  return (
    <FieldGroup className="w-full max-w-xs">
      <Field><FieldTitle id={titleId}>设备名称</FieldTitle><Input aria-labelledby={titleId} defaultValue="青野" /></Field>
      <Field><FieldTitle>备注</FieldTitle><FieldDescription>未填写。</FieldDescription></Field>
    </FieldGroup>
  );
}
```

### 错误列表
Source: apps/docs/src/content/field/demos/06-errors.tsx
```tsx
import { useState } from "react";
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
export const meta = { title: "错误列表", titleEn: "Error list" };
export default function Demo() {
  const [value, setValue] = useState("2026");
  const errors = [value.length < 8 ? {message: "至少 8 位"} : undefined, /\d/.test(value) ? undefined : {message: "至少包含 1 个数字"}, /[A-Za-z]/.test(value) ? undefined : {message: "至少包含 1 个字母"}];
  return <Field className="w-full max-w-xs" invalid={errors.some(Boolean)}><FieldLabel>设备管理密码</FieldLabel><Input value={value} onValueChange={setValue} /><FieldError errors={errors} /></Field>;
}
```

### 禁用
Source: apps/docs/src/content/field/demos/07-disabled.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "禁用", titleEn: "Disabled" };

export default function Demo() {
  return <Field className="w-full max-w-xs" disabled><FieldLabel>设备名称</FieldLabel><Input defaultValue="青野" /></Field>;
}
```

