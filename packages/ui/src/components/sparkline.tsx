"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useUILocale } from "../locale";
import { assertTone, toneColor, type Tone } from "../tone";
import { cn } from "../utils";

export type SparklineProps = Omit<useRender.ComponentProps<"span">, "children"> & {
  /** 这条线量的是什么，例如「近 12 周同步次数」。它是可访问名称的一部分。 */
  label: string;
  /** 按顺序的数值；null 表示该点未知，画成断开，不当作零。 */
  values: readonly (number | null)[];
  /** 读数的格式，用于可访问摘要。 */
  format?: (value: number) => string;
  /** 坐标宽度（px），默认 5 材。 */
  width?: number;
  /**
   * line：行内趋势，高一材、浓墨线，从属于旁边的读数（默认）。
   * area：独立成块的趋势（指标卡），数据是色——第一色的线加与纸调和的淡面，高度由调用方按材给出。
   */
  appearance?: "line" | "area";
  /** 仅 area：坐标高度（px），默认两材。 */
  height?: number;
  /**
   * 目标区间：画在线的后面、横贯整个宽度的一条带。带是参照，不是数据——用墨阶里的染，不用色相。
   * 纵向范围会把它算进去，所以带永远在画面里。label 命名这个目标（进可访问摘要）。
   */
  band?: { from: number; to: number; label: string };
  /**
   * 状态类别，由调用方声明：线、孤立点与当前点（area 的淡面同样）改用该类别的色。
   * 组件不因数值越出目标带而自己变色——好坏只有应用知道。不给则保持墨色（area 为第一色）。
   */
  tone?: Tone;
};

/*
 * 行内趋势（基础层 §7；表达九法）：
 * - 以材为祖：高一材，像一个字一样坐在文字行里；宽默认 5 材。
 * - 墨分五色：线用浓墨，当前（最后）一点用焦墨——它是读者要找的那个数。默认没有类别，不用色相。
 * - 名实相符：未知的点断开，不连成线，也不当作零；可访问名称给出起止与最高最低。
 * - 没有轴、网格与图例：它从属于旁边的读数，读数与名称由调用方给出。
 * - 目标带（band）：参照用墨不用色（文字是墨，数据是色），画在线后面；纵向范围取数据与带的并集。
 * - 随类赋彩（tone）：类别由调用方声明；类别色之外，摘要里的「高于 / 低于目标」另用文字承担同一事实（灰度检验）。
 */
/** 目标带的填色：清墨（8% 墨，透明，叠在任何纸上读出同一级墨）。预设：清染（4%）在浅色纸上过淡，清墨在浅深两主题、line 与 area 下都看得出，又不压过线（2026-10-12 截图选定）。 */
const bandFill = "color-mix(in srgb, var(--qy-ink) var(--qy-ink-qing), transparent)";

export function Sparkline({ label, values, format, width: widthProp, appearance = "line", height: heightProp, band, tone, className, render, ref, ...props }: SparklineProps) {
  if (!label.trim()) throw new Error("Sparkline requires a nonempty label naming what it measures.");
  if (values.some(value => value !== null && !Number.isFinite(value))) throw new TypeError("Sparkline values must be finite numbers or null for unknown points.");
  if (band && (!Number.isFinite(band.from) || !Number.isFinite(band.to) || band.from >= band.to)) throw new RangeError("Sparkline band requires finite from and to with from < to.");
  if (band && !band.label.trim()) throw new Error("Sparkline band requires a nonempty label naming the target.");
  assertTone(tone, "Sparkline");
  const { code, messages } = useUILocale();
  const number = React.useMemo(() => new Intl.NumberFormat(code), [code]);
  const show = (value: number) => format?.(value) ?? number.format(value);
  const known = values.filter((value): value is number => value !== null);
  // area 且未给宽度：铺满所在的块，量自己的宽度（指标卡里趋势与卡同宽，不缩在一角）。
  const [measured, setMeasured] = React.useState<number | null>(null);
  const box = React.useRef<HTMLElement | null>(null);
  const fluid = appearance === "area" && widthProp === undefined;
  React.useLayoutEffect(() => {
    if (!fluid || !box.current) return;
    const element = box.current; const update = () => setMeasured(Math.round(element.getBoundingClientRect().width) || null);
    update(); const observer = new ResizeObserver(update); observer.observe(element); return () => observer.disconnect();
  }, [fluid]);
  const area = appearance === "area";
  const height = area ? heightProp ?? 40 : 20;
  const width = widthProp ?? (fluid ? measured ?? 100 : 100);
  const inset = 3;
  let paths: string[] = [];
  const lone: { x: number; y: number }[] = [];
  let last: { x: number; y: number } | undefined;
  let bandBox: { top: number; height: number } | undefined;
  let summary = messages.sparklineEmpty(label);
  if (known.length || band) {
    // 纵向范围：数据与目标带的并集，带才不会失真；没有带时只取数据。
    const domain = [...known, ...(band ? [band.from, band.to] : [])];
    const min = Math.min(...domain), max = Math.max(...domain);
    const span = max - min || 1;
    const step = values.length > 1 ? (width - inset * 2) / (values.length - 1) : 0;
    const y = (value: number) => max === min ? height / 2 : inset + (1 - (value - min) / span) * (height - inset * 2);
    const point = (value: number, index: number) => ({ x: inset + index * step, y: y(value) });
    if (band) bandBox = { top: y(band.to), height: y(band.from) - y(band.to) };
    let segment: string[] = [];
    // 夹在未知点之间的孤立一点连不成线，但它是已知的数据——画成小点，图形才与数据一致。
    const close = () => {
      if (segment.length > 1) paths.push(segment.join(""));
      else if (segment.length && last) lone.push(last);
      segment = [];
    };
    values.forEach((value, index) => {
      if (value === null) { close(); return; }
      const p = point(value, index);
      segment.push(`${segment.length ? "L" : "M"}${p.x.toFixed(2)},${p.y.toFixed(2)}`);
      last = p;
    });
    // 末尾的孤立点已有「当前点」标记，不再重复画点。
    if (segment.length > 1) paths.push(segment.join(""));
    if (known.length) {
      const lastValue = [...values].reverse().find((value): value is number => value !== null)!;
      summary = messages.sparklineSummary(label, show(known[0]!), show(lastValue), show(Math.min(...known)), show(Math.max(...known)));
      // 当前值相对目标的位置是组件算得出的事实；两端含在带内。
      if (band) summary += messages.sparklineBand(band.label, show(band.from), show(band.to), lastValue > band.to ? "above" : lastValue < band.from ? "below" : "within");
    } else if (band) summary += messages.sparklineBand(band.label, show(band.from), show(band.to));
  }
  // 线与点的色：有类别用类别色；否则 area 取第一色，line 线用浓墨、当前点用焦墨。
  const ink = (stroke: boolean) => tone ? toneColor[tone] : area ? "var(--qy-chart-1)" : stroke ? "var(--qy-foreground-muted)" : "var(--qy-foreground)";
  return useRender({ defaultTagName: "span", render, ref: [ref ?? null, box], props: mergeProps(props, {
    "data-slot": "sparkline", "data-tone": tone, role: "img", "aria-label": summary,
    className: cn(fluid ? "block w-full" : "inline-block shrink-0 align-top", className),
    style: fluid ? { height } : { width, height },
    children: <svg aria-hidden="true" width={width} height={height} viewBox={`0 0 ${width} ${height}`} className="block overflow-visible">
      {bandBox && <rect data-slot="sparkline-band" x={0} y={bandBox.top} width={width} height={bandBox.height} fill={bandFill} />}
      {area && paths.map((d, index) => { const xs = [...d.matchAll(/[ML]([0-9.]+),/g)].map(m => m[1]); return <path key={`wash${index}`} d={`${d}L${xs.at(-1)},${height}L${xs[0]},${height}Z`} fill={`color-mix(in srgb, ${ink(true)} 12%, transparent)`} stroke="none" />; })}
      {paths.map((d, index) => <path key={index} d={d} fill="none" stroke={ink(true)} strokeWidth={1.5} strokeLinejoin="round" strokeLinecap="round" />)}
      {lone.map((p, index) => <circle key={`lone${index}`} data-slot="sparkline-point" cx={p.x} cy={p.y} r={1.5} fill={ink(true)} />)}
      {last && <circle cx={last.x} cy={last.y} r={2.5} fill={ink(false)} stroke="var(--qy-surface)" strokeWidth={2} paintOrder="stroke" />}
    </svg>,
  }) });
}
