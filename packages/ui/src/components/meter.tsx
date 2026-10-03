"use client";
import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import type * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
export type MeterProps = React.ComponentProps<typeof MeterPrimitive.Root>;
export function Meter({ value, min = 0, max = 100, locale, className, ...props }: MeterProps) {
  const { code } = useUILocale();
  if (![min, max, value, max - min].every(Number.isFinite) || max <= min || value < min || value > max) throw new RangeError("Meter requires a finite value within a finite increasing range.");
  return <MeterPrimitive.Root data-slot="meter" {...props} value={value} min={min} max={max} locale={locale ?? code} className={state => cn("flex min-w-0 flex-col gap-(--qy-field-gap) text-foreground", typeof className === "function" ? className(state) : className)} />;
}
export function MeterTrack({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Track>) {
  return <MeterPrimitive.Track data-slot="meter-track" {...props} className={state => cn("h-(--qy-meter-track-size) w-full min-w-0 overflow-hidden rounded-marker bg-surface-inset", typeof className === "function" ? className(state) : className)} />;
}
export function MeterIndicator({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Indicator>) {
  return <MeterPrimitive.Indicator data-slot="meter-indicator" {...props} className={state => cn("h-full bg-primary", typeof className === "function" ? className(state) : className)} />;
}
export function MeterLabel({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Label>) {
  return <MeterPrimitive.Label data-slot="meter-label" {...props} className={state => cn("min-w-0 text-label wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export function MeterValue({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Value>) {
  return <MeterPrimitive.Value data-slot="meter-value" {...props} className={state => cn("min-w-0 text-body tabular-nums wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export { MeterPrimitive };
