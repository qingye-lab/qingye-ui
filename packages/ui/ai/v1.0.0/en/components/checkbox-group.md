# CheckboxGroup

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/checkbox-group
Source: packages/ui/src/components/checkbox-group.tsx
Source SHA-256: fe0248cc06c34c992d2211ae1c9fe08d3e9c7b8c9183375af4b2de25c4f813f0

Connect checkboxes to one collection and shared scope.

## Decision
CheckboxGroup owns a collection value. allValues defines the parent action's scope and must change with the actual candidate set.

## Notes
- Field.name or each Checkbox.name determines the form field; repeated names submit multiple values.
- FieldItem/FieldLabel belong inside Field; native labels also work outside a group.
- Read-only limits an item; disabled limits the group. An empty collection does not imply invalid.

## Use and ownership
- Several candidates can be selected together.
- A parent checkbox controls an explicit complete collection.
- Avoid: Use layout components when only arranging content.
- Avoid: Use RadioGroup for mutually exclusive candidates.
- Avoid: Use Switch for settings.
- Library: Uncontrolled collection, focus, keyboard, and parent mixed state.
- Application: Controlled collection, allValues, candidates, invalid facts, and submission.

## Composition
- FieldTitle names the group; FieldItem + Checkbox + FieldLabel name an item; FieldDescription/FieldError refer to the same collection.

## Responsive behavior
- Uses Checkbox dimensions and touch targets; this batch did not run browser geometry acceptance.

## Customization
- field-gap within the group; each Checkbox exposes size and styling.

## Current exports
- CheckboxGroup: function; owner checkbox-group; PASS; props: CheckboxGroupProps
- CheckboxGroupPrimitive: reexport; owner checkbox-group; UNVERIFIED
- CheckboxGroupProps: type; owner checkbox-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CheckboxGroup
Collection state beyond checkbox layout.
- value / defaultValue: string[]. Controlled or initial collection; an empty array means no selected items. Checkbox.value identifies members.
- onValueChange: (value: string[], details) => void. Supplies the changed collection; details.cancel() cancels this change.
- allValues: string[]. The complete scope used with a parent Checkbox for all/none/mixed. Supplied by the caller rather than inferred from business data.
- disabled: boolean; default false. Actually disables group checkboxes; per-item readOnly belongs on Checkbox.
- aria-labelledby / aria-label: string. A shared name, optionally referencing FieldTitle or FieldsetLegend.
- render / ref / className / style: Base UI composition. Forward root/native props and events; styles support primitive state callbacks.

### CheckboxGroupPrimitive
The public Base UI collection primitive.

## Keyboard
- Tab / Shift+Tab: Reach available checkboxes individually.
- Space: Add/remove the current item; the parent operates on the complete allValues scope.

## Source examples
### 集合
Source: apps/docs/src/content/checkbox-group/demos/01-selection.tsx
```tsx
import { useId, useState } from "react";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { CheckboxGroup } from "@qingye/ui/components/checkbox-group";
import { Field, FieldItem, FieldLabel, FieldTitle } from "@qingye/ui/components/field";

export const meta = { title: "集合", titleEn: "Collection" };
const options = [{ value: "alpha", label: "甲" }, { value: "beta", label: "乙" }, { value: "gamma", label: "丙" }];

export default function Demo() {
  const id = useId(); const [value, setValue] = useState(["alpha"]);
  return <Field name="choices"><FieldTitle id={id}>可选项</FieldTitle>
    <CheckboxGroup aria-labelledby={id} value={value} onValueChange={setValue} allValues={options.map(option => option.value)}>
      <FieldItem><Checkbox parent /><FieldLabel>全部</FieldLabel></FieldItem>
      {options.map(option => <FieldItem key={option.value}><Checkbox value={option.value} /><FieldLabel>{option.label}</FieldLabel></FieldItem>)}
    </CheckboxGroup>
    <output className="text-support text-foreground" aria-live="polite">{value.length} 项</output>
  </Field>;
}
```

### 状态
Source: apps/docs/src/content/checkbox-group/demos/02-states.tsx
```tsx
import { useId } from "react";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { CheckboxGroup } from "@qingye/ui/components/checkbox-group";
import { Field, FieldError, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye/ui/components/field";

export const meta = { title: "状态", titleEn: "States" };
export default function Demo() {
  const id = useId();
  return <FieldGroup className="grid sm:grid-cols-3">
    <Field><FieldTitle id={`${id}-disabled`}>禁用集合</FieldTitle><CheckboxGroup disabled defaultValue={["alpha"]} aria-labelledby={`${id}-disabled`}><FieldItem><Checkbox value="alpha" /><FieldLabel>甲</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>乙</FieldLabel></FieldItem></CheckboxGroup></Field>
    <Field><FieldTitle id={`${id}-readonly`}>只读项</FieldTitle><CheckboxGroup defaultValue={["alpha"]} aria-labelledby={`${id}-readonly`}><FieldItem><Checkbox readOnly value="alpha" /><FieldLabel>甲</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>乙</FieldLabel></FieldItem></CheckboxGroup></Field>
    <Field invalid><FieldTitle id={`${id}-invalid`}>受限范围</FieldTitle><CheckboxGroup aria-labelledby={`${id}-invalid`}><FieldItem><Checkbox value="alpha" /><FieldLabel>甲</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>乙</FieldLabel></FieldItem></CheckboxGroup><FieldError>至少选择一项</FieldError></Field>
  </FieldGroup>;
}
```
