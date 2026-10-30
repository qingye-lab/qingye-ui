"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { IconAlertOctagon, IconAlertTriangle, IconCircleCheck, IconInfoCircle } from "@tabler/icons-react";
import * as React from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";

type AlertTone = "neutral" | "info" | "warning" | "danger" | "success";
export type AlertProps = useRender.ComponentProps<"div"> & {
  tone?: AlertTone;
  /**
   * 类别图标。省略时按 tone 给默认图标（neutral 没有）；传节点则用它；`false` 不放图标。
   * 换图标只走本属性：组件不去 children 里猜哪个元素是图标。
   */
  icon?: React.ReactNode | false;
};

/**
 * 就地说明是在场对象旁的一块面（基础层 §5、§7）：
 * - 骨法用笔：范围只用一种机制——该类别的柔底（清墨浓度）。不再另描彩色边框（NG11）。
 * - 墨分五色：色相只落在图标上，表达类别；标题是焦墨，说明是浓墨。整块染色会让一条提示
 *   与真正的危险动作争重量，也让长说明难读。
 * - 类别由调用方声明。色相不能单独承担类别（有人分不出红与橙）：类别另有两个通道——
 *   形状不同的默认图标（info 圆、warning 三角、danger 八角、success 圆加勾；neutral 无类别，无图标），
 *   与只给读屏的类别前缀（「警告：」，走 locale）。调用方可换图标或关掉，前缀不随图标走：
 *   去掉图标不等于去掉类别。图标是第二通道而非装饰，所以 neutral 以外默认带。
 * - 不自动可关闭、不自动宣告：是否宣称、何时宣称由应用按真实事件决定。
 */
const tones = {
  neutral: "bg-neutral-soft [&>svg]:text-muted-foreground",
  info: "bg-info-soft [&>svg]:text-info-foreground",
  warning: "bg-warning-soft [&>svg]:text-warning-foreground",
  danger: "bg-danger-soft [&>svg]:text-destructive-foreground",
  success: "bg-success-soft [&>svg]:text-success-foreground",
};

const toneIcons = { info: IconInfoCircle, warning: IconAlertTriangle, danger: IconAlertOctagon, success: IconCircleCheck } as const;
export function Alert({ tone = "neutral", icon, children, className, render, ref, ...props }: AlertProps) {
    const { messages } = useUILocale();
    const Icon = tone === "neutral" ? undefined : toneIcons[tone];
    const mark = icon === false ? null : icon !== undefined ? icon : Icon ? <Icon data-slot="alert-icon" aria-hidden="true" /> : null;
    return useRender({
      defaultTagName: "div",
      render,
      ref,
      props: mergeProps(
        { "data-slot": "alert", "data-tone": tone },
        props,
        {
          children: <>
            {mark}
            {tone !== "neutral" && <span data-slot="alert-category" className="sr-only">{messages.alertToneLabel(tone)}</span>}
            {children}
          </>,
          className: cn(
            // 图标与文字同一行（图标只是一个位，不是一列）；标题与说明由调用方
            // 自行分组，二者之间的间隔由 Field/Stack 组合决定，Alert 不预设。
            "flex min-w-0 gap-(--qy-control-content-gap) rounded-panel p-(--qy-panel-padding-sm) text-foreground wrap-anywhere [&>svg]:mt-[calc((var(--qy-cai)-var(--qy-control-md-icon))/2)] [&>svg]:size-(--qy-control-md-icon) [&>svg]:shrink-0",
            tones[tone],
            className,
          ),
        },
      ),
    });
  }

export type AlertTitleProps = useRender.ComponentProps<"div">;
export function AlertTitle({ className, render, ref, ...props }: AlertTitleProps) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "alert-title" }, props, { className: cn("min-w-0 text-body-strong wrap-anywhere", className) }) });
}
export function AlertDescription({ className, render, ref, ...props }: useRender.ComponentProps<"div">) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "alert-description" }, props, { className: cn("min-w-0 text-support-mobile text-muted-foreground wrap-anywhere sm:text-support", className) }) });
}
