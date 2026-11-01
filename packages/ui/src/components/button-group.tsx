"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { isName, received } from "../require-name";
import { borderedPadding, controlSizes } from "../control-size";
import { cn } from "../utils";
import { Inline, type InlineProps } from "./layout";
import { Separator, type SeparatorProps } from "./separator";
import type { ButtonProps } from "./button";

export type ButtonGroupOrientation = "horizontal" | "vertical";
const OrientationContext = React.createContext<ButtonGroupOrientation>("horizontal");

export type ButtonGroupProps = Omit<InlineProps, "gap"> & {
  orientation?: ButtonGroupOrientation;
  /** 连体：相邻按钮的边合并成一条线，只保留整组外侧的圆角；横排纵排都成立。默认保持各自独立、带动作间隔。 */
  attached?: boolean;
};

/*
 * 连体只用组级选择器画，不改 Button：相邻边合并 = 后一个成员向前压一道线宽（--qy-line-width，即 `-ms-line` / `-mt-line`），
 * 两条边框叠成一条；只有整组的首尾保留外侧圆角，其余相邻的角取直。
 * 压住一道线后，被压的那一边是后来者的边，所以悬停与聚焦的成员要升到上层（z-10），它的边线才完整可见；
 * 组上的 `isolate` 把这个层级关在组内，不与页面上其他层叠。
 * 压线只作用于「两个带边线的成员相邻」：两边都有线才有两条线可叠；任一侧没有边线（solid、quiet）时直接相贴，
 * 压线反而会让无线的一方盖住对方一道宽度。中间隔着 ButtonGroupSeparator 时，分隔线自己占一道线，也不压。
 * 圆角取直用逻辑方向（rounded-s / rounded-e），RTL 下仍然是整组的外侧保留圆角。
 */
// Tailwind 靠扫描源码里的完整字面量生成样式，所以这里不拼接字符串。
// 带边线的成员：bordered 按钮（含 render 成 Button 的触发器）、Toggle、组内文字段、Select 触发器、输入框。
const attachedHorizontal = "isolate gap-0! [&>*:not(:first-child)]:rounded-s-none [&>*:not(:last-child)]:rounded-e-none [&>:is([data-variant=bordered],[data-slot=toggle],[data-slot=button-group-text],[data-slot=select-trigger],[data-slot=input-control])+:is([data-variant=bordered],[data-slot=toggle],[data-slot=button-group-text],[data-slot=select-trigger],[data-slot=input-control])]:-ms-line";
const attachedVertical = "isolate gap-0! [&>*:not(:first-child)]:rounded-t-none [&>*:not(:last-child)]:rounded-b-none [&>:is([data-variant=bordered],[data-slot=toggle],[data-slot=button-group-text],[data-slot=select-trigger],[data-slot=input-control])+:is([data-variant=bordered],[data-slot=toggle],[data-slot=button-group-text],[data-slot=select-trigger],[data-slot=input-control])]:-mt-line";
const attachedRaise = "[&>*:is(:hover,:focus-visible,:focus-within)]:z-10";

/** 动作共有一个范围与一个名称（role="group"），但各自保留名称、焦点、状态与禁用。
 *  默认间隔是组内的动作间隔；`attached` 时相邻边合并为一条线（拆分按钮、上一页/下一页）。纵排时换行不再有意义，改为纵向排列。 */
export function ButtonGroup({ orientation = "horizontal", attached = false, className, ...props }: ButtonGroupProps) {
  if (!isName(props["aria-label"]) && !isName(props["aria-labelledby"])) throw new Error(`ButtonGroup requires a nonempty aria-label or aria-labelledby naming the group; received aria-label ${received(props["aria-label"])} and aria-labelledby ${received(props["aria-labelledby"])}.`);
  // 连体不换行：换行会让一条合并的边变成两排各自的端头。
  return <OrientationContext.Provider value={orientation}><Inline role="group" data-slot="button-group" data-orientation={orientation} data-attached={attached ? "" : undefined} {...props} gap="actions" {...(attached ? { wrap: false } : {})}
    className={cn(orientation === "vertical" && "flex-col items-stretch", attached && (orientation === "vertical" ? attachedVertical : attachedHorizontal), attached && attachedRaise, className)} /></OrientationContext.Provider>;
}

/*
 * 静态文字段的几何跟按钮同档：与 Button 读同一张尺寸表与带框留白（src/control-size.ts），
 * 所以与同档 bordered 按钮同高、同边线。它是静态内容，不是命令：用内嵌面（surface-inset）而不是按钮的卡片面，
 * 字为辅助色，没有悬停、按下和指针样式。内嵌面与字色是预设，没有关系推出它们——只有「静态区别于可点」这一条约束。
 */
export type ButtonGroupTextProps = useRender.ComponentProps<"span"> & {
  /** 与同组按钮同一档。 */
  size?: NonNullable<ButtonProps["size"]>;
};

/** 组内的静态文字段（单位、前缀、条数）：与按钮同高、同边框，但不可点击、不进焦点顺序。 */
export function ButtonGroupText({ size = "md", render, className, ref, ...props }: ButtonGroupTextProps) {
  return useRender({
    defaultTagName: "span", render, ref,
    props: mergeProps({
      "data-slot": "button-group-text",
      className: cn("relative inline-flex max-w-full min-w-0 shrink-0 items-center justify-center gap-(--qy-control-content-gap) border border-(--qy-button-bordered-border) bg-surface-inset text-center font-medium text-muted-foreground [&_svg]:shrink-0", controlSizes[size], borderedPadding[size], className),
    }, props),
  });
}

export type ButtonGroupSeparatorProps = Omit<SeparatorProps, "orientation">;

/** 成员之间的分隔线，方向与组相反（横排的组里是竖线）。分界已由成员本身表达，所以默认只是装饰（decorative）。 */
export function ButtonGroupSeparator({ decorative = true, className, ...props }: ButtonGroupSeparatorProps) {
  const groupOrientation = React.useContext(OrientationContext);
  return <Separator data-slot="button-group-separator" decorative={decorative} {...props} orientation={groupOrientation === "vertical" ? "horizontal" : "vertical"} className={className} />;
}
