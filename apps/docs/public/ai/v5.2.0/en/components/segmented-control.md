# SegmentedControl

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/segmented-control
Source: packages/ui/src/components/segmented-control.tsx
Source SHA-256: 681855132b1ff4c75ee3955936c2caef73ac618dd912975a375c30d858ea52f2

Enter one value from a small set of visible segments.

## Decision
SegmentedControl produces a value. Use Tabs for content panels and ToggleGroup for tools whose toggles may all be released. The selected segment is a light ink wash with ink text, not the primary action fill, so overriding --qy-primary does not change it. To adjust it, change the system selected surface --qy-surface-selected (every selected state follows; --qy-track-selected is only its alias) and --qy-track-selected-foreground.

## Notes
- Inside a Field, the group's name, description, and error land on the radiogroup. Each segment opens its own label scope, so ids are distinct and its name stays the segment text instead of being taken over by the Field label.
- Arrow keys follow writing direction: with UILocaleProvider dir="rtl", → moves to the previous segment.

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
- The selected segment reads --qy-track-selected and --qy-track-selected-foreground (light ink wash and ink text by default); unselected segments use muted ink; matching text, no outer focus ring.

## Current exports
- SegmentedControl: function; owner segmented-control; PASS; props: SegmentedControlProps<Value>
- SegmentedControlItem: function; owner segmented-control; PASS; props: SegmentedControlItemProps<Value>
- SegmentedControlItemPrimitive: reexport; owner segmented-control; UNVERIFIED
- SegmentedControlItemProps: type; owner segmented-control; PASS
- SegmentedControlPrimitive: reexport; owner segmented-control; UNVERIFIED
- SegmentedControlProps: type; owner segmented-control; PASS
- SegmentedControlSize: type; owner segmented-control; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### SegmentedControl
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 287 inherited (@types/react 275, @base-ui/react 12); not expanded, see the installed declarations

### SegmentedControlItem
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 284 inherited (@types/react 275, @base-ui/react 9); not expanded, see the installed declarations

### SegmentedControlPrimitive
- no props declared by this library
- plus 287 inherited (@types/react 275, @base-ui/react 12); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Arrow keys follow writing direction: with UILocaleProvider dir="rtl", → moves to the previous segment.
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context InField: without a provider default-value
- Context InFieldItem: without a provider default-value; provided by OptionScope
- Context SegmentSize: without a provider default-value; provided by SegmentedControl

## Curated API
Written descriptions; the list above is the type-resolved fact.

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
