"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type AlertProps = useRender.ComponentProps<"div"> & { tone?: "neutral" | "info" | "warning" | "danger" | "success" };

/**
 * 就地说明是在场对象旁的一块面（基础层 §5、§7）：
 * - 骨法用笔：范围只用一种机制——该类别的柔底（清墨浓度）。不再另描彩色边框（NG11）。
 * - 墨分五色：色相只落在图标上，表达类别；标题是焦墨，说明是浓墨。整块染色会让一条提示
 *   与真正的危险动作争重量，也让长说明难读。
 * - 类别由调用方声明，图标由调用方给出（组件不知道这条消息涉及什么对象）。
 * - 不自动可关闭、不自动宣告：是否宣称、何时宣称由应用按真实事件决定。
 */
const tones = {
  neutral: "bg-neutral-soft [&>svg]:text-muted-foreground",
  info: "bg-info-soft [&>svg]:text-info-foreground",
  warning: "bg-warning-soft [&>svg]:text-warning-foreground",
  danger: "bg-danger-soft [&>svg]:text-destructive-foreground",
  success: "bg-success-soft [&>svg]:text-success-foreground",
};

export function Alert({ tone = "neutral", className, render, ref, ...props }: AlertProps) {
    return useRender({
      defaultTagName: "div",
      render,
      ref,
      props: mergeProps(
        { "data-slot": "alert", "data-tone": tone },
        props,
        {
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
