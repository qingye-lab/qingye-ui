"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export type ItemProps = useRender.ComponentProps<"div">;
/** 一行一个对象（基础层 §19）：与表格的一行同一几何——上下各一个组内间隔，内容在行内居中。 */
export function Item({ render, className, ...props }: ItemProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "item", className: cn("flex min-h-(--qy-row-default) min-w-0 flex-wrap items-center gap-(--qy-field-gap) py-(--qy-field-gap) rounded-item text-body text-foreground outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className) }, props) });
}
export type ItemContentProps = useRender.ComponentProps<"div">;
export function ItemContent({ render, className, ...props }: ItemContentProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "item-content", className: cn("flex min-w-0 flex-1 flex-col gap-(--qy-field-gap) wrap-anywhere", className) }, props) });
}
export type ItemTitleProps = useRender.ComponentProps<"div">;
export function ItemTitle({ render, className, ...props }: ItemTitleProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "item-title", className: cn("min-w-0 text-body-strong wrap-anywhere", className) }, props) });
}
export type ItemDescriptionProps = useRender.ComponentProps<"p">;
export function ItemDescription({ render, className, ...props }: ItemDescriptionProps) {
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "item-description", className: cn("m-0 min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
export type ItemActionsProps = useRender.ComponentProps<"div"> & {
  /**
   * `always`（默认）：操作一直可见。`hover`：操作平时淡出，行悬停、行内有焦点、行内有打开的菜单或浮层时显现；
   * 没有悬停能力的设备上恒显示。隐藏只改不透明度，按钮始终在 Tab 顺序与可访问树里。
   * 一行的主要动作不要藏；触摸为主的界面不要用。
   */
  reveal?: "always" | "hover";
  /** 平时显示的内容，例如一个时间。`reveal="hover"` 时与操作叠在同一格，格宽取两者中较宽者，显隐切换时这一行不发生位移。 */
  resting?: React.ReactNode;
};
// 悬停显现的条件只在有悬停能力的设备上成立（`hover: none` 的设备恒显示，resting 与操作并排）。
// 以所在的 Item 为参照：没有 Item 祖先时选择器不匹配，操作不会被藏起来。
// 类名必须写成完整字面量（Tailwind 按源码字面扫描，拼接出来的类名不会生成）。
const idleHidden = "[@media(hover:hover)]:[[data-slot=item]:not(:hover):not(:focus-within):not(:has([aria-expanded=true]))_&]:pointer-events-none [@media(hover:hover)]:[[data-slot=item]:not(:hover):not(:focus-within):not(:has([aria-expanded=true]))_&]:opacity-0";
const engagedHidden = "[@media(hover:hover)]:[[data-slot=item]:is(:hover,:focus-within,:has([aria-expanded=true]))_&]:opacity-0";
// 反馈不改变布局（基础层 §11）：两层叠在一格里，只换不透明度。时长与曲线读已有角色。
const fade = "transition-opacity duration-(--qy-duration-fast) ease-(--qy-ease-out) [@media(hover:hover)]:[grid-area:1/1]";
export function ItemActions({ reveal = "always", resting, render, className, children, ...props }: ItemActionsProps) {
  const hover = reveal === "hover";
  const restingContent = resting == null || resting === false ? null
    : <span data-slot="item-resting" className={cn("min-w-0 whitespace-nowrap text-support text-muted-foreground", hover && [fade, "justify-self-end", engagedHidden])}>{resting}</span>;
  return useRender({ defaultTagName: "div", render, props: mergeProps({
    "data-slot": "item-actions", "data-reveal": reveal,
    className: cn("flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)", hover && "[@media(hover:hover)]:grid [@media(hover:hover)]:justify-items-end", className),
    children: hover
      ? <>{restingContent}<div data-slot="item-actions-group" className={cn("flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)", fade, idleHidden)}>{children}</div></>
      : <>{restingContent}{children}</>,
  }, props) });
}
export type ItemLinkProps = useRender.ComponentProps<"a">;
/** 条目的名称就是入口：一列条目由位置表明可进入，平时不加下划线，悬停才出现（与面包屑同理）。 */
export function ItemLink({ render, className, ...props }: ItemLinkProps) {
  return useRender({ defaultTagName: "a", render, props: mergeProps({ "data-slot": "item-link", className: cn("touch-target min-w-0 rounded-marker text-foreground underline-offset-[round(0.25em,1px)] outline-none hover:underline focus-visible:ring-inset focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring", className) }, props) });
}
