# 复选框组 CheckboxGroup

Package: @qingye/ui@0.4.0
Import: @qingye/ui/components/checkbox-group
Source: packages/ui/src/components/checkbox-group.tsx
Source SHA-256: c60887f5630721c96b7d9323dccedf4c19caf2feafcd04df08b95a24c7391319

管理一组复选框的数组值，支持「全选」父复选框。

## Use and ownership
- 管理一组可同时选择的条件，保留各项独立状态与共同范围。
- Avoid: 父级全选只控制本组成员，不应默默扩展到未显示的其他对象。
- Library: 成员关系、数组值、父子选择和禁用传播。
- Application: 成员数据、范围定义和批量提交结果。

## Composition
- FieldsetLegend 命名范围，CheckboxGroup 管理数组，parent Checkbox 表达全选与半选。

## Responsive behavior
- 默认纵向排列以保留选项文字容量，紧凑时也保留各项命中区。

## Customization
- 用 group className 调整排列，成员仍使用 Checkbox 公共实现。

## Current exports
- CheckboxGroup: function; owner checkbox-group; PASS; props: CheckboxGroupPrimitive.Props
- CheckboxGroupPrimitive: reexport; owner checkbox-group; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### CheckboxGroup
Base UI CheckboxGroup；子 Checkbox 用 value 标识自己。
- value / defaultValue / onValueChange: string[]. 受控 / 非受控的已选值。
- allValues: string[]. 全部子项的值；配合 <Checkbox parent> 实现全选与半选。
- disabled: boolean; default false. 禁用整组。
- aria-labelledby: string. 指向组标题；或放进 Fieldset 用 FieldsetLegend 命名。

## Keyboard
- Tab: 在复选框之间移动。
- Space: 切换当前复选框；在父复选框上切换全部。

## Source examples
### 基础用法
Source: apps/docs/src/content/checkbox-group/demos/01-basic.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { CheckboxGroup } from "@qingye/ui/components/checkbox-group";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "基础用法" };

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <span id="notify-title" className="font-medium text-sm">接收以下事件的通知</span>
      <CheckboxGroup aria-labelledby="notify-title" defaultValue={["offline", "alarm"]}>
        <Label><Checkbox value="offline" />设备离线</Label>
        <Label><Checkbox value="alarm" />温度告警</Label>
        <Label><Checkbox value="firmware" />固件可升级</Label>
        <Label><Checkbox value="report" />每周运行报告</Label>
      </CheckboxGroup>
    </div>
  );
}
```

### 全选与半选
Source: apps/docs/src/content/checkbox-group/demos/02-parent.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { CheckboxGroup } from "@qingye/ui/components/checkbox-group";
import { Label } from "@qingye/ui/components/label";
import { useState } from "react";

export const meta = { title: "全选与半选", description: "父复选框根据子项自动显示全选、半选或未选。" };

const permissions = [
  { value: "read", label: "查看设备" },
  { value: "control", label: "远程控制" },
  { value: "ota", label: "固件升级" },
  { value: "delete", label: "删除设备" },
];

export default function Demo() {
  const [value, setValue] = useState(["read", "control"]);
  return (
    <CheckboxGroup
      aria-label="运维角色权限"
      value={value}
      onValueChange={setValue}
      allValues={permissions.map((item) => item.value)}
    >
      <Label><Checkbox parent />运维角色 · 全部权限</Label>
      <div className="flex flex-col gap-3 ps-6">
        {permissions.map((item) => (
          <Label key={item.value}><Checkbox value={item.value} />{item.label}</Label>
        ))}
      </div>
    </CheckboxGroup>
  );
}
```

### 横向排列与禁用
Source: apps/docs/src/content/checkbox-group/demos/03-fieldset.tsx
```tsx
import { Checkbox } from "@qingye/ui/components/checkbox";
import { CheckboxGroup } from "@qingye/ui/components/checkbox-group";
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Label } from "@qingye/ui/components/label";

export const meta = { title: "横向排列与禁用", description: "Fieldset 命名整组；禁用的选项保持可见。" };

export default function Demo() {
  return (
    <Fieldset className="max-w-md">
      <FieldsetLegend>工作日</FieldsetLegend>
      <CheckboxGroup defaultValue={["mon", "tue", "wed", "thu", "fri"]} className="flex-row flex-wrap gap-x-5 gap-y-3">
        <Label><Checkbox value="mon" />周一</Label>
        <Label><Checkbox value="tue" />周二</Label>
        <Label><Checkbox value="wed" />周三</Label>
        <Label><Checkbox value="thu" />周四</Label>
        <Label><Checkbox value="fri" />周五</Label>
        <Label><Checkbox value="sat" disabled />周六</Label>
        <Label><Checkbox value="sun" disabled />周日</Label>
      </CheckboxGroup>
    </Fieldset>
  );
}
```

