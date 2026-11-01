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

// 不会自己消失的通知：未完成、失败、未知、带动作，或调用方明确给了 timeout 0。
// 它们只能由读者或应用移走，所以不能因为数量上限被收起——收起等于让它消失（WCAG 2.2.1 的同一道理）。
function isHeld(notice: Notice) {
  return isPersistent(notice.type) || notice.actionProps != null || notice.timeout === 0;
}

// 通知只呈现应用给出的事实，不替应用推断结果（用户裁决 2026-10-10：toast 不做推测）。
// 这里唯一的规则是呈现上的：未完成、失败与应用声明的未知不自动消失，等用户看到或应用更新；
// 带动作（如「撤销」）的通知同样常驻——动作需要时间，5 秒内来不及操作（WCAG 2.2.1）。
// 调用方显式给了非零 timeout 也一样改为 0：这是呈现规则，不是默认值。
function usePersistence(notice: Notice, manager: Manager) {
  React.useLayoutEffect(() => {
    if (notice.transitionStatus !== "ending" && (isPersistent(notice.type) || notice.actionProps != null) && notice.timeout !== 0) manager.update(notice.id, { timeout: 0 });
  }, [notice.id, notice.type, notice.actionProps, notice.timeout, notice.transitionStatus, manager]);
}

function NoticeBody({ notice, manager, anchored = false, expanded = false }: {
  notice: Notice; manager: Manager; anchored?: boolean; expanded?: boolean;
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
  // 超出上限的通知默认收起；常驻的、或读者展开了通知区的，照常显示（Base UI 对超限项设了 inert，显示时要解除）。
  const shown = !notice.limited || expanded || isHeld(notice);
  return (
    <>
    <Toast.Root
      toast={notice}
      role="group"
      data-slot={anchored ? "toast-popup" : "toast-root"}
      data-motion={notice.transitionStatus === "ending" ? undefined : "fade-in"}
      swipeDirection={anchored ? [] : ["left", "right"]}
      className={cn(
        // 稳定动效类：调用方改 data-slot 也不丢失 motion.css 的规则；仅非锚定的通知（toast-root）有对应规则。
        !anchored && "qy-toast-root",
        // 通知盖在内容之上，是真实的浮起：与其他浮层同一级阴影（基础层 §6；用户裁决 2026-10-13，此前只有一道线）。
        "pointer-events-auto w-full min-w-0 rounded-overlay border border-border bg-surface-raised text-foreground shadow-raised outline-none focus-visible:border-ring",
        !shown && "hidden",
        // tooltipStyle 是提示面：与 Tooltip、数据图读数同一内缘（外缘到内容，所以减去线宽）。
        notice.data?.tooltipStyle ? "px-[calc(var(--qy-hint-padding-inline)-var(--qy-line-width))] py-[calc(var(--qy-hint-padding-block)-var(--qy-line-width))]" : "p-(--qy-panel-padding-sm)",
      )}
      {...(notice.limited && shown ? { inert: false } : {})}
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

// 上限用动态视口单位（dvh/dvw，Baseline 2025-06）：移动浏览器的地址栏伸缩时，vh 取最大视口，通知区会比眼前可见的区域更高；
// dvh 随地址栏变化，dvw 与 vw 在块轴伸缩的情形下同值，仅为与高度成对。固定定位的视口层可用百分比，但 anchored 的 Positioner 不一定固定于视口，所以统一用视口单位。
// Complete messages in a normal flow; no collapsed stack or second motion policy.
// 离视口边 6 分（--qy-space-6，**预设**：通知悬浮在内容之上，不属于版心，没有更基本的关系推出它）；上限扣去两侧的同一距离。
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
  // 收起的数量如实告诉读者，并给一个就地展开的入口：不新增组件，数量本身就是那个入口。
  // 展开只作用于眼前这一批；收起的通知都离开后恢复，下一批超限时重新收起。
  const [expanded, setExpanded] = React.useState(false);
  const collapsed = manager.toasts.filter(notice => notice.limited && notice.transitionStatus !== "ending" && !isHeld(notice)).length;
  React.useEffect(() => { if (collapsed === 0) setExpanded(false); }, [collapsed]);
  return (
    <Toast.Portal {...portalProps}>
      <Toast.Viewport
        data-slot="toast-viewport"
        // 两个视口同时存在时（全局与就地），名称不同，读屏的地标列表里才分得开。
        aria-label={anchored ? messages.anchoredNotifications : messages.notifications}
        aria-live="off"
        style={layer}
        className={anchored ? "outline-none" : cn(
          "pointer-events-none fixed flex w-max max-w-[calc(100dvw-var(--qy-space-6)*2)] max-h-[calc(100dvh-var(--qy-space-6)*2)] flex-col gap-(--qy-action-gap) overflow-y-auto outline-none",
          positions[position],
        )}
      >
        {manager.toasts.map((notice) => anchored ? (
          <Toast.Positioner
            key={notice.id}
            toast={notice}
            data-slot="toast-positioner"
            className="w-max max-w-[calc(100dvw-var(--qy-space-6)*2)]"
            {...notice.positionerProps}
            style={state => ({ ...layer, ...(typeof notice.positionerProps?.style === "function" ? notice.positionerProps.style(state) : notice.positionerProps?.style) })}
          >
            <NoticeBody notice={notice} manager={manager} anchored />
          </Toast.Positioner>
        ) : <NoticeBody key={notice.id} notice={notice} manager={manager} expanded={expanded} />)}
        {!anchored && !expanded && collapsed > 0 && (
          <Button data-slot="toast-overflow" size="sm" variant="bordered" className="pointer-events-auto self-end" onClick={() => setExpanded(true)}>{messages.moreNotifications(collapsed)}</Button>
        )}
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
