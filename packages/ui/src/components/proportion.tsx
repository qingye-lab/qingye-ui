"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { assertTone, type Tone, toneColor } from "../tone";
import { cn } from "../utils";

export type ProportionItem = {
  key: string; label: string; value: number;
  /** 状态类别（危险、警示、成功、信息）。要么所有部分都声明，要么都不声明；同一类别不得出现两次。 */
  tone?: Tone;
};
export type ProportionProps = Omit<useRender.ComponentProps<"div">, "children"> & {
  /** 整体是什么，例如「存储用量」。 */
  label: string;
  /** 两到五个部分；更多时由调用方把尾部合并成「其他」。 */
  items: readonly ProportionItem[];
  /** 整体的总量。省略时等于各部分之和；大于之和时，剩余部分显示为空槽。 */
  total?: number;
  format?: (value: number) => string;
  /**
   * visible：轨道下方列出图例。hidden：画面上只剩轨道，图例仍在文档里、只对辅助技术可见——
   * 图例是这条轨道完整的文字等价物，不能删，只能换承载面（数值由旁边的读数或上下文承担时用）。
   */
  legend?: "visible" | "hidden";
};

/*
 * 部分与整体（基础层 §7；表达九法）：
 * - 用长度而不是角度表达比例（应物象形：不提供饼图）；与 Meter、Progress 同一条凹槽几何。
 * - 随类赋彩：每个部分是一个类别，按 --qy-chart-1…5 的顺序取色，顺序经过色觉校验。
 *   剩余是凹槽本身（淡墨），不是第六种颜色。
 * - 骨法用笔：相邻部分之间留半分纸色空隙，不描边。
 * - 文字不用数据色：图例的名称与数值用墨阶，色块在旁边承担身份。
 * - 条本身对辅助技术隐藏；图例是完整的文字等价物（名称、数值、百分比）。
 * - legend="hidden" 只改图例的承载面（视觉隐藏），不改它的内容：画面上只剩轨道，读屏仍读完整等价物。
 * - tone：部分是调用方声明的状态类别时，改取类别色（与 StatusDot、Badge 同一来源，NG3）。
 *   类别色靠灰度之外的东西区分才算数：同一类别出现两次，两段同色无法区分，故抛错；
 *   一半有类别一半按序取色，读者无法判断色相是类别还是顺序，故要么全有要么全无。
 */
export function Proportion({ label, items, total, format, legend: legendMode = "visible", className, render, ref, ...props }: ProportionProps) {
  if (!label.trim()) throw new Error("Proportion requires a nonempty label naming the whole.");
  if (items.length < 2 || items.length > 5) throw new RangeError("Proportion requires two to five parts; fold the rest into one named part. A single part against a limit is a Meter.");
  if (new Set(items.map(item => item.key)).size !== items.length || items.some(item => !item.key.trim() || !item.label.trim())) throw new Error("Proportion parts require unique stable keys and nonempty names.");
  if (items.some(item => !Number.isFinite(item.value) || item.value < 0)) throw new RangeError("Proportion parts must be finite, non-negative values.");
  items.forEach(item => assertTone(item.tone, "Proportion"));
  const toned = items.filter(item => item.tone !== undefined);
  if (toned.length > 0 && toned.length < items.length) throw new Error("Proportion parts must either all declare a tone or none; mixing tones with series colors makes hue ambiguous.");
  if (new Set(toned.map(item => item.tone)).size !== toned.length) throw new RangeError("Proportion tones must be unique; two parts of the same tone cannot be told apart.");
  if (legendMode !== "visible" && legendMode !== "hidden") throw new RangeError("Proportion legend must be visible or hidden.");
  const sum = items.reduce((acc, item) => acc + item.value, 0);
  const whole = total ?? sum;
  if (!Number.isFinite(whole) || whole <= 0 || whole < sum) throw new RangeError("Proportion total must be positive and at least the sum of its parts.");
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  const percent = React.useMemo(() => new Intl.NumberFormat(code, { style: "percent", maximumFractionDigits: 1 }), [code]);
  const show = (value: number) => format?.(value) ?? number.format(value);
  const rest = whole - sum;
  const colorOf = (item: ProportionItem, index: number) => item.tone ? toneColor[item.tone] : `var(--qy-chart-${index + 1})`;
  const legend = [...items.map((item, index) => ({ ...item, color: colorOf(item, index) })), ...(rest > 0 ? [{ key: "__rest", label: messages.proportionRest, value: rest, color: "var(--qy-groove-surface)" }] : [])];
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps(props, {
    "data-slot": "proportion", role: "group", "aria-label": label,
    className: cn("grid min-w-0 gap-(--qy-field-gap) text-foreground", legendMode === "hidden" && "relative", className),
    children: <>
      <div data-slot="proportion-track" aria-hidden="true" className="flex h-(--qy-readout-track-size) w-full min-w-0 gap-0.5 overflow-hidden rounded-(--qy-radius-track) bg-(--qy-groove-surface)">
        {items.map((item, index) => item.value > 0 && <span key={item.key} data-slot="proportion-segment" className="h-full min-w-0.5 basis-0" style={{ flexGrow: item.value, background: colorOf(item, index) }} />)}
        {rest > 0 && <span className="h-full basis-0" style={{ flexGrow: rest }} />}
      </div>
      <ul data-slot="proportion-legend" data-legend={legendMode} className={cn("m-0 flex min-w-0 list-none flex-wrap gap-x-(--qy-panel-gap) gap-y-(--qy-field-gap) p-0 text-support", legendMode === "hidden" && "sr-only")}>
        {legend.map(item => <li key={item.key} className="inline-flex min-w-0 items-center gap-(--qy-field-gap) wrap-anywhere">
          <span data-slot="legend-key" aria-hidden="true" className="size-(--qy-status-dot-size) shrink-0 rounded-[calc(var(--qy-status-dot-size)/4)]" style={{ background: item.color }} />
          <span>{item.label}</span>
          <span className="numeric text-muted-foreground">{messages.proportionShare(show(item.value), percent.format(item.value / whole))}</span>
        </li>)}
      </ul>
    </>,
  }) });
}
