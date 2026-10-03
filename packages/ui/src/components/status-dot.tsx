"use client";
import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { cn } from "../utils";
export type StatusDotStatus = "online" | "offline" | "warning" | "error" | "info" | "neutral" | "pending" | "in-progress" | "unknown";
export type StatusDotProps = Omit<useRender.ComponentProps<"span">, "children"> & { status: StatusDotStatus; label?: string };
const colors: Record<StatusDotStatus, string> = { online: "bg-success-foreground", offline: "bg-muted-foreground", warning: "bg-warning-foreground", error: "bg-destructive-foreground", info: "bg-info-foreground", neutral: "bg-muted-foreground", pending: "bg-info-foreground", "in-progress": "bg-info-foreground", unknown: "bg-warning-foreground" };
export function StatusDot({ status, label, className, render, ref, ...props }: StatusDotProps) {
  const { messages } = useUILocale();
  const name = label?.trim() || messages.statusLabel(status);
  return useRender({ defaultTagName: "span", render, ref, props: mergeProps({ role: "img", "aria-label": name, "data-slot": "status-dot", "data-status": status }, props, {
    className: cn("inline-flex min-w-0 max-w-full items-center gap-(--qy-field-gap) text-label text-foreground wrap-anywhere", className),
    children: <><span aria-hidden="true" data-slot="status-dot-indicator" className={cn("size-(--qy-status-dot-size) shrink-0 rounded-full", colors[status])} /><span aria-hidden="true" data-slot="status-dot-label">{name}</span></>,
  }) });
}
