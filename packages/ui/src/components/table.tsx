"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import { cn } from "../utils";

/*
 * 比较表（基础层 §6「成对与成列的数据」、§19）。
 * - 绘事后素：数据集合是一个独立对象，铺一张纸（纸本色 + 清墨线 + 面板圆角）；纸外是底纸。
 * - 骨法用笔：表头与合计行用清染底划出范围，不再画重墨线（一个范围一种机制，NG11）；
 *   行与行之间一道清墨线，最后一行没有线。
 * - 疏密有致：单元格左右各半个组间距，列与列之间正好一个组间距；首尾单元格留面板内缘，
 *   与所有面板的内缘一致。标记列不另设留白，同一条规则即成比例。
 * - 行气：正文一行 = 一个控件 + 上下各一个组内间隔（行高 48），下留白扣去底线 1px；
 *   表头与合计行 = 一材 + 上下各一个组内间隔（36），只放一行字，28px 的排序按钮在其中整数居中。
 *   单元格垂直居中；单元格里的控件贴行盒顶部（vertical-align:middle 按 x 高度定位会落在小数上）。
 * - 分离边框（材有美）：border-collapse 让相邻单元格共用一条 1px 线，浏览器把它劈成两个半像素。
 * - 墨分五色：表头是列的名字，13px 浓墨；数据是焦墨。行标题靠位置识别，不加字重（强调是稀缺资源）。
 */
const cellX = "px-[calc(var(--qy-panel-gap)/2)] first:ps-(--qy-panel-padding) last:pe-(--qy-panel-padding)";

export type TableContainerProps = useRender.ComponentProps<"div"> & {
  /** false：表格放在已有的一张纸上（Card、面板），不再铺第二张——没有线、底与圆角，由承载它的纸给出。 */
  framed?: boolean;
};
/**
 * 表格的纸。可横向滚动，所以可以获得焦点；焦点让已有的清墨线加深为焦墨，不另画一圈。
 * framed={false} 时没有自己的线可以加深，焦点改为盒内一条细线（与 TabsPanel 同一画法）。
 * 单元格首尾仍留面板内缘：贴着承载面的边放置时，首列文字与那张纸的其它内容同一条竖线。
 */
export function TableContainer({ framed = true, render, className, ...props }: TableContainerProps) {
  return useRender({ defaultTagName: "div", render, props: mergeProps({ "data-slot": "table-container", "data-framed": framed, tabIndex: 0, className: cn("min-w-0 max-w-full overflow-x-auto outline-none", framed ? "rounded-panel border border-border bg-surface focus-visible:border-ring" : "focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className) }, props) });
}
export type TableProps = useRender.ComponentProps<"table">;
export function Table({ render, className, ...props }: TableProps) {
  return useRender({ defaultTagName: "table", render, props: mergeProps({ "data-slot": "table", className: cn("w-full border-separate border-spacing-0 text-body text-foreground", className) }, props) });
}
export type TableCaptionProps = useRender.ComponentProps<"caption">;
/** 表名在纸内第一行，左缘与首列文字对齐：上留小面板内缘，下留一个组内间隔，与表头相接。 */
export function TableCaption({ render, className, ...props }: TableCaptionProps) {
  return useRender({ defaultTagName: "caption", render, props: mergeProps({ "data-slot": "table-caption", className: cn("px-(--qy-panel-padding) pt-(--qy-panel-padding-sm) pb-(--qy-field-gap) text-start text-body-strong text-foreground wrap-anywhere", className) }, props) });
}
export type TableHeaderProps = useRender.ComponentProps<"thead">;
export function TableHeader({ render, className, ...props }: TableHeaderProps) {
  return useRender({ defaultTagName: "thead", render, props: mergeProps({ "data-slot": "table-header", className: cn("[&>tr]:h-[calc(var(--qy-cai)+2*var(--qy-field-gap))] [&>tr]:bg-surface-inset [&>tr>*]:border-b-0 [&>tr>*]:py-0", className) }, props) });
}
export type TableBodyProps = useRender.ComponentProps<"tbody">;
export function TableBody({ render, className, ...props }: TableBodyProps) {
  return useRender({ defaultTagName: "tbody", render, props: mergeProps({ "data-slot": "table-body", className: cn("[&>tr:last-child>*]:border-b-0 [&>tr:last-child>*]:pb-(--qy-field-gap)", className) }, props) });
}
export type TableFooterProps = useRender.ComponentProps<"tfoot">;
export function TableFooter({ render, className, ...props }: TableFooterProps) {
  return useRender({ defaultTagName: "tfoot", render, props: mergeProps({ "data-slot": "table-footer", className: cn("font-medium [&>tr]:h-[calc(var(--qy-cai)+2*var(--qy-field-gap))] [&>tr]:bg-surface-inset [&>tr>*]:border-b-0 [&>tr>*]:py-0", className) }, props) });
}
export type TableRowProps = useRender.ComponentProps<"tr">;
export function TableRow({ render, className, ...props }: TableRowProps) {
  return useRender({ defaultTagName: "tr", render, props: mergeProps({ "data-slot": "table-row", className: cn("h-(--qy-row-default) [&>*]:border-b [&>*]:border-border", className) }, props) });
}
export type TableHeadProps = useRender.ComponentProps<"th">;
/**
 * 列标题是列的名字（13px 浓墨中等字重）；行标题（scope="row"）是正文里的一格，靠位置识别。
 * 列标题里放排序用的小号无框按钮时，按钮向两侧让出自己的内缘，文字仍落在列缘上——
 * 一列一条边（§19）；悬停底向外伸出，不把列名推进去。
 */
export function TableHead({ render, className, scope = "col", ...props }: TableHeadProps) {
  return useRender({ defaultTagName: "th", render, props: mergeProps({ "data-slot": "table-head", scope, className: cn(cellX, "pt-(--qy-field-gap) pb-[calc(var(--qy-field-gap)-1px)] text-start align-middle [&>[data-slot]]:align-top", scope === "row" ? "text-body font-normal text-foreground" : "whitespace-nowrap text-label text-muted-foreground [&>[data-variant][data-shape]]:-mx-(--qy-control-sm-padding)", className) }, props) });
}
export type TableCellProps = useRender.ComponentProps<"td">;
export function TableCell({ render, className, ...props }: TableCellProps) {
  return useRender({ defaultTagName: "td", render, props: mergeProps({ "data-slot": "table-cell", className: cn(cellX, "pt-(--qy-field-gap) pb-[calc(var(--qy-field-gap)-1px)] align-middle [&>[data-slot]]:align-top", className) }, props) });
}
