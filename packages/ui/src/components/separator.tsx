"use client";

import { Separator as SeparatorPrimitive } from "@base-ui/react/separator";
import * as React from "react";
import { cn } from "../utils";

export type SeparatorProps = React.ComponentProps<typeof SeparatorPrimitive> & {
  /** 已有文字/结构表达分界时，线条仅作装饰。 */
  decorative?: boolean;
};

export function Separator({ orientation = "horizontal", decorative = false, className, ...props }: SeparatorProps) {
  return (
    <SeparatorPrimitive
      data-slot="separator"
      {...props}
      orientation={orientation}
      role={decorative ? "presentation" : props.role ?? "separator"}
      aria-hidden={decorative ? true : props["aria-hidden"]}
      className={(state) => cn(
        // 分界的长轴跟随容器；1px 是线条预设，颜色消费既有强边界角色。
        "shrink-0 border-border-strong",
        state.orientation === "horizontal" ? "h-0 w-full border-b" : "w-0 self-stretch border-s",
        typeof className === "function" ? className(state) : className,
      )}
    />
  );
}

export { SeparatorPrimitive };
