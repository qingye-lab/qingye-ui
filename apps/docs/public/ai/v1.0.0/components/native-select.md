# 原生选择 NativeSelect

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/native-select
Source: packages/ui/src/components/native-select.tsx
Source SHA-256: 915ed7d464eb89f1235d52e6c9d5c146f2f39ccc53fb9639876963c7a5dfbcfa

保留平台选择器、原生选项与表单值。

## Decision
controlSize 决定五档文字与外高，原生 size 决定列表显示行数。multiple 保留多值表单数据和平台列表容量。

## Notes
- select 没有只读属性；不可改变的值由应用选择真实禁用或静态表达。
- FieldControl 的值协议为单字符串；multiple 不走该输入注册协议。

## Use and ownership
- 固定选项适合平台原生选择器。
- Avoid: 需要搜索、动态候选或命令菜单时仍用原生 select。
- Library: 输入角色和五档接线，原生选项语义。
- Application: 选项、值、禁用与错误事实。

## Composition
- 独立使用 Label；Field 中单值用 FieldControl render 组合。多值用显式原生名称关系。

## Responsive behavior
- 五档同名文字；窄屏外高 +4px，粗指针最小外高读 touch-target；多行不固定单行高度。

## Customization
- 保留平台箭头；className / style / render 属于真实 select。

## Current exports
- NativeSelect: function; owner native-select; PASS; props: NativeSelectProps
- NativeSelectProps: type; owner native-select; PASS
- NativeSelectSize: type; owner native-select; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### NativeSelect
真实 select，children 使用原生 option / optgroup。
- controlSize: "xs" | "sm" | "md" | "lg" | "xl"; default "md". 几何与同名文字档，不占用原生 size。具体值是基础层预设。
- size / multiple / disabled / required / name: native select props. 原生显示行数、多值、禁用、约束与表单名。
- value / defaultValue / onChange: native select props. 保留受控与非受控；多值是字符串数组。
- render / ref / ARIA / className / style: useRender.ComponentProps<select>. 属性、事件与 ref 属于实际 select；render 应保留可选值的原生元素。

## Keyboard
- Tab / 方向键 / 平台选择键: 沿用所在平台的原生选择行为。

## Source examples
### 尺寸
Source: apps/docs/src/content/native-select/demos/01-sizes.tsx
```tsx
import { useId } from "react";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "尺寸", titleEn: "Sizes" };
export default function Demo() {
  const id = useId();
  return <Stack gap="fields" className="w-full max-w-sm">{(["xs", "sm", "md", "lg", "xl"] as const).map(size => <Stack key={size} gap="field"><Label htmlFor={`${id}-${size}`}>{size}</Label><NativeSelect id={`${id}-${size}`} controlSize={size}><option value="one">选项一</option><option value="two">选项二</option></NativeSelect></Stack>)}</Stack>;
}
```

### 多选与禁用
Source: apps/docs/src/content/native-select/demos/02-list-and-disabled.tsx
```tsx
import { useId } from "react";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "多选与禁用", titleEn: "Multiple and disabled" };
export default function Demo() {
  const id = useId();
  return <Stack gap="fields" className="w-full max-w-sm"><Stack gap="field"><Label htmlFor={`${id}-multiple`}>多选</Label><NativeSelect id={`${id}-multiple`} multiple size={4} defaultValue={["one"]}><optgroup label="选项"><option value="one">一</option><option value="two">二</option><option value="three">三</option></optgroup></NativeSelect></Stack><Stack gap="field"><Label htmlFor={`${id}-disabled`}>禁用</Label><NativeSelect id={`${id}-disabled`} disabled><option value="one">选项一</option></NativeSelect></Stack></Stack>;
}
```

### 字段错误
Source: apps/docs/src/content/native-select/demos/03-field.tsx
```tsx
import { Field, FieldControl, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "字段错误", titleEn: "Field error" };
export default function Demo() {
  return <Field invalid className="w-full max-w-sm"><FieldLabel>选项</FieldLabel><FieldControl render={<NativeSelect><option value="">请选择</option><option value="one">选项一</option><option value="two">选项二</option></NativeSelect>} /><FieldError>请选择一个选项</FieldError></Field>;
}
```
