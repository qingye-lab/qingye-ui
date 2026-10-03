"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as React from "react";
import { cn } from "../utils";

export type SwitchSize = "xs" | "sm" | "md" | "lg" | "xl";
export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & { size?: SwitchSize };

/** 立即生效的设置；请求与持久化结果由应用持有，不从位置变化推断保存。 */
export function Switch({ size = "md", children, className, style, ...props }: SwitchProps) {
  const variables = {
    "--qy-switch-height": `var(--qy-text-control-${size}-leading)`,
    "--qy-switch-height-narrow": `calc(var(--qy-text-control-${size}-leading) + var(--qy-control-${size}-narrow) - var(--qy-control-${size}))`,
    "--qy-switch-inset": "calc(var(--qy-focus-quiet-width) + var(--qy-focus-ring-width))",
  } as React.CSSProperties;
  return <SwitchPrimitive.Root
    data-slot="switch" data-size={size} {...props}
    className={(state) => cn(
      "touch-target relative inline-flex shrink-0 items-center align-middle outline-none h-(--qy-switch-height-narrow) w-[calc(2*var(--qy-switch-height-narrow))] sm:h-(--qy-switch-height) sm:w-[calc(2*var(--qy-switch-height))] rounded-[min(var(--qy-radius-control),calc(var(--qy-switch-height-narrow)/4))] sm:rounded-[min(var(--qy-radius-control),calc(var(--qy-switch-height)/4))] px-(--qy-switch-inset) transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)]",
      state.checked ? "bg-primary text-primary-foreground focus-visible:ring-primary-foreground" : "bg-muted-foreground text-background focus-visible:ring-background",
      state.disabled && "cursor-not-allowed opacity-64",
      typeof className === "function" ? className(state) : className,
    )}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(state) : style) })}
  >{children ?? <SwitchPrimitive.Thumb data-slot="switch-thumb" className="pointer-events-none block size-[calc(var(--qy-switch-height-narrow)-2*var(--qy-switch-inset))] sm:size-[calc(var(--qy-switch-height)-2*var(--qy-switch-inset))] rounded-full bg-current transition-transform duration-(--qy-duration-fast) ease-(--qy-ease-out) data-checked:translate-x-(--qy-switch-height-narrow) sm:data-checked:translate-x-(--qy-switch-height) rtl:data-checked:-translate-x-(--qy-switch-height-narrow) sm:rtl:data-checked:-translate-x-(--qy-switch-height) motion-reduce:transition-none" />}</SwitchPrimitive.Root>;
}

export { SwitchPrimitive };
