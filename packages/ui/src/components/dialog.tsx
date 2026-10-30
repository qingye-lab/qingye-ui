"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { useRender } from "@base-ui/react/use-render";
import type React from "react";
import { useState } from "react";
import { FloatingLayerScope, useFloatingLayer } from "../floating-layer";
import { Button } from "./button";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type DialogProps<Payload = unknown> = Omit<DialogPrimitive.Root.Props<Payload>, "modal">;

export function Dialog<Payload = unknown>(props: DialogProps<Payload>): React.ReactElement {
  const [open, setOpen] = useState(props.defaultOpen ?? false);
  // 浮层族决定 1、4：语义、焦点困住与背景阻断一起交给原语。
  return <FloatingLayerScope active={props.open ?? open}><DialogPrimitive.Root {...props} modal onOpenChange={(next, details) => {
    props.onOpenChange?.(next, details);
    if (!details.isCanceled && props.open === undefined) setOpen(next);
  }} /></FloatingLayerScope>;
}

export const DialogCreateHandle = DialogPrimitive.createHandle;

export function DialogTrigger<Payload = unknown>({ render, ...props }: DialogPrimitive.Trigger.Props<Payload>): React.ReactElement {
  return <DialogPrimitive.Trigger {...props} render={render ?? <Button variant="bordered" />} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "dialog-trigger"} />;
}

// 禁止 false/undefined 返回：阻断式工作面必须有进入和返回的焦点落点。
export type DialogFocusTarget = true | React.RefObject<HTMLElement | null> |
  ((interaction: "mouse" | "touch" | "pen" | "keyboard" | "") => HTMLElement | true | null);

export interface DialogPopupProps extends Omit<DialogPrimitive.Popup.Props, "initialFocus" | "finalFocus"> {
  initialFocus?: DialogFocusTarget;
  finalFocus?: DialogFocusTarget;
  /** Retained closed portals fail sibling-modal ARIA isolation in Base UI 1.7. */
  portalProps?: Omit<DialogPrimitive.Portal.Props, "keepMounted">;
  backdropProps?: DialogPrimitive.Backdrop.Props;
  viewportProps?: DialogPrimitive.Viewport.Props;
}

export function DialogPopup({ portalProps, backdropProps, viewportProps, className, ...props }: DialogPopupProps): React.ReactElement {
  const backdropLayer = useFloatingLayer("backdrop");
  const surfaceLayer = useFloatingLayer("surface");
  return <DialogPrimitive.Portal {...portalProps} keepMounted={false}>
    <DialogPrimitive.Backdrop {...backdropProps} data-slot={(backdropProps as { "data-slot"?: string } | undefined)?.["data-slot"] ?? "dialog-backdrop"}
      style={state => ({ ...backdropLayer, ...(typeof backdropProps?.style === "function" ? backdropProps.style(state) : backdropProps?.style) })}
      className={(state) => cn("qy-dialog-backdrop fixed inset-0 bg-overlay", typeof backdropProps?.className === "function" ? backdropProps.className(state) : backdropProps?.className)} />
    <DialogPrimitive.Viewport {...viewportProps} data-slot={(viewportProps as { "data-slot"?: string } | undefined)?.["data-slot"] ?? "dialog-viewport"}
      style={state => ({ ...surfaceLayer, ...(typeof viewportProps?.style === "function" ? viewportProps.style(state) : viewportProps?.style) })}
      className={(state) => cn("pointer-events-none fixed inset-0 flex min-w-0 items-center justify-center p-(--qy-panel-padding)", typeof viewportProps?.className === "function" ? viewportProps.className(state) : viewportProps?.className)}>
      <DialogPrimitive.Popup {...props} aria-modal="true" data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "dialog-popup"}
        className={(state) => cn(
          // 内容固有宽度 + 视口上限；绝对定位子元素始终锚定本面板，入退只在 motion.css。
          // 页脚不随内容滚走（M22）：直接子级里有 DialogPanel 时，面板改为纵向 flex、自身不滚，
          // 头部与页脚各占本身高度，中间的 DialogPanel 吃掉剩余并在内部滚动；没有 DialogPanel 的旧写法仍是整面板滚动。
          // 间距读同一个 --qy-panel-gap / --qy-panel-padding，没有新取值。边界与阴影档：border-border + shadow-overlay
          // （阻断式工作面，比贴着触发物的 shadow-raised 离页面更远；理由见 popover.tsx 的 PopoverPopup）。
          "qy-dialog-popup pointer-events-auto relative grid has-[>[data-slot=dialog-panel]]:flex has-[>[data-slot=dialog-panel]]:flex-col min-w-0 w-fit max-w-full max-h-full gap-(--qy-panel-gap) overflow-y-auto has-[>[data-slot=dialog-panel]]:overflow-hidden rounded-overlay border border-border bg-surface-raised p-(--qy-panel-padding) text-foreground shadow-overlay outline-none focus-visible:border-ring",
          typeof className === "function" ? className(state) : className,
        )} />
    </DialogPrimitive.Viewport>
  </DialogPrimitive.Portal>;
}

export function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props): React.ReactElement {
  return <DialogPrimitive.Title {...props} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "dialog-title"}
    className={(state) => cn("min-w-0 text-heading wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}

export function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props): React.ReactElement {
  return <DialogPrimitive.Description {...props} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "dialog-description"}
    className={(state) => cn("min-w-0 text-body text-muted-foreground wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}

export function DialogClose({ children, render, ...props }: DialogPrimitive.Close.Props): React.ReactElement {
  const { messages } = useUILocale();
  return <DialogPrimitive.Close {...props} render={render ?? <Button variant="quiet" />} data-slot={(props as { "data-slot"?: string })["data-slot"] ?? "dialog-close"}>{children ?? messages.close}</DialogPrimitive.Close>;
}

export type DialogGroupProps = useRender.ComponentProps<"div">;

export function DialogHeader({ className, render, ref, ...props }: DialogGroupProps): React.ReactElement {
  return useRender({ render, ref, defaultTagName: "div", props: { "data-slot": "dialog-header", ...props, className: cn("grid min-w-0 shrink-0 gap-(--qy-field-gap)", className) } });
}

/**
 * 工作内容区，也是长内容时唯一滚动的部分（页眉与页脚固定）。
 * 横向与面板内缘等宽出血（负外距 + 同值内距）：滚动条贴着面板边，内容与表头页脚仍在同一条竖线上；
 * overflow 会裁切横向，内距同时给控件的内描边留出位置。出血量读 --qy-panel-padding，没有新取值。
 */
export function DialogPanel({ className, render, ref, ...props }: DialogGroupProps): React.ReactElement {
  return useRender({ render, ref, defaultTagName: "div", props: { "data-slot": "dialog-panel", ...props, className: cn("-mx-(--qy-panel-padding) grid min-h-0 min-w-0 flex-auto content-start gap-(--qy-panel-gap) overflow-y-auto px-(--qy-panel-padding)", className) } });
}

export function DialogFooter({ className, render, ref, ...props }: DialogGroupProps): React.ReactElement {
  return useRender({ render, ref, defaultTagName: "div", props: { "data-slot": "dialog-footer", ...props, className: cn("flex min-w-0 shrink-0 flex-wrap items-center justify-end gap-(--qy-action-gap)", className) } });
}

export { DialogPrimitive };
