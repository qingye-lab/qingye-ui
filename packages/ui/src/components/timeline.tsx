"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type TimelineProps = useRender.ComponentProps<"ol">;
export function Timeline({ render, className, ...props }: TimelineProps) {
  const { messages } = useUILocale();
  return useRender({ defaultTagName: "ol", render, props: mergeProps({ "data-slot": "timeline", "aria-label": messages.timeline, className: cn("m-0 flex min-w-0 list-none flex-col gap-(--qy-panel-gap) p-0 text-body", className) }, props) });
}
export type TimelineItemProps = useRender.ComponentProps<"li">;
export function TimelineItem({ render, className, ...props }: TimelineItemProps) {
  return useRender({ defaultTagName: "li", render, props: mergeProps({ "data-slot": "timeline-item", className: cn("flex min-w-0 flex-col gap-(--qy-field-gap) wrap-anywhere", className) }, props) });
}
export type TimelineTimeProps = useRender.ComponentProps<"time">;
export function TimelineTime({ render, className, ...props }: TimelineTimeProps) {
  return useRender({ defaultTagName: "time", render, props: mergeProps({ "data-slot": "timeline-time", className: cn("min-w-0 text-support text-muted-foreground", className) }, props) });
}
export type TimelineTitleProps = useRender.ComponentProps<"div">;
export function TimelineTitle({ render, className, ...props }: TimelineTitleProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "timeline-title", className: cn("min-w-0 text-body-strong", className) }, props) });
}
export type TimelineDescriptionProps = useRender.ComponentProps<"p">;
export function TimelineDescription({ render, className, ...props }: TimelineDescriptionProps) {
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "timeline-description", className: cn("m-0 min-w-0 text-body wrap-anywhere", className) }, props) });
}
