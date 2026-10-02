"use client";

import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { cva } from "class-variance-authority";
import { ChevronDownIcon } from "lucide-react";
import type * as React from "react";
import { cn } from "../utils";

/**
 * Site navigation with panels that open from top-level triggers. One shared
 * popup follows the active trigger and resizes to the panel's content, which
 * cross-fades in the direction of travel. On phones prefer a `Sheet` menu.
 */
export function NavigationMenu({
  className,
  children,
  viewport = true,
  ...props
}: NavigationMenuPrimitive.Root.Props & {
  /** Renders the default `NavigationMenuViewport`. Set `false` to place your own. */
  viewport?: boolean;
}): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Root
      className={cn("relative flex max-w-max items-center", className)}
      data-slot="navigation-menu"
      {...props}
    >
      {children}
      {viewport ? <NavigationMenuViewport /> : null}
    </NavigationMenuPrimitive.Root>
  );
}

export function NavigationMenuList({
  className,
  ...props
}: NavigationMenuPrimitive.List.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.List
      className={cn("flex list-none items-center gap-[calc(var(--qy-space-1)*0.5)]", className)}
      data-slot="navigation-menu-list"
      {...props}
    />
  );
}

export function NavigationMenuItem({
  className,
  ...props
}: NavigationMenuPrimitive.Item.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Item
      className={cn("relative", className)}
      data-slot="navigation-menu-item"
      {...props}
    />
  );
}

/** Top-level trigger styling; also apply it to plain top-level links. */
export const navigationMenuTriggerStyle = cva(
  "relative inline-flex h-9 w-max shrink-0 cursor-default select-none items-center justify-center gap-(--qy-space-1) whitespace-nowrap rounded-lg border border-transparent px-[calc(var(--qy-space-3)-1px)] py-0 font-medium text-base text-foreground no-underline outline-none transition-colors pointer-coarse:after:absolute pointer-coarse:after:size-full pointer-coarse:after:min-h-11 hover:bg-accent focus-visible:ring-[length:var(--qy-focus-button-width)] focus-visible:ring-ring focus-visible:ring-offset-[length:var(--qy-focus-button-offset)] focus-visible:ring-offset-background data-disabled:pointer-events-none data-active:bg-accent data-popup-open:bg-accent data-pressed:bg-accent data-disabled:opacity-64 sm:h-8 sm:text-sm [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
);

export function NavigationMenuTrigger({
  className,
  children,
  ...props
}: NavigationMenuPrimitive.Trigger.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Trigger
      className={cn(navigationMenuTriggerStyle(), className)}
      data-slot="navigation-menu-trigger"
      {...props}
    >
      {children}
      <NavigationMenuPrimitive.Icon
        className="-me-1 inline-flex transition-transform duration-(--qy-duration-base) data-popup-open:rotate-180"
        data-slot="navigation-menu-icon"
      >
        <ChevronDownIcon aria-hidden="true" className="size-4 sm:size-3.5" />
      </NavigationMenuPrimitive.Icon>
    </NavigationMenuPrimitive.Trigger>
  );
}

export function NavigationMenuContent({
  className,
  ...props
}: NavigationMenuPrimitive.Content.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Content
      className={cn(
        "w-max max-w-[calc(100vw-2rem)] p-(--qy-space-1) transition-[opacity,translate] duration-(--qy-duration-base) data-ending-style:opacity-0 data-starting-style:opacity-0 data-starting-style:data-[activation-direction=left]:-translate-x-6 data-starting-style:data-[activation-direction=right]:translate-x-6 data-ending-style:data-[activation-direction=left]:translate-x-6 data-ending-style:data-[activation-direction=right]:-translate-x-6",
        className,
      )}
      data-slot="navigation-menu-content"
      {...props}
    />
  );
}

/**
 * The popup that shows the active panel. `NavigationMenu` renders one; place
 * your own (with `viewport={false}` on the root) to change its alignment.
 */
export function NavigationMenuViewport({
  className,
  side = "bottom",
  align = "start",
  sideOffset = 8,
  alignOffset = 0,
  collisionPadding = 16,
  portalProps,
  ...props
}: NavigationMenuPrimitive.Popup.Props & {
  side?: NavigationMenuPrimitive.Positioner.Props["side"];
  align?: NavigationMenuPrimitive.Positioner.Props["align"];
  sideOffset?: NavigationMenuPrimitive.Positioner.Props["sideOffset"];
  alignOffset?: NavigationMenuPrimitive.Positioner.Props["alignOffset"];
  collisionPadding?: NavigationMenuPrimitive.Positioner.Props["collisionPadding"];
  portalProps?: NavigationMenuPrimitive.Portal.Props;
}): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Portal {...portalProps}>
      <NavigationMenuPrimitive.Positioner
        align={align}
        alignOffset={alignOffset}
        className="z-50 h-(--positioner-height) w-(--positioner-width) max-w-(--available-width) transition-[top,left,right,bottom] duration-(--qy-duration-base) before:absolute before:content-[''] data-instant:transition-none data-[side=bottom]:before:inset-x-0 data-[side=bottom]:before:-top-2 data-[side=bottom]:before:h-2 data-[side=top]:before:inset-x-0 data-[side=top]:before:-bottom-2 data-[side=top]:before:h-2"
        collisionPadding={collisionPadding}
        data-slot="navigation-menu-positioner"
        side={side}
        sideOffset={sideOffset}
      >
        <NavigationMenuPrimitive.Popup
          className={cn(
            "relative h-(--popup-height) max-h-(--available-height) w-(--popup-width) origin-(--transform-origin) rounded-lg border bg-popover not-dark:bg-clip-padding text-popover-foreground shadow-lg/5 outline-none transition-[width,height,scale,opacity] duration-(--qy-duration-base) before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-lg)-1px)] before:shadow-[0_1px_--theme(--color-black/4%)] data-ending-style:scale-98 data-starting-style:scale-98 data-ending-style:opacity-0 data-starting-style:opacity-0 data-ending-style:duration-(--qy-duration-fast) dark:before:shadow-[0_-1px_--theme(--color-white/6%)]",
            className,
          )}
          data-slot="navigation-menu-popup"
          {...props}
        >
          <NavigationMenuPrimitive.Viewport
            className="relative size-full max-h-[calc(var(--available-height)-2px)] overflow-x-hidden overflow-y-auto overscroll-contain rounded-[calc(var(--radius-lg)-1px)]"
            data-slot="navigation-menu-viewport"
          />
        </NavigationMenuPrimitive.Popup>
      </NavigationMenuPrimitive.Positioner>
    </NavigationMenuPrimitive.Portal>
  );
}

/**
 * A link inside a panel. Compose `NavigationMenuLinkIcon`,
 * `NavigationMenuLinkTitle` and `NavigationMenuLinkDescription` inside it, or
 * give a top-level link `navigationMenuTriggerStyle()`.
 */
export function NavigationMenuLink({
  className,
  ...props
}: NavigationMenuPrimitive.Link.Props): React.ReactElement {
  return (
    <NavigationMenuPrimitive.Link
      className={cn(
        "grid grid-cols-[minmax(0,1fr)] content-start items-center gap-x-(--qy-space-3) gap-y-[calc(var(--qy-space-1)*0.5)] rounded-sm px-[calc(var(--qy-space-1)*2.5)] py-(--qy-space-2) text-base text-foreground no-underline outline-none transition-colors hover:bg-accent focus-visible:bg-accent focus-visible:ring-[length:var(--qy-focus-button-width)] focus-visible:ring-ring data-active:bg-accent has-data-[slot=navigation-menu-link-icon]:grid-cols-[auto_minmax(0,1fr)] sm:text-sm",
        className,
      )}
      data-slot="navigation-menu-link"
      {...props}
    />
  );
}

export function NavigationMenuLinkIcon({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "row-span-2 flex size-9 shrink-0 items-center justify-center self-start rounded-md border bg-background not-dark:bg-clip-padding text-foreground shadow-xs/5 dark:bg-input/32 [&_svg:not([class*='opacity-'])]:opacity-80 [&_svg:not([class*='size-'])]:size-4.5 sm:[&_svg:not([class*='size-'])]:size-4 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      data-slot="navigation-menu-link-icon"
      {...props}
    />
  );
}

export function NavigationMenuLinkTitle({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      className={cn("truncate font-medium leading-5", className)}
      data-slot="navigation-menu-link-title"
      {...props}
    />
  );
}

export function NavigationMenuLinkDescription({
  className,
  ...props
}: React.ComponentProps<"span">): React.ReactElement {
  return (
    <span
      className={cn(
        "line-clamp-2 text-pretty text-muted-foreground text-sm sm:text-xs",
        className,
      )}
      data-slot="navigation-menu-link-description"
      {...props}
    />
  );
}

export { NavigationMenuPrimitive };
