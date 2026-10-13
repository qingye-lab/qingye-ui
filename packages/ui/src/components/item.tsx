"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export type ItemProps = useRender.ComponentProps<"div">;
/*
 * 整行就是一个入口（Item 自己渲染为 a[href] 或 button）时的行反馈。普通的 div / li 不是入口，不带反馈；
 * 由元素自身的选择器决定，不设属性——是不是入口是元素的事实，不是外观选项。
 * - 悬停读悬停面（--qy-accent，即 --qy-surface-hover），按下读按下面（--qy-surface-active），与 quiet Button、SidebarLink 同一梯
 *   （基础层 §11）；过渡读已有的时长与曲线角色。禁用（button:disabled、aria-disabled）时不出现。
 * - 有了面就要有内缘，否则面贴着字；但一列只有一条左缘，没有形的入口以文字对齐（§19）。所以向两侧各让出一个留白、再补回同样的内缘：
 *   文字仍落在列缘上，悬停面向外伸出——与 TableHead 里的排序按钮、SectionActions 行尾的小号 quiet 按钮同一规则。
 *   留白取 --qy-control-sm-padding：同是 rounded-item 的行入口，与 SidebarLink 的内缘一致。承载它的容器两侧要留得出这一段，否则面被裁掉。
 * - button 默认按内容取宽、文字居中：补成整行宽（含两侧伸出的留白），文字从行首起。
 * 类名写成完整字面量（Tailwind 按源码字面扫描）。
 */
const rowEntry = "[&:is(a[href],button)]:-mx-(--qy-control-sm-padding) [&:is(a[href],button)]:px-(--qy-control-sm-padding) [button&]:w-[calc(100%+2*var(--qy-control-sm-padding))] [button&]:text-start";
const rowFeedback = "[&:is(a[href],button)]:transition-colors [&:is(a[href],button)]:duration-(--qy-duration-fast) [&:is(a[href],button)]:ease-(--qy-ease-out) [&:is(a[href],button:enabled)]:not-aria-disabled:cursor-pointer [&:is(a[href],button:enabled)]:not-aria-disabled:hover:bg-accent [&:is(a[href],button:enabled)]:not-aria-disabled:active:bg-(--qy-surface-active)";
/**
 * 一行一个对象（基础层 §19）：与表格的一行同一几何——上下各一个组内间隔，内容在行内居中。
 * 整行只通向一个去处、行内没有别的交互元素时，把 Item 自己渲染成链接（`render={<a href />}`）：整行可点，有悬停与按下反馈。
 * 行内另有操作时不能这样做（链接里不能再放按钮）：名称用 ItemLink，操作放 ItemActions。
 */
export function Item({ render, className, ...props }: ItemProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "item", className: cn("flex min-h-(--qy-row-default) min-w-0 flex-wrap items-center gap-(--qy-field-gap) py-(--qy-field-gap) rounded-item text-body text-foreground outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", rowEntry, rowFeedback, className) }, props) });
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
/**
 * 条目的名称就是入口：一列条目由位置表明可进入，平时不加下划线，悬停才出现（与面包屑同理）。
 * 用在行内另有操作的条目上：名称是 ItemLink，操作放在 ItemActions，二者是兄弟。
 * 整行只通向一个去处、没有别的交互元素时不用它，改把 Item 自己渲染成链接（`<Item render={<a href />}>`），整行可点并带行反馈。
 */
export function ItemLink({ render, className, ...props }: ItemLinkProps) {
  return useRender({ defaultTagName: "a", render, props: mergeProps({ "data-slot": "item-link", className: cn("touch-target min-w-0 rounded-marker text-foreground underline-offset-(--qy-underline-offset) outline-none hover:underline focus-visible:ring-inset focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring", className) }, props) });
}
