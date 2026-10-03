"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type ItemProps = useRender.ComponentProps<"div">;
export function Item({ render, className, ...props }: ItemProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "item", className: cn("flex min-h-(--qy-row-default) min-w-0 flex-wrap items-start gap-(--qy-panel-gap) rounded-item text-body text-foreground outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className) }, props) });
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
export function ItemLink({ render, className, ...props }: ItemLinkProps) {
  return useRender({ defaultTagName: "a", render, props: mergeProps({ "data-slot": "item-link", className: cn("touch-target min-w-0 rounded-item text-foreground underline underline-offset-2 outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className) }, props) });
}
