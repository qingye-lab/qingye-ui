"use client";
import { cn } from "../utils";
import { Progress, ProgressPrimitive, type ProgressProps } from "./progress";
export type ProgressCircleSize = "xs" | "sm" | "md" | "lg" | "xl";
export type ProgressCircleProps = Omit<ProgressProps, "children"> & { size?: ProgressCircleSize };
const sizes = {
  xs: "size-(--qy-progress-circle-xs) text-control-xs-mobile sm:text-control-xs", sm: "size-(--qy-progress-circle-sm) text-control-sm-mobile sm:text-control-sm",
  md: "size-(--qy-progress-circle-md) text-control-md-mobile sm:text-control-md", lg: "size-(--qy-progress-circle-lg) text-control-lg-mobile sm:text-control-lg", xl: "size-(--qy-progress-circle-xl) text-control-xl-mobile sm:text-control-xl",
};
/** 相同可靠进度的圆形表达；null 没有伪造的百分比或独立旋转动画。 */
export function ProgressCircle({ size = "md", value, min = 0, max = 100, className, ...props }: ProgressCircleProps) {
  const percent = value === null ? null : (value - min) / (max - min) * 100;
  return <Progress data-slot="progress-circle" data-size={size} {...props} value={value} min={min} max={max} className={state => cn("relative inline-flex shrink-0 items-center justify-center", sizes[size], typeof className === "function" ? className(state) : className)}>
    <svg aria-hidden="true" focusable="false" className="size-full" data-slot="progress-circle-graphic">
      <circle cx="50%" cy="50%" r="calc(50% - var(--qy-progress-circle-stroke) / 2)" pathLength={100} fill="none" className="stroke-border-strong" style={{ strokeWidth: "var(--qy-progress-circle-stroke)" }} />
      <circle cx="50%" cy="50%" r="calc(50% - var(--qy-progress-circle-stroke) / 2)" pathLength={100} fill="none" data-slot="progress-circle-indicator" className="origin-center -rotate-90 stroke-primary" style={{ strokeWidth: "var(--qy-progress-circle-stroke)", strokeDasharray: percent === null ? "2 2" : "100", strokeDashoffset: percent === null ? 0 : 100 - percent }} />
    </svg>
  </Progress>;
}
export { ProgressPrimitive as ProgressCirclePrimitive };
