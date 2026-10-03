# 分隔线 Separator

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/separator
Source: packages/ui/src/components/separator.tsx
Source SHA-256: 050cdccb70cb4d1d342f31fb6721107b46497f2ad1baaf444270cc082555a103

在已有内容组之间表达分界，可选择语义分隔或装饰线。

## Decision
标题与间距足够表达关系时不加线。Separator 没有拖动、按钮或面板调整行为。

## Notes
- 装饰线不承担辅助技术语义。需要拖动改变尺寸时使用具有调整行为的控件。
- 必要非文本边界与真实承载面的对比至少 3:1；图片与未知承载面另行验证。

## Use and ownership
- 两组内容确需可辨认分界。
- Avoid: 每两行画线；把静态分界当拖动入口。
- Library: Base UI 分隔原语、方向、装饰选择。
- Application: 分界位置与辅助技术是否需要感知。

## Composition
- 标题说明内容范围；有文字的 FieldSeparator 使用装饰线避免重复语义。

## Responsive behavior
- 长轴跟随容器；竖线依实际行布局拉伸。

## Customization
- 强边界颜色与 1px 线条为表达预设；className 最后合并，render 与原生属性透传。

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
基于 Base UI Separator；默认 role=separator。
- orientation: "horizontal" | "vertical"; default "horizontal". 横向跨容器；纵向在 flex 行里拉伸。
- decorative: boolean; default false. true 时 role=presentation 且 aria-hidden=true。
- className / style / render / ref: Base UI Separator props. 作用于分界本身；样式支持方向状态函数。

### SeparatorPrimitive
Base UI 原语出口。

## Keyboard
- 无: 静态分隔不进入键盘焦点顺序。

## Source examples
### 水平分界
Source: apps/docs/src/content/separator/demos/01-horizontal.tsx
```tsx
import { Separator } from "@qingye/ui/components/separator";
export const meta = { title: "水平分界", titleEn: "Horizontal separator" };
export default function Demo() {
  return <div className="flex w-full max-w-xs flex-col gap-(--qy-field-group-gap) text-body"><section><h3 className="text-heading">文字</h3><p>青野 Qingye UI</p></section><Separator /><section><h3 className="text-heading">数字</h3><p className="numeric">0123456789</p></section></div>;
}
```

### 行内分界
Source: apps/docs/src/content/separator/demos/02-vertical.tsx
```tsx
import { Separator } from "@qingye/ui/components/separator";
export const meta = { title: "行内分界", titleEn: "Inline boundary" };
export default function Demo() {
  return <nav aria-label="项目资料" className="flex items-center gap-(--qy-field-gap) text-body"><a href="/design.md">设计指南</a><Separator orientation="vertical" /><a href="https://github.com/qingye-lab/qingye-ui">仓库</a></nav>;
}
```

### 装饰线
Source: apps/docs/src/content/separator/demos/03-decorative.tsx
```tsx
import { Separator } from "@qingye/ui/components/separator";
export const meta = { title: "装饰线", titleEn: "Decorative line" };
export default function Demo() {
  return <div className="flex w-full max-w-xs flex-col gap-(--qy-field-gap)"><h3 className="text-heading">青野 Qingye UI</h3><Separator decorative /><p className="text-body">React 组件库</p></div>;
}
```
