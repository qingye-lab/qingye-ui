"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type LabelProps = useRender.ComponentProps<"label">;

/** 通用原生标签；Field 内的注册关系由 FieldLabel 承担。 */
export function Label({ className, render, ref, ...props }: LabelProps) {
  return useRender({
    defaultTagName: "label", render, ref,
    props: mergeProps({ "data-slot": "label" }, props, {
      className: cn("min-w-0 max-w-full text-label text-foreground wrap-break-word", className),
    }),
  });
}
