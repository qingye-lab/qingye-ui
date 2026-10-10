import type * as React from "react";

/*
 * 编辑边界内的已确认项（基础层 §4、§6，2026-10-04 打磨；几何读填值角色层，用户裁决 2026-10-05）。
 * TagInput 的标签与多选 Combobox 的已选项是同一件事——边界里一枚已经确认、可以单独移除的值，
 * 所以是同一种画法（NG3）。内缩由「项高 = xs 控件外高」推出（(32 − 2 − 24) / 2 = 3px 默认档）；
 * 项高、圆角按同心换算，紧凑密度收紧边界时项随之收窄，文字不变。
 */
export const chipFrameStyle = {
  "--qy-tag-inset": "calc((var(--qy-fill-height) - 2px - var(--qy-control-xs)) / 2)",
  "--qy-tag-chip": "calc(var(--qy-fill-height) - 2px - 2 * var(--qy-tag-inset))",
  "--qy-tag-radius": "max(0px, calc(var(--qy-fill-radius) - 1px - var(--qy-tag-inset)))",
  "--qy-tag-padding": "calc(var(--qy-fill-padding) - var(--qy-tag-inset))",
} as React.CSSProperties;

// 项内文字与填值控件同档：它是边界内的内容，随内容档走；低一档的是项的外高，不是文字。
export const chipTextClassName = "text-control-md-mobile sm:text-control-md";
export const chipClassName = "flex h-(--qy-tag-chip) min-w-0 max-w-full items-center rounded-(--qy-tag-radius) bg-accent ps-(--qy-tag-padding) text-foreground data-[readonly]:pe-(--qy-tag-padding)";
// 项内与项旁的图标动作：边长等于项高的正方形。
export const chipActionClassName = "size-(--qy-tag-chip) min-h-0 rounded-(--qy-tag-radius) text-muted-foreground hover:text-foreground sm:size-(--qy-tag-chip) sm:min-h-0 [&_svg]:size-[1em] sm:[&_svg]:size-[1em]";
// 边界里的草稿输入：与项同高，换行时与项同一行气。
export const chipDraftControlClassName = "min-h-(--qy-tag-chip) min-w-0 flex-1 sm:min-h-(--qy-tag-chip) pointer-coarse:min-h-(--qy-tag-chip)";
