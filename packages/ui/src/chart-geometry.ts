"use client";

import * as React from "react";
import { SYSTEM_UNITS_FALLBACK, type SystemUnits } from "./system-units";

/**
 * 数据图的几何，像素。SVG 与 Recharts 要的是属性上的数字，读不到 CSS 变量，所以由系统尺度（分、线宽）换算出来，
 * 项目调了分或线宽，数据图和其他组件一起动。每个长度写明它与分的关系；关系是选择或预设的，如实标出，不写成推导。
 * 不是长度的（占比、个数、层级、色阶百分数）与不随模数走的像素要求（Scatter 的命中半径）不在这里，留在各自的文件里。
 */
export type ChartGeometry = {
  /** 标记的边长 = 2 分（基础层 §7：标记 2 分）。 */
  mark: number;
  /** 标记外那圈纸色、柱与柱之间的空隙、环形图分段之间的空隙 = 半分（基础层 §7：相邻的柱之间留半分纸色空隙）。 */
  surfaceGap: number;
  /** 纸色圈的描边宽 = 2 × 空隙：描边以轮廓为中线，向外露出的一半正好是空隙。 */
  ring: number;
  /** 柱的最大宽 = 6 分（「柱子细（≤ 6 分）」）。 */
  barMax: number;
  /** 柱数据端的圆角 = 1 分（「数据端圆角 1 分」）。 */
  barRadius: number;
  /** 标值与柱端的间距 = 1 分（与柱的圆角同一尺）。 */
  labelGap: number;
  /** 数据线宽 = 半分。预设：基础层只写了「线 2px」，没有更近的关系；取半分是因为它随模数一起长，标记（2 分）与线的比例不变。 */
  stroke: number;
  /** 细线 = 线宽：网格、轴线、悬停游标、参照线、背景系列。 */
  hairline: number;
  /** 图例键的宽 = 4 分（两个标记宽，标记居中、两侧各留半个标记）。预设。 */
  keyWidth: number;
  /** 类别刻度文字之间最小的间隔 = 2 分。预设。 */
  tickGap: number;
  /** 轴宽在文字估宽之外多留的 = 2 分，刻度文字与绘图区之间的呼吸。预设。 */
  axisGutter: number;
};

/** 系统尺度换算成数据图几何。默认令牌（分 4px、线宽 1px）下得到的数与此前写死的字面量逐个相同。 */
export function chartGeometry({ fen, line }: SystemUnits): ChartGeometry {
  return {
    mark: 2 * fen,
    surfaceGap: fen / 2,
    ring: fen,
    barMax: 6 * fen,
    barRadius: fen,
    labelGap: fen,
    stroke: fen / 2,
    hairline: line,
    keyWidth: 4 * fen,
    tickGap: 2 * fen,
    axisGutter: 2 * fen,
  };
}

const DEFAULT_GEOMETRY = chartGeometry(SYSTEM_UNITS_FALLBACK);

/** 图的根节点在它所处的主题 / 密度根下量出的几何，由 Chart、ScatterChart 提供；图外使用时是默认令牌下的几何。 */
export const ChartGeometryContext = React.createContext<ChartGeometry>(DEFAULT_GEOMETRY);

/** 自定义绘图（`renderPlot`）与图内部件读取同一份几何，不要再写死像素。 */
export function useChartGeometry(): ChartGeometry {
  return React.useContext(ChartGeometryContext);
}

/**
 * 数据图悬停读数的面（Chart、ScatterChart、Heatmap 共用）：浮起的提示面，与 Tooltip 同一内缘（--qy-hint-padding-*，
 * 外缘到内容，所以减去线宽）。读数的行间 1 分。2026-10-13 之前行向读填值控件的内缘（随密度变），块向 2 分加一道线。
 */
export const READOUT_SURFACE = "rounded-overlay border border-border bg-popover px-[calc(var(--qy-hint-padding-inline)-var(--qy-line-width))] py-[calc(var(--qy-hint-padding-block)-var(--qy-line-width))] text-support text-popover-foreground shadow-(--qy-shadow-raised)";
