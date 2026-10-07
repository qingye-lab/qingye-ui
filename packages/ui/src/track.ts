import type { ToggleSize } from "./components/toggle";

/*
 * 并列候选的轨道（分段控件、切换组、标签页）共用的几何。基础层 §6。
 *
 * 关系：**整组占一个控件高度**。轨道和输入框、按钮常在同一行（筛选条、工具条），
 * 如果轨道外高 = 候选按钮高 + 两侧内缩 + 边框，它就比同一行的输入高出一截
 * （打磨前 32px 输入旁边是 42px 的分段控件，标签行跟着错位）。
 * 因此倒过来推：轨道外高取同档控件外高，候选高 = 外高 − 2 × 内缩 − 2px 边框。
 *
 * md 读填值控件角色层（与 md 按钮同一条规则），因此随密度一起收紧；其余四档读自己的档位。
 * 圆角：轨道取同档控件圆角，候选圆角 = 轨道圆角 − 内缩 − 1px 边框（§4 同心）。
 * 三个变量都声明在轨道上，候选的圆角在同一元素上计算，因此局部改档时同心关系仍成立。
 */
export type TrackSize = ToggleSize;

const outer: Record<TrackSize, string> = {
  xs: "[--qy-track-outer:var(--qy-control-xs-narrow)] sm:[--qy-track-outer:var(--qy-control-xs)] [--qy-track-radius:var(--qy-radius-xs)]",
  sm: "[--qy-track-outer:var(--qy-control-sm-narrow)] sm:[--qy-track-outer:var(--qy-control-sm)] [--qy-track-radius:var(--qy-radius-sm)]",
  md: "[--qy-track-outer:var(--qy-fill-height-narrow)] sm:[--qy-track-outer:var(--qy-fill-height)] [--qy-track-radius:var(--qy-fill-radius)]",
  lg: "[--qy-track-outer:var(--qy-control-lg-narrow)] sm:[--qy-track-outer:var(--qy-control-lg)] [--qy-track-radius:var(--qy-radius-control)]",
  xl: "[--qy-track-outer:var(--qy-control-xl-narrow)] sm:[--qy-track-outer:var(--qy-control-xl)] [--qy-track-radius:var(--qy-radius-control)]",
};

/** 轨道本身：白底 + 容器线（用户裁决 2026-10-05：正常状态不用灰底）。 */
export function trackClassName(size: TrackSize = "md") {
  return `inline-flex max-w-full min-w-0 gap-(--qy-track-inset) rounded-(--qy-track-radius) border border-(--qy-track-border) bg-(--qy-track-surface) p-(--qy-track-inset) [--qy-radius-track-item:max(0px,calc(var(--qy-track-radius)-var(--qy-track-inset)-1px))] ${outer[size]}`;
}

/**
 * 候选：高度由轨道外高倒推；图标形候选保持正方形、内容居中。
 * 写在按钮几何之后，经 cn 合并覆盖按钮自己的高度、圆角与图标形留白。
 */
export const trackItemClassName =
  "min-h-[calc(var(--qy-track-outer)-2*var(--qy-track-inset)-2px)] sm:min-h-[calc(var(--qy-track-outer)-2*var(--qy-track-inset)-2px)] rounded-(--qy-radius-track-item) data-[shape=icon]:w-[calc(var(--qy-track-outer)-2*var(--qy-track-inset)-2px)] sm:data-[shape=icon]:w-[calc(var(--qy-track-outer)-2*var(--qy-track-inset)-2px)] data-[shape=icon]:p-0 sm:data-[shape=icon]:p-0";
