"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { IconChevronRight } from "@tabler/icons-react";

export type BreadcrumbProps = useRender.ComponentProps<"nav">;
/**
 * 面包屑是一条路径（基础层 §6、§7）：成排的上级由位置表明可去，平时是浓墨、不加下划线，
 * 悬停才加深并出现下划线；当前页是焦墨。分隔是一枚重墨的小箭头，只作装饰，对读屏隐藏。
 */
export function Breadcrumb({ render, className, ...props }: BreadcrumbProps) {
  const { messages } = useUILocale();
  return useRender({ defaultTagName: "nav", render, props: mergeProps({ "data-slot": "breadcrumb", "aria-label": messages.breadcrumb, className: cn("min-w-0 text-body", className) }, props) });
}
export type BreadcrumbListProps = useRender.ComponentProps<"ol">;
export function BreadcrumbList({ render, className, ...props }: BreadcrumbListProps) {
  return useRender({ defaultTagName: "ol", render, props: mergeProps({ "data-slot": "breadcrumb-list", className: cn("m-0 flex min-w-0 list-none flex-wrap items-center gap-(--qy-control-content-gap) p-0", className) }, props) });
}
export type BreadcrumbItemProps = useRender.ComponentProps<"li">;
export function BreadcrumbItem({ render, className, ...props }: BreadcrumbItemProps) {
  return useRender({ defaultTagName: "li", render, props: mergeProps({ "data-slot": "breadcrumb-item", className: cn("flex min-w-0 items-center gap-(--qy-control-content-gap) wrap-anywhere", className) }, props) });
}
export type BreadcrumbLinkProps = useRender.ComponentProps<"a">;
export function BreadcrumbLink({ render, className, ...props }: BreadcrumbLinkProps) {
  return useRender({ defaultTagName: "a", render, props: mergeProps({ "data-slot": "breadcrumb-link", className: cn("touch-target min-w-0 rounded-marker text-muted-foreground underline-offset-[round(0.25em,1px)] outline-none transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) hover:text-foreground hover:underline focus-visible:text-foreground focus-visible:ring-inset focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring", className) }, props) });
}
export type BreadcrumbCurrentProps = useRender.ComponentProps<"span">;
export function BreadcrumbCurrent({ render, className, ...props }: BreadcrumbCurrentProps) {
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "breadcrumb-current", "aria-current": "page", className: cn("min-w-0 text-foreground", className) }, props) });
}
export type BreadcrumbSeparatorProps = useRender.ComponentProps<"span">;
export function BreadcrumbSeparator({ render, className, children = <IconChevronRight className="size-(--qy-control-sm-icon)" />, ...props }: BreadcrumbSeparatorProps) {
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "breadcrumb-separator", "aria-hidden": true, children, className: cn("inline-flex shrink-0 text-input", className) }, props) });
}
