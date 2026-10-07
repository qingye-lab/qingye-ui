# Select

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/select
Source: packages/ui/src/components/select.tsx
Source SHA-256: bcd61db277cc04554f93a2726bdf140efe7c15e9b427ba2197f7b32b07be98da

Choose one value from a collapsible set of options.

## Decision
Highlight marks position; selection changes the value. No selection does not choose the first item automatically. Use RadioGroup for side-by-side comparison.

## Notes
- FieldLabel names the trigger, FieldError associates errors, and SelectGroupLabel names candidate groups.
- null is no selection; empty string and zero can be candidates. Native forms may serialize null and empty string identically as empty.
- Read-only retains the current value; disabled candidates cannot be selected.
- Its Positioner consumes shared popup layers; candidates inside a parent workspace sit above it. positionerProps retain caller styles/refs/render.

## Use and ownership
- Known single-value candidates whose current choice usually suffices.
- Avoid: Use RadioGroup for small sets needing side-by-side comparison.
- Avoid: Use Combobox when many candidates need filtering.
- Avoid: Use Menu for commands and Tabs for views.
- Avoid: Use NativeSelect for essential native picker behavior.
- Library: Focus, opening, highlight, and uncontrolled values.
- Application: Controlled values, candidates, invalid facts, loading/failure/unknown states, and save facts.

## Composition
- FieldLabel + Select + FieldDescription + FieldError; SelectGroup groups candidates.

## Responsive behavior
- Retains -narrow and coarse-pointer roles; this batch checked desktop only.

## Customization
- Matching text/control dimensions, bordered padding, role colors, and Portal containers.

## Current exports
- Select: function; owner select; PASS; props: SelectProps<Value>
- SelectGroup: function; owner select; PASS; props: React.ComponentProps<typeof SelectPrimitive.Group>
- SelectGroupLabel: function; owner select; PASS; props: React.ComponentProps<typeof SelectPrimitive.GroupLabel>
- SelectItem: function; owner select; PASS; props: SelectItemProps
- SelectItemProps: type; owner select; PASS
- SelectPopup: function; owner select; PASS; props: SelectPopupProps
- SelectPopupProps: type; owner select; PASS
- SelectPrimitive: reexport; owner select; UNVERIFIED
- SelectProps: type; owner select; PASS
- SelectTrigger: function; owner select; PASS; props: SelectTriggerProps
- SelectTriggerProps: type; owner select; PASS
- SelectValue: function; owner select; PASS; props: SelectValueProps
- SelectValueProps: type; owner select; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Select
Single-value state and form semantics.
- value / defaultValue: Value | null. Controlled or actual initial value; null means no selection. Omitting an initial value does not choose the first item.
- items: Record<string, ReactNode> | {value, label}[] | Group[]. Name mapping for current values; an explicit empty-string candidate also needs a readable label.
- onValueChange: (value, eventDetails) => void. Cancelable selection change; moving the highlight does not change the value.
- name / form / inputRef / autoComplete: Base UI Root props. Retain primitive hidden inputs, form ownership, and autofill.
- disabled / readOnly / required: boolean; default false. Interaction limits and native constraints; Field or explicit trigger ARIA declares invalid.
- open / defaultOpen / onOpenChange: Base UI Root props. Controlled or uncontrolled opening; canceled return is separate from value selection.
- modal: boolean; default false. Other fields remain interactive by default; change explicitly for the containing task.
- itemToStringLabel / itemToStringValue / isItemEqualToValue: Base UI Root props. Names, serialization, and equality for object candidates.

### SelectTrigger
A bordered selection entry matching Input's profile.
- children: ReactNode. Defaults to SelectValue with a disclosure icon.
- render / ref / className / style / ARIA: Base UI composition. Retain actual trigger events, names, and styling entries.

### SelectValue
The actual current value name and no-selection placeholder.
- placeholder: ReactNode; default locale.selectPlaceholder. Shown only without selection; cannot replace FieldLabel.
- children: ReactNode | (value) => ReactNode. Explicit value presentation takes precedence.

### SelectPopup
Shared composition of Portal, positioning, panel, and scrollable List.
- side / align / sideOffset / alignOffset: Base UI positioning props; default "bottom" / "start" / 0. Anchored by default without covering the trigger; the primitive handles space collisions.
- alignItemWithTrigger: boolean; default false. Explicitly choose selected-item alignment that covers the trigger.
- container: HTMLElement | ShadowRoot | RefObject | null. Portal container; callers supply an appropriate inheritance environment for local themes, language, or density.
- positionerProps: SelectPrimitive.Positioner.Props. Forward its own public positioning refs/render/events/styles; caller style merges last.
- finalFocus / render / ref / className / style: Base UI Popup props. Cancellation returns to the trigger by default; motion.css owns entry/exit.

### SelectItem
Value candidate; highlight marks position and a check marks selection.
- value / label / disabled: any / string / boolean. Value, typeahead name, and disabled facts. Disabled items can be highlighted for identification without being selected.
- children / render / ref / className / style: Base UI Item props. Name content enters ItemText automatically; the selection check is separate.

### SelectGroup / SelectGroupLabel
Semantic grouping and group names.

### SelectPrimitive
The complete public Base UI Select primitive; public Select remains single-value.

## Keyboard
- Tab: Reach the trigger.
- Enter / Space / ↑ / ↓: Open candidates; arrows move the highlight while open and Enter/Space select.
- Home / End: Reach the first/last candidate while open.
- Typing: Typeahead highlights matches while open; the closed primitive may select a matching value directly.
- Esc: Close and return to the trigger, retaining the original value.

## Source examples
### 密度
Source: apps/docs/src/content/select/demos/01-density.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye/ui/components/select";

export const meta = { title: "密度", titleEn: "Density" };

const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <Select items={options} defaultValue="center">
              <SelectTrigger />
              <SelectPopup>
                {options.map((option) => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}
              </SelectPopup>
            </Select>
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```

### 状态与分组
Source: apps/docs/src/content/select/demos/02-states.tsx
```tsx
import { useState } from "react";
import { Field, FieldError, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { Select, SelectGroup, SelectGroupLabel, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";

export const meta = { title: "状态与分组", titleEn: "States and groups" };

const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];
const states = [
  { id: "unselected", label: "未选择", value: null },
  { id: "selected", label: "已选择", value: "center" },
  { id: "invalid", label: "无效", value: null },
  { id: "readonly", label: "只读", value: "center" },
  { id: "disabled", label: "禁用", value: "center" },
  { id: "disabled-item", label: "禁用项", value: "center" },
];
const values = [{ value: "", label: "空字符串" }, { value: 0, label: "0" }];
const fontGroups = [
  { label: "无衬线", fonts: ["Arial", "Helvetica"] },
  { label: "等宽", fonts: ["Menlo", "Consolas"] },
];
const fonts = fontGroups.flatMap(group => group.fonts.map(font => ({ value: font, label: font })));

export default function Demo() {
  const [requiredValue, setRequiredValue] = useState<string | null>(null);
  return (
    <FieldGroup className="grid w-full grid-cols-3 items-start">
      {states.map(state => {
        const invalid = state.id === "invalid" && requiredValue === null;
        return (
          <Field key={state.id} invalid={invalid} disabled={state.id === "disabled"}>
            <FieldLabel>{state.id === "invalid" && !invalid ? "已选择" : state.label}</FieldLabel>
            <Select
              items={options}
              defaultValue={state.value}
              readOnly={state.id === "readonly"}
              disabled={state.id === "disabled"}
              onValueChange={value => {
                if (state.id === "invalid") setRequiredValue(value);
              }}
            >
              <SelectTrigger><SelectValue placeholder="请选择" /></SelectTrigger>
              <SelectPopup>
                {options.map(option => (
                  <SelectItem key={option.value} value={option.value} disabled={state.id === "disabled-item" && option.value === "right"}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectPopup>
            </Select>
            {invalid && <FieldError>请选择对齐方式。</FieldError>}
          </Field>
        );
      })}
      {values.map(option => (
        <Field key={String(option.value)}>
          <FieldLabel>{option.value === "" ? "空值" : "零值"}</FieldLabel>
          <Select<string | number> items={values} defaultValue={option.value}>
            <SelectTrigger />
            <SelectPopup>
              {values.map(item => <SelectItem key={String(item.value)} value={item.value}>{item.label}</SelectItem>)}
            </SelectPopup>
          </Select>
        </Field>
      ))}
      <Field>
        <FieldLabel>字体</FieldLabel>
        <Select items={fonts} defaultValue="Menlo">
          <SelectTrigger />
          <SelectPopup>
            {fontGroups.map(group => (
              <SelectGroup key={group.label}>
                <SelectGroupLabel>{group.label}</SelectGroupLabel>
                {group.fonts.map(font => <SelectItem key={font} value={font}>{font}</SelectItem>)}
              </SelectGroup>
            ))}
          </SelectPopup>
        </Select>
      </Field>
    </FieldGroup>
  );
}
```
