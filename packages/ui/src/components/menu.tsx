"use client";
import { Menu as MenuPrimitive } from "@base-ui/react/menu";
import { IconCheck, IconChevronRight } from "@tabler/icons-react";
import * as React from "react";
import { popupOffset, useFloatingLayer } from "../floating-layer";
import { Button, buttonVariants, type ButtonProps } from "./button";
import { commandItemFrame, overlayItemClassName } from "../overlay-item";
import { switchOffClassName, switchThumbGeometry, switchTrackGeometry, switchVariables } from "../switch-geometry";
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
  return <MenuPrimitive.Positioner data-slot="menu-positioner" side="bottom" align="start" sideOffset={popupOffset} {...props} style={state => ({ ...layer, ...(typeof style === "function" ? style(state) : style) })} className={state => cn("max-h-(--available-height) max-w-(--available-width)", typeof className === "function" ? className(state) : className)} />;
}
export type MenuPopupProps = MenuPrimitive.Popup.Props;
// 浮层边界与阴影档的分工见 popover.tsx 的 PopoverPopup：线 border-border 划出范围，shadow-raised 表达贴着触发物的浮起。
export function MenuPopup({ className, ...props }: MenuPopupProps) {
  return <MenuPrimitive.Popup data-slot="menu-popup" {...props} className={state => cn("qy-menu-popup min-w-0 max-h-(--available-height) max-w-(--available-width) overflow-y-auto rounded-overlay border border-border bg-surface-raised p-(--qy-overlay-inset) text-foreground shadow-raised outline-none focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />;
}
type MenuSizing = { size?: ButtonProps["size"]; inset?: boolean };
export type MenuMarkerPosition = "start" | "end";
// 基础层 §4、§6、§8（2026-10-04 打磨）：菜单项与候选项同一几何，共用 src/overlay-item.ts——
// 圆角、高亮、禁用同一来源；文字起点与带框控件的文字起点相同；同一菜单内各项等权，不用命令字重区分。
// 菜单项是命令，高度跟随按钮尺寸档；候选项是值，高度跟随填值角色层——这是两者唯一的不同。
// 勾选与单选的标记默认在尾部，可按任务放到逻辑起点；文字列与图标空位保持对齐。
// 无前导标记的文字为同档图标与既有字段间隔让位；随尺寸档与逻辑方向一起变化。
const itemInset: Record<NonNullable<ButtonProps["size"]>, string> = {
  xs: "ps-[calc(var(--qy-control-xs-padding-bordered)-var(--qy-overlay-inset)+var(--qy-control-xs-icon-narrow)+var(--qy-field-gap))] sm:ps-[calc(var(--qy-control-xs-padding-bordered)-var(--qy-overlay-inset)+var(--qy-control-xs-icon)+var(--qy-field-gap))]",
  sm: "ps-[calc(var(--qy-control-sm-padding-bordered)-var(--qy-overlay-inset)+var(--qy-control-sm-icon-narrow)+var(--qy-field-gap))] sm:ps-[calc(var(--qy-control-sm-padding-bordered)-var(--qy-overlay-inset)+var(--qy-control-sm-icon)+var(--qy-field-gap))]",
  md: "ps-[calc(var(--qy-fill-padding)-var(--qy-overlay-inset)+var(--qy-fill-icon-narrow)+var(--qy-field-gap))] sm:ps-[calc(var(--qy-fill-padding)-var(--qy-overlay-inset)+var(--qy-fill-icon)+var(--qy-field-gap))]",
  lg: "ps-[calc(var(--qy-control-lg-padding-bordered)-var(--qy-overlay-inset)+var(--qy-control-lg-icon-narrow)+var(--qy-field-gap))] sm:ps-[calc(var(--qy-control-lg-padding-bordered)-var(--qy-overlay-inset)+var(--qy-control-lg-icon)+var(--qy-field-gap))]",
  xl: "ps-[calc(var(--qy-control-xl-padding-bordered)-var(--qy-overlay-inset)+var(--qy-control-xl-icon-narrow)+var(--qy-field-gap))] sm:ps-[calc(var(--qy-control-xl-padding-bordered)-var(--qy-overlay-inset)+var(--qy-control-xl-icon)+var(--qy-field-gap))]",
};
const itemMarker: Record<NonNullable<ButtonProps["size"]>, string> = {
  xs: "w-(--qy-control-xs-icon-narrow) sm:w-(--qy-control-xs-icon)",
  sm: "w-(--qy-control-sm-icon-narrow) sm:w-(--qy-control-sm-icon)",
  md: "w-(--qy-fill-icon-narrow) sm:w-(--qy-fill-icon)",
  lg: "w-(--qy-control-lg-icon-narrow) sm:w-(--qy-control-lg-icon)",
  xl: "w-(--qy-control-xl-icon-narrow) sm:w-(--qy-control-xl-icon)",
};
/*
 * 危险项（M15）：tone 与 Button 同名同义——只标出「这个动作属于危险一类」（NG10 允许的类别色），
 * 字与图标读 text-destructive-foreground（quiet + danger 的既有取值，对纸的对比由 contrast-check 测），
 * 悬停 / 高亮 / 按下读 --qy-danger-soft / --qy-danger-soft-active（与 Button quiet danger 同一对 token，不新增取值）。
 * 高亮（键盘位置）要显式写：overlayItemClassName 的 data-highlighted:bg-accent 与 hover 是两个变体，不会互相覆盖，
 * 所以危险项在 overlayItemClassName 之后用同一变体改写底色，键盘与指针看到同一种面。
 * 后果说明与确认不归菜单项：危险项被激活后应打开 AlertDialog / ConfirmAction（组件职能单一）。
 */
export type MenuItemTone = "neutral" | "danger";
const dangerItemClassName = "data-highlighted:bg-danger-soft";
export type MenuItemProps = MenuPrimitive.Item.Props & MenuSizing & { tone?: MenuItemTone };
export function MenuItem({ size = "md", inset = false, tone = "neutral", className, ...props }: MenuItemProps) {
  return <MenuPrimitive.Item data-slot="menu-item" data-inset={inset || undefined} data-tone={tone} {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone }), overlayItemClassName, tone === "danger" && dangerItemClassName, commandItemFrame[size], inset && itemInset[size], typeof className === "function" ? className(state) : className)} />;
}
export type MenuLinkItemProps = MenuPrimitive.LinkItem.Props & MenuSizing;
export function MenuLinkItem({ size = "md", inset = false, className, ...props }: MenuLinkItemProps) {
  return <MenuPrimitive.LinkItem data-slot="menu-link-item" data-inset={inset || undefined} {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, commandItemFrame[size], inset && itemInset[size], typeof className === "function" ? className(state) : className)} />;
}
export type MenuGroupProps = MenuPrimitive.Group.Props;
export function MenuGroup({ className, ...props }: MenuGroupProps) { return <MenuPrimitive.Group data-slot="menu-group" {...props} className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)} />; }
export type MenuGroupLabelProps = MenuPrimitive.GroupLabel.Props & MenuSizing;
export function MenuGroupLabel({ size = "md", inset = false, className, ...props }: MenuGroupLabelProps) { return <MenuPrimitive.GroupLabel data-slot="menu-group-label" data-inset={inset || undefined} {...props} className={state => cn("min-w-0 pt-(--qy-space-2) pb-(--qy-space-1) text-caption text-muted-foreground wrap-anywhere", commandItemFrame[size], inset && itemInset[size], typeof className === "function" ? className(state) : className)} />; }
export type MenuSeparatorProps = React.ComponentProps<typeof MenuPrimitive.Separator>;
export function MenuSeparator({ className, ...props }: MenuSeparatorProps) { return <MenuPrimitive.Separator data-slot="menu-separator" {...props} className={state => cn("-mx-(--qy-overlay-inset) my-(--qy-overlay-inset) h-0 border-b border-border", typeof className === "function" ? className(state) : className)} />; }
export type MenuCheckboxItemProps = MenuPrimitive.CheckboxItem.Props & MenuSizing & { markerPosition?: MenuMarkerPosition };
export function MenuCheckboxItem({ size = "md", inset = false, markerPosition = "end", className, children, ...props }: MenuCheckboxItemProps) {
  const marker = <span data-slot="menu-checkbox-marker" aria-hidden="true" className={cn("inline-flex shrink-0 items-center justify-center", itemMarker[size])}><MenuPrimitive.CheckboxItemIndicator data-slot="menu-checkbox-indicator"><IconCheck /></MenuPrimitive.CheckboxItemIndicator></span>;
  return <MenuPrimitive.CheckboxItem data-slot="menu-checkbox-item" data-inset={inset || undefined} data-marker-position={markerPosition} {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, commandItemFrame[size], inset && itemInset[size], typeof className === "function" ? className(state) : className)}>{markerPosition === "start" && marker}<span className="min-w-0 flex-1">{children}</span>{markerPosition === "end" && marker}</MenuPrimitive.CheckboxItem>;
}
export type MenuSwitchItemProps = MenuPrimitive.CheckboxItem.Props & MenuSizing;
// 开关式的勾选项：语义仍是 menuitemcheckbox（原语的 CheckboxItem，data-checked 与 aria-checked 不变），只把尾部的对勾标记换成一条槽。
// 槽是装饰（aria-hidden），读屏只听到「菜单项复选框，已勾选/未勾选」；槽与抓手的几何、关闭态画法与 Switch 读同一份（src/switch-geometry.ts），开启是填充，与 Switch 同。
// 与 Switch 的唯一不同：菜单项的焦点是整行的高亮，槽内没有焦点环，所以没有 aria-invalid / readOnly / pending 的画法；内缩量仍取 Switch 的值，使两处的抓手大小一致。
// 槽的开关由所在行的 data-checked 驱动（group/menu-switch），不另持状态。槽固定在行尾，所以不提供 markerPosition：行首的文字列不受它影响。
export function MenuSwitchItem({ size = "md", inset = false, className, children, ...props }: MenuSwitchItemProps) {
  return <MenuPrimitive.CheckboxItem data-slot="menu-switch-item" data-inset={inset || undefined} {...props} className={state => cn("group/menu-switch", buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, commandItemFrame[size], inset && itemInset[size], typeof className === "function" ? className(state) : className)}>
    <span className="min-w-0 flex-1">{children}</span>
    <span data-slot="menu-switch-track" aria-hidden="true" style={switchVariables} className={cn(switchTrackGeometry, switchOffClassName, "group-data-checked/menu-switch:bg-primary group-data-checked/menu-switch:text-primary-foreground group-data-checked/menu-switch:inset-ring-0 motion-reduce:transition-none")}>
      <span data-slot="menu-switch-thumb" className={cn(switchThumbGeometry, "group-data-checked/menu-switch:translate-x-(--qy-switch-height-narrow) sm:group-data-checked/menu-switch:translate-x-(--qy-switch-height) rtl:group-data-checked/menu-switch:-translate-x-(--qy-switch-height-narrow) sm:rtl:group-data-checked/menu-switch:-translate-x-(--qy-switch-height)")} />
    </span>
  </MenuPrimitive.CheckboxItem>;
}
export type MenuRadioGroupProps = MenuPrimitive.RadioGroup.Props;
export function MenuRadioGroup(props: MenuRadioGroupProps) { return <MenuPrimitive.RadioGroup data-slot="menu-radio-group" {...props} />; }
export type MenuRadioItemProps = MenuPrimitive.RadioItem.Props & MenuSizing & { markerPosition?: MenuMarkerPosition };
export function MenuRadioItem({ size = "md", inset = false, markerPosition = "end", className, children, ...props }: MenuRadioItemProps) {
  const marker = <span data-slot="menu-radio-marker" aria-hidden="true" className={cn("inline-flex shrink-0 items-center justify-center", itemMarker[size])}><MenuPrimitive.RadioItemIndicator data-slot="menu-radio-indicator"><IconCheck /></MenuPrimitive.RadioItemIndicator></span>;
  return <MenuPrimitive.RadioItem data-slot="menu-radio-item" data-inset={inset || undefined} data-marker-position={markerPosition} {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, commandItemFrame[size], inset && itemInset[size], typeof className === "function" ? className(state) : className)}>{markerPosition === "start" && marker}<span className="min-w-0 flex-1">{children}</span>{markerPosition === "end" && marker}</MenuPrimitive.RadioItem>;
}
export type MenuSubmenuTriggerProps = MenuPrimitive.SubmenuTrigger.Props & MenuSizing;
export function MenuSubmenuTrigger({ size = "md", inset = false, className, children, ...props }: MenuSubmenuTriggerProps) {
  return <MenuPrimitive.SubmenuTrigger data-slot="menu-submenu-trigger" data-inset={inset || undefined} {...props} className={state => cn(buttonVariants({ variant: "quiet", size, shape: "label", tone: "neutral" }), overlayItemClassName, commandItemFrame[size], inset && itemInset[size], typeof className === "function" ? className(state) : className)}><span className="min-w-0 flex-1">{children}</span><IconChevronRight aria-hidden="true" className="rtl:rotate-180" /></MenuPrimitive.SubmenuTrigger>;
}
export { MenuPrimitive };
