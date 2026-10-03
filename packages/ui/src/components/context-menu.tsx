"use client";
import { ContextMenu as ContextMenuPrimitive } from "@base-ui/react/context-menu";
import { MenuCheckboxItem, MenuGroup, MenuGroupLabel, MenuItem, MenuLinkItem, MenuPopup, MenuPositioner, MenuRadioItem, MenuSeparator, MenuSubmenuTrigger, type MenuCheckboxItemProps, type MenuGroupProps, type MenuGroupLabelProps, type MenuItemProps, type MenuLinkItemProps, type MenuPopupProps, type MenuPositionerProps, type MenuRadioItemProps, type MenuSeparatorProps, type MenuSubmenuTriggerProps } from "./menu";
import { cn } from "../utils";

export type ContextMenuProps = ContextMenuPrimitive.Root.Props;
export function ContextMenu(props: ContextMenuProps) { return <ContextMenuPrimitive.Root {...props} />; }
export const ContextMenuPortal = ContextMenuPrimitive.Portal;
export const ContextMenuSubmenu = ContextMenuPrimitive.SubmenuRoot;
export function ContextMenuRadioGroup(props: ContextMenuPrimitive.RadioGroup.Props) { return <ContextMenuPrimitive.RadioGroup data-slot="context-menu-radio-group" {...props} />; }
export type ContextMenuTriggerProps = ContextMenuPrimitive.Trigger.Props;
export function ContextMenuTrigger({ className, tabIndex = 0, ...props }: ContextMenuTriggerProps) {
  return <ContextMenuPrimitive.Trigger data-slot="context-menu-trigger" tabIndex={tabIndex} {...props} className={state => cn("min-w-0 rounded-item outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", typeof className === "function" ? className(state) : className)} />;
}
export function ContextMenuPositioner(props: MenuPositionerProps) { return <MenuPositioner data-slot="context-menu-positioner" {...props} />; }
export function ContextMenuPopup(props: MenuPopupProps) { return <MenuPopup data-slot="context-menu-popup" {...props} />; }
export function ContextMenuItem(props: MenuItemProps) { return <MenuItem data-slot="context-menu-item" {...props} />; }
export function ContextMenuLinkItem(props: MenuLinkItemProps) { return <MenuLinkItem data-slot="context-menu-link-item" {...props} />; }
export function ContextMenuGroup(props: MenuGroupProps) { return <MenuGroup data-slot="context-menu-group" {...props} />; }
export function ContextMenuGroupLabel(props: MenuGroupLabelProps) { return <MenuGroupLabel data-slot="context-menu-group-label" {...props} />; }
export function ContextMenuSeparator(props: MenuSeparatorProps) { return <MenuSeparator data-slot="context-menu-separator" {...props} />; }
export function ContextMenuCheckboxItem(props: MenuCheckboxItemProps) { return <MenuCheckboxItem data-slot="context-menu-checkbox-item" {...props} />; }
export function ContextMenuRadioItem(props: MenuRadioItemProps) { return <MenuRadioItem data-slot="context-menu-radio-item" {...props} />; }
export function ContextMenuSubmenuTrigger(props: MenuSubmenuTriggerProps) { return <MenuSubmenuTrigger data-slot="context-menu-submenu-trigger" {...props} />; }
export { ContextMenuPrimitive };
