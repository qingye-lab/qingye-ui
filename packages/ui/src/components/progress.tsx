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
  return <ProgressPrimitive.Track data-slot="progress-track" {...props} className={state => cn("h-(--qy-readout-track-size) w-full min-w-0 overflow-hidden rounded-marker bg-(--qy-groove-surface)", typeof className === "function" ? className(state) : className)} />;
}
export type ProgressIndicatorProps = React.ComponentProps<typeof ProgressPrimitive.Indicator>;
/**
 * 基础层 §6、§12（2026-10-05 打磨）：不确定进度曾是「透明底 + 1px 上下虚线」——
 * 它和确定态的实心条不是同一样东西，页面上看是一根细虚线，读者无法把它读成
 * 「正在进行、只是还不知道比例」。
 *
 * 现在两种状态同形：确定态是一段实心填充（宽度就是进度），不定态是一段同高、
 * 同填充色、同圆角的**移动条**，它的移动本身表达「在动，但比例未知」。形态一致，
 * 差别只落在「位置是否可知」这一条真实事实上（design.md「状态不是互斥的一串皮肤」）。
 * 数据由应用持有；这里不推断进度，也不把移动当成完成。
 */
export function ProgressIndicator({ className, ...props }: ProgressIndicatorProps) {
  return <ProgressPrimitive.Indicator data-slot="progress-indicator" {...props} className={state => cn("h-full rounded-marker bg-primary", state.status === "indeterminate" && "qy-progress-indeterminate", typeof className === "function" ? className(state) : className)} />;
}
export function ProgressLabel({ className, ...props }: React.ComponentProps<typeof ProgressPrimitive.Label>) {
  return <ProgressPrimitive.Label data-slot="progress-label" {...props} className={state => cn("min-w-0 text-label wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export function ProgressValue({ children, className, ...props }: React.ComponentProps<typeof ProgressPrimitive.Value>) {
  const { messages } = useUILocale();
  return <ProgressPrimitive.Value data-slot="progress-value" {...props} className={state => cn("min-w-0 text-body tabular-nums wrap-anywhere", typeof className === "function" ? className(state) : className)}>{children === undefined ? (formatted, actualValue) => actualValue === null ? messages.buttonInProgress : formatted : children}</ProgressPrimitive.Value>;
}
export { ProgressPrimitive };
