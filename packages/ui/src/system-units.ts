"use client";

import * as React from "react";

/**
 * 系统尺度在 JS 一侧的读数。SVG 与图表库的几何（线宽、标记、柱宽、间隙）是属性上的数字，读不到 CSS 变量；
 * 写成字面量的话，项目调了「分」或线宽，全库都跟着动，只有数据图不动。
 * `--qy-fen`、`--qy-line-width` 在 tokens/components.css 登记为 <length>，computed 值已是像素，这里读的就是它。
 */
export type SystemUnits = {
  /** 一分（--qy-fen），像素。 */
  fen: number;
  /** 线宽（--qy-line-width），像素。 */
  line: number;
};

// 样式表没有加载（单测、服务端、首次渲染）时的取值：与两个令牌的预设相同。
export const SYSTEM_UNITS_FALLBACK: SystemUnits = { fen: 4, line: 1 };

const read = (style: CSSStyleDeclaration, name: string, fallback: number) => {
  const value = Number.parseFloat(style.getPropertyValue(name));
  return Number.isFinite(value) && value > 0 ? value : fallback;
};

/** 按 `element` 所在的主题 / 密度根读出系统尺度。 */
export function readSystemUnits(element: Element): SystemUnits {
  const style = getComputedStyle(element);
  return { fen: read(style, "--qy-fen", SYSTEM_UNITS_FALLBACK.fen), line: read(style, "--qy-line-width", SYSTEM_UNITS_FALLBACK.line) };
}

/**
 * 组件根节点所在处的系统尺度。首次渲染用预设；挂载后量一次，只有读数与预设不同时才重渲染，
 * 所以默认主题下没有多余的一轮渲染。尺度在运行中被改写（切换密度根等）不在这里监听：下一次挂载时生效。
 */
export function useSystemUnits(ref: React.RefObject<Element | null>): SystemUnits {
  const [units, setUnits] = React.useState(SYSTEM_UNITS_FALLBACK);
  React.useLayoutEffect(() => {
    if (!ref.current) return;
    const next = readSystemUnits(ref.current);
    setUnits(current => current.fen === next.fen && current.line === next.line ? current : next);
  }, [ref]);
  return units;
}
