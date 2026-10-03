# NativeSelect

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/native-select
Source: packages/ui/src/components/native-select.tsx
Source SHA-256: 915ed7d464eb89f1235d52e6c9d5c146f2f39ccc53fb9639876963c7a5dfbcfa

Keep the platform picker, native options and form values.

## Decision
controlSize selects the five text and height profiles; native size specifies visible list rows. multiple keeps multi-value form data and platform list capacity.

## Notes
- select has no read-only attribute; use actual disabled state or static output when a value cannot change.
- FieldControl uses a single-string value protocol; multiple does not use that input registration protocol.

## Use and ownership
- Fixed options suit the platform's native picker.
- Avoid: Using native select when search, dynamic candidates, or command menus are required.
- Library: Input roles, five profiles, and native option semantics.
- Application: Options, values, disabled facts, and errors.

## Composition
- Use Label independently; compose a single value through FieldControl render within Field. Multiple values use an explicit native naming relationship.

## Responsive behavior
- Five matching text profiles; narrow height adds 4px, coarse pointers read touch-target, and multiple rows are not fixed to a single-line height.

## Customization
- Retain the platform arrow; className/style/render belong to the actual select.

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
A real select with native option and optgroup children.
- controlSize: "xs" | "sm" | "md" | "lg" | "xl"; default "md". Height and matching text profile, separate from native size. Values are foundation presets.
- size / multiple / disabled / required / name: native select props. Native rows, multiple values, disabled state, constraints and form name.
- value / defaultValue / onChange: native select props. Controlled and uncontrolled values; multiple values use string arrays.
- render / ref / ARIA / className / style: useRender.ComponentProps<select>. Props, events and ref reach the actual select; render must preserve a native value-selecting element.

## Keyboard
- Tab / Arrow keys / Platform picker keys: Uses native selection behavior on the current platform.

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
