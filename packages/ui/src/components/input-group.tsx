"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";
import { fillStateByInput } from "../fill-state";
import { Input, type InputProps } from "./input";

export type InputGroupProps = useRender.ComponentProps<"div">;
export type InputGroupAddonProps = useRender.ComponentProps<"span">;
export type InputGroupInputProps = Omit<InputProps, "size" | "unstyled">;

/**
 * 基础层 §2、用户裁决 2026-10-05：填值容器只有一套几何，跟随密度轴，
 * 与 Input 读同一组角色 token，两者永远同高。这里不选档位：
 * 用 `text-control-md[-mobile]` 是取正文尺寸的既有文字档，紧凑密度只改几何。
 */
/*
 * 附件与值同在一个编辑边界里，读作一体（https://qingye.dev、¥ 120）：二者之间是控件内间隔，
 * 与图标和文字、搜索图标和值同一关系；只有贴着边界的一侧保留填值留白（疏密有致）。
 */
const adjacency = "[&>[data-slot=input-group-addon]:has(+[data-slot=input-control])]:pe-0 [&>[data-slot=input-group-addon]+[data-slot=input-control]_input]:ps-(--qy-control-content-gap) [&>[data-slot=input-control]+[data-slot=input-group-addon]]:ps-0 [&>[data-slot=input-control]:has(+[data-slot=input-group-addon])_input]:pe-(--qy-control-content-gap)";
const groupProfile = `rounded-(--qy-fill-radius) min-h-(--qy-fill-height-narrow) text-control-md-mobile sm:min-h-(--qy-fill-height) sm:text-control-md [--qy-input-group-padding:var(--qy-fill-padding)] ${adjacency}`;

export function InputGroup({ className, render, ref, ...props }: InputGroupProps) {
  const element = useRender({
    defaultTagName: "div", render, ref,
    props: mergeProps({ "data-slot": "input-group" }, props, {
      className: cn(
        "relative flex w-full min-w-0 flex-wrap items-stretch border border-input bg-card text-foreground transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) pointer-coarse:min-h-(--qy-touch-target) has-[input:focus-visible]:border-ring data-readonly:border-border not-has-[input:disabled]:not-has-[input:read-only]:not-has-[input:focus-visible]:not-has-[input[aria-invalid=true]]:hover:border-border-strong has-[input[aria-invalid=true]]:border-destructive has-[input[aria-invalid=true]:focus-visible]:border-destructive-foreground dark:bg-surface-inset", fillStateByInput,
        groupProfile, className,
      ),
    }),
  });
  return element;
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
  // 保留普通文本可编辑窗口，附件共享剩余容量；过窄时整体按 DOM 顺序换行。
  // 4em 是至少四个全宽字符的局部容量选择，不是理念公式或新的全局 token。
  return <Input {...props} unstyled controlClassName={cn("flex-1 min-w-[min(100%,calc(var(--qy-input-group-padding)*2+4em))]", controlClassName)} />;
}
