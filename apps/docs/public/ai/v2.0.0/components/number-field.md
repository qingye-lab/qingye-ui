# 数值输入 NumberField

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/number-field
Source: packages/ui/src/components/number-field.tsx
Source SHA-256: 7dd45e6592f116b40b7a0794577d8492b47fb298b646a95397ed4f2680e51bda

编辑可为空的数值，并按指定步长增减。

## Decision
直接编辑超出范围时保留原值，提交由浏览器范围约束检查；步进仍限制在 min/max。空、负号和未完成小数不会被替换为 0。

## Notes
- FieldLabel 命名真实输入，FieldDescription 明示范围与步长。
- 封装固定 allowOutOfRange=true；没有静默纠正直接编辑的入口。
- 不从范围外值自动判断保存失败；invalid 由应用提供。
- 新写的共同边界与五档样式是本次视觉变化，浏览器焦点/对比另验。

## Use and ownership
- 有数值含义并需要步进的值
- Avoid: 编号、验证码、前导零有意义的文本用 Input / OtpField
- Library: 编辑文本、步进、焦点、非受控数值
- Application: 受控数值、范围、无效事实与提交结果

## Composition
- Field + FieldLabel + NumberField / Group / Input / steppers + FieldDescription / Error

## Responsive behavior
- 一套几何，跟随密度轴，紧凑不缩小文字与窄屏 +4px；粗指针编辑/步进采用库内触摸目标

## Customization
- Root 与每部件支持 render/ref；集中角色决定表面与尺寸

## Current exports
- NumberField: function; owner number-field; PASS; props: NumberFieldProps
- NumberFieldDecrement: function; owner number-field; PASS; props: NumberFieldPrimitive.Decrement.Props & React.RefAttributes<HTMLButtonElement>
- NumberFieldGroup: function; owner number-field; PASS; props: NumberFieldPrimitive.Group.Props & React.RefAttributes<HTMLDivElement>
- NumberFieldIncrement: function; owner number-field; PASS; props: NumberFieldPrimitive.Increment.Props & React.RefAttributes<HTMLButtonElement>
- NumberFieldInput: function; owner number-field; PASS; props: NumberFieldPrimitive.Input.Props & React.RefAttributes<HTMLInputElement>
- NumberFieldPrimitive: reexport; owner number-field; UNVERIFIED
- NumberFieldProps: type; owner number-field; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### NumberField
数值与编辑文本的原语上下文。
- value / defaultValue / onValueChange: number | null / number / (value, details) => void. null 表示空；受控值由调用方接受，details 支持 cancel()。
- min / max / step: number / number / number | 'any'; default step: 1. 范围约束直接编辑与表单校验，步进夹在范围内；step='any' 关闭步长校验，交互仍按 1 增减。显式 min 与 step 才始终启用步长提交校验。
- snapOnStep / smallStep / largeStep: boolean / number / number; default false / 0.1 / 10. 是否吸附与 Alt/Shift 步长是独立的显式选项。
- onValueCommitted: (value, details) => void. blur 或步进提交回调，只描述编辑结束，不代表已保存。
- name / form / required / disabled / readOnly: Base UI Root props. 原生表单与语义入口；只读继续参与提交，禁用不提交。
- locale / format: Intl.LocalesArgument / Intl.NumberFormatOptions. 显式数字格式；未指定精度时不因聚焦/失焦丢弃外部数值精度。

### NumberFieldGroup
输入与两个步进共享的边界；render/ref/样式与状态透传。

### NumberFieldInput
复用 Input 的原生出口，由数值原语注册一次 Field。
- render / ref / className / style / ARIA / events: Base UI Input props. 属于真实 input；render 状态保留数值、编辑文本等 NumberField 状态。

### NumberFieldDecrement / NumberFieldIncrement
减少/增加原语复用 quiet Button；内建名称来自 locale，按钮不提交表单。

### NumberFieldPrimitive
所用 Base UI NumberField 命名空间。

## Keyboard
- ArrowUp / ArrowDown: 按步长增减；不因直接编辑允许超范围而越过步进边界。
- Alt / Shift + 步进: 使用 smallStep / largeStep。
- Tab / Shift+Tab: 按文档顺序移动数值入口；步进按钮点击后保留输入焦点，键盘步进在输入上执行。只读仍可聚焦文本。

## Source examples
### 值与范围
Source: apps/docs/src/content/number-field/demos/01-values.tsx
```tsx
import { Field, FieldDescription, FieldError, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "值与范围", titleEn: "Values and bounds" } satisfies DemoMeta;
const parts = <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>;

export default function Demo() {
  return <FieldGroup className="grid w-full grid-cols-1 sm:grid-cols-2">
    <Field><FieldLabel>数量</FieldLabel><NumberField name="quantity" defaultValue={0} min={0} max={20}>{parts}</NumberField><FieldDescription>0–20，步长 1</FieldDescription></Field>
    <Field><FieldLabel>偏移</FieldLabel><NumberField name="offset" step={0.25}>{parts}</NumberField><FieldDescription>可为空，步长 0.25</FieldDescription></Field>
    <Field invalid><FieldLabel>宽度</FieldLabel><NumberField name="width" defaultValue={12} min={0} max={10}>{parts}</NumberField><FieldError>宽度需要在 0–10 之间。</FieldError></Field>
    <Field><FieldLabel>只读</FieldLabel><NumberField defaultValue={8} readOnly>{parts}</NumberField></Field>
    <Field disabled><FieldLabel>禁用</FieldLabel><NumberField defaultValue={8}>{parts}</NumberField></Field>
  </FieldGroup>;
}
```

### 密度
Source: apps/docs/src/content/number-field/demos/02-density.tsx
```tsx
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "密度", titleEn: "Density" } satisfies DemoMeta;

export default function Demo() {
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "并发上限" : "重试次数"}</FieldLabel>
            <NumberField defaultValue={3}>
              <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>
            </NumberField>
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
}
```
