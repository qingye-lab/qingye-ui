# Combobox

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/combobox
Source: packages/ui/src/components/combobox.tsx
Source SHA-256: 83deba918ea963676d4053fa9c97c0a14a39dc0f2f23edf5a2b0c79ad422d590

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
- One geometry following the density axis; compact tightens the container, never the text; popup positioning uses available width and height.

## Customization
- Per-part render/refs/ARIA/events, public primitives, and shared popup roles.

## Current exports
- Combobox: function; owner combobox; PASS; props: ComboboxProps<Value>
- ComboboxClear: function; owner combobox; PASS; props: ComboboxPrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>
- ComboboxControl: function; owner combobox; PASS; props: InputGroupProps
- ComboboxEmpty: function; owner combobox; PASS; props: ComboboxPrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>
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
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Combobox
A public Base UI single-value candidate context with caller-provided options.
- value / defaultValue / onValueChange: Value | null / Value | null / (value, details) => void. Controlled or uncontrolled confirmation. details.cancel() rejects changes. A callback does not mean submission or persistence.
- inputValue / defaultInputValue / onInputValueChange: string / string / (value, details) => void. Independent query text. It is not serialized as selection and does not clear confirmation when emptied.
- items / itemToStringLabel / itemToStringValue / isItemEqualToValue: Base UI public props. The caller provides candidates, readable labels, form strings, and identity equality. Define meaningful labels and submission values for objects.
- name / form / required / disabled / readOnly: Base UI Root props. The primitive connects Field naming and errors. FormData submits confirmed selection only. Read-only submits; disabled is excluded.
- open / defaultOpen / onOpenChange: Base UI open props. Opening is controllable. Input, actions, and items share one geometry following the density axis. multiple is false.

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
import { Combobox, ComboboxClear, ComboboxControl, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "确认候选", titleEn: "Confirm a candidate" };
const members = ["陈致远", "李一鸣", "王一帆", "赵子纯"];
export default function Demo() {
  const [value, setValue] = useState<string | null>("陈致远");
  return <form className="max-w-xs"><Field name="owner"><FieldLabel>负责人</FieldLabel><Combobox items={members} value={value} onValueChange={setValue}><ComboboxControl><ComboboxInput /><ComboboxClear /><ComboboxTrigger /></ComboboxControl><ComboboxPopup><ComboboxEmpty>没有匹配的成员</ComboboxEmpty><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup></Combobox></Field></form>;
}
```

### 密度与只读
Source: apps/docs/src/content/combobox/demos/02-density.tsx
```tsx
import { Combobox, ComboboxControl, ComboboxInput, ComboboxItem, ComboboxList, ComboboxPopup, ComboboxTrigger } from "@qingye_lab/ui/components/combobox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度与只读", titleEn: "Density and read-only" };

const items = ["机柜 A", "机柜 B", "机柜 C"];

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-3 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Combobox items={items} defaultValue="机柜 A">
              <ComboboxControl><ComboboxInput /><ComboboxTrigger /></ComboboxControl>
              <ComboboxPopup><ComboboxList>{(item: string) => <ComboboxItem key={item} value={item}>{item}</ComboboxItem>}</ComboboxList></ComboboxPopup>
            </Combobox>
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读候选</FieldLabel><Combobox readOnly items={items} defaultValue="机柜 A"><ComboboxControl><ComboboxInput /><ComboboxTrigger /></ComboboxControl></Combobox></Field>
    </div>
  );
}
```
