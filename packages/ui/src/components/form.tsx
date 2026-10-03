"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type FormProps = useRender.ComponentProps<"form">;

/** 原生提交范围；值、草稿、就地校验和结果事实由浏览器及应用持有。 */
export function Form({ className, render, ref, ...props }: FormProps) {
  return useRender({
    defaultTagName: "form", render, ref,
    props: mergeProps({ "data-slot": "form" }, props, { className: cn("min-w-0", className) }),
  });
}
