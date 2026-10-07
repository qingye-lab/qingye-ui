"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
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
export type ItemActionsProps = useRender.ComponentProps<"div">;
export function ItemActions({ render, className, ...props }: ItemActionsProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "item-actions", className: cn("flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)", className) }, props) });
}
export type ItemLinkProps = useRender.ComponentProps<"a">;
/** 条目的名称就是入口：一列条目由位置表明可进入，平时不加下划线，悬停才出现（与面包屑同理）。 */
export function ItemLink({ render, className, ...props }: ItemLinkProps) {
  return useRender({ defaultTagName: "a", render, props: mergeProps({ "data-slot": "item-link", className: cn("touch-target min-w-0 rounded-marker text-foreground underline-offset-[round(0.25em,1px)] outline-none hover:underline focus-visible:ring-inset focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring", className) }, props) });
}
