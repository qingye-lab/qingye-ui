"use client";
import * as React from "react";
import { cn } from "../utils";
import { assertTone, type Tone } from "../tone";

/** 与 Badge、StatusDot、Alert 同一组状态类别（tone.ts），另加不施彩的 neutral。 */
export type CornerMarkTone = "neutral" | Tone;
/** 钉在宿主的哪一角。用逻辑方向（start / end）：从右向左的排版里 end 自然落在左边，不必调用方判断。 */
export type CornerMarkPlacement = "top-end" | "bottom-end" | "top-start" | "bottom-start";
/** 宿主的外形：方形宿主（图标、按钮）钉在盒角；圆形宿主（头像）钉在圆周上，见下方定位说明。 */
export type CornerMarkHostShape = "square" | "circle";
/** `label` 是读屏听到的全部：计数写进去，并写真实数（「142 条未读」），不写截断后的「99+」——可见的数字只是它的缩写。 */
type CornerMarkCommon = { children: React.ReactNode; tone?: CornerMarkTone; placement?: CornerMarkPlacement; hostShape?: CornerMarkHostShape; className?: string; wrapperClassName?: string };
export type CornerMarkProps = CornerMarkCommon & (
  | { count: number; max?: number; dot?: never; label: string }
  | { dot: true; count?: never; max?: never; label: string }
);

/* 四角的定位：角标自身盒的中心落在锚点上（translate 各 50%）。
 * - 方形宿主：锚点是宿主盒的角。
 * - 圆形宿主：盒角在圆外，角标会悬空脱开宿主。锚点改为圆周上 45° 的点：它到盒边的距离是 r(1-√2/2)，
 *   占盒边长（2r）的 (1-√2/2)/2 ≈ 14.64%，所以 top / bottom / start / end 各取 14.64%。这是几何推出的比例，不是挑选的值。
 * - RTL：start / end 随书写方向换边，水平位移的方向也必须随之反向（外移），所以每条都带 rtl: 反向。 */
const placements: Record<CornerMarkHostShape, Record<CornerMarkPlacement, string>> = {
  square: {
    "top-end": "top-0 end-0 translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2",
    "bottom-end": "bottom-0 end-0 translate-x-1/2 translate-y-1/2 rtl:-translate-x-1/2",
    "top-start": "top-0 start-0 -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
    "bottom-start": "bottom-0 start-0 -translate-x-1/2 translate-y-1/2 rtl:translate-x-1/2",
  },
  circle: {
    "top-end": "top-[14.64%] end-[14.64%] translate-x-1/2 -translate-y-1/2 rtl:-translate-x-1/2",
    "bottom-end": "bottom-[14.64%] end-[14.64%] translate-x-1/2 translate-y-1/2 rtl:-translate-x-1/2",
    "top-start": "top-[14.64%] start-[14.64%] -translate-x-1/2 -translate-y-1/2 rtl:translate-x-1/2",
    "bottom-start": "bottom-[14.64%] start-[14.64%] -translate-x-1/2 translate-y-1/2 rtl:translate-x-1/2",
  },
};

/* 填充取各类别的文字色（-foreground），数字用纸色：-foreground 按「纸上 4.5:1」定明度，反过来纸色字压在它上面是同一对比。
 * danger 例外，用实底危险填充与它配对的 on-fill 字（Button solid danger 的同一对 token）。 */
const tones: Record<CornerMarkTone, string> = {
  neutral: "bg-foreground text-surface",
  info: "bg-info-foreground text-surface",
  success: "bg-success-foreground text-surface",
  warning: "bg-warning-foreground text-surface",
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
 * - 位置：默认右上（top-end）；placement 可换到四角，在线点常放右下。圆形宿主传 hostShape="circle"。
 * - 定位：四舍五入到整像素是「材有美」的要求。偏移量用角标自身盒的一半（translate 50%），
 *   盒边长来自材分（8px、16px，偶数），一半仍是整数，不会落在半像素上。
 * - 纸色圈：角标与宿主贴近时用一圈纸色隔开（ring-(--qy-surface)，2px，和图表标记点的纸色
 *   外圈同一机制）；宿主底色不是纸面时（例如铺 --qy-sidebar 的侧栏行），调用方用 className
 *   覆盖 ring 颜色——库不替调用方猜实际承载面（基础层 G9）。
 * - 墨与彩：默认焦墨；彩色只取共用的四个状态类别（如 success 标在线、danger 标需要立即处理的计数），
 *   没有脱离类别的彩色（NG10）。
 */
export function CornerMark(props: CornerMarkProps) {
  const { children, tone = "neutral", placement = "top-end", hostShape = "square", className, wrapperClassName, label } = props;
  const isDot = "dot" in props && props.dot === true;
  const count = "count" in props ? props.count : undefined;
  const max = "max" in props && props.max ? props.max : 99;
  // 缺名称抛错，与 Tree、VirtualList 同一契约：不只在开发期——生产里一个读不出的角标同样是缺陷。
  if (typeof label !== "string" || !label.trim()) throw new Error("CornerMark requires a non-empty label so its mark reaches assistive technology.");
  if (tone !== "neutral") assertTone(tone, "CornerMark");
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
          data-placement={placement}
          className={cn(
            "absolute inline-flex shrink-0 items-center justify-center rounded-full text-dense numeric font-medium ring-2 ring-(--qy-surface)",
            placements[hostShape][placement],
            isDot ? "size-(--qy-status-dot-size)" : "h-(--qy-glyph-box) min-w-(--qy-glyph-box) px-(--qy-space-1)",
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
