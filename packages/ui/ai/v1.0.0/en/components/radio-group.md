# RadioGroup

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/radio-group
Source: packages/ui/src/components/radio-group.tsx
Source SHA-256: daeeb0c15d39c4ba850fd2d6e5e9dba613e835d4776d44f7b7dc33ab78bf1a71

Choose one value from a small set of visible options.

## Decision
Use RadioGroup when candidates must be compared together, and Select when they can collapse. No selection does not automatically choose the first item.

## Notes
- FieldTitle names the group, FieldItem + FieldLabel name each item, and FieldError associates errors.
- No selection, zero, and empty string are different values.
- Disabled items leave tab order; read-only retains focus and current values.

## Use and ownership
- A small mutually exclusive set must remain visible for comparison.
- Avoid: Use Select for collapsible lists.
- Avoid: Use Checkbox for multiple selection.
- Avoid: Use Menu for commands and Tabs for views.
- Avoid: Applications supply structures for comparing complex properties.
- Library: Focus, arrows, and uncontrolled values.
- Application: Controlled values, candidates, invalid facts, submissions, and outcomes.

## Composition
- FieldTitle → RadioGroup aria-labelledby; FieldItem + FieldLabel name items; FieldDescription + FieldError retain associations.

## Responsive behavior
- Uses existing narrow-screen and coarse-pointer roles; this batch checked desktop only.

## Customization
- Matching text line height, circular identity, theme surfaces/borders, and no added outer focus ring.

## Current exports
- Radio: function; owner radio-group; PASS; props: RadioProps<Value>
- RadioGroup: function; owner radio-group; PASS; props: RadioGroupProps<Value>
- RadioGroupPrimitive: reexport; owner radio-group; UNVERIFIED
- RadioGroupProps: type; owner radio-group; PASS
- RadioPrimitive: reexport; owner radio-group; UNVERIFIED
- RadioProps: type; owner radio-group; PASS
- RadioSize: type; owner radio-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### RadioGroup
Shared state and group semantics for visible mutually exclusive candidates.
- value / defaultValue: Value. Controlled value or actual initial selection. Omitting the initial value retains no selection; controlled null is allowed.
- onValueChange: (value, eventDetails) => void. Primitive value changes can be canceled through eventDetails.cancel().
- name / form / inputRef: string / string / Ref<HTMLInputElement>. Form name, external form, and hidden input ref. An unselected field is not submitted.
- disabled / readOnly / required: boolean; default false. Disabled, read-only, and native constraints; required does not infer invalid.
- aria-labelledby / aria-label: string. The group name; FieldTitle id may supply aria-labelledby.
- render / ref / className / style: Base UI composition. Group root element and state styling.

### Radio
Circular single-choice entry with a central selected dot.
- value: Value. A unique candidate value; empty string, zero, and null/no selection differ.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". Circle diameter reads matching text line height; touch-target separately supplies its hit area.
- disabled / readOnly / required: boolean. Primitive group/item limits are actual restrictions, including propagated Field disabled.
- render / nativeButton / ref / inputRef: Base UI composition. Defaults to native button while retaining a hidden radio input. Set nativeButton=false for another element.
- children / className / style: ReactNode / Base UI state callbacks. Replace the indicator or override styles; FieldLabel supplies the name.

### RadioGroupPrimitive / RadioPrimitive
Public Base UI group and Radio primitives.

## Keyboard
- Tab / Shift+Tab: The group retains one tab stop; the selected or first available item receives focus.
- ↑ / ↓ / ← / →: Move and select candidates, skip disabled items, and wrap within the group.
- Space: Select the current candidate. Home/End and typeahead are outside this Radio primitive contract.

## Source examples
### 尺寸
Source: apps/docs/src/content/radio-group/demos/01-sizes.tsx
```tsx
import { useId } from "react";
import { Field, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye/ui/components/field";
import { RadioGroup, Radio, type RadioSize } from "@qingye/ui/components/radio-group";

export const meta = { title: "尺寸", titleEn: "Sizes" };

const sizes: RadioSize[] = ["xs", "sm", "md", "lg", "xl"];
const textClasses: Record<RadioSize, string> = {
  xs: "text-control-xs", sm: "text-control-sm", md: "text-control-md", lg: "text-control-lg", xl: "text-control-xl",
};
const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  const id = useId();
  return (
    <FieldGroup className="grid w-full grid-cols-5 items-start">
      {sizes.map(size => (
        <Field key={size}>
          <FieldTitle id={`${id}-${size}`}>{size}</FieldTitle>
          <RadioGroup aria-labelledby={`${id}-${size}`} defaultValue="center">
            {options.map(option => (
              <FieldItem key={option.value}>
                <Radio value={option.value} size={size} />
                <FieldLabel className={textClasses[size]}>{option.label}</FieldLabel>
              </FieldItem>
            ))}
          </RadioGroup>
        </Field>
      ))}
    </FieldGroup>
  );
}
```

### 状态
Source: apps/docs/src/content/radio-group/demos/02-states.tsx
```tsx
import { useId, useState } from "react";
import { Field, FieldError, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye/ui/components/field";
import { RadioGroup, Radio } from "@qingye/ui/components/radio-group";

export const meta = { title: "状态", titleEn: "States" };

const states = [
  { id: "unselected", label: "未选择" },
  { id: "selected", label: "已选择" },
  { id: "invalid", label: "无效" },
  { id: "readonly", label: "只读" },
  { id: "disabled", label: "禁用" },
  { id: "disabled-item", label: "禁用项" },
];
const options = [
  { value: "left", label: "左对齐" },
  { value: "center", label: "居中" },
  { value: "right", label: "右对齐" },
];

export default function Demo() {
  const id = useId();
  const [requiredValue, setRequiredValue] = useState<string | null>(null);
  return (
    <FieldGroup className="grid w-full grid-cols-3 items-start">
      {states.map(state => {
        const invalid = state.id === "invalid" && requiredValue === null;
        return (
          <Field key={state.id} invalid={invalid} disabled={state.id === "disabled"}>
            <FieldTitle id={`${id}-${state.id}`}>
              {state.id === "invalid" && !invalid ? "已选择" : state.label}
            </FieldTitle>
            <RadioGroup
              aria-labelledby={`${id}-${state.id}`}
              defaultValue={state.id === "unselected" || state.id === "invalid" ? null : "center"}
              readOnly={state.id === "readonly"}
              disabled={state.id === "disabled"}
              onValueChange={value => {
                if (state.id === "invalid") setRequiredValue(value);
              }}
            >
              {options.map(option => (
                <FieldItem key={option.value}>
                  <Radio value={option.value} disabled={state.id === "disabled-item" && option.value === "right"} />
                  <FieldLabel>{option.label}</FieldLabel>
                </FieldItem>
              ))}
            </RadioGroup>
            {invalid && <FieldError>请选择对齐方式。</FieldError>}
          </Field>
        );
      })}
    </FieldGroup>
  );
}
```
