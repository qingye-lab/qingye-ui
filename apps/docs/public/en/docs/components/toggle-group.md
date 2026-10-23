# ToggleGroup

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/toggle-group
Source: packages/ui/src/components/toggle-group.tsx
Source SHA-256: c5e70388ffd9e0292285318e7dba5cf6cac171fe4784d2b12409568605308c3d

A shared single or multiple set of toggles whose pressed fact persists.

## Decision
A pressed item is a light ink wash with ink text and unpressed items use muted ink, with the same weight. It does not use the primary action fill, so overriding --qy-primary does not change it. To adjust it, change the system selected surface --qy-surface-selected (every selected state follows; --qy-track-selected is only its alias) and --qy-track-selected-foreground.

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
- Pressed items read --qy-track-selected and --qy-track-selected-foreground (light ink wash and ink text by default), not --qy-primary; unpressed items use muted ink; existing five matching profiles.

## Current exports
- ToggleGroup: function; owner toggle-group; PASS; props: ToggleGroupProps<Value>
- ToggleGroupItem: function; owner toggle-group; PASS; props: ToggleGroupItemProps<Value>
- ToggleGroupItemProps: type; owner toggle-group; PASS
- ToggleGroupPrimitive: reexport; owner toggle-group; UNVERIFIED
- ToggleGroupProps: type; owner toggle-group; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ToggleGroup
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- plus 285 inherited (@types/react 275, @base-ui/react 10); not expanded, see the installed declarations

### ToggleGroupItem
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `value`: `Value`.
- plus 291 inherited (@types/react 283, @base-ui/react 8); not expanded, see the installed declarations

### ToggleGroupPrimitive
- no props declared by this library
- plus 285 inherited (@types/react 275, @base-ui/react 10); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context GroupSize: without a provider default-value; provided by ToggleGroup

## Curated API
Written descriptions; the list above is the type-resolved fact.

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
import { Field, FieldGroup, FieldTitle } from "@qingye_lab/ui/components/field";
import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";

export const meta = { title: "单选与多选", titleEn: "Single and multiple" };
export default function Demo() {
  const id = useId(); const [single, setSingle] = useState(["alpha"]); const [multiple, setMultiple] = useState(["alpha"]);
  return <FieldGroup className="grid sm:grid-cols-2">
    <Field><FieldTitle id={`${id}-single`}>单选切换</FieldTitle><ToggleGroup aria-labelledby={`${id}-single`} value={single} onValueChange={setSingle}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta">记录数</ToggleGroupItem><ToggleGroupItem value="gamma">最近同步</ToggleGroupItem></ToggleGroup><output className="text-support text-foreground">{single.length} 列可见</output></Field>
    <Field><FieldTitle id={`${id}-multiple`}>多选切换</FieldTitle><ToggleGroup multiple aria-labelledby={`${id}-multiple`} value={multiple} onValueChange={setMultiple}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta">记录数</ToggleGroupItem><ToggleGroupItem value="gamma">最近同步</ToggleGroupItem></ToggleGroup><output className="text-support text-foreground">{multiple.length} 列可见</output></Field>
  </FieldGroup>;
}
```

### 方向与禁用
Source: apps/docs/src/content/toggle-group/demos/02-orientation.tsx
```tsx
import { ToggleGroup, ToggleGroupItem } from "@qingye_lab/ui/components/toggle-group";

export const meta = { title: "方向与禁用", titleEn: "Orientation and disabled" };
export default function Demo() {
  return <div className="flex flex-wrap items-start gap-(--qy-field-group-gap)">
    <ToggleGroup orientation="vertical" loopFocus={false} aria-label="纵向切换候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta" disabled>记录数</ToggleGroupItem><ToggleGroupItem value="gamma">最近同步</ToggleGroupItem></ToggleGroup>
    <ToggleGroup disabled aria-label="禁用的切换候选" defaultValue={["alpha"]}><ToggleGroupItem value="alpha">名称</ToggleGroupItem><ToggleGroupItem value="beta">记录数</ToggleGroupItem></ToggleGroup>
  </div>;
}
```
