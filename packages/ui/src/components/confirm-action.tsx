"use client";

import * as React from "react";
import { useUILocale } from "../locale";
import { AlertDialog, AlertDialogClose, AlertDialogFooter, AlertDialogHeader, AlertDialogPanel, AlertDialogPopup, AlertDialogPrimitive, AlertDialogTitle, AlertDialogTrigger, type AlertDialogProps, type AlertDialogPopupProps } from "./alert-dialog";
import { Button, ButtonProtection, type ButtonProps, type ButtonState } from "./button";
import { Field, FieldDescription, FieldLabel } from "./field";
import { Input, type InputProps } from "./input";

export type ConfirmActionSnapshot = Readonly<{ objectId: string; objectLabel: string; version: string | number; change: string; consequence: string }>;
export type ConfirmActionProps = Omit<AlertDialogProps, "children"> & {
  snapshot: ConfirmActionSnapshot;
  title: React.ReactNode;
  triggerLabel: React.ReactNode;
  actionLabel: React.ReactNode;
  onConfirm: (snapshot: ConfirmActionSnapshot, event: React.MouseEvent<HTMLButtonElement>) => void;
  state?: ButtonState;
  disabled?: boolean;
  tone?: ButtonProps["tone"];
  confirmationText?: string;
  confirmationLabel?: React.ReactNode;
  triggerProps?: Omit<ButtonProps, "children" | "state" | "disabled">;
  confirmProps?: Omit<ButtonProps, "children" | "state" | "disabled" | "tone">;
  inputProps?: Omit<InputProps, "value" | "defaultValue" | "type" | "name" | "form" | "disabled" | "readOnly" | "size" | "onValueChange">;
  popupProps?: AlertDialogPopupProps;
  children?: React.ReactNode;
};
function snapshotKey(snapshot: ConfirmActionSnapshot, confirmationText: string | undefined) {
  for (const key of ["objectId", "objectLabel", "change", "consequence"] as const) if (!snapshot[key].trim()) throw new TypeError(`ConfirmAction requires non-empty ${key}.`);
  if (typeof snapshot.version === "string" ? !snapshot.version.trim() : !Number.isFinite(snapshot.version)) throw new TypeError("ConfirmAction requires a meaningful version.");
  return JSON.stringify([snapshot.objectId, snapshot.objectLabel, snapshot.version, snapshot.change, snapshot.consequence, confirmationText]);
}
function capture(snapshot: ConfirmActionSnapshot) { return Object.freeze({ ...snapshot }); }

/** Confirmation binds to a reviewed snapshot; requesting an action never announces its result. */
export function ConfirmAction({ snapshot, title, triggerLabel, actionLabel, onConfirm, state = "idle", disabled = false, tone = "danger", confirmationText, confirmationLabel, triggerProps = {}, confirmProps = {}, inputProps = {}, popupProps, children, open: openProp, defaultOpen = false, onOpenChange, ...props }: ConfirmActionProps) {
  const { messages } = useUILocale();
  const consequenceId = React.useId();
  const currentKey = snapshotKey(snapshot, confirmationText);
  const hasConfirmationLabel = React.Children.toArray(confirmationLabel).some(child => typeof child !== "string" || child.trim() !== "");
  if (confirmationText !== undefined && (!confirmationText || !hasConfirmationLabel)) throw new TypeError("ConfirmAction confirmationText requires non-empty text and a visible confirmationLabel.");
  const [localOpen, setLocalOpen] = React.useState(defaultOpen);
  const open = openProp ?? localOpen;
  const [reviewed, setReviewed] = React.useState(() => ({ snapshot: capture(snapshot), key: currentKey }));
  const [stale, setStale] = React.useState(false);
  const [acknowledgment, setAcknowledgment] = React.useState("");
  const wasOpen = React.useRef(false);
  const changed = reviewed.key !== currentKey;
  const invalidated = stale || changed;
  const busy = state === "waiting" || state === "in-progress" || state === "unknown";
  const reread = () => { setReviewed({ snapshot: capture(snapshot), key: currentKey }); setStale(false); setAcknowledgment(""); };
  React.useLayoutEffect(() => {
    if (open && !wasOpen.current) { setReviewed({ snapshot: capture(snapshot), key: currentKey }); setStale(false); setAcknowledgment(""); }
    else if (open && changed) setStale(true);
    wasOpen.current = open;
  }, [open, currentKey, changed, snapshot]);
  const { onClick: onConfirmClick, ...confirmRest } = confirmProps;
  const { onChange: onInputChange, ...inputRest } = inputProps;
  return <AlertDialog {...props} open={open} onOpenChange={(next, details) => {
    onOpenChange?.(next, details);
    if (details.isCanceled) return;
    if (next) reread();
    if (openProp === undefined) setLocalOpen(next);
  }}>
    {/* 触发只是开始一个有后果的流程：描边加同一色调；实心的危险色留给对话框里最后确认的那一下（君位：一个流程一个最重点）。 */}
    {/* 后果在按下之前就可读到：触发按钮关联快照里的后果（只给读屏，界面上由调用方的说明承担）。 */}
    <span id={consequenceId} className="sr-only">{snapshot.consequence}</span>
    <AlertDialogTrigger render={<Button variant="bordered" tone={tone} {...triggerProps} aria-describedby={[triggerProps["aria-describedby"], consequenceId].filter(Boolean).join(" ")} state={state} disabled={disabled} />}>{triggerLabel}</AlertDialogTrigger>
    <AlertDialogPopup {...popupProps}>
      <AlertDialogHeader><AlertDialogTitle>{title}</AlertDialogTitle></AlertDialogHeader>
      <AlertDialogPanel><div data-slot="confirm-action-snapshot" className="grid min-w-0 gap-(--qy-field-gap)">
        <p className="text-label wrap-anywhere">{reviewed.snapshot.objectLabel}</p>
        <p className="text-support text-muted-foreground wrap-anywhere">{messages.bulkVersion}: {reviewed.snapshot.version}</p>
        <p className="text-body wrap-anywhere">{reviewed.snapshot.change}</p>
      </div>
        {invalidated && <div data-slot="confirm-action-changed" className="grid gap-(--qy-field-gap)"><p role="status" className="text-support text-warning-foreground">{messages.confirmContentChanged}</p><Button variant="bordered" onClick={reread}>{messages.confirmReviewLatest}</Button></div>}
        {children}
        {confirmationText !== undefined && <Field><FieldLabel>{confirmationLabel}</FieldLabel><Input {...inputRest} type="text" value={acknowledgment} disabled={disabled || busy || invalidated} onChange={event => { onInputChange?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) setAcknowledgment(event.currentTarget.value); }} /><FieldDescription>{confirmationText}</FieldDescription></Field>}
      </AlertDialogPanel>
      <AlertDialogFooter><ButtonProtection consequence={reviewed.snapshot.consequence}>
        <Button {...confirmRest} tone={tone} state={state} disabled={disabled || invalidated || (confirmationText !== undefined && acknowledgment !== confirmationText)} onClick={event => {
          onConfirmClick?.(event);
          if (event.defaultPrevented || event.baseUIHandlerPrevented || disabled || busy || stale || reviewed.key !== snapshotKey(snapshot, confirmationText) || (confirmationText !== undefined && acknowledgment !== confirmationText)) return;
          onConfirm(reviewed.snapshot, event);
        }}>{actionLabel}</Button>
        <AlertDialogClose render={<Button variant="quiet" />}>{messages.back}</AlertDialogClose>
      </ButtonProtection></AlertDialogFooter>
    </AlertDialogPopup>
  </AlertDialog>;
}

export { AlertDialogPrimitive as ConfirmActionPrimitive };
