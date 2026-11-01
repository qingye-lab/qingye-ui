# Transfer

Package: @qingye_lab/ui@5.1.0
Import: @qingye_lab/ui/components/transfer
Source: packages/ui/src/components/transfer.tsx
Source SHA-256: 84ad943c10022f1cb49d8f88d030ba66cd2f5eda7908c0d3b5ebdbd51beaf159

Move items between an available list and a selected list; the value is the keys on the selected side.

## Decision
Transfer is for picking a small set out of a large one and being able to revise it, so both sides are full lists rather than a dropdown plus a row of tags. Its value is only the keys on the right; checks are transient and never enter the value. It does not virtualise: a fixed-height list is enough for a few hundred items, and larger sets belong in a Combobox or table selection.

## Notes
- Only items that are checked, currently visible (past the filter) and enabled move; checked items hidden by the filter are not carried along.
- A move button uses aria-disabled rather than disabled when nothing can move, so it stays focusable and a screen reader can still read its name, "Move n selected to …".
- After each move a screen-reader-only role="status" announces "n moved to “Selected”".
- Each side is a named checkbox group whose description is the count "n / m"; select all is the parent checkbox and shows the indeterminate state when partially checked.

## Use and ownership
- Allocate a batch of items between two mutually exclusive sets.
- People need to see the whole selected set and withdraw items one by one.
- Avoid: Use Select or Combobox to pick one or a few without an overview of the chosen set.
- Avoid: Use a searchable Combobox or table selection for thousands of items.
- Avoid: Use CheckboxGroup for a few on / off options.
- Library: Uncontrolled selected keys, per-side transient checks and filter text, focus.
- Application: Controlled selected keys, where items come from, what the choice means and its submission, invalid.

## Composition
- FieldLabel + Transfer + FieldDescription + FieldError.
- Make titles two nouns the task uses, not "Left" and "Right".

## Responsive behavior
- Three columns: equal sides, a content-sized button column; in narrow containers the sides shrink without wrapping; this batch checked desktop only.

## Customization
- titles; listClassName; per-item disabled.

## Current exports
- Transfer: function; owner transfer; PASS; props: TransferProps
- TransferChangeDetails: type; owner transfer; PASS
- TransferDirection: type; owner transfer; PASS
- TransferItem: type; owner transfer; PASS
- TransferProps: type; owner transfer; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Transfer
- `defaultValue?`: `readonly string[]`.
- `disabled?`: `boolean`.
- `items`: `readonly TransferItem[]`. 全部候选项。每项属于左侧（候选）或右侧（已选），由 value 决定。
- `listClassName?`: `string`. 列表区域的 className（默认固定高度，两侧同高，移动时版面不跳）。
- `name?`: `string`. 给了 name，右侧每一项的键以同名隐藏字段随原生表单提交。
- `onValueChange?`: `(value: string[], details: TransferChangeDetails) => void`. 只在移动发生时调用，给出移动后的完整键集合与本次移动的方向、键。
- `searchable?`: `boolean`. 每侧提供一个筛选输入。全选、计数与移动都只作用于筛选后可见的项。
- `titles?`: `readonly [string, string]`. 两侧的标题，默认「候选」「已选」。
- `value?`: `readonly string[]`. 已选项的键（右侧），受控。顺序即移入的先后；显示时两侧都按 items 的顺序。
- plus 277 inherited (@types/react 277); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @daypicker/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Transfer
Two checkbox lists with move buttons between them. Each item is on exactly one side; value decides which are on the right.
- items: { value: string; label: string; disabled?: boolean }[]. All items. value and label must be non-empty and value unique within items, or it throws.
- value / defaultValue: string[]; default []. Keys of the items on the right (selected), controlled or uncontrolled.
- onValueChange: (value: string[], details: { direction: "toTarget" | "toSource"; moved: string[] }) => void. Called when a move happens: the new full set of keys plus the direction and the keys moved. Keys moved in are appended after the current value.
- titles: [string, string]; default 候选 / 已选. The two titles, which also name each list for assistive technology.
- searchable: boolean; default false. Adds a filter input to each side. Select all, the count and moving act on the visible, filtered items only.
- name: string. Each key on the right is submitted as a hidden field of this name; a form reset restores the default value.
- disabled: boolean; default false. The whole component is inert and is not submitted.
- listClassName: string. className for the list areas. By default both are the same fixed height so the layout does not jump when items move.

## Keyboard
- Tab / Shift+Tab: Passes through, in order: the left select-all, filter, item checkboxes, the move buttons, then the same controls on the right.
- Space: Toggles the focused checkbox (an item or select all).
- Enter（移动按钮）: On a move button: moves the checked items to the other side; does nothing when none can move.

## Source examples
### 基础
Source: apps/docs/src/content/transfer/demos/01-basic.tsx
```tsx
import { useState } from "react";
import { Transfer } from "@qingye_lab/ui/components/transfer";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "基础", titleEn: "Basic" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const labels = en ? ["Apple", "Banana", "Cherry", "Grape", "Lemon", "Mango", "Peach", "Pear"] : ["苹果", "香蕉", "樱桃", "葡萄", "柠檬", "芒果", "桃", "梨"];
  const items = labels.map((label, index) => ({ value: `k${index}`, label, disabled: index === 3 }));
  const [value, setValue] = useState<string[]>(["k2", "k5"]);
  return <div className="flex w-full max-w-xl flex-col gap-(--qy-space-3)">
    <Transfer items={items} value={value} onValueChange={setValue} />
    <output className="text-support text-muted-foreground" aria-live="polite">{value.length} / {items.length}</output>
  </div>;
}
```

### 筛选与表单
Source: apps/docs/src/content/transfer/demos/02-searchable.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Transfer } from "@qingye_lab/ui/components/transfer";
import { useUILocale } from "@qingye_lab/ui/locale";

export const meta = { title: "筛选与表单", titleEn: "Filter and form" };

export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const labels = en
    ? ["Alder", "Birch", "Cedar", "Cypress", "Elm", "Fir", "Ginkgo", "Hazel", "Juniper", "Larch", "Maple", "Oak"]
    : ["赤杨", "白桦", "雪松", "柏", "榆", "冷杉", "银杏", "榛", "杜松", "落叶松", "枫", "橡"];
  const items = labels.map((label, index) => ({ value: `t${index}`, label }));
  return <Field name="trees" className="w-full max-w-xl">
    <FieldLabel>{en ? "Trees" : "树种"}</FieldLabel>
    <Transfer name="trees" items={items} searchable defaultValue={["t1"]} titles={en ? ["Available", "Chosen"] : ["候选", "选中"]} />
    <FieldDescription>{en ? "Select all and moving act on the filtered items only." : "全选与移动只作用于筛选后的条目。"}</FieldDescription>
  </Field>;
}
```
