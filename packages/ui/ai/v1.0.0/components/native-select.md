# 原生选择 NativeSelect

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/native-select
Source: packages/ui/src/components/native-select.tsx
Source SHA-256: de504f5d2c34fdeb5652b21e7958519351485f310f2c3ca0be61b00d078d2eb7

保留平台选择器、原生选项与表单值。

## Decision
原生 size 只表示列表显示行数，不再与呈现几何同名混用；单值形态的几何跟随密度轴，全库一套。multiple 保留多值表单数据和平台列表容量。

## Notes
- select 没有只读属性；不可改变的值由应用选择真实禁用或静态表达。
- FieldControl 的值协议为单字符串；multiple 不走该输入注册协议。

## Use and ownership
- 固定选项适合平台原生选择器。
- Avoid: 需要搜索、动态候选或命令菜单时仍用原生 select。
- Library: 输入角色、几何接线与原生选项语义。
- Application: 选项、值、禁用与错误事实。

## Composition
- 独立使用 Label；Field 中单值用 FieldControl render 组合。多值用显式原生名称关系。

## Responsive behavior
- 单值形态一套几何，跟随密度轴；窄屏外高 +4px，粗指针最小外高读 touch-target；多行不固定单行高度。

## Customization
- 保留平台箭头；className / style / render 属于真实 select。

## Current exports
- NativeSelect: function; owner native-select; PASS; props: NativeSelectProps
- NativeSelectProps: type; owner native-select; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### NativeSelect
真实 select，children 使用原生 option / optgroup。
- size / multiple / disabled / required / name: native select props. 原生显示行数、多值、禁用、约束与表单名。
- value / defaultValue / onChange: native select props. 保留受控与非受控；多值是字符串数组。
- render / ref / ARIA / className / style: useRender.ComponentProps<select>. 属性、事件与 ref 属于实际 select；render 应保留可选值的原生元素。

## Keyboard
- Tab / 方向键 / 平台选择键: 沿用所在平台的原生选择行为。

## Source examples
### 密度
Source: apps/docs/src/content/native-select/demos/01-density.tsx
```tsx
import { useId } from "react";
import { Field, FieldGroup, FieldLabel } from "@qingye/ui/components/field";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "密度", titleEn: "Density" };

// 原生 size 只表示列表显示行数；单值形态的几何跟随密度轴。
export default function Demo() {
  const id = useId();
  return (
    <FieldGroup className="grid w-full grid-cols-2 items-start gap-(--qy-field-group-gap)">
      {(["default", "compact"] as const).map((density) => (
        <div data-density={density} key={density}>
          <Field>
            <FieldLabel>{density === "compact" ? "紧凑" : "默认"}</FieldLabel>
            <NativeSelect id={`${id}-${density}`} defaultValue="one">
              <option value="one">按名称排序</option>
              <option value="two">按时间排序</option>
            </NativeSelect>
          </Field>
        </div>
      ))}
    </FieldGroup>
  );
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
  // 多选形态是原生列表；选项是真实的同步频率，不是甲乙丙。
  return <Stack gap="fields" className="w-full max-w-sm">
    <Stack gap="field"><Label htmlFor={`${id}-multiple`}>触发时机</Label><NativeSelect id={`${id}-multiple`} multiple size={4} defaultValue={["daily"]}><optgroup label="定期"><option value="hourly">每小时一次</option><option value="daily">每天一次</option><option value="weekly">每周一次</option></optgroup><optgroup label="手动"><option value="manual">只在手动触发时</option></optgroup></NativeSelect></Stack>
    <Stack gap="field"><Label htmlFor={`${id}-disabled`}>保留策略（不可更改）</Label><NativeSelect id={`${id}-disabled`} disabled><option value="daily">每天一次</option></NativeSelect></Stack>
  </Stack>;
}
```

### 字段错误
Source: apps/docs/src/content/native-select/demos/03-field.tsx
```tsx
import { Field, FieldControl, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { NativeSelect } from "@qingye/ui/components/native-select";

export const meta = { title: "字段错误", titleEn: "Field error" };
export default function Demo() {
  return <Field invalid className="w-full max-w-sm"><FieldLabel>同步频率</FieldLabel><FieldControl render={<NativeSelect><option value="">请选择</option><option value="daily">每天一次</option><option value="hourly">每小时一次</option></NativeSelect>} /><FieldError>请选择同步频率</FieldError></Field>;
}
```
