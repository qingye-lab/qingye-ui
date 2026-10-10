# Autocomplete

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/autocomplete
Source: packages/ui/src/components/autocomplete.tsx
Source SHA-256: 9d10ef770a43ece6feae1b8c32c9a4ad06f34fb8228913d2ed721c9b3625ffe5

Edit free text with optional suggestions.

## Decision
The text itself is the value. Highlighting does not change it; accepting a suggestion requests replacement. Text can submit without matching a suggestion.

## Notes
- Use Combobox when a value must be confirmed from candidates.
- An empty set does not imply an error or service failure. Supply empty content from real facts.
- Caller positioning style merges last; colors, corners, highlights, and focus use existing theme roles.

## Use and ownership
- Edit free text with optional suggestions.
- Avoid: Do not use a placeholder as the only label; keep input after a failure unless there is a reason to clear it.
- Library: Suggestion highlighting, focus, and uncontrolled text.
- Application: Controlled text, suggestion data, errors, and submission outcomes.

## Composition
- Field + FieldLabel + Autocomplete / Input / actions / Popup / List / Item

## Responsive behavior
- One geometry following the density axis; compact tightens the container, never the text; the popup is constrained by available space.

## Customization
- Public parts/primitives, render/refs/ARIA/events, and shared floating layers.

## Current exports
- Autocomplete: function; owner autocomplete; PASS; props: AutocompleteProps<Value>
- AutocompleteClear: function; owner autocomplete; PASS; props: AutocompletePrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>
- AutocompleteControl: function; owner autocomplete; PASS; props: InputGroupProps
- AutocompleteEmpty: function; owner autocomplete; PASS; props: AutocompletePrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteInput: function; owner autocomplete; PASS; props: AutocompletePrimitive.Input.Props & React.RefAttributes<HTMLInputElement>
- AutocompleteItem: function; owner autocomplete; PASS; props: AutocompletePrimitive.Item.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteList: function; owner autocomplete; PASS; props: AutocompletePrimitive.List.Props & React.RefAttributes<HTMLDivElement>
- AutocompletePopup: function; owner autocomplete; PASS; props: AutocompletePopupProps
- AutocompletePopupProps: type; owner autocomplete; PASS
- AutocompletePrimitive: reexport; owner autocomplete; UNVERIFIED
- AutocompleteProps: type; owner autocomplete; PASS
- AutocompleteTrigger: function; owner autocomplete; PASS; props: AutocompletePrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Autocomplete
A Base UI text-suggestion context fixed to list mode.
- value / defaultValue / onValueChange: string / string / (value, details) => void. Controlled or uncontrolled free text. details.cancel() can reject edits or suggestion requests.
- items / itemToStringValue / filter: readonly Value[] / Base UI public props. Provide flat suggestions, their text, and filtering. Define text for object suggestions. Use AutocompletePrimitive for grouped advanced compositions.
- name / form / required / disabled / readOnly: Base UI Root props. The actual input registers Field once and submits free text. Read-only submits; disabled is excluded.
- open / defaultOpen / onOpenChange: Base UI open props. Opening is controllable. Input, actions, and suggestions share one geometry that follows the density axis.

### AutocompleteInput / AutocompleteTrigger / AutocompleteClear
Real Input/Button outlets forwarding refs, render, ARIA, and events. Clear requests empty text.

### AutocompletePopup
Public candidate Portal/Positioner/Popup forwarding container and positionerProps with shared layer order.

### AutocompleteList / AutocompleteItem / AutocompleteEmpty
Suggestion list, text suggestions, and caller-provided real empty content.

### AutocompletePrimitive
The installed Base UI Autocomplete namespace.

## Keyboard
- ArrowDown / ArrowUp: Highlight suggestions while text and FormData retain the current value.
- Enter: Request the highlighted suggestion text.
- Escape / Tab: Leave the list; text remains editable and submittable.

## Source examples
### 自由文本
Source: apps/docs/src/content/autocomplete/demos/01-text.tsx
```tsx
import { useState } from "react";
import { Autocomplete, AutocompleteControl, AutocompleteClear, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye_lab/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
export const meta = { title: "自由文本", titleEn: "Free text" };
const items = ["青叶", "青山", "白云"];
export default function Demo() {
  const [value, setValue] = useState("");
  return <form><Field name="text"><FieldLabel>文字</FieldLabel><Autocomplete items={items} value={value} onValueChange={setValue}><AutocompleteControl><AutocompleteInput /><AutocompleteClear /><AutocompleteTrigger /></AutocompleteControl><AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup></Autocomplete><output className="text-support text-muted-foreground">{value || "—"}</output></Field></form>;
}
```

### 密度与只读
Source: apps/docs/src/content/autocomplete/demos/02-density.tsx
```tsx
import { Autocomplete, AutocompleteControl, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye_lab/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "密度与只读", titleEn: "Density and read-only" };

const items = ["3 号楼东侧", "3 号楼西侧", "4 号楼南门"];

export default function Demo() {
  return (
    <div className="grid w-full grid-cols-3 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Autocomplete items={items} defaultValue="3 号楼东侧">
              <AutocompleteControl><AutocompleteInput /><AutocompleteTrigger /></AutocompleteControl>
              <AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup>
            </Autocomplete>
          </Field>
        </div>
      ))}
      <Field><FieldLabel>只读文本</FieldLabel><Autocomplete readOnly items={items} defaultValue="3 号楼东侧"><AutocompleteControl><AutocompleteInput /><AutocompleteTrigger /></AutocompleteControl></Autocomplete></Field>
    </div>
  );
}
```
