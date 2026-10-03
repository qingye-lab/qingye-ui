"use client";

import { Fieldset as FieldsetPrimitive } from "@base-ui/react/fieldset";
import * as React from "react";
import { cn } from "../utils";

export type FieldsetProps = React.ComponentProps<typeof FieldsetPrimitive.Root>;
export type FieldsetLegendProps = React.ComponentProps<typeof FieldsetPrimitive.Legend> & {
  /** 分节名称与共同问题分别消费已有的标题档/名称档。 */
  variant?: "legend" | "label";
};

export function Fieldset({ className, ...props }: FieldsetProps) {
  return (
    <FieldsetPrimitive.Root
      data-slot="fieldset"
      {...props}
      className={(state) => cn(
        // 原生 legend 不属于 fieldset 的匿名 flex 内容盒；组根为它接上同一关系间隔。
        "m-0 flex min-w-0 flex-col gap-(--qy-field-group-gap) border-0 p-0 [&>legend]:mb-(--qy-field-group-gap)",
        typeof className === "function" ? className(state) : className,
      )}
    />
  );
}

export function FieldsetLegend({ variant = "legend", className, render, ...props }: FieldsetLegendProps) {
  return (
    <FieldsetPrimitive.Legend
      data-slot="fieldset-legend"
      data-variant={variant}
      {...props}
      render={render ?? <legend />}
      className={(state) => cn(
        "min-w-0 max-w-full whitespace-normal p-0 text-foreground wrap-break-word",
        variant === "legend" ? "text-heading" : "text-label",
        typeof className === "function" ? className(state) : className,
      )}
    />
  );
}

export { FieldsetPrimitive };
