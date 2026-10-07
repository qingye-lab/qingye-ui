"use client";

import { Radio as SegmentedControlItemPrimitive } from "@base-ui/react/radio";
import { RadioGroup as SegmentedControlPrimitive } from "@base-ui/react/radio-group";
import * as React from "react";
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
  // 基础层 §6：并列候选是**同一个值**的几段，围在一个共享凹槽里；选中段从槽里
  // 浮起。轨道几何与候选几何分离——轨道是一个凹面，候选无边框无填充，只有选中
  // 才浮起。与 ToggleGroup、Tabs 用同一组轨道 token，三处不再是三种画法。
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
  // 选中段用 solid：填充表达「当前值」，与勾选、开关、当前菜单项同一角色；
  // 未选段用 quiet：无填充无边框，只有文字——轨道的线已经承担了整组的边界。
  // 选中段不加阴影：填充已经划出它的范围，再加阴影是两种机制说同一件事（NG11）。
  return <SegmentedControlItemPrimitive.Root data-slot="segmented-control-item" data-size={resolvedSize} {...props} render={render} nativeButton={nativeButton}
    className={(state) => cn(
      buttonVariants({ size: resolvedSize, shape: "label", tone: "neutral", variant: state.checked ? "solid" : "quiet" }),
      // 候选高与圆角由轨道倒推（src/track.ts），覆盖按钮自己的几何。
      trackItemClassName,
      // 状态叠加（基础层 §19）：悬停是当前状态自己的悬停。选中段由 solid 给出淡一级的填充；
      // 未选段悬停清墨、按下淡染。不能把未选中的悬停写在选中之后，否则选中段悬停会退回灰底。
      !state.checked && "not-aria-disabled:hover:bg-accent not-aria-disabled:active:bg-(--qy-surface-active)",
      state.disabled && "cursor-not-allowed opacity-64",
      state.readOnly && "cursor-default",
      typeof className === "function" ? className(state) : className,
    )}
  />;
}

export { SegmentedControlPrimitive, SegmentedControlItemPrimitive };
