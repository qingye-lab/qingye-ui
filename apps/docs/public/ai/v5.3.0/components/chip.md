# 标签片 Chip

Package: @qingye_lab/ui@5.3.0
Import: @qingye_lab/ui/components/chip
Source: packages/ui/src/components/chip.tsx
Source SHA-256: ad815ca9b19efbfb70cada333d50c9e9579ef78c9f00f139f16251c246b090d6

一枚可移除的小记号：已经选定的一项，可以单独去掉。

## Decision
Chip 与 Badge 不是一回事：Badge 是正文里一段静态的字，没有底、没有交互，用来标注状态或类别；Chip 有自己的边界，能被点击或移除，是对象而不是标注。要给一段不可操作的标注加移除按钮，说明它其实是 Chip。可开关的筛选条件不是 Chip：它是二态按钮（aria-pressed），直接用 Toggle size="sm"；早先的 ChipToggle 只是 Toggle 固定 sm 档的同义包装，在发布前删除，避免同一件事有两个名字。编辑框里的标签（TagInput）与多选 Combobox 的已选项是边界内的项，几何由所在边界推出，不使用 Chip；Chip 是独立立着的记号，几何读 sm 控件档。

## Notes
- 移除按钮的名称是「移除 X」，X 取记号文字，所以同一行里多个记号读屏时彼此可分。
- 移除之后焦点会随被移除的节点一起消失：由调用方把焦点移到相邻记号或它所在的容器。

## Use and ownership
- 一组已选条件，每个都能单独去掉
- Avoid: 可开关的筛选条件用 Toggle size="sm"
- Avoid: 不可操作的状态标注用 Badge
- Avoid: 在输入框内收下的值用 TagInput
- Avoid: 互斥的几个选项用 RadioGroup 或 SegmentedControl
- Library: 移除按钮的焦点与键盘
- Application: Chip 的集合（移除后是否保留）、移除后的焦点去向

## Composition
- 多个 Chip 放进 flex-wrap 的行

## Responsive behavior
- 文字过长时截断，完整文字仍在 DOM；本批只做桌面检查

## Customization
- className；Chip 的 render

## Current exports
- Chip: function; owner chip; PASS; props: ChipProps
- ChipProps: type; owner chip; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Chip
- `children`: `string`. 记号上的文字，同时决定移除动作的名称（「移除 X」）。
- `disabled?`: `boolean`. 禁用后移除按钮不可操作；记号本身仍显示。
- `onRemove?`: `(event: React.SyntheticEvent<HTMLElement>) => void`. 移除。给了它才出现移除按钮；点击、Enter、Space、Backspace、Delete 都会调用。
- plus 279 inherited (@types/react 278, @base-ui/react 1); not expanded, see the installed declarations

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

## Keyboard
- Tab / Shift+Tab: 每个移除按钮是一个停靠点；记号文字本身不可聚焦。
- Enter / Space: 移除该记号。
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
