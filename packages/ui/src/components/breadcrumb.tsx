"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type BreadcrumbProps = useRender.ComponentProps<"nav">;
export function Breadcrumb({ render, className, ...props }: BreadcrumbProps) {
  const { messages } = useUILocale();
  return useRender({ defaultTagName: "nav", render, props: mergeProps({ "data-slot": "breadcrumb", "aria-label": messages.breadcrumb, className: cn("min-w-0 text-body", className) }, props) });
}
export type BreadcrumbListProps = useRender.ComponentProps<"ol">;
export function BreadcrumbList({ render, className, ...props }: BreadcrumbListProps) {
  return useRender({ defaultTagName: "ol", render, props: mergeProps({ "data-slot": "breadcrumb-list", className: cn("m-0 flex min-w-0 list-none flex-wrap items-center gap-(--qy-action-gap) p-0", className) }, props) });
}
export type BreadcrumbItemProps = useRender.ComponentProps<"li">;
export function BreadcrumbItem({ render, className, ...props }: BreadcrumbItemProps) {
  return useRender({ defaultTagName: "li", render, props: mergeProps({ "data-slot": "breadcrumb-item", className: cn("flex min-w-0 items-center gap-(--qy-action-gap) wrap-anywhere", className) }, props) });
}
export type BreadcrumbLinkProps = useRender.ComponentProps<"a">;
export function BreadcrumbLink({ render, className, ...props }: BreadcrumbLinkProps) {
  return useRender({ defaultTagName: "a", render, props: mergeProps({ "data-slot": "breadcrumb-link", className: cn("touch-target min-w-0 rounded-item text-foreground underline underline-offset-2 outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className) }, props) });
}
export type BreadcrumbCurrentProps = useRender.ComponentProps<"span">;
export function BreadcrumbCurrent({ render, className, ...props }: BreadcrumbCurrentProps) {
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "breadcrumb-current", "aria-current": "page", className: cn("min-w-0 text-body-strong text-foreground", className) }, props) });
}
export type BreadcrumbSeparatorProps = useRender.ComponentProps<"span">;
export function BreadcrumbSeparator({ render, className, children = "/", ...props }: BreadcrumbSeparatorProps) {
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "breadcrumb-separator", "aria-hidden": true, children, className: cn("shrink-0 text-muted-foreground", className) }, props) });
}
