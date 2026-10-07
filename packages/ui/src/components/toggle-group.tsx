"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import * as React from "react";
import { cn } from "../utils";
import { trackClassName, trackItemClassName } from "../track";
import { Toggle, type ToggleProps, type ToggleSize } from "./toggle";

export type ToggleGroupProps<Value extends string = string> = ToggleGroupPrimitive.Props<Value> & { size?: ToggleSize };
export type ToggleGroupItemProps<Value extends string = string> = Omit<ToggleProps<Value>, "value"> & { value: Value };
const GroupSize = React.createContext<ToggleSize>("md");

/** 单选与多选都用数组表示按压值；单选可以再次按压而返回空集合。 */
export function ToggleGroup<Value extends string>({ size = "md", className, ...props }: ToggleGroupProps<Value>) {
  // 基础层 §6：一组由一个名字命名、由方向键作为一个单位操作的候选，是**同一个
  // 控件的几段**，不是几个各自带框的按钮。与分段控件共用一组轨道 token——
  // 同一种关系（并列候选围在一个凹槽里）只能有一种画法（design.md NG3）。
  // 不提供「是否用轨道」的配置：能组合解决的不增加配置。
  return <GroupSize.Provider value={size}><ToggleGroupPrimitive data-slot="toggle-group" data-size={size} {...props}
    className={(state) => cn(
      trackClassName(size),
      state.orientation === "vertical" ? "flex-col items-stretch" : "flex-wrap items-center",
      typeof className === "function" ? className(state) : className,
    )}
  /></GroupSize.Provider>;
}

export function ToggleGroupItem<Value extends string>({ size, className, ...props }: ToggleGroupItemProps<Value>) {
  const groupSize = React.useContext(GroupSize);
  // 未按压：无边框无填充，只有文字——凹槽已经承担整组的边界。
  // 按压：用 solid 填充，不加阴影（填充已划出范围，NG11）。这与勾选、开关、分段控件的选中同一角色
  // （「取值与默认不同」），并且与禁用态（降不透明度）在明度与色彩两处区分。
  return <Toggle data-slot="toggle-group-item" size={size ?? groupSize} {...props}
    className={(state) => cn(
      // 轨道的边界由轨道的线承担，所以项内不再画 50% 边框；焦点仍是项内一条线。
      "border-transparent bg-transparent text-foreground [--qy-button-bordered-border:transparent]",
      "not-aria-disabled:hover:bg-accent not-aria-disabled:active:bg-(--qy-surface-active)",
      // 候选高与圆角由轨道倒推（src/track.ts），覆盖按钮自己的几何。
      trackItemClassName,
      state.pressed && "border-transparent bg-primary text-primary-foreground [--qy-focus-ring-color:var(--qy-focus-ring-on-solid)] not-aria-disabled:hover:bg-primary-hover not-aria-disabled:active:bg-primary-hover",
      state.disabled && "cursor-not-allowed opacity-64",
      typeof className === "function" ? className(state) : className,
    )}
  />;
}

export { ToggleGroupPrimitive };
