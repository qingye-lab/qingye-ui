"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { useUILocale } from "../locale";
import { threadClassName } from "../thread";
import { cn } from "../utils";

export type TimelineProps = useRender.ComponentProps<"ol">;
export function Timeline({ render, className, ...props }: TimelineProps) {
  const { messages } = useUILocale();
  return useRender({ defaultTagName: "ol", render, props: mergeProps({ "data-slot": "timeline", "aria-label": messages.timeline, className: cn("m-0 flex min-w-0 list-none flex-col p-0 text-body", className) }, props) });
}
export type TimelineItemProps = useRender.ComponentProps<"li">;
export function TimelineItem({ render, className, ...props }: TimelineItemProps) {
  return useRender({ defaultTagName: "li", render, props: mergeProps({ "data-slot": "timeline-item", className: cn(
      // 已经发生的事彼此同重：每条一个重墨的点，坐在第一行（时间）里；点下一道清墨线连到下一条。
      "relative grid min-w-0 grid-cols-[var(--qy-cai)_minmax(0,1fr)] gap-x-(--qy-field-gap) pb-(--qy-field-group-gap) wrap-anywhere last:pb-0",
      "before:col-start-1 before:row-start-1 before:mt-[calc((var(--qy-cai)-var(--qy-status-dot-size))/2)] before:size-(--qy-status-dot-size) before:justify-self-center before:rounded-full before:bg-input before:content-['']",
      threadClassName, "[--qy-thread-marker:var(--qy-status-dot-size)] after:bg-border",
      "[&>*]:col-start-2", className) }, props) });
}
export type TimelineTimeProps = useRender.ComponentProps<"time">;
export function TimelineTime({ render, className, ...props }: TimelineTimeProps) {
  return useRender({ defaultTagName: "time", render, props: mergeProps({ "data-slot": "timeline-time", className: cn("min-w-0 text-support text-muted-foreground numeric", className) }, props) });
}
export type TimelineTitleProps = useRender.ComponentProps<"div">;
export function TimelineTitle({ render, className, ...props }: TimelineTitleProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "timeline-title", className: cn("min-w-0 text-body text-foreground", className) }, props) });
}
export type TimelineDescriptionProps = useRender.ComponentProps<"p">;
export function TimelineDescription({ render, className, ...props }: TimelineDescriptionProps) {
  return useRender({ defaultTagName: "p", render, props: mergeProps({ "data-slot": "timeline-description", className: cn("m-0 min-w-0 text-support text-muted-foreground wrap-anywhere", className) }, props) });
}
