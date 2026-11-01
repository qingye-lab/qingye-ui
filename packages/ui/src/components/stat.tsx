"use client";

import { IconArrowDown, IconArrowUp, IconMinus } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type StatState = "known" | "unknown" | "not-applicable";
export type StatSize = "md" | "lg" | "xl";
/** 读数的尺寸与数值状态只有 StatValue 需要知道；用上下文传递，不靠后代选择器去猜祖先的 data-size / data-state。 */
const StatContext = React.createContext<{ size: StatSize; state: StatState }>({ size: "md", state: "known" });
export type StatProps = useRender.ComponentProps<"dl"> & {
  state: StatState;
  /**
   * 读数的尺寸档。只有读数本身按它在页面上的位置选大小（概览顶部的数字用 lg，整页只围绕一个数时用 xl）；
   * 标签、单位、说明与变化量的字号不随它变（屋有大小，人无大小）。
   * xl 不另立字号，直接读 display-lg（40/48）：与 lg 的 32 相差 1.25 倍，满足相邻内容档至少 1.2 倍。
   */
  size?: StatSize;
};
/**
 * state 说的是「这个数有没有」，不是对象的状态（对象状态见 StatusDot），与 Chart 的值状态、Empty 的 state 同一组词。
 * 它不施彩（NG10：未知、不适用不是危险也不是警示），只让读数退一步：known 的读数是正文的焦墨，
 * unknown / not-applicable 的读数是浓墨（muted）——那一格里写的是「未知」或「不适用」这样的字，不是量出来的数，
 * 不该与真数同样醒目（墨分五色）；字号、字重、位置不变，同一排读数不会因此错位（NG9）。
 * 文字由应用给出：库不替应用造「未知」两个字，也不把它画成 0 或空。
 */
export function Stat({ state, size = "md", render, className, ...props }: StatProps) {
  const element = useRender({ defaultTagName: "dl", render, props: mergeProps({ "data-slot": "stat", "data-state": state, "data-size": size, className: cn("m-0 flex min-w-0 flex-col gap-(--qy-field-gap) text-body", className) }, props) });
  const context = React.useMemo(() => ({ size, state }), [size, state]);
  return <StatContext.Provider value={context}>{element}</StatContext.Provider>;
}
export type StatLabelProps = useRender.ComponentProps<"dt">;
export function StatLabel({ render, className, ...props }: StatLabelProps) {
  // 与 DescriptionListTerm（名称前景色加字重）画法不同是有意的：描述列表里名称与值并重，读者按名称定位；
  // 指标里读数是君位，名称只是它的注脚，降为辅助字与浓墨，才不与大号读数争。表头（label、浓墨）是第三种关系：列名统领一整列。
  return useRender({ defaultTagName: "dt", render, props: mergeProps({ "data-slot": "stat-label", className: cn("min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
export type StatValueProps = useRender.ComponentProps<"dd">;
export function StatValue({ render, className, ...props }: StatValueProps) {
  const { size, state } = React.useContext(StatContext);
  return useRender({ defaultTagName: "dd", render, props: mergeProps({ "data-slot": "stat-value", "data-state": state, className: cn("m-0 flex min-w-0 flex-wrap items-baseline gap-(--qy-field-gap) wrap-anywhere", size === "xl" ? "text-display-lg" : size === "lg" ? "text-metric-lg" : "text-metric", state !== "known" && "text-muted-foreground", className) }, props) });
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
    className: cn("m-0 inline-flex min-w-0 flex-wrap items-center gap-(--qy-control-content-gap) text-support wrap-anywhere",
      sentiment === "good" ? "text-success-foreground" : sentiment === "bad" ? "text-destructive-foreground" : "text-muted-foreground", className),
    children: <><Icon aria-hidden="true" className="size-(--qy-control-sm-icon) shrink-0" /><span aria-hidden="true">{direction === "flat" ? messages.statDeltaFlat : amount}</span><span aria-hidden="true">{period}</span><span className="sr-only">{messages.statDelta(direction, amount, period)}</span></>,
  }, props) });
}
