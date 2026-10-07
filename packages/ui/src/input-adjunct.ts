import { cn } from "./utils";

// 编辑边界内的附属动作（清除、展开、日历等）：无独立边框，铺满边框内高度，
// 圆角按同心换算（外圆角 − 1px 边框），默认辅助色、悬停回到前景色。
// Input 内置清除与显示密码、ComboboxControl、AutocompleteControl、InputGroupButton 共用。
export const inputAdjunctClassName =
  "min-h-0 self-stretch rounded-[max(0px,calc(var(--qy-radius-control)-1px))] text-muted-foreground hover:text-foreground sm:min-h-0";

/** 平台日期/时间输入自带的选择器图标与组件自己的日历入口重复，隐藏前者。 */
export function withHiddenIndicator<S>(className: string | ((state: S) => string | undefined) | undefined): string | ((state: S) => string) {
  const hide = "[&::-webkit-calendar-picker-indicator]:hidden";
  return typeof className === "function" ? (state: S) => cn(hide, className(state)) : cn(hide, className);
}
