"use client";

import { Toast } from "@base-ui/react/toast";
import { CheckIcon, CircleHelpIcon, CircleXIcon, HourglassIcon, InfoIcon, LoaderCircleIcon, TriangleAlertIcon, XIcon } from "lucide-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";

export type ToastPosition = "top-left" | "top-center" | "top-right" | "bottom-left" | "bottom-center" | "bottom-right";
export interface ToastProviderProps extends Toast.Provider.Props {
  position?: ToastPosition;
  portalProps?: React.ComponentProps<typeof Toast.Portal> | undefined;
  /** A pending episode becomes persistent unknown after this deadline; default 30000 ms. */
  loadingTimeout?: number;
}
export interface AnchoredToastProviderProps extends Toast.Provider.Props {
  portalProps?: React.ComponentProps<typeof Toast.Portal> | undefined;
  loadingTimeout?: number;
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
function validateDeadline(value: number) {
  if (!Number.isInteger(value) || value < 1 || value > 2_147_483_647) {
    throw new RangeError("loadingTimeout must be an integer from 1 to 2147483647 ms");
  }
}

// A deadline changes confidence, not the application's title, description or result.
// Commit the expiry from an effect so a real result in the same batch wins.
function useNoticeDeadline(notice: Notice, manager: Manager, loadingTimeout: number) {
  const pending = isPending(notice.type);
  const [overdue, setOverdue] = React.useState(false);
  const wasPending = React.useRef(pending);
  React.useEffect(() => {
    if (!pending) return;
    setOverdue(false);
    const timer = setTimeout(() => setOverdue(true), loadingTimeout);
    return () => clearTimeout(timer);
  }, [notice.id, pending, loadingTimeout]);
  React.useLayoutEffect(() => {
    if (notice.transitionStatus === "ending") return;
    const freshEpisode = pending && !wasPending.current;
    wasPending.current = pending;
    if (freshEpisode && overdue) setOverdue(false);
    if (overdue && pending && !freshEpisode) manager.update(notice.id, { type: "unknown", timeout: 0 });
    else if (isPersistent(notice.type) && notice.timeout !== 0) manager.update(notice.id, { timeout: 0 });
  }, [notice.id, notice.type, notice.timeout, notice.transitionStatus, overdue, pending, manager]);
  return overdue && notice.type === "unknown";
}

function NoticeBody({ notice, manager, loadingTimeout, anchored = false }: {
  notice: Notice; manager: Manager; loadingTimeout: number; anchored?: boolean;
}) {
  const { messages } = useUILocale();
  const overdue = useNoticeDeadline(notice, manager, loadingTimeout);
  const type = notice.type;
  const state = type === "waiting" ? messages.buttonWaiting
    : type === "loading" || type === "in-progress" ? messages.buttonInProgress
    : type === "unknown" ? messages.buttonUnknown
    : type === "error" || type === "failed" ? messages.buttonFailed
    : type === "success" ? messages.toastSuccess : undefined;
  const Icon = type === "waiting" ? HourglassIcon
    : type === "loading" || type === "in-progress" ? LoaderCircleIcon
    : type === "unknown" ? CircleHelpIcon
    : type === "error" || type === "failed" ? CircleXIcon
    : type === "success" ? CheckIcon
    : type === "warning" ? TriangleAlertIcon : InfoIcon;
  const title = overdue ? messages.toastResultUnknown : notice.title;
  const high = notice.priority === "high";
  const [focused, setFocused] = React.useState(false);
  const messageRole = !high || overdue ? "status" : focused ? "alert" : undefined;
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
        "pointer-events-auto w-full min-w-0 rounded-overlay border border-border-strong bg-surface-raised text-foreground outline-none focus-visible:border-ring data-limited:hidden",
        notice.data?.tooltipStyle ? "p-(--qy-space-2)" : "p-(--qy-panel-padding-sm)",
      )}
      {...rootProps}
      onFocusCapture={(event) => { setFocused(true); onFocusCapture?.(event); }}
      onBlurCapture={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); onBlurCapture?.(event); }}
    >
      <Toast.Content data-slot="toast-content" className="flex items-start gap-(--qy-action-gap)">
        <span data-slot="toast-icon" aria-hidden="true" className="flex min-h-(--qy-control-sm-narrow) shrink-0 items-center sm:min-h-(--qy-control-sm)">
          <Icon className="size-(--qy-control-md-icon-narrow) sm:size-(--qy-control-md-icon)" />
        </span>
        <div className="min-w-0 flex-1">
          <div data-slot="toast-message" role={messageRole} aria-live={messageRole === "alert" ? "assertive" : messageRole ? "polite" : "off"} aria-atomic="true">
            {state && !overdue ? <p data-slot="toast-state" className="text-support text-muted-foreground">{state}</p> : null}
            {title != null ? <Toast.Title data-slot="toast-title" className="text-body-strong wrap-anywhere">{title}</Toast.Title> : null}
            {overdue ? (
              <Toast.Description data-slot="toast-description" className="text-body wrap-anywhere">
                {notice.title}{notice.title != null ? " " : null}{notice.description}{" "}{messages.toastResultUnknownDescription}
              </Toast.Description>
            ) : notice.description != null ? (
              <Toast.Description data-slot="toast-description" className="text-body wrap-anywhere" />
            ) : null}
          </div>
          {notice.actionProps ? (
            <div data-slot="toast-actions" className="mt-(--qy-action-gap)">
              <Toast.Action data-slot="toast-action" render={<Button size="sm" variant="bordered" />} />
            </div>
          ) : null}
        </div>
        <Toast.Close data-slot="toast-close" aria-label={messages.closeNotification} render={<Button size="sm" shape="icon" variant="quiet" />}>
          <XIcon />
        </Toast.Close>
      </Toast.Content>
    </Toast.Root>
    {high && overdue && !focused ? <div className="sr-only" role="status" aria-live="polite" aria-atomic="true">{messages.toastResultUnknown} {notice.title} {notice.description}</div> : null}
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
function Notices({ position = "bottom-right", portalProps, loadingTimeout, anchored = false }: {
  position?: ToastPosition; portalProps?: React.ComponentProps<typeof Toast.Portal> | undefined; loadingTimeout: number; anchored?: boolean;
}) {
  const manager = Toast.useToastManager<ToastData>();
  const { messages } = useUILocale();
  return (
    <Toast.Portal {...portalProps}>
      <Toast.Viewport
        data-slot="toast-viewport"
        aria-label={messages.notifications}
        aria-live="off"
        className={anchored ? "outline-none" : cn(
          "pointer-events-none fixed z-50 flex w-max max-w-[calc(100vw-var(--qy-space-6)*2)] max-h-[calc(100vh-var(--qy-space-6)*2)] flex-col gap-(--qy-action-gap) overflow-y-auto outline-none",
          positions[position],
        )}
      >
        {manager.toasts.map((notice) => anchored ? (
          <Toast.Positioner
            key={notice.id}
            toast={notice}
            data-slot="toast-positioner"
            className="z-50 w-max max-w-[calc(100vw-var(--qy-space-6)*2)]"
            {...notice.positionerProps}
          >
            <NoticeBody notice={notice} manager={manager} loadingTimeout={loadingTimeout} anchored />
          </Toast.Positioner>
        ) : <NoticeBody key={notice.id} notice={notice} manager={manager} loadingTimeout={loadingTimeout} />)}
      </Toast.Viewport>
    </Toast.Portal>
  );
}

export function ToastProvider({ children, position = "bottom-right", portalProps, loadingTimeout = 30000, ...props }: ToastProviderProps): React.ReactElement {
  validateDeadline(loadingTimeout);
  return (
    <Toast.Provider toastManager={toastManager} {...props}>
      {children}
      <Notices position={position} portalProps={portalProps} loadingTimeout={loadingTimeout} />
    </Toast.Provider>
  );
}
export function AnchoredToastProvider({ children, portalProps, loadingTimeout = 30000, ...props }: AnchoredToastProviderProps): React.ReactElement {
  validateDeadline(loadingTimeout);
  return (
    <Toast.Provider toastManager={anchoredToastManager} {...props}>
      {children}
      <Notices portalProps={portalProps} loadingTimeout={loadingTimeout} anchored />
    </Toast.Provider>
  );
}
export { Toast as ToastPrimitive };
