# Label

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/label
Source: packages/ui/src/components/label.tsx
Source SHA-256: 2b221cc2db3bc0b20d3fe8b168a04d26a003697fa3a3cb7ea29eb0a4622d6e6a

Name one control with a native label.

## Decision
Use FieldLabel inside Field. A standalone Label associates one control through htmlFor or native nesting; a placeholder cannot replace it.

## Notes
- Label owns no disabled state; the named control uses its real disabled attribute.

## Use and ownership
- A native control needs a persistent readable name.
- Avoid: Replacing Field's registered label with a general Label.
- Library: Native label association and the text-label role.
- Application: Names, control ids, and state.

## Composition
- htmlFor points to the actual id of Input or NativeSelect.

## Responsive behavior
- Long names can wrap.

## Customization
- className, style, and render belong to the label.

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
A native label by default.
- htmlFor: string. The actual control id.
- render / ref / native props: useRender.ComponentProps<label>. Preserves semantics, events, ref and native attributes. An alternate tag must provide an explicit naming relationship.

## Keyboard

## Source examples
### 名称关联
Source: apps/docs/src/content/label/demos/01-association.tsx
```tsx
import { useId } from "react";
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";

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
import { Input } from "@qingye/ui/components/input";
import { Label } from "@qingye/ui/components/label";
import { Stack } from "@qingye/ui/components/layout";

export const meta = { title: "禁用控件", titleEn: "Disabled control" };
export default function Demo() {
  const id = useId();
  return <Stack gap="field" className="w-full max-w-sm"><Label htmlFor={id}>名称</Label><Input id={id} disabled /></Stack>;
}
```
