import type * as React from "react";
import { useUILocale } from "./locale";
import { candidateEmptyClassName } from "./overlay-item";

/*
 * 候选浮层的状态播报（Combobox、Autocomplete 共用一份）：对读屏说「正在加载」「找到 N 项」这类
 * 列表自身的事实。与 Empty 的分工是**一件事实一个播报者**：
 * - 「没有结果」归 Empty——它本身就是礼貌型 live region，列表为空时才有内容；
 * - Status 说其余的事实（加载中、结果数、应用自己的提示）。count 为 0 时不出声，避免与 Empty 重复；
 *   加载时不要同时让 Empty 显示「没有结果」，那是应用此刻不知道的事（§9：等待与结果是两件事）。
 * 默认只给读屏（sr-only）：结果数看列表即知，写在界面上是复述；加载中则要让看得见的人也知道，
 * 用 `visible`——它坐在 Empty 同一个位置上（同一起点、同一行高、同一字号）。
 */
export type CandidateStatusOptions = {
  /** 自定义内容；给了就不再取内置文案。 */
  children?: React.ReactNode | undefined;
  /** 加载中：读出内置的「正在加载」。 */
  loading?: boolean | undefined;
  /** 结果数：读出内置的「找到 N 项」。0 不出声，「没有结果」归 Empty。 */
  count?: number | undefined;
  /** 同时给看得见的人看；默认只给读屏。 */
  visible?: boolean | undefined;
};

export function useCandidateStatus({ children, loading, count, visible = false }: CandidateStatusOptions) {
  const { messages } = useUILocale();
  const content = children ?? (loading ? messages.loading : count ? messages.resultCount(count) : null);
  return { content, className: visible ? candidateEmptyClassName : "sr-only" };
}
