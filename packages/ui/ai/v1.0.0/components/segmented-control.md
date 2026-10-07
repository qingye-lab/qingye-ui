# 分段控件 SegmentedControl

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/segmented-control
Source: packages/ui/src/components/segmented-control.tsx
Source SHA-256: 5b53a97e3c9230aa849fa02f74fc90f5dfdc69e4ba5e9457268eddd8c1338095

从并列的少量候选中输入一个值。

## Decision
SegmentedControl 产生一个新值。切换内容面板用 Tabs；允许全部取消的工具切换用 ToggleGroup。

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
- 候选复用 bordered/solid 与同档文字；不新增外围焦点圈

## Current exports
- SegmentedControl: function; owner segmented-control; PASS; props: SegmentedControlProps<Value>
- SegmentedControlItem: function; owner segmented-control; PASS; props: SegmentedControlItemProps<Value>
- SegmentedControlItemPrimitive: reexport; owner segmented-control; UNVERIFIED
- SegmentedControlItemProps: type; owner segmented-control; PASS
- SegmentedControlPrimitive: reexport; owner segmented-control; UNVERIFIED
- SegmentedControlProps: type; owner segmented-control; PASS
- SegmentedControlSize: type; owner segmented-control; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
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
import { Field, FieldTitle } from "@qingye/ui/components/field";
import { SegmentedControl, SegmentedControlItem } from "@qingye/ui/components/segmented-control";

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
import { Field, FieldError, FieldGroup, FieldTitle } from "@qingye/ui/components/field";
import { SegmentedControl, SegmentedControlItem } from "@qingye/ui/components/segmented-control";

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
