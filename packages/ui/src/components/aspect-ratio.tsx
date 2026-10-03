"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

export type AspectRatioProps = useRender.ComponentProps<"div"> & { ratio?: number };

/** Sets only the preferred width/height relation; never crops its contents. */
export function AspectRatio({ ratio = 1, className, style, render, ref, ...props }: AspectRatioProps) {
  if (!Number.isFinite(ratio) || ratio <= 0) throw new RangeError("AspectRatio ratio must be a finite positive number.");
  return useRender({ defaultTagName: "div", render, ref, props: mergeProps({ "data-slot": "aspect-ratio" }, props, {
    className: cn("min-w-0", className), style: { aspectRatio: ratio, ...style },
  }) });
}
