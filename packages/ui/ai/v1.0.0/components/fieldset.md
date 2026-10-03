# 字段组 Fieldset

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/fieldset
Source: packages/ui/src/components/fieldset.tsx
Source SHA-256: 1dc3ff00ae8d76f9a5ff80c54074232c4e41d08f8c7d8cde196d2aed27e4f046

为一组相关字段提供共同名称与禁用范围。

## Decision
共同名称说明范围；每个字段仍由自己的标签命名。只有位置关系时用 FieldGroup。

## Notes
- Fieldset 不绘制额外卡片或边框。共同名称不能代替每个输入的名称。
- FieldSet / FieldLegend 别名已删除，统一用 Fieldset / FieldsetLegend。

## Use and ownership
- 一组字段或选项需要共同名称。
- Avoid: 仅为排版创建语义分组；共同名称代替单项名称。
- Library: Base UI 分组命名、原生字段组与禁用传播。
- Application: 共同问题、成员和值。

## Composition
- Legend 命名组；Field 命名单值；原生控件同样保留字段组语义。

## Responsive behavior
- 组与长 legend 可收缩换行；字段间消费 field-group-gap。

## Customization
- 无额外围合；variant 改共同名称的文字档，render 可替换 legend 元素。

## Current exports
- Fieldset: function; owner fieldset; PASS; props: FieldsetProps
- FieldsetLegend: function; owner fieldset; PASS; props: FieldsetLegendProps
- FieldsetLegendProps: type; owner fieldset; PASS
- FieldsetPrimitive: reexport; owner fieldset; UNVERIFIED
- FieldsetProps: type; owner fieldset; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Fieldset
Base UI Root，默认 fieldset；使用字段组间隔。
- disabled: boolean; default false. 禁用整组控件。
- className / style / render / ref: Base UI Fieldset.Root props. 透传原生属性；样式支持状态函数。

### FieldsetLegend
默认真实 legend；Base UI 同时维护 aria-labelledby。
- variant: "legend" | "label"; default "legend". 分节名称用 heading 档，共同问题用 label 档。具体文字值是预设。
- render: Base UI render. 可替换元素，命名关联仍保留。

### FieldsetPrimitive
Base UI 公共组合出口。

## Keyboard
- Tab / Shift+Tab: 按文档顺序访问组内控件；禁用控件不进入焦点顺序。

## Source examples
### 字段组
Source: apps/docs/src/content/fieldset/demos/01-default.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "字段组", titleEn: "Related fields" };

export default function Demo() {
  return <Fieldset className="w-full max-w-sm"><FieldsetLegend>名称</FieldsetLegend><Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field><Field><FieldLabel>简称</FieldLabel><Input /></Field></Fieldset>;
}
```

### 标签档
Source: apps/docs/src/content/fieldset/demos/02-label-legend.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";

export const meta = { title: "标签档", titleEn: "Label legend" };

export default function Demo() {
  return <Fieldset className="w-full max-w-sm"><FieldsetLegend variant="label">选项</FieldsetLegend><Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>选项一</FieldLabel></Field><Field orientation="horizontal"><Checkbox /><FieldLabel>选项二</FieldLabel></Field></Fieldset>;
}
```

### 整组禁用
Source: apps/docs/src/content/fieldset/demos/03-disabled.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "整组禁用", titleEn: "Disabled group" };

export default function Demo() {
  return <Fieldset className="w-full max-w-sm" disabled><FieldsetLegend>名称</FieldsetLegend><Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field><Field><FieldLabel>简称</FieldLabel><Input defaultValue="Qingye" /></Field></Fieldset>;
}
```
