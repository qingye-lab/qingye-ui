# 滚动区域 ScrollArea

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/scroll-area
Source: packages/ui/src/components/scroll-area.tsx
Source SHA-256: 0519efa99f42cc71c986065481f58f1a5abd93f3f5f715f74cd8a51672caa22c

真实原生滚动，或显式组合可拖动滚动条。

## Notes
- 分工：默认用 ScrollArea（一个元素，原生滚动条，尊重平台设置）；只有设计要求自绘滚动条时才用 ScrollAreaRoot / ScrollAreaViewport / ScrollAreaContent / ScrollAreaScrollbar / ScrollAreaThumb / ScrollAreaCorner 组合。两者互不嵌套，ScrollArea 不接受 Scrollbar 子部件。
- ScrollArea 保持原有单一原生视口与 ref 契约；原生滚动条可见性尊重平台设置。
- 需要可控滚动条时用 Root > Viewport > Content，Scrollbar/Thumb 与 Viewport 并列；Viewport 继续保留原生滚轮、键盘与触摸滚动。
- 自定义轨道宽度为 3 分、内缩半分，是该组合的集中预设；滑块长度与移动范围共同由原语计算，不单独覆盖滑块最小长度。Content 默认为轨道留出末端空间。
- 尺寸由消费布局给出；内容需全量渲染时使用此组件，长集合可使用 VirtualList。

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
- ScrollAreaContent: function; owner scroll-area; PASS; props: ScrollAreaContentProps
- ScrollAreaContentProps: type; owner scroll-area; PASS
- ScrollAreaCorner: function; owner scroll-area; PASS; props: ScrollAreaCornerProps
- ScrollAreaCornerProps: type; owner scroll-area; PASS
- ScrollAreaPrimitive: reexport; owner scroll-area; UNVERIFIED
- ScrollAreaProps: type; owner scroll-area; PASS
- ScrollAreaRoot: function; owner scroll-area; PASS; props: ScrollAreaRootProps
- ScrollAreaRootProps: type; owner scroll-area; PASS
- ScrollAreaScrollbar: function; owner scroll-area; PASS; props: ScrollAreaScrollbarProps
- ScrollAreaScrollbarProps: type; owner scroll-area; PASS
- ScrollAreaThumb: function; owner scroll-area; PASS; props: ScrollAreaThumbProps
- ScrollAreaThumbProps: type; owner scroll-area; PASS
- ScrollAreaViewport: function; owner scroll-area; PASS; props: ScrollAreaViewportProps
- ScrollAreaViewportProps: type; owner scroll-area; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### ScrollArea
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### ScrollAreaContent
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ScrollAreaCorner
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ScrollAreaRoot
- no props declared by this library
- plus 279 inherited (@types/react 275, @base-ui/react 4); not expanded, see the installed declarations

### ScrollAreaScrollbar
- no props declared by this library
- plus 280 inherited (@types/react 275, @base-ui/react 5); not expanded, see the installed declarations

### ScrollAreaThumb
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

### ScrollAreaViewport
- no props declared by this library
- plus 278 inherited (@types/react 275, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale

## Curated API
Written descriptions; the list above is the type-resolved fact.

### ScrollArea
真实可滚动 div；原生滚动条尊重平台设置。
- children: ReactNode. 完整内容，不窗口化或隐藏集合项。
- style / className: div props. 消费布局给出 height/maxHeight 与宽度；默认 overflow:auto。
- tabIndex: number; default 内容溢出时为 0. 内容溢出时能从键盘到达，没有可滚动的内容就不进入 Tab 序列；原生方向/Page/Home/End 滚动保留。显式给出时以调用方为准。
- render / ref / ARIA / events: useRender.ComponentProps<'div'>. 真实视口的组合、名称、引用和原生滚动/键盘事件；有名称的独立区域可由调用方加 role=region。

### ScrollAreaRoot / ScrollAreaViewport / ScrollAreaContent
自定义滚动条的显式组合；Root 拥有布局与溢出事实，Viewport 才是真实滚动元素，Content 用于测量内容。
- render / ref / className / style / native props: ScrollAreaPrimitive part props. 各部位保留自身原语 props；滚动事件、scrollTop/scrollLeft 和聚焦均属于 Viewport，不能把旧视口 ref 直接接到 Root。

### ScrollAreaScrollbar
随实际溢出出现的可拖动轨道；未给 children 时内置真实 Thumb。
- orientation: vertical | horizontal; default vertical. 选择受控轴；双轴时组合两条轨道与 Corner。
- keepMounted: boolean; default false. 无溢出时仍保留 DOM，但隐藏轨道，不制造不存在的滚动范围。

### ScrollAreaThumb / ScrollAreaCorner / ScrollAreaPrimitive
滑块长度/位置和轨道拖动由公开原语测量；Corner 留出双轴交会处，完整原语继续可用。

## Keyboard
- Tab: 进入内容溢出的滚动视口，或内容内入口。
- 方向 / PageUp / PageDown / Home / End: 按浏览器原生规则滚动，嵌套控件保留自己的键位。

## Source examples
### 有限视口
Source: apps/docs/src/content/scroll-area/demos/01-vertical.tsx
```tsx
import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
export const meta = { title: "有限视口", titleEn: "Bounded viewport" };
export default function Demo() {
  return <ScrollArea aria-label="完整条目" role="region" style={{ maxHeight: "calc(var(--qy-control-md) * 5)" }}>{Array.from({ length: 20 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md-narrow) items-center px-(--qy-control-md-padding) text-body sm:min-h-(--qy-control-md)">条目 {index + 1}</div>)}</ScrollArea>;
}
```

### 水平内容
Source: apps/docs/src/content/scroll-area/demos/02-horizontal.tsx
```tsx
import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
export const meta = { title: "水平内容", titleEn: "Horizontal content" };
export default function Demo() {
  return <ScrollArea aria-label="完整字符序列" role="region"><pre className="w-max px-(--qy-control-md-padding) py-(--qy-field-gap) text-body">甲 乙 丙 丁 戊 己 庚 辛 壬 癸 · A B C D E F G H I J K L M N O P Q R S T U V W X Y Z</pre></ScrollArea>;
}
```

### 双轴滚动条
Source: apps/docs/src/content/scroll-area/demos/03-styled-scrollbars.tsx
```tsx
import { ScrollAreaContent, ScrollAreaCorner, ScrollAreaRoot, ScrollAreaScrollbar, ScrollAreaViewport } from "@qingye_lab/ui/components/scroll-area";

export const meta = { title: "双轴滚动条", titleEn: "Styled scrollbars on both axes" };
export default function Demo() {
  return <ScrollAreaRoot className="w-full max-w-sm" style={{ height: "calc(var(--qy-control-md) * 6)" }} data-testid="styled-scroll-area">
    <ScrollAreaViewport aria-label="双轴完整条目" role="region">
      <ScrollAreaContent><div style={{ minWidth: "calc(var(--qy-control-md) * 16)" }}>{Array.from({ length: 30 }, (_, index) => <div key={index} className="flex min-h-(--qy-control-md-narrow) items-center px-(--qy-control-md-padding) text-body sm:min-h-(--qy-control-md)">条目 {index + 1} · 这段内容保留完整宽度与原生文本选择。</div>)}</div></ScrollAreaContent>
    </ScrollAreaViewport>
    <ScrollAreaScrollbar keepMounted /><ScrollAreaScrollbar orientation="horizontal" keepMounted /><ScrollAreaCorner />
  </ScrollAreaRoot>;
}
```
