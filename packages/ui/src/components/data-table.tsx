"use client";
import { flexRender, functionalUpdate, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type CellContext, type HeaderContext, type Column, type ColumnDef, type Row, type RowSelectionState, type SortingState, type Table as TableInstance } from "@tanstack/react-table";
import { defaultRangeExtractor, measureElement, observeElementRect, useVirtualizer, type Range, type VirtualizerOptions } from "@tanstack/react-virtual";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { Checkbox, type CheckboxProps } from "./checkbox";
import { PaginationPattern, normalizePaginationValue, type PaginationValue } from "./pagination";
import { Progress, ProgressIndicator, ProgressTrack } from "./progress";
import { Tooltip, TooltipPopup, TooltipTrigger } from "./tooltip";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow, type TableProps, type TableContainerProps } from "./table";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type DataTableInstance<TData> = TableInstance<TData>;
export type DataTableColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue>;
export interface DataTableColumnMeta {
  /**
   * 这一列是行标题（th scope="row"）。每一行的可访问名称取自该行所有行标题单元格（行的 aria-labelledby 指向它们）；
   * 设置了 onRowActivate 时至少要有一个可见的行标题列，否则抛错。
   */
  rowHeader?: boolean;
  /** 这一列只放一个标记（复选框、行操作）：由内容定宽（w-line），留白与文字列同一条规则。 */
  marker?: boolean;
  /**
   * 数值列：由列定义声明，不由内容猜。表头与该列每个单元格同一对齐——行内末端（RTL 下在左）并用等宽数字，数位对齐才能比较大小（基础层 §19）。
   * 落到 TableHead / TableCell 的 `numeric` 属性与 `data-numeric`；DataTablePattern 的列配置同名。
   */
  numeric?: boolean;
  /**
   * 对非交互文字启用单行省略。完整文字始终在 DOM 里，读屏读到全文（省略只是视觉）；
   * 真的被截断时，该格可获得键盘焦点并用 Tooltip 显示全文（悬停、聚焦均可）。含控件的内容不裁切。
   */
  ellipsis?: boolean;
  /** 固定在行内起点（RTL 下为右侧）。只允许从第一列起连续的前导列，否则抛错；其宽度由表头单元格实测，后一个固定列接在前一个之后。 */
  pinned?: boolean;
}
/**
 * 标记列的宽度不是一个尺寸预设，而是一条「谁吸收剩余空间」的关系：表格宽 100%，
 * 文字列吸收全部剩余宽度，标记列只占它自己的内容宽（width:1% 是让浏览器把该列
 * 压到最小的标准写法，实际宽度仍由其中的复选框决定）。列宽比例由表头与单元格
 * 共同决定，所以两处都写。
 */
const cellWidth = (meta: DataTableColumnMeta | undefined) => meta?.marker ? "w-px" : undefined;
export type DataTableVirtualization = {
  /** The scroll viewport includes the caption and header. Actual row heights are measured. */
  height: number;
  estimateRowHeight: number;
  overscan?: number;
};
/*
 * 固定列的底：横向滚动时其它列从它下面经过，所以必须不透明。
 * 纸色（bg-surface）是 framed 承载面的底，再叠上这一行自己的清染（表头的内嵌面、选中/活动行的选中面）——
 * 与行上同一层半透明色叠在同一张纸上的结果相同，选中行里不会露出另一块底色。framed={false} 时承载面由调用方给出，这里仍读纸色（预设）。
 * 悬停同理：行（group/row）被悬停时，固定列自己的底也叠上悬停面，与行上其余单元格是同一层色叠在同一张纸上——
 * 否则横向滚动的宽表里，固定列在悬停行上会比其余单元格浅一档，读者对不准「同一行」。选中行不加悬停层（选中面已是更深一档，悬停不覆盖它）。
 */
const pinFill = { head: "[background-image:linear-gradient(var(--qy-surface-inset),var(--qy-surface-inset))]", selected: "[background-image:linear-gradient(var(--qy-surface-selected),var(--qy-surface-selected))]", plain: "group-hover/row:[background-image:linear-gradient(var(--qy-surface-hover),var(--qy-surface-hover))]" } as const;
/* 末端的线：面无法划出范围时才出现（骨法用笔）——横向滚动后其它列从固定列下面经过才画；线宽读 w-line，色读 border。伪元素不占布局，出现与否不挪动单元格。 */
const pinEdge = "after:pointer-events-none after:absolute after:inset-y-0 after:end-0 after:w-line after:bg-border after:content-[''] after:opacity-0 data-scrolled:after:opacity-100";
const pinClass = (fill: keyof typeof pinFill, edge: boolean) => cn("sticky bg-surface", pinFill[fill], edge && pinEdge);
export type DataTableProps<TData> = Omit<TableProps, "children"> & {
  table: TableInstance<TData>;
  caption?: React.ReactNode;
  emptyContent: React.ReactNode;
  /**
   * 正在取数。旧数据行原样保留（已有内容刷新时保留仍然有效的工作面），表格顶缘出现一条不定进度记号，不推挤布局；
   * aria-busy 仍然设置。数据、请求与完成时机由应用持有。
   */
  busy?: boolean;
  /**
   * 取数失败等需要读者处理的情况，由应用给出内容（说明与重试动作）；组件只把它摆在表格上方并声明 role="alert"。
   * 出现错误时旧数据行不撤走：它们仍是读者可用的工作面，是否过期由应用在错误内容里说明。
   */
  error?: React.ReactNode;
  activeRowId?: string | null;
  /** Checkbox mode removes only the selected-row fill; selection controls and active-row emphasis remain. */
  selectionAppearance?: "row" | "checkbox";
  /** Click noninteractive row content, or focus the row and press Enter / Space. Never toggles selection. 需要至少一个可见的 meta.rowHeader 列来给每一行命名，否则抛错。 */
  onRowActivate?: (row: Row<TData>) => void;
  virtualization?: DataTableVirtualization;
  containerProps?: TableContainerProps;
  /**
   * 表头吸顶，吸在最近的滚动区：表格横向放得下时是页面或 Workspace 内容区；横向溢出的宽表、虚拟化视口，
   * 或 containerProps 设了 height / max-height 时，是表格自己的容器（见 TableHeader 的 sticky）。
   */
  stickyHeader?: boolean;
  /** 见 TableHeader 的 stickyOffset：滚动区顶上有固定页眉时让开它的高度。 */
  stickyHeaderOffset?: number | string | undefined;
};
const interactiveContent = "a[href],area[href],button,input,select,textarea,label,summary,details,iframe,object,embed,audio[controls],video[controls],[contenteditable]:not([contenteditable=false]),[role=button],[role=link],[role=checkbox],[role=radio],[role=switch],[role=menuitem],[role=option],[tabindex],[data-row-activate-ignore]";
function isRowInteraction(event: React.MouseEvent<HTMLTableRowElement> | React.KeyboardEvent<HTMLTableRowElement>) {
  const target = event.target;
  if (!(target instanceof Element) || target.closest("tr") !== event.currentTarget) return false;
  const interactive = target.closest(interactiveContent);
  // 被截断的单元格内容为了键盘与读屏获得焦点（tabindex），但它仍是非交互文字：点击它照常激活行。
  return !interactive || interactive === event.currentTarget || interactive.matches("[data-slot=data-table-cell-content]");
}
/**
 * 单行省略的单元格内容。省略只是视觉：完整文字始终在 DOM 里，读屏读到全文。
 * 真的被截断（scrollWidth > clientWidth）时，这一格成为 Tab 停靠点并用 Tooltip 显示全文——
 * 原生 title 键盘与触屏都读不到；放得下的格不占 Tab 序列，也不弹重复的提示。
 * 比较过的另一条路是放弃截断改为折行：折行对触屏也成立，所以它是单元格的默认（见 table.tsx 的 wrap-anywhere）；
 * 省略是列的显式选择（固定行高、窄列里的次要文字），那一条路径上用 Tooltip 补全，触屏上仍只有聚焦这一条路（预设：Base UI 提示不响应触摸）。
 * 不裁切含控件的内容，也不用取值函数的原始值替换控件的可访问名称。
 */
function EllipsisContent({ children }: { children: React.ReactNode }) {
  const element = React.useRef<HTMLDivElement | null>(null);
  const [text, setText] = React.useState<string | null>(null);
  const [clipped, setClipped] = React.useState(false);
  const setElement = React.useCallback((node: HTMLElement | null) => { element.current = node as HTMLDivElement | null; }, []);
  React.useLayoutEffect(() => {
    const node = element.current;
    if (!node) return;
    const read = () => {
      // 空值没有可供补全的文字，含控件的内容不裁切：都不提示。
      const value = node.querySelector(interactiveContent) || node.querySelector("[data-slot=data-table-empty]") ? null : node.textContent ?? "";
      setText(value);
      setClipped(value !== null && node.scrollWidth > node.clientWidth);
    };
    read();
    const mutations = new MutationObserver(read);
    mutations.observe(node, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["href", "tabindex", "contenteditable", "role", "controls", "data-row-activate-ignore"] });
    // 列宽变化（拖动、窗口缩放）会改变「是否放得下」。
    const resize = typeof ResizeObserver === "undefined" ? undefined : new ResizeObserver(read);
    resize?.observe(node);
    return () => { mutations.disconnect(); resize?.disconnect(); };
  }, [children]);
  return <Tooltip><TooltipTrigger ref={setElement} disabled={!clipped} render={<div data-slot="data-table-cell-content" tabIndex={clipped ? 0 : undefined} data-clipped={clipped || undefined} className={cn("min-w-0 outline-none", text !== null && "truncate", clipped && "rounded-marker focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset")} />}>{children}</TooltipTrigger>{clipped && <TooltipPopup>{text}</TooltipPopup>}</Tooltip>;
}
function hasColumnDimensions<TData>(definitions: readonly Partial<ColumnDef<TData, unknown>>[]): boolean {
  return definitions.some(column => column.size !== undefined || column.minSize !== undefined || column.maxSize !== undefined || ("columns" in column && column.columns && hasColumnDimensions(column.columns)));
}
/** 列定义里写了某项尺寸（size 或 minSize）的列 id。TanStack 会把默认值合并进 columnDef，所以只能在原始定义上判断「写了没有」。 */
function declaredColumnIds<TData>(definitions: readonly ColumnDef<TData, unknown>[], key: "size" | "minSize", ids = new Set<string>()): Set<string> {
  for (const definition of definitions) {
    if (definition[key] !== undefined) {
      const id = definition.id ?? ("accessorKey" in definition ? String(definition.accessorKey).replaceAll(".", "_") : typeof definition.header === "string" ? definition.header : undefined);
      if (id !== undefined) ids.add(id);
    }
    if ("columns" in definition) declaredColumnIds(definition.columns, key, ids);
  }
  return ids;
}
const sumWidths = (widths: readonly (number | string)[]): number | string => widths.every(width => typeof width === "number") ? widths.reduce((sum, width) => sum + width, 0) : `calc(${widths.map(width => typeof width === "number" ? `${width}px` : width).join(" + ")})`;
function VirtualSpacer({ height, columns }: { height: number; columns: number }) {
  return height > 0 ? <tr data-slot="data-table-spacer" aria-hidden="true" style={{ height }}><td colSpan={columns} style={{ height, padding: 0, border: 0, lineHeight: 0 }} /></tr> : null;
}
export function DataTable<TData>({ table, caption, emptyContent, busy = false, error, activeRowId, selectionAppearance = "row", onRowActivate, virtualization, containerProps, stickyHeader = false, stickyHeaderOffset, className, style, onFocusCapture, onBlurCapture, ...props }: DataTableProps<TData>) {
  if (!table.options.getRowId) throw new Error("DataTable requires an explicit stable getRowId.");
  const columns = table.getVisibleLeafColumns(); if (columns.length === 0) throw new Error("DataTable requires at least one visible comparison column.");
  if (virtualization && (!Number.isFinite(virtualization.height) || virtualization.height <= 0 || !Number.isFinite(virtualization.estimateRowHeight) || virtualization.estimateRowHeight <= 0)) throw new Error("DataTable virtualization requires finite positive height and estimateRowHeight.");
  if (virtualization?.overscan !== undefined && (!Number.isInteger(virtualization.overscan) || virtualization.overscan < 0)) throw new Error("DataTable virtualization overscan must be a nonnegative integer.");
  const { messages } = useUILocale();
  const rows = table.getRowModel().rows; const primarySort = table.getState().sorting?.[0]?.id;
  const headerGroups = table.getHeaderGroups();
  const sized = hasColumnDimensions(table.options.columns) || hasColumnDimensions([table.options.defaultColumn ?? {}]) || Object.keys(table.getState().columnSizing ?? {}).length > 0;
  /*
   * 列宽：可见叶子列分三类，宽度各由一条关系决定。
   * 定宽列——写了 size（列定义或 defaultColumn），或用户拖动过（columnSizing 里有它）：宽度 = column.getSize()，由调用方给定，按 minSize/maxSize 钳制。
   * 标记列——meta.marker 且不是定宽列：宽度 = 标记自身尺寸 + 单元格两侧内缘，由内容决定。
   * 弹性列——其余所有列：不设宽度，fixed 布局下由浏览器平分定宽列与标记列之外的剩余空间（表宽 100%）。
   * 没有弹性列时表宽就是各列之和（原有行为）；有弹性列时 minWidth 保证每个弹性列都不窄于它自己的下限：
   * 平分剩余空间时最窄的一份不能小于最大的下限，所以 minWidth = 定宽列之和 + 标记列之和 + 弹性列数 × max(各弹性列下限)。
   * 弹性列下限 = 它声明的 minSize，否则 column.getSize()，即 150px（预设：TanStack 默认 size）。
   * 弹性列的 maxSize 不约束宽度（fixed 布局里 col/td 的 max-width 不生效）；需要上限就写 size。
   */
  const sizeIds = declaredColumnIds(table.options.columns, "size");
  const minSizeIds = declaredColumnIds(table.options.columns, "minSize");
  const defaultSized = table.options.defaultColumn?.size !== undefined;
  const defaultMinSized = table.options.defaultColumn?.minSize !== undefined;
  const isFixedWidth = (column: Column<TData, unknown>) => defaultSized || sizeIds.has(column.id) || table.getState().columnSizing?.[column.id] !== undefined;
  const isMarker = (column: Column<TData, unknown>) => !isFixedWidth(column) && Boolean((column.columnDef.meta as DataTableColumnMeta | undefined)?.marker);
  const isFlexible = (column: Column<TData, unknown>) => sized && !isFixedWidth(column) && !isMarker(column);
  const flexibleFloor = (column: Column<TData, unknown>) => defaultMinSized || minSizeIds.has(column.id) ? column.columnDef.minSize ?? column.getSize() : column.getSize();
  const columnWidth = (column: Column<TData, unknown>): number | string | undefined => {
    if (isFlexible(column)) return undefined;
    if (!isMarker(column)) return column.getSize();
    // A lone marker keeps its existing role and actual cell insets; it does not inherit TanStack's text-column width preset.
    const index = columns.indexOf(column);
    return `calc(var(--qy-marker-size) + ${index === 0 ? "var(--qy-panel-padding)" : "var(--qy-panel-gap) / 2"} + ${index === columns.length - 1 ? "var(--qy-panel-padding)" : "var(--qy-panel-gap) / 2"})`;
  };
  /** 表头单元格宽度：叶子列里有弹性列就不设宽度（由列宽规则决定）。 */
  const combinedWidth = (leaves: Column<TData, unknown>[]): number | string | undefined => {
    const widths = leaves.filter(column => column.getIsVisible()).map(columnWidth);
    return widths.some(width => width === undefined) ? undefined : sumWidths(widths as (number | string)[]);
  };
  const flexibleColumns = columns.filter(isFlexible);
  const tableWidth: React.CSSProperties = !sized ? {} : flexibleColumns.length === 0 ? { tableLayout: "fixed", width: combinedWidth(columns) } : { tableLayout: "fixed", width: "100%", minWidth: sumWidths([...columns.filter(column => !isFlexible(column)).map(column => columnWidth(column)!), flexibleColumns.length * Math.max(...flexibleColumns.map(flexibleFloor))]) };
  // 行的可访问名称来自行标题单元格；整行可激活而没有名字，读屏用户无法分辨「激活的是哪一行」，与库里「名称缺失即抛错」一致。
  const hasRowHeader = columns.some(column => (column.columnDef.meta as DataTableColumnMeta | undefined)?.rowHeader);
  if (onRowActivate && !hasRowHeader) throw new Error("DataTable onRowActivate requires a visible row-header column: set meta.rowHeader: true on one column (rowHeader: true in DataTablePattern) to name each activatable row.");
  const rowHeaderId = React.useId();
  // 固定列：必须是从第一列起连续的前导列（含自动固定的选择列）。
  let pinGap = false;
  for (const column of columns) {
    if (!(column.columnDef.meta as DataTableColumnMeta | undefined)?.pinned) pinGap = true;
    else if (pinGap) throw new Error("DataTable pinned columns must be a contiguous run of leading columns.");
  }
  const pinnedIds = columns.filter(column => (column.columnDef.meta as DataTableColumnMeta | undefined)?.pinned).map(column => column.id);
  const pinKey = pinnedIds.join("\u0000");
  const [pinOffsets, setPinOffsets] = React.useState<number[]>([]);
  const [pinScrolled, setPinScrolled] = React.useState(false);
  const body = React.useRef<HTMLTableSectionElement>(null);
  const viewport = React.useCallback(() => body.current?.parentElement?.parentElement as HTMLDivElement | null, []);
  // 偏移量 = 前面固定列的实际宽度：量表头末行的固定单元格（列宽可能来自内容），不写死数值。
  React.useLayoutEffect(() => {
    const table = body.current?.parentElement; const node = viewport();
    if (!pinKey || !table || !node) { setPinOffsets(previous => previous.length ? [] : previous); setPinScrolled(false); return; }
    const cells = Array.from(table.querySelectorAll<HTMLElement>(":scope > thead > tr:last-child > th[data-pinned]"));
    const measure = () => {
      let sum = 0; const next = cells.map(cell => { const offset = sum; sum += cell.getBoundingClientRect().width; return offset; });
      setPinOffsets(previous => previous.length === next.length && previous.every((value, index) => value === next[index]) ? previous : next);
    };
    // 滚动距离取绝对值：RTL 下 scrollLeft 为负。
    const scroll = () => setPinScrolled(Math.abs(node.scrollLeft) >= 1);
    measure(); scroll();
    node.addEventListener("scroll", scroll, { passive: true });
    let observer: ResizeObserver | undefined;
    if (typeof ResizeObserver !== "undefined") { observer = new ResizeObserver(measure); for (const cell of cells) observer.observe(cell); }
    return () => { node.removeEventListener("scroll", scroll); observer?.disconnect(); };
  }, [pinKey, viewport]);
  const [scrollMargin, setScrollMargin] = React.useState(0);
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
  // 行激活的 Tab 停靠点（roving tabindex）：整张表只有一行在 Tab 序列里，方向键在行间移动。最近获得焦点的行优先，其次是当前激活行，否则第一行。
  const [rovingId, setRovingId] = React.useState<string | null>(null);
  const focusedElement = React.useRef<HTMLElement | null>(null);
  const pendingFocus = React.useRef<string | null>(null);
  const committedRows = React.useRef(rows);
  const indices = React.useMemo(() => new Map(rows.map((row, index) => [row.id, index])), [rows]);
  const focusedIndex = focusedId === null ? undefined : indices.get(focusedId);
  const estimatedHeight = virtualization?.estimateRowHeight ?? 0;
  const viewportHeight = virtualization?.height ?? 0;
  const estimateSize = React.useCallback(() => estimatedHeight, [estimatedHeight]);
  const getItemKey = React.useCallback((index: number) => rows[index]!.id, [rows]);
  const extractRange = React.useCallback((range: Range) => {
    const visible = defaultRangeExtractor(range);
    return focusedIndex === undefined || visible.includes(focusedIndex) ? visible : [...visible, focusedIndex].sort((a, b) => a - b);
  }, [focusedIndex]);
  const observeRect = React.useCallback<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>["observeElementRect"]>((instance, callback) => observeElementRect(instance, rect => callback({ ...rect, height: rect.height || viewportHeight })), [viewportHeight]);
  const measureRow = React.useCallback<NonNullable<VirtualizerOptions<HTMLDivElement, HTMLTableRowElement>["measureElement"]>>((element, entry, instance) => measureElement(element, entry, instance) || estimatedHeight, [estimatedHeight]);
  const virtualizer = useVirtualizer<HTMLDivElement, HTMLTableRowElement>({
    enabled: Boolean(virtualization), count: rows.length, getScrollElement: viewport,
    estimateSize, getItemKey,
    overscan: virtualization?.overscan ?? 1,
    scrollMargin,
    initialRect: { width: 0, height: viewportHeight },
    // The explicit viewport/estimate also supplies the first frame before layout is available (SSR, hidden panels).
    observeElementRect: observeRect, measureElement: measureRow, rangeExtractor: extractRange,
  });
  React.useLayoutEffect(() => {
    if (committedRows.current !== rows) {
      // A numeric jump belongs to the model at call time, not a replacement server page or new sort order.
      virtualizer.cancelScroll();
      if (pendingFocus.current !== null && !indices.has(pendingFocus.current)) pendingFocus.current = null;
      committedRows.current = rows;
    }
  });
  React.useLayoutEffect(() => {
    if (!virtualization) return;
    const node = viewport();
    const section = body.current;
    if (!node || !section) return;
    const measure = () => setScrollMargin(section.getBoundingClientRect().top - node.getBoundingClientRect().top - node.clientTop + node.scrollTop);
    measure();
    if (typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    for (const part of Array.from(section.parentElement?.children ?? [])) if (part !== section && part.tagName !== "COLGROUP") observer.observe(part);
    return () => observer.disconnect();
  }, [Boolean(virtualization), caption, headerGroups.length]);
  React.useLayoutEffect(() => {
    if (!virtualization) return;
    if (focusedId !== null && focusedIndex === undefined) {
      if (focusedElement.current && !focusedElement.current.isConnected && (!document.activeElement || document.activeElement === document.body)) viewport()?.focus({ preventScroll: true });
      focusedElement.current = null;
      setFocusedId(null);
    }
    if (pendingFocus.current !== null) {
      const row = Array.from(body.current?.querySelectorAll<HTMLTableRowElement>("tr[data-row-id]") ?? []).find(node => node.dataset.rowId === pendingFocus.current);
      if (row) { pendingFocus.current = null; row.focus({ preventScroll: true }); }
    }
  });
  const tabStopId = onRowActivate && !virtualization ? rovingId !== null && indices.has(rovingId) ? rovingId : activeRowId != null && indices.has(activeRowId) ? activeRowId : rows[0]?.id ?? null : null;
  const navigate = (event: React.KeyboardEvent, index?: number) => {
    if (!(virtualization || onRowActivate) || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || rows.length === 0) return;
    const firstVisible = virtualization ? virtualizer.range?.startIndex ?? 0 : 0;
    const next = event.key === "Home" ? 0 : event.key === "End" ? rows.length - 1 : event.key === "ArrowDown" ? index === undefined ? firstVisible : Math.min(rows.length - 1, index + 1) : event.key === "ArrowUp" ? index === undefined ? firstVisible : Math.max(0, index - 1) : null;
    if (next === null) return;
    event.preventDefault();
    if (!virtualization) {
      // 所有行都已渲染：直接把焦点交给目标行。
      Array.from(body.current?.querySelectorAll<HTMLTableRowElement>("tr[data-row-id]") ?? []).find(node => node.dataset.rowId === rows[next]!.id)?.focus();
      return;
    }
    pendingFocus.current = rows[next]!.id;
    setFocusedId(rows[next]!.id);
    virtualizer.scrollToIndex(next, { align: "auto" });
  };
  const renderRow = (row: Row<TData>, index: number) => {
    const filled = (selectionAppearance === "row" && row.getIsSelected()) || row.id === activeRowId;
    // 悬停读 --qy-surface-hover（反馈梯第一级）；选中 / 当前行读更深的选中面，悬停不覆盖它，所以已填充的行不加悬停类。
    // 悬停只给数据行：宽表横向阅读时，它帮读者把眼睛对准同一行（比较任务保留必要的二维关系）。
    const cells = row.getVisibleCells();
    const labelledBy = hasRowHeader ? cells.flatMap((cell, cellIndex) => (cell.column.columnDef.meta as DataTableColumnMeta | undefined)?.rowHeader ? [`${rowHeaderId}-${index}-${cellIndex}`] : []).join(" ") || undefined : undefined;
    return <TableRow key={row.id} aria-labelledby={labelledBy} ref={virtualization ? virtualizer.measureElement : undefined} data-index={virtualization ? index : undefined} data-row-id={row.id} data-selected={row.getIsSelected() || undefined} data-active={row.id === activeRowId || undefined} aria-current={row.id === activeRowId ? "true" : undefined} aria-rowindex={virtualization ? headerGroups.length + index + 1 : undefined} tabIndex={onRowActivate ? row.id === tabStopId ? 0 : -1 : virtualization ? -1 : undefined} className={cn("group/row", filled ? "bg-surface-selected" : "hover:bg-accent", (onRowActivate || virtualization) && "outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset")} onClick={event => { if (!event.defaultPrevented && isRowInteraction(event)) onRowActivate?.(row); }} onKeyDown={event => {
      if (event.target !== event.currentTarget) return;
      navigate(event, index);
      if (onRowActivate && !event.defaultPrevented && !event.repeat && !event.altKey && !event.ctrlKey && !event.metaKey && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onRowActivate(row); }
    }}>{cells.map((cell, cellIndex) => {
      const meta = cell.column.columnDef.meta as DataTableColumnMeta | undefined;
      const content = flexRender(cell.column.columnDef.cell, cell.getContext());
      const pinIndex = meta?.pinned ? pinnedIds.indexOf(cell.column.id) : -1;
      const cellProps = { numeric: meta?.numeric, className: cn(cellWidth(meta), pinIndex >= 0 && pinClass(filled ? "selected" : "plain", pinIndex === pinnedIds.length - 1)), "data-pinned": pinIndex >= 0 ? "" : undefined, "data-scrolled": pinIndex === pinnedIds.length - 1 && pinScrolled ? "" : undefined, style: { ...(sized ? { width: columnWidth(cell.column), minWidth: cell.column.columnDef.minSize, maxWidth: cell.column.columnDef.maxSize } : {}), ...(pinIndex >= 0 ? { insetInlineStart: pinOffsets[pinIndex] ?? 0 } : {}) } };
      return meta?.rowHeader ? <TableHead key={cell.id} id={`${rowHeaderId}-${index}-${cellIndex}`} scope="row" {...cellProps}>{meta.ellipsis ? <EllipsisContent>{content}</EllipsisContent> : content}</TableHead> : <TableCell key={cell.id} {...cellProps}>{meta?.ellipsis ? <EllipsisContent>{content}</EllipsisContent> : content}</TableCell>;
    })}</TableRow>;
  };
  const virtualRows = virtualization ? virtualizer.getVirtualItems() : [];
  let previousEnd = scrollMargin;
  return <div data-slot="data-table-frame" className="flex min-w-0 flex-col gap-(--qy-panel-gap)">
    {error != null && error !== false && <div data-slot="data-table-error" role="alert" className="min-w-0">{error}</div>}
    {/* 等待记号叠在纸的顶缘：绝对定位，不占布局，旧数据行不动、不变暗；它在容器之外，横向滚动时不随内容移走。 */}
    <div className="relative min-w-0 rounded-panel">
    {busy && <Progress value={null} aria-label={messages.loading} data-slot="data-table-busy" className={cn("pointer-events-none absolute z-[2] block overflow-hidden rounded-t-panel", containerProps?.framed === false ? "inset-x-0 top-0" : "inset-x-(--qy-line-width) top-(--qy-line-width)")}><ProgressTrack className="rounded-none bg-transparent"><ProgressIndicator /></ProgressTrack></Progress>}
    <TableContainer data-slot="data-table-container" {...containerProps} {...(virtualization ? { tabIndex: containerProps?.tabIndex ?? 0 } : {})} className={cn(virtualization && "overflow-auto", containerProps?.className)} style={virtualization ? { ...containerProps?.style, height: virtualization.height } : containerProps?.style} onWheel={event => { containerProps?.onWheel?.(event); virtualizer.cancelScroll(); pendingFocus.current = null; }} onTouchStart={event => { containerProps?.onTouchStart?.(event); virtualizer.cancelScroll(); pendingFocus.current = null; }} onKeyDown={event => { containerProps?.onKeyDown?.(event); if (event.target === event.currentTarget) navigate(event); }}><Table data-slot="data-table" data-selection-appearance={selectionAppearance} aria-busy={busy} aria-rowcount={virtualization ? headerGroups.length + Math.max(1, rows.length) : undefined} {...props} className={cn(className)} style={{ ...tableWidth, ...style }} onFocusCapture={event => {
    onFocusCapture?.(event);
    const row = event.target instanceof Element ? event.target.closest<HTMLTableRowElement>("tr[data-row-id]") : null;
    if (onRowActivate && row && body.current?.contains(row)) setRovingId(row.dataset.rowId!);
    if (virtualization) {
      focusedElement.current = row && body.current?.contains(row) ? event.target as HTMLElement : null;
      setFocusedId(row && body.current?.contains(row) ? row.dataset.rowId! : null);
    }
  }} onBlurCapture={event => { onBlurCapture?.(event); if (!event.currentTarget.contains(event.relatedTarget)) { focusedElement.current = null; setFocusedId(null); } }}>
    {caption !== undefined && <TableCaption>{caption}</TableCaption>}
    {sized && <colgroup>{columns.map(column => <col key={column.id} style={{ width: columnWidth(column), minWidth: column.columnDef.minSize, maxWidth: column.columnDef.maxSize }} />)}</colgroup>}
    <TableHeader sticky={stickyHeader} stickyOffset={stickyHeaderOffset}>{headerGroups.map((group, index) => <TableRow key={group.id} aria-rowindex={virtualization ? index + 1 : undefined}>{group.headers.map(header => {
      const sort = header.column.getIsSorted(); const meta = header.column.columnDef.meta as DataTableColumnMeta | undefined;
      const content = header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext());
      const pinIndex = !header.subHeaders.length && meta?.pinned ? pinnedIds.indexOf(header.column.id) : -1;
      return <TableHead key={header.id} colSpan={header.colSpan} scope={header.subHeaders.length ? "colgroup" : "col"} aria-sort={header.column.id === primarySort && sort ? sort === "asc" ? "ascending" : "descending" : undefined} data-pinned={pinIndex >= 0 ? "" : undefined} data-scrolled={pinIndex >= 0 && pinIndex === pinnedIds.length - 1 && pinScrolled ? "" : undefined} style={{ ...(sized ? { width: combinedWidth(header.column.getLeafColumns()) } : {}), ...(pinIndex >= 0 ? { insetInlineStart: pinOffsets[pinIndex] ?? 0 } : {}) }} numeric={meta?.numeric} className={cn(cellWidth(meta), pinIndex >= 0 && pinClass("head", pinIndex === pinnedIds.length - 1))}>{meta?.ellipsis ? <EllipsisContent>{content}</EllipsisContent> : content}</TableHead>;
    })}</TableRow>)}</TableHeader>
    <TableBody ref={body}>{rows.length === 0 ? <TableRow aria-rowindex={virtualization ? headerGroups.length + 1 : undefined}><TableCell colSpan={columns.length}>{emptyContent}</TableCell></TableRow> : virtualization ? <>{virtualRows.map(item => {
      const gap = item.start - previousEnd;
      previousEnd = item.end;
      return <React.Fragment key={item.key}><VirtualSpacer height={gap} columns={columns.length} />{renderRow(rows[item.index]!, item.index)}</React.Fragment>;
    })}<VirtualSpacer height={virtualizer.getTotalSize() + scrollMargin - previousEnd} columns={columns.length} /></> : rows.map(renderRow)}</TableBody>
  </Table></TableContainer>
    </div>
  </div>;
}
/** 排序按钮放在表头里：由表头单元格给它加与留白等量的负外边距，表头文字与该列内容落在同一条边上（基础层 §19）。 */
export type DataTableSortButtonProps<TData> = ButtonProps & { column: Column<TData, unknown> };
/** 列名同墨且保持表头单行：Button 内容自身的换行规则需在排序入口覆盖；活动行按钮仍可换行。 */
export function DataTableSortButton<TData>({ column, children, disabled, onClick, className, ...props }: DataTableSortButtonProps<TData>) {
  const sort = column.getIsSorted(); const { messages } = useUILocale(); const next = column.getNextSortingOrder();
  return <Button data-slot="data-table-sort-button" variant="quiet" size="sm" {...props} className={cn("[&_[data-slot=button-content]]:whitespace-nowrap", !sort && "text-muted-foreground", className)} disabled={Boolean(disabled || !column.getCanSort())} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) column.getToggleSortingHandler()?.(event); }}>{children}{sort ? <span aria-hidden="true">{sort === "asc" ? "↑" : "↓"}</span> : null}<span className="sr-only">{next === "asc" ? messages.sortAscending : next === "desc" ? messages.sortDescending : messages.clear}</span></Button>;
}
type SelectionProps = Omit<CheckboxProps, "checked" | "defaultChecked" | "indeterminate" | "onCheckedChange"> & { onCheckedChange?: CheckboxProps["onCheckedChange"] };
export type DataTableSelectionCellProps<TData> = SelectionProps & { row: Row<TData> };
/** 行标题列（meta.rowHeader）的原始值——只在它是文字或数字时可以直接当名称。 */
function rowHeaderValue<TData>(row: Row<TData>): string | null {
  const cell = row.getVisibleCells().find(candidate => (candidate.column.columnDef.meta as DataTableColumnMeta | undefined)?.rowHeader);
  const value = cell?.getValue();
  return typeof value === "string" || typeof value === "number" ? String(value).trim() || null : null;
}
/**
 * 选择框的名字取这一行的名字：读屏用户在一串「选择此行」里分不清是哪一行，而行标题正是这一行的名字（依据：控件的名称说明它作用于谁）。
 * 首帧用行标题列的取值（服务端渲染也成立）；挂载后改读行标题单元格实际显示的文字，因为自定义 cell 渲染出的才是读者看到的名字。
 * 取不到名字（没有行标题列、或内容为空）才回退到泛称 selectRow。调用方给的 aria-label / aria-labelledby 优先。
 */
function useRowName<TData>(row: Row<TData>, element: React.RefObject<HTMLElement | null>): string | null {
  const [shown, setShown] = React.useState<string | null>(null);
  React.useLayoutEffect(() => {
    const text = element.current?.closest("tr")?.querySelector(":scope > th[scope=row]")?.textContent?.trim() || null;
    setShown(previous => previous === text ? previous : text);
  });
  return shown ?? rowHeaderValue(row);
}
export function DataTableSelectionCell<TData>({ row, disabled, onCheckedChange, ref, ...props }: DataTableSelectionCellProps<TData>) {
  const { messages } = useUILocale();
  const element = React.useRef<HTMLElement | null>(null);
  const name = useRowName(row, element);
  const setRef = React.useCallback((node: HTMLElement | null) => { element.current = node; if (typeof ref === "function") ref(node as never); else if (ref) (ref as React.RefObject<HTMLElement | null>).current = node; }, [ref]);
  return <Checkbox ref={setRef as never} data-slot="data-table-selection-cell" aria-label={name === null ? messages.selectRow : messages.selectRowNamed(name)} {...props} checked={row.getIsSelected()} disabled={Boolean(disabled || !row.getCanSelect())} onCheckedChange={(checked, details) => { onCheckedChange?.(checked, details); if (!details.isCanceled) row.toggleSelected(checked); }} />;
}
export type DataTableSelectAllProps<TData> = SelectionProps & { table: TableInstance<TData>; scope: "page" | "filtered"; "aria-label": string };
/**
 * 全选框的名称说出它选多大的范围：只选「本页」，还是「全部筛选结果」。读屏用户没有视觉上的分页条可对照，
 * 勾选一个叫「选择条目」的框却不知道只有当页被选中，是会误判后果的（依据：控件的名称说明它作用于谁）。
 * 所以 aria-label 只写动作与对象，范围由组件按 scope 追加（locale selectAllScoped）；调用方的 aria-labelledby 仍优先。
 */
export function DataTableSelectAll<TData>({ table, scope, disabled, onCheckedChange, "aria-label": label, ...props }: DataTableSelectAllProps<TData>) {
  const { messages } = useUILocale();
  const rows = (scope === "page" ? table.getRowModel().flatRows : table.getFilteredRowModel().flatRows).filter(row => row.getCanSelect());
  const selected = rows.filter(row => row.getIsSelected()).length;
  return <Checkbox data-slot="data-table-select-all" data-scope={scope} aria-label={messages.selectAllScoped(label, scope)} {...props} disabled={Boolean(disabled || rows.length === 0)} checked={rows.length > 0 && selected === rows.length} indeterminate={selected > 0 && selected < rows.length} onCheckedChange={(checked, details) => {
    onCheckedChange?.(checked, details); if (details.isCanceled) return;
    table.setRowSelection(previous => { const next = { ...previous }; for (const row of rows) { if (checked) next[row.id] = true; else delete next[row.id]; } return next; });
  }} />;
}

export type DataTablePatternColumn<TData> = {
  id: string;
  header: React.ReactNode;
  accessor: (row: TData) => unknown;
  cell?: (row: TData, value: unknown) => React.ReactNode;
  sortable?: boolean;
  sortDescFirst?: boolean;
  rowHeader?: boolean;
  numeric?: boolean;
  /**
   * Pixel dimensions, clamped by TanStack; any explicit dimension opts the table into fixed layout.
   * 只有写了 size 的列是定宽列；没写 size 的列是弹性列，平分剩余空间（表宽 100%），minSize 是它的下限。弹性列的 maxSize 不约束宽度，需要上限就写 size。
   */
  size?: number;
  minSize?: number;
  maxSize?: number;
  ellipsis?: boolean;
  /**
   * 没有 cell 时，accessor 返回 null、undefined 或空字符串所显示的内容；0 与 false 不算空值。
   * 默认是一个 aria-hidden 的「—」加给读屏的「无值」。库只知道「没有值」——未知与不适用是调用方的事实，
   * 需要区分时用 empty（如「不适用」「未知」）或自己的 cell。给了 cell 则不经过 empty。
   */
  empty?: React.ReactNode;
  /** 固定在行内起点。只允许从第一列起连续的前导列，不连续时抛错；有 selection 时选择列自动一并固定。 */
  pinned?: boolean;
};
export type DataTablePatternState = {
  sorting: SortingState;
  pagination: PaginationValue;
  /** The complete ID map, including selected rows outside the current server page. */
  rowSelection: RowSelectionState;
  activeRowId: string | null;
};
export type DataTablePatternChangeDetails = { reason: "sorting" | "pagination" | "selection" | "active-row" };
export type DataTablePatternPagination = {
  /** Client mode derives this from data; server mode requires the actual total or explicit null. */
  totalCount?: number | null;
  /** Required for a server result with unknown total. */
  hasNextPage?: boolean;
  pageSizeOptions?: readonly number[];
  "aria-label"?: string;
};
export type DataTablePatternProps<TData> = Omit<React.ComponentPropsWithRef<"div">, "children" | "defaultValue" | "onChange"> & {
  data: TData[];
  columns: readonly DataTablePatternColumn<TData>[];
  getRowId: (row: TData) => string;
  mode?: "client" | "server";
  state?: DataTablePatternState;
  defaultState?: Partial<DataTablePatternState>;
  onStateChange?: (state: DataTablePatternState, details: DataTablePatternChangeDetails) => void;
  pagination?: false | DataTablePatternPagination;
  selection?: { label: string; rowLabel: (row: TData) => string; canSelect?: (row: TData) => boolean };
  selectionAppearance?: DataTableProps<TData>["selectionAppearance"];
  virtualization?: DataTableVirtualization;
  /** 表头吸顶，吸在最近的滚动区（见 DataTable 的 stickyHeader）。 */
  stickyHeader?: boolean;
  stickyHeaderOffset?: DataTableProps<TData>["stickyHeaderOffset"];
  /** Cell activation preserves the existing button entry; row activation excludes nested interactive content. Both stay independent from selection. */
  activeRow?: ({ trigger?: "cell"; columnId: string } | { trigger: "row"; columnId?: never }) & { onActivate?: (row: TData) => void };
  caption?: React.ReactNode;
  emptyContent: React.ReactNode;
  busy?: boolean;
  /** 见 DataTable 的 error：应用给出内容与重试动作，旧数据行保留。 */
  error?: React.ReactNode;
  tableProps?: Omit<DataTableProps<TData>, "table" | "caption" | "emptyContent" | "busy" | "error" | "activeRowId" | "onRowActivate" | "selectionAppearance" | "virtualization" | "stickyHeader" | "stickyHeaderOffset">;
};

type PatternUpdate = (next: DataTablePatternState | ((previous: DataTablePatternState) => DataTablePatternState), reason: DataTablePatternChangeDetails["reason"]) => void;
type PatternColumnMeta<TData> = DataTableColumnMeta & {
  config: DataTablePatternColumn<TData>;
  activeRow: DataTablePatternProps<TData>["activeRow"];
  state: DataTablePatternState;
  update: PatternUpdate;
};
type PatternSelectionMeta<TData> = DataTableColumnMeta & { selection: NonNullable<DataTablePatternProps<TData>["selection"]> };
// Stable component identities preserve the actual input/button and focus when state or caller configuration changes.
function PatternColumnHeader<TData>({ column }: HeaderContext<TData, unknown>) {
  const { config } = column.columnDef.meta as PatternColumnMeta<TData>;
  return config.sortable ? <DataTableSortButton column={column}>{config.header}</DataTableSortButton> : config.header;
}
function PatternColumnCell<TData>(context: CellContext<TData, unknown>) {
  const { config, activeRow, state, update } = context.column.columnDef.meta as PatternColumnMeta<TData>;
  const { messages } = useUILocale(); const value = context.getValue();
  const content = config.cell ? config.cell(context.row.original, value) : value == null || value === "" ? config.empty ?? <span data-slot="data-table-empty"><span aria-hidden="true" className="text-muted-foreground">—</span><span className="sr-only">{messages.tableNoValue}</span></span> : String(value);
  return activeRow?.trigger !== "row" && activeRow?.columnId === config.id ? <Button data-slot="data-table-activate" variant="quiet" size="sm" className="-mx-(--qy-control-sm-padding) font-normal text-body sm:text-body" aria-current={context.row.id === state.activeRowId ? "true" : undefined} onClick={() => {
    update(previous => ({ ...previous, activeRowId: context.row.id }), "active-row");
    activeRow.onActivate?.(context.row.original);
  }}>{content}</Button> : content;
}
function PatternSelectionHeader<TData>({ table, column }: HeaderContext<TData, unknown>) {
  const { selection } = column.columnDef.meta as PatternSelectionMeta<TData>;
  return <DataTableSelectAll table={table} scope="page" aria-label={selection.label} />;
}
function PatternSelectionCell<TData>({ row, column }: CellContext<TData, unknown>) {
  const { selection } = column.columnDef.meta as PatternSelectionMeta<TData>;
  return <DataTableSelectionCell row={row} aria-label={selection.rowLabel(row.original)} />;
}

/** Standard configuration-based table. Use DataTable with a caller-owned instance for advanced TanStack features. */
export function DataTablePattern<TData>({ data, columns, getRowId, mode = "client", state, defaultState, onStateChange, pagination = false, selection, selectionAppearance = "row", virtualization, stickyHeader = false, stickyHeaderOffset, activeRow, caption, emptyContent, busy = false, error, tableProps, className, ...props }: DataTablePatternProps<TData>) {
  const [internalState, setInternalState] = React.useState<DataTablePatternState>(() => ({ sorting: [], pagination: { page: 1, pageSize: 10 }, rowSelection: {}, activeRowId: null, ...defaultState }));
  const source = state ?? internalState;
  if (pagination && mode === "server" && pagination.totalCount === undefined) throw new Error("Server DataTable pagination requires totalCount, or null with explicit hasNextPage.");
  const totalCount = !pagination ? null : mode === "client" ? data.length : pagination.totalCount ?? null;
  if (pagination && totalCount === null && typeof pagination.hasNextPage !== "boolean") throw new Error("Server DataTable with unknown totalCount requires explicit hasNextPage.");
  const current = { ...source, pagination: normalizePaginationValue(source.pagination, totalCount) };
  const currentRef = React.useRef(current);
  currentRef.current = current;
  const update: PatternUpdate = (next, reason) => {
    const result = typeof next === "function" ? next(currentRef.current) : next;
    if (state === undefined) { currentRef.current = result; setInternalState(result); }
    onStateChange?.(result, { reason });
  };
  if (!getRowId) throw new Error("DataTablePattern requires an explicit stable getRowId.");
  if (columns.length === 0 || new Set(columns.map(column => column.id)).size !== columns.length || columns.some(column => !column.id || column.id === "__qy_selection")) throw new Error("DataTablePattern requires distinct nonempty column IDs; __qy_selection is reserved.");
  if (activeRow && activeRow.trigger !== "row" && !columns.some(column => column.id === activeRow.columnId)) throw new Error("DataTablePattern activeRow.columnId must identify a configured column.");
  const definitions: ColumnDef<TData, unknown>[] = columns.map(column => ({
    id: column.id,
    accessorFn: column.accessor,
    enableSorting: column.sortable ?? false,
    ...(column.sortDescFirst === undefined ? {} : { sortDescFirst: column.sortDescFirst }),
    ...(column.size === undefined ? {} : { size: column.size }),
    ...(column.minSize === undefined ? {} : { minSize: column.minSize }),
    ...(column.maxSize === undefined ? {} : { maxSize: column.maxSize }),
    meta: { rowHeader: column.rowHeader, numeric: column.numeric, ellipsis: column.ellipsis, pinned: column.pinned, config: column, activeRow, state: current, update },
    header: PatternColumnHeader<TData>,
    cell: PatternColumnCell<TData>,
  }));
  if (selection) definitions.unshift({ id: "__qy_selection", enableSorting: false, meta: { marker: true, pinned: columns.some(column => column.pinned), selection }, header: PatternSelectionHeader<TData>, cell: PatternSelectionCell<TData> });
  const table = useReactTable({
    data, columns: definitions, getRowId,
    getCoreRowModel: getCoreRowModel(),
    ...(mode === "client" ? { getSortedRowModel: getSortedRowModel(), ...(pagination ? { getPaginationRowModel: getPaginationRowModel() } : {}) } : {}),
    manualSorting: mode === "server", manualPagination: mode === "server",
    autoResetAll: false,
    enableRowSelection: selection ? row => selection.canSelect?.(row.original) ?? true : false,
    state: { sorting: current.sorting, pagination: { pageIndex: current.pagination.page - 1, pageSize: current.pagination.pageSize }, rowSelection: current.rowSelection },
    onSortingChange: updater => update(previous => ({ ...previous, sorting: functionalUpdate(updater, previous.sorting), pagination: { ...previous.pagination, page: 1 } }), "sorting"),
    onRowSelectionChange: updater => update(previous => ({ ...previous, rowSelection: functionalUpdate(updater, previous.rowSelection) }), "selection"),
    onPaginationChange: updater => update(previous => {
      const next = functionalUpdate(updater, { pageIndex: previous.pagination.page - 1, pageSize: previous.pagination.pageSize });
      return { ...previous, pagination: normalizePaginationValue({ page: next.pageIndex + 1, pageSize: next.pageSize }, totalCount) };
    }, "pagination"),
  });
  return <div data-slot="data-table-pattern" {...props} className={cn("flex min-w-0 flex-col gap-(--qy-panel-gap)", className)}>
    <DataTable<TData> {...tableProps} table={table} caption={caption} emptyContent={emptyContent} busy={busy} error={error} activeRowId={current.activeRowId} selectionAppearance={selectionAppearance} {...(virtualization ? { virtualization } : {})} {...(stickyHeader ? { stickyHeader } : {})} {...(stickyHeaderOffset !== undefined ? { stickyHeaderOffset } : {})} {...(activeRow?.trigger === "row" ? { onRowActivate: row => {
      update(previous => ({ ...previous, activeRowId: row.id }), "active-row");
      activeRow.onActivate?.(row.original);
    } } : {})} />
    {pagination && <PaginationPattern busy={busy} value={source.pagination} onValueChange={next => update(previous => ({ ...previous, pagination: next }), "pagination")} {...(totalCount === null ? { totalCount: null, hasNextPage: pagination.hasNextPage! } : { totalCount })} {...(pagination.pageSizeOptions ? { pageSizeOptions: pagination.pageSizeOptions } : {})} {...(pagination["aria-label"] ? { "aria-label": pagination["aria-label"] } : {})} />}
  </div>;
}
