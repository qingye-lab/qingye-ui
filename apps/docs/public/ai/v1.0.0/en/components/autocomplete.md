# Autocomplete

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/autocomplete
Source: packages/ui/src/components/autocomplete.tsx
Source SHA-256: 3c23403e6ca6bd38e4444fa4aedc84b16dd40398820232819fac1b49d8c1f4ff

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
- Five matching text/control profiles; the popup is constrained by available space.

## Customization
- Public parts/primitives, render/refs/ARIA/events, and shared floating layers.

## Current exports
- Autocomplete: function; owner autocomplete; PASS; props: AutocompleteProps<Value>
- AutocompleteClear: function; owner autocomplete; PASS; props: AutocompletePrimitive.Clear.Props & React.RefAttributes<HTMLButtonElement>
- AutocompleteEmpty: const; owner autocomplete; UNVERIFIED
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
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Autocomplete
A Base UI text-suggestion context fixed to list mode.
- value / defaultValue / onValueChange: string / string / (value, details) => void. Controlled or uncontrolled free text. details.cancel() can reject edits or suggestion requests.
- items / itemToStringValue / filter: readonly Value[] / Base UI public props. Provide flat suggestions, their text, and filtering. Define text for object suggestions. Use AutocompletePrimitive for grouped advanced compositions.
- name / form / required / disabled / readOnly: Base UI Root props. The actual input registers Field once and submits free text. Read-only submits; disabled is excluded.
- open / defaultOpen / onOpenChange / size: Base UI open props / 'xs' | 'sm' | 'md' | 'lg' | 'xl'; default size: 'md'. Opening is controllable. Input, actions, and suggestions share five size profiles.

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
import { Autocomplete, AutocompleteClear, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "自由文本", titleEn: "Free text" };
const items = ["青叶", "青山", "白云"];
export default function Demo() {
  const [value, setValue] = useState("");
  return <form><Field name="text"><FieldLabel>文字</FieldLabel><Autocomplete items={items} value={value} onValueChange={setValue}><div className="flex min-w-0 gap-(--qy-action-gap)"><AutocompleteInput /><AutocompleteClear /><AutocompleteTrigger /></div><AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup></Autocomplete><output className="text-support text-muted-foreground">{value || "—"}</output></Field></form>;
}
```

### 五档与只读
Source: apps/docs/src/content/autocomplete/demos/02-sizes.tsx
```tsx
import { Autocomplete, AutocompleteInput, AutocompleteItem, AutocompleteList, AutocompletePopup, AutocompleteTrigger } from "@qingye/ui/components/autocomplete";
import { Field, FieldLabel } from "@qingye/ui/components/field";
export const meta = { title: "五档与只读", titleEn: "Five sizes and read-only" };
const items = ["青叶", "青山", "白云"];
export default function Demo() {
  return <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2 lg:grid-cols-3">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Field key={size}><FieldLabel>{size}</FieldLabel><Autocomplete size={size} items={items} defaultValue="青"><div className="flex min-w-0 gap-(--qy-action-gap)"><AutocompleteInput /><AutocompleteTrigger /></div><AutocompletePopup><AutocompleteList>{(item: string) => <AutocompleteItem key={item} value={item}>{item}</AutocompleteItem>}</AutocompleteList></AutocompletePopup></Autocomplete></Field>)}<Field><FieldLabel>只读文本</FieldLabel><Autocomplete readOnly items={items} defaultValue="自由文本"><div className="flex min-w-0 gap-(--qy-action-gap)"><AutocompleteInput /><AutocompleteTrigger /></div></Autocomplete></Field></div>;
}
```
