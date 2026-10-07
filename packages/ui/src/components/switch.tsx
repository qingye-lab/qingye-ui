"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as React from "react";
import { cn } from "../utils";

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root>;

/** 立即生效的设置；请求与持久化结果由应用持有，不从位置变化推断保存。 */
/** 开关是一条供一个点滑动的槽（应物象形：方以载事），不是标记：槽高一材、长两材，
 * 与标签那一行同高（基础层 §2）。只有一种几何，不提供 size；密度不改它，因为它跟随文字行。
 * 抓手与槽等距内缩，内缩量给槽内的焦点线留位，圆角按同心换算。 */
export function Switch({ children, className, style, ...props }: SwitchProps) {
  const variables = {
    "--qy-switch-height": "var(--qy-switch-size)",
    "--qy-switch-height-narrow": "var(--qy-switch-size-narrow)",
    "--qy-switch-inset": "calc(var(--qy-focus-quiet-width) + var(--qy-focus-ring-width))",
  } as React.CSSProperties;
  return <SwitchPrimitive.Root
    data-slot="switch" {...props}
    className={(state) => cn(
      "touch-target relative inline-flex shrink-0 items-center align-top outline-none h-(--qy-switch-height-narrow) w-[calc(2*var(--qy-switch-height-narrow))] sm:h-(--qy-switch-height) sm:w-[calc(2*var(--qy-switch-height))] rounded-[min(var(--qy-radius-control),calc(var(--qy-switch-height-narrow)/4))] sm:rounded-[min(var(--qy-radius-control),calc(var(--qy-switch-height)/4))] px-(--qy-switch-inset) transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)]",
      // 关闭与复选框未选一致：承载面加输入线，抓手用辅助色；开启才用填充。
      state.checked ? "bg-primary text-primary-foreground focus-visible:ring-primary-foreground" : "bg-card text-muted-foreground inset-ring inset-ring-(--qy-border-input) dark:bg-surface-inset focus-visible:ring-ring",
      // 基础层 §5（2026-10-05 打磨）：Checkbox 与 Radio 都接了 aria-invalid，唯独 Switch
      // 没有——同一份「已声明无效」在不同标记上表现不一，属于 NG3 的同一关系两种画法。
      // 未开启时边界由 inset-ring 承担，所以无效色也落在同一处。
      !state.checked && "aria-invalid:inset-ring-destructive aria-invalid:focus-visible:ring-destructive-foreground",
      state.disabled && "cursor-not-allowed opacity-64",
      typeof className === "function" ? className(state) : className,
    )}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(state) : style) })}
  >{children ?? <SwitchPrimitive.Thumb data-slot="switch-thumb" className="pointer-events-none block size-[calc(var(--qy-switch-height-narrow)-2*var(--qy-switch-inset))] sm:size-[calc(var(--qy-switch-height)-2*var(--qy-switch-inset))] rounded-[max(0px,calc(min(var(--qy-radius-control),calc(var(--qy-switch-height-narrow)/4))-var(--qy-switch-inset)))] sm:rounded-[max(0px,calc(min(var(--qy-radius-control),calc(var(--qy-switch-height)/4))-var(--qy-switch-inset)))] bg-current transition-transform duration-(--qy-duration-fast) ease-(--qy-ease-out) data-checked:translate-x-(--qy-switch-height-narrow) sm:data-checked:translate-x-(--qy-switch-height) rtl:data-checked:-translate-x-(--qy-switch-height-narrow) sm:rtl:data-checked:-translate-x-(--qy-switch-height) motion-reduce:transition-none" />}</SwitchPrimitive.Root>;
}

export { SwitchPrimitive };
