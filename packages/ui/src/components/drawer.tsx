"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { FloatingLayerScope, useFloatingLayer } from "../floating-layer";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import type { DialogFocusTarget } from "./dialog";

const DrawerModality = React.createContext<DrawerPrimitive.Root.Props["modal"]>(true);
export type DrawerProps<Payload = unknown> = DrawerPrimitive.Root.Props<Payload>;
export function Drawer<Payload = unknown>({ modal = true, ...props }: DrawerProps<Payload>) {
  const [open, setOpen] = React.useState(props.defaultOpen ?? false);
  return <DrawerModality.Provider value={modal}><FloatingLayerScope active={modal !== false && (props.open ?? open)}><DrawerPrimitive.Root {...props} modal={modal} onOpenChange={(next, details) => {
    props.onOpenChange?.(next, details);
    if (!details.isCanceled && props.open === undefined) setOpen(next);
  }} /></FloatingLayerScope></DrawerModality.Provider>;
}
export const DrawerCreateHandle = DrawerPrimitive.createHandle;
export function DrawerTrigger<Payload = unknown>({ render, ...props }: DrawerPrimitive.Trigger.Props<Payload>) {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} render={render ?? <Button variant="bordered" />} />;
}
export type DrawerPopupProps = Omit<DrawerPrimitive.Popup.Props, "initialFocus" | "finalFocus"> & {
  initialFocus?: DialogFocusTarget; finalFocus?: DialogFocusTarget;
  portalProps?: Omit<DrawerPrimitive.Portal.Props, "keepMounted">;
  backdropProps?: DrawerPrimitive.Backdrop.Props;
  viewportProps?: DrawerPrimitive.Viewport.Props;
  /**
   * 悬浮式：四边都离视口一段距离，四角圆、四边有线，成为浮在页面上的一张面板而不是从边上拉出的一段。
   * 四个方向都可用；滑动关闭、吸附点与不加 inset 时完全相同。
   */
  inset?: boolean;
};
// 页脚不随内容滚走（M22，结构与 DialogPopup 相同）：直接子级里有 DrawerContent 时，抽屉改为纵向 flex，
// DrawerHeader / DrawerFooter 占本身高度，DrawerContent 吃掉剩余并在内部滚动；没有 DrawerContent 的写法仍是整面板滚动。
// 间距读与 Dialog 相同的 --qy-panel-gap / --qy-panel-padding。边界与阴影档：border-border + shadow-overlay（理由见 popover.tsx 的 PopoverPopup；
// 非阻断的抽屉仍是占据整边的工作面，不降为贴着触发物的 shadow-raised）。
// 抽屉贴着视口的一边：贴边那一侧没有圆角也没有线——它是从边上拉出来的，不是浮在空中的一张卡（应物象形）。
const edges = { down: "inset-x-0 bottom-0 w-full rounded-b-none border-b-0", up: "inset-x-0 top-0 w-full rounded-t-none border-t-0", left: "inset-y-0 left-0 h-full w-fit rounded-s-none border-s-0", right: "inset-y-0 right-0 h-full w-fit rounded-e-none border-e-0" };
// inset 的两个值各有来处，没有新取值：距视口的边 = --qy-space-2，与 Workspace 的侧栏、工作面离视口的边相同（workspace.tsx）——
// 同样是「浮在视口里的一块面板」，离边的距离应一致；四角仍是 rounded-overlay，与 Dialog 同档（不再有贴边的一侧，所以没有要去掉的角）。
// 关闭时的位移须再加上这段距离才能完全出屏，见 motion.css 的 [data-inset]。
const insetEdges = { down: "inset-x-(--qy-space-2) bottom-(--qy-space-2) w-auto max-h-[calc(100%-2*var(--qy-space-2))]", up: "inset-x-(--qy-space-2) top-(--qy-space-2) w-auto max-h-[calc(100%-2*var(--qy-space-2))]", left: "inset-y-(--qy-space-2) left-(--qy-space-2) h-auto w-fit max-w-[calc(100%-2*var(--qy-space-2))]", right: "inset-y-(--qy-space-2) right-(--qy-space-2) h-auto w-fit max-w-[calc(100%-2*var(--qy-space-2))]" };
export function DrawerPopup({ portalProps, backdropProps, viewportProps, className, inset = false, ...props }: DrawerPopupProps) {
  const modal = React.useContext(DrawerModality);
  const backdrop = useFloatingLayer("backdrop");
  const surface = useFloatingLayer(modal === false ? "popup" : "surface");
  return <DrawerPrimitive.Portal {...portalProps} keepMounted={false}>
    {modal === true && <DrawerPrimitive.Backdrop data-slot="drawer-backdrop" {...backdropProps} style={state => ({ ...backdrop, ...(typeof backdropProps?.style === "function" ? backdropProps.style(state) : backdropProps?.style) })} className={state => cn("qy-drawer-backdrop fixed inset-0 bg-overlay", typeof backdropProps?.className === "function" ? backdropProps.className(state) : backdropProps?.className)} />}
    <DrawerPrimitive.Viewport data-slot="drawer-viewport" {...viewportProps} style={state => ({ ...surface, ...(typeof viewportProps?.style === "function" ? viewportProps.style(state) : viewportProps?.style) })} className={state => cn("pointer-events-none fixed inset-0 min-w-0", typeof viewportProps?.className === "function" ? viewportProps.className(state) : viewportProps?.className)}>
      <DrawerPrimitive.Popup data-slot="drawer-popup" data-inset={inset ? "" : undefined} {...props} aria-modal={modal === true ? true : undefined} className={state => cn("qy-drawer-popup pointer-events-auto absolute grid has-[>[data-slot=drawer-content]]:flex has-[>[data-slot=drawer-content]]:flex-col min-w-0 max-h-full max-w-full gap-(--qy-panel-gap) overflow-y-auto has-[>[data-slot=drawer-content]]:overflow-hidden overscroll-contain rounded-overlay border border-border bg-surface-raised p-(--qy-panel-padding) text-foreground shadow-overlay outline-none focus-visible:border-ring", (inset ? insetEdges : edges)[state.swipeDirection], typeof className === "function" ? className(state) : className)} />
    </DrawerPrimitive.Viewport>
  </DrawerPrimitive.Portal>;
}
export function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return <DrawerPrimitive.Title data-slot="drawer-title" {...props} className={state => cn("min-w-0 text-heading wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return <DrawerPrimitive.Description data-slot="drawer-description" {...props} className={state => cn("min-w-0 text-body text-muted-foreground wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export type DrawerGroupProps = useRender.ComponentProps<"div">;
export function DrawerHeader({ className, render, ref, ...props }: DrawerGroupProps) {
  return useRender({ render, ref, defaultTagName: "div", props: { "data-slot": "drawer-header", ...props, className: cn("grid min-w-0 shrink-0 gap-(--qy-field-gap)", className) } });
}
/**
 * 抽屉的工作内容区，也是长内容时唯一滚动的部分（对应 DialogPanel；Base UI 的 Content 本就是内容容器，不另起 Body 之名）。
 * 横向出血方式同 DialogPanel：负外距 + 同值内距，滚动条贴着面板边，读 --qy-panel-padding，没有新取值。
 */
export function DrawerContent({ className, ...props }: DrawerPrimitive.Content.Props) {
  return <DrawerPrimitive.Content data-slot="drawer-content" {...props} className={state => cn("-mx-(--qy-panel-padding) grid min-h-0 min-w-0 flex-auto content-start gap-(--qy-panel-gap) overflow-y-auto px-(--qy-panel-padding)", typeof className === "function" ? className(state) : className)} />;
}
export function DrawerFooter({ className, render, ref, ...props }: DrawerGroupProps) {
  return useRender({ render, ref, defaultTagName: "div", props: { "data-slot": "drawer-footer", ...props, className: cn("flex min-w-0 shrink-0 flex-wrap items-center justify-end gap-(--qy-action-gap)", className) } });
}
export function DrawerClose({ children, render, ...props }: DrawerPrimitive.Close.Props) {
  const { messages } = useUILocale();
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} render={render ?? <Button variant="quiet" />}>{children ?? messages.close}</DrawerPrimitive.Close>;
}
export { DrawerPrimitive };
