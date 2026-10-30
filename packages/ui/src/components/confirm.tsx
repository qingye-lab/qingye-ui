"use client";

import * as React from "react";
import { useUILocale } from "../locale";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, type AlertDialogPopupProps } from "./alert-dialog";
import { Button, type ButtonProps } from "./button";

export type ConfirmOptions = {
  title: React.ReactNode;
  /** 必要后果，作为对话框的可访问说明持续可见。 */
  description: React.ReactNode;
  /** 确认钮必须说出这个决定具体做什么（「移出」「离开」），不提供「确认」式的通用默认。 */
  confirmLabel: React.ReactNode;
  cancelLabel?: React.ReactNode;
  tone?: ButtonProps["tone"];
  popupProps?: Omit<AlertDialogPopupProps, "children">;
  /** 中止此次决定并返回 false；不会取消应用已经开始的请求。 */
  signal?: AbortSignal;
};

/** true 只表示此次决定获准；异步执行、忙碌与结果仍由调用方持有。 */
export type ConfirmFunction = (options: ConfirmOptions) => Promise<boolean>;
export type ConfirmProviderProps = { children: React.ReactNode };

type Owner = object;
let nextRequestId = 0;
type Request = {
  id: number;
  owner: Owner;
  options: ConfirmOptions;
  returnFocus: HTMLElement | null;
  resolve: (confirmed: boolean) => void;
  removeAbortListener: () => void;
  presented: boolean;
  decision?: boolean;
};
type ConfirmContextValue = {
  request: (options: ConfirmOptions, owner: Owner) => Promise<boolean>;
  cancel: (owner: Owner) => void;
};
const ConfirmContext = React.createContext<ConfirmContextValue | null>(null);

function hasContent(value: React.ReactNode) {
  return React.Children.toArray(value).some(child => typeof child !== "string" || child.trim() !== "");
}

/**
 * One decision is on screen at a time, including its closing phase. Later requests wait in order
 * and open after the previous one has finished closing; each Promise settles on its own.
 * 排队而不是返回 false：false 的含义是「决定者拒绝」，不能同时表示「被占用」（design.md「名实相符」）。
 */
export function ConfirmProvider({ children }: ConfirmProviderProps) {
  const { messages } = useUILocale();
  const active = React.useRef<Request | null>(null);
  const queue = React.useRef<Request[]>([]);
  const [view, setView] = React.useState<{ request: Request; open: boolean } | null>(null);

  // The active slot is free: promote the oldest waiting request, or clear the view.
  const advance = React.useCallback(() => {
    const next = queue.current.shift() ?? null;
    active.current = next;
    setView(next ? { request: next, open: true } : null);
  }, []);

  const finish = React.useCallback((request: Request, confirmed: boolean) => {
    if (request.decision !== undefined) return;
    if (active.current !== request) {
      // Still waiting: leave the queue without ever having been shown.
      const index = queue.current.indexOf(request);
      if (index < 0) return;
      queue.current.splice(index, 1);
      request.decision = confirmed;
      request.removeAbortListener();
      request.resolve(confirmed);
      return;
    }
    request.decision = confirmed;
    request.removeAbortListener();
    // Resolve the decision now: business execution must not depend on an exit animation.
    request.resolve(confirmed);
    if (request.presented) setView(current => current?.request === request ? { request, open: false } : current);
    else advance();
  }, [advance]);

  const request = React.useCallback((options: ConfirmOptions, owner: Owner): Promise<boolean> => {
    if (options.signal?.aborted) return Promise.resolve(false);
    if (!hasContent(options.title) || !hasContent(options.description)) throw new TypeError("confirm requires a non-empty title and description.");
    if (!hasContent(options.confirmLabel) || (options.cancelLabel !== undefined && !hasContent(options.cancelLabel))) throw new TypeError("confirm requires a non-empty confirmLabel; cancelLabel, when given, must be non-empty.");
    return new Promise(resolve => {
      // A waiting request is called from wherever focus is now — possibly inside the dialog ahead of it,
      // which will be gone by its turn. Return to what the request ahead would return to instead.
      const focused = typeof document !== "undefined" && document.activeElement instanceof HTMLElement ? document.activeElement : null;
      const ahead = queue.current.at(-1) ?? active.current;
      // Capture the request, rather than retaining a mutable caller-owned options object.
      const pending: Request = {
        id: ++nextRequestId, owner, options: { ...options, ...(options.popupProps ? { popupProps: { ...options.popupProps } } : {}) },
        returnFocus: ahead && focused?.closest('[role="alertdialog"]') ? ahead.returnFocus : focused,
        resolve, removeAbortListener: () => {}, presented: false,
      };
      if (options.signal) {
        const abort = () => finish(pending, false);
        const signal = options.signal;
        signal.addEventListener("abort", abort, { once: true });
        pending.removeAbortListener = () => signal.removeEventListener("abort", abort);
      }
      if (active.current) { queue.current.push(pending); return; }
      active.current = pending;
      setView({ request: pending, open: true });
    });
  }, [finish]);
  const cancel = React.useCallback((owner: Owner) => {
    for (const waiting of [active.current, ...queue.current]) if (waiting?.owner === owner) finish(waiting, false);
  }, [finish]);
  const context = React.useMemo(() => ({ request, cancel }), [request, cancel]);

  React.useLayoutEffect(() => {
    if (view?.open && active.current === view.request) view.request.presented = true;
  }, [view]);
  React.useLayoutEffect(() => {
    // Activity preserves state while disconnecting effects. Reconcile on resume,
    // when updates can take effect, rather than relying on a hidden cleanup update
    // or on the old popup completing its closing animation.
    setView(current => current && active.current !== current.request ? null : current);
    return () => {
      const pending = [active.current, ...queue.current];
      active.current = null;
      queue.current = [];
      for (const request of pending) {
        if (!request) continue;
        request.decision ??= false;
        request.removeAbortListener();
        request.resolve(request.decision);
      }
    };
  }, []);

  const pending = view?.request;
  return <ConfirmContext.Provider value={context}>
    {children}
    {pending && <AlertDialog key={pending.id} open={view.open} onOpenChange={next => { if (!next) finish(pending, false); }} onOpenChangeComplete={open => {
      if (!open && active.current === pending && pending.decision !== undefined) advance();
    }}>
      <AlertDialogPopup {...pending.options.popupProps} finalFocus={pending.options.popupProps?.finalFocus ?? (() => pending.returnFocus?.isConnected ? pending.returnFocus : true)}>
        <AlertDialogHeader>
          <AlertDialogTitle>{pending.options.title}</AlertDialogTitle>
          <AlertDialogDescription>{pending.options.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button tone={pending.options.tone ?? "neutral"} onClick={() => finish(pending, true)}>{pending.options.confirmLabel}</Button>
          <AlertDialogClose render={<Button variant="quiet" />}>{pending.options.cancelLabel ?? messages.cancel}</AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>}
  </ConfirmContext.Provider>;
}

/** Pending decisions belong to this hook instance and are declined when it unmounts. */
export function useConfirm(): ConfirmFunction {
  const context = React.useContext(ConfirmContext);
  if (!context) throw new Error("useConfirm must be used within ConfirmProvider.");
  const owner = React.useRef<Owner>({});
  const mounted = React.useRef(true);
  React.useLayoutEffect(() => {
    mounted.current = true;
    return () => { mounted.current = false; context.cancel(owner.current); };
  }, [context]);
  return React.useCallback(options => mounted.current ? context.request(options, owner.current) : Promise.resolve(false), [context]);
}
