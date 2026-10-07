"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type SparklineProps = Omit<useRender.ComponentProps<"span">, "children"> & {
  /** 这条线量的是什么，例如「近 12 周同步次数」。它是可访问名称的一部分。 */
  label: string;
  /** 按顺序的数值；null 表示该点未知，画成断开，不当作零。 */
  values: readonly (number | null)[];
  /** 读数的格式，用于可访问摘要。 */
  format?: (value: number) => string;
  /** 坐标宽度（px），默认 5 材。高度固定一材。 */
  width?: number;
};

/*
 * 行内趋势（基础层 §7；表达九法）：
 * - 以材为祖：高一材，像一个字一样坐在文字行里；宽默认 5 材。
 * - 墨分五色：线用浓墨，当前（最后）一点用焦墨——它是读者要找的那个数。没有类别，不用色相。
 * - 名实相符：未知的点断开，不连成线，也不当作零；可访问名称给出起止与最高最低。
 * - 没有轴、网格与图例：它从属于旁边的读数，读数与名称由调用方给出。
 */
export function Sparkline({ label, values, format, width: widthProp, className, render, ref, ...props }: SparklineProps) {
  if (!label.trim()) throw new Error("Sparkline requires a nonempty label naming what it measures.");
  if (values.some(value => value !== null && !Number.isFinite(value))) throw new TypeError("Sparkline values must be finite numbers or null for unknown points.");
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  const show = (value: number) => format?.(value) ?? number.format(value);
  const known = values.filter((value): value is number => value !== null);
  const height = 20;
  const width = widthProp ?? 100;
  const inset = 3;
  let paths: string[] = [];
  let last: { x: number; y: number } | undefined;
  let summary = messages.sparklineEmpty(label);
  if (known.length) {
    const min = Math.min(...known), max = Math.max(...known);
    const span = max - min || 1;
    const step = values.length > 1 ? (width - inset * 2) / (values.length - 1) : 0;
    const point = (value: number, index: number) => ({ x: inset + index * step, y: max === min ? height / 2 : inset + (1 - (value - min) / span) * (height - inset * 2) });
    let segment: string[] = [];
    values.forEach((value, index) => {
      if (value === null) { if (segment.length) paths.push(segment.join("")); segment = []; return; }
      const p = point(value, index);
      segment.push(`${segment.length ? "L" : "M"}${p.x.toFixed(2)},${p.y.toFixed(2)}`);
      last = p;
    });
    if (segment.length) paths.push(segment.join(""));
    paths = paths.filter(path => path.includes("L"));
    const lastValue = [...values].reverse().find((value): value is number => value !== null)!;
    summary = messages.sparklineSummary(label, show(known[0]!), show(lastValue), show(min), show(max));
  }
  return useRender({ defaultTagName: "span", render, ref, props: mergeProps(props, {
    "data-slot": "sparkline", role: "img", "aria-label": summary,
    className: cn("inline-block shrink-0 align-top", className),
    style: { width, height },
    children: <svg aria-hidden="true" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block overflow-visible">
      {paths.map((d, index) => <path key={index} d={d} fill="none" stroke="var(--qy-foreground-muted)" strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />)}
      {last && <circle cx={last.x} cy={last.y} r={2.5} fill="var(--qy-foreground)" stroke="var(--qy-surface)" strokeWidth={2} paintOrder="stroke" />}
    </svg>,
  }) });
}
