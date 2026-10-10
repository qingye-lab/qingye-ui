# SegmentedControl

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/segmented-control
Source: packages/ui/src/components/segmented-control.tsx
Source SHA-256: bd647ac5087770d6f70c087e24abd48f992b2c75389b4781608e250bb1d89c12

Enter one value from a small set of visible segments.

## Decision
SegmentedControl produces a value. Use Tabs for content panels and ToggleGroup for tools whose toggles may all be released.

## Use and ownership
- A few mutually exclusive values benefit from side-by-side comparison.
- Avoid: Use Tabs for panel views.
- Avoid: Use Select for longer or collapsible candidates.
- Avoid: Use Toggle for independent pressed states.
- Library: Uncontrolled values, focus, and arrows.
- Application: Controlled values, candidates, invalid facts, and submission.

## Composition
- FieldTitle names the group; FieldDescription/FieldError associate with the input; candidate children supply names.

## Responsive behavior
- Retain all candidates and permit wrapping; five narrow-screen profiles preserve semantics.

## Customization
- Candidates reuse bordered/solid presentation and matching text without adding an outer focus ring.

## Current exports
- SegmentedControl: function; owner segmented-control; PASS; props: SegmentedControlProps<Value>
- SegmentedControlItem: function; owner segmented-control; PASS; props: SegmentedControlItemProps<Value>
- SegmentedControlItemPrimitive: reexport; owner segmented-control; UNVERIFIED
- SegmentedControlItemProps: type; owner segmented-control; PASS
- SegmentedControlPrimitive: reexport; owner segmented-control; UNVERIFIED
- SegmentedControlProps: type; owner segmented-control; PASS
- SegmentedControlSize: type; owner segmented-control; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### SegmentedControl
Radio value input without owning panels or an option inventory.
- value / defaultValue: Value. Controlled or initial selection; omitted initial values stay unselected. Zero and empty string may be actual options.
- onValueChange: (value, details) => void. Cancelable selection; clicking a selected item does not clear it.
- name / form / required / inputRef: RadioGroup props. Native form entry; required does not automatically infer invalid.
- disabled / readOnly: boolean; default false. Disabled blocks operation; read-only retains the current value and focus.
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". Matching control/text-control profiles inherited by items.
- aria-label / aria-labelledby / render / ref / className / style: Base UI composition. Group names, parts, and state styling.

### SegmentedControlItem
A radio candidate with its full name.
- value: Value. The candidate's actual required value.
- children / disabled / readOnly / size / render / nativeButton / ref: Radio props. Native button by default; identify nativeButton for another element while retaining ARIA and native events.

### SegmentedControlPrimitive / SegmentedControlItemPrimitive
Public Base UI RadioGroup and Radio primitives.

## Keyboard
- Tab / Shift+Tab: Retain one tab stop within the group.
- ↑ / ↓ / ← / →: Move and select candidates, skipping disabled items.
- Space: Select the current item; Home/End are outside the Radio primitive contract.

## Source examples
### 单值
Source: apps/docs/src/content/segmented-control/demos/01-values.tsx
```tsx
import { useId, useState } from "react";
import { Field, FieldTitle } from "@qingye_lab/ui/components/field";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";

export const meta = { title: "单值", titleEn: "One value" };
export default function Demo() {
  const id = useId(); const [value, setValue] = useState("center");
  return <Field><FieldTitle id={id}>对齐</FieldTitle><SegmentedControl name="alignment" value={value} onValueChange={setValue} aria-labelledby={id}><SegmentedControlItem value="left">左</SegmentedControlItem><SegmentedControlItem value="center">中</SegmentedControlItem><SegmentedControlItem value="right">右</SegmentedControlItem></SegmentedControl></Field>;
}
```

### 状态
Source: apps/docs/src/content/segmented-control/demos/02-states.tsx
```tsx
import { useId } from "react";
import { Field, FieldError, FieldGroup, FieldTitle } from "@qingye_lab/ui/components/field";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";

export const meta = { title: "状态", titleEn: "States" };
const items = <><SegmentedControlItem value="alpha">左</SegmentedControlItem><SegmentedControlItem value="beta">中</SegmentedControlItem><SegmentedControlItem value="gamma" disabled>右</SegmentedControlItem></>;
export default function Demo() {
  const id = useId();
  return <FieldGroup className="grid sm:grid-cols-3">
    <Field><FieldTitle id={`${id}-readonly`}>只读值</FieldTitle><SegmentedControl readOnly defaultValue="alpha" aria-labelledby={`${id}-readonly`}>{items}</SegmentedControl></Field>
    <Field><FieldTitle id={`${id}-disabled`}>禁用值</FieldTitle><SegmentedControl disabled defaultValue="beta" aria-labelledby={`${id}-disabled`}>{items}</SegmentedControl></Field>
    <Field invalid><FieldTitle id={`${id}-required`}>未选择</FieldTitle><SegmentedControl required aria-labelledby={`${id}-required`}>{items}</SegmentedControl><FieldError>请选择一个值</FieldError></Field>
  </FieldGroup>;
}
```
