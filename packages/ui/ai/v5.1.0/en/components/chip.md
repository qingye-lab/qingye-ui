# Chip

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/chip
Source: packages/ui/src/components/chip.tsx
Source SHA-256: ae7025a43fcc2e98d4398561f304ac091e583cefe053abf84781f07d3cf08df1

A small mark that can be acted on by itself: removable, or toggleable.

## Decision
Chip is not Badge. Badge is a static run of text in the body, with no surface and no interaction, used to annotate a status or category; Chip has its own boundary and can be clicked or removed, so it is an object rather than an annotation. If you want a remove button on an inert annotation, it was a Chip all along. The two forms are not merged into one component with a mode: removing is a one-way action and toggling is a reversible state, and their roles, keyboard and naming rules differ, so there are two components, Chip and ChipToggle. The tags in TagInput and the selected items of a multiple Combobox are items inside an edit frame whose geometry is derived from that frame, so they do not use Chip; Chip is a free-standing mark whose geometry reads the sm control step.

## Notes
- The remove button is named "Remove X" from the chip text, so several chips in one row are distinguishable to assistive technology.
- A ChipToggle's name does not change with its pressed state; the state is carried only by aria-pressed.
- Focus disappears with the removed node: the caller moves it to a neighbouring chip or to the container.

## Use and ownership
- A set of chosen conditions, each of which can be dropped on its own.
- A set of filters, each of which can be switched on or off.
- Avoid: Use Badge for an inert status annotation.
- Avoid: Use TagInput for values collected inside an input.
- Avoid: Use RadioGroup or SegmentedControl for mutually exclusive options.
- Library: A ChipToggle's uncontrolled pressed state and focus.
- Application: The collection of Chips (whether a removed one is kept), what a filter actually means, and where focus goes after removal.

## Composition
- Place several Chips in a flex-wrap row; put ChipToggles in a named group.

## Responsive behavior
- Long text is truncated while the full text stays in the DOM; this batch checked desktop only.

## Customization
- className; the Chip render prop.

## Current exports
- Chip: function; owner chip; PASS; props: ChipProps
- ChipProps: type; owner chip; PASS
- ChipToggle: function; owner chip; PASS; props: ChipToggleProps<Value>
- ChipToggleProps: type; owner chip; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Chip
- `children`: `string`. 记号上的文字，同时决定移除动作的名称（「移除 X」）。
- `disabled?`: `boolean`. 禁用后移除按钮不可操作；记号本身仍显示。
- `onRemove?`: `(event: React.SyntheticEvent<HTMLElement>) => void`. 移除。给了它才出现移除按钮；点击、Enter、Space、Backspace、Delete 都会调用。
- plus 279 inherited (@types/react 278, @base-ui/react 1); not expanded, see the installed declarations

### ChipToggle
- no props declared by this library
- plus 292 inherited (@types/react 283, @base-ui/react 9); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Chip
A removable mark: text plus a remove button. Without onRemove it is only text on a surface.
- children: string. The text on the mark; it also names the remove button ("Remove X").
- onRemove: (event) => void. The remove button appears only when given. Click, Enter, Space, Backspace and Delete all call it; whether the chip disappears and where focus goes is up to the caller.
- disabled: boolean; default false. The remove button is inert; the mark still shows.
- render / ref / className: Base UI composition. Composition entry points of the root span.

### ChipToggle
A toggleable mark: a button with aria-pressed. Same props as Toggle, fixed at the sm step.
- pressed / defaultPressed: boolean. Controlled or initial pressed state.
- onPressedChange: (pressed: boolean, details) => void. Called when the pressed state changes.
- disabled: boolean; default false. Inert; the pressed fact is kept.

## Keyboard
- Tab / Shift+Tab: Each remove button and each ChipToggle is one tab stop; the mark's text is not focusable.
- Enter / Space: Remove, or toggle the pressed state.
- Backspace / Delete: With focus on the remove button, remove the chip.

## Source examples
### 可移除
Source: apps/docs/src/content/chip/demos/01-removable.tsx
```tsx
import { useState } from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { Chip } from "@qingye_lab/ui/components/chip";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "可移除", titleEn: "Removable" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const all = en ? ["Design", "Engineering", "Operations", "Finance"] : ["设计", "工程", "运营", "财务"];
  const [items, setItems] = useState(all.slice(0, 3));
  const next = all.find(item => !items.includes(item));
  return <div className="flex flex-wrap items-center gap-(--qy-space-2)">
    {items.map(item => <Chip key={item} onRemove={() => setItems(items.filter(other => other !== item))}>{item}</Chip>)}
    <Button variant="bordered" size="sm" aria-disabled={next === undefined || undefined} onClick={() => { if (next !== undefined) setItems([...items, next]); }}>{en ? "Add" : "添加"}</Button>
  </div>;
}
```

### 可开关
Source: apps/docs/src/content/chip/demos/02-toggle.tsx
```tsx
import { useState } from "react";
import { ChipToggle } from "@qingye_lab/ui/components/chip";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "可开关", titleEn: "Toggleable" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const options = en ? ["Unread", "Starred", "Attachments", "Mentions"] : ["未读", "加星", "含附件", "提到我"];
  const [pressed, setPressed] = useState<string[]>([options[0]!]);
  return <div role="group" aria-label={en ? "Filters" : "筛选"} className="flex flex-wrap gap-(--qy-space-2)">
    {options.map(option => <ChipToggle key={option} pressed={pressed.includes(option)} onPressedChange={next => setPressed(next ? [...pressed, option] : pressed.filter(other => other !== option))}>{option}</ChipToggle>)}
    <ChipToggle disabled>{en ? "Unavailable" : "不可用"}</ChipToggle>
  </div>;
}
```
