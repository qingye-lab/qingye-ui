"use client";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { useFloatingLayer } from "../floating-layer";
import { Button, buttonVariants, type ButtonProps } from "./button";
import { cn } from "../utils";

export type MenuProps<Payload = unknown> = MenuPrimitive.Root.Props<Payload>;
export function Menu<Payload = unknown>(props: MenuProps<Payload>) { return <MenuPrimitive.Root {...props} />; }
export const MenuPortal = MenuPrimitive.Portal;
export const MenuSubmenu = MenuPrimitive.SubmenuRoot;
export type MenuTriggerProps = MenuPrimitive.Trigger.Props;
export function MenuTrigger({ render, ...props }: MenuTriggerProps) { return <MenuPrimitive.Trigger data-slot="menu-trigger" render={render ?? <Button variant="bordered" />} {...props} />; }
export type MenuPositionerProps = MenuPrimitive.Positioner.Props;
export function MenuPositioner({ style, className, ...props }: MenuPositionerProps) {
  const layer = useFloatingLayer("popup");
  return <MenuPrimitive.Positioner data-slot="menu-positioner" {...props} style={state => ({ ...layer, ...(typeof style === "function" ? style(state) : style) })} className={state => cn("max-h-(--available-height) max-w-(--available-width)", typeof className === "function" ? className(state) : className)} />;
}
export type MenuPopupProps = MenuPrimitive.Popup.Props;
export function MenuPopup({ className, ...props }: MenuPopupProps) {
  return <MenuPrimitive.Popup data-slot="menu-popup" {...props} className={state => cn("min-w-0 max-h-(--available-height) max-w-(--available-width) overflow-y-auto rounded-overlay border border-border bg-surface-raised p-(--qy-panel-padding-sm) text-foreground shadow-raised outline-none focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />;
}
type MenuSizing = { size?: ButtonProps["size"] };
export type MenuItemProps = MenuPrimitive.Item.Props & MenuSizing;
export function MenuItem({ size = "md", className, ...props }: MenuItemProps) {
  return <MenuPrimitive.Item data-slot="menu-item" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), "w-full justify-start gap-(--qy-action-gap) text-start wrap-anywhere", state.highlighted && "bg-accent", state.disabled && "opacity-64", typeof className === "function" ? className(state) : className)} />;
}
export type MenuLinkItemProps = MenuPrimitive.LinkItem.Props & MenuSizing;
export function MenuLinkItem({ size = "md", className, ...props }: MenuLinkItemProps) {
  return <MenuPrimitive.LinkItem data-slot="menu-link-item" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), "w-full justify-start text-start wrap-anywhere", state.highlighted && "bg-accent", typeof className === "function" ? className(state) : className)} />;
}
export type MenuGroupProps = MenuPrimitive.Group.Props;
export function MenuGroup({ className, ...props }: MenuGroupProps) { return <MenuPrimitive.Group data-slot="menu-group" {...props} className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)} />; }
export type MenuGroupLabelProps = MenuPrimitive.GroupLabel.Props;
export function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) { return <MenuPrimitive.GroupLabel data-slot="menu-group-label" {...props} className={state => cn("mb-(--qy-field-gap) min-w-0 text-support text-muted-foreground wrap-anywhere", typeof className === "function" ? className(state) : className)} />; }
export type MenuSeparatorProps = React.ComponentProps<typeof MenuPrimitive.Separator>;
export function MenuSeparator({ className, ...props }: MenuSeparatorProps) { return <MenuPrimitive.Separator data-slot="menu-separator" {...props} className={state => cn("my-(--qy-panel-gap) h-0 w-full border-b border-border-strong", typeof className === "function" ? className(state) : className)} />; }
export type MenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & MenuSizing;
export function MenuCheckboxItem({ size = "md", className, children, ...props }: MenuCheckboxItemProps) {
  return <MenuPrimitive.CheckboxItem data-slot="menu-checkbox-item" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), "w-full justify-start gap-(--qy-action-gap) text-start wrap-anywhere", state.highlighted && "bg-accent", state.disabled && "opacity-64", typeof className === "function" ? className(state) : className)}><span data-slot="menu-checkbox-marker" aria-hidden="true" className="inline-flex shrink-0 items-center justify-center" style={{ width: `var(--qy-control-${size}-icon)` }}><MenuPrimitive.CheckboxItemIndicator data-slot="menu-checkbox-indicator"><CheckIcon /></MenuPrimitive.CheckboxItemIndicator></span><span className="min-w-0">{children}</span></MenuPrimitive.CheckboxItem>;
}
export type MenuRadioGroupProps = MenuPrimitive.RadioGroup.Props;
export function MenuRadioGroup(props: MenuRadioGroupProps) { return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />; }
export type MenuRadioItemProps = MenuPrimitive.RadioItem.Props & MenuSizing;
export function MenuRadioItem({ size = "md", className, children, ...props }: MenuRadioItemProps) {
  return <MenuPrimitive.RadioItem data-slot="menu-radio-item" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), "w-full justify-start gap-(--qy-action-gap) text-start wrap-anywhere", state.highlighted && "bg-accent", state.disabled && "opacity-64", typeof className === "function" ? className(state) : className)}><span data-slot="menu-radio-marker" aria-hidden="true" className="inline-flex shrink-0 items-center justify-center" style={{ width: `var(--qy-control-${size}-icon)` }}><MenuPrimitive.RadioItemIndicator data-slot="menu-radio-indicator"><CheckIcon /></MenuPrimitive.RadioItemIndicator></span><span className="min-w-0">{children}</span></MenuPrimitive.RadioItem>;
}
export type MenuSubmenuTriggerProps = MenuPrimitive.SubmenuTrigger.Props & MenuSizing;
export function MenuSubmenuTrigger({ size = "md", className, children, ...props }: MenuSubmenuTriggerProps) {
  return <MenuPrimitive.SubmenuTrigger data-slot="menu-submenu-trigger" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), "w-full justify-start gap-(--qy-action-gap) text-start wrap-anywhere", state.highlighted && "bg-accent", state.disabled && "opacity-64", typeof className === "function" ? className(state) : className)}><span className="min-w-0 flex-1">{children}</span><ChevronRightIcon aria-hidden="true" className="rtl:rotate-180" /></MenuPrimitive.SubmenuTrigger>;
}
export { MenuPrimitive };
