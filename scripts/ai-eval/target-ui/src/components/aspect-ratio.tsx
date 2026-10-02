"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import type * as React from "react";
import { cn } from "../utils";

export interface AspectRatioProps extends useRender.ComponentProps<"div"> {
  /** Width divided by height, for example `16 / 9`. */
  ratio?: number;
}

/**
 * Holds its content at a fixed width-to-height ratio. Direct children are
 * stretched to fill the box, so an `<img>`, `<video>` or `<iframe>` needs only
 * its own `object-fit`.
 */
export function AspectRatio({
  ratio = 1,
  className,
  style,
  render,
  ...props
}: AspectRatioProps): React.ReactElement {
  const safeRatio = Number.isFinite(ratio) && ratio > 0 ? ratio : 1;
  const defaultProps = {
    className: cn(
      "relative w-full *:absolute *:inset-0 *:size-full",
      className,
    ),
    "data-ratio": String(safeRatio),
    "data-slot": "aspect-ratio",
    style: { aspectRatio: String(safeRatio), ...style },
  };

  return useRender({
    defaultTagName: "div",
    props: mergeProps<"div">(defaultProps, props),
    render,
  });
}
