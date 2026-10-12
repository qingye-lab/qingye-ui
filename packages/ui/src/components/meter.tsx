"use client";
import { Meter as MeterPrimitive } from "@base-ui/react/meter";
import * as React from "react";
import { useUILocale } from "../locale";
import { assertSegments } from "../segments";
import { assertTone, type Tone, toneFillClassName } from "../tone";
import { cn } from "../utils";
export type MeterProps = React.ComponentProps<typeof MeterPrimitive.Root> & {
  /** 状态类别：由调用方声明，组件不从数值猜好坏（随类赋彩）。不给时指示用主色。 */
  tone?: Tone;
  /**
   * 这个量是离散的 n 级时，轨道按 n 个等宽格分开（n 为 2 以上的整数）。值必须落在格的边界上。
   * 格间空隙是透明的，规则见 utilities.css 的读数轨道分格。
   */
  segments?: number;
};
/* 指示读根上声明的类别；Base UI 的指示不带这个事实，所以由根提供。 */
const MeterToneContext = React.createContext<Tone | undefined>(undefined);
export function Meter({ value, min = 0, max = 100, locale, tone, segments, className, style, ...props }: MeterProps) {
  const { code } = useUILocale();
  if (![min, max, value, max - min].every(Number.isFinite) || max <= min || value < min || value > max) throw new RangeError("Meter requires a finite value within a finite increasing range.");
  assertTone(tone, "Meter");
  assertSegments("Meter", segments, value, min, max);
  return <MeterToneContext value={tone}><MeterPrimitive.Root data-slot="meter" data-tone={tone} data-segments={segments} {...props} value={value} min={min} max={max} locale={locale ?? code} style={segments === undefined ? style : state => ({ "--qy-segments": segments, ...(typeof style === "function" ? style(state) : style) } as React.CSSProperties)} className={state => cn("flex min-w-0 flex-col gap-(--qy-field-gap) text-foreground", typeof className === "function" ? className(state) : className)} /></MeterToneContext>;
}
export function MeterTrack({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Track>) {
  return <MeterPrimitive.Track data-slot="meter-track" {...props} className={state => cn("h-(--qy-readout-track-size) w-full min-w-0 overflow-hidden rounded-(--qy-radius-track) bg-(--qy-groove-surface)", typeof className === "function" ? className(state) : className)} />;
}
export function MeterIndicator({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Indicator>) {
  const tone = React.useContext(MeterToneContext);
  return <MeterPrimitive.Indicator data-slot="meter-indicator" {...props} className={state => cn("h-full", tone ? toneFillClassName[tone] : "bg-primary", typeof className === "function" ? className(state) : className)} />;
}
export function MeterLabel({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Label>) {
  return <MeterPrimitive.Label data-slot="meter-label" {...props} className={state => cn("min-w-0 text-label wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export function MeterValue({ className, ...props }: React.ComponentProps<typeof MeterPrimitive.Value>) {
  return <MeterPrimitive.Value data-slot="meter-value" {...props} className={state => cn("min-w-0 text-body tabular-nums wrap-anywhere", typeof className === "function" ? className(state) : className)} />;
}
export { MeterPrimitive };
