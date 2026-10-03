"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Heading, type HeadingProps } from "./typography";
import { cn } from "../utils";

export type EmptyState = "empty" | "unknown" | "not-applicable";
export type EmptyProps = useRender.ComponentProps<"div"> & { state: EmptyState };
export function Empty({ state, render, className, ...props }: EmptyProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "empty", "data-state": state, className: cn("flex min-w-0 flex-col items-start gap-(--qy-panel-gap) text-body", className) }, props) });
}
export type EmptyTitleProps = HeadingProps;
export function EmptyTitle(props: EmptyTitleProps) { return <Heading data-slot="empty-title" {...props} />; }
export type EmptyDescriptionProps = useRender.ComponentProps<"p">;
export function EmptyDescription({ render, className, ...props }: EmptyDescriptionProps) {
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "empty-description", className: cn("m-0 min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
export type EmptyActionsProps = useRender.ComponentProps<"div">;
export function EmptyActions({ render, className, ...props }: EmptyActionsProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "empty-actions", className: cn("flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)", className) }, props) });
}
