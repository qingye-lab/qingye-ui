"use client";

import { Toolbar as ToolbarPrimitive } from "@base-ui/react/toolbar";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { cn } from "../utils";

export type ToolbarProps = React.ComponentProps<typeof ToolbarPrimitive.Root>;
export function Toolbar({ className, ...props }: ToolbarProps) {
  return <ToolbarPrimitive.Root data-slot="toolbar" {...props} className={(state) => cn("flex min-w-0 gap-(--qy-panel-gap)", state.orientation === "horizontal" ? "flex-wrap items-center" : "flex-col items-start", typeof className === "function" ? className(state) : className)} />;
}
export type ToolbarGroupProps = React.ComponentProps<typeof ToolbarPrimitive.Group>;
export function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  return <ToolbarPrimitive.Group data-slot="toolbar-group" {...props} className={(state) => cn("flex min-w-0 gap-(--qy-action-gap)", state.orientation === "horizontal" ? "flex-wrap items-center" : "flex-col items-start", typeof className === "function" ? className(state) : className)} />;
}
export type ToolbarButtonProps = React.ComponentProps<typeof ToolbarPrimitive.Button> & { size?: ButtonProps["size"]; variant?: ButtonProps["variant"] };
export function ToolbarButton({ size = "md", variant = "quiet", render, ...props }: ToolbarButtonProps) {
  return <ToolbarPrimitive.Button data-slot="toolbar-button" render={render ?? ((renderProps, state) => {
    const { className, ...buttonProps } = renderProps;
    // The primitive can keep a disabled command focusable. Preserve its ARIA
    // fact while avoiding native disabled only for that explicit focus policy.
    return <Button {...buttonProps} {...(className === undefined ? {} : { className })} size={size} variant={variant} disabled={state.disabled && !state.focusable} aria-disabled={state.disabled || renderProps["aria-disabled"]} />;
  })} {...props} />;
}
export type ToolbarLinkProps = React.ComponentProps<typeof ToolbarPrimitive.Link>;
export function ToolbarLink({ className, ...props }: ToolbarLinkProps) {
  return <ToolbarPrimitive.Link data-slot="toolbar-link" {...props} className={(state) => cn("touch-target min-w-0 rounded-item text-body text-foreground underline underline-offset-2 outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", typeof className === "function" ? className(state) : className)} />;
}
export type ToolbarSeparatorProps = React.ComponentProps<typeof ToolbarPrimitive.Separator>;
export function ToolbarSeparator({ className, ...props }: ToolbarSeparatorProps) {
  return <ToolbarPrimitive.Separator data-slot="toolbar-separator" {...props} className={(state) => cn("shrink-0 border-border-strong", state.orientation === "horizontal" ? "h-0 w-full border-b" : "w-0 self-stretch border-s", typeof className === "function" ? className(state) : className)} />;
}
export { ToolbarPrimitive };
