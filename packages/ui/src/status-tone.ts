import type { Tone } from "./tone";

/*
 * 状态词汇的一处来源（随类赋彩，NG10）：对象的状态名 → 状态类别 → 颜色。
 *
 * 三层，各管一件事：
 * - 状态名（StatusDot 的 status）：对象此刻处于什么事实，名称由语言承担；
 * - 状态类别（Tone）：彩色只随这四类施用，Badge、图形、读数共用同一组值；
 * - 颜色：由类别唯一决定，StatusDot 的点与 Badge 的字读同一个类别、同一个 -foreground 色相。
 * 所以同一语义在 StatusDot 与 Badge 里同色是由此处保证的，不是两处各写各的。
 *
 * 没有类别（undefined）的状态不施彩，退回墨色：offline 与 neutral 只是「不在场 / 没有归类」，不是危险、
 * 警示、成功或信息；给它们任何色相都违反 NG10。
 *
 * Stat 的 state（known / unknown / not-applicable）不在此列：它说的是「这个数有没有」，不是对象的状态，
 * 与 Chart 的值状态、Empty 的 state 同一组词；它不施彩，只退墨（见 stat.tsx）。
 *
 * 预设：pending 与 in-progress 取 info——它们只是「事情还在路上」，不是好坏；二者的区别由名称承担，
 * 不由色相区分（灰度检验：去掉色相后名称仍把它们分开）。unknown 取 warning——结果未知要读者去核实，
 * 是「请留意」一类，不是失败也不是成功，不能落进 success / danger；见 design.md「写入结果未知时先如实表达」。
 */
export type StatusName = "online" | "offline" | "warning" | "error" | "info" | "neutral" | "pending" | "in-progress" | "unknown";

export const statusTone: Record<StatusName, Tone | undefined> = {
  online: "success",
  offline: undefined,
  warning: "warning",
  error: "danger",
  info: "info",
  neutral: undefined,
  pending: "info",
  "in-progress": "info",
  unknown: "warning",
};

/** 类别 → 文字色（Badge 的字、行内标注）。 */
export const toneTextClassName: Record<Tone, string> = {
  info: "text-info-foreground",
  success: "text-success-foreground",
  warning: "text-warning-foreground",
  danger: "text-destructive-foreground",
};

/** 类别 → 点的填充（StatusDot）。与 toneTextClassName 同一色相：点与字读同一个 -foreground 档（semantic.css 注释）。 */
export const toneDotClassName: Record<Tone, string> = {
  info: "bg-info-foreground",
  success: "bg-success-foreground",
  warning: "bg-warning-foreground",
  danger: "bg-destructive-foreground",
};
