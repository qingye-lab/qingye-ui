# Combobox

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/combobox
Source: packages/ui/src/components/combobox.tsx
Source SHA-256: 26479f21d19d54f3fb3d9901063d726e77d447bfa89165651efdd6ddd78941b2

Filter candidates and confirm one value, with query text separate from selection.

## Decision
value is the confirmed candidate; inputValue is the filter draft. Emptying the query preserves selection. Explicit Clear requests an empty selection. Use Autocomplete for free text.

## Notes
- Filtering and empty content must reflect the real candidate data.
- Popup caller style merges last; layer overrides can change the default order.
- Popup surfaces and highlights use existing theme presets with internal focus signals.

## Use and ownership
- Filter candidates and confirm one value, with query text separate from selection.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Candidate keyboard behavior, focus, and uncontrolled query/confirmed value.
- Application: Candidate data, controlled query/value, errors, and submission outcomes.

## Composition
- Field + FieldLabel + Combobox / Input / actions / Popup / List / Item

## Responsive behavior
- Five control/text profiles; popup positioning uses available width and height.

## Customization
- Per-part render/refs/ARIA/events, public primitives, and shared popup roles.

## Current exports
- Combobox: function; owner combobox; PASS; props: ComboboxProps<Value>
- ComboboxClear: function; owner combobox; PASS; props: ComboboxPrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>
- ComboboxEmpty: const; owner combobox; UNVERIFIED
- ComboboxInput: function; owner combobox; PASS; props: ComboboxPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>
- ComboboxItem: function; owner combobox; PASS; props: ComboboxPrimitive.Item.Props & React.RefAttributes<HTMLDivElement>
- ComboboxList: function; owner combobox; PASS; props: ComboboxPrimitive.List.Props & React.RefAttributes<HTMLDivElement>
- ComboboxPopup: function; owner combobox; PASS; props: ComboboxPopupProps
- ComboboxPopupProps: type; owner combobox; PASS
- ComboboxPrimitive: reexport; owner combobox; UNVERIFIED
- ComboboxProps: type; owner combobox; PASS
- ComboboxTrigger: function; owner combobox; PASS; props: ComboboxPrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Combobox
A public Base UI single-value candidate context with caller-provided options.
- value / defaultValue / onValueChange: Value | null / Value | null / (value, details) => void. Controlled or uncontrolled confirmation. details.cancel() rejects changes. A callback does not mean submission or persistence.
- inputValue / defaultInputValue / onInputValueChange: string / string / (value, details) => void. Independent query text. It is not serialized as selection and does not clear confirmation when emptied.
- items / itemToStringLabel / itemToStringValue / isItemEqualToValue: Base UI public props. The caller provides candidates, readable labels, form strings, and identity equality. Define meaningful labels and submission values for objects.
- name / form / required / disabled / readOnly: Base UI Root props. The primitive connects Field naming and errors. FormData submits confirmed selection only. Read-only submits; disabled is excluded.
- open / defaultOpen / onOpenChange / size: Base UI open props / 'xs' | 'sm' | 'md' | 'lg' | 'xl'; default size: 'md'. Opening is controllable. Input, actions, and items share one control/text profile. multiple is false.

### ComboboxInput / ComboboxTrigger / ComboboxClear
Public primitives compose the native Input outlet and Button. Events, ARIA, render state, and refs forward with one Field registration.

### ComboboxPopup
Candidate-specific Portal/Positioner/Popup. positionerProps and container customize positioning; layer order comes from shared floating-layer.

### ComboboxList / ComboboxItem / ComboboxEmpty
Real candidate list, selectable items, and caller-provided empty content. Item.value is a confirmation candidate.

### ComboboxPrimitive
The installed Base UI Combobox namespace.

## Keyboard
- ArrowDown / ArrowUp: Open and move candidate highlighting without changing the submitted value.
- Enter: Request confirmation of the highlighted candidate.
- Escape / Tab: Leave the list using primitive focus and query restoration rules.

## Source examples
### 确认候选
Source: apps/docs/src/content/combobox/demos/01-choice.tsx
```tsx
import { useState } from "react";
import { Combobox, ComboboxClear, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye/ui/components/combobox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "确认候选", titleEn: "Confirm a candidate" };
const items = ["甲", "乙", "丙"];
export default function Demo() {
  const [value, setValue] = useState<string | null>("甲");
  return <form><Field name="choice"><FieldLabel>候选</FieldLabel><Combobox items={items} value={value} onValueChange={setValue}><div className="flex min-w-0 gap-(--qy-action-gap)"><ComboboxInput /><ComboboxClear /><ComboboxTrigger /></div><ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></Combobox><output className="text-support text-muted-foreground">{value ?? "—"}</output></Field></form>;
}
```

### 五档与只读
Source: apps/docs/src/content/combobox/demos/02-sizes.tsx
```tsx
import { Combobox, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye/ui/components/combobox";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "五档与只读", titleEn: "Five sizes and read-only" };
const items = ["甲", "乙", "丙"];
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Field key={size}><FieldLabel>{size}</FieldLabel><Combobox size={size} items={items} defaultValue="甲"><div className="flex min-w-0 gap-(--qy-action-gap)"><ComboboxInput /><ComboboxTrigger /></div><ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></Combobox></Field>)}<Field><FieldLabel>只读候选</FieldLabel><Combobox readOnly items={items} defaultValue="甲"><div className="flex min-w-0 gap-(--qy-action-gap)"><ComboboxInput /><ComboboxTrigger /></div></Combobox></Field></div>;
}
```
