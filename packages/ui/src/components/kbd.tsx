"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";
export type KbdProps = useRender.ComponentProps<"kbd">;
/** 实际键位的原生展示，不注册快捷键。 */
export function Kbd({ className, render, ref, ...props }: KbdProps) {
  return useRender({ defaultTagName: "kbd", render, ref, props: mergeProps({ "data-slot": "kbd" }, props, {
    className: cn("inline-flex h-[calc(4*var(--qy-fen))] min-w-[calc(4*var(--qy-fen))] max-w-full items-center justify-center rounded-marker border border-border px-(--qy-kbd-padding-inline) align-top my-[calc((var(--qy-cai)-4*var(--qy-fen))/2)] text-[round(0.875em,1px)] leading-none font-mono text-foreground wrap-anywhere", className),
  }) });
}
