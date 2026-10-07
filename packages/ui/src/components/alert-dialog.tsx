"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useRender } from "@base-ui/react/use-render";
import { useRef, useState, type ReactElement } from "react";
import { FloatingLayerScope, useFloatingLayer } from "../floating-layer";
import { Button } from "./button";
import { DialogHeader, DialogPanel, DialogFooter, type DialogGroupProps, type DialogPopupProps } from "./dialog";
import { cn } from "../utils";

export type AlertDialogProps<Payload = unknown> = AlertDialogPrimitive.Root.Props<Payload>;

export function AlertDialog<Payload = unknown>(props: AlertDialogProps<Payload>): ReactElement {
  const [open, setOpen] = useState(props.defaultOpen ?? false);
  // 原语固定 modal 与 disablePointerDismissal；遮罩不是明确的决定。
  return <FloatingLayerScope active={props.open ?? open}><AlertDialogPrimitive.Root {...props} onOpenChange={(next, details) => {
    props.onOpenChange?.(next, details);
    if (!details.isCanceled && props.open === undefined) setOpen(next);
  }} /></FloatingLayerScope>;
}

export const AlertDialogCreateHandle = AlertDialogPrimitive.createHandle;

export function AlertDialogTrigger<Payload = unknown>({ render, ...props }: AlertDialogPrimitive.Trigger.Props<Payload>): ReactElement {
  return <AlertDialogPrimitive.Trigger {...props} render={render ?? <Button variant="bordered" />} data-slot="alert-dialog-trigger" />;
}

export type AlertDialogPopupProps = DialogPopupProps;

export function AlertDialogPopup({ portalProps, backdropProps, viewportProps, initialFocus, className, ref, ...props }: AlertDialogPopupProps): ReactElement {
  const backdropLayer = useFloatingLayer("backdrop");
  const surfaceLayer = useFloatingLayer("surface");
  const panel = useRef<HTMLDivElement>(null);
  // 公共 useRender 合并 caller ref（含 React 19 cleanup），不覆盖调用方 render。
  const popup = useRender({ ref: [panel, ref ?? null], render: <AlertDialogPrimitive.Popup {...props}
    initialFocus={initialFocus ?? (() => panel.current)} aria-modal="true" data-slot="alert-dialog-popup"
    className={(state) => cn(
      "pointer-events-auto grid min-w-0 w-fit max-w-full max-h-full gap-(--qy-panel-gap) overflow-y-auto rounded-overlay border border-border bg-surface-raised p-(--qy-panel-padding) text-foreground shadow-overlay outline-none focus-visible:border-ring",
      typeof className === "function" ? className(state) : className,
    )} /> });
  return <AlertDialogPrimitive.Portal {...portalProps} keepMounted={false}>
    <AlertDialogPrimitive.Backdrop {...backdropProps} data-slot="alert-dialog-backdrop"
      style={state => ({ ...backdropLayer, ...(typeof backdropProps?.style === "function" ? backdropProps.style(state) : backdropProps?.style) })}
      className={(state) => cn("fixed inset-0 bg-overlay", typeof backdropProps?.className === "function" ? backdropProps.className(state) : backdropProps?.className)} />
    <AlertDialogPrimitive.Viewport {...viewportProps} data-slot="alert-dialog-viewport"
      style={state => ({ ...surfaceLayer, ...(typeof viewportProps?.style === "function" ? viewportProps.style(state) : viewportProps?.style) })}
      className={(state) => cn("pointer-events-none fixed inset-0 flex min-w-0 items-center justify-center p-(--qy-panel-padding)", typeof viewportProps?.className === "function" ? viewportProps.className(state) : viewportProps?.className)}>
      {popup}
    </AlertDialogPrimitive.Viewport>
  </AlertDialogPrimitive.Portal>;
}

export function AlertDialogTitle({ className, ...props }: AlertDialogPrimitive.Title.Props): ReactElement {
  return <AlertDialogPrimitive.Title {...props} data-slot="alert-dialog-title"
    className={(state) => cn("min-w-0 text-heading wrap-break-word", typeof className === "function" ? className(state) : className)} />;
}

export function AlertDialogDescription({ className, ...props }: AlertDialogPrimitive.Description.Props): ReactElement {
  return <AlertDialogPrimitive.Description {...props} data-slot="alert-dialog-description"
    className={(state) => cn("min-w-0 text-body text-muted-foreground wrap-break-word", typeof className === "function" ? className(state) : className)} />;
}

// 不替应用命名“取消”或宣称“撤销”；调用方提供明确的保留/返回选择。
export function AlertDialogClose({ render, ...props }: AlertDialogPrimitive.Close.Props): ReactElement {
  return <AlertDialogPrimitive.Close {...props} render={render ?? <Button variant="quiet" />} data-slot="alert-dialog-close" />;
}

export function AlertDialogHeader(props: DialogGroupProps): ReactElement {
  return <DialogHeader {...props} render={props.render} data-slot="alert-dialog-header" />;
}
export function AlertDialogPanel(props: DialogGroupProps): ReactElement {
  return <DialogPanel {...props} render={props.render} data-slot="alert-dialog-panel" />;
}
export function AlertDialogFooter(props: DialogGroupProps): ReactElement {
  return <DialogFooter {...props} render={props.render} data-slot="alert-dialog-footer" />;
}

export { AlertDialogPrimitive };
