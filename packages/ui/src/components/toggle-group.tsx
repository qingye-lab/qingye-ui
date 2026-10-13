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
  // 同一种关系（并列候选围在同一条轨道里）只能有一种画法（design.md NG3）。
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
  // 按压项的面：选中面 + 焦墨字（--qy-track-selected / -foreground，由 Toggle 的按下态给出，基础层 §11 反馈梯）。
  // 按压是持续的当前位置，不是命令，不借用 --qy-primary 的实心：筛选不是一个视图里的君（§10），
  // 品牌覆写主操作的填充时，一页里的切换组不随之变色。填充已划出范围，不加阴影（NG11）。
  // 按压与否靠面的深浅和字的墨色（焦墨 / 浓墨）共同承担，字重不变，整排不跳动。
  // 未按压：无边框无底，字为浓墨；悬停时字回到焦墨并出现悬停面。按压项悬停不变（§19：悬停是当前状态自己的悬停；
  // 未按压的悬停样式只在未按压时出现）。
  return <Toggle data-slot="toggle-group-item" size={size ?? groupSize} {...props}
    className={(state) => cn(
      // 轨道的边界由轨道的线承担，所以项内不再画 bordered 的淡墨线；焦点是项内一条 1px 线（边框变焦墨）。
      "border-transparent [--qy-button-bordered-border:transparent]",
      !state.pressed && "bg-transparent text-muted-foreground not-aria-disabled:hover:text-foreground not-aria-disabled:active:bg-(--qy-surface-active)",
      // 候选高与圆角由轨道倒推（src/track.ts），覆盖按钮自己的几何。
      trackItemClassName,
      state.disabled && "cursor-not-allowed opacity-disabled",
      typeof className === "function" ? className(state) : className,
    )}
  />;
}

export { ToggleGroupPrimitive };
