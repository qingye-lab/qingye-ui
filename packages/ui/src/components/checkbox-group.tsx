"use client";

import { CheckboxGroup as CheckboxGroupPrimitive } from "@base-ui/react/checkbox-group";
import * as React from "react";
import { cn } from "../utils";

export type CheckboxGroupProps = React.ComponentProps<typeof CheckboxGroupPrimitive>;

/** 集合与完整范围由调用方声明；组原语把现有 Checkbox 接入同一集合。 */
export function CheckboxGroup({ className, ...props }: CheckboxGroupProps) {
  return <CheckboxGroupPrimitive data-slot="checkbox-group" {...props}
    className={(state) => cn("flex min-w-0 flex-col gap-(--qy-field-gap)", typeof className === "function" ? className(state) : className)}
  />;
}

export { CheckboxGroupPrimitive };
