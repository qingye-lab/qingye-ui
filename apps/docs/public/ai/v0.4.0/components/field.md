# 表单项 Field

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/field
Source: packages/ui/src/components/field.tsx
Source SHA-256: c4768d9acd9d2d566a355d32594c857ba47035146a98e494fd1b1554ebf1be28

把标签、控件、说明与错误信息组织成一个表单项，自动处理关联、禁用与校验状态。

## Use and ownership
- 把一个问题、控件、必要说明与原位错误放在同一关系中。
- Avoid: 标签、示例和错误各自表达事实；不要给每个字段都重复一段操作说明。
- Library: 控制关联、校验状态与描述、错误的可访问连接。
- Application: 业务规则、草稿、后端错误和保存结果。

## Composition
- 纵向适合文字输入，水平适合复选或开关；FieldContent 容纳名称和必要说明。

## Responsive behavior
- 说明与错误可换行而不挤掉控件；横向名称列允许收缩。

## Customization
- orientation 调整字段关系；FieldTitle 不能冒充 label，非原生组合显式关联 id。

## Current exports
- Field: function; owner field; PASS; props: FieldPrimitive.Root.Props & {
  /** `horizontal` places the label beside the control, for switches and checkboxes. */
  orientation?: FieldOrientation;
}
- FieldContent: function; owner field; PASS; props: React.ComponentProps<"div">
- FieldControl: const; owner field; PASS
- FieldDescription: function; owner field; PASS; props: FieldPrimitive.Description.Props
- FieldError: function; owner field; PASS; props: FieldErrorProps
- FieldGroup: function; owner field; PASS; props: React.ComponentProps<"div">
- FieldItem: function; owner field; PASS; props: FieldPrimitive.Item.Props
- FieldLabel: function; owner field; PASS; props: FieldPrimitive.Label.Props
- FieldLegend: function; owner fieldset; alias of FieldsetLegend; PASS; props: FieldsetPrimitive.Legend.Props & {
  /** `label` sizes the legend like a field label for compact groups. */
  variant?: "legend" | "label";
}
- FieldOrientation: type; owner field; PASS
- FieldPrimitive: reexport; owner field; UNVERIFIED
- FieldSeparator: function; owner field; PASS; props: React.ComponentProps<"div">
- FieldSet: function; owner fieldset; alias of Fieldset; PASS; props: FieldsetPrimitive.Root.Props
- FieldTitle: function; owner field; PASS; props: React.ComponentProps<"div">
- FieldValidity: const; owner field; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Field
基于 Base UI Field.Root。为内部控件提供 id、aria-describedby 与校验状态。
- orientation: "vertical" | "horizontal"; default "vertical". horizontal 让标签与控件并排，用于开关、复选框行。
- name: string. 字段名；在 Form 中用于提交值与匹配 errors。
- invalid: boolean. 外部校验结果（如表单库）；为 true 时控件标记为无效。
- disabled: boolean; default false. 禁用标签与控件。
- validate: (value, formValues) => string | string[] | null. 自定义校验，返回错误信息。
- validationMode: "onSubmit" | "onBlur" | "onChange"; default "onSubmit". 何时校验。

### FieldLabel
标签，自动关联控件；禁用时一起变淡。

### FieldDescription
说明文字，自动加入控件的 aria-describedby。

### FieldError
错误信息，出现时轻微淡入，并加入 aria-describedby。
- children: ReactNode. 有内容时直接显示，由调用方决定何时渲染。
- errors: Array<{ message?: string } | undefined>. 表单库的错误数组；去重，多条时显示为列表。
- match: boolean | keyof ValidityState. 只在某个校验状态下显示，如 "valueMissing"、"typeMismatch"。

### FieldContent
横向表单项中包住标签与说明的一列。

### FieldTitle
非 <label> 的标题，用于控件自带标签（如 ToggleGroup、选项卡片）的场景。

### FieldGroup
一组表单项的纵向间距容器。

### FieldSeparator
表单项之间的分隔线，可带一段短文字。

### FieldControl / FieldValidity
Base UI 原语：自定义控件与读取校验状态。

## Keyboard
- Tab: 按文档顺序在控件间移动；点击标签聚焦或切换对应控件。

## Source examples
### 默认
Source: apps/docs/src/content/field/demos/01-default.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "默认", description: "标签、控件、说明自上而下排列。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>显示名称</FieldLabel>
      <Input defaultValue="林晓" />
      <FieldDescription>同事在评论与提及中看到的名字。</FieldDescription>
    </Field>
  );
}
```

### 校验
Source: apps/docs/src/content/field/demos/02-validation.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = {
  title: "校验",
  description: "validationMode=\"onBlur\" 在离开输入框时校验；match 让每条文案只对应一种错误。试着留空或输入不完整的邮箱。",
};

export default function Demo() {
  return (
    <Field className="w-full max-w-xs" validationMode="onBlur">
      <FieldLabel>
        工作邮箱 <span aria-hidden="true" className="text-destructive-foreground">*</span>
      </FieldLabel>
      <Input placeholder="name@company.com" required type="email" />
      <FieldError match="valueMissing">请填写工作邮箱。</FieldError>
      <FieldError match="typeMismatch">邮箱格式不正确，例如 lin.xiao@company.com。</FieldError>
    </Field>
  );
}
```

### 横向
Source: apps/docs/src/content/field/demos/03-horizontal.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldLabel, FieldSeparator } from "@qingye/ui/components/field";
import { Switch } from "@qingye/ui/components/switch";

export const meta = {
  title: "横向",
  description: "orientation=\"horizontal\" 用于开关与复选框；FieldContent 包住标签和说明，控件与第一行对齐。",
};

export default function Demo() {
  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>设备离线提醒</FieldLabel>
          <FieldDescription>设备超过 10 分钟未上报时，通过短信通知负责人。</FieldDescription>
        </FieldContent>
        <Switch defaultChecked />
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <FieldContent>
          <FieldLabel>每周运维报告</FieldLabel>
          <FieldDescription>每周一 9:00 发送到团队邮箱。</FieldDescription>
        </FieldContent>
        <Switch />
      </Field>
      <FieldSeparator />
      <Field orientation="horizontal">
        <Checkbox defaultChecked />
        <FieldContent>
          <FieldLabel>同步到企业微信</FieldLabel>
          <FieldDescription>工单状态变化时推送到“运维值班”群。</FieldDescription>
        </FieldContent>
      </Field>
      <Field orientation="horizontal">
        <Checkbox />
        <FieldLabel>同时抄送给我</FieldLabel>
      </Field>
    </div>
  );
}
```

### 分组与分隔
Source: apps/docs/src/content/field/demos/04-group.tsx
```tsx
import { Button } from "@qingye/ui/components/button";
import { Field, FieldGroup, FieldLabel, FieldSeparator } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "分组与分隔", description: "FieldGroup 统一纵向间距；FieldSeparator 可带一段说明文字。" };

export default function Demo() {
  return (
    <FieldGroup className="max-w-xs">
      <Field>
        <FieldLabel>手机号</FieldLabel>
        <Input autoComplete="tel" inputMode="tel" placeholder="138 0000 0000" />
      </Field>
      <Button>获取验证码</Button>
      <FieldSeparator>或</FieldSeparator>
      <Button variant="outline">使用企业微信登录</Button>
    </FieldGroup>
  );
}
```

### 标题
Source: apps/docs/src/content/field/demos/05-title.tsx
```tsx
import { Field, FieldDescription, FieldTitle } from "@qingye/ui/components/field";
import { ToggleGroup, ToggleGroupItem, ToggleGroupSeparator } from "@qingye/ui/components/toggle-group";

export const meta = {
  title: "标题",
  description: "控件不是单个输入框时，用 FieldTitle 作标题并通过 aria-labelledby 关联。",
};

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldTitle id="delivery-slot">配送时段</FieldTitle>
      <ToggleGroup aria-labelledby="delivery-slot" defaultValue={["morning"]} variant="outline">
        <ToggleGroupItem value="morning">上午</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem value="afternoon">下午</ToggleGroupItem>
        <ToggleGroupSeparator />
        <ToggleGroupItem value="evening">晚间</ToggleGroupItem>
      </ToggleGroup>
      <FieldDescription>晚间时段仅限杭州主城区。</FieldDescription>
    </Field>
  );
}
```

### 表单库错误
Source: apps/docs/src/content/field/demos/06-errors.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = {
  title: "表单库错误",
  description: "errors 接收 react-hook-form、TanStack Form 等给出的错误数组：自动去重，多条时显示为列表。",
};

function check(value: string) {
  return [
    value.length < 8 ? { message: "至少 8 位" } : undefined,
    /\d/.test(value) ? undefined : { message: "至少包含 1 个数字" },
    /[A-Za-z]/.test(value) ? undefined : { message: "至少包含 1 个字母" },
  ].filter(Boolean);
}

export default function Demo() {
  const [value, setValue] = useState("2026");
  const errors = check(value);
  return (
    <Field className="w-full max-w-xs" invalid={errors.length > 0}>
      <FieldLabel>设备管理密码</FieldLabel>
      <Input onChange={(event) => setValue(event.target.value)} value={value} />
      <FieldError errors={errors} />
    </Field>
  );
}
```

### 禁用
Source: apps/docs/src/content/field/demos/07-disabled.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "禁用", description: "Field 的 disabled 同时作用于标签与控件。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs" disabled>
      <FieldLabel>组织 ID</FieldLabel>
      <Input defaultValue="org_7f3a92c1" />
      <FieldDescription>创建后不可修改。</FieldDescription>
    </Field>
  );
}
```

