"use client";

import { IconArrowDown, IconArrowUp, IconMinus } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type StatState = "known" | "unknown" | "not-applicable";
export type StatProps = useRender.ComponentProps<"dl"> & { state: StatState };
export function Stat({ state, render, className, ...props }: StatProps) {
  return useRender({ defaultTagName: "dl", render, props: mergeProps({ "data-slot": "stat", "data-state": state, className: cn("m-0 flex min-w-0 flex-col gap-(--qy-field-gap) text-body", className) }, props) });
}
export type StatLabelProps = useRender.ComponentProps<"dt">;
export function StatLabel({ render, className, ...props }: StatLabelProps) {
  return useRender({ defaultTagName: "dt", render, props: mergeProps({ "data-slot": "stat-label", className: cn("min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
export type StatValueProps = useRender.ComponentProps<"dd">;
export function StatValue({ render, className, ...props }: StatValueProps) {
  return useRender({ defaultTagName: "dd", render, props: mergeProps({ "data-slot": "stat-value", className: cn("m-0 flex min-w-0 flex-wrap items-baseline gap-(--qy-field-gap) text-metric numeric wrap-anywhere", className) }, props) });
}
export type StatUnitProps = useRender.ComponentProps<"span">;
export function StatUnit({ render, className, ...props }: StatUnitProps) {
  return useRender({ defaultTagName: "span", render, props: mergeProps({ "data-slot": "stat-unit", className: cn("text-support text-muted-foreground", className) }, props) });
}
export type StatDescriptionProps = useRender.ComponentProps<"dd">;
export function StatDescription({ render, className, ...props }: StatDescriptionProps) {
  return useRender({ defaultTagName: "dd", render, props: mergeProps({ "data-slot": "stat-description", className: cn("m-0 min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}

export type StatDeltaProps = Omit<useRender.ComponentProps<"dd">, "children"> & {
  /** 与参照期相比的变化量，带符号。 */
  value: number;
  /** 参照期，例如「较上周」。没有参照期的变化量无法解读。 */
  period: string;
  /** 变化量的绝对值怎样显示，例如百分比。 */
  format?: (absolute: number) => string;
  /** 这次变化是好是坏，只有应用知道（随类赋彩）：不声明时用墨色，方向由箭头与文字表达。 */
  sentiment?: "good" | "bad" | undefined;
};
/** 变化量：箭头与文字给出方向，颜色只在应用声明好坏时出现。 */
export function StatDelta({ value, period, format, sentiment, render, className, ...props }: StatDeltaProps) {
  if (!Number.isFinite(value)) throw new RangeError("StatDelta requires a finite signed change.");
  if (!period.trim()) throw new Error("StatDelta requires the reference period it compares against.");
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  const direction = value > 0 ? "up" : value < 0 ? "down" : "flat";
  const amount = format?.(Math.abs(value)) ?? number.format(Math.abs(value));
  const Icon = direction === "up" ? IconArrowUp : direction === "down" ? IconArrowDown : IconMinus;
  return useRender({ defaultTagName: "dd", render, props: mergeProps({
    "data-slot": "stat-delta", "data-direction": direction, "data-sentiment": sentiment,
    "aria-label": messages.statDelta(direction, amount, period),
    className: cn("m-0 inline-flex min-w-0 flex-wrap items-center gap-(--qy-control-content-gap) text-support numeric wrap-anywhere",
      sentiment === "good" ? "text-success-foreground" : sentiment === "bad" ? "text-destructive-foreground" : "text-muted-foreground", className),
    children: <><Icon aria-hidden="true" className="size-(--qy-control-sm-icon) shrink-0" /><span aria-hidden="true">{direction === "flat" ? messages.statDeltaFlat : amount}</span><span aria-hidden="true">{period}</span></>,
  }, props) });
}
