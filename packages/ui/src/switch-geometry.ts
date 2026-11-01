import type * as React from "react";

/*
 * 开关槽与抓手的几何，Switch 与 MenuSwitchItem 共用（同一种「供一个点滑动的槽」，只有一套画法）。
 * 槽高一材（窄屏一材加一分）、长为高的两倍，圆角取控件圆角与槽高×圆角帽比例的较小者；
 * 抓手与槽等距内缩（焦点线宽 + 焦点环宽：给槽内的焦点线留位），圆角同心换算。
 * 抓手平移距离 = 槽宽 2h − 抓手边长 (h − 2·内缩) − 两侧内缩 2·内缩 = h（几何恒等，不是取值）；
 * 平移由各自的状态来源驱动（Switch 读自身 data-checked，菜单项读所在行），所以平移类名留在各组件里。
 */
export const switchVariables = {
  "--qy-switch-height": "var(--qy-switch-size)",
  "--qy-switch-height-narrow": "var(--qy-switch-size-narrow)",
  "--qy-switch-inset": "calc(var(--qy-focus-quiet-width) + var(--qy-focus-ring-width))",
} as React.CSSProperties;

export const switchTrackGeometry = "relative inline-flex shrink-0 items-center h-(--qy-switch-height-narrow) w-[calc(2*var(--qy-switch-height-narrow))] sm:h-(--qy-switch-height) sm:w-[calc(2*var(--qy-switch-height))] rounded-[min(var(--qy-radius-control),calc(var(--qy-switch-height-narrow)*var(--qy-radius-cap-ratio)))] sm:rounded-[min(var(--qy-radius-control),calc(var(--qy-switch-height)*var(--qy-radius-cap-ratio)))] px-(--qy-switch-inset) transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out)";

/** 关闭与复选框未选一致：承载面加输入线，抓手用辅助色。开启才用填充（bg-primary + text-primary-foreground）。 */
export const switchOffClassName = "bg-surface-field text-muted-foreground inset-ring-(length:--qy-line-width) inset-ring-(--qy-border-input)";

export const switchThumbGeometry = "pointer-events-none relative block size-[calc(var(--qy-switch-height-narrow)-2*var(--qy-switch-inset))] sm:size-[calc(var(--qy-switch-height)-2*var(--qy-switch-inset))] rounded-[max(0px,calc(min(var(--qy-radius-control),calc(var(--qy-switch-height-narrow)*var(--qy-radius-cap-ratio)))-var(--qy-switch-inset)))] sm:rounded-[max(0px,calc(min(var(--qy-radius-control),calc(var(--qy-switch-height)*var(--qy-radius-cap-ratio)))-var(--qy-switch-inset)))] bg-current transition-transform duration-(--qy-duration-fast) ease-(--qy-ease-out) motion-reduce:transition-none";
