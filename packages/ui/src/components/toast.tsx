"use client";

import { Toast } from "@base-ui/react/toast";
import { IconCheck, IconHelpCircle, IconCircleX, IconHourglass, IconInfoCircle, IconLoader2, IconAlertTriangle, IconX } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import { useFloatingLayer } from "../floating-layer";

export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export interface ToastProviderProps extends Toast.Provider.Props {
  position?: ToastPosition;
  portalProps?: React.ComponentProps<typeof Toast.Portal> | undefined;
}
export interface AnchoredToastProviderProps extends Toast.Provider.Props {
  portalProps?: React.ComponentProps<typeof Toast.Portal> | undefined;
}
type ToastData = {
  rootProps?: Omit<React.ComponentProps<typeof Toast.Root>, "children" | "className" | "swipeDirection" | "toast">;
  tooltipStyle?: boolean;
};
type Notice = Toast.Root.ToastObject<ToastData>;
type Manager = ReturnType<typeof Toast.useToastManager<ToastData>>;

export const toastManager: ReturnType<typeof Toast.createToastManager> = Toast.createToastManager();
export const anchoredToastManager: ReturnType<typeof Toast.createToastManager> = Toast.createToastManager();

function isPending(type?: string) {
  return type === "loading" || type === "waiting" || type === "in-progress";
}
function isPersistent(type?: string) {
  return isPending(type) || type === "unknown" || type === "error" || type === "failed";
}

// 通知只呈现应用给出的事实，不替应用推断结果（用户裁决 2026-10-10：toast 不做推测）。
// 这里唯一的规则是呈现上的：未完成、失败与应用声明的未知不自动消失，等用户看到或应用更新。
function usePersistence(notice: Notice, manager: Manager) {
  React.useLayoutEffect(() => {
    if (notice.transitionStatus !== "ending" && isPersistent(notice.type) && notice.timeout !== 0) manager.update(notice.id, { timeout: 0 });
  }, [notice.id, notice.type, notice.timeout, notice.transitionStatus, manager]);
}

function NoticeBody({ notice, manager, anchored = false }: {
  notice: Notice; manager: Manager; anchored?: boolean;
}) {
  const { messages } = useUILocale();
  usePersistence(notice, manager);
  const type = notice.type;
  const state = type === "waiting" ? messages.buttonWaiting
    : type === "loading" || type === "in-progress" ? messages.buttonInProgress
    : type === "unknown" ? messages.buttonUnknown
    : type === "error" || type === "failed" ? messages.buttonFailed
    : type === "success" ? messages.toastSuccess : undefined;
  const Icon = type === "waiting" ? IconHourglass
    : type === "loading" || type === "in-progress" ? IconLoader2
    : type === "unknown" ? IconHelpCircle
    : type === "error" || type === "failed" ? IconCircleX
    : type === "success" ? IconCheck
    : type === "warning" ? IconAlertTriangle : IconInfoCircle;
  const title = notice.title;
  const high = notice.priority === "high";
  const [focused, setFocused] = React.useState(false);
  const messageRole = !high ? "status" : focused ? "alert" : undefined;
  const { onFocusCapture, onBlurCapture, ...rootProps } = notice.data?.rootProps ?? {};
  return (
    <>
    <Toast.Root
      toast={notice}
      role="group"
      data-slot={anchored ? "toast-popup" : "toast-root"}
      data-motion={notice.transitionStatus === "ending" ? undefined : "fade-in"}
      swipeDirection={anchored ? [] : ["left", "right"]}
      className={cn(
        "pointer-events-auto w-full min-w-0 rounded-overlay border border-border bg-surface-raised text-foreground outline-none focus-visible:border-ring data-limited:hidden",
        notice.data?.tooltipStyle ? "p-(--qy-space-2)" : "p-(--qy-panel-padding-sm)",
      )}
      {...rootProps}
      onFocusCapture={(event) => { setFocused(true); onFocusCapture?.(event); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); onBlurCapture?.(event); }}
    >
      <Toast.Content data-slot="toast-content" className="flex items-start gap-(--qy-action-gap)">
        <span data-slot="toast-icon" aria-hidden="true" className="flex min-h-(--qy-control-sm-narrow) shrink-0 items-center sm:min-h-(--qy-control-sm)">
          <Icon className={cn("size-(--qy-control-md-icon-narrow) sm:size-(--qy-control-md-icon)", (type === "loading" || type === "in-progress") && "qy-spin")} />
        </span>
        <div className="min-w-0 flex-1">
          <div data-slot="toast-message" role={messageRole} aria-live={messageRole === "alert" ? "assertive" : messageRole ? "polite" : "off"} aria-atomic="true">
            {state ? <p data-slot="toast-state" className="text-support text-muted-foreground">{state}</p> : null}
            {title != null ? <Toast.Title data-slot="toast-title" className="text-body-strong wrap-anywhere">{title}</Toast.Title> : null}
            {notice.description != null ? <Toast.Description data-slot="toast-description" className="text-body wrap-anywhere" /> : null}
          </div>
          {notice.actionProps ? (
            <div data-slot="toast-actions" className="mt-(--qy-action-gap)">
              <Toast.Action data-slot="toast-action" render={<Button size="sm" variant="bordered" />} />
            </div>
          ) : null}
        </div>
        <Toast.Close data-slot="toast-close" aria-label={messages.closeNotification} render={<Button size="sm" shape="icon" variant="quiet" />}>
          <IconX />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
    </>
  );
}

// Complete messages in a normal flow; no collapsed stack or second motion policy.
const positions: Record<ToastPosition, string> = {
  "top-left": "top-(--qy-space-6) left-(--qy-space-6)",
  "top-center": "top-(--qy-space-6) left-1/2 -translate-x-1/2",
  "top-right": "top-(--qy-space-6) right-(--qy-space-6)",
  "bottom-left": "bottom-(--qy-space-6) left-(--qy-space-6)",
  "bottom-center": "bottom-(--qy-space-6) left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-(--qy-space-6) right-(--qy-space-6)",
};
function Notices({ position = "bottom-right", portalProps, anchored = false }: {
  position?: ToastPosition; portalProps?: React.ComponentProps<typeof Toast.Portal> | undefined; anchored?: boolean;
}) {
  const manager = Toast.useToastManager<ToastData>();
  const { messages } = useUILocale();
  const layer = useFloatingLayer("notification");
  return (
    <Toast.Portal {...portalProps}>
      <Toast.Viewport
        data-slot="toast-viewport"
        aria-label={messages.notifications}
        aria-live="off"
        style={layer}
        className={anchored ? "outline-none" : cn(
          "pointer-events-none fixed flex w-max max-w-[calc(100vw-var(--qy-space-6)*2)] max-h-[calc(100vh-var(--qy-space-6)*2)] flex-col gap-(--qy-action-gap) overflow-y-auto outline-none",
          positions[position],
        )}
      >
        {manager.toasts.map((notice) => anchored ? (
          <Toast.Positioner
            key={notice.id}
            toast={notice}
            data-slot="toast-positioner"
            className="w-max max-w-[calc(100vw-var(--qy-space-6)*2)]"
            {...notice.positionerProps}
            style={state => ({ ...layer, ...(typeof notice.positionerProps?.style === "function" ? notice.positionerProps.style(state) : notice.positionerProps?.style) })}
          >
            <NoticeBody notice={notice} manager={manager} anchored />
          </Toast.Positioner>
        ) : <NoticeBody key={notice.id} notice={notice} manager={manager} />)}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export function ToastProvider({ children, position = "bottom-right", portalProps, ...props }: ToastProviderProps): React.ReactElement {
  return (
    <Toast.Provider toastManager={toastManager} {...props}>
      {children}
      <Notices position={position} portalProps={portalProps} />
    </Toast.Provider>
  );
}
export function AnchoredToastProvider({ children, portalProps, ...props }: AnchoredToastProviderProps): React.ReactElement {
  return (
    <Toast.Provider toastManager={anchoredToastManager} {...props}>
      {children}
      <Notices portalProps={portalProps} anchored />
    </Toast.Provider>
  );
}
export { Toast as ToastPrimitive };
