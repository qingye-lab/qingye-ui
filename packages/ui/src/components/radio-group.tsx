"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import * as React from "react";
import { cn } from "../utils";

export type RadioGroupProps<Value = unknown> = RadioGroupPrimitive.Props<Value>;
export type RadioSize = "xs" | "sm" | "md" | "lg" | "xl";
export type RadioProps<Value = unknown> = RadioPrimitive.Root.Props<Value> & {
  size?: RadioSize;
};

/** 少量同时可见的互斥候选；不给初值即保持未选择。 */
export function RadioGroup<Value>({ className, ...props }: RadioGroupProps<Value>) {
  return <RadioGroupPrimitive
    data-slot="radio-group" {...props}
    className={(state) => cn("flex min-w-0 flex-col gap-(--qy-field-gap)", typeof className === "function" ? className(state) : className)}
  />;
}

/** 圆形是单选身份；外圈始终有边框，焦点只改变这条边框的颜色。 */
export function Radio<Value>({ size = "md", className, style, children, render = <button type="button" />, nativeButton = true, ...props }: RadioProps<Value>) {
  const variables = {
    "--qy-radio-edge": `var(--qy-text-control-${size}-leading)`,
    "--qy-radio-edge-narrow": `calc(var(--qy-text-control-${size}-leading) + var(--qy-control-${size}-narrow) - var(--qy-control-${size}))`,
  } as React.CSSProperties;
  return <RadioPrimitive.Root
    data-slot="radio-group-item" data-size={size} {...props} render={render} nativeButton={nativeButton}
    className={(state) => cn(
      "touch-target inline-flex shrink-0 items-center justify-center align-middle size-(--qy-radio-edge-narrow) sm:size-(--qy-radio-edge) rounded-full border border-input bg-card text-primary outline-none dark:bg-surface-inset transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:border-ring aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground not-data-disabled:not-data-readonly:not-focus-visible:not-aria-invalid:hover:border-border-strong",
      state.disabled && "cursor-not-allowed opacity-64",
      state.readOnly && "border-dashed",
      typeof className === "function" ? className(state) : className,
    )}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(state) : style) })}
  >{children ?? <RadioPrimitive.Indicator data-slot="radio-group-indicator" className="pointer-events-none size-1/2 rounded-full bg-primary" />}</RadioPrimitive.Root>;
}

export { RadioGroupPrimitive, RadioPrimitive };
