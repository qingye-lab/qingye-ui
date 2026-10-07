"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { CheckIcon, MinusIcon } from "lucide-react";
import * as React from "react";
import { cn } from "../utils";

export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;

/** 部分选中是调用方给定的集合事实；原语保留 mixed、键盘与表单语义。 */
/** 标记只有一种几何，跟随相邻标签的文字档（用户裁决 2026-10-05）：
 * 「标记与标签同高」说的是标记和它旁边那行字的关系，不是控件自己选档位。
 * 因此不提供 size；标签文字变它才变，密度与容器高度都不改它。 */
export function Checkbox({ children, className, style, ...props }: CheckboxProps) {
  const variables = {
    "--qy-checkbox-edge": "var(--qy-marker-size)",
    "--qy-checkbox-edge-narrow": "var(--qy-marker-size-narrow)",
  } as React.CSSProperties;
  return <CheckboxPrimitive.Root
    data-slot="checkbox" {...props}
    className={(state) => cn(
      "touch-target inline-flex shrink-0 items-center justify-center align-top my-(--qy-marker-inset-narrow) sm:my-(--qy-marker-inset) outline-none size-(--qy-checkbox-edge-narrow) sm:size-(--qy-checkbox-edge) rounded-[min(var(--qy-radius-marker),calc(var(--qy-checkbox-edge-narrow)/4))] sm:rounded-[min(var(--qy-radius-marker),calc(var(--qy-checkbox-edge)/4))] border transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out)",
      state.checked || state.indeterminate
        ? "border-transparent bg-primary text-primary-foreground focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-primary-foreground"
        : "border-input bg-card text-foreground dark:bg-surface-inset focus-visible:border-ring not-data-disabled:not-data-readonly:not-focus-visible:not-aria-invalid:hover:border-border-strong aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground",
      state.disabled && "cursor-not-allowed opacity-64",
      state.readOnly && !(state.checked || state.indeterminate) && "border-border bg-surface-inset",
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
