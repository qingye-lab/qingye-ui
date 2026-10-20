"use client";

import * as React from "react";
import { useUILocale } from "../locale";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle, type AlertDialogPopupProps } from "./alert-dialog";
import { Button, type ButtonProps } from "./button";

export type ConfirmOptions = {
  title: React.ReactNode;
  /** 必要后果，作为对话框的可访问说明持续可见。 */
  description: React.ReactNode;
  confirmLabel?: React.ReactNode;
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
type Request = {
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
 * One active decision per provider, including its closing phase. Additional requests
 * return false immediately; they never replace reviewed content or form a queue.
 */
export function ConfirmProvider({ children }: ConfirmProviderProps) {
  const { messages } = useUILocale();
  const active = React.useRef<Request | null>(null);
  const [view, setView] = React.useState<{ request: Request; open: boolean } | null>(null);

  const finish = React.useCallback((request: Request, confirmed: boolean) => {
    if (active.current !== request || request.decision !== undefined) return;
    request.decision = confirmed;
    request.removeAbortListener();
    // Resolve the decision now: business execution must not depend on an exit animation.
    request.resolve(confirmed);
    if (request.presented) setView(current => current?.request === request ? { request, open: false } : current);
    else {
      active.current = null;
      setView(current => current?.request === request ? null : current);
    }
  }, []);

  const request = React.useCallback((options: ConfirmOptions, owner: Owner): Promise<boolean> => {
    if (active.current || options.signal?.aborted) return Promise.resolve(false);
    if (!hasContent(options.title) || !hasContent(options.description)) throw new TypeError("confirm requires a non-empty title and description.");
    if ((options.confirmLabel !== undefined && !hasContent(options.confirmLabel)) || (options.cancelLabel !== undefined && !hasContent(options.cancelLabel))) throw new TypeError("confirm action labels must be non-empty.");
    return new Promise(resolve => {
      // Capture the request, rather than retaining a mutable caller-owned options object.
      const pending: Request = {
        owner, options: { ...options, ...(options.popupProps ? { popupProps: { ...options.popupProps } } : {}) },
        returnFocus: typeof document !== "undefined" && document.activeElement instanceof HTMLElement ? document.activeElement : null,
        resolve, removeAbortListener: () => {}, presented: false,
      };
      active.current = pending;
      if (options.signal) {
        const abort = () => finish(pending, false);
        const signal = options.signal;
        signal.addEventListener("abort", abort, { once: true });
        pending.removeAbortListener = () => signal.removeEventListener("abort", abort);
      }
      setView({ request: pending, open: true });
    });
  }, [finish]);
  const cancel = React.useCallback((owner: Owner) => {
    if (active.current?.owner === owner) finish(active.current, false);
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
      const pending = active.current;
      active.current = null;
      if (pending) {
        pending.decision ??= false;
        pending.removeAbortListener();
        pending.resolve(pending.decision);
      }
    };
  }, []);

  const pending = view?.request;
  return <ConfirmContext.Provider value={context}>
    {children}
    {pending && <AlertDialog open={view.open} onOpenChange={next => { if (!next) finish(pending, false); }} onOpenChangeComplete={open => {
      if (!open && active.current === pending && pending.decision !== undefined) {
        active.current = null;
        setView(current => current?.request === pending ? null : current);
      }
    }}>
      <AlertDialogPopup {...pending.options.popupProps} finalFocus={pending.options.popupProps?.finalFocus ?? (() => pending.returnFocus?.isConnected ? pending.returnFocus : true)}>
        <AlertDialogHeader>
          <AlertDialogTitle>{pending.options.title}</AlertDialogTitle>
          <AlertDialogDescription>{pending.options.description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button tone={pending.options.tone ?? "neutral"} onClick={() => finish(pending, true)}>{pending.options.confirmLabel ?? messages.confirm}</Button>
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
