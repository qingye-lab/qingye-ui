"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconAlertOctagon, IconAlertTriangle, IconCircleCheck, IconInfoCircle } from "@tabler/icons-react";
import type * as React from "react";
import { useUILocale } from "../locale";
import { toneTextClassName } from "../status-tone";
import { cn } from "../utils";
import { Heading, type HeadingProps } from "./typography";

export type ResultTone = "neutral" | "info" | "success" | "warning" | "danger";
export type ResultProps = useRender.ComponentProps<"div"> & {
  /**
   * 这次操作的结果类别，由调用方按真实事件声明；组件不从文字或数值猜成败。
   * 「没有权限」这类不是成败的结果，用 neutral 或 warning 加自己的 icon，类别仍由调用方判断。
   */
  tone?: ResultTone;
  /** 状态标记。省略时按 tone 给默认图标（neutral 没有）；传节点则用它；`false` 不放标记。 */
  icon?: React.ReactNode | false;
};

const toneIcons = { info: IconInfoCircle, success: IconCircleCheck, warning: IconAlertTriangle, danger: IconAlertOctagon } as const;

/**
 * 一次操作的结果：标记 + 标题 + 说明 + 去向，自成一块（提交完成、保存失败、没有权限）。
 * - 与 Empty 的分工：Empty 说「这里还没有内容」（零结果、未知、不适用），是一块区域的状态；
 *   Result 说「刚才那件事的结局」，是一次动作的回执，类别（成功、失败……）由事件决定，并总带着下一步的去向。
 *   二者的标题、说明、动作三件套同形（同一套间隔角色），区别只在 Result 多一个标记、少一个 state。
 * - 与 Alert 的分工：Alert 是在场对象旁的一句提示，不占据版面；Result 取代该处的内容，独占一块。
 * - 类别的通道与 Alert 相同：色相之外有形状不同的默认图标，和只给读屏的类别前缀（走 locale，alertToneLabel）。
 *   去掉图标不等于去掉类别，前缀不随图标走。
 * - 左对齐，与 Empty 同（不居中、不加框）；标记大小是预设：两材高（40px），比一材高的标题明显大一档，
 *   又不抢过标题；颜色只落在标记上（取 status-tone.ts 的类别文字色，与 Badge、StatusDot 同一色相），标题与说明是墨色。
 * - 不自动宣告：成功或失败是否要读给用户听，由应用按真实事件决定（传 role="status" / "alert"）。
 */
export function Result({ tone = "neutral", icon, children, className, render, ...props }: ResultProps) {
  const { messages } = useUILocale();
  const Icon = tone === "neutral" ? undefined : toneIcons[tone];
  const mark = icon === false ? null : icon !== undefined ? icon : Icon ? <Icon data-slot="result-icon" aria-hidden="true" /> : null;
  return useRender({
    defaultTagName: "div",
    render,
    props: mergeProps({ "data-slot": "result", "data-tone": tone }, props, {
      children: <>
        {mark && <span data-slot="result-mark" className={cn("inline-flex shrink-0 [&>svg]:size-[calc(2*var(--qy-cai))]", tone === "neutral" ? "text-muted-foreground" : toneTextClassName[tone])}>{mark}</span>}
        {tone !== "neutral" && <span data-slot="result-category" className="sr-only">{messages.alertToneLabel(tone)}</span>}
        {children}
      </>,
      className: cn("flex min-w-0 flex-col items-start gap-(--qy-panel-gap) text-body", className),
    }),
  });
}

export type ResultTitleProps = HeadingProps;
export function ResultTitle({ className, ...props }: ResultTitleProps) { return <Heading data-slot="result-title" className={cn("text-balance", className)} {...props} />; }

export type ResultDescriptionProps = useRender.ComponentProps<"p">;
export function ResultDescription({ render, className, ...props }: ResultDescriptionProps) {
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "result-description", className: cn("m-0 min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}

export type ResultActionsProps = useRender.ComponentProps<"div">;
export function ResultActions({ render, className, ...props }: ResultActionsProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "result-actions", className: cn("flex min-w-0 flex-wrap items-center gap-(--qy-action-gap)", className) }, props) });
}
