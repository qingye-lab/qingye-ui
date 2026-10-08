# Separator

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/separator
Source: packages/ui/src/components/separator.tsx
Source SHA-256: c4d87fe0a3c5c89e644fe64b96c3fd897e89a0df3ed9c60c480ac2ce6007999e

Express a boundary between content groups as a semantic separator or decorative line.

## Decision
Omit a line when headings and spacing already express the relation. Separator has no drag, button, or panel-resizing behavior.

## Notes
- Decorative lines carry no assistive-technology semantics. Use a control with resize behavior when dragging must change dimensions.
- Necessary non-text boundaries need at least 3:1 contrast against the real carrier. Images and unknown carriers need separate checks.

## Use and ownership
- Two content groups need a discernible boundary.
- Avoid: Lines between every pair of rows or static boundaries impersonating drag entries.
- Library: Base UI separator primitive, orientation, and decorative choice.
- Application: Boundary placement and whether assistive technology needs it.

## Composition
- Headings explain scope; text FieldSeparator uses decorative lines to avoid repeated semantics.

## Responsive behavior
- The long axis follows its container; vertical lines stretch with actual row layout.

## Customization
- Strong boundary color and 1px lines are presets. External classes merge last; render/native props forward.

## Current exports
- Separator: function; owner separator; PASS; props: SeparatorProps
- SeparatorPrimitive: reexport; owner separator; UNVERIFIED
- SeparatorProps: type; owner separator; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### Separator
Based on Base UI Separator; role=separator by default.
- orientation: "horizontal" | "vertical"; default "horizontal". Horizontal spans the container; vertical stretches in a flex row.
- decorative: boolean; default false. When true, uses role=presentation and aria-hidden=true.
- className / style / render / ref: Base UI Separator props. Applied to the separator; styles support orientation state functions.

### SeparatorPrimitive
Base UI primitive outlet.

## Keyboard
- None: A static separator does not enter the tab order.

## Source examples
### 水平分界
Source: apps/docs/src/content/separator/demos/01-horizontal.tsx
```tsx
import { Separator } from "@qingye_lab/ui/components/separator";
export const meta = { title: "水平分界", titleEn: "Horizontal separator" };
export default function Demo() {
  return <div className="flex w-full max-w-xs flex-col gap-(--qy-field-group-gap) text-body"><section><h3 className="text-heading">文字</h3><p>青野 Qingye UI</p></section><Separator /><section><h3 className="text-heading">数字</h3><p className="numeric">0123456789</p></section></div>;
}
```

### 行内分界
Source: apps/docs/src/content/separator/demos/02-vertical.tsx
```tsx
import { Separator } from "@qingye_lab/ui/components/separator";
export const meta = { title: "行内分界", titleEn: "Inline boundary" };
export default function Demo() {
  return <nav aria-label="项目资料" className="flex items-center gap-(--qy-field-gap) text-body"><a href="/design.md">设计指南</a><Separator orientation="vertical" /><a href="https://github.com/qingye-lab/qingye-ui">仓库</a></nav>;
}
```

### 装饰线
Source: apps/docs/src/content/separator/demos/03-decorative.tsx
```tsx
import { Separator } from "@qingye_lab/ui/components/separator";
export const meta = { title: "装饰线", titleEn: "Decorative line" };
export default function Demo() {
  return <div className="flex w-full max-w-xs flex-col gap-(--qy-field-gap)"><h3 className="text-heading">青野 Qingye UI</h3><Separator decorative /><p className="text-body">React 组件库</p></div>;
}
```
