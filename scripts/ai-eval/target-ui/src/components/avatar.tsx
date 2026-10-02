// Adapted from coss ui (MIT), apps/ui/registry/default/ui/avatar.tsx.
// See ../../THIRD_PARTY_NOTICES.md and ../../coss-source.json.
"use client";

import { Avatar as AvatarPrimitive } from "@base-ui/react/avatar";
import type React from "react";
import { cn } from "../utils";

export type AvatarSize = "xs" | "sm" | "default" | "lg" | "xl";

const avatarSizeClassNames: Record<AvatarSize, string> = {
  xs: "size-5 text-[0.625rem]",
  sm: "size-6 text-[0.6875rem]",
  default: "size-8 text-xs",
  lg: "size-10 text-sm",
  xl: "size-12 text-base",
};

export function Avatar({
  className,
  size = "default",
  ...props
}: AvatarPrimitive.Root.Props & { size?: AvatarSize }): React.ReactElement {
  return (
    <AvatarPrimitive.Root
      className={cn(
        "group/avatar relative isolate inline-flex shrink-0 select-none items-center justify-center rounded-full bg-background align-middle font-medium",
        // A hairline inside the edge keeps light images from bleeding into the page.
        "after:pointer-events-none after:absolute after:inset-0 after:z-20 after:rounded-full after:border after:border-foreground/8",
        avatarSizeClassNames[size],
        className,
      )}
      data-size={size}
      data-slot="avatar"
      {...props}
    />
  );
}

export function AvatarImage({
  className,
  ...props
}: AvatarPrimitive.Image.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Image
      className={cn(
        "absolute inset-0 z-10 size-full rounded-full object-cover data-error:invisible data-loading:invisible",
        className,
      )}
      data-slot="avatar-image"
      {...props}
    />
  );
}

export function AvatarFallback({
  className,
  ...props
}: AvatarPrimitive.Fallback.Props): React.ReactElement {
  return (
    <AvatarPrimitive.Fallback
      className={cn(
        "absolute inset-0 flex size-full items-center justify-center rounded-full bg-muted",
        className,
      )}
      data-slot="avatar-fallback"
      {...props}
    />
  );
}

/** A presence or status dot pinned to the avatar's lower edge. */
export function AvatarBadge({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      className={cn(
        "absolute end-0 bottom-0 z-30 inline-flex size-2.5 items-center justify-center rounded-full bg-success ring-2 ring-background group-data-[size=lg]/avatar:size-3 group-data-[size=xl]/avatar:size-3.5 group-data-[size=xs]/avatar:size-1.5 group-data-[size=sm]/avatar:size-2 [&_svg]:size-2",
        className,
      )}
      data-slot="avatar-badge"
      {...props}
    />
  );
}

/** Overlapping avatars; each is ringed in the page colour so edges stay crisp. */
export function AvatarGroup({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "group/avatar-group flex items-center -space-x-1.5 has-data-[size=lg]:-space-x-2 has-data-[size=xl]:-space-x-2.5 has-data-[size=xs]:-space-x-1 has-data-[size=sm]:-space-x-1 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
        className,
      )}
      data-slot="avatar-group"
      {...props}
    />
  );
}

/** The trailing "+N" counter in an avatar group. */
export function AvatarGroupCount({
  className,
  ...props
}: React.ComponentProps<"div">): React.ReactElement {
  return (
    <div
      className={cn(
        "relative inline-flex size-8 min-w-fit shrink-0 items-center justify-center rounded-full bg-[color-mix(in_srgb,var(--color-background),var(--color-foreground)_6%)] px-(--qy-space-1) font-medium text-muted-foreground text-xs ring-2 ring-background numeric",
        // Matches the size of the avatars it follows.
        "group-has-data-[size=xs]/avatar-group:size-5 group-has-data-[size=xs]/avatar-group:text-[0.625rem] group-has-data-[size=sm]/avatar-group:size-6 group-has-data-[size=sm]/avatar-group:text-[0.6875rem] group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=lg]/avatar-group:text-sm group-has-data-[size=xl]/avatar-group:size-12 group-has-data-[size=xl]/avatar-group:text-base",
        className,
      )}
      data-slot="avatar-group-count"
      {...props}
    />
  );
}

export { AvatarPrimitive };
