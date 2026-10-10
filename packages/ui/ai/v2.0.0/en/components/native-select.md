# NativeSelect

Package: @qingye_lab/ui@2.0.0
Import: @qingye_lab/ui/components/native-select
Source: packages/ui/src/components/native-select.tsx
Source SHA-256: b96a77f4cb67f667c5d1510c085a96c06681bfb2fd12a7cb509910f1a417ea04

Keep the platform picker, native options and form values.

## Decision
Native size names visible list rows only and no longer doubles as a geometry profile; the single-value form follows the density axis with one geometry library-wide. multiple keeps multi-value form data and platform list capacity.

## Notes
- select has no read-only attribute; use actual disabled state or static output when a value cannot change.
- FieldControl uses a single-string value protocol; multiple does not use that input registration protocol.

## Use and ownership
- Fixed options suit the platform's native picker.
- Avoid: Using native select when search, dynamic candidates, or command menus are required.
- Library: Input roles, geometry wiring, and native option semantics.
- Application: Options, values, disabled facts, and errors.

## Composition
- Use Label independently; compose a single value through FieldControl render within Field. Multiple values use an explicit native naming relationship.

## Responsive behavior
- One geometry for the single-value form, following the density axis; narrow height adds 4px, coarse pointers read touch-target, and multiple rows are not fixed to a single-line height.

## Customization
- Retain the platform arrow; className/style/render belong to the actual select.

## Current exports
- NativeSelect: function; owner native-select; PASS; props: NativeSelectProps
- NativeSelectProps: type; owner native-select; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### NativeSelect
A real select with native option and optgroup children.
- size / multiple / disabled / required / name: native select props. Native rows, multiple values, disabled state, constraints and form name.
- value / defaultValue / onChange: native select props. Controlled and uncontrolled values; multiple values use string arrays.
- render / ref / ARIA / className / style: useRender.ComponentProps<select>. Props, events and ref reach the actual select; render must preserve a native value-selecting element.

## Keyboard
- Tab / Arrow keys / Platform picker keys: Uses native selection behavior on the current platform.

## Source examples
### 密度
Source: apps/docs/src/content/native-select/demos/01-density.tsx
```tsx
import { useId } from "react";
import { Field, FieldGroup, FieldLabel } from "@qingye_lab/ui/components/field";
import { NativeSelect } from "@qingye_lab/ui/components/native-select";

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
import { Label } from "@qingye_lab/ui/components/label";
import { Stack } from "@qingye_lab/ui/components/layout";
import { NativeSelect } from "@qingye_lab/ui/components/native-select";

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
import { Field, FieldControl, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { NativeSelect } from "@qingye_lab/ui/components/native-select";

export const meta = { title: "字段错误", titleEn: "Field error" };
export default function Demo() {
  return <Field invalid className="w-full max-w-sm"><FieldLabel>同步频率</FieldLabel><FieldControl render={<NativeSelect><option value="">请选择</option><option value="daily">每天一次</option><option value="hourly">每小时一次</option></NativeSelect>} /><FieldError>请选择同步频率</FieldError></Field>;
}
```
