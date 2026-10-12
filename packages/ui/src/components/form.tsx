"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

/** 提交失败后把焦点交给第一个无效字段；规则见 src/focus-first-invalid.ts。 */
export { focusFirstInvalid } from "../focus-first-invalid";

export type FormProps = useRender.ComponentProps<"form">;

/** 原生提交范围；值、草稿、就地校验和结果事实由浏览器及应用持有。 */
export function Form({ className, render, ref, ...props }: FormProps) {
  return useRender({
    defaultTagName: "form", render, ref,
    props: mergeProps({ "data-slot": "form" }, props, { className: cn("min-w-0", className) }),
  });
}
