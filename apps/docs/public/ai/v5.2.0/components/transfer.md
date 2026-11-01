# 穿梭框 Transfer

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/transfer
Source: packages/ui/src/components/transfer.tsx
Source SHA-256: 33edceaba8c73967d2c63e2a6120ec744e68eff44d41db0816c2075cecfa06c8

把条目在「候选」与「已选」两个列表之间移动，值是已选一侧的键。

## Decision
穿梭框解决的是「从一大批里挑出一小批并能回头调整」，所以两侧都是完整的列表，而不是一个下拉加一排标签。它的值只是右侧的键数组，勾选状态是临时的，不进入值。条目多时由应用先做筛选或分页，本组件不做虚拟滚动：固定高度的列表在几百项内足够，更大的数据量应换成 Combobox 或 Table 里的选择。

## Notes
- 只有「勾选、当前可见（过了筛选）、未禁用」的条目会移动；被筛选隐藏的已勾选项不会被带走。
- 移动按钮在没有可移动条目时用 aria-disabled 而不是 disabled：它仍可聚焦，读屏仍能读到它的名字「将所选 n 项移到……」。
- 每次移动后用 role="status" 的屏幕阅读器专用文字播报「已移到“已选” n 项」。
- 两侧各自是带名称的复选框组，计数「n / m」是它的描述；全选是父复选框，部分选中时显示不确定态。

## Use and ownership
- 在两个互斥的集合之间分配一批条目
- 需要同时看到「已选」全貌并能逐项撤回
- Avoid: 选一个或几个、不需要总览已选项时用 Select 或 Combobox
- Avoid: 条目成千上万时用带搜索的 Combobox 或表格选择
- Avoid: 只有开关含义的少量选项用 CheckboxGroup
- Library: 非受控的已选键、各侧临时勾选与筛选词、焦点
- Application: 受控的已选键、条目来源、选择的含义与提交、invalid

## Composition
- FieldLabel + Transfer + FieldDescription + FieldError
- titles 取与业务一致的两个名词，而不是「左」「右」

## Responsive behavior
- 三列：两侧等宽，中间按钮列按内容；窄容器内两侧收窄但不换行；本批只做桌面检查

## Customization
- titles；listClassName；items 的 disabled

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
两个带复选框的列表加中间的移动按钮。每个条目只在其中一侧；value 决定哪些条目在右侧。
- items: { value: string; label: string; disabled?: boolean }[]. 全部条目。value 与 label 必须非空，value 在 items 内唯一，否则抛错。
- value / defaultValue: string[]; default []. 右侧（已选）条目的键，受控或非受控。
- onValueChange: (value: string[], details: { direction: "toTarget" | "toSource"; moved: string[] }) => void. 移动发生时调用：新的完整键集合，以及本次的方向与被移动的键。移入的键追加在现有值之后。
- titles: [string, string]; default 候选 / 已选. 两侧标题，同时是各自列表的可访问名称。
- searchable: boolean; default false. 每侧加一个筛选输入。全选、计数与移动只作用于筛选后可见的条目。
- name: string. 右侧每个键以同名隐藏字段随原生表单提交；表单重置时恢复默认值。
- disabled: boolean; default false. 整个穿梭框不可操作，不提交。
- listClassName: string. 列表区域的 className。默认两侧同高并固定，移动时版面不跳。

## Keyboard
- Tab / Shift+Tab: 依次经过：左侧全选、筛选、各条目复选框、移动按钮、右侧同样的控件。
- Space: 切换当前复选框（条目或全选）。
- Enter（移动按钮）: 把所选条目移到另一侧；没有可移动条目时不动作。

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
