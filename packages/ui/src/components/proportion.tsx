"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type ProportionItem = { key: string; label: string; value: number };
export type ProportionProps = Omit<useRender.ComponentProps<"div">, "children"> & {
  /** 整体是什么，例如「存储用量」。 */
  label: string;
  /** 两到五个部分；更多时由调用方把尾部合并成「其他」。 */
  items: readonly ProportionItem[];
  /** 整体的总量。省略时等于各部分之和；大于之和时，剩余部分显示为空槽。 */
  total?: number;
  format?: (value: number) => string;
};

/*
 * 部分与整体（基础层 §7；表达九法）：
 * - 用长度而不是角度表达比例（应物象形：不提供饼图）；与 Meter、Progress 同一条凹槽几何。
 * - 随类赋彩：每个部分是一个类别，按 --qy-chart-1…5 的顺序取色，顺序经过色觉校验。
 *   剩余是凹槽本身（淡墨），不是第六种颜色。
 * - 骨法用笔：相邻部分之间留半分纸色空隙，不描边。
 * - 文字不用数据色：图例的名称与数值用墨阶，色块在旁边承担身份。
 * - 条本身对辅助技术隐藏；图例是完整的文字等价物（名称、数值、百分比）。
 */
export function Proportion({ label, items, total, format, className, render, ref, ...props }: ProportionProps) {
  if (!label.trim()) throw new Error("Proportion requires a nonempty label naming the whole.");
  if (items.length < 2 || items.length > 5) throw new RangeError("Proportion requires two to five parts; fold the rest into one named part. A single part against a limit is a Meter.");
  if (new Set(items.map(item => item.key)).size !== items.length || items.some(item => !item.key.trim() || !item.label.trim())) throw new Error("Proportion parts require unique stable keys and nonempty names.");
  if (items.some(item => !Number.isFinite(item.value) || item.value < 0)) throw new RangeError("Proportion parts must be finite, non-negative values.");
  const sum = items.reduce((acc, item) => acc + item.value, 0);
  const whole = total ?? sum;
  if (!Number.isFinite(whole) || whole <= 0 || whole < sum) throw new RangeError("Proportion total must be positive and at least the sum of its parts.");
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  const percent = React.useMemo(() => new Intl.NumberFormat(code, { style: "percent", maximumFractionDigits: 1 }), [code]);
  const show = (value: number) => format?.(value) ?? number.format(value);
  const rest = whole - sum;
  const legend = [...items.map((item, index) => ({ ...item, color: `var(--qy-chart-${index + 1})` })), ...(rest > 0 ? [{ key: "__rest", label: messages.proportionRest, value: rest, color: "var(--qy-groove-surface)" }] : [])];
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps(props, {
    "data-slot": "proportion", role: "group", "aria-label": label,
    className: cn("grid min-w-0 gap-(--qy-field-gap) text-foreground", className),
    children: <>
      <div data-slot="proportion-track" aria-hidden="true" className="flex h-(--qy-readout-track-size) w-full min-w-0 gap-0.5 overflow-hidden rounded-marker bg-(--qy-groove-surface)">
        {items.map((item, index) => item.value > 0 && <span key={item.key} data-slot="proportion-segment" className="h-full min-w-0.5 basis-0" style={{ flexGrow: item.value, background: `var(--qy-chart-${index + 1})` }} />)}
        {rest > 0 && <span className="h-full basis-0" style={{ flexGrow: rest }} />}
      </div>
      <ul data-slot="proportion-legend" className="m-0 flex min-w-0 list-none flex-wrap gap-x-(--qy-panel-gap) gap-y-(--qy-field-gap) p-0 text-support">
        {legend.map(item => <li key={item.key} className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere">
          <span aria-hidden="true" className="size-(--qy-status-dot-size) shrink-0 rounded-[calc(var(--qy-status-dot-size)/4)]" style={{ background: item.color }} />
          <span>{item.label}</span>
          <span className="numeric text-muted-foreground">{messages.proportionShare(show(item.value), percent.format(item.value / whole))}</span>
        </li>)}
      </ul>
    </>,
  }) });
}
