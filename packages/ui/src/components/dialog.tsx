"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useRender } from "@base-ui/react/use-render";
import type React from "react";
import { Button } from "./button";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type DialogProps<Payload = unknown> = Omit<DialogPrimitive.Root.Props<Payload>, "modal">;

export function Dialog<Payload = unknown>(props: DialogProps<Payload>): React.ReactElement {
  // 浮层族决定 1、4：语义、焦点困住与背景阻断一起交给原语。
  return <DialogPrimitive.Root {...props} modal />;
}

export const DialogCreateHandle = DialogPrimitive.createHandle;

export function DialogTrigger<Payload = unknown>({ render, ...props }: DialogPrimitive.Trigger.Props<Payload>): React.ReactElement {
  return <DialogPrimitive.Trigger {...props} render={render ?? <Button variant="bordered" />} data-slot="dialog-trigger" />;
}

// 禁止 false/undefined 返回：阻断式工作面必须有进入和返回的焦点落点。
export type DialogFocusTarget = true | React.RefObject<HTMLElement | null> |
  ((interaction: "mouse" | "touch" | "pen" | "keyboard" | "") => HTMLElement | true | null);

export interface DialogPopupProps extends Omit<DialogPrimitive.Popup.Props, "initialFocus" | "finalFocus"> {
  initialFocus?: DialogFocusTarget;
  finalFocus?: DialogFocusTarget;
  portalProps?: DialogPrimitive.Portal.Props;
  backdropProps?: DialogPrimitive.Backdrop.Props;
  viewportProps?: DialogPrimitive.Viewport.Props;
}

export function DialogPopup({ portalProps, backdropProps, viewportProps, className, ...props }: DialogPopupProps): React.ReactElement {
  return <DialogPrimitive.Portal {...portalProps}>
    <DialogPrimitive.Backdrop {...backdropProps} data-slot="dialog-backdrop"
      className={(state) => cn("fixed inset-0 bg-overlay", typeof backdropProps?.className === "function" ? backdropProps.className(state) : backdropProps?.className)} />
    <DialogPrimitive.Viewport {...viewportProps} data-slot="dialog-viewport"
      className={(state) => cn("pointer-events-none fixed inset-0 flex min-w-0 items-center justify-center p-(--qy-panel-padding)", typeof viewportProps?.className === "function" ? viewportProps.className(state) : viewportProps?.className)}>
      <DialogPrimitive.Popup {...props} aria-modal="true" data-slot="dialog-popup"
        className={(state) => cn(
          // 内容固有宽度 + 视口上限；浮层身份读既有角色，入退只在 motion.css。
          "pointer-events-auto grid min-w-0 w-fit max-w-full max-h-full gap-(--qy-panel-gap) overflow-y-auto rounded-overlay border border-border-strong bg-surface-raised p-(--qy-panel-padding) text-foreground shadow-overlay outline-none focus-visible:border-ring",
          typeof className === "function" ? className(state) : className,
        )} />
    </DialogPrimitive.Viewport>
  </DialogPrimitive.Portal>;
}

export function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props): React.ReactElement {
  return <DialogPrimitive.Title {...props} data-slot="dialog-title"
    className={(state) => cn("min-w-0 text-heading wrap-break-word", typeof className === "function" ? className(state) : className)} />;
}

export function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props): React.ReactElement {
  return <DialogPrimitive.Description {...props} data-slot="dialog-description"
    className={(state) => cn("min-w-0 text-body text-muted-foreground wrap-break-word", typeof className === "function" ? className(state) : className)} />;
}

export function DialogClose({ children, render, ...props }: DialogPrimitive.Close.Props): React.ReactElement {
  const { messages } = useUILocale();
  return <DialogPrimitive.Close {...props} render={render ?? <Button variant="quiet" />} data-slot="dialog-close">{children ?? messages.close}</DialogPrimitive.Close>;
}

export type DialogGroupProps = useRender.ComponentProps<"div">;

export function DialogHeader({ className, render, ref, ...props }: DialogGroupProps): React.ReactElement {
  return useRender({ render, ref, defaultTagName: "div", props: { "data-slot": "dialog-header", ...props, className: cn("grid min-w-0 gap-(--qy-field-gap)", className) } });
}

export function DialogPanel({ className, render, ref, ...props }: DialogGroupProps): React.ReactElement {
  return useRender({ render, ref, defaultTagName: "div", props: { "data-slot": "dialog-panel", ...props, className: cn("grid min-w-0 gap-(--qy-panel-gap)", className) } });
}

export function DialogFooter({ className, render, ref, ...props }: DialogGroupProps): React.ReactElement {
  return useRender({ render, ref, defaultTagName: "div", props: { "data-slot": "dialog-footer", ...props, className: cn("flex min-w-0 flex-wrap items-center justify-end gap-(--qy-action-gap)", className) } });
}

export { DialogPrimitive };
