"use client";
import { Progress as ProgressPrimitive } from "@base-ui/react/progress";
import type * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
export type ProgressProps = React.ComponentProps<typeof ProgressPrimitive.Root>;
export function Progress({ value, min = 0, max = 100, locale, getAriaValueText, className, ...props }: ProgressProps) {
  const { code, messages } = useUILocale();
  if (![min, max, max - min].every(Number.isFinite) || max <= min || (value !== null && (!Number.isFinite(value) || value < min || value > max))) throw new RangeError("Progress requires null or a finite value within a finite increasing range.");
  return <ProgressPrimitive.Root data-slot="progress" {...props} value={value} min={min} max={max} locale={locale ?? code} getAriaValueText={getAriaValueText ?? ((formatted, actualValue) => actualValue === null ? messages.buttonInProgress : formatted)} className={state => cn("flex min-w-0 flex-col gap-(--qy-field-gap) text-foreground", typeof className === "function" ? className(state) : className)} />;
}
export function ProgressTrack({ className, ...props }: React.ComponentProps<typeof ProgressPrimitive.Track>) {
  return <ProgressPrimitive.Track data-slot="progress-track" {...props} className={state => cn("h-(--qy-progress-track-size) w-full min-w-0 overflow-hidden rounded-marker bg-surface-inset", typeof className === "function" ? className(state) : className)} />;
}
export function ProgressIndicator({ className, ...props }: React.ComponentProps<typeof ProgressPrimitive.Indicator>) {
  return <ProgressPrimitive.Indicator data-slot="progress-indicator" {...props} className={state => cn("h-full bg-primary", state.status === "indeterminate" && "w-full border border-dashed border-primary bg-transparent", typeof className === "function" ? className(state) : className)} />;
}
export function ProgressLabel({ className, ...props }: React.ComponentProps<typeof ProgressPrimitive.Label>) {
  return <ProgressPrimitive.Label data-slot="progress-label" {...props} className={state => cn("min-w-0 text-label wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export function ProgressValue({ children, className, ...props }: React.ComponentProps<typeof ProgressPrimitive.Value>) {
  const { messages } = useUILocale();
  return <ProgressPrimitive.Value data-slot="progress-value" {...props} className={state => cn("min-w-0 text-body tabular-nums wrap-anywhere", typeof className === "function" ? className(state) : className)}>{children === undefined ? (formatted, actualValue) => actualValue === null ? messages.buttonInProgress : formatted : children}</ProgressPrimitive.Value>;
}
export { ProgressPrimitive };
