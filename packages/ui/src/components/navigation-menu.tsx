"use client";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useFloatingLayer } from "../floating-layer";
import { Button } from "./button";
import { cn } from "../utils";

export type NavigationMenuProps<Value = string> = NavigationMenuPrimitive.Root.Props<Value>;
export function NavigationMenu<Value = string>({ className, ...props }: NavigationMenuProps<Value>) { return <NavigationMenuPrimitive.Root data-slot="navigation-menu" {...props} className={state => cn("min-w-0 text-body", typeof className === "function" ? className(state) : className)} />; }
export const NavigationMenuPortal = NavigationMenuPrimitive.Portal;
export type NavigationMenuListProps = NavigationMenuPrimitive.List.Props;
export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) { return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" {...props} className={state => cn("m-0 flex min-w-0 list-none flex-wrap items-center gap-(--qy-action-gap) p-0", typeof className === "function" ? className(state) : className)} />; }
export type NavigationMenuItemProps = NavigationMenuPrimitive.Item.Props;
export function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) { return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)} />; }
export type NavigationMenuTriggerProps = NavigationMenuPrimitive.Trigger.Props;
export function NavigationMenuTrigger({ render, ...props }: NavigationMenuTriggerProps) { return <NavigationMenuPrimitive.Trigger data-slot="navigation-menu-trigger" render={render ?? <Button variant="quiet" />} {...props} />; }
export type NavigationMenuLinkProps = NavigationMenuPrimitive.Link.Props;
export function NavigationMenuLink({ className, ...props }: NavigationMenuLinkProps) { return <NavigationMenuPrimitive.Link data-slot="navigation-menu-link" {...props} className={state => cn("touch-target min-w-0 rounded-item text-body text-foreground underline underline-offset-2 outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", state.active && "text-body-strong", typeof className === "function" ? className(state) : className)} />; }
export type NavigationMenuContentProps = NavigationMenuPrimitive.Content.Props;
export function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) { return <NavigationMenuPrimitive.Content data-slot="navigation-menu-content" {...props} className={state => cn("flex min-w-0 flex-col gap-(--qy-panel-gap)", typeof className === "function" ? className(state) : className)} />; }
export type NavigationMenuPositionerProps = NavigationMenuPrimitive.Positioner.Props;
export function NavigationMenuPositioner({ style, className, ...props }: NavigationMenuPositionerProps) {
  const layer = useFloatingLayer("popup");
  return <NavigationMenuPrimitive.Positioner data-slot="navigation-menu-positioner" {...props} style={state => ({ ...layer, ...(typeof style === "function" ? style(state) : style) })} className={state => cn("max-h-(--available-height) max-w-(--available-width)", typeof className === "function" ? className(state) : className)} />;
}
export type NavigationMenuPopupProps = NavigationMenuPrimitive.Popup.Props;
export function NavigationMenuPopup({ className, ...props }: NavigationMenuPopupProps) { return <NavigationMenuPrimitive.Popup data-slot="navigation-menu-popup" {...props} className={state => cn("min-w-0 max-h-(--available-height) max-w-(--available-width) overflow-y-auto rounded-overlay border border-border bg-surface-raised p-(--qy-panel-padding-sm) text-foreground shadow-raised outline-none focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />; }
export type NavigationMenuViewportProps = NavigationMenuPrimitive.Viewport.Props;
export function NavigationMenuViewport({ className, ...props }: NavigationMenuViewportProps) { return <NavigationMenuPrimitive.Viewport data-slot="navigation-menu-viewport" {...props} className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)} />; }
export { NavigationMenuPrimitive };
