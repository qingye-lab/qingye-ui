"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { ChevronDownIcon } from "lucide-react";
import { cn } from "../utils";
import { fillStateNative } from "../fill-state";

export type NativeSelectProps = useRender.ComponentProps<"select">;

/**
 * 基础层 §2/§8、用户裁决 2026-10-05：填值控件只有一套几何，跟随密度轴。
 * `size` 仍是原生属性，表示列表形态的显示行数，与呈现几何无关——两者同名曾经
 * 混用，所以旧接口叫 `controlSize`；现在几何只有一种，这个参数也就不需要了。
 */
const profile = "rounded-(--qy-fill-radius) text-control-md-mobile sm:text-control-md px-(--qy-fill-padding)";
const height = "min-h-(--qy-fill-height-narrow) sm:min-h-(--qy-fill-height)";
// 单值形态去掉平台箭头，改用与 Select 相同的图标，右侧留出图标位；列表形态保留平台行为。
const chevronSpace = "pe-[calc(var(--qy-fill-padding)*2+var(--qy-fill-icon))]";
const iconPosition = "end-(--qy-fill-padding) size-(--qy-fill-icon)";

/** 平台 select 保留选项、键盘、移动选择器与真实表单值。宽度默认随最长选项。 */
export function NativeSelect({ className, render, ref, multiple, size, ...props }: NativeSelectProps) {
  const list = multiple || (size !== undefined && size > 1);
  const select = useRender({
    defaultTagName: "select", render, ref,
    props: mergeProps({ "data-slot": "native-select" }, props, {
      multiple, size,
      className: cn(
        "box-border min-w-0 max-w-full border border-input bg-card py-0 text-foreground outline-none transition-[border-color,background-color] duration-(--qy-duration-fast) ease-(--qy-ease-out) focus-visible:border-ring not-disabled:not-focus-visible:not-aria-invalid:hover:border-border-strong aria-invalid:border-destructive aria-invalid:focus-visible:border-destructive-foreground dark:bg-surface-inset", fillStateNative,
        profile,
        list
          ? "w-full py-(--qy-space-1) [&_option]:rounded-[max(0px,calc(var(--qy-fill-radius)-1px-var(--qy-space-1)))] [&_option]:px-(--qy-space-2) [&_option]:py-(--qy-space-1) [&_option:checked]:bg-accent [&_optgroup]:text-muted-foreground"
          : cn(
            "w-full appearance-none",
            // 渐进增强：支持可定制 select 的浏览器把选项面画在页面内，与 Select 浮层同一外观、
            // 宽度不小于控件且从控件下沿展开；不支持的浏览器忽略此声明，仍用平台选项面。
            "supports-[appearance:base-select]:[appearance:base-select] supports-[appearance:base-select]:inline-flex supports-[appearance:base-select]:items-center [&::picker-icon]:hidden [&::picker(select)]:[appearance:base-select] [&::picker(select)]:mt-(--qy-space-1) [&::picker(select)]:rounded-(--qy-radius-overlay) [&::picker(select)]:border [&::picker(select)]:border-border [&::picker(select)]:bg-(--qy-surface-raised) [&::picker(select)]:p-(--qy-space-1) [&::picker(select)]:shadow-(--qy-shadow-raised) [&_option]:rounded-[max(0px,calc(var(--qy-fill-radius)-1px-var(--qy-space-1)))] [&_option]:px-(--qy-space-2) [&_option]:py-(--qy-space-1) [&_option:hover]:bg-accent [&_option:focus-visible]:bg-accent [&_option:focus-visible]:outline-none [&_option::checkmark]:order-last [&_option::checkmark]:ms-auto [&_option]:gap-(--qy-space-2)",
            height, chevronSpace,
          ),
        "pointer-coarse:min-h-(--qy-touch-target)",
        className,
      ),
    }),
  });
  if (list) return select;
  return (
    <span className="relative inline-grid w-fit max-w-full min-w-0 self-start align-top" data-slot="native-select-wrapper">
      {select}
      <ChevronDownIcon aria-hidden="true" className={cn("pointer-events-none absolute top-1/2 -translate-y-1/2 text-muted-foreground", iconPosition)} data-slot="native-select-icon" />
    </span>
  );
}
