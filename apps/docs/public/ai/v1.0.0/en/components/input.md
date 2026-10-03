# Input

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/input
Source: packages/ui/src/components/input.tsx
Source SHA-256: 5c4c1e1a52bdf42332b150a7ac805f98fc8468a37c336c537d80ea1879fb24ab

Enter one text value. Search, password visibility, and clearing use the same input.

## Decision
Input holds the entered value; the caller handles search results and submission. A placeholder does not replace a persistent visible name.

## Notes
- aria-invalid comes from application or browser validation. Value validity and delivery are separate facts.
- Provide FieldLabel, a native label, or aria-label. A placeholder is a hint rather than a name.
- Replace SearchInput / PasswordInput with Input type="search" / type="password". Express loading and shortcuts through explicit state or InputGroup composition. Replace size="default" with "md" and outer className with controlClassName.
- type="file" retains browser behavior and language. The caller owns file lists and business validation.

## Use and ownership
- Enter one text value with a matching native type; composition owns search results and submission.
- Avoid: Placeholders replacing names; timeouts treated as invalid; unknown converted to empty or zero; drafts cleared after validation failure.
- Library: Native input, Field associations, focus, clearing, and password visibility.
- Application: Value meaning, validation facts, candidate scope, unknown/not-applicable values, and delivery outcomes.

## Composition
- Keep FieldLabel, FieldDescription, and FieldError together; InputGroup supplies extra units, markers, and actions.

## Responsive behavior
- xs/sm/md/lg/xl use foundation profiles; narrow heights add 4px and coarse-pointer editing areas are at least 44px.

## Customization
- className, style, render, and refs belong to the actual input; controlClassName belongs to its editing boundary.

## Current exports
- Input: function; owner input; PASS; props: InputProps
- InputPrimitive: reexport; owner input; UNVERIFIED
- InputProps: type; owner input; PASS
- InputSize: type; owner input; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Input
A real border identifies the editable area. Base UI Input retains Field registration and native attributes.
- type: React.HTMLInputTypeAttribute; default "text". search adds a search marker and clearing; password adds visibility. Neither supplies a field name or placeholder.
- size: "xs" | "sm" | "md" | "lg" | "xl" | number; default "md". Geometry and control text profile for the location. A number retains native size semantics.
- value / defaultValue / onValueChange: Native value / initial value / (value, details) => void. Controlled and uncontrolled values; onChange is also forwarded. Clearing follows the same native change path.
- clearable / clearLabel / onClear: boolean / string / () => void; default type === search. Clear a nonempty editable value and return focus to the input. Hidden when disabled or read only.
- visibilityToggle: boolean; default type === password. Optional password adjunct that preserves the value and does not submit a form.
- visible / defaultVisible / onVisibleChange: boolean / boolean / (visible) => void; default defaultVisible: false. Controlled or uncontrolled password visibility.
- showLabel: string. Stable toggle name from the locale by default. aria-pressed reports visibility.
- readOnly: boolean; default false. Retains focus, copying, and form submission while blocking edits and clearing. Shows a read-only marker.
- className / style / render / ref: Base UI Input props. Applied to the real input. className/style support state functions.
- controlClassName: string. Styles the shared editable boundary, including its width and placement.
- unstyled: boolean; default false. Lets a public composition such as InputGroup supply the boundary while retaining inner geometry and native state.
- nativeInput: boolean; default false. Native outlet for an input already registered by FieldControl or another primitive. Retains render, refs, and events without double registration.

## Keyboard
- Tab / Shift+Tab: Move between the input and available adjuncts. Disabled actions leave the tab order.
- Escape: Clear an eligible nonempty value; a later Escape reaches the parent. Composition and caller cancellation preserve the draft.
- Enter / Space: Activate a focused adjunct immediately without submitting the form.

## Source examples
### 设备名称
Source: apps/docs/src/content/input/demos/01-default.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "设备名称", titleEn: "Device name" };

export default function Demo() {
  return <Field className="w-full max-w-xs"><FieldLabel>设备名称</FieldLabel><Input name="device-name" defaultValue="3 号楼东侧摄像头" /></Field>;
}
```

### 位置档案
Source: apps/docs/src/content/input/demos/02-sizes.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "位置档案", titleEn: "Size profiles" };

export default function Demo() {
  return <div className="grid w-full max-w-sm gap-(--qy-field-group-gap)">{(["xs", "sm", "md", "lg", "xl"] as const).map((size) => <Field key={size}><FieldLabel>{size}</FieldLabel><Input size={size} defaultValue="青野 · Qingye" /></Field>)}</div>;
}
```

### 字段状态
Source: apps/docs/src/content/input/demos/03-states.tsx
```tsx
import { Field, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "字段状态", titleEn: "Field states" };

export default function Demo() {
  return <div className="grid w-full max-w-xs gap-(--qy-field-group-gap)"><Field invalid><FieldLabel>邮箱</FieldLabel><Input defaultValue="li.na@" type="email" /><FieldError>邮箱地址不完整。</FieldError></Field><Field><FieldLabel>工号</FieldLabel><Input defaultValue="QY-20481" readOnly /></Field><Field disabled><FieldLabel>所属部门</FieldLabel><Input defaultValue="运维中心" /></Field></div>;
}
```

### 文件选择
Source: apps/docs/src/content/input/demos/04-file.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "文件选择", titleEn: "File selection" };

export default function Demo() {
  return <Field className="w-full max-w-md"><FieldLabel>文件</FieldLabel><Input accept="image/*,.pdf" name="file" type="file" /><FieldDescription>图片或 PDF。</FieldDescription></Field>;
}
```

### 字数提示
Source: apps/docs/src/content/input/demos/05-character-count.tsx
```tsx
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = { title: "字数提示", titleEn: "Character limit" };

export default function Demo() {
  const max = 20;
  const [value, setValue] = useState("杭州滨江仓");
  return (
    <Field className="w-full max-w-xs">
      <FieldLabel>仓库简称</FieldLabel>
      <Input maxLength={max} onValueChange={setValue} value={value} />
      <FieldDescription aria-live="polite" className="numeric">
        还可输入 {max - value.length} 个字
      </FieldDescription>
    </Field>
  );
}
```

### 搜索与清空
Source: apps/docs/src/content/input/demos/06-search.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";

export const meta = { title: "搜索与清空", titleEn: "Search and clearing" };

export default function Demo() {
  return <Field className="w-full max-w-sm"><FieldLabel>搜索</FieldLabel><Input type="search" defaultValue="青野" /></Field>;
}
```

### 密码
Source: apps/docs/src/content/input/demos/07-password.tsx
```tsx
import { Field, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { useState } from "react";

export const meta = { title: "密码", titleEn: "Password" };

export default function Demo() {
  const [visible, setVisible] = useState(false);
  return <Field className="w-full max-w-sm"><FieldLabel>新密码</FieldLabel><Input type="password" autoComplete="new-password" defaultValue="qingye-2026" visible={visible} onVisibleChange={setVisible} /></Field>;
}
```
