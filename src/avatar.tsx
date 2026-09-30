import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import type { ComponentProps } from "react";
import { cn } from "./utils";

export function Avatar({ className, size = "default", ...props }: AvatarPrimitive.Root.Props & { size?: "default" | "sm" | "lg" }) { return <AvatarPrimitive.Root data-slot="avatar" data-size={size} className={cn("group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border data-[size=lg]:size-10 data-[size=sm]:size-6", className)} {...props} />; }
export function AvatarImage({ className, ...props }: AvatarPrimitive.Image.Props) { return <AvatarPrimitive.Image data-slot="avatar-image" className={cn("aspect-square size-full rounded-full object-cover", className)} {...props} />; }
export function AvatarFallback({ className, ...props }: AvatarPrimitive.Fallback.Props) { return <AvatarPrimitive.Fallback data-slot="avatar-fallback" className={cn("flex size-full items-center justify-center rounded-full bg-muted text-body text-muted-foreground", className)} {...props} />; }
export function AvatarBadge({ className, ...props }: ComponentProps<"span">) { return <span data-slot="avatar-badge" className={cn("absolute right-0 bottom-0 z-10 inline-flex size-2.5 items-center justify-center rounded-full bg-primary text-primary-foreground ring-2 ring-background", className)} {...props} />; }
export function AvatarGroup({ className, ...props }: ComponentProps<"div">) { return <div data-slot="avatar-group" className={cn("group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background", className)} {...props} />; }
export function AvatarGroupCount({ className, ...props }: ComponentProps<"div">) { return <div data-slot="avatar-group-count" className={cn("relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-body text-muted-foreground ring-2 ring-background", className)} {...props} />; }
