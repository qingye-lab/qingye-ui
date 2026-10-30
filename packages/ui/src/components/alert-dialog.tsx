"use client";

import { AlertDialog as AlertDialogPrimitive } from "@base-ui/react/alert-dialog";
import { useRender } from "@base-ui/react/use-render";
import { isValidElement, useRef, useState, type ReactElement } from "react";
import { useUILocale } from "../locale";
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
  return <AlertDialogPrimitive.Trigger {...props} render={render ?? <Button variant="bordered" />} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "alert-dialog-trigger"} />;
}

export type AlertDialogPopupProps = DialogPopupProps;

export function AlertDialogPopup({ portalProps, backdropProps, viewportProps, initialFocus, className, ref, ...props }: AlertDialogPopupProps): ReactElement {
  const backdropLayer = useFloatingLayer("backdrop");
  const surfaceLayer = useFloatingLayer("surface");
  const panel = useRef<HTMLDivElement>(null);
  // 公共 useRender 合并 caller ref（含 React 19 cleanup），不覆盖调用方 render。
  const popup = useRender({ ref: [panel, ref ?? null], render: <AlertDialogPrimitive.Popup {...props}
    initialFocus={initialFocus ?? (() => panel.current)} aria-modal="true" data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "alert-dialog-popup"}
    className={(state) => cn(
      // 与 DialogPopup 同一结构（M22）：有 AlertDialogPanel 时页眉页脚固定、面板内部滚动；边界与阴影档同 Dialog。
      "qy-alert-dialog-popup pointer-events-auto relative grid has-[>[data-slot=alert-dialog-panel]]:flex has-[>[data-slot=alert-dialog-panel]]:flex-col min-w-0 w-fit max-w-full max-h-full gap-(--qy-panel-gap) overflow-y-auto has-[>[data-slot=alert-dialog-panel]]:overflow-hidden rounded-overlay border border-border bg-surface-raised p-(--qy-panel-padding) text-foreground shadow-overlay outline-none focus-visible:border-ring",
      typeof className === "function" ? className(state) : className,
    )} /> });
  return <AlertDialogPrimitive.Portal {...portalProps} keepMounted={false}>
    <AlertDialogPrimitive.Backdrop {...backdropProps} data-slot={(backdropProps as { "data-slot"?: string } | undefined)?.["data-slot"] ?? "alert-dialog-backdrop"}
      style={state => ({ ...backdropLayer, ...(typeof backdropProps?.style === "function" ? backdropProps.style(state) : backdropProps?.style) })}
      className={(state) => cn("qy-alert-dialog-backdrop fixed inset-0 bg-overlay", typeof backdropProps?.className === "function" ? backdropProps.className(state) : backdropProps?.className)} />
    <AlertDialogPrimitive.Viewport {...viewportProps} data-slot={(viewportProps as { "data-slot"?: string } | undefined)?.["data-slot"] ?? "alert-dialog-viewport"}
      style={state => ({ ...surfaceLayer, ...(typeof viewportProps?.style === "function" ? viewportProps.style(state) : viewportProps?.style) })}
      className={(state) => cn("pointer-events-none fixed inset-0 flex min-w-0 items-center justify-center p-(--qy-panel-padding)", typeof viewportProps?.className === "function" ? viewportProps.className(state) : viewportProps?.className)}>
      {popup}
    </AlertDialogPrimitive.Viewport>
  </AlertDialogPrimitive.Portal>;
}

export function AlertDialogTitle({ className, ...props }: AlertDialogPrimitive.Title.Props): ReactElement {
  return <AlertDialogPrimitive.Title {...props} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "alert-dialog-title"}
    className={(state) => cn("min-w-0 text-heading wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}

export function AlertDialogDescription({ className, ...props }: AlertDialogPrimitive.Description.Props): ReactElement {
  return <AlertDialogPrimitive.Description {...props} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "alert-dialog-description"}
    className={(state) => cn("min-w-0 text-body text-muted-foreground wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}

/** 离开这个提示而不做它所问的那件事，页面保持原样——这是 Close 实际做的事，所以默认名称是「返回」（messages.back），
 * 与 ConfirmAction 的同一位置一致；不叫「取消」，因为它不撤销任何已发生的事，也不替应用宣称撤销（见 Confirm 对 cancelLabel 的显式覆盖）。
 * 调用方给了 children（或 render 元素自带内容）时用调用方的，如「保留」。 */
export function AlertDialogClose({ render, children, ...props }: AlertDialogPrimitive.Close.Props): ReactElement {
  const { messages } = useUILocale();
  const named = children != null || (isValidElement<{ children?: unknown }>(render) && render.props.children != null);
  return <AlertDialogPrimitive.Close {...props} {...(children != null ? { children } : named ? {} : { children: messages.back })} render={render ?? <Button variant="quiet" />} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "alert-dialog-close"} />;
}

export function AlertDialogHeader(props: DialogGroupProps): ReactElement {
  return <DialogHeader {...props} render={props.render} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "alert-dialog-header"} />;
}
export function AlertDialogPanel(props: DialogGroupProps): ReactElement {
  return <DialogPanel {...props} render={props.render} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "alert-dialog-panel"} />;
}
export function AlertDialogFooter(props: DialogGroupProps): ReactElement {
  return <DialogFooter {...props} render={props.render} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "alert-dialog-footer"} />;
}

export { AlertDialogPrimitive };
