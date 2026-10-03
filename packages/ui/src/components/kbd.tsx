"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";
export type KbdProps = useRender.ComponentProps<"kbd">;
/** 实际键位的原生展示，不注册快捷键。 */
export function Kbd({ className, render, ref, ...props }: KbdProps) {
  return useRender({ defaultTagName: "kbd", render, ref, props: mergeProps({ "data-slot": "kbd" }, props, {
    className: cn("inline-block min-w-0 max-w-full rounded-marker border border-border bg-surface-subtle px-(--qy-kbd-padding-inline) py-(--qy-kbd-padding-block) text-caption font-mono text-foreground wrap-anywhere", className),
  }) });
}
