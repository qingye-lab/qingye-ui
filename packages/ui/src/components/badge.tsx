"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type BadgeTone = "info" | "success" | "warning" | "danger";
export type BadgeProps = useRender.ComponentProps<"span"> & {
  /** neutral 只把这段文字分出来；emphasis 要读者注意到它，但不归入任何状态类别。 */
  variant?: "neutral" | "emphasis";
  /** 状态类别（随类赋彩）：只有标记确实表达这一类事实时才给。给出时自带强调。 */
  tone?: BadgeTone;
};

const tones: Record<BadgeTone, string> = {
  info: "text-info-foreground",
  success: "text-success-foreground",
  warning: "text-warning-foreground",
  danger: "text-destructive-foreground",
};

/**
 * 短标记是正文里的一段字（基础层 §9，用户裁决 2026-10-07：不要底色，直接显示文字颜色）。
 * - 没有底、没有边、没有留白：它就是所在那一行里的字，基线、字号、行高都跟随这一行，
 *   不需要另外对齐（行气）。
 * - neutral：浓墨，从正文里退一步；emphasis：焦墨加中等字重；
 *   tone：该状态的文字色加中等字重——类别由调用方声明（随类赋彩），组件不从文字猜。
 * - 与 StatusDot 分工：StatusDot 是「彩色圆点 + 墨色名称」，表达对象的状态；Badge 是一段标注文字。
 */
export function Badge({ variant = "neutral", tone, className, render, ref, ...props }: BadgeProps) {
  return useRender({
    defaultTagName: "span",
    render,
    ref,
    props: mergeProps(
      { "data-slot": "badge", "data-variant": tone ? "tone" : variant, "data-tone": tone },
      props,
      {
        className: cn(
          "min-w-0 rounded-marker wrap-anywhere outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring",
          tone ? tones[tone] : variant === "emphasis" ? "text-foreground" : "text-muted-foreground",
          (tone || variant === "emphasis") && "font-medium",
          className,
        ),
      },
    ),
  });
}
