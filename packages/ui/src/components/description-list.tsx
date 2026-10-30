"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { readSystemUnits } from "../system-units";
import { cn } from "../utils";

type DescriptionListLayout = "stacked" | "inline";
export type DescriptionListProps = useRender.ComponentProps<"dl"> & {
  /**
   * 并排的组数上限，默认 1。容器放不下时自动退回更少列（见下方 COLUMN_MIN_FEN）；
   * 条目按 DOM 顺序逐行排开（先横后纵），读屏顺序与视觉顺序一致。
   */
  columns?: number;
  /**
   * stacked（默认）：名称在左、值在右成对，多组共用名列定宽。
   * inline：每个条目是名称在上、值在下的一小块，块与块横排——适合「创建人 / 创建时间 / 状态」这类事实条。
   */
  layout?: DescriptionListLayout;
};
const ListContext = React.createContext<{ layout: DescriptionListLayout; paired: boolean }>({ layout: "stacked", paired: false });

/*
 * 一组「名称 + 值」至少要有的宽度——预设，不由单一关系推出：名称通常 2～6 字，加上与值之间的间隔，
 * 再留一段能读完一个短值（日期、状态、一句短语）的宽度，量下来 12 材（一材 = 5 分，即 60 分；默认 240px）
 * 以下名称与值就开始互相挤压。要更宽的值就少设 columns，而不是调这个数。
 * 用「分」而不是像素，因为分是系统尺度（调密度或分值时它跟着动）。
 */
const COLUMN_MIN_FEN = 60;
// inline 的块是名称叠值，没有名列要对齐，最小宽度只需容下一个短值：8 材（预设）。
const INLINE_BLOCK_MIN = "calc(8*var(--qy-cai))";

/** stacked 的多列：按容器实宽算出放得下几组，装不下的退回更少列。尚未量到宽度（首帧、无 ResizeObserver）时按请求的列数。 */
function useFittingColumns(ref: React.RefObject<HTMLElement | null>, requested: number, enabled: boolean) {
  const [fit, setFit] = React.useState(requested);
  React.useLayoutEffect(() => {
    const element = ref.current;
    if (!enabled || !element) { setFit(requested); return; }
    const measure = () => {
      const width = element.clientWidth;
      if (!width) { setFit(requested); return; }
      const gap = Number.parseFloat(getComputedStyle(element).columnGap) || 0;
      const min = COLUMN_MIN_FEN * readSystemUnits(element).fen;
      setFit(Math.max(1, Math.min(requested, Math.floor((width + gap) / (min + gap)))));
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [ref, requested, enabled]);
  return fit;
}

/**
 * 基础层 §6（2026-10-05 打磨）：名称与值的列表默认是「名列按内容宽度、值列占其余」
 * 的两列关系，不是 50/50 的硬分栏——名称通常两三个字，五五分会把值和名字之间
 * 空出一大块，读起来不再成对。
 *
 * 为什么列由**列表**定义、条目用 subgrid 继承：每个条目各自开网格的话，每行的
 * 名列会按自己的内容独立定宽，多行之间左右都不齐，看上去像随手排的。父级定列、
 * 条目按 subgrid 对齐，整份值表共用同一条起始线（design.md「用关系成组」）。
 * 窄屏回到单列，名称在上、值在下——两列在手机上会把值挤到无处放下。
 *
 * 多列（columns > 1）：每组仍是「名称 · 值」一对，父级轨道写成 N 组 `max-content 1fr`，
 * 条目各占两轨，同一列的名称因此仍共用一条值的起始线。宽度不够时退回更少列，由容器实宽决定，
 * 不看视口（同一个列表放进窄侧栏与放进整页，该有的列数不同）。
 */
export function DescriptionList({ render, className, columns = 1, layout = "stacked", style, ref, ...props }: DescriptionListProps) {
  if (!Number.isInteger(columns) || columns < 1) throw new RangeError(`DescriptionList columns must be a positive integer; received ${String(columns)}.`);
  const root = React.useRef<HTMLElement | null>(null);
  const fit = useFittingColumns(root, columns, layout === "stacked" && columns > 1);
  const inline = layout === "inline";
  const paired = !inline && fit > 1;
  const gridStyle: React.CSSProperties | undefined = paired
    ? { gridTemplateColumns: `repeat(${fit}, max-content minmax(0, 1fr))` }
    : inline && columns > 1
      ? { gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, max(${INLINE_BLOCK_MIN}, (100% - ${columns - 1} * var(--qy-field-group-gap)) / ${columns})), 1fr))` }
      : undefined;
  const classes = inline
    ? cn("m-0 min-w-0 text-body gap-x-(--qy-field-group-gap) gap-y-(--qy-panel-gap)", columns > 1 ? "grid" : "flex flex-wrap")
    : paired
      ? "m-0 grid min-w-0 gap-x-(--qy-field-group-gap) gap-y-(--qy-panel-gap) text-body"
      : "m-0 flex min-w-0 flex-col gap-(--qy-panel-gap) text-body sm:grid sm:grid-cols-[max-content_minmax(0,1fr)] sm:gap-x-(--qy-field-group-gap)";
  return <ListContext.Provider value={{ layout, paired }}>{useRender({ defaultTagName: "dl", render, ref: [ref ?? null, root], props: mergeProps({ "data-slot": "description-list", "data-layout": layout, "data-columns": inline ? columns : fit, className: cn(classes, className), ...(gridStyle ? { style: { ...gridStyle, ...style } } : style ? { style } : {}) }, props) })}</ListContext.Provider>;
}
export type DescriptionListItemProps = useRender.ComponentProps<"div">;
export function DescriptionListItem({ render, className, ...props }: DescriptionListItemProps) {
  const { layout, paired } = React.useContext(ListContext);
  // inline：名称叠值，块自成一格，没有名列可继承。
  const classes = layout === "inline"
    ? "grid min-w-0 content-start gap-y-(--qy-field-gap)"
    : cn("grid min-w-0 gap-x-(--qy-field-gap) gap-y-(--qy-field-gap)", paired ? "col-span-2 grid-cols-subgrid" : "sm:col-span-2 sm:grid-cols-subgrid");
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "description-list-item", className: cn(classes, className) }, props) });
}
export type DescriptionListTermProps = useRender.ComponentProps<"dt">;
export function DescriptionListTerm({ render, className, ...props }: DescriptionListTermProps) {
  // 名称与值同为前景色：名称靠字重分主次，不靠降灰——辅助文字降灰会让「这是什么」
  // 比「它是什么」还淡，而名称恰恰是读到值之后要用来定位的那一列。
  return useRender({ defaultTagName: "dt", render, props: mergeProps({ "data-slot": "description-list-term", className: cn("min-w-0 text-body-strong wrap-anywhere", className) }, props) });
}
export type DescriptionListDetailProps = useRender.ComponentProps<"dd">;
export function DescriptionListDetail({ render, className, ...props }: DescriptionListDetailProps) {
  return useRender({ defaultTagName: "dd", render, props: mergeProps({ "data-slot": "description-list-detail", className: cn("m-0 min-w-0 text-foreground wrap-anywhere", className) }, props) });
}
