"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type BadgeSize = "xs" | "sm" | "md" | "lg" | "xl";
export type BadgeProps = useRender.ComponentProps<"span"> & { size?: BadgeSize; variant?: "neutral" | "emphasis" };
const sizes = {
  xs: "text-control-xs-mobile sm:text-control-xs", sm: "text-control-sm-mobile sm:text-control-sm",
  md: "text-control-md-mobile sm:text-control-md", lg: "text-control-lg-mobile sm:text-control-lg", xl: "text-control-xl-mobile sm:text-control-xl",
};
/** 短标记不代替对象状态，也不自行宣告结果。 */
export function Badge({ size = "sm", variant = "neutral", className, render, ref, ...props }: BadgeProps) {
  return useRender({ defaultTagName: "span", render, ref, props: mergeProps({ "data-slot": "badge", "data-size": size, "data-variant": variant }, props, {
    className: cn("inline-flex min-w-0 max-w-full items-center rounded-marker px-(--qy-badge-padding-inline) py-(--qy-badge-padding-block) wrap-anywhere outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring", sizes[size], variant === "emphasis" ? "bg-primary text-primary-foreground focus-visible:ring-primary-foreground" : "bg-surface-subtle text-foreground", className),
  }) });
}
