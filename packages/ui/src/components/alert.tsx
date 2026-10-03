"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";
export type AlertProps = useRender.ComponentProps<"div"> & { tone?: "neutral" | "info" | "warning" | "danger" | "success" };
const tones = { neutral: "text-foreground", info: "text-info-foreground", warning: "text-warning-foreground", danger: "text-destructive-foreground", success: "text-success-foreground" };
/** 静态就地说明默认不突发宣告；需要时由调用方显式给 role。 */
export function Alert({ tone = "neutral", className, render, ref, ...props }: AlertProps) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "alert", "data-tone": tone }, props, { className: cn("flex min-w-0 flex-col gap-(--qy-field-gap) wrap-anywhere", tones[tone], className) }) });
}
export function AlertTitle({ className, render, ref, ...props }: useRender.ComponentProps<"div">) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "alert-title" }, props, { className: cn("min-w-0 text-heading wrap-anywhere", className) }) });
}
export function AlertDescription({ className, render, ref, ...props }: useRender.ComponentProps<"div">) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "alert-description" }, props, { className: cn("min-w-0 text-support-mobile wrap-anywhere sm:text-support", className) }) });
}
