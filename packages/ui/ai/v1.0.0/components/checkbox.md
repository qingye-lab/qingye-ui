# 复选框 Checkbox

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/checkbox
Source: packages/ui/src/components/checkbox.tsx
Source SHA-256: 0afaa4d2c5e82b58a6a1f892af37bc9b08c50cccb8081adbabb3c5abab4209fb

选择独立的是/否或集合中的多个项。

## Decision
多个独立选项用 Checkbox，立即切换设置用 Switch。部分选中由调用方根据子项计算。

## Notes
- indeterminate 由真实集合计算，不是独立视觉变体。
- FieldLabel 或真实 label 关联名称，说明和错误留在 Field 中。
- 选中与无效可以同时存在；错误不会清空选中值。

## Use and ownership
- 独立二值、集合多选、待提交选择
- Avoid: 立即生效的设置用 Switch
- Avoid: 互斥单选用 Radio
- Library: 焦点、键盘、非受控 checked
- Application: 受控 checked、indeterminate、集合范围、invalid

## Composition
- Field 的名称、说明、错误结构

## Responsive behavior
- 可见几何与命中区分开；本批只验桌面

## Customization
- 同名文字行高、marker圆角、主题颜色

## Current exports
- Checkbox: function; owner checkbox; PASS; props: CheckboxProps
- CheckboxPrimitive: reexport; owner checkbox; UNVERIFIED
- CheckboxProps: type; owner checkbox; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Checkbox
Base UI 复选语义及混合状态。
- checked / defaultChecked: boolean. 受控选中值或非受控初值。
- indeterminate: boolean; default false. 集合部分选中的事实；aria-checked 为 mixed。
- onCheckedChange: (checked, eventDetails) => void. 选择变化，可取消。集合更新由应用处理。
- disabled / readOnly: boolean; default false. 禁用跳过键盘并不提交；只读可聚焦、提交但不可切换。
- aria-invalid: boolean | 'true' | 'false'. 显式无效事实；Field invalid 也可传入。
- name / value / uncheckedValue / form: string. 保留原语隐藏输入的真实表单提交语义。
- render / ref / inputRef / className / style: Base UI composition. 根部位与隐藏 input 的组合；渲染 button 时同时设置 nativeButton。

### CheckboxPrimitive
完整 Base UI Checkbox 命名空间，包含 Root 与 Indicator。

## Keyboard
- Tab / Shift+Tab: 按文档顺序进入每项。
- Space: 切换选中值；只读与禁用不切换。

## Source examples
### 部分选中
Source: apps/docs/src/content/checkbox/demos/01-selection.tsx
```tsx
import { useState } from "react";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Fieldset, FieldsetLegend } from "@qingye_lab/ui/components/fieldset";

export const meta = { title: "部分选中", titleEn: "Partial selection" };

export default function Demo() {
  const [first, setFirst] = useState(true);
  const [second, setSecond] = useState(false);
  return (
    <Fieldset>
      <FieldsetLegend>通知范围</FieldsetLegend>
      <Field orientation="horizontal">
        <Checkbox checked={first && second} indeterminate={first !== second} onCheckedChange={(checked) => { setFirst(checked); setSecond(checked); }} />
        <FieldLabel>全选</FieldLabel>
      </Field>
      <Field orientation="horizontal"><Checkbox checked={first} onCheckedChange={setFirst} /><FieldLabel>选项一</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox checked={second} onCheckedChange={setSecond} /><FieldLabel>选项二</FieldLabel></Field>
    </Fieldset>
  );
}
```

### 状态
Source: apps/docs/src/content/checkbox/demos/02-states.tsx
```tsx
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldContent, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";

export const meta = { title: "状态", titleEn: "States" };

export default function Demo() {
  return (
    <div className="grid gap-(--qy-field-group-gap)">
      <Field orientation="horizontal"><Checkbox /><FieldLabel>选项一</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>选项二</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox readOnly defaultChecked /><FieldLabel>只读</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox disabled /><FieldLabel>禁用</FieldLabel></Field>
      <Field orientation="horizontal" invalid><Checkbox /><FieldContent><FieldLabel>必选项</FieldLabel><FieldError>请选择此项。</FieldError></FieldContent></Field>
    </div>
  );
}
```

### 跟随标签
Source: apps/docs/src/content/checkbox/demos/03-labels.tsx
```tsx
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Heading } from "@qingye_lab/ui/components/typography";

export const meta = { title: "跟随标签", titleEn: "Follows its label" };

// 标记只有一种几何，跟随相邻标签的文字档（用户裁决 2026-10-05）：
// 勾选框与它旁边那行字同高，因此列表项里的标记和标题旁的标记由文字本身决定。
export default function Demo() {
  return (
    <div className="grid w-full max-w-lg gap-(--qy-field-group-gap)">
      <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel>正文标签</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><FieldLabel className="text-support">紧凑标签</FieldLabel></Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><span className="text-reading">说明性文字，标记与它同高</span></Field>
      <Field orientation="horizontal"><Checkbox defaultChecked /><Heading level={4} className="text-heading">分区标题</Heading></Field>
    </div>
  );
}
```
