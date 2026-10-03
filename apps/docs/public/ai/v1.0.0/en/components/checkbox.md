# Checkbox

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/checkbox
Source: packages/ui/src/components/checkbox.tsx
Source SHA-256: e26f238e4ac7e3639b3a97216d825d867d7e7df132b2e486b527de1201a2ac02

Choose an independent yes/no value or multiple items in a set.

## Decision
Use Checkbox for independent options and Switch for an immediate setting change. The caller calculates partial selection from the child values.

## Notes
- Compute indeterminate from the actual collection rather than choosing a visual variant.
- FieldLabel or an actual label supplies the name; keep descriptions and errors within Field.
- Selected and invalid may coexist; errors do not clear selection.

## Use and ownership
- Independent binary choices, multiple collection selection, or selections awaiting submission.
- Avoid: Use Switch for settings taking effect immediately.
- Avoid: Use Radio for mutually exclusive selection.
- Library: Focus, keyboard, and uncontrolled checked state.
- Application: Controlled checked state, indeterminate, collection scope, and invalid facts.

## Composition
- Field supplies names, descriptions, and errors.

## Responsive behavior
- Visible geometry and hit areas are separate; this batch checked desktop only.

## Customization
- Matching text line heights, marker radius, and theme colors.

## Current exports
- Checkbox: function; owner checkbox; PASS; props: CheckboxProps
- CheckboxPrimitive: reexport; owner checkbox; UNVERIFIED
- CheckboxProps: type; owner checkbox; PASS
- CheckboxSize: type; owner checkbox; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Checkbox
Base UI checkbox semantics and mixed state.
- checked / defaultChecked: boolean. Controlled checked value or uncontrolled initial value.
- indeterminate: boolean; default false. Actual partial collection selection; aria-checked is mixed.
- onCheckedChange: (checked, eventDetails) => void. Cancelable selection change; the application handles collection updates.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". The visible box uses the matching text line height; touch-target separately supplies its hit area.
- disabled / readOnly: boolean; default false. Disabled skips keyboard access and submission; read-only retains focus/submission without toggling.
- aria-invalid: boolean | 'true' | 'false'. An explicit invalid fact, also available through Field invalid.
- name / value / uncheckedValue / form: string. Preserve actual form submission through the primitive's hidden input.
- render / ref / inputRef / className / style: Base UI composition. Compose the root and hidden input; also set nativeButton when rendering a button.

### CheckboxPrimitive
The complete Base UI Checkbox namespace, including Root and Indicator.

## Keyboard
- Tab / Shift+Tab: Reach each item in document order.
- Space: Toggle selection; read-only and disabled items do not toggle.

## Source examples
### 部分选中
Source: apps/docs/src/content/checkbox/demos/01-selection.tsx
```tsx
import { useState } from "react";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";

export const meta = { title: "部分选中", titleEn: "Partial selection" };

export default function Demo() {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  return (
    <Fieldset>
      <FieldsetLegend>选项</FieldsetLegend>
      <Field orientation="horizontal">
        <Checkbox checked={first && second} indeterminate={first !== second} onCheckedChange={(checked) => { setFirst(checked); setSecond(checked); }} />
        <FieldLabel>全选</FieldLabel>
      </Field>
      <Field orientation="horizontal"><Checkbox checked={first} onCheckedChange={setFirst} /><FieldLabel>选项一</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox checked={second} onCheckedChange={setSecond} /><FieldLabel>选项二</FieldLabel></Field>
    </Fieldset>
  );
}
```

### 状态
Source: apps/docs/src/content/checkbox/demos/02-states.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldContent, FieldError, FieldLabel } from "@qingye/ui/components/field";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <div className="grid gap-(--qy-field-group-gap)">
      <Field orientation="horizontal"><Checkbox /><FieldLabel>选项一</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>选项二</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox readOnly defaultChecked /><FieldLabel>只读</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox disabled /><FieldLabel>禁用</FieldLabel></Field>
      <Field orientation="horizontal" invalid><Checkbox /><FieldContent><FieldLabel>必选项</FieldLabel><FieldError>请选择此项。</FieldError></FieldContent></Field>
    </div>
  );
}
```

### 尺寸
Source: apps/docs/src/content/checkbox/demos/03-sizes.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye/ui/components/field";

export const meta = { title: "尺寸", titleEn: "Sizes" };

export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => (
    <Field key={size} orientation="horizontal"><Checkbox size={size} defaultChecked /><FieldLabel>{size}</FieldLabel></Field>
  ))}</div>;
}
```
