"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type SkeletonProps = useRender.ComponentProps<"div"> & { label?: string };
export type SkeletonLineProps = useRender.ComponentProps<"div">;
export type SkeletonBlockProps = useRender.ComponentProps<"div">;

/*
 * 骨架屏：内容尚未到达时，先把它将要占的位置与行数摆出来，到达后不跳位。
 * - 名实相符：加载是应用的事实，由应用决定何时挂载、何时换成真内容；本组件只表达「正在加载」。
 *   外层是一个 status，里面是一句话；形状全部对辅助技术隐藏，所以读屏听到的是一句话而不是一排空块。
 * - 以材为祖：一行骨架占一材（正文一行），条本身高 材 − 2 分，上下各留一分，
 *   与真实文字行叠起来的节奏相同；条的圆角是 1 分（round(12 × 5/16)）。
 * - 墨分五色：填充取墨阶的「清」（与线同浓度），不另设值；脉动幅度、周期（4 × slow）为预设。
 * 不提供独立的转圈图形：图形不单独成为状态（见 StatusDot），等待由按钮的 in-progress 或这里的占位表达。
 */
export function Skeleton({ label, className, children, render, ref, ...props }: SkeletonProps) {
  const { messages } = useUILocale();
  const name = label?.trim() || messages.loading;
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ role: "status", "aria-busy": true, "data-slot": "skeleton" }, props, {
    className: cn("flex min-w-0 flex-col gap-(--qy-field-gap)", className),
    children: <><span className="sr-only">{name}</span>{children}</>,
  }) });
}

/** 一行文字的位置；宽度由调用方的 className 给出（默认占满）。 */
export function SkeletonLine({ className, render, ref, ...props }: SkeletonLineProps) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "aria-hidden": true, "data-slot": "skeleton-line" }, props, {
    className: cn("flex h-(--qy-cai) w-full items-center before:block before:h-[calc(var(--qy-cai)-2*var(--qy-fen))] before:w-full before:rounded-[var(--qy-fen)] before:bg-border", className),
  }) });
}

/** 图、图表、表格等整块内容的位置；高度由调用方的 className 给出（默认 5 材）。 */
export function SkeletonBlock({ className, render, ref, ...props }: SkeletonBlockProps) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "aria-hidden": true, "data-slot": "skeleton-block" }, props, {
    className: cn("h-[calc(5*var(--qy-cai))] w-full rounded-panel bg-border", className),
  }) });
}
