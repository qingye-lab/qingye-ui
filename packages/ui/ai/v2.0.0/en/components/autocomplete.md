# Autocomplete

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/autocomplete
Source: packages/ui/src/components/autocomplete.tsx
Source SHA-256: b495f32abfff831f34d5c49aeb67c3a37a7f25219dcc73755f23e7f9f3c7dfe7

Edit free text with optional suggestions.

## Decision
The text itself is the value. Highlighting does not change it; accepting a suggestion requests replacement. Text can submit without matching a suggestion.

## Notes
- Use Combobox when a value must be confirmed from candidates.
- An empty set does not imply an error or service failure. Supply empty content from real facts.
- Caller positioning style merges last; colors, corners, highlights, and focus use existing theme roles.
- A command palette is not a separate component: place an open + inline Autocomplete in a Dialog; groups, keyboard access, and close-on-pick come from these parts. The application binds the shortcut; the library listens to no global keys. Autocomplete rather than Combobox because a command is an action, not a value to confirm and keep.

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
- AutocompleteCollection: const; owner autocomplete; UNVERIFIED
- AutocompleteControl: function; owner autocomplete; PASS; props: InputGroupProps
- AutocompleteEmpty: function; owner autocomplete; PASS; props: AutocompletePrimitive.Empty.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteGroup: function; owner autocomplete; PASS; props: AutocompletePrimitive.Group.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteGroupLabel: function; owner autocomplete; PASS; props: AutocompletePrimitive.GroupLabel.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteInput: function; owner autocomplete; PASS; props: AutocompletePrimitive.Input.Props & React.RefAttributes<HTMLInputElement>
- AutocompleteItem: function; owner autocomplete; PASS; props: AutocompletePrimitive.Item.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteItemGroup: type; owner autocomplete; PASS
- AutocompleteList: function; owner autocomplete; PASS; props: AutocompletePrimitive.List.Props & React.RefAttributes<HTMLDivElement>
- AutocompletePopup: function; owner autocomplete; PASS; props: AutocompletePopupProps
- AutocompletePopupProps: type; owner autocomplete; PASS
- AutocompletePrimitive: reexport; owner autocomplete; UNVERIFIED
- AutocompleteProps: type; owner autocomplete; PASS
- AutocompleteSeparator: function; owner autocomplete; PASS; props: AutocompletePrimitive.Separator.Props & React.RefAttributes<HTMLDivElement>
- AutocompleteStatus: function; owner autocomplete; PASS; props: AutocompleteStatusProps
- AutocompleteStatusProps: type; owner autocomplete; PASS
- AutocompleteTrigger: function; owner autocomplete; PASS; props: AutocompletePrimitive.Trigger.Props & React.RefAttributes<HTMLButtonElement>

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Autocomplete
- `items?`: `readonly Value[] | readonly AutocompleteItemGroup<Value>[] | undefined`.
- plus 32 inherited (@base-ui/react 32); not expanded, see the installed declarations

### AutocompleteClear
- no props declared by this library
- plus 290 inherited (@types/react 284, @base-ui/react 6); not expanded, see the installed declarations

### AutocompleteCollection
- no props declared by this library
- plus 1 inherited (@base-ui/react 1); not expanded, see the installed declarations

### AutocompleteControl
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### AutocompleteEmpty
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### AutocompleteGroup
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### AutocompleteGroupLabel
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### AutocompleteInput
- no props declared by this library
- plus 308 inherited (@types/react 304, @base-ui/react 4); not expanded, see the installed declarations

### AutocompleteItem
- no props declared by this library
- plus 281 inherited (@types/react 272, @base-ui/react 9); not expanded, see the installed declarations

### AutocompleteList
- no props declared by this library
- plus 278 inherited (@types/react 274, @base-ui/react 4); not expanded, see the installed declarations

### AutocompletePopup
- `container?`: `AutocompletePrimitive.Portal.Props["container"]`.
- `positionerProps?`: `AutocompletePrimitive.Positioner.Props`.
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### AutocompleteSeparator
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### AutocompleteStatus
- `count?`: `number | undefined`. 结果数：读出内置的「找到 N 项」。0 不出声，「没有结果」归 Empty。
- `loading?`: `boolean`. 加载中：读出内置的「正在加载」。
- `visible?`: `boolean`. 同时给看得见的人看；默认只给读屏。
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### AutocompleteTrigger
- no props declared by this library
- plus 289 inherited (@types/react 284, @base-ui/react 5); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context FloatingLayerContext: without a provider default-value; provided by FloatingLayerScope
- Context InControl: without a provider default-value; provided by AutocompleteControl
- Context ReadOnly: without a provider default-value; provided by Autocomplete

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Autocomplete
A Base UI text-suggestion context fixed to list mode.
- value / defaultValue / onValueChange: string / string / (value, details) => void. Controlled or uncontrolled free text. details.cancel() can reject edits or suggestion requests.
- items / itemToStringValue / filter: readonly Value[] / Base UI public props. Provide flat suggestions, their text, and filtering. Define text for object suggestions. Group suggestions with the { value: label, items } shape and AutocompleteGroup.
- name / form / required / disabled / readOnly: Base UI Root props. The actual input registers Field once and submits free text. Read-only submits; disabled is excluded.
- open / defaultOpen / onOpenChange: Base UI open props. Opening is controllable. Input, actions, and suggestions share one geometry that follows the density axis.

### AutocompleteInput / AutocompleteTrigger / AutocompleteClear
Real Input/Button outlets forwarding refs, render, ARIA, and events. Clear requests empty text.

### AutocompletePopup
Public candidate Portal/Positioner/Popup forwarding container and positionerProps with shared layer order.

### AutocompleteList / AutocompleteItem / AutocompleteEmpty
Suggestion list, text suggestions, and caller-provided real empty content.

### AutocompleteGroup / AutocompleteGroupLabel / AutocompleteSeparator / AutocompleteCollection
Grouped suggestions, the same set as Combobox: items use { value: label, items }; the list renders group by group with AutocompleteCollection inside. Drawn like Select and Combobox groups.

### AutocompleteStatus
Screen-reader announcements about the list itself (loading, count, or children), with the same rule as ComboboxStatus: stay mounted, screen-reader only by default; "no results" belongs to AutocompleteEmpty.
- loading / count / visible: boolean / number / boolean. Loading, result count, and whether to also show it.

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

### 命令面板
Source: apps/docs/src/content/autocomplete/demos/03-command-palette.tsx
```tsx
import { useEffect, useState } from "react";
import { Autocomplete, AutocompleteCollection, AutocompleteControl, AutocompleteEmpty, AutocompleteGroup, AutocompleteGroupLabel, AutocompleteInput, AutocompleteItem, AutocompleteList } from "@qingye_lab/ui/components/autocomplete";
import { Dialog, DialogPopup, DialogTitle, DialogTrigger } from "@qingye_lab/ui/components/dialog";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Kbd } from "@qingye_lab/ui/components/kbd";
export const meta = { title: "命令面板", titleEn: "Command palette" };
const commands = [
  { value: "页面", items: ["概览", "设备", "告警", "设置"] },
  { value: "操作", items: ["新建设备", "导出告警", "切换主题"] },
];
export default function Demo() {
  const [open, setOpen] = useState(false);
  const [last, setLast] = useState("");
  // 快捷键是应用的事：库不监听全局按键，避免与站点已有的快捷键冲突。
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setOpen(value => !value); }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, []);
  return <Inline gap="actions">
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>搜索 <Kbd>⌘K</Kbd></DialogTrigger>
      <DialogPopup className="w-[min(32rem,100%)]">
        <DialogTitle className="sr-only">命令面板</DialogTitle>
        <Autocomplete open inline items={commands} autoHighlight="always" keepHighlight>
          <div className="min-w-0">
          <AutocompleteControl><AutocompleteInput aria-label="搜索页面与操作" placeholder="搜索页面与操作" /></AutocompleteControl>
          <AutocompleteEmpty>没有匹配项</AutocompleteEmpty>
          <AutocompleteList className="mt-(--qy-field-gap) max-h-72">{(group: (typeof commands)[number]) => <AutocompleteGroup key={group.value} items={group.items}><AutocompleteGroupLabel>{group.value}</AutocompleteGroupLabel><AutocompleteCollection>{(item: string) => <AutocompleteItem key={item} value={item} onClick={() => { setLast(item); setOpen(false); }}>{item}</AutocompleteItem>}</AutocompleteCollection></AutocompleteGroup>}</AutocompleteList>
          </div>
        </Autocomplete>
      </DialogPopup>
    </Dialog>
    <output className="text-support text-muted-foreground">{last || "—"}</output>
  </Inline>;
}
```
