"use client";

import { Radio as SegmentedControlItemPrimitive } from "@base-ui/react/radio";
import { RadioGroup as SegmentedControlPrimitive } from "@base-ui/react/radio-group";
import * as React from "react";
import { OptionScope } from "../labelable-scope";
import { cn } from "../utils";
import { trackClassName, trackItemClassName } from "../track";
import { buttonVariants } from "./button";
import type { ToggleSize } from "./toggle";

export type SegmentedControlSize = ToggleSize;
export type SegmentedControlProps<Value = unknown> = SegmentedControlPrimitive.Props<Value> & { size?: SegmentedControlSize };
export type SegmentedControlItemProps<Value = unknown> = SegmentedControlItemPrimitive.Root.Props<Value> & { size?: SegmentedControlSize };
const SegmentSize = React.createContext<SegmentedControlSize>("md");

/** 分段候选产生一个 radio 值；没有初值时保持未选择，不拥有任何面板。 */
export function SegmentedControl<Value>({ size = "md", className, ...props }: SegmentedControlProps<Value>) {
  // 基础层 §6：并列候选是**同一个值**的几段，围在同一条轨道里（白底加容器线，不是凹槽）。
  // 轨道几何与候选几何分离：候选的高与圆角由轨道倒推，选中段用选中面（--qy-surface-selected）表达当前值，
  // 未选段没有面、字为浓墨。与 ToggleGroup 用同一组轨道 token（src/track.ts）。
  return <SegmentSize.Provider value={size}><SegmentedControlPrimitive data-slot="segmented-control" data-size={size} {...props}
    className={(state) => cn(
      // 整组占一个控件高度（几何见 src/track.ts）。
      trackClassName(size), "flex-wrap items-center",
      typeof className === "function" ? className(state) : className,
    )}
  /></SegmentSize.Provider>;
}

export function SegmentedControlItem<Value>({ size, className, render = <button type="button" />, nativeButton = true, ...props }: SegmentedControlItemProps<Value>) {
  const groupSize = React.useContext(SegmentSize);
  const resolvedSize = size ?? groupSize;
  // 选中段 = 选中面 + 焦墨字（--qy-track-selected 是 --qy-surface-selected 的别名 / -foreground，基础层 §11 反馈梯）。
  // 选中是持续的当前位置，不是命令，不借用 --qy-primary 的实心：筛选不是一个视图里的君（§10），
  // 品牌覆写主操作的填充时，一页里的分段控件不随之变色，也不与主按钮同重。
  // 选中与否靠面的深浅和字的墨色（焦墨 / 浓墨）共同承担，字重不变，整排不跳动；填充已划出范围，不加阴影（NG11）。
  // 两态都是 quiet：焦点是段内一条 1px 线（焦墨），选中段不再是实底，不需要反色焦点线。
  return <OptionScope><SegmentedControlItemPrimitive.Root data-slot="segmented-control-item" data-size={resolvedSize} {...props} render={render} nativeButton={nativeButton}
    className={(state) => cn(
      buttonVariants({ size: resolvedSize, shape: "label", tone: "neutral", variant: "quiet" }),
      // 候选高与圆角由轨道倒推（src/track.ts），覆盖按钮自己的几何。
      trackItemClassName,
      // 状态叠加（基础层 §19）：悬停是当前状态自己的悬停。选中段悬停不变；未选段字为浓墨，
      // 悬停回到焦墨、按下出现按下面（--qy-surface-active）。未选段的悬停样式只在未选时出现，不靠类名先后覆盖。
      state.checked
        ? "bg-track-selected text-track-selected-foreground not-aria-disabled:hover:bg-track-selected not-aria-disabled:active:bg-track-selected"
        : "text-muted-foreground not-aria-disabled:hover:text-foreground not-aria-disabled:active:bg-(--qy-surface-active)",
      state.disabled && "cursor-not-allowed opacity-disabled",
      state.readOnly && "cursor-default",
      typeof className === "function" ? className(state) : className,
    )}
  /></OptionScope>;
}

export { SegmentedControlPrimitive, SegmentedControlItemPrimitive };
