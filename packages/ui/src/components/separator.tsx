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
        // 骨法用笔：分节首先靠间距（疏密有致），这条线只是辅助，取清墨；重墨留给「这里可以编辑」的边界。
        "shrink-0 border-border",
        state.orientation === "horizontal" ? "h-0 w-full border-b" : "w-0 self-stretch border-s",
        typeof className === "function" ? className(state) : className,
      )}
    />
  );
}

export { SeparatorPrimitive };
