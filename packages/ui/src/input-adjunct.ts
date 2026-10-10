import { cn } from "./utils";

// 编辑边界内的附属动作（清除、展开、日历、显示密码等）：无独立边框，铺满边框内高度，
// 圆角按同心换算（外圆角 − 1px 边框）。InputGroupButton 的文字形态只取这一段。
export const inputAdjunctFrameClassName =
  "min-h-0 self-stretch rounded-[max(0px,calc(var(--qy-radius-control)-1px))] sm:min-h-0";

// 图标形附属动作：默认辅助色、悬停回到前景色。
// InputGroupButton、ComboboxControl、AutocompleteControl 与三种日期选择的边界共用。
// 宽度等于边界的内高（外高 − 上下各 1px 边框），与 Input 在边界内的最小高度同一算式，所以是内高见方。
// 不能沿用图标形按钮自己的边长（那是外高）再配 aspect-square：外高见方会把边界撑高 2px
// （2026-10-10 实测 Combobox 34px、Input 32px）；也不能只靠 aspect-square 从拉伸高度反推宽度，
// 边界高度是 min-height 时浏览器取不到确定高度，宽度会塌成图标宽。
export const inputAdjunctClassName =
  `${inputAdjunctFrameClassName} w-[calc(var(--qy-fill-height-narrow)-2px)] text-muted-foreground hover:text-foreground sm:w-[calc(var(--qy-fill-height)-2px)] pointer-coarse:w-[calc(var(--qy-touch-target)-2px)]`;

/** 在调用方的 className（字符串或状态函数）之前加上组件自己的类。 */
export function withClassName<S>(own: string, className: string | ((state: S) => string | undefined) | undefined): string | ((state: S) => string) {
  return typeof className === "function" ? (state: S) => cn(own, className(state)) : cn(own, className);
}

/** 平台日期/时间输入自带的选择器图标与组件自己的日历入口重复，隐藏前者。 */
export function withHiddenIndicator<S>(className: string | ((state: S) => string | undefined) | undefined): string | ((state: S) => string) {
  return withClassName("[&::-webkit-calendar-picker-indicator]:hidden", className);
}
