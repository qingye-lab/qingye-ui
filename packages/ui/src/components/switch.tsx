"use client";

import { Switch as SwitchPrimitive } from "@base-ui/react/switch";
import * as React from "react";
import { IconLoader2 } from "@tabler/icons-react";
import { cn } from "../utils";

export type SwitchProps = React.ComponentProps<typeof SwitchPrimitive.Root> & {
  /** 立即生效的设置已发出请求、结果未到。事实由调用方持有；开关只表示「尚未确认」并挡住再次切换，不启动请求、不推断结果。
   *  抓手停在调用方给的 `checked`（通常是请求的目标值），抓手内出现与 Button loading 同一种等待记号。 */
  pending?: boolean;
};

/** 立即生效的设置；请求与持久化结果由应用持有，不从位置变化推断保存。 */
/** 开关是一条供一个点滑动的槽（应物象形：方以载事），不是标记：槽高一材、长两材，
 * 与标签那一行同高（基础层 §2）。只有一种几何，不提供 size；密度不改它，因为它跟随文字行。
 * 抓手与槽等距内缩，内缩量给槽内的焦点线留位，圆角按同心换算。 */
export function Switch({ children, className, style, pending = false, readOnly, ...props }: SwitchProps) {
  const variables = {
    "--qy-switch-height": "var(--qy-switch-size)",
    "--qy-switch-height-narrow": "var(--qy-switch-size-narrow)",
    "--qy-switch-inset": "calc(var(--qy-focus-quiet-width) + var(--qy-focus-ring-width))",
  } as React.CSSProperties;
  return <SwitchPrimitive.Root
    data-slot="switch" {...props}
    readOnly={pending || readOnly}
    aria-busy={pending ? "true" : props["aria-busy"]}
    data-pending={pending ? "" : undefined}
    className={(state) => cn(
      "touch-target relative inline-flex shrink-0 items-center align-top outline-none h-(--qy-switch-height-narrow) w-[calc(2*var(--qy-switch-height-narrow))] sm:h-(--qy-switch-height) sm:w-[calc(2*var(--qy-switch-height))] rounded-[min(var(--qy-radius-control),calc(var(--qy-switch-height-narrow)*var(--qy-radius-cap-ratio)))] sm:rounded-[min(var(--qy-radius-control),calc(var(--qy-switch-height)*var(--qy-radius-cap-ratio)))] px-(--qy-switch-inset) transition-colors duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-ring-width)]",
      // 关闭与复选框未选一致：承载面加输入线，抓手用辅助色；开启才用填充。
      // 抓手平移距离 = 槽宽 2h − 抓手边长 (h − 2·内缩) − 两侧内缩 2·内缩 = h（几何恒等，不是取值）。
      state.checked ? "bg-primary text-primary-foreground focus-visible:ring-primary-foreground aria-invalid:bg-destructive-fill aria-invalid:text-destructive-on-fill aria-invalid:focus-visible:ring-destructive-on-fill" : "bg-surface-field text-muted-foreground inset-ring-(length:--qy-line-width) inset-ring-(--qy-border-input) focus-visible:ring-ring",
      // 基础层 §5（2026-10-05 打磨）：Checkbox 与 Radio 都接了 aria-invalid，唯独 Switch
      // 没有——同一份「已声明无效」在不同标记上表现不一，属于 NG3 的同一关系两种画法。
      // 未开启时边界由 inset-ring 承担，所以无效色也落在同一处；开启时槽的填充就是整个控件，
      // 无效改用填充本身（Button solid danger 的同一对 token，抓手随 text 色），与 Checkbox 选中态一致。
      !state.checked && "aria-invalid:inset-ring-destructive aria-invalid:focus-visible:ring-destructive-foreground",
      state.disabled && "cursor-not-allowed opacity-disabled",
      // 只读与 Checkbox 未选只读同一画法：槽退到内嵌面、边界降到清墨线；开启态的填充本身就是值，不改。
      // pending 也借用原语的 readOnly 挡住切换，但它是「等待确认」而非「不可编辑」，不套只读外观。
      readOnly && !pending && !state.checked && "bg-surface-inset inset-ring-(--qy-border)",
      typeof className === "function" ? className(state) : className,
    )}
    style={(state) => ({ ...variables, ...(typeof style === "function" ? style(state) : style) })}
  >{children ?? <SwitchPrimitive.Thumb data-slot="switch-thumb" className="pointer-events-none relative block size-[calc(var(--qy-switch-height-narrow)-2*var(--qy-switch-inset))] sm:size-[calc(var(--qy-switch-height)-2*var(--qy-switch-inset))] rounded-[max(0px,calc(min(var(--qy-radius-control),calc(var(--qy-switch-height-narrow)*var(--qy-radius-cap-ratio)))-var(--qy-switch-inset)))] sm:rounded-[max(0px,calc(min(var(--qy-radius-control),calc(var(--qy-switch-height)*var(--qy-radius-cap-ratio)))-var(--qy-switch-inset)))] bg-current transition-transform duration-(--qy-duration-fast) ease-(--qy-ease-out) data-checked:translate-x-(--qy-switch-height-narrow) sm:data-checked:translate-x-(--qy-switch-height) rtl:data-checked:-translate-x-(--qy-switch-height-narrow) sm:rtl:data-checked:-translate-x-(--qy-switch-height) motion-reduce:transition-none">
    {/* 等待记号：直径 = 抓手边长 − 2·焦点线宽（抓手内缘，与槽内缩同一单位）；颜色取槽的底色，使它在抓手上是「镂空」。
     *  不转动由 motion.css 的 qy-spin 在 reduced-motion 下处理。 */}
    {pending && <IconLoader2 aria-hidden="true" data-slot="switch-pending" className="qy-spin absolute inset-0 m-auto size-[calc(100%-2*var(--qy-focus-ring-width))] text-surface-field in-data-checked:text-primary in-data-checked:in-aria-invalid:text-destructive-fill" />}
  </SwitchPrimitive.Thumb>}</SwitchPrimitive.Root>;
}

export { SwitchPrimitive };
