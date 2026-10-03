"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type ScrollAreaProps = useRender.ComponentProps<"div">;

/** Real native scrolling; scrollbar visibility follows the user's platform settings. */
export function ScrollArea({ render, ref, className, tabIndex = 0, ...props }: ScrollAreaProps) {
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({
    "data-slot": "scroll-area", tabIndex,
    className: "min-w-0 max-w-full overflow-auto outline-none focus-visible:ring-inset focus-visible:ring-[length:var(--qy-focus-quiet-width)] focus-visible:ring-ring",
  }, props, { className: cn(className) }) });
}
