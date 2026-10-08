"use client";
import * as React from "react";
import { cn } from "../utils";

// Keep Node's ambient types out of the browser library; process may be absent (button.tsx 同一做法)。
declare const process: { env: { NODE_ENV?: string } };

export type CornerMarkTone = "neutral" | "success" | "danger";
type CornerMarkCommon = { children: React.ReactNode; tone?: CornerMarkTone; className?: string; wrapperClassName?: string };
export type CornerMarkProps = CornerMarkCommon & (
  | { count: number; max?: number; dot?: never; label: string }
  | { dot: true; count?: never; max?: never; label: string }
);

const tones: Record<CornerMarkTone, string> = {
  neutral: "bg-foreground text-surface",
  success: "bg-success-foreground text-surface",
  danger: "bg-destructive-fill text-destructive-on-fill",
};

/**
 * 角标：钉在宿主一角的小记号，不是宿主内容的一部分（名实相符）。
 * - 与 Badge 的分工：Badge 是正文里的一段字，跟随所在行的基线与字号；角标钉在角上，
 *   不参与行气，自己是一个独立的点。
 * - 与 StatusDot 的分工：StatusDot 是「彩色圆点 + 墨色名称」，内容本身就要被读到（行内、
 *   有名称文字）；角标是宿主之外附加的提醒，视觉上是装饰性的——数字必须经宿主的可访问名称，
 *   或这里的 label（视觉隐藏文字）才能被读屏听到，不能既不入行文、又不给 label。
 * - 以材为祖：圆点边长复用 --qy-status-dot-size（2 分）；计数档外高 4 分，与 text-dense
 *   的行高相同，文字在盒内天然居中，不必再算一次纵向留白。
 * - 应物象形：圆以标点——角标只标记「有新东西」或「这是谁」，不是可操作的范围，取满圆。
 * - 定位：四舍五入到整像素是「材有美」的要求。偏移量用角标自身盒的一半（translate 50%），
 *   盒边长来自材分（8px、16px，偶数），一半仍是整数，不会落在半像素上。
 * - 纸色圈：角标与宿主贴近时用一圈纸色隔开（ring-(--qy-surface)，2px，和图表标记点的纸色
 *   外圈同一机制）；宿主底色不是纸面时（例如铺 --qy-sidebar 的侧栏行），调用方用 className
 *   覆盖 ring 颜色——库不替调用方猜实际承载面（基础层 G9）。
 * - 墨与彩：默认焦墨；success 用于在线一类有语义的状态点；danger 用于需要立即处理的计数。
 *   三者都是已有的语义类别，没有脱离类别的彩色（NG10）。
 */
export function CornerMark(props: CornerMarkProps) {
  const { children, tone = "neutral", className, wrapperClassName, label } = props;
  const isDot = "dot" in props && props.dot === true;
  const count = "count" in props ? props.count : undefined;
  const max = "max" in props && props.max ? props.max : 99;
  if (typeof process !== "undefined" && process.env.NODE_ENV !== "production" && !label?.trim()) {
    throw new Error("CornerMark requires a non-empty label so its mark reaches assistive technology.");
  }
  // 零计数不是「0」这个数字需要被看到，而是当前没有要提醒的事——角标连带 label 一起消失，
  // 不留一个空壳（基础层 §9：未知、不适用、零不得为了版面整齐混成一种显示；这里零是「无」）。
  const hidden = count !== undefined && count <= 0;
  const content = isDot ? null : count !== undefined ? (count > max ? `${max}+` : String(count)) : null;
  return (
    <span data-slot="corner-mark" className={cn("relative inline-flex shrink-0", wrapperClassName)}>
      {children}
      {!hidden && (
        <span
          aria-hidden="true"
          data-slot="corner-mark-badge"
          className={cn(
            "absolute top-0 end-0 inline-flex shrink-0 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full text-dense numeric font-medium ring-2 ring-(--qy-surface)",
            isDot ? "size-(--qy-status-dot-size)" : "h-[calc(4*var(--qy-fen))] min-w-[calc(4*var(--qy-fen))] px-(--qy-space-1)",
            tones[tone],
            className,
          )}
        >
          {content}
        </span>
      )}
      {!hidden && <span className="sr-only" data-slot="corner-mark-label">{label}</span>}
    </span>
  );
}
