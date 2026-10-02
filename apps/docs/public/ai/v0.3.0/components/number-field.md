# 数字输入框 NumberField

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/number-field
Source: packages/ui/src/components/number-field.tsx
Source SHA-256: 1d7755d92b28a9808c6c459b9408c56890dffcbcb85ee8ffd8f114bdce1b79d1

输入与步进数值，支持范围、步长、格式化（货币、百分比、单位）与拖动调整，适合数量、价格、阈值。

## Use and ownership
- 输入与步进数值，支持范围、步长、格式化（货币、百分比、单位）与拖动调整，适合数量、价格、阈值。
- Avoid: 不能仅用 placeholder 代替名称；失败后不要无故清空输入。
- Library: 当前导出和属性定义的基础交互、可访问语义与样式。
- Application: 对象、草稿、校验业务规则、版本与保存结果。

## Current exports
- CursorGrowIcon: function; owner number-field; PASS; props: React.ComponentProps<"svg">
- NumberField: function; owner number-field; PASS; props: NumberFieldPrimitive.Root.Props & {
  size?: "sm" | "default" | "lg";
}
- NumberFieldContext: const; owner number-field; PASS
- NumberFieldDecrement: function; owner number-field; PASS; props: NumberFieldPrimitive.Decrement.Props
- NumberFieldGroup: function; owner number-field; PASS; props: NumberFieldPrimitive.Group.Props
- NumberFieldIncrement: function; owner number-field; PASS; props: NumberFieldPrimitive.Increment.Props
- NumberFieldInput: function; owner number-field; PASS; props: NumberFieldPrimitive.Input.Props
- NumberFieldPrimitive: reexport; owner number-field; UNVERIFIED
- NumberFieldScrubArea: function; owner number-field; PASS; props: NumberFieldPrimitive.ScrubArea.Props & {
  label: string;
}

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### NumberField
基于 Base UI NumberField。数字格式默认跟随 UILocaleProvider 的语言。
- value / defaultValue: number | null. 受控 / 非受控的值。
- onValueChange: (value: number | null, details) => void. 值变化时调用。
- min / max: number. 取值范围，超出时步进按钮自动禁用。
- step / smallStep / largeStep: number; default 1 / 0.1 / 10. 普通、Alt、Shift 下的步长。
- format: Intl.NumberFormatOptions. 显示格式，如货币、百分比、单位。
- size: "sm" | "default" | "lg"; default "default". 尺寸。
- disabled / readOnly / required: boolean. 状态。

### NumberFieldGroup
外框，包裹按钮与输入框，承载边框与焦点环。

### NumberFieldInput
输入框，居中显示等宽数字。

### NumberFieldDecrement / NumberFieldIncrement
步进按钮；可访问名称来自 locale（减少 / 增加）。

### NumberFieldScrubArea
可拖动调整数值的标签区域。
- label: string. 标签文字（必填，同时作为输入框的标签）。

## Keyboard
- ↑ / ↓: 按 step 增减。
- Shift + ↑ / ↓: 按 largeStep 增减。
- Alt + ↑ / ↓: 按 smallStep 增减。
- Home / End: 跳到最小值 / 最大值（设置了 min / max 时）。

## Source examples
### 默认
Source: apps/docs/src/content/number-field/demos/01-default.tsx
```tsx
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "默认", description: "点击按钮、按 ↑ ↓ 或直接输入。" };

export default function Demo() {
  return (
    <NumberField aria-label="采购数量" className="max-w-40" defaultValue={12} min={1}>
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
```

### 尺寸
Source: apps/docs/src/content/number-field/demos/02-sizes.tsx
```tsx
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "尺寸" };

export default function Demo() {
  return (
    <div className="flex w-full max-w-40 flex-col gap-3">
      {(["sm", "default", "lg"] as const).map((size) => (
        <NumberField aria-label={`数量（${size}）`} defaultValue={3} key={size} size={size}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      ))}
    </div>
  );
}
```

### 格式化
Source: apps/docs/src/content/number-field/demos/03-format.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "格式化", description: "format 接受 Intl.NumberFormat 选项：货币、百分比、单位。" };

const fields = [
  { label: "单价", defaultValue: 1280, format: { style: "currency", currency: "CNY" }, step: 10 },
  { label: "折扣", defaultValue: 0.85, format: { style: "percent" }, step: 0.05, min: 0, max: 1 },
  { label: "库容上限", defaultValue: 2400, format: { style: "unit", unit: "kilogram" }, step: 100 },
] as const;

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-4">
      {fields.map(({ label, ...props }) => (
        <Field key={label}>
          <FieldLabel>{label}</FieldLabel>
          <NumberField {...props}>
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
        </Field>
      ))}
    </div>
  );
}
```

### 范围与步长
Source: apps/docs/src/content/number-field/demos/04-range.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "范围与步长", description: "到达边界时对应按钮自动禁用；Shift + ↑ ↓ 按 largeStep 调整。" };

export default function Demo() {
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>告警阈值（°C）</FieldLabel>
      <NumberField defaultValue={38} largeStep={5} max={40} min={20} step={0.5}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
      <FieldDescription>机房温度超过阈值时通知值班人员，范围 20 – 40。</FieldDescription>
    </Field>
  );
}
```

### 拖动调整
Source: apps/docs/src/content/number-field/demos/05-scrub.tsx
```tsx
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput, NumberFieldScrubArea } from "@qingye/ui/components/number-field";

export const meta = { title: "拖动调整", description: "在标签上左右拖动即可改值，适合设计、调参类界面。" };

export default function Demo() {
  return (
    <NumberField className="max-w-40" defaultValue={16} max={64} min={0}>
      <NumberFieldScrubArea label="圆角（px）" />
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
```

### 状态
Source: apps/docs/src/content/number-field/demos/06-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "状态", description: "无效、只读与禁用。" };

export default function Demo() {
  return (
    <div className="grid w-full max-w-xs gap-5">
      <Field invalid>
        <FieldLabel>补货数量</FieldLabel>
        <NumberField defaultValue={0}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
        <FieldError>补货数量至少为 1。</FieldError>
      </Field>
      <Field>
        <FieldLabel>当前库存</FieldLabel>
        <NumberField defaultValue={326} readOnly>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </Field>
      <Field disabled>
        <FieldLabel>安全库存</FieldLabel>
        <NumberField defaultValue={50}>
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </Field>
    </div>
  );
}
```

### 组合：带单位
Source: apps/docs/src/content/number-field/demos/07-input-group.tsx
```tsx
import { InputGroup, InputGroupAddon, InputGroupText } from "@qingye/ui/components/input-group";
import { NumberField, NumberFieldInput } from "@qingye/ui/components/number-field";

export const meta = { title: "组合：带单位", description: "放进 InputGroup，前后加货币符号与币种。" };

export default function Demo() {
  return (
    <InputGroup className="max-w-xs">
      <NumberField aria-label="预算金额" defaultValue={50000} step={1000}>
        <NumberFieldInput className="text-start" />
      </NumberField>
      <InputGroupAddon>
        <InputGroupText>¥</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>CNY</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
```

