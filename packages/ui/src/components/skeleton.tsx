"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type SkeletonProps = useRender.ComponentProps<"div"> & { label?: string };
export type SkeletonLineProps = useRender.ComponentProps<"div">;
export type SkeletonBlockProps = useRender.ComponentProps<"div">;

/*
 * 骨架屏（2026-10-09 按 design.md 重做）：内容尚未到达时，把将到之物的位置与形状摆出来，
 * 到达后原位替换、不跳位。每个值回答「哪条关系决定了它」：
 * - 名实相符：加载是应用的事实，何时挂载、何时换成真内容由应用决定；这里只表达「正在加载」。
 *   证据是一个 status 与一句话，不是动画（「动画是证据的增强，不是证据本身」）；形状对辅助技术隐藏。
 *   不自行超时：久等不等于失败，超过应用能容忍的时间由应用改交 Empty（unknown）或错误，不由这里宣布。
 * - 以材为祖：正文行高 = 一材（`--qy-text-body-leading`），所以一行骨架占一材、行与行之间不留缝，
 *   N 行骨架正好占 N 行正文的高度，真内容到达时版面不动。条本身高 材 − 2 分（上下各留一分，
 *   即字面在行内的留白）；条的转角沿用全库的 round(高 × 5/16)（12px → 4px，应物象形）。
 * - 墨分五色：占位是「还没有内容的内嵌面」，取清染（`--qy-surface-inset`，4%）；
 *   小面积的条按「染随面积」深一级，取清墨 8%（`--qy-surface-hover` 的值）。只用透明的墨，
 *   放在纸上、面板上、清染面上都比所在的面深一级。
 * - 气韵生动：不脉动、不闪。等待本身没有「变化」可说，循环的明灭只是装饰（NG6）；
 *   唯一的动是内容到达时的原位淡入，由调用方挂载真内容时承担。
 * - 已有内容刷新时保留仍然有效的工作面：骨架只用于首次到达，不用于覆盖已有内容的刷新。
 * 不提供独立的转圈图形：图形不单独成为状态（见 StatusDot）。
 * 预设（无关系可推）：整块的默认高度 5 材。
 */
export function Skeleton({ label, className, children, render, ref, ...props }: SkeletonProps) {
  const { messages } = useUILocale();
  const name = label?.trim() || messages.loading;
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ role: "status", "aria-busy": true, "data-slot": "skeleton" }, props, {
    className: cn("flex min-w-0 flex-col", className),
    children: <><span className="sr-only">{name}</span>{children}</>,
  }) });
}

/** 一行文字的位置；宽度由调用方的 className 给出（默认占满）。 */
export function SkeletonLine({ className, render, ref, ...props }: SkeletonLineProps) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "aria-hidden": true, "data-slot": "skeleton-line" }, props, {
    className: cn("flex h-(--qy-cai) w-full items-center before:block before:h-[calc(var(--qy-cai)-2*var(--qy-fen))] before:w-full before:rounded-[round(calc((var(--qy-cai)-2*var(--qy-fen))*5/16),1px)] before:bg-(--qy-surface-hover)", className),
  }) });
}

/** 图、图表、表格等整块内容的位置；高度由调用方的 className 给出（默认 5 材）。 */
export function SkeletonBlock({ className, render, ref, ...props }: SkeletonBlockProps) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "aria-hidden": true, "data-slot": "skeleton-block" }, props, {
    className: cn("h-[calc(5*var(--qy-cai))] w-full rounded-panel bg-surface-inset", className),
  }) });
}
