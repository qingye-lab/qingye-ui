# Fieldset

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/fieldset
Source: packages/ui/src/components/fieldset.tsx
Source SHA-256: a7cb5961235149cd60abe9b0291b81238c755469f313982fd9446a41f0138ad4

Give related fields a shared name and disabled scope.

## Decision
The shared name identifies the scope; every field keeps its own label. Use FieldGroup for placement alone.

## Notes
- Fieldset adds no card or border. A shared name does not replace individual input names.
- FieldSet / FieldLegend aliases have been removed. Use Fieldset / FieldsetLegend.

## Use and ownership
- A group of fields or options needs a shared name.
- Avoid: Semantic groups for layout alone or a shared name replacing individual names.
- Library: Base UI group naming, native fieldsets, and disabled propagation.
- Application: The shared question, members, and values.

## Composition
- Legend names the group; Field names one value. Native controls retain fieldset semantics.

## Responsive behavior
- Groups and long legends shrink/wrap; fields consume field-group-gap.

## Customization
- No extra enclosure. variant chooses the shared name's text profile; render can replace the legend element.

## Current exports
- Fieldset: function; owner fieldset; PASS; props: FieldsetProps
- FieldsetLegend: function; owner fieldset; PASS; props: FieldsetLegendProps
- FieldsetLegendProps: type; owner fieldset; PASS
- FieldsetPrimitive: reexport; owner fieldset; UNVERIFIED
- FieldsetProps: type; owner fieldset; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Fieldset
- no props declared by this library
- plus 281 inherited (@types/react 278, @base-ui/react 3); not expanded, see the installed declarations

### FieldsetLegend
- `variant?`: `"label" | "legend"`. 分节名称与共同问题分别消费已有的标题档/名称档。
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Fieldset
Base UI Root, rendered as fieldset with field-group spacing.
- disabled: boolean; default false. Disables controls throughout the group.
- className / style / render / ref: Base UI Fieldset.Root props. Native props are forwarded; styles support state functions.

### FieldsetLegend
A real legend by default; Base UI also maintains aria-labelledby.
- variant: "legend" | "label"; default "legend". Heading profile for a section name, label profile for a shared question. Text values are presets.
- render: Base UI render. Replaces the element while retaining the naming association.

### FieldsetPrimitive
Base UI public composition outlet.

## Keyboard
- Tab / Shift+Tab: Visit controls in document order; disabled controls leave the tab order.

## Source examples
### 字段组
Source: apps/docs/src/content/fieldset/demos/01-default.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye_lab/ui/components/fieldset";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "字段组", titleEn: "Related fields" };

export default function Demo() {
  return <Fieldset className="w-full max-w-sm"><FieldsetLegend>名称</FieldsetLegend><Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field><Field><FieldLabel>简称</FieldLabel><Input /></Field></Fieldset>;
}
```

### 标签档
Source: apps/docs/src/content/fieldset/demos/02-label-legend.tsx
```tsx
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye_lab/ui/components/fieldset";

export const meta = { title: "标签档", titleEn: "Label legend" };

export default function Demo() {
  return <Fieldset className="w-full max-w-sm"><FieldsetLegend variant="label">通知范围</FieldsetLegend><Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>设备离线</FieldLabel></Field><Field orientation="horizontal"><Checkbox /><FieldLabel>同步失败</FieldLabel></Field></Fieldset>;
}
```

### 整组禁用
Source: apps/docs/src/content/fieldset/demos/03-disabled.tsx
```tsx
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye_lab/ui/components/fieldset";
import { Input } from "@qingye_lab/ui/components/input";

export const meta = { title: "整组禁用", titleEn: "Disabled group" };

export default function Demo() {
  return <Fieldset className="w-full max-w-sm" disabled><FieldsetLegend>名称</FieldsetLegend><Field><FieldLabel>全称</FieldLabel><Input defaultValue="青野" /></Field><Field><FieldLabel>简称</FieldLabel><Input defaultValue="Qingye" /></Field></Fieldset>;
}
```
