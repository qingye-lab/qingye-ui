"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconX } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import { Toggle, type ToggleProps } from "./toggle";

/*
 * Chip：一枚可以被单独操作的小记号，且只做一件事。两件事不混在一个组件里（一个组件一件事）：
 *   - Chip       = 可移除的记号：一段文字 + 一个移除动作。它是「已经选定的一项」（已选条件、已加的收件人）。
 *   - ChipToggle = 可开关的记号：按下 / 未按下是它的事实（aria-pressed），用于一组条件里逐个启用（筛选）。
 * 二者不合并成一个带 mode 的组件：移除是单向动作，开关是可往返的状态，读屏的角色、键盘与名称规则都不同。
 *
 * 与 Badge 的分工：Badge 是正文里的一段静态文字（没有底、没有交互）；Chip 有自己的边界、能被点击或移除。
 * 不可操作的状态标注用 Badge，不要给 Badge 加移除按钮。
 *
 * 与编辑边界里的项（TagInput 的标签、Combobox 的已选项，见 src/chip.ts）：那一类的几何由所在边界推出（内缩、同心圆角），
 * 离开边界无从成立，所以画法共用 src/chip.ts，不共用本组件；本组件是独立立着的记号，几何读 sm 控件档。
 */

export type ChipProps = Omit<useRender.ComponentProps<"span">, "children" | "onClick"> & {
  /** 记号上的文字，同时决定移除动作的名称（「移除 X」）。 */
  children: string;
  /** 移除。给了它才出现移除按钮；点击、Enter、Space、Backspace、Delete 都会调用。 */
  onRemove?: (event: React.SyntheticEvent<HTMLElement>) => void;
  /** 禁用后移除按钮不可操作；记号本身仍显示。 */
  disabled?: boolean;
};

export function Chip({ children, onRemove, disabled = false, className, render, ref, ...props }: ChipProps) {
  const { messages } = useUILocale();
  return useRender({
    defaultTagName: "span",
    render,
    ref,
    props: mergeProps({
      "data-slot": "chip",
      "data-disabled": disabled ? "" : undefined,
    }, props, {
      className: cn(
        // 几何：高度、文字档、圆角、横向留白都读 sm 控件档（同行的 Button sm 与它同高）；
        // 底是淡墨的中性面（bg-neutral-soft，与编辑边界里的项同一张面），不画线——面承担边界（骨法用笔：一处一种）。
        // 没有移除按钮时右侧补回同样的留白，边界不因有无动作而改变形状（NG9）。
        "inline-flex min-h-(--qy-control-sm-narrow) max-w-full min-w-0 items-center rounded-sm bg-neutral-soft text-foreground sm:min-h-(--qy-control-sm)",
        "ps-(--qy-control-sm-padding) text-control-sm-mobile sm:text-control-sm",
        onRemove ? "pe-0" : "pe-(--qy-control-sm-padding)",
        disabled && "opacity-disabled",
        className,
      ),
      children: <>
        <span data-slot="chip-label" className="min-w-0 truncate">{children}</span>
        {onRemove && <Button
          data-slot="chip-remove" type="button" size="sm" variant="quiet" shape="icon" disabled={disabled}
          // 边长等于记号外高的正方形，圆角与记号一致；图标取 1em（随文字档）。
          className="rounded-sm text-muted-foreground hover:text-foreground [&_svg]:size-[1em] sm:[&_svg]:size-[1em]"
          aria-label={messages.removeTag(children)}
          onClick={event => onRemove(event)}
          onKeyDown={event => {
            if (event.defaultPrevented || event.nativeEvent.isComposing || event.keyCode === 229) return;
            if (event.key === "Backspace" || event.key === "Delete") { event.preventDefault(); onRemove(event); }
          }}
        ><IconX aria-hidden="true" /></Button>}
      </>,
    }),
  });
}

export type ChipToggleProps<Value extends string = string> = Omit<ToggleProps<Value>, "size" | "shape">;

/**
 * 可开关的记号：Toggle 的 sm 档，按下与否由 aria-pressed 向读屏表达，名称保持稳定。
 * 按下态的画法（选中面 + 焦墨字，不借用主色实心）就是 Toggle 的画法——筛选条里的开关与独立的二态按钮是同一件事，不另画一套。
 */
export function ChipToggle<Value extends string>(props: ChipToggleProps<Value>) {
  return <Toggle size="sm" shape="label" {...props} data-slot="chip-toggle" />;
}
