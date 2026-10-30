"use client";

import * as React from "react";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ScrollArea as ScrollAreaPrimitive } from "@base-ui/react/scroll-area";
import { useScrollable } from "../hooks/use-scrollable";
import { cn } from "../utils";

export type ScrollAreaProps = useRender.ComponentProps<"div">;

/**
 * Real native scrolling; scrollbar visibility follows the user's platform settings.
 * 键盘要能滚动它，所以内容溢出时可聚焦（tabIndex 0，须由调用方给出可访问名称）；不溢出就不进入 Tab 序列。
 * 调用方显式给出 tabIndex 时以调用方为准。
 */
export function ScrollArea({ render, ref, className, tabIndex, ...props }: ScrollAreaProps) {
  const [scrollRef, scrollable] = useScrollable<HTMLElement>(ref as React.Ref<HTMLElement> | undefined);
  return useRender({ defaultTagName: "div", render, ref: scrollRef, props: mergeProps({
    "data-slot": "scroll-area", ...(tabIndex !== undefined ? { tabIndex } : scrollable ? { tabIndex: 0 } : {}),
    className: "min-w-0 max-w-full overflow-auto outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring",
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
