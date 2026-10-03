"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { cn } from "../utils";
import { Input, type InputProps, type InputSize } from "./input";

export type InputGroupProps = useRender.ComponentProps<"div"> & { size?: InputSize };
export type InputGroupAddonProps = useRender.ComponentProps<"span">;
export type InputGroupInputProps = Omit<InputProps, "size" | "unstyled">;

const InputGroupSize = React.createContext<InputSize>("md");
const profiles: Record<InputSize, string> = {
  xs: "rounded-xs min-h-(--qy-control-xs-narrow) text-control-xs-mobile sm:min-h-(--qy-control-xs) sm:text-control-xs [--qy-input-group-padding:var(--qy-control-xs-padding-bordered)]",
  sm: "rounded-sm min-h-(--qy-control-sm-narrow) text-control-sm-mobile sm:min-h-(--qy-control-sm) sm:text-control-sm [--qy-input-group-padding:var(--qy-control-sm-padding-bordered)]",
  md: "rounded-control min-h-(--qy-control-md-narrow) text-control-md-mobile sm:min-h-(--qy-control-md) sm:text-control-md [--qy-input-group-padding:var(--qy-control-md-padding-bordered)]",
  lg: "rounded-control min-h-(--qy-control-lg-narrow) text-control-lg-mobile sm:min-h-(--qy-control-lg) sm:text-control-lg [--qy-input-group-padding:var(--qy-control-lg-padding-bordered)]",
  xl: "rounded-control min-h-(--qy-control-xl-narrow) text-control-xl-mobile sm:min-h-(--qy-control-xl) sm:text-control-xl [--qy-input-group-padding:var(--qy-control-xl-padding-bordered)]",
};

export function InputGroup({ size = "md", className, render, ref, ...props }: InputGroupProps) {
  const element = useRender({
    defaultTagName: "div", render, ref,
    props: mergeProps({ "data-slot": "input-group", "data-size": size }, props, {
      className: cn(
        "relative flex w-full min-w-0 flex-wrap items-stretch border border-input bg-card text-foreground transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) pointer-coarse:min-h-(--qy-touch-target) has-[input:focus-visible]:border-ring has-[input:disabled]:opacity-64 has-[input:read-only]:border-dashed not-has-[input:disabled]:not-has-[input:read-only]:not-has-[input:focus-visible]:not-has-[input[aria-invalid=true]]:hover:border-border-strong has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]:focus-visible]:border-destructive-foreground dark:bg-surface-inset",
        profiles[size], className,
      ),
    }),
  });
  return <InputGroupSize.Provider value={size}>{element}</InputGroupSize.Provider>;
}

/** 附件是静态内容；需要动作时显式组合 Button，不代替输入获得焦点。 */
export function InputGroupAddon({ className, render, ref, ...props }: InputGroupAddonProps) {
  return useRender({
    defaultTagName: "span", render, ref,
    props: mergeProps({ "data-slot": "input-group-addon" }, props, {
      className: cn("flex min-w-0 max-w-full shrink items-center gap-(--qy-field-gap) px-(--qy-input-group-padding) text-muted-foreground wrap-anywhere", className),
    }),
  });
}

export function InputGroupInput({ controlClassName, ...props }: InputGroupInputProps) {
  const size = React.useContext(InputGroupSize);
  // 保留普通文本可编辑窗口，附件共享剩余容量；过窄时整体按 DOM 顺序换行。
  // 4em 是至少四个全宽字符的局部容量选择，不是理念公式或新的全局 token。
  return <Input {...props} size={size} unstyled controlClassName={cn("flex-1 min-w-[min(100%,calc(var(--qy-input-group-padding)*2+4em))]", controlClassName)} />;
}
