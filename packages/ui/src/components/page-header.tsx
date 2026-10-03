"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { Heading, type HeadingProps } from "./typography";
import { cn } from "../utils";

export type PageHeaderProps = useRender.ComponentProps<"header">;
export function PageHeader({ render, className, ...props }: PageHeaderProps) {
  return useRender({ defaultTagName: "header", render, props: mergeProps({ "data-slot": "page-header", className: cn("flex min-w-0 flex-wrap items-start justify-between gap-(--qy-panel-gap) text-body", className) }, props) });
}
export type PageHeaderContentProps = useRender.ComponentProps<"div">;
export function PageHeaderContent({ render, className, ...props }: PageHeaderContentProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "page-header-content", className: cn("flex min-w-0 flex-1 flex-col gap-(--qy-field-gap) wrap-anywhere", className) }, props) });
}
export type PageHeaderTitleProps = HeadingProps;
export function PageHeaderTitle(props: PageHeaderTitleProps) { return <Heading level={1} step="chapter" data-slot="page-header-title" {...props} />; }
export type PageHeaderDescriptionProps = useRender.ComponentProps<"p">;
export function PageHeaderDescription({ render, className, ...props }: PageHeaderDescriptionProps) {
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "page-header-description", className: cn("m-0 min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
export type PageHeaderActionsProps = useRender.ComponentProps<"div">;
export function PageHeaderActions({ render, className, ...props }: PageHeaderActionsProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "page-header-actions", className: cn("flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)", className) }, props) });
}
