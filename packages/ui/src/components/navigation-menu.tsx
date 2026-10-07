"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { NavigationMenu as NavigationMenuPrimitive } from "@base-ui/react/navigation-menu";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { useFloatingLayer } from "../floating-layer";
import { ChevronDownIcon } from "lucide-react";
import { navLineCurrentClassName, navLineItemClassName, navLineListClassName } from "../nav-line";
import { cn } from "../utils";

export type NavigationMenuProps<Value = string> = NavigationMenuPrimitive.Root.Props<Value>;
export function NavigationMenu<Value = string>({ className, ...props }: NavigationMenuProps<Value>) { return <NavigationMenuPrimitive.Root data-slot="navigation-menu" {...props} className={state => cn("min-w-0 text-body", typeof className === "function" ? className(state) : className)} />; }
export const NavigationMenuPortal = NavigationMenuPrimitive.Portal;
export type NavigationMenuListProps = NavigationMenuPrimitive.List.Props;
export function NavigationMenuList({ className, ...props }: NavigationMenuListProps) { return <NavigationMenuPrimitive.List data-slot="navigation-menu-list" {...props} className={state => cn(navLineListClassName, "m-0 list-none p-0", typeof className === "function" ? className(state) : className)} />; }
export type NavigationMenuItemProps = NavigationMenuPrimitive.Item.Props;
export function NavigationMenuItem({ className, ...props }: NavigationMenuItemProps) { return <NavigationMenuPrimitive.Item data-slot="navigation-menu-item" {...props} className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)} />; }
export type NavigationMenuTriggerProps = NavigationMenuPrimitive.Trigger.Props;
/** 展开一组目的地：与其他目的地同一条导航线，尾部一枚箭头说明可以展开，展开时旋转半周。 */
export function NavigationMenuTrigger({ className, children, ...props }: NavigationMenuTriggerProps) { return <NavigationMenuPrimitive.Trigger data-slot="navigation-menu-trigger" {...props} className={state => cn(navLineItemClassName, "group/nav", state.open && "text-foreground", typeof className === "function" ? className(state) : className)}>{children}<ChevronDownIcon aria-hidden="true" className="text-muted-foreground transition-transform duration-(--qy-duration-base) ease-(--qy-ease-out) group-data-[popup-open]/nav:rotate-180 motion-reduce:transition-none" /></NavigationMenuPrimitive.Trigger>; }
export type NavigationMenuLinkProps = NavigationMenuPrimitive.Link.Props & { description?: React.ReactNode };
/**
 * description 只在面板内使用（NavigationMenuContent 对 [data-slot=navigation-menu-link] 的
 * 覆写按行项几何重排版）；顶栏导航线里的目的地是单行标签，不接受第二行——若调用方在那里传了
 * description，会按两行渲染但不获得面板的几何覆写，视觉上不是预期用法，见组件文档。
 * 一行浓墨说明只在它能帮读者判断去留时才给（design.md 文案第 1 条「写事实」），不写复述标题
 * 的套话。
 */
export function NavigationMenuLink({ className, children, description, ...props }: NavigationMenuLinkProps) {
  // data-has-description 只用于面板里的几何覆写（见 NavigationMenuContent）：两行内容要从顶部
  // 对齐，单行内容仍按行内居中（经营位置），不能用同一条规则覆盖两种形态。
  return <NavigationMenuPrimitive.Link data-slot="navigation-menu-link" data-has-description={description ? "" : undefined} {...props} className={state => cn(navLineItemClassName, state.active && navLineCurrentClassName, typeof className === "function" ? className(state) : className)}>
    {description
      ? <span className="flex min-w-0 flex-col gap-0.5 py-(--qy-space-1)"><span className="min-w-0 wrap-anywhere">{children}</span><span className="min-w-0 text-support text-muted-foreground wrap-anywhere" data-slot="navigation-menu-link-description">{description}</span></span>
      : children}
  </NavigationMenuPrimitive.Link>;
}
export type NavigationMenuGroupProps = useRender.ComponentProps<"div">;
/**
 * 组内 gap-0.5 与 Menu 的分组同一尺度；组间另加一个组间距（--qy-field-group-gap），只加在
 * 非首组之前——没有分组或只有一组时，面板和此前一样是一份紧凑列表，不无端变疏（疏密检验）。
 */
export function NavigationMenuGroup({ render, className, ...props }: NavigationMenuGroupProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "navigation-menu-group", className: cn("grid min-w-0 gap-0.5 [&:not(:first-child)]:mt-(--qy-field-group-gap)", className) }, props) });
}
export type NavigationMenuGroupLabelProps = useRender.ComponentProps<"p">;
/** 组名，不可操作：留白与字号同 MenuGroupLabel，面板里的两类浮层读同一条分组画法（NG3）。 */
export function NavigationMenuGroupLabel({ render, className, ...props }: NavigationMenuGroupLabelProps) {
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "navigation-menu-group-label", className: cn("m-0 min-w-0 px-[calc(var(--qy-fill-padding)-var(--qy-overlay-inset))] pt-(--qy-space-2) pb-(--qy-space-1) text-caption text-muted-foreground wrap-anywhere", className) }, props) });
}
export type NavigationMenuContentProps = NavigationMenuPrimitive.Content.Props;
export function NavigationMenuContent({ className, ...props }: NavigationMenuContentProps) { return <NavigationMenuPrimitive.Content data-slot="navigation-menu-content" {...props} className={state => cn("flex min-w-0 flex-col gap-0.5 [&_[data-slot=navigation-menu-link]]:mb-0 [&_[data-slot=navigation-menu-link]]:rounded-(--qy-radius-overlay-item) [&_[data-slot=navigation-menu-link]]:border-0 [&_[data-slot=navigation-menu-link]]:px-[calc(var(--qy-fill-padding)-var(--qy-overlay-inset))] [&_[data-slot=navigation-menu-link]]:text-foreground [&_[data-slot=navigation-menu-link]:hover]:bg-accent [&_[data-slot=navigation-menu-link][aria-current=page]]:bg-(--qy-surface-active) [&_[data-slot=navigation-menu-link][data-has-description]]:items-start", typeof className === "function" ? className(state) : className)} />; }
export type NavigationMenuPositionerProps = NavigationMenuPrimitive.Positioner.Props;
export function NavigationMenuPositioner({ style, className, ...props }: NavigationMenuPositionerProps) {
  const layer = useFloatingLayer("popup");
  return <NavigationMenuPrimitive.Positioner data-slot="navigation-menu-positioner" {...props} style={state => ({ ...layer, ...(typeof style === "function" ? style(state) : style) })} className={state => cn("max-h-(--available-height) max-w-(--available-width)", typeof className === "function" ? className(state) : className)} />;
}
export type NavigationMenuPopupProps = NavigationMenuPrimitive.Popup.Props;
export function NavigationMenuPopup({ className, ...props }: NavigationMenuPopupProps) { return <NavigationMenuPrimitive.Popup data-slot="navigation-menu-popup" {...props} className={state => cn("min-w-0 max-h-(--available-height) max-w-(--available-width) overflow-y-auto min-w-[calc(10*var(--qy-cai))] rounded-overlay border border-border bg-surface-raised p-(--qy-overlay-inset) text-foreground shadow-raised outline-none focus-visible:border-ring", typeof className === "function" ? className(state) : className)} />; }
export type NavigationMenuViewportProps = NavigationMenuPrimitive.Viewport.Props;
export function NavigationMenuViewport({ className, ...props }: NavigationMenuViewportProps) { return <NavigationMenuPrimitive.Viewport data-slot="navigation-menu-viewport" {...props} className={state => cn("min-w-0", typeof className === "function" ? className(state) : className)} />; }
export { NavigationMenuPrimitive };
