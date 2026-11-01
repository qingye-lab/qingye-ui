"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { useOverflowEdges, useScrollable, useScrollbarGutter, type OverflowEdges, type ScrollbarGutter } from "../hooks/use-scrollable";
import { cn } from "../utils";

export type ScrollAreaProps = useRender.ComponentProps<"div"> & {
  /**
   * 边缘渐隐：内容还有被切掉的一端渐隐，滚到头的一端不渐隐。横纵两向各自量、各自渐隐。
   * 做法与 TabsList 相同（遮罩、宽度基准、RTL 见 tabs.tsx 头注释）。占位的原生滚动条不随之变淡：渐隐止于滚动条之前，滚动条所在条带整条不透明。
   */
  fade?: boolean;
};

/*
 * 渐隐宽度读 --qy-fill-height，与 TabsList 同一个预设（理由见 tabs.tsx：与一行同尺度、随密度变）；
 * 滚动区没有统一条目，取一个填值控件行高，是预设，不是推导。
 * 四端各一个宽度变量，没有被切掉的端为 0，该端渐变退化为不透明。
 * 遮罩四层：竖向滚动条条带、横向滚动条条带、竖向渐变、横向渐变。两个渐变只铺在滚动条之外的区域，
 * 以 intersect 叠成一张（任一方向透明处整体透明）；两条条带以 add 并上去，滚动条本身始终完整可见。
 * 条带宽度由 useScrollbarGutter 量出（--qy-scrollbar-y / -x），覆盖式滚动条为 0。mask 只取透明度，不引入颜色。
 * 横向的物理方向随 rtl 翻转（起始端在右）；竖向无需翻转。
 * scroll-padding 取同一个宽度，使键盘把焦点移到被切掉的内容时，浏览器把它滚进渐隐之内，焦点环不被遮。
 * 渐隐只在有端点被切掉时才挂遮罩，不溢出的区域不付出遮罩的合成代价。
 */
const fadeClassName = [
  "[--qy-scroll-fade:var(--qy-fill-height)] [--qy-scroll-fade-x-start:0px] [--qy-scroll-fade-x-end:0px] [--qy-scroll-fade-y-start:0px] [--qy-scroll-fade-y-end:0px]",
  "data-overflow-x-start:[--qy-scroll-fade-x-start:var(--qy-scroll-fade)] data-overflow-x-end:[--qy-scroll-fade-x-end:var(--qy-scroll-fade)]",
  "data-overflow-y-start:[--qy-scroll-fade-y-start:var(--qy-scroll-fade)] data-overflow-y-end:[--qy-scroll-fade-y-end:var(--qy-scroll-fade)]",
  "scroll-p-(--qy-scroll-fade)",
  "[&[data-overflow-x-start],&[data-overflow-x-end],&[data-overflow-y-start],&[data-overflow-y-end]]:[mask-composite:add,add,intersect] [&[data-overflow-x-start],&[data-overflow-x-end],&[data-overflow-y-start],&[data-overflow-y-end]]:[-webkit-mask-composite:source-over,source-over,source-in] [&[data-overflow-x-start],&[data-overflow-x-end],&[data-overflow-y-start],&[data-overflow-y-end]]:[mask-repeat:no-repeat]",
  "[&[data-overflow-x-start],&[data-overflow-x-end],&[data-overflow-y-start],&[data-overflow-y-end]]:[mask-size:var(--qy-scrollbar-y)_100%,100%_var(--qy-scrollbar-x),calc(100%-var(--qy-scrollbar-y))_calc(100%-var(--qy-scrollbar-x)),calc(100%-var(--qy-scrollbar-y))_calc(100%-var(--qy-scrollbar-x))]",
  "[&[data-overflow-x-start],&[data-overflow-x-end],&[data-overflow-y-start],&[data-overflow-y-end]]:[mask-position:right_top,left_bottom,left_top,left_top] rtl:[&[data-overflow-x-start],&[data-overflow-x-end],&[data-overflow-y-start],&[data-overflow-y-end]]:[mask-position:left_top,left_bottom,right_top,right_top]",
  "[&[data-overflow-x-start],&[data-overflow-x-end],&[data-overflow-y-start],&[data-overflow-y-end]]:[mask-image:linear-gradient(currentcolor,currentcolor),linear-gradient(currentcolor,currentcolor),linear-gradient(to_bottom,transparent_0,currentcolor_var(--qy-scroll-fade-y-start),currentcolor_calc(100%-var(--qy-scroll-fade-y-end)),transparent_100%),linear-gradient(to_right,transparent_0,currentcolor_var(--qy-scroll-fade-x-start),currentcolor_calc(100%-var(--qy-scroll-fade-x-end)),transparent_100%)]",
  "rtl:[&[data-overflow-x-start],&[data-overflow-x-end],&[data-overflow-y-start],&[data-overflow-y-end]]:[mask-image:linear-gradient(currentcolor,currentcolor),linear-gradient(currentcolor,currentcolor),linear-gradient(to_bottom,transparent_0,currentcolor_var(--qy-scroll-fade-y-start),currentcolor_calc(100%-var(--qy-scroll-fade-y-end)),transparent_100%),linear-gradient(to_left,transparent_0,currentcolor_var(--qy-scroll-fade-x-start),currentcolor_calc(100%-var(--qy-scroll-fade-x-end)),transparent_100%)]",
].join(" ");

/**
 * Real native scrolling; scrollbar visibility follows the user's platform settings.
 * 键盘要能滚动它，所以内容溢出时可聚焦（tabIndex 0，须由调用方给出可访问名称）；不溢出就不进入 Tab 序列。
 * 调用方显式给出 tabIndex 时以调用方为准。
 * `fade` 开启时才挂测量两端的观察器；不开的区域与原来一样，只量是否溢出。
 */
export function ScrollArea({ fade = false, ...props }: ScrollAreaProps) {
  return fade ? <FadingScrollArea {...props} /> : <PlainScrollArea {...props} />;
}

function PlainScrollArea({ ref, ...props }: Omit<ScrollAreaProps, "fade">) {
  const [scrollRef, scrollable] = useScrollable<HTMLElement>(ref as React.Ref<HTMLElement> | undefined);
  return <ScrollAreaView {...props} ref={scrollRef} scrollable={scrollable} />;
}

function FadingScrollArea({ ref, ...props }: Omit<ScrollAreaProps, "fade">) {
  const [verticalRef, vertical] = useOverflowEdges<HTMLElement>(ref as React.Ref<HTMLElement> | undefined, "y");
  const [horizontalRef, horizontal] = useOverflowEdges<HTMLElement>(verticalRef);
  const [gutterRef, gutter] = useScrollbarGutter<HTMLElement>(horizontalRef);
  const [scrollRef, scrollable] = useScrollable<HTMLElement>(gutterRef);
  return <ScrollAreaView {...props} ref={scrollRef} scrollable={scrollable} edges={{ x: horizontal, y: vertical }} gutter={gutter} />;
}

type ScrollAreaViewProps = Omit<ScrollAreaProps, "fade" | "ref"> & {
  ref: React.RefCallback<HTMLElement>;
  scrollable: boolean;
  edges?: { x: OverflowEdges; y: OverflowEdges };
  gutter?: ScrollbarGutter;
};
function ScrollAreaView({ render, ref, className, tabIndex, scrollable, edges, gutter, ...props }: ScrollAreaViewProps) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({
    "data-slot": "scroll-area", ...(tabIndex !== undefined ? { tabIndex } : scrollable ? { tabIndex: 0 } : {}),
    ...(edges ? {
      "data-overflow-x-start": edges.x.start ? "" : undefined, "data-overflow-x-end": edges.x.end ? "" : undefined,
      "data-overflow-y-start": edges.y.start ? "" : undefined, "data-overflow-y-end": edges.y.end ? "" : undefined,
    } : {}),
    ...(gutter ? { style: { "--qy-scrollbar-y": `${gutter.y}px`, "--qy-scrollbar-x": `${gutter.x}px` } as React.CSSProperties } : {}),
    className: cn("min-w-0 max-w-full overflow-auto outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring", edges && fadeClassName),
  }, props, { className: cn(className) }) });
}

/** Styled scrollbars are opt-in; ScrollArea itself retains its native viewport/ref contract. */
export type ScrollAreaRootProps = ScrollAreaPrimitive.Root.Props;
export function ScrollAreaRoot({ className, ...props }: ScrollAreaRootProps) {
  return <ScrollAreaPrimitive.Root data-slot="scroll-area-root" {...props} className={state => cn("relative min-h-0 min-w-0 overflow-hidden", typeof className === "function" ? className(state) : className)} />;
}

export type ScrollAreaViewportProps = ScrollAreaPrimitive.Viewport.Props;
export function ScrollAreaViewport({ className, ...props }: ScrollAreaViewportProps) {
  return <ScrollAreaPrimitive.Viewport data-slot="scroll-area-viewport" {...props} className={state => cn("h-full w-full min-w-0 overscroll-contain outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring", typeof className === "function" ? className(state) : className)} />;
}

export type ScrollAreaContentProps = ScrollAreaPrimitive.Content.Props;
export function ScrollAreaContent({ className, ...props }: ScrollAreaContentProps) {
  return <ScrollAreaPrimitive.Content data-slot="scroll-area-content" {...props} className={state => cn("min-w-full pe-[calc(3*var(--qy-fen))] pb-[calc(3*var(--qy-fen))]", typeof className === "function" ? className(state) : className)} />;
}

export type ScrollAreaScrollbarProps = ScrollAreaPrimitive.Scrollbar.Props;
export function ScrollAreaScrollbar({ className, children, orientation = "vertical", ...props }: ScrollAreaScrollbarProps) {
  return <ScrollAreaPrimitive.Scrollbar data-slot="scroll-area-scrollbar" {...props} orientation={orientation} className={state => cn(
    // 轨道 3 分、两侧各半分留白是此组合的预设；滑块长度和位移须共同由原语测量。
    "z-1 flex touch-none select-none p-[calc(var(--qy-fen)/2)]",
    !(orientation === "vertical" ? state.hasOverflowY : state.hasOverflowX) && "invisible pointer-events-none",
    orientation === "vertical" ? "inset-y-0 end-0 w-[calc(3*var(--qy-fen))]" : "inset-x-0 bottom-0 h-[calc(3*var(--qy-fen))]",
    typeof className === "function" ? className(state) : className,
  )}>{children ?? <ScrollAreaThumb />}</ScrollAreaPrimitive.Scrollbar>;
}

export type ScrollAreaThumbProps = ScrollAreaPrimitive.Thumb.Props;
export function ScrollAreaThumb({ className, ...props }: ScrollAreaThumbProps) {
  return <ScrollAreaPrimitive.Thumb data-slot="scroll-area-thumb" {...props} className={state => cn(
    "relative rounded-(--qy-radius-track) bg-muted-foreground hover:bg-foreground data-scrolling:bg-foreground",
    state.orientation === "vertical" ? "w-full" : "h-full",
    typeof className === "function" ? className(state) : className,
  )} />;
}

export type ScrollAreaCornerProps = ScrollAreaPrimitive.Corner.Props;
export function ScrollAreaCorner({ className, ...props }: ScrollAreaCornerProps) {
  return <ScrollAreaPrimitive.Corner data-slot="scroll-area-corner" {...props} className={state => cn("absolute end-0 bottom-0 size-[calc(3*var(--qy-fen))]", typeof className === "function" ? className(state) : className)} />;
}

export { ScrollAreaPrimitive };
