"use client";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import * as React from "react";
import { useFloatingLayer } from "../floating-layer";
import { Button, buttonVariants, type ButtonProps } from "./button";
import { overlayItemClassName } from "../overlay-item";
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
  return <MenuPrimitive.Positioner data-slot="menu-positioner" side="bottom" align="start" sideOffset={4} {...props} style={state => ({ ...layer, ...(typeof style === "function" ? style(state) : style) })} className={state => cn("max-h-(--available-height) max-w-(--available-width)", typeof className === "function" ? className(state) : className)} />;
}
export type MenuPopupProps = MenuPrimitive.Popup.Props;
export function MenuPopup({ className, ...props }: MenuPopupProps) {
  return <MenuPrimitive.Popup data-slot="menu-popup" {...props} className={state => cn("min-w-0 max-h-(--available-height) max-w-(--available-width) overflow-y-auto rounded-overlay border border-border bg-surface-raised p-(--qy-overlay-inset) text-foreground shadow-raised outline-none focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />;
}
type MenuSizing = { size?: ButtonProps["size"] };
// 基础层 §4、§6、§8（2026-10-04 打磨）：菜单项与候选项同一几何，共用 src/overlay-item.ts——
// 圆角、高亮、禁用同一来源；文字起点与带框控件的文字起点相同；同一菜单内各项等权，不用命令字重区分。
// 菜单项是命令，高度跟随按钮尺寸档；候选项是值，高度跟随填值角色层——这是两者唯一的不同。
// 勾选与单选的标记在尾部，与 Select / Combobox 的选中对勾同位，文字列保持对齐。
const itemFrame: Record<NonNullable<ButtonProps["size"]>, string> = {
  xs: "w-full justify-start px-[calc(var(--qy-control-xs-padding-bordered)-var(--qy-overlay-inset))] font-normal text-start wrap-anywhere",
  sm: "w-full justify-start px-[calc(var(--qy-control-sm-padding-bordered)-var(--qy-overlay-inset))] font-normal text-start wrap-anywhere",
  md: "w-full justify-start px-[calc(var(--qy-control-md-padding-bordered)-var(--qy-overlay-inset))] font-normal text-start wrap-anywhere",
  lg: "w-full justify-start px-[calc(var(--qy-control-lg-padding-bordered)-var(--qy-overlay-inset))] font-normal text-start wrap-anywhere",
  xl: "w-full justify-start px-[calc(var(--qy-control-xl-padding-bordered)-var(--qy-overlay-inset))] font-normal text-start wrap-anywhere",
};
export type MenuItemProps = MenuPrimitive.Item.Props & MenuSizing;
export function MenuItem({ size = "md", className, ...props }: MenuItemProps) {
  return <MenuPrimitive.Item data-slot="menu-item" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, itemFrame[size], typeof className === "function" ? className(state) : className)} />;
}
export type MenuLinkItemProps = MenuPrimitive.LinkItem.Props & MenuSizing;
export function MenuLinkItem({ size = "md", className, ...props }: MenuLinkItemProps) {
  return <MenuPrimitive.LinkItem data-slot="menu-link-item" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, itemFrame[size], typeof className === "function" ? className(state) : className)} />;
}
export type MenuGroupProps = MenuPrimitive.Group.Props;
export function MenuGroup({ className, ...props }: MenuGroupProps) { return <MenuPrimitive.Group data-slot="menu-group" {...props} className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)} />; }
export type MenuGroupLabelProps = MenuPrimitive.GroupLabel.Props;
export function MenuGroupLabel({ className, ...props }: MenuGroupLabelProps) { return <MenuPrimitive.GroupLabel data-slot="menu-group-label" {...props} className={state => cn("min-w-0 px-[calc(var(--qy-control-md-padding-bordered)-var(--qy-overlay-inset))] pt-(--qy-space-2) pb-(--qy-space-1) text-caption text-muted-foreground wrap-anywhere", typeof className === "function" ? className(state) : className)} />; }
export type MenuSeparatorProps = React.ComponentProps<typeof MenuPrimitive.Separator>;
export function MenuSeparator({ className, ...props }: MenuSeparatorProps) { return <MenuPrimitive.Separator data-slot="menu-separator" {...props} className={state => cn("-mx-(--qy-overlay-inset) my-(--qy-overlay-inset) h-0 border-b border-border", typeof className === "function" ? className(state) : className)} />; }
export type MenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & MenuSizing;
export function MenuCheckboxItem({ size = "md", className, children, ...props }: MenuCheckboxItemProps) {
  return <MenuPrimitive.CheckboxItem data-slot="menu-checkbox-item" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, itemFrame[size], typeof className === "function" ? className(state) : className)}><span className="min-w-0 flex-1">{children}</span><span data-slot="menu-checkbox-marker" aria-hidden="true" className="inline-flex shrink-0 items-center justify-center" style={{ width: `var(--qy-control-${size}-icon)` }}><MenuPrimitive.CheckboxItemIndicator data-slot="menu-checkbox-indicator"><CheckIcon /></MenuPrimitive.CheckboxItemIndicator></span></MenuPrimitive.CheckboxItem>;
}
export type MenuRadioGroupProps = MenuPrimitive.RadioGroup.Props;
export function MenuRadioGroup(props: MenuRadioGroupProps) { return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />; }
export type MenuRadioItemProps = MenuPrimitive.RadioItem.Props & MenuSizing;
export function MenuRadioItem({ size = "md", className, children, ...props }: MenuRadioItemProps) {
  return <MenuPrimitive.RadioItem data-slot="menu-radio-item" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, itemFrame[size], typeof className === "function" ? className(state) : className)}><span className="min-w-0 flex-1">{children}</span><span data-slot="menu-radio-marker" aria-hidden="true" className="inline-flex shrink-0 items-center justify-center" style={{ width: `var(--qy-control-${size}-icon)` }}><MenuPrimitive.RadioItemIndicator data-slot="menu-radio-indicator"><CheckIcon /></MenuPrimitive.RadioItemIndicator></span></MenuPrimitive.RadioItem>;
}
export type MenuSubmenuTriggerProps = MenuPrimitive.SubmenuTrigger.Props & MenuSizing;
export function MenuSubmenuTrigger({ size = "md", className, children, ...props }: MenuSubmenuTriggerProps) {
  return <MenuPrimitive.SubmenuTrigger data-slot="menu-submenu-trigger" {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, itemFrame[size], typeof className === "function" ? className(state) : className)}><span className="min-w-0 flex-1">{children}</span><ChevronRightIcon aria-hidden="true" className="rtl:rotate-180" /></MenuPrimitive.SubmenuTrigger>;
}
export { MenuPrimitive };
