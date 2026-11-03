import type * as React from "react";

/**
 * 数据图里 SVG 文字的度量（Chart、ScatterChart 共用）。文字度量随字阶，不随分，所以不在 chart-geometry 里。
 * 轴宽要在画之前定，量不到真实字宽，这里按 dense 档（12px）估：CJK 一字 12px，其余一字 7.5px（数字的字宽）。
 * 是估算：英文的平均字宽低于估值（实测全大写 7.3px，大小写混排 5.6px），会多留；连串的宽字母低估（W 实测 11.6px），这类名称裁后仍可能越过图的左缘。
 */
export const textAdvance = (text: string) => [...text].reduce((sum, char) => sum + (char.charCodeAt(0) >= 0x2e80 ? 12 : 7.5), 0);

/** SVG 文字放不下节点：只取字符串或数字，否则退回 fallback（Chart 的 plain、Heatmap 的 plain 同一规则）。 */
export const nodeText = (node: React.ReactNode, fallback: string) => typeof node === "string" || typeof node === "number" ? String(node) : fallback;

/** 把文字裁到 room 像素以内，末尾用省略号。只用于轴上的文字：全文仍在读数与数据表里。 */
export function fitText(text: string, room: number) {
  if (textAdvance(text) <= room) return text;
  const ellipsis = "…";
  let kept = "", width = textAdvance(ellipsis);
  for (const char of text) {
    width += textAdvance(char);
    if (width > room) break;
    kept += char;
  }
  return kept.trimEnd() + ellipsis;
}

/**
 * 横向柱的类别轴最多占绘图区的份额。预设：柱的长度才是这张图要读的东西，轴不能把它挤没；
 * 取三分之一没有更近的关系（Highcharts 的轴标签在没有其他约束时也退回图宽的 0.33）。
 */
const CATEGORY_AXIS_SHARE = 1 / 3;

/** 横向柱类别轴的宽：够放下最长的名称就停，超过 plotWidth 的份额时封顶。gutter 是文字与绘图区之间的呼吸。 */
export function categoryAxisWidth(labels: readonly string[], plotWidth: number, gutter: number) {
  const natural = Math.ceil(Math.max(0, ...labels.map(textAdvance))) + gutter;
  return Math.min(natural, Math.max(gutter, Math.floor(plotWidth * CATEGORY_AXIS_SHARE)));
}
