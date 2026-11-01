"use client";

import { mergeProps } from "@base-ui/react/merge-props";
import { useRender } from "@base-ui/react/use-render";
import * as React from "react";
import { useOverflowEdges, useScrollbarGutter } from "../hooks/use-scrollable";
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
 * - 长内容在数据格（含行标题）里允许任意位置折行（wrap-anywhere）：一串没有空格的长标识符不能把列撑出纸外，
 *   读者宁可读到折开的整串，也不要被裁掉或要横向滚动才见全貌。列标题仍单行；截断（ellipsis）是列的显式选择，不受影响。
 */
const cellX = "px-[calc(var(--qy-panel-gap)/2)] first:ps-(--qy-panel-padding) last:pe-(--qy-panel-padding)";

export type TableContainerProps = useRender.ComponentProps<"div"> & {
  /** false：表格放在已有的一张纸上（Card、面板），不再铺第二张——没有线、底与圆角，由承载它的纸给出。 */
  framed?: boolean;
  /**
   * 横向溢出提示：还有内容的一端渐隐，滚到头的一端不渐隐。默认两端。
   * "end"：只渐隐末端——起始端有固定列（DataTable 的 pinned）时，固定列自己的末端线已说明「向起始端还有内容」，
   * 渐隐不能再去淡化一列要保持不透明的固定列。false：不渐隐。
   */
  fade?: boolean | "end";
};
/*
 * 横向溢出的渐隐（做法同 ScrollArea 的 fade：data-overflow-x-* + 只取透明度的遮罩，宽度读同一个 --qy-scroll-fade，
 * 取 --qy-fill-height，预设，理由见 scroll-area.tsx）。这里只有横向一轴。
 * 遮罩五层，自上而下：竖向滚动条条带、横向滚动条条带（均以 add 并上去，滚动条本身不随渐隐变淡）、横向渐变（只铺在滚动条之外，
 * clip 到内边框盒）、边框盒、内缘盒。后两层以 exclude 叠成一圈「线带」，再并入前面的结果：
 * 遮罩作用于元素自己画的一切，包括它的边框与焦点线，而线是范围与焦点的标记，不是内容，不能随内容一起渐隐。
 * 线带 = 边框盒减去「内缘盒」；内缘盒是内边框盒再向内缩一圈 --qy-table-band：framed 时为 0（线带恰是边框），
 * 无边框的 framed={false} 时取焦点细线的宽度（它的焦点线画在盒内的 inset ring，宽度读 --qy-focus-quiet-width）。
 * 渐隐会连同这张纸自己的底（bg-surface）一起变淡，露出纸后面的底；纸与底只差一档清染，所以接受（预设），不另造不被遮罩的底。
 * scroll-padding 取同一宽度，使键盘把焦点移向被切掉的内容时，浏览器把它滚进渐隐之内，不被遮。
 * overscroll-behavior-x: contain：横向滚到头不把滚动链交给外层（浏览器的「后退」手势或外层横向滚动区）。
 */
const fadeClassName = [
  "[--qy-scroll-fade:var(--qy-fill-height)] [--qy-scroll-fade-x-start:0px] [--qy-scroll-fade-x-end:0px]",
  "data-overflow-x-start:[--qy-scroll-fade-x-start:var(--qy-scroll-fade)] data-overflow-x-end:[--qy-scroll-fade-x-end:var(--qy-scroll-fade)]",
  "[&[data-overflow-x-start],&[data-overflow-x-end]]:[mask-composite:add,add,add,exclude,add] [&[data-overflow-x-start],&[data-overflow-x-end]]:[-webkit-mask-composite:source-over,source-over,source-over,xor,source-over] [&[data-overflow-x-start],&[data-overflow-x-end]]:[mask-repeat:no-repeat]",
  "[&[data-overflow-x-start],&[data-overflow-x-end]]:[mask-origin:border-box,border-box,border-box,border-box,padding-box] [&[data-overflow-x-start],&[data-overflow-x-end]]:[mask-clip:border-box,border-box,padding-box,border-box,padding-box]",
  "[&[data-overflow-x-start],&[data-overflow-x-end]]:[mask-size:var(--qy-scrollbar-y)_100%,100%_var(--qy-scrollbar-x),calc(100%-var(--qy-scrollbar-y))_calc(100%-var(--qy-scrollbar-x)),100%_100%,calc(100%-2*var(--qy-table-band))_calc(100%-2*var(--qy-table-band))]",
  "[&[data-overflow-x-start],&[data-overflow-x-end]]:[mask-position:right_top,left_bottom,left_top,left_top,center] rtl:[&[data-overflow-x-start],&[data-overflow-x-end]]:[mask-position:left_top,left_bottom,right_top,left_top,center]",
  "[&[data-overflow-x-start],&[data-overflow-x-end]]:[mask-image:linear-gradient(currentcolor,currentcolor),linear-gradient(currentcolor,currentcolor),linear-gradient(to_right,transparent_0,currentcolor_var(--qy-scroll-fade-x-start),currentcolor_calc(100%-var(--qy-scroll-fade-x-end)),transparent_100%),linear-gradient(currentcolor,currentcolor),linear-gradient(currentcolor,currentcolor)]",
  "rtl:[&[data-overflow-x-start],&[data-overflow-x-end]]:[mask-image:linear-gradient(currentcolor,currentcolor),linear-gradient(currentcolor,currentcolor),linear-gradient(to_left,transparent_0,currentcolor_var(--qy-scroll-fade-x-start),currentcolor_calc(100%-var(--qy-scroll-fade-x-end)),transparent_100%),linear-gradient(currentcolor,currentcolor),linear-gradient(currentcolor,currentcolor)]",
].join(" ");
/**
 * 表格的纸。内容真的超出时（横向或纵向）才可以获得焦点，用于键盘滚动（WCAG 2.1.1）；放得下时不进 Tab 序列——
 * 一张不能滚动的表多一个停靠点，只是让键盘用户多按一次 Tab。焦点让已有的清墨线加深为焦墨，不另画一圈。
 * framed={false} 时没有自己的线可以加深，焦点改为盒内一条细线（与 TabsPanel 同一画法）。
 * 单元格首尾仍留面板内缘：贴着承载面的边放置时，首列文字与那张纸的其它内容同一条竖线。
 *
 * 可滚动由实测决定（scrollWidth/scrollHeight 对 clientWidth/clientHeight），容器与其子节点任一尺寸变化时重测。
 * 服务端与首帧一律按「不可滚动」：服务端没有布局可测，猜「可滚动」会让多数放得下的表在 SSR 输出里先带一个假的停靠点；
 * 客户端在首次绘制之前（layout effect）就测量并更新，所以真正溢出的表在用户能按键之前已经可聚焦。
 * 可聚焦时才成为一个具名区域（role=region）：优先用调用方给的 aria-label / aria-labelledby，
 * 否则沿用表自己的名字——caption，或 Table 上的 aria-labelledby / aria-label；都没有就不加 role，只保留焦点。
 * 调用方显式传入的 tabIndex 仍然优先。
 *
 * 放得下时用 overflow: clip 而不是 auto：clip 照样裁掉超出纸的内容（含圆角），但不构成滚动容器，
 * 于是吸顶表头（TableHeader sticky）越过它，吸在外面最近的滚动区——页面，或 Workspace 的内容区。
 * 真溢出时换回 overflow-x: auto，表头只能吸在这张表自己的滚动区里（横向滚动容器的 y 轴也算滚动）。
 * 服务端与首帧按「放得下」输出 clip；客户端在首次绘制前测量，真溢出的宽表在可交互之前已换成可滚动。
 * 横向还有内容的一端渐隐（fade），渐隐的两端由滚动位置实测（首帧无渐隐，挂载后量一次）。
 */
export function TableContainer({ framed = true, fade = true, render, className, ref, ...props }: TableContainerProps) {
  const element = React.useRef<HTMLDivElement | null>(null);
  const [scrollable, setScrollable] = React.useState(false);
  const [tableName, setTableName] = React.useState<{ labelledby?: string | undefined; label?: string | undefined }>({});
  const generated = React.useId();
  const [gutterRef, gutter] = useScrollbarGutter<HTMLDivElement>(ref);
  const [edgesRef, edges] = useOverflowEdges<HTMLDivElement>(gutterRef);
  React.useLayoutEffect(() => {
    const node = element.current; if (!node) return;
    const measure = () => {
      setScrollable(node.scrollWidth > node.clientWidth || node.scrollHeight > node.clientHeight);
      const table = node.querySelector<HTMLElement>(":scope > table"); const caption = table?.querySelector<HTMLElement>(":scope > caption");
      if (caption && !caption.id) caption.id = `${generated}-caption`;
      const labelledby = caption?.id || table?.getAttribute("aria-labelledby") || undefined; const label = table?.getAttribute("aria-label") || undefined;
      setTableName(previous => previous.labelledby === labelledby && previous.label === label ? previous : { labelledby, label });
    };
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure); const watched = new Set<Element>();
    const watch = () => { for (const child of [node, ...node.children]) if (!watched.has(child)) { watched.add(child); observer.observe(child); } };
    watch();
    const mutations = new MutationObserver(() => { watch(); measure(); }); mutations.observe(node, { childList: true, subtree: true, attributeFilter: ["aria-label", "aria-labelledby"] });
    return () => { observer.disconnect(); mutations.disconnect(); };
  }, [generated]);
  const named = props["aria-label"] != null || props["aria-labelledby"] != null;
  const borrowed = scrollable && !named ? tableName : {};
  const region = scrollable && (named || borrowed.labelledby !== undefined || borrowed.label !== undefined);
  const fading = fade !== false;
  // relative：容器是单元格里绝对定位内容（sr-only 等）的定位参照。否则它们以容器外的祖先为参照，逃出横向滚动的裁剪，把整页撑宽。
  return useRender({ defaultTagName: "div", render, ref: [element, edgesRef], props: mergeProps({ "data-slot": "table-container", "data-framed": framed, tabIndex: scrollable ? 0 : undefined, role: region ? "region" : undefined, "aria-labelledby": borrowed.labelledby, "aria-label": borrowed.labelledby === undefined ? borrowed.label : undefined,
    ...(fading ? { "data-overflow-x-start": fade === true && edges.start ? "" : undefined, "data-overflow-x-end": edges.end ? "" : undefined, style: { "--qy-scrollbar-y": `${gutter.y}px`, "--qy-scrollbar-x": `${gutter.x}px` } as React.CSSProperties } : {}),
    className: cn("relative min-w-0 max-w-full overscroll-x-contain outline-none", scrollable ? "overflow-x-auto" : "overflow-clip", fading && fadeClassName, fading && (fade === true ? "scroll-px-(--qy-scroll-fade)" : "scroll-pe-(--qy-scroll-fade)"), framed ? "[--qy-table-band:0px] rounded-panel border border-border bg-surface focus-visible:border-ring" : "[--qy-table-band:var(--qy-focus-quiet-width)] focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset", className) }, props) });
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
export type TableHeaderProps = useRender.ComponentProps<"thead"> & {
  /**
   * 表头吸在最近的滚动区顶部。表格横向放得下时，TableContainer 不是滚动容器（见上），表头吸在页面或 Workspace 内容区；
   * 横向溢出、需要左右滚动的宽表，TableContainer 本身成了滚动容器，表头只在它自己的有界高度里吸住——
   * 给 TableContainer（DataTable 的 containerProps）设了 max-height / height，或 DataTable 的虚拟化视口。
   * 吸住时要盖住从下面滚过的行，所以底是不透明的纸（bg-surface，与 framed 的承载面同一个底）；清染表头底叠在其上。
   * 层级 z-[1] 是预设：只需盖过同一张表里同为定位元素的固定列单元格（它们在 DOM 里排在表头之后），不参与浮层栈。
   */
  sticky?: boolean;
  /** 吸住时离滚动区顶部的距离：滚动区顶上还有一条固定的页眉或工具栏时，让开它的高度。数字按 px，字符串是 CSS 长度（如 "var(--app-header)"）。 */
  stickyOffset?: number | string | undefined;
};
export function TableHeader({ render, className, sticky = false, stickyOffset, ...props }: TableHeaderProps) {
  return useRender({ defaultTagName: "thead", render, props: mergeProps({ "data-slot": "table-header", "data-sticky": sticky || undefined, style: sticky && stickyOffset !== undefined ? { top: stickyOffset } : undefined, className: cn(sticky && "sticky top-0 z-[1] bg-surface", "[&>tr]:h-(--qy-header-row) [&>tr]:bg-surface-inset [&>tr>*]:border-b-0 [&>tr>*]:py-0", className) }, props) });
}
export type TableBodyProps = useRender.ComponentProps<"tbody">;
export function TableBody({ render, className, ...props }: TableBodyProps) {
  return useRender({ defaultTagName: "tbody", render, props: mergeProps({ "data-slot": "table-body", className: cn("[&>tr:last-child>*]:border-b-0 [&>tr:last-child>*]:pb-(--qy-field-gap)", className) }, props) });
}
export type TableFooterProps = useRender.ComponentProps<"tfoot">;
export function TableFooter({ render, className, ...props }: TableFooterProps) {
  return useRender({ defaultTagName: "tfoot", render, props: mergeProps({ "data-slot": "table-footer", className: cn("font-medium [&>tr]:h-(--qy-header-row) [&>tr]:bg-surface-inset [&>tr>*]:border-b-0 [&>tr>*]:py-0", className) }, props) });
}
export type TableRowProps = useRender.ComponentProps<"tr">;
export function TableRow({ render, className, ...props }: TableRowProps) {
  return useRender({ defaultTagName: "tr", render, props: mergeProps({ "data-slot": "table-row", className: cn("h-(--qy-row-default) [&>*]:border-b [&>*]:border-border", className) }, props) });
}
/**
 * 数值列由列的调用方声明，不由内容猜：`numeric` 同时让这一列的表头与单元格在行内末端对齐（text-end，RTL 下在左）并用等宽数字——
 * 数位对齐才能比较大小（基础层 §19）。表头与单元格必须同时声明，否则列名与数字各靠一边。
 * 表头里的排序按钮内容反向排列（写成「列名、箭头」，显示为「箭头、列名」）：列名紧贴末端，与单元格数字的末端边是同一条线。
 * 声明写在 data-numeric 上，供样式之外的消费者（测试、审计）读取。
 */
type NumericColumn = { numeric?: boolean | undefined };
export type TableHeadProps = useRender.ComponentProps<"th"> & NumericColumn;
/**
 * 列标题是列的名字（13px 浓墨中等字重）；行标题（scope="row"）是正文里的一格，靠位置识别。
 * 列标题里放排序用的小号无框按钮时，按钮向两侧让出自己的内缘，文字仍落在列缘上——
 * 一列一条边（§19）；悬停底向外伸出，不把列名推进去。
 */
export function TableHead({ render, className, scope = "col", numeric = false, ...props }: TableHeadProps) {
  return useRender({ defaultTagName: "th", render, props: mergeProps({ "data-slot": "table-head", scope, "data-numeric": numeric || undefined, className: cn(cellX, "pt-(--qy-field-gap) pb-[calc(var(--qy-field-gap)-var(--qy-line-width))] text-start align-middle [&>[data-slot]]:align-top", scope === "row" ? "text-body font-normal text-foreground wrap-anywhere" : "whitespace-nowrap text-label text-muted-foreground [&>[data-variant][data-shape]]:-mx-(--qy-control-sm-padding)", numeric && "text-end numeric [&_[data-slot=button-content]]:flex-row-reverse", className) }, props) });
}
export type TableCellProps = useRender.ComponentProps<"td"> & NumericColumn;
export function TableCell({ render, className, numeric = false, ...props }: TableCellProps) {
  return useRender({ defaultTagName: "td", render, props: mergeProps({ "data-slot": "table-cell", "data-numeric": numeric || undefined, className: cn(cellX, "pt-(--qy-field-gap) pb-[calc(var(--qy-field-gap)-var(--qy-line-width))] align-middle wrap-anywhere [&>[data-slot]]:align-top", numeric && "text-end numeric", className) }, props) });
}
