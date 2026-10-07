"use client";
import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import type * as React from "react";
import { cn } from "../utils";
export type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";
export type AvatarProps = React.ComponentProps<typeof AvatarPrimitive.Root> & { label: string; size?: AvatarSize };
const sizes = {
  xs: "size-(--qy-avatar-xs) text-control-xs-mobile sm:text-control-xs", sm: "size-(--qy-avatar-sm) text-control-sm-mobile sm:text-control-sm",
  md: "size-(--qy-avatar-md) text-control-md-mobile sm:text-control-md", lg: "size-(--qy-avatar-lg) text-control-lg-mobile sm:text-control-lg", xl: "size-(--qy-avatar-xl) text-control-xl-mobile sm:text-control-xl",
};
export function Avatar({ label, size = "md", className, ...props }: AvatarProps) {
  if (!label?.trim()) throw new Error("Avatar requires a non-empty label for its identity sample.");
  return <AvatarPrimitive.Root role="img" aria-label={label} data-slot="avatar" data-size={size} {...props} className={state => cn("relative inline-flex shrink-0 items-center justify-center overflow-hidden rounded-full bg-(--qy-surface-active) text-foreground has-[img]:inset-ring has-[img]:inset-ring-border outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)] focus-visible:ring-ring", sizes[size], typeof className === "function" ? className(state) : className)} />;
}
export function AvatarImage({ className, alt = "", ...props }: React.ComponentProps<typeof AvatarPrimitive.Image>) {
  return <AvatarPrimitive.Image data-slot="avatar-image" alt={alt} {...props} className={state => cn("size-full object-cover", typeof className === "function" ? className(state) : className)} />;
}
export function AvatarFallback({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Fallback>) {
  return <AvatarPrimitive.Fallback data-slot="avatar-fallback" {...props} className={state => cn("flex size-full items-center justify-center overflow-hidden", typeof className === "function" ? className(state) : className)} />;
}
export { AvatarPrimitive };
