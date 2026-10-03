# 滚动区域 ScrollArea

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/scroll-area
Source: packages/ui/src/components/scroll-area.tsx
Source SHA-256: b135ec600d8b8d2d1094c18a68cedba1d2c8d0a290356342a0526602d7daef00

在有限视口内保留真实原生滚动。

## Notes
- 原生滚动条可见性由操作系统/浏览器/用户设置决定，组件不强制覆盖自动隐藏。
- 尺寸由消费布局给出；内容需全量渲染时使用此组件，等高长集合可使用 VirtualList。

## Use and ownership
- 有限工作区内的完整内容
- Avoid: 隐藏必要滚动入口或吞掉文本编辑键位
- Library: 默认键盘可达与盒内焦点
- Application: 视口尺寸与内容

## Composition
- 有限视口 + 原生滚动内容

## Responsive behavior
- 窄容器保留必要内容与可达操作；布局改变时保留对象、输入和焦点。

## Customization
- style/className 为消费布局入口，无新增尺寸角色

## Current exports
- ScrollArea: function; owner scroll-area; PASS; props: ScrollAreaProps
- ScrollAreaProps: type; owner scroll-area; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, clsx, tailwind-merge
- Optional peers: none recorded
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### ScrollArea
真实可滚动 div；原生滚动条尊重平台设置。
- children: ReactNode. 完整内容，不窗口化或隐藏集合项。
- style / className: div props. 消费布局给出 height/maxHeight 与宽度；默认 overflow:auto。
- tabIndex: number; default 0. 默认能从键盘到达；原生方向/Page/Home/End 滚动保留。
- render / ref / ARIA / events: useRender.ComponentProps<'div'>. 真实视口的组合、名称、引用和原生滚动/键盘事件；有名称的独立区域可由调用方加 role=region。

## Keyboard
- Tab: 进入真实滚动视口或内容内入口。
- 方向 / PageUp / PageDown / Home / End: 按浏览器原生规则滚动，嵌套控件保留自己的键位。

## Source examples
### 有限视口
Source: apps/docs/src/content/scroll-area/demos/01-vertical.tsx
```tsx
import { ScrollArea } from "@qingye/ui/components/scroll-area";
export const meta = { title: "有限视口", titleEn: "Bounded viewport" };
export default function Demo() {
  return <ScrollArea aria-label="完整条目" role="region" style={{ maxHeight: "calc(var(--qy-control-md) * 5)" }}>{Array.from({ length: 20 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md-narrow) items-center px-(--qy-control-md-padding) text-body sm:min-h-(--qy-control-md)">条目 {index + 1}</div>)}</ScrollArea>;
}
```

### 水平内容
Source: apps/docs/src/content/scroll-area/demos/02-horizontal.tsx
```tsx
import { ScrollArea } from "@qingye/ui/components/scroll-area";
export const meta = { title: "水平内容", titleEn: "Horizontal content" };
export default function Demo() {
  return <ScrollArea aria-label="完整字符序列" role="region"><pre className="w-max px-(--qy-control-md-padding) py-(--qy-field-gap) text-body">甲 乙 丙 丁 戊 己 庚 辛 壬 癸 · A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</pre></ScrollArea>;
}
```
