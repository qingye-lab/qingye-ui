# 单选框组 RadioGroup

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/radio-group
Source: packages/ui/src/components/radio-group.tsx
Source SHA-256: 4aa8063028360c0a1fe50b1b2cd67c18e89e633a73764b82873fc50455aca615

在少量互斥选项中选一个，选项需要同时可见时使用；选项多时改用 Select。

## Use and ownership
- 同时比较少量互斥方案并选择其中一个。
- Avoid: 不可把不同维度的选择混进同一组；选中状态不等于已保存。
- Library: 单选值、组内方向键导航、焦点与禁用项。
- Application: 方案数据、默认选项与提交结果。

## Composition
- FieldsetLegend 提供共同问题，每个 Radio 的标签说明不同选项及必要差异。

## Responsive behavior
- 窄屏可以改为纵排，仍同时保留互斥方案；每项命中区不随密度缩小。

## Customization
- 卡片或文本行都以 Label 组合 Radio，不能重做独立点击状态。

## Current exports
- Radio: function; owner radio-group; PASS; props: RadioPrimitive.Root.Props
- RadioGroup: function; owner radio-group; PASS; props: RadioGroupPrimitive.Props
- RadioGroupItem: function; owner radio-group; alias of Radio; PASS; props: RadioPrimitive.Root.Props
- RadioGroupPrimitive: reexport; owner radio-group; UNVERIFIED
- RadioPrimitive: reexport; owner radio-group; UNVERIFIED

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### RadioGroup
Base UI RadioGroup。
- value / defaultValue / onValueChange: unknown. 受控 / 非受控的选中值。
- name / required / disabled / readOnly: string / boolean. 表单字段名与状态。
- aria-labelledby: string. 指向组标题；或放进 Fieldset 用 FieldsetLegend 命名。

### Radio
单个选项（别名 RadioGroupItem）。触屏设备上点击区扩大到 44px。
- value: unknown. 此选项的值。
- disabled: boolean. 禁用此选项。
- aria-invalid: boolean. 错误边框。

## Keyboard
- Tab: 进入组时聚焦选中项（无选中时为第一项）。
- ↑ ↓ ← →: 移动并选中上一个 / 下一个选项。
- Space: 选中当前聚焦项。

## Source examples
### 基础用法
Source: apps/docs/src/content/radio-group/demos/01-basic.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";

export const meta = { title: "基础用法" };

export default function Demo() {
  return (
    <div className="flex flex-col gap-3">
      <span id="billing" className="font-medium text-sm">计费方式</span>
      <RadioGroup aria-labelledby="billing" defaultValue="monthly">
        <Label><Radio value="hourly" />按量付费</Label>
        <Label><Radio value="monthly" />包年包月</Label>
        <Label><Radio value="spot" disabled />抢占式实例（当前地域不可用）</Label>
      </RadioGroup>
    </div>
  );
}
```

### 带说明
Source: apps/docs/src/content/radio-group/demos/02-description.tsx
```tsx
import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";

export const meta = { title: "带说明", description: "每个选项一个 Field，说明作为描述读出。" };

const options = [
  { value: "rolling", label: "滚动发布", description: "逐台替换实例，服务不中断，耗时较长。" },
  { value: "blue-green", label: "蓝绿发布", description: "新旧两套环境并行，切换流量后可秒级回滚。" },
  { value: "recreate", label: "重建", description: "先停止全部旧实例再启动新版本，期间服务不可用。" },
];

export default function Demo() {
  return (
    <RadioGroup aria-label="发布策略" defaultValue="rolling" className="max-w-sm gap-4">
      {options.map((option) => (
        <Field key={option.value} orientation="horizontal" className="items-start">
          <Radio value={option.value} className="mt-px" />
          <FieldContent>
            <FieldLabel>{option.label}</FieldLabel>
            <FieldDescription>{option.description}</FieldDescription>
          </FieldContent>
        </Field>
      ))}
    </RadioGroup>
  );
}
```

### 卡片选项
Source: apps/docs/src/content/radio-group/demos/03-card.tsx
```tsx
import { Label } from "@qingye/ui/components/label";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";

export const meta = { title: "卡片选项", description: "适合套餐、方案这类需要对比的选择。" };

const plans = [
  { value: "basic", name: "基础版", detail: "10 台设备 · 7 天数据", price: "¥0" },
  { value: "pro", name: "专业版", detail: "200 台设备 · 90 天数据", price: "¥299/月" },
  { value: "enterprise", name: "企业版", detail: "不限设备 · 私有部署", price: "联系销售" },
];

export default function Demo() {
  return (
    <RadioGroup aria-label="订阅套餐" defaultValue="pro" className="grid w-full max-w-2xl gap-2 sm:grid-cols-3">
      {plans.map((plan) => (
        <Label
          key={plan.value}
          className="flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50"
        >
          <Radio value={plan.value} className="mt-px" />
          <span className="flex min-w-0 flex-col gap-1">
            <span>{plan.name}</span>
            <span className="font-normal text-muted-foreground text-xs">{plan.detail}</span>
            <span className="mt-1 font-semibold text-sm numeric">{plan.price}</span>
          </span>
        </Label>
      ))}
    </RadioGroup>
  );
}
```

### 横向、禁用与错误
Source: apps/docs/src/content/radio-group/demos/04-states.tsx
```tsx
import { Fieldset, FieldsetLegend } from "@qingye/ui/components/fieldset";
import { Label } from "@qingye/ui/components/label";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";

export const meta = { title: "横向、禁用与错误" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-lg flex-col gap-6">
      <Fieldset>
        <FieldsetLegend>巡检频率</FieldsetLegend>
        <RadioGroup defaultValue="week" className="flex-row flex-wrap gap-x-5 gap-y-3">
          <Label><Radio value="day" />每天</Label>
          <Label><Radio value="week" />每周</Label>
          <Label><Radio value="month" />每月</Label>
        </RadioGroup>
      </Fieldset>
      <Fieldset>
        <FieldsetLegend>机房（已锁定）</FieldsetLegend>
        <RadioGroup defaultValue="hz" disabled className="flex-row flex-wrap gap-x-5 gap-y-3">
          <Label><Radio value="hz" />杭州 IDC</Label>
          <Label><Radio value="sh" />上海 IDC</Label>
        </RadioGroup>
      </Fieldset>
      <Fieldset>
        <FieldsetLegend>故障等级</FieldsetLegend>
        <RadioGroup aria-describedby="level-error" className="flex-row flex-wrap gap-x-5 gap-y-3">
          <Label><Radio value="p1" aria-invalid />P1 紧急</Label>
          <Label><Radio value="p2" aria-invalid />P2 严重</Label>
          <Label><Radio value="p3" aria-invalid />P3 一般</Label>
        </RadioGroup>
        <p id="level-error" className="text-destructive-foreground text-xs">请选择故障等级</p>
      </Fieldset>
    </div>
  );
}
```

