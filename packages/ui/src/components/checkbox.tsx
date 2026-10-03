"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import * as React from "react";
import { cn } from "../utils";

export type CheckboxSize = "xs" | "sm" | "md" | "lg" | "xl";
export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root> & { size?: CheckboxSize };

/** 部分选中是调用方给定的集合事实；原语保留 mixed、键盘与表单语义。 */
export function Checkbox({ size = "md", children, className, style, ...props }: CheckboxProps) {
  const variables = {
    "--qy-checkbox-edge": `var(--qy-text-control-${size}-leading)`,
    "--qy-checkbox-edge-narrow": `calc(var(--qy-text-control-${size}-leading) + var(--qy-control-${size}-narrow) - var(--qy-control-${size}))`,
  } as React.CSSProperties;
  return <CheckboxPrimitive.Root
    data-slot="checkbox" data-size={size} {...props}
    className={(state) => cn(
      "touch-target inline-flex shrink-0 items-center justify-center align-middle outline-none size-(--qy-checkbox-edge-narrow) sm:size-(--qy-checkbox-edge) rounded-[min(var(--qy-radius-marker),calc(var(--qy-checkbox-edge-narrow)/4))] sm:rounded-[min(var(--qy-radius-marker),calc(var(--qy-checkbox-edge)/4))] border transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
      state.checked || state.indeterminate
        ? "border-transparent bg-primary text-primary-foreground focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-primary-foreground"
        : "border-input bg-card text-foreground dark:bg-surface-inset focus-visible:border-ring not-data-disabled:not-data-readonly:not-focus-visible:not-aria-invalid:hover:border-border-strong aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground",
      state.disabled && "cursor-not-allowed opacity-64",
      state.readOnly && "data-readonly:border-dashed",
      typeof className === "function" ? className(state) : className,
    )}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(state) : style) })}
  >{children ?? <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="pointer-events-none flex size-full items-center justify-center"
    render={(indicatorProps, state) => <span {...indicatorProps}>{state.indeterminate
      ? <MinusIcon aria-hidden="true" className="size-3/4" />
      : <CheckIcon aria-hidden="true" className="size-3/4" />}</span>}
  />}</CheckboxPrimitive.Root>;
}

export { CheckboxPrimitive };
