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
  // 基础层 §5、§6：单独立着的 Toggle 是一个独立二态按钮，未按压时由线段划出自己的
  // 范围（与 bordered Button 同一条线）。按压后走 solid——与勾选、开关、分段控件
  // 选中同一角色：「取值与默认不同」用填充表达。
  //
  // 旧实现按压后用 64% 灰填充，与禁用态同色，看起来像用不了。现在按压态有真实
  // 填充与配对前景，禁用仍是降不透明度，两者在明度与色彩两处同时区分。
  // 成组的按压项见 ToggleGroup：它们围在一个共享凹槽里，项内不再画线。
  return <TogglePrimitive data-slot="toggle" data-size={size} data-shape={shape} {...props}
    className={(state) => cn(
      buttonVariants({ size, shape, tone: "neutral", variant: state.pressed ? "solid" : "bordered" }),
      state.disabled && "cursor-not-allowed opacity-64",
      typeof className === "function" ? className(state) : className,
    )}
  />;
}

export { TogglePrimitive };
