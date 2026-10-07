"use client";

import { Radio as RadioPrimitive } from "@base-ui/react/radio";
import { RadioGroup as RadioGroupPrimitive } from "@base-ui/react/radio-group";
import * as React from "react";
import { cn } from "../utils";

export type RadioGroupProps<Value = unknown> = RadioGroupPrimitive.Props<Value>;
export type RadioProps<Value = unknown> = RadioPrimitive.Root.Props<Value>;

/** 少量同时可见的互斥候选；不给初值即保持未选择。 */
export function RadioGroup<Value>({ className, ...props }: RadioGroupProps<Value>) {
  return <RadioGroupPrimitive
    data-slot="radio-group" {...props}
    className={(state) => cn("flex min-w-0 flex-col gap-(--qy-field-gap)", typeof className === "function" ? className(state) : className)}
  />;
}

/** 圆形是单选身份；外圈始终有边框，焦点只改变这条边框的颜色。 */
/** 标记只有一种几何，跟随相邻标签的文字档（用户裁决 2026-10-05）：
 * 「标记与标签同高」说的是标记和它旁边那行字的关系，不是控件自己选档位。
 * 因此不提供 size；标签文字变它才变，密度与容器高度都不改它。 */
export function Radio<Value>({ className, style, children, render = <button type="button" />, nativeButton = true, ...props }: RadioProps<Value>) {
  const variables = {
    "--qy-radio-edge": "var(--qy-marker-size)",
    "--qy-radio-edge-narrow": "var(--qy-marker-size-narrow)",
  } as React.CSSProperties;
  return <RadioPrimitive.Root
    data-slot="radio-group-item" {...props} render={render} nativeButton={nativeButton}
    className={(state) => cn(
      "touch-target inline-flex shrink-0 items-center justify-center align-top my-(--qy-marker-inset-narrow) sm:my-(--qy-marker-inset) size-(--qy-radio-edge-narrow) sm:size-(--qy-radio-edge) rounded-full border border-input bg-card text-primary outline-none dark:bg-surface-inset transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:border-ring aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground not-data-disabled:not-data-readonly:not-focus-visible:not-aria-invalid:hover:border-border-strong",
      state.disabled && "cursor-not-allowed opacity-64",
      state.readOnly && "border-border bg-surface-inset",
      typeof className === "function" ? className(state) : className,
    )}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(state) : style) })}
  >{children ?? <RadioPrimitive.Indicator data-slot="radio-group-indicator" className="pointer-events-none size-[calc(var(--qy-radio-edge-narrow)/2-2px)] rounded-full bg-primary sm:size-[calc(var(--qy-radio-edge)/2-2px)]" />}</RadioPrimitive.Root>;
}

export { RadioGroupPrimitive, RadioPrimitive };
