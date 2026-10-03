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
  return <TogglePrimitive data-slot="toggle" data-size={size} data-shape={shape} {...props}
    className={(state) => cn(
      buttonVariants({ size, shape, tone: "neutral", variant: state.pressed ? "solid" : "bordered" }),
      state.disabled && "cursor-not-allowed opacity-64",
      typeof className === "function" ? className(state) : className,
    )}
  />;
}

export { TogglePrimitive };
