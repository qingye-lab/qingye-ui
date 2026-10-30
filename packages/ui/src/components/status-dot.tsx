"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { statusTone, toneDotClassName, type StatusName } from "../status-tone";
import { cn } from "../utils";
export type StatusDotStatus = StatusName;
export type StatusDotProps = Omit<useRender.ComponentProps<"span">, "children"> & { status: StatusDotStatus; label?: string };
/** 点的颜色由状态类别决定（src/status-tone.ts）；没有类别的状态是墨色，不施彩。 */
function dotColor(status: StatusDotStatus) {
  const tone = statusTone[status];
  return tone ? toneDotClassName[tone] : "bg-muted-foreground";
}
/** 状态名跟随所在那一行的字号与字重（与 Badge 同一规则）：放在表格里是正文，放在说明里是说明。 */
export function StatusDot({ status, label, className, render, ref, ...props }: StatusDotProps) {
  const { messages } = useUILocale();
  const name = label?.trim() || messages.statusLabel(status);
  return useRender({ defaultTagName: "span", render, ref, props: mergeProps({ role: "img", "aria-label": name, "data-slot": "status-dot", "data-status": status, "data-tone": statusTone[status] }, props, {
    className: cn("inline-flex min-w-0 max-w-full items-center gap-(--qy-field-gap) text-foreground wrap-anywhere", className),
    children: <><span aria-hidden="true" data-slot="status-dot-indicator" className={cn("size-(--qy-status-dot-size) shrink-0 rounded-full", dotColor(status))} /><span aria-hidden="true" data-slot="status-dot-label">{name}</span></>,
  }) });
}
