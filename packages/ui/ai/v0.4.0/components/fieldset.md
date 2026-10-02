# 字段组 Fieldset

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/fieldset
Source: packages/ui/src/components/fieldset.tsx
Source SHA-256: 0fb846bb978074c1d118779da01cb472381aeb0ae31385b4d8335aaaf6cf1fb2

把一组相关的表单项放在同一个标题下，例如“发票信息”“通知方式”；可整体禁用。

## Use and ownership
- 给相关字段或选项提供共同问题与作用范围。
- Avoid: 只有布局关系时不要额外制造语义分组；每个字段仍需自身名称。
- Library: 原生 fieldset、legend 关联与禁用传播。
- Application: 分组问题、成员数据和操作范围。

## Composition
- Legend 定义共同问题，Field 或 Radio/CheckboxGroup 承载组内独立控件。

## Responsive behavior
- 组容器允许收缩，长 legend 可换行；组内字段按任务保留空间。

## Customization
- variant=label 适合紧凑选项组，不以缩小命中区换密度。

## Current exports
- Fieldset: function; owner fieldset; PASS; props: FieldsetPrimitive.Root.Props
- FieldsetLegend: function; owner fieldset; PASS; props: FieldsetPrimitive.Legend.Props & {
  /** `label` sizes the legend like a field label for compact groups. */
  variant?: "legend" | "label";
}
- FieldsetPrimitive: reexport; owner fieldset; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Fieldset
基于 Base UI Fieldset，渲染 <fieldset>，子项纵向排列、间距 16px。别名 FieldSet。
- disabled: boolean; default false. 禁用组内所有表单项。

### FieldsetLegend
组标题，自动通过 aria-labelledby 关联到 <fieldset>，读屏进入组内控件前会先读出它。Base UI 渲染的是 div 而非原生 <legend>（原生 legend 无法随内容自动布局），语义由 aria-labelledby 提供。别名 FieldLegend。
- variant: "legend" | "label"; default "legend". legend 为分节标题；label 与字段标签同级，用于一组复选框或单选。

## Keyboard

## Source examples
### 默认
Source: apps/docs/src/content/fieldset/demos/01-default.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "默认" };

export default function Demo() {
  return (
    <Fieldset className="max-w-sm">
      <FieldsetLegend>发票信息</FieldsetLegend>
      <Field>
        <FieldLabel>发票抬头</FieldLabel>
        <Input defaultValue="杭州言青科技有限公司" />
      </Field>
      <Field>
        <FieldLabel>纳税人识别号</FieldLabel>
        <Input className="numeric" placeholder="18 位统一社会信用代码" />
        <FieldDescription>可在营业执照上找到。</FieldDescription>
      </Field>
    </Fieldset>
  );
}
```

### 作为问题
Source: apps/docs/src/content/fieldset/demos/02-label-legend.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "作为问题", description: "variant=\"label\" 的标题与字段标签同级，适合一组复选框。" };

export default function Demo() {
  return (
    <Fieldset className="max-w-sm gap-3">
      <FieldsetLegend variant="label">通过哪些方式通知你？</FieldsetLegend>
      <Label>
        <Checkbox defaultChecked name="channel" value="sms" />
        短信
      </Label>
      <Label>
        <Checkbox defaultChecked name="channel" value="email" />
        邮件
      </Label>
      <Label>
        <Checkbox name="channel" value="wecom" />
        企业微信
      </Label>
    </Fieldset>
  );
}
```

### 禁用
Source: apps/docs/src/content/fieldset/demos/03-disabled.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "禁用", description: "disabled 作用于组内所有表单项，例如审核期间锁定资料。" };

export default function Demo() {
  return (
    <Fieldset className="max-w-sm" disabled>
      <FieldsetLegend>开户资料（审核中）</FieldsetLegend>
      <Field>
        <FieldLabel>开户银行</FieldLabel>
        <Input defaultValue="招商银行杭州分行" />
      </Field>
      <Field>
        <FieldLabel>银行账号</FieldLabel>
        <Input className="numeric" defaultValue="5719 0012 3456 789" />
      </Field>
    </Fieldset>
  );
}
```

