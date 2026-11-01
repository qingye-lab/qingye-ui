# 标签片 Chip

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/chip
Source: packages/ui/src/components/chip.tsx
Source SHA-256: ae7025a43fcc2e98d4398561f304ac091e583cefe053abf84781f07d3cf08df1

一枚可以被单独操作的小记号：可移除，或可开关。

## Decision
Chip 与 Badge 不是一回事：Badge 是正文里一段静态的字，没有底、没有交互，用来标注状态或类别；Chip 有自己的边界，能被点击或移除，是对象而不是标注。要给一段不可操作的标注加移除按钮，说明它其实是 Chip。Chip 的两种形态不合并成一个带 mode 的组件：移除是单向动作，开关是可往返的状态，二者的读屏角色、键盘与名称规则都不同，所以是 Chip 与 ChipToggle 两个组件。编辑框里的标签（TagInput）与多选 Combobox 的已选项是边界内的项，几何由所在边界推出，不使用 Chip；Chip 是独立立着的记号，几何读 sm 控件档。

## Notes
- 移除按钮的名称是「移除 X」，X 取记号文字，所以同一行里多个记号读屏时彼此可分。
- ChipToggle 的名称不随按下与否变化，状态只由 aria-pressed 表达。
- 移除之后焦点会随被移除的节点一起消失：由调用方把焦点移到相邻记号或它所在的容器。

## Use and ownership
- 一组已选条件，每个都能单独去掉
- 一组筛选条件，每个都能单独开关
- Avoid: 不可操作的状态标注用 Badge
- Avoid: 在输入框内收下的值用 TagInput
- Avoid: 互斥的几个选项用 RadioGroup 或 SegmentedControl
- Library: ChipToggle 的非受控按下状态、焦点
- Application: Chip 的集合（移除后是否保留）、筛选条件的实际含义、移除后的焦点去向

## Composition
- 多个 Chip 放进 flex-wrap 的行；ChipToggle 放进带名称的 group

## Responsive behavior
- 文字过长时截断，完整文字仍在 DOM；本批只做桌面检查

## Customization
- className；Chip 的 render

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
可移除的记号：一段文字加一个移除按钮。不给 onRemove 就只是一段带底的文字。
- children: string. 记号上的文字，同时决定移除按钮的名称（「移除 X」）。
- onRemove: (event) => void. 给了才出现移除按钮。点击、Enter、Space、Backspace、Delete 都调用它；移除后记号是否消失、焦点去哪里由调用方决定。
- disabled: boolean; default false. 移除按钮不可操作，记号仍显示。
- render / ref / className: Base UI composition. 根部位 span 的组合入口。

### ChipToggle
可开关的记号：按钮加 aria-pressed。属性与 Toggle 相同，只是固定为 sm 档。
- pressed / defaultPressed: boolean. 受控或初始的按下状态。
- onPressedChange: (pressed: boolean, details) => void. 按下状态改变时调用。
- disabled: boolean; default false. 不可操作；按下的事实保留。

## Keyboard
- Tab / Shift+Tab: Chip 的移除按钮、ChipToggle 各是一个停靠点；记号文字本身不可聚焦。
- Enter / Space: 移除，或切换按下状态。
- Backspace / Delete: 焦点在移除按钮上时移除该记号。

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
