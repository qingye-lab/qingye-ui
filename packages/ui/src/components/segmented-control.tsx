"use client";

import { Radio as SegmentedControlItemPrimitive } from "@base-ui/react/radio";
import { RadioGroup as SegmentedControlPrimitive } from "@base-ui/react/radio-group";
import * as React from "react";
import { cn } from "../utils";
import { buttonVariants } from "./button";
import type { ToggleSize } from "./toggle";

export type SegmentedControlSize = ToggleSize;
export type SegmentedControlProps<Value = unknown> = SegmentedControlPrimitive.Props<Value> & { size?: SegmentedControlSize };
export type SegmentedControlItemProps<Value = unknown> = SegmentedControlItemPrimitive.Root.Props<Value> & { size?: SegmentedControlSize };
const SegmentSize = React.createContext<SegmentedControlSize>("md");

/** 分段候选产生一个 radio 值；没有初值时保持未选择，不拥有任何面板。 */
export function SegmentedControl<Value>({ size = "md", className, ...props }: SegmentedControlProps<Value>) {
  return <SegmentSize.Provider value={size}><SegmentedControlPrimitive data-slot="segmented-control" data-size={size} {...props}
    className={(state) => cn("inline-flex max-w-full min-w-0 flex-wrap gap-(--qy-field-gap)", typeof className === "function" ? className(state) : className)}
  /></SegmentSize.Provider>;
}

export function SegmentedControlItem<Value>({ size, className, render = <button type="button" />, nativeButton = true, ...props }: SegmentedControlItemProps<Value>) {
  const groupSize = React.useContext(SegmentSize);
  const resolvedSize = size ?? groupSize;
  return <SegmentedControlItemPrimitive.Root data-slot="segmented-control-item" data-size={resolvedSize} {...props} render={render} nativeButton={nativeButton}
    className={(state) => cn(
      buttonVariants({ size: resolvedSize, shape: "label", tone: "neutral", variant: state.checked ? "solid" : "bordered" }),
      state.disabled && "cursor-not-allowed opacity-64",
      state.readOnly && "cursor-default",
      typeof className === "function" ? className(state) : className,
    )}
  />;
}

export { SegmentedControlPrimitive, SegmentedControlItemPrimitive };
