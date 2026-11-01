"use client";

import { Checkbox as CheckboxPrimitive } from "@base-ui/react/checkbox";
import { IconCheck, IconMinus } from "@tabler/icons-react";
import * as React from "react";
import { markerBoxGeometry, markerOffClassName, markerOnClassName, markerVariables } from "../marker-geometry";
import { cn } from "../utils";

export type CheckboxProps = React.ComponentProps<typeof CheckboxPrimitive.Root>;

/** 部分选中是调用方给定的集合事实；原语保留 mixed、键盘与表单语义。 */
/** 已声明无效（aria-invalid）在两种状态下都要看得见：未选中时边线改危险色；选中时边线是透明的、
 * 填充就是整个标记，所以改用 Button solid danger 的同一对 token（destructive-fill / destructive-on-fill，
 * 焦点内线取 on-fill），不另造一种「选中又无效」的色。无效是调用方声明的事实，选中不应把它盖掉。
 * 标记只有一种几何，跟随相邻标签的文字档（用户裁决 2026-10-05）：
 * 「标记与标签同高」说的是标记和它旁边那行字的关系，不是控件自己选档位。
 * 因此不提供 size；标签文字变它才变，密度与容器高度都不改它。 */
export function Checkbox({ children, className, style, ...props }: CheckboxProps) {
  return <CheckboxPrimitive.Root
    data-slot="checkbox" {...props}
    className={(state) => cn(
      markerBoxGeometry, "touch-target align-top my-(--qy-marker-inset-narrow) sm:my-(--qy-marker-inset) outline-none",
      state.checked || state.indeterminate
        ? cn(markerOnClassName, "focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-primary-foreground aria-invalid:bg-destructive-fill aria-invalid:text-destructive-on-fill aria-invalid:focus-visible:ring-destructive-on-fill")
        : cn(markerOffClassName, "text-foreground focus-visible:border-ring not-data-disabled:not-data-readonly:not-focus-visible:not-aria-invalid:hover:border-border-strong aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground"),
      state.disabled && "cursor-not-allowed opacity-disabled",
      state.readOnly && !(state.checked || state.indeterminate) && "border-border bg-surface-inset",
      typeof className === "function" ? className(state) : className,
    )}
    style={(state) => ({ ...markerVariables, ...(typeof style === "function" ? style(state) : style) })}
  >{children ?? <CheckboxPrimitive.Indicator data-slot="checkbox-indicator" className="qy-checkbox-indicator pointer-events-none flex size-full items-center justify-center"
    render={(indicatorProps, state) => <span {...indicatorProps}>{state.indeterminate
      ? <IconMinus aria-hidden="true" className="size-3/4" />
      : <IconCheck aria-hidden="true" className="size-3/4" />}</span>}
  />}</CheckboxPrimitive.Root>;
}

export { CheckboxPrimitive };
