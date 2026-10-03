# ToggleGroup

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/toggle-group
Source: packages/ui/src/components/toggle-group.tsx
Source SHA-256: e29f7460f8c3c0f8233856e687168c06a585f73932bab933b89faab34fe2fa64

A shared single or multiple selection of pressed buttons.

## Notes
- No name or hidden form value. Use SegmentedControl for submitted mutually exclusive values.
- Single allows all items to be released; it cannot impersonate required radio selection.

## Use and ownership
- Binary tool buttons in a shared scope.
- Single/multiple pressed selection permitting all items to be released.
- Avoid: Use SegmentedControl for mutually exclusive form values.
- Avoid: Use Tabs for panel views.
- Library: Uncontrolled value arrays, roving focus, and pressed states.
- Application: Controlled arrays, options, and associated content.

## Composition
- ToggleGroup + ToggleGroupItem; its name identifies the shared scope.

## Responsive behavior
- Horizontal layouts may wrap; vertical navigation follows up/down. Browser layout was not verified in this batch.

## Customization
- Existing action-gap, five matching profiles, and Toggle presentation.

## Current exports
- ToggleGroup: function; owner toggle-group; PASS; props: ToggleGroupProps<Value>
- ToggleGroupItem: function; owner toggle-group; PASS; props: ToggleGroupItemProps<Value>
- ToggleGroupItemProps: type; owner toggle-group; PASS
- ToggleGroupPrimitive: reexport; owner toggle-group; UNVERIFIED
- ToggleGroupProps: type; owner toggle-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ToggleGroup
Both single/multiple modes use arrays; single permits clearing to [].
- multiple: boolean; default false. false is single with at most one pressed item; true permits multiple pressed items.
- value / defaultValue: readonly string[]. Both modes hold value arrays; single is not a string. [] means all released.
- onValueChange: (values: string[], details) => void. Supplies the complete pressed-value array; supports details.cancel().
- orientation / loopFocus: "horizontal" | "vertical" / boolean; default "horizontal" / true. Arrow focus axis and end wrapping; moving focus alone never changes values.
- disabled / size: boolean / ToggleSize. Disable the whole group. size defaults to md and items may explicitly override it.
- aria-label / aria-labelledby / render / ref: Base UI composition. Shared name/root composition; forward styles and native events.

### ToggleGroupItem
A uniquely valued Toggle inheriting group size and primitive states.
- value: string. Required unique group identifier.
- disabled / shape / size / render / ref: Toggle props. Item restrictions, geometry, and public composition.

### ToggleGroupPrimitive
Base UI pressed-group primitive; TogglePrimitive exports the item primitive.

## Keyboard
- Tab / Shift+Tab: Retain one group tab stop.
- ArrowLeft / ArrowRight or ArrowUp / ArrowDown: Move along orientation, skip disabled items, and wrap according to loopFocus.
- Space / Enter: Change the current item's pressed fact.

## Source examples
### 单选与多选
Source: apps/docs/src/content/toggle-group/demos/01-modes.tsx
```tsx
import { useId, useState } from "react";
import { Field, FieldGroup, FieldTitle } from "@qingye/ui/components/field";
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";

export const meta = { title: "单选与多选", titleEn: "Single and multiple" };
export default function Demo() {
  const id = useId(); const [single, setSingle] = useState(["alpha"]); const [multiple, setMultiple] = useState(["alpha"]);
  return <FieldGroup className="grid sm:grid-cols-2">
    <Field><FieldTitle id={`${id}-single`}>单选按压</FieldTitle><ToggleGroup aria-labelledby={`${id}-single`} value={single} onValueChange={setSingle}><ToggleGroupItem value="alpha">甲</ToggleGroupItem><ToggleGroupItem value="beta">乙</ToggleGroupItem><ToggleGroupItem value="gamma">丙</ToggleGroupItem></ToggleGroup><output className="text-support text-foreground">{single.length} 项</output></Field>
    <Field><FieldTitle id={`${id}-multiple`}>多选按压</FieldTitle><ToggleGroup multiple aria-labelledby={`${id}-multiple`} value={multiple} onValueChange={setMultiple}><ToggleGroupItem value="alpha">甲</ToggleGroupItem><ToggleGroupItem value="beta">乙</ToggleGroupItem><ToggleGroupItem value="gamma">丙</ToggleGroupItem></ToggleGroup><output className="text-support text-foreground">{multiple.length} 项</output></Field>
  </FieldGroup>;
}
```

### 方向与禁用
Source: apps/docs/src/content/toggle-group/demos/02-orientation.tsx
```tsx
import { ToggleGroup, ToggleGroupItem } from "@qingye/ui/components/toggle-group";

export const meta = { title: "方向与禁用", titleEn: "Orientation and disabled" };
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-field-group-gap)">
    <ToggleGroup orientation="vertical" loopFocus={false} aria-label="纵向候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">甲</ToggleGroupItem><ToggleGroupItem value="beta" disabled>乙</ToggleGroupItem><ToggleGroupItem value="gamma">丙</ToggleGroupItem></ToggleGroup>
    <ToggleGroup disabled aria-label="禁用候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">甲</ToggleGroupItem><ToggleGroupItem value="beta">乙</ToggleGroupItem></ToggleGroup>
  </div>;
}
```
