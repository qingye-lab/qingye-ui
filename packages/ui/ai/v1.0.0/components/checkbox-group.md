# 复选组 CheckboxGroup

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/checkbox-group
Source: packages/ui/src/components/checkbox-group.tsx
Source SHA-256: fe0248cc06c34c992d2211ae1c9fe08d3e9c7b8c9183375af4b2de25c4f813f0

把复选项接入同一个集合与共同范围。

## Decision
CheckboxGroup 持有集合值。allValues 是父项操作的范围，改变它必须对应真实候选范围。

## Notes
- Field.name 或各 Checkbox.name 决定表单字段；相同 name 提交多项值。
- FieldItem/FieldLabel 必须放在 Field 内；组外也可使用原生 label。
- 只读是项的限制，disabled 是组的限制；不从空集合推断 invalid。

## Use and ownership
- 一组可同时选择的候选
- 父复选项控制明确的完整集合
- Avoid: 只排列内容时用布局组件
- Avoid: 互斥候选用 RadioGroup
- Avoid: 开关设置用 Switch
- Library: 非受控集合、焦点、键盘、父项 mixed
- Application: 受控集合、allValues、候选、invalid、提交

## Composition
- FieldTitle 命名组；FieldItem + Checkbox + FieldLabel 命名单项；FieldDescription/FieldError 关联同一集合

## Responsive behavior
- 复用 Checkbox 尺寸与触摸目标；本批未运行浏览器几何验收

## Customization
- 组内 field-gap；单项通过 Checkbox 的 size 和样式入口调整

## Current exports
- CheckboxGroup: function; owner checkbox-group; PASS; props: CheckboxGroupProps
- CheckboxGroupPrimitive: reexport; owner checkbox-group; UNVERIFIED
- CheckboxGroupProps: type; owner checkbox-group; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CheckboxGroup
集合状态，不只是排列复选项。
- value / defaultValue: string[]. 受控集合或初始集合；空数组表示未选任何项。Checkbox.value 标识集合项。
- onValueChange: (value: string[], details) => void. 提供增删后的集合，可用 details.cancel() 取消本次变化。
- allValues: string[]. 完整范围；配合 Checkbox parent 计算全选、未选和 mixed。由调用方给出，不从业务推断。
- disabled: boolean; default false. 真正禁用组内复选项；单项 readOnly 放在 Checkbox。
- aria-labelledby / aria-label: string. 共同名称；可引用 FieldTitle 或 FieldsetLegend。
- render / ref / className / style: Base UI composition. 透传根部位、原生属性与事件；样式支持原语状态回调。

### CheckboxGroupPrimitive
Base UI 集合原语公共出口。

## Keyboard
- Tab / Shift+Tab: 逐个到达可用复选项。
- Space: 增删当前项；父项作用于 allValues 的完整范围。

## Source examples
### 集合
Source: apps/docs/src/content/checkbox-group/demos/01-selection.tsx
```tsx
import { useId, useState } from "react";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { CheckboxGroup } from "@qingye_lab/ui/components/checkbox-group";
import { Field, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";

export const meta = { title: "集合", titleEn: "Collection" };
const options = [{ value: "alpha", label: "甲" }, { value: "beta", label: "乙" }, { value: "gamma", label: "丙" }];

export default function Demo() {
  const id = useId(); const [value, setValue] = useState(["alpha"]);
  return <Field name="choices"><FieldTitle id={id}>可选项</FieldTitle>
    <CheckboxGroup aria-labelledby={id} value={value} onValueChange={setValue} allValues={options.map(option => option.value)}>
      <FieldItem><Checkbox parent /><FieldLabel>全部</FieldLabel></FieldItem>
      {options.map(option => <FieldItem key={option.value}><Checkbox value={option.value} /><FieldLabel>{option.label}</FieldLabel></FieldItem>)}
    </CheckboxGroup>
    <output className="text-support text-foreground" aria-live="polite">{value.length} 项</output>
  </Field>;
}
```

### 状态
Source: apps/docs/src/content/checkbox-group/demos/02-states.tsx
```tsx
import { useId } from "react";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { CheckboxGroup } from "@qingye_lab/ui/components/checkbox-group";
import { Field, FieldError, FieldGroup, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";

export const meta = { title: "状态", titleEn: "States" };
export default function Demo() {
  const id = useId();
  return <FieldGroup className="grid sm:grid-cols-3">
    <Field><FieldTitle id={`${id}-disabled`}>禁用集合</FieldTitle><CheckboxGroup disabled defaultValue={["alpha"]} aria-labelledby={`${id}-disabled`}><FieldItem><Checkbox value="alpha" /><FieldLabel>设备离线</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>同步失败</FieldLabel></FieldItem></CheckboxGroup></Field>
    <Field><FieldTitle id={`${id}-readonly`}>只读项</FieldTitle><CheckboxGroup defaultValue={["alpha"]} aria-labelledby={`${id}-readonly`}><FieldItem><Checkbox readOnly value="alpha" /><FieldLabel>设备离线</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>同步失败</FieldLabel></FieldItem></CheckboxGroup></Field>
    <Field invalid><FieldTitle id={`${id}-invalid`}>受限范围</FieldTitle><CheckboxGroup aria-labelledby={`${id}-invalid`}><FieldItem><Checkbox value="alpha" /><FieldLabel>设备离线</FieldLabel></FieldItem><FieldItem><Checkbox value="beta" /><FieldLabel>同步失败</FieldLabel></FieldItem></CheckboxGroup><FieldError>至少选择一项</FieldError></Field>
  </FieldGroup>;
}
```
