"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconX } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";

/*
 * Chip：可移除的记号——一段文字 + 一个移除动作。它是「已经选定的一项」（已选条件、已加的收件人）。
 * 可开关的筛选条件不是 Chip：那是二态按钮，直接用 Toggle size="sm"（aria-pressed），不另包一层同义组件。
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
