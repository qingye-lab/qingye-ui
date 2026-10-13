"use client";

import { Toggle as TogglePrimitive } from "@base-ui/react/toggle";
import { cn } from "../utils";
import { buttonVariants } from "./button";

export type ToggleSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ToggleProps<Value extends string = string> = TogglePrimitive.Props<Value> & {
  size?: ToggleSize;
  shape?: "label" | "icon";
};

/** pressed 表达此按钮的二态事实；名称保持稳定，不推断保存或请求结果。 */
export function Toggle<Value extends string>({ size = "md", shape = "label", className, ...props }: ToggleProps<Value>) {
  // 基础层 §5、§6：单独立着的 Toggle 是一个独立二态按钮，按下前后都是 bordered：淡墨线 + 纸色底，
  // 线不变、外缘与尺寸不变（NG9）。
  //
  // 按下 = 线内填选中面 + 焦墨字（--qy-track-selected / -foreground，基础层 §11 反馈梯）。
  // 按下不是命令，不借用 --qy-primary 的实心：筛选不是一个视图里的君（§10），品牌覆写主操作时它不随之变色。
  // 悬停与按下是当前状态自己的悬停（§19）：按下的 Toggle 悬停不变，不退回未按下的清墨底。
  // 按下态在禁用时仍是真实的按下事实，禁用只降不透明度。
  //
  // 按下与未按下在面（选中面）上区分，与禁用（降不透明度）也区分开：按下的 Toggle 不会读成用不了。
  // 成组的按压项见 ToggleGroup：它们围在同一条轨道里（白底加容器线），项内不再画线。
  return <TogglePrimitive data-slot="toggle" data-size={size} data-shape={shape} {...props}
    className={(state) => cn(
      buttonVariants({ size, shape, tone: "neutral", variant: "bordered" }),
      state.pressed && "bg-track-selected text-track-selected-foreground not-aria-disabled:hover:bg-track-selected not-aria-disabled:active:bg-track-selected",
      state.disabled && "cursor-not-allowed opacity-disabled",
      typeof className === "function" ? className(state) : className,
    )}
  />;
}

export { TogglePrimitive };
