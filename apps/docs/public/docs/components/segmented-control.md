# 分段控件 SegmentedControl

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/segmented-control
Source: packages/ui/src/components/segmented-control.tsx
Source SHA-256: 366d8d92678c1a91950609486d0435c80e07d89f95621d0781bab30f0ba37a09

从并列的少量候选中输入一个值。

## Decision
SegmentedControl 产生一个新值。切换内容面板用 Tabs（Tabs 也可以用 appearance 设为 track 画成同一条轨道，外观不决定语义）；允许全部取消的工具切换用 ToggleGroup。选中段是选中面（清染）加焦墨字，不用主操作的填充，所以品牌覆写 --qy-primary 不会改变它；要调整，改系统的选中面 --qy-surface-selected（全库的选中一起变；--qy-track-selected 只是它的别名）与 --qy-track-selected-foreground。

## Notes
- 放在 Field 内时，整组的名称、描述与错误落在 radiogroup；每一段自己开标签作用域，id 各不相同，名称仍是段内文字，不会被 Field 的标签接管。
- 方向键遵循书写方向：UILocaleProvider 的 dir 为 rtl 时，→ 移向前一段。

## Use and ownership
- 少量可并列比较的互斥值
- Avoid: 面板视角用 Tabs
- Avoid: 候选较长或可收起用 Select
- Avoid: 独立二态使用 Toggle
- Library: 非受控值、焦点、方向键
- Application: 受控值、候选、invalid、提交

## Composition
- FieldTitle 命名组；FieldDescription/FieldError 关联输入；候选 children 是名称

## Responsive behavior
- 保留全部候选并允许换行；五档窄屏尺寸不改变语义

## Customization
- 选中段读 --qy-track-selected 与 --qy-track-selected-foreground（默认清染 + 焦墨），未选段字为浓墨；与同档文字；不新增外围焦点圈

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
- 方向键遵循书写方向：UILocaleProvider 的 dir 为 rtl 时，→ 移向前一段。
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context InField: without a provider default-value
- Context InFieldItem: without a provider default-value; provided by OptionScope
- Context SegmentSize: without a provider default-value; provided by SegmentedControl

## Curated API
Written descriptions; the list above is the type-resolved fact.

### SegmentedControl
radio 值输入；不拥有面板或选项清单。
- value / defaultValue: Value. 受控值或初始选择；不传初值保持未选择，0 与空字符串可以是真实选项。
- onValueChange: (value, details) => void. 选择值，可取消。点击已选项不会取消到空状态。
- name / form / required / inputRef: RadioGroup props. 原生表单入口；required 不自动推断 invalid。
- disabled / readOnly: boolean; default false. 禁用退出操作；只读保持当前值和焦点。
- size: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 同档 control 与 text-control，由各项继承。
- aria-label / aria-labelledby / render / ref / className / style: Base UI composition. 组的名称、部位与状态样式入口。

### SegmentedControlItem
带完整名称的 radio 候选。
- value: Value. 候选的真实值，必填。
- children / disabled / readOnly / size / render / nativeButton / ref: Radio props. 默认原生 button；改变元素时说明 nativeButton，保留 ARIA 和原生事件。

### SegmentedControlPrimitive / SegmentedControlItemPrimitive
Base UI RadioGroup 与 Radio 原语公共出口。

## Keyboard
- Tab / Shift+Tab: 在组内保留一个停靠点。
- ↑ / ↓ / ← / →: 移动并选择候选，跳过禁用项。
- Space: 选择当前项；Home/End 不属于 Radio 原语契约。

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
