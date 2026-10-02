# 原生选择框 NativeSelect

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/native-select
Source: packages/ui/src/components/native-select.tsx
Source SHA-256: abfb15c45ba5ed505b2bc199de62264f6049cff3530b3cacc76b149369a36d6e

外观与 Select 触发器一致的原生 <select>。手机上直接唤起系统选择器，适合移动优先的表单和很长的选项列表；需要图标、搜索或自定义选项时用 Select。

## Use and ownership
- 移动表单或长选项列表中使用系统选择器选择一个值。
- Avoid: 占位选项不是有效值；required 时不能把默认第一项当成用户已选择。
- Library: 原生选择、空值、字段关联与尺寸角色。
- Application: 选项数据、当前值、业务必填规则和保存。

## Composition
- NativeSelectOption 与 OptGroup 保留原生选项关系，Field 承接名称和错误。

## Responsive behavior
- 使用平台选择面板；框内长值截断但保留完整原生选项文本。

## Customization
- size 跟随 --qy-control-*；selectClassName 调整输入部位而非外框。

## Current exports
- NativeSelect: function; owner native-select; PASS; props: NativeSelectProps
- NativeSelectOptGroup: function; owner native-select; PASS; props: React.ComponentProps<"optgroup">
- NativeSelectOption: function; owner native-select; PASS; props: React.ComponentProps<"option">
- NativeSelectProps: type; owner native-select; PASS
- NativeSelectSize: type; owner native-select; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### NativeSelect
渲染原生 <select>，其余属性（name、required、form、onChange……）原样透传。放在 Field 中时自动关联 FieldLabel、描述与校验状态。
- size: "sm" | "default" | "lg"; default "default". 与 Select 触发器相同的尺寸；粗指针下最小高度 44px。
- placeholder: string | boolean. 在首位加入值为空的选项，未选择时以占位色显示；true 使用本地化的“请选择”。required 时该项不可再选。
- value / defaultValue: string. 受控 / 非受控的值。
- onValueChange: (value: string) => void. 选择变化时回调。
- disabled: boolean; default false. 禁用。
- aria-invalid: boolean. 标记为无效，显示错误边框；在 Field 中由校验自动设置。
- className: string. 作用于外层控件框（边框、背景、宽度）。
- selectClassName: string. 作用于内部 <select> 元素。

### NativeSelectOption
原生 <option>，带 data-slot。

### NativeSelectOptGroup
原生 <optgroup>，用 label 为一组选项命名。

## Keyboard
- Tab: 聚焦选择框。
- Space / Alt + ↓: 打开系统选项列表。
- ↑ / ↓: 切换选项（部分平台会先打开列表）。
- 字母或数字: 跳到以该字符开头的选项。

## Source examples
### 基础用法
Source: apps/docs/src/content/native-select/demos/01-basic.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";

export const meta = { title: "基础用法", description: "在 Field 中使用时，标签与描述自动关联。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>所在城市</FieldLabel>
      <NativeSelect name="city" placeholder="选择城市">
        <NativeSelectOption value="beijing">北京</NativeSelectOption>
        <NativeSelectOption value="shanghai">上海</NativeSelectOption>
        <NativeSelectOption value="guangzhou">广州</NativeSelectOption>
        <NativeSelectOption value="shenzhen">深圳</NativeSelectOption>
        <NativeSelectOption value="hangzhou">杭州</NativeSelectOption>
        <NativeSelectOption value="chengdu">成都</NativeSelectOption>
      </NativeSelect>
      <FieldDescription>用于计算配送时效，可随时修改。</FieldDescription>
    </Field>
  );
}
```

### 尺寸
Source: apps/docs/src/content/native-select/demos/02-sizes.tsx
```tsx
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";

export const meta = { title: "尺寸", description: "与 Select 触发器相同的三档尺寸；移动端自动加高 4px。" };

const sizes = [
  { size: "sm", label: "小" },
  { size: "default", label: "默认" },
  { size: "lg", label: "大" },
] as const;

export default function Demo() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-3">
      {sizes.map(({ size, label }) => (
        <NativeSelect aria-label={`${label}尺寸`} defaultValue="week" key={size} size={size}>
          <NativeSelectOption value="day">按天汇总</NativeSelectOption>
          <NativeSelectOption value="week">按周汇总</NativeSelectOption>
          <NativeSelectOption value="month">按月汇总</NativeSelectOption>
        </NativeSelect>
      ))}
    </div>
  );
}
```

### 状态
Source: apps/docs/src/content/native-select/demos/03-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";

export const meta = { title: "状态", description: "占位、禁用与无效。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xl gap-5 sm:grid-cols-3">
      <Field>
        <FieldLabel>发票类型</FieldLabel>
        <NativeSelect placeholder>
          <NativeSelectOption value="normal">增值税普通发票</NativeSelectOption>
          <NativeSelectOption value="special">增值税专用发票</NativeSelectOption>
        </NativeSelect>
      </Field>
      <Field disabled>
        <FieldLabel>结算币种</FieldLabel>
        <NativeSelect defaultValue="cny">
          <NativeSelectOption value="cny">人民币 CNY</NativeSelectOption>
          <NativeSelectOption value="usd">美元 USD</NativeSelectOption>
        </NativeSelect>
      </Field>
      <Field invalid>
        <FieldLabel>所属部门</FieldLabel>
        <NativeSelect placeholder="选择部门" required>
          <NativeSelectOption value="design">设计部</NativeSelectOption>
          <NativeSelectOption value="engineering">研发部</NativeSelectOption>
          <NativeSelectOption value="operations">运营部</NativeSelectOption>
        </NativeSelect>
        <FieldError>请选择所属部门</FieldError>
      </Field>
    </div>
  );
}
```

### 分组与长列表
Source: apps/docs/src/content/native-select/demos/04-groups.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { NativeSelect, NativeSelectOptGroup, NativeSelectOption } from "@qingye/ui/components/native-select";

export const meta = { title: "分组与长列表", description: "选项很多时用 optgroup 分组，系统选择器会自带滚动与快速定位。" };

const regions = [
  { label: "华北", provinces: ["北京市", "天津市", "河北省", "山西省", "内蒙古自治区"] },
  { label: "华东", provinces: ["上海市", "江苏省", "浙江省", "安徽省", "福建省", "江西省", "山东省"] },
  { label: "华南", provinces: ["广东省", "广西壮族自治区", "海南省"] },
  { label: "西南", provinces: ["重庆市", "四川省", "贵州省", "云南省", "西藏自治区"] },
];

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>收货省份</FieldLabel>
      <NativeSelect name="province" placeholder="选择省份" required>
        {regions.map((region) => (
          <NativeSelectOptGroup key={region.label} label={region.label}>
            {region.provinces.map((province) => (
              <NativeSelectOption key={province} value={province}>
                {province}
              </NativeSelectOption>
            ))}
          </NativeSelectOptGroup>
        ))}
      </NativeSelect>
    </Field>
  );
}
```

### 与 Select、Input 并排
Source: apps/docs/src/content/native-select/demos/05-alignment.tsx
```tsx
import { Input } from "@qingye/ui/components/input";
import { NativeSelect, NativeSelectOption } from "@qingye/ui/components/native-select";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";

export const meta = {
  title: "与 Select、Input 并排",
  description: "高度、边框、内边距与图标位置和 Select 触发器完全一致，混用时不会错位。",
};

const plans = [
  { value: "monthly", label: "按月付费" },
  { value: "yearly", label: "按年付费" },
];

export default function Demo() {
  return (
    <div className="grid w-full max-w-2xl gap-3 sm:grid-cols-3">
      <Input aria-label="团队名称" defaultValue="青云设计" />
      <NativeSelect aria-label="付费周期（原生）" defaultValue="yearly">
        {plans.map((plan) => (
          <NativeSelectOption key={plan.value} value={plan.value}>
            {plan.label}
          </NativeSelectOption>
        ))}
      </NativeSelect>
      <Select defaultValue="yearly" items={plans}>
        <SelectTrigger aria-label="付费周期">
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {plans.map((plan) => (
            <SelectItem key={plan.value} value={plan.value}>
              {plan.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
    </div>
  );
}
```

