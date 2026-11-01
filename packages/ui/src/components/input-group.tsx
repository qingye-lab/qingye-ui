"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { BusyMark } from "../busy-mark";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { fillStateByMember, fillStateMemberBorder } from "../fill-state";
import { inputAdjunctClassName, inputAdjunctFrameClassName } from "../input-adjunct";
import { Button, type ButtonProps } from "./button";
import { Input, type InputProps } from "./input";
import { NumberField, type NumberFieldProps } from "./number-field";
import { SelectTrigger, type SelectTriggerProps } from "./select";
import { Textarea, type TextareaProps } from "./textarea";

export type InputGroupProps = useRender.ComponentProps<"div"> & {
  /**
   * 等待：边界末端出现忙碌标记，根上写 `aria-busy`，并向读屏播报「正在加载」。
   * 与 Button、Select 的 `loading` 同名同义：只说明「这个控件在等」，不替换输入、不禁用输入。
   */
  loading?: boolean;
};
export type InputGroupAddonProps = useRender.ComponentProps<"span"> & {
  /**
   * 附件在边界里的位置。省略时按 DOM 顺序排布（既有行为）；
   * `inline-start` / `inline-end` 固定在行首 / 行尾；`block-start` / `block-end` 独占一整行，在全部成员之上 / 之下。
   */
  align?: "inline-start" | "inline-end" | "block-start" | "block-end";
};
export type InputGroupInputProps = Omit<InputProps, "size" | "unstyled">;
export type InputGroupTextareaProps = Omit<TextareaProps, "unstyled">;
export type InputGroupNumberFieldProps = Omit<NumberFieldProps, "unstyled">;
export type InputGroupSelectTriggerProps = Omit<SelectTriggerProps, "unstyled">;

/**
 * 基础层 §2、用户裁决 2026-10-05：填值容器只有一套几何，跟随密度轴，
 * 与 Input 读同一组角色 token，两者永远同高。这里不选档位：
 * 用 `text-control-md[-mobile]` 是取正文尺寸的既有文字档，紧凑密度只改几何。
 */
/*
 * 附件与值同在一个编辑边界里，读作一体（https://qingye.dev、¥ 120）：二者之间是控件内间隔，
 * 与图标和文字、搜索图标和值同一关系；只有贴着边界的一侧保留填值留白（疏密有致）。
 * 只对行内附件成立：独占一行的 block 附件与值不在同一行，没有「贴着」可言，不参与。
 * 两套判断，互不重叠：
 *   - 没写 align 的附件按 DOM 相邻判断（附件在值前或值后）；
 *   - 写了 inline-start / inline-end 的附件按视觉位置判断：它排在所有成员之前（之后），贴着第一个（最后一个）文字成员，
 *     与它在 DOM 里写在哪里无关。
 * 类名必须是字面量：Tailwind 只扫描源码里的完整字符串，插值拼出来的类不会生成样式。
 */
const adjacency = "[&>[data-slot=input-group-addon]:not([data-align]):has(+[data-slot=input-control])]:pe-0 [&>[data-slot=input-group-addon]:not([data-align])+[data-slot=input-control]_:is(input,[data-slot=input-hint])]:ps-(--qy-control-content-gap) [&>[data-slot=input-control]+[data-slot=input-group-addon]:not([data-align])]:ps-0 [&>[data-slot=input-control]:has(+[data-slot=input-group-addon]:not([data-align]))_:is(input,[data-slot=input-hint])]:pe-(--qy-control-content-gap)";
const alignedAdjacency = "has-[>[data-slot=input-control]]:[&>[data-slot=input-group-addon][data-align=inline-start]]:pe-0 has-[>[data-slot=input-group-addon][data-align=inline-start]]:[&>[data-slot=input-control]:nth-child(1_of_[data-slot=input-control])_:is(input,[data-slot=input-hint])]:ps-(--qy-control-content-gap) has-[>[data-slot=input-control]]:[&>[data-slot=input-group-addon][data-align=inline-end]]:ps-0 has-[>[data-slot=input-group-addon][data-align=inline-end]]:[&>[data-slot=input-control]:nth-last-child(1_of_[data-slot=input-control])_:is(input,[data-slot=input-hint])]:pe-(--qy-control-content-gap)";
const groupProfile = `rounded-(--qy-fill-radius) min-h-(--qy-fill-height-narrow) text-control-md-mobile sm:min-h-(--qy-fill-height) sm:text-control-md [--qy-input-group-padding:var(--qy-fill-padding)] ${adjacency} ${alignedAdjacency}`;

/**
 * 编辑边界：可以装 Input、Textarea、NumberField、Select 触发器这几种成员。
 * 外框不自己知道状态，从成员的真实事实读（焦点、悬停、无效、禁用、只读），见 fill-state.ts。
 */
export function InputGroup({ className, render, ref, loading = false, children, ...props }: InputGroupProps) {
  const { messages } = useUILocale();
  const element = useRender({
    defaultTagName: "div", render, ref,
    props: mergeProps({ "data-slot": "input-group" }, props, {
      "aria-busy": loading || undefined,
      "data-loading": loading ? "" : undefined,
      className: cn(
        "relative flex w-full min-w-0 flex-wrap items-stretch border border-input bg-surface-field text-foreground transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) pointer-coarse:min-h-(--qy-touch-target) data-readonly:border-border",
        fillStateMemberBorder, fillStateByMember,
        groupProfile, className,
      ),
      children: loading ? <>
        {children}
        {/* 忙碌标记在行尾（order-2：在行尾附件之后、下方的 block 附件之前）；ps-0 + pe 留白：贴着前一个成员，前一个成员自己有填值留白。 */}
        <BusyMark className="order-2 self-center ps-0 pe-(--qy-input-group-padding) text-muted-foreground" data-slot="input-group-busy" />
        <span aria-atomic="true" aria-live="polite" className="sr-only" data-slot="input-group-loading-status" role="status">{messages.loading}</span>
      </> : children,
    }),
  });
  return element;
}

// 附件的位置靠 flex 的 order：负值在默认之前，正值在默认之后。
// 次序：block-start(-2) < inline-start(-1) < 按 DOM(0) < inline-end(1) < 忙碌标记(2) < block-end(3)。
// 独占一行 = w-full（父级 flex-wrap，宽度 100% 自成一行）；行高取一行填值的内高，与成员同一行高关系，不另造数。
const alignClassName = {
  "inline-start": "-order-1",
  "inline-end": "order-1",
  "block-start": "-order-2 w-full min-h-[calc(var(--qy-fill-height-narrow)-2*var(--qy-line-width))] sm:min-h-[calc(var(--qy-fill-height)-2*var(--qy-line-width))]",
  "block-end": "order-3 w-full min-h-[calc(var(--qy-fill-height-narrow)-2*var(--qy-line-width))] sm:min-h-[calc(var(--qy-fill-height)-2*var(--qy-line-width))]",
} as const;

/** 附件是静态内容（单位、前缀、图标）；需要动作时用 InputGroupButton。 */
export function InputGroupAddon({ className, render, ref, align, ...props }: InputGroupAddonProps) {
  return useRender({
    defaultTagName: "span", render, ref,
    props: mergeProps({ "data-slot": "input-group-addon", "data-align": align }, props, {
      className: cn("flex min-w-0 max-w-full shrink items-center gap-(--qy-field-gap) px-(--qy-input-group-padding) text-muted-foreground wrap-anywhere", align && alignClassName[align], className),
    }),
  });
}

/**
 * 附件里的静态文字（单位、前缀、范围的分隔符）。只是一段字：不可聚焦，不承担动作。
 * 放在 InputGroupAddon 里；图标随文字同一档（填值图标角色）。
 */
export function InputGroupText({ className, render, ref, ...props }: useRender.ComponentProps<"span">) {
  return useRender({
    defaultTagName: "span", render, ref,
    props: mergeProps({ "data-slot": "input-group-text" }, props, {
      className: cn("flex items-center gap-(--qy-field-gap) text-muted-foreground [&_svg]:pointer-events-none [&_svg]:size-(--qy-fill-icon-narrow) sm:[&_svg]:size-(--qy-fill-icon)", className),
    }),
  });
}

// 成员在行里分剩余宽度，文字区的下限读 --qy-field-min-text（预设，4em：至少四个全宽字符），不是理念公式。
const memberGrow = "flex-1 min-w-[min(100%,calc(var(--qy-input-group-padding)*2+var(--qy-field-min-text)))]";

export function InputGroupInput({ controlClassName, ...props }: InputGroupInputProps) {
  // 保留普通文本可编辑窗口，附件共享剩余容量；过窄时整体按 DOM 顺序换行。
  return <Input {...props} unstyled controlClassName={cn(memberGrow, controlClassName)} />;
}

/**
 * 多行成员：多行内容与 block 附件（标签行、工具行）同在一个边界里。
 * 独占一行（w-full），由 block 附件在它之上或之下；与行内附件同行时按 DOM 顺序共享宽度。
 */
export function InputGroupTextarea({ controlClassName, ...props }: InputGroupTextareaProps) {
  return <Textarea {...props} unstyled controlClassName={cn(memberGrow, controlClassName)} />;
}

/**
 * 数值成员：根不带默认宽度，宽度由外框分配。内部仍用 NumberFieldGroup / NumberFieldInput 组合，
 * 并给它们传 `unstyled`（边线与状态由外框承担）。
 */
export function InputGroupNumberField({ className, ...props }: InputGroupNumberFieldProps) {
  return <NumberField {...props} unstyled className={state => cn(memberGrow, typeof className === "function" ? className(state) : className)} />;
}

/**
 * 选择成员：Select 的触发器放进边界；候选面照常以触发器为锚。
 * 不分剩余宽度：选择是「一个值」，宽度跟着候选走（与独立的 Select 同一关系），剩余宽度留给输入；
 * 要让它占满一行，调用方给 `className="flex-1"`。
 */
export function InputGroupSelectTrigger(props: InputGroupSelectTriggerProps) {
  return <SelectTrigger {...props} unstyled />;
}

export type InputGroupButtonProps = ButtonProps;
/**
 * 编辑边界内的动作（清空、显示密码、应用）：与输入共用同一条外边界，自己不画框，铺满边界内高。
 * 图标形是内高见方、辅助色；文字形保持按钮自己的留白与前景色。
 */
export function InputGroupButton({ variant = "quiet", shape = "label", className, ...props }: InputGroupButtonProps) {
  return <Button data-slot="input-group-button" variant={variant} shape={shape} {...props} className={cn(shape === "icon" ? inputAdjunctClassName : inputAdjunctFrameClassName, "shrink-0", className)} />;
}
