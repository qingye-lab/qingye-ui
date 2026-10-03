"use client";

import { ToggleGroup as ToggleGroupPrimitive } from "@base-ui/react/toggle-group";
import * as React from "react";
import { cn } from "../utils";
import { Toggle, type ToggleProps, type ToggleSize } from "./toggle";

export type ToggleGroupProps<Value extends string = string> = ToggleGroupPrimitive.Props<Value> & { size?: ToggleSize };
export type ToggleGroupItemProps<Value extends string = string> = Omit<ToggleProps<Value>, "value"> & { value: Value };
const GroupSize = React.createContext<ToggleSize>("md");

/** 单选与多选都用数组表示按压值；单选可以再次按压而返回空集合。 */
export function ToggleGroup<Value extends string>({ size = "md", className, ...props }: ToggleGroupProps<Value>) {
  return <GroupSize.Provider value={size}><ToggleGroupPrimitive data-slot="toggle-group" data-size={size} {...props}
    className={(state) => cn(
      "flex min-w-0 gap-(--qy-action-gap)",
      state.orientation === "vertical" ? "flex-col items-start" : "flex-wrap items-center",
      typeof className === "function" ? className(state) : className,
    )}
  /></GroupSize.Provider>;
}

export function ToggleGroupItem<Value extends string>({ size, ...props }: ToggleGroupItemProps<Value>) {
  const groupSize = React.useContext(GroupSize);
  return <Toggle data-slot="toggle-group-item" size={size ?? groupSize} {...props} />;
}

export { ToggleGroupPrimitive };
