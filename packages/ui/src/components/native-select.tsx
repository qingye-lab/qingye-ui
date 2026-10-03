"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type NativeSelectSize = "xs" | "sm" | "md" | "lg" | "xl";
export type NativeSelectProps = useRender.ComponentProps<"select"> & {
  /** 几何档独立于原生 size 的显示行数。 */
  controlSize?: NativeSelectSize;
};

const profiles: Record<NativeSelectSize, string> = {
  xs: "rounded-xs text-control-xs-mobile sm:text-control-xs px-(--qy-control-xs-padding-bordered)",
  sm: "rounded-sm text-control-sm-mobile sm:text-control-sm px-(--qy-control-sm-padding-bordered)",
  md: "rounded-control text-control-md-mobile sm:text-control-md px-(--qy-control-md-padding-bordered)",
  lg: "rounded-control text-control-lg-mobile sm:text-control-lg px-(--qy-control-lg-padding-bordered)",
  xl: "rounded-control text-control-xl-mobile sm:text-control-xl px-(--qy-control-xl-padding-bordered)",
};
const heights: Record<NativeSelectSize, string> = {
  xs: "min-h-(--qy-control-xs-narrow) sm:min-h-(--qy-control-xs)",
  sm: "min-h-(--qy-control-sm-narrow) sm:min-h-(--qy-control-sm)",
  md: "min-h-(--qy-control-md-narrow) sm:min-h-(--qy-control-md)",
  lg: "min-h-(--qy-control-lg-narrow) sm:min-h-(--qy-control-lg)",
  xl: "min-h-(--qy-control-xl-narrow) sm:min-h-(--qy-control-xl)",
};

/** 平台 select 保留选项、键盘、移动选择器与真实表单值。 */
export function NativeSelect({ controlSize = "md", className, render, ref, multiple, size, ...props }: NativeSelectProps) {
  const list = multiple || (size !== undefined && size > 1);
  return useRender({
    defaultTagName: "select", render, ref,
    props: mergeProps({ "data-slot": "native-select", "data-control-size": controlSize }, props, {
      multiple, size,
      className: cn(
        "box-border w-full min-w-0 max-w-full border border-input bg-card py-0 text-foreground outline-none transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:border-ring disabled:cursor-not-allowed disabled:opacity-64 not-disabled:not-focus-visible:not-aria-invalid:hover:border-border-strong aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground dark:bg-surface-inset",
        profiles[controlSize],
        !list && heights[controlSize],
        "pointer-coarse:min-h-(--qy-touch-target)",
        className,
      ),
    }),
  });
}
