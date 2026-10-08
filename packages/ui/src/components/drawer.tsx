"use client";

import { Drawer as DrawerPrimitive } from "@base-ui/react/drawer";
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
};
// 抽屉贴着视口的一边：贴边那一侧没有圆角也没有线——它是从边上拉出来的，不是浮在空中的一张卡（应物象形）。
const edges = { down: "inset-x-0 bottom-0 w-full rounded-b-none border-b-0", up: "inset-x-0 top-0 w-full rounded-t-none border-t-0", left: "inset-y-0 left-0 h-full w-fit rounded-s-none border-s-0", right: "inset-y-0 right-0 h-full w-fit rounded-e-none border-e-0" };
export function DrawerPopup({ portalProps, backdropProps, viewportProps, className, ...props }: DrawerPopupProps) {
  const modal = React.useContext(DrawerModality);
  const backdrop = useFloatingLayer("backdrop");
  const surface = useFloatingLayer(modal === false ? "popup" : "surface");
  return <DrawerPrimitive.Portal {...portalProps} keepMounted={false}>
    {modal === true && <DrawerPrimitive.Backdrop data-slot="drawer-backdrop" {...backdropProps} style={state => ({ ...backdrop, ...(typeof backdropProps?.style === "function" ? backdropProps.style(state) : backdropProps?.style) })} className={state => cn("fixed inset-0 bg-overlay", typeof backdropProps?.className === "function" ? backdropProps.className(state) : backdropProps?.className)} />}
    <DrawerPrimitive.Viewport data-slot="drawer-viewport" {...viewportProps} style={state => ({ ...surface, ...(typeof viewportProps?.style === "function" ? viewportProps.style(state) : viewportProps?.style) })} className={state => cn("pointer-events-none fixed inset-0 min-w-0", typeof viewportProps?.className === "function" ? viewportProps.className(state) : viewportProps?.className)}>
      <DrawerPrimitive.Popup data-slot="drawer-popup" {...props} aria-modal={modal === true ? true : undefined} className={state => cn("pointer-events-auto absolute grid min-w-0 max-h-full max-w-full gap-(--qy-panel-gap) overflow-y-auto overscroll-contain rounded-overlay border border-border bg-surface-raised p-(--qy-panel-padding) text-foreground shadow-overlay outline-none focus-visible:border-ring", edges[state.swipeDirection], typeof className === "function" ? className(state) : className)} />
    </DrawerPrimitive.Viewport>
  </DrawerPrimitive.Portal>;
}
export function DrawerTitle({ className, ...props }: DrawerPrimitive.Title.Props) {
  return <DrawerPrimitive.Title data-slot="drawer-title" {...props} className={state => cn("min-w-0 text-heading wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export function DrawerDescription({ className, ...props }: DrawerPrimitive.Description.Props) {
  return <DrawerPrimitive.Description data-slot="drawer-description" {...props} className={state => cn("min-w-0 text-body text-muted-foreground wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export function DrawerContent({ className, ...props }: DrawerPrimitive.Content.Props) {
  return <DrawerPrimitive.Content data-slot="drawer-content" {...props} className={state => cn("grid min-w-0 gap-(--qy-panel-gap)", typeof className === "function" ? className(state) : className)} />;
}
export function DrawerClose({ children, render, ...props }: DrawerPrimitive.Close.Props) {
  const { messages } = useUILocale();
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} render={render ?? <Button variant="quiet" />}>{children ?? messages.close}</DrawerPrimitive.Close>;
}
export { DrawerPrimitive };
