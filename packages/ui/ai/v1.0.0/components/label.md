# 标签 Label

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/label
Source: packages/ui/src/components/label.tsx
Source SHA-256: 2b221cc2db3bc0b20d3fe8b168a04d26a003697fa3a3cb7ea29eb0a4622d6e6a

用原生标签为一个控件命名。

## Decision
Field 内使用 FieldLabel。通用 Label 用 htmlFor 或原生嵌套关联一个控件，不能用 Placeholder 替代。

## Notes
- Label 不拥有禁用状态；被命名控件使用自己的真实 disabled。

## Use and ownership
- 原生控件需要持续可读的名称。
- Avoid: 用通用 Label 替代 Field 内的注册标签。
- Library: 原生标签关联与 text-label 角色。
- Application: 名称、控件 id 与状态。

## Composition
- 用 htmlFor 指向 Input 或 NativeSelect 的实际 id。

## Responsive behavior
- 长名称允许换行。

## Customization
- className、style 与 render 属于标签。

## Current exports
- Label: function; owner label; PASS; props: LabelProps
- LabelProps: type; owner label; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Label
默认原生 label。
- htmlFor: string. 实际控件的 id。
- render / ref / 原生属性: useRender.ComponentProps<label>. 保留标签语义、事件、ref 与原生属性。替换标签元素后需显式维护命名关系。

## Keyboard

## Source examples
### 名称关联
Source: apps/docs/src/content/label/demos/01-association.tsx
```tsx
import { useId } from "react";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "名称关联", titleEn: "Label association" };
export default function Demo() {
  const id = useId();
  return <Stack gap="field" className="w-full max-w-sm"><Label htmlFor={id}>名称</Label><Input id={id} /></Stack>;
}
```

### 禁用控件
Source: apps/docs/src/content/label/demos/02-disabled.tsx
```tsx
import { useId } from "react";
import { Input } from "@qingye_lab/ui/components/input";
import { Label } from "@qingye_lab/ui/components/label";
import { Stack } from "@qingye_lab/ui/components/layout";

export const meta = { title: "禁用控件", titleEn: "Disabled control" };
export default function Demo() {
  const id = useId();
  return <Stack gap="field" className="w-full max-w-sm"><Label htmlFor={id}>名称</Label><Input id={id} disabled /></Stack>;
}
```
