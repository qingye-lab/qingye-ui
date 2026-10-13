"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { assertTone, type Tone, toneFillClassName } from "../tone";
import { cn } from "../utils";

export type SeverityMarkProps = Omit<useRender.ComponentProps<"span">, "children"> & {
  /** 第几级：填满的格数，1 到 max 的整数。没有级别就不放这个标记，所以没有 0。 */
  level: number;
  /** 一共几级：格的总数，2 到 5 的整数。同一列里的标记用同一个 max。 */
  max?: number;
  /** 状态类别：由调用方声明，组件不从级别猜好坏（随类赋彩）。不给时填充用焦墨。 */
  tone?: Tone;
  /** 这一级叫什么，必填。名称由应用声明：库不内置任何级别用词，也不从数字推断。 */
  label: string;
  /**
   * visible：格后面跟着名称。hidden：画面上只剩格，名称仍是这个标记的可访问名称——
   * 名称由同一行的别的文字或表头承担时用。
   */
  name?: "visible" | "hidden";
};

/*
 * 有序级别的标记（基础层 §9）：级别是一个有次序的量，用「填了几格」表达；色相只是附带的类别。
 * - 与 StatusDot 的分工：StatusDot 是对象处于哪一种状态，各状态之间没有次序，所以是一个点；
 *   这里是第几级，所以是一排格。与 Meter 的分工：Meter 是测量，读屏读出数值；级别读出的是名称。
 * - 灰度检验：级别由填充的格数承担，去掉色相仍读得出；未填的格留在原位，读得出一共几级。
 * - 实与空靠形分开，不靠深浅：已填是实心，未填只有一道重墨线（墨阶「未选标记」一级，对纸 ≥ 3:1）。
 *   凹槽的淡墨对纸不到 3:1，而这里空格是读出「几级里的第几级」的一半，不能只靠淡墨。
 * - 应物象形：格是量的刻度，不是身份的点，取方；圆角 = 格宽 × --qy-radius-cap-ratio（小方块仍是方的）。
 * - 几何：格高取状态点的边长（--qy-status-dot-size），与 StatusDot 混排时两种标记同高、同一条行中线；
 *   格间空隙取半分（与读数轨道分格、Proportion 相邻部分同值）。格宽一分是**预设**：
 *   没有更基本的关系推出它；默认三格时整体宽 3 × 1 分 + 2 × 半分 = 4 分，与 md 图标同宽。
 * - 行气：第一格之前有一个零宽的字（data-slot="severity-mark-strut"），使标记自己占满所在那一行的行高、
 *   基线取自那一行的字。名称隐藏时标记仍是一整行高，放进表格或条目里与同行文字同一条中线。
 * - 名称跟随所在那一行的字号与字重（与 StatusDot、Badge 同一规则）。名称与格之间是一个组内间隔。
 * - 根是 role="img"，可访问名称就是 label；格与可见名称都不进可访问树，名称不会被读两遍。
 */
export function SeverityMark({ level, max = 3, tone, label, name: nameMode = "visible", className, render, ref, ...props }: SeverityMarkProps) {
  if (typeof label !== "string" || !label.trim()) throw new Error("SeverityMark requires a non-empty label naming the level; the application decides what a level is called.");
  if (!Number.isInteger(max) || max < 2 || max > 5) throw new RangeError("SeverityMark max must be an integer from 2 to 5.");
  if (!Number.isInteger(level) || level < 1 || level > max) throw new RangeError(`SeverityMark level must be an integer from 1 to max (${max}); omit the mark when there is no level.`);
  assertTone(tone, "SeverityMark");
  if (nameMode !== "visible" && nameMode !== "hidden") throw new RangeError("SeverityMark name must be visible or hidden.");
  const text = label.trim();
  return useRender({ defaultTagName: "span", render, ref, props: mergeProps({ role: "img", "aria-label": text, "data-slot": "severity-mark", "data-level": level, "data-max": max, "data-tone": tone, "data-name": nameMode }, props, {
    className: cn("inline-flex min-w-0 max-w-full items-center text-foreground wrap-anywhere", className),
    children: <>
      <span aria-hidden="true" data-slot="severity-mark-strut" className="select-none">{"​"}</span>
      <span aria-hidden="true" data-slot="severity-mark-cells" className="inline-flex shrink-0 gap-fen-half">
        {Array.from({ length: max }, (_, index) => <span key={index} data-slot="severity-mark-cell" data-state={index < level ? "filled" : "empty"} className={cn("h-(--qy-status-dot-size) w-(--qy-fen) rounded-[calc(var(--qy-fen)*var(--qy-radius-cap-ratio))]", index < level ? (tone ? toneFillClassName[tone] : "bg-foreground") : "border border-input")} />)}
      </span>
      {nameMode === "visible" && <span aria-hidden="true" data-slot="severity-mark-name" className="ms-(--qy-field-gap) min-w-0">{text}</span>}
    </>,
  }) });
}
