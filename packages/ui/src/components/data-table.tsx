"use client";
import { flexRender, functionalUpdate, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type CellContext, type HeaderContext, type Column, type ColumnDef, type Row, type RowSelectionState, type SortingState, type Table as TableInstance } from "@tanstack/react-table";
import { defaultRangeExtractor, measureElement, observeElementRect, useVirtualizer, type Range, type VirtualizerOptions } from "@tanstack/react-virtual";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { Checkbox, type CheckboxProps } from "./checkbox";
import { PaginationPattern, normalizePaginationValue, type PaginationValue } from "./pagination";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow, type TableProps, type TableContainerProps } from "./table";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type DataTableInstance<TData> = TableInstance<TData>;
export type DataTableColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue>;
export interface DataTableColumnMeta {
  rowHeader?: boolean;
  /** 这一列只放一个标记（复选框、行操作）：由内容定宽（w-line），留白与文字列同一条规则。 */
  marker?: boolean;
  /** 数字列：表头与单元格右对齐、等宽数字——数位对齐才能比较大小（基础层 §19）。 */
  numeric?: boolean;
  /** Opt in for noninteractive text. The full rendered text stays accessible and is also available as a native title. */
  ellipsis?: boolean;
}
const cellPadding = (meta: DataTableColumnMeta | undefined) => cn(meta?.numeric && "text-end numeric");
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
export type DataTableProps<TData> = Omit<TableProps, "children"> & {
  table: TableInstance<TData>;
  caption?: React.ReactNode;
  emptyContent: React.ReactNode;
  busy?: boolean;
  activeRowId?: string | null;
  /** Checkbox mode removes only the selected-row fill; selection controls and active-row emphasis remain. */
  selectionAppearance?: "row" | "checkbox";
  /** Click noninteractive row content, or focus the row and press Enter / Space. Never toggles selection. */
  onRowActivate?: (row: Row<TData>) => void;
  virtualization?: DataTableVirtualization;
  containerProps?: TableContainerProps;
};
const interactiveContent = "a[href],area[href],button,input,select,textarea,label,summary,details,iframe,object,embed,audio[controls],video[controls],[contenteditable]:not([contenteditable=false]),[role=button],[role=link],[role=checkbox],[role=radio],[role=switch],[role=menuitem],[role=option],[tabindex],[data-row-activate-ignore]";
function isRowInteraction(event: React.MouseEvent<HTMLTableRowElement> | React.KeyboardEvent<HTMLTableRowElement>) {
  const target = event.target;
  if (!(target instanceof Element) || target.closest("tr") !== event.currentTarget) return false;
  const interactive = target.closest(interactiveContent);
  return !interactive || interactive === event.currentTarget;
}
/** Never clip an interactive descendant or replace its accessible name with an accessor's raw value. */
function EllipsisContent({ children }: { children: React.ReactNode }) {
  const element = React.useRef<HTMLDivElement>(null);
  const [text, setText] = React.useState<string | null>(null);
  React.useLayoutEffect(() => {
    const node = element.current;
    if (!node) return;
    const read = () => setText(node.querySelector(interactiveContent) ? null : node.textContent ?? "");
    read();
    const observer = new MutationObserver(read);
    observer.observe(node, { childList: true, characterData: true, subtree: true, attributes: true, attributeFilter: ["href", "tabindex", "contenteditable", "role", "controls", "data-row-activate-ignore"] });
    return () => observer.disconnect();
  }, [children]);
  return <div ref={element} data-slot="data-table-cell-content" title={text ?? undefined} className={cn("min-w-0", text !== null && "truncate")}>{children}</div>;
}
function hasColumnDimensions<TData>(definitions: readonly Partial<ColumnDef<TData, unknown>>[]): boolean {
  return definitions.some(column => column.size !== undefined || column.minSize !== undefined || column.maxSize !== undefined || ("columns" in column && column.columns && hasColumnDimensions(column.columns)));
}
function dimensionColumnIds<TData>(definitions: readonly ColumnDef<TData, unknown>[], ids = new Set<string>()): Set<string> {
  for (const definition of definitions) {
    if (definition.size !== undefined || definition.minSize !== undefined || definition.maxSize !== undefined) {
      const id = definition.id ?? ("accessorKey" in definition ? String(definition.accessorKey).replaceAll(".", "_") : typeof definition.header === "string" ? definition.header : undefined);
      if (id !== undefined) ids.add(id);
    }
    if ("columns" in definition) dimensionColumnIds(definition.columns, ids);
  }
  return ids;
}
function VirtualSpacer({ height, columns }: { height: number; columns: number }) {
  return height > 0 ? <tr data-slot="data-table-spacer" aria-hidden="true" style={{ height }}><td colSpan={columns} style={{ height, padding: 0, border: 0, lineHeight: 0 }} /></tr> : null;
}
export function DataTable<TData>({ table, caption, emptyContent, busy = false, activeRowId, selectionAppearance = "row", onRowActivate, virtualization, containerProps, className, style, onFocusCapture, onBlurCapture, ...props }: DataTableProps<TData>) {
  if (!table.options.getRowId) throw new Error("DataTable requires an explicit stable getRowId.");
  const columns = table.getVisibleLeafColumns(); if (columns.length === 0) throw new Error("DataTable requires at least one visible comparison column.");
  if (virtualization && (!Number.isFinite(virtualization.height) || virtualization.height <= 0 || !Number.isFinite(virtualization.estimateRowHeight) || virtualization.estimateRowHeight <= 0)) throw new Error("DataTable virtualization requires finite positive height and estimateRowHeight.");
  if (virtualization?.overscan !== undefined && (!Number.isInteger(virtualization.overscan) || virtualization.overscan < 0)) throw new Error("DataTable virtualization overscan must be a nonnegative integer.");
  const rows = table.getRowModel().rows; const primarySort = table.getState().sorting?.[0]?.id;
  const headerGroups = table.getHeaderGroups();
  const sized = hasColumnDimensions(table.options.columns) || hasColumnDimensions([table.options.defaultColumn ?? {}]) || Object.keys(table.getState().columnSizing ?? {}).length > 0;
  const explicitDimensions = dimensionColumnIds(table.options.columns);
  const defaultDimensions = hasColumnDimensions([table.options.defaultColumn ?? {}]);
  const columnWidth = (column: Column<TData, unknown>): number | string => {
    const meta = column.columnDef.meta as DataTableColumnMeta | undefined;
    if (!meta?.marker || explicitDimensions.has(column.id) || defaultDimensions || table.getState().columnSizing?.[column.id] !== undefined) return column.getSize();
    // A lone marker keeps its existing role and actual cell insets; it does not inherit TanStack's text-column width preset.
    const index = columns.indexOf(column);
    return `calc(var(--qy-marker-size) + ${index === 0 ? "var(--qy-panel-padding)" : "var(--qy-panel-gap) / 2"} + ${index === columns.length - 1 ? "var(--qy-panel-padding)" : "var(--qy-panel-gap) / 2"})`;
  };
  const combinedWidth = (leaves: Column<TData, unknown>[]): number | string => {
    const widths = leaves.filter(column => column.getIsVisible()).map(columnWidth);
    return widths.every(width => typeof width === "number") ? widths.reduce((sum, width) => sum + width, 0) : `calc(${widths.map(width => typeof width === "number" ? `${width}px` : width).join(" + ")})`;
  };
  const body = React.useRef<HTMLTableSectionElement>(null);
  const viewport = React.useCallback(() => body.current?.parentElement?.parentElement as HTMLDivElement | null, []);
  const [scrollMargin, setScrollMargin] = React.useState(0);
  const [focusedId, setFocusedId] = React.useState<string | null>(null);
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
  const navigate = (event: React.KeyboardEvent, index?: number) => {
    if (!virtualization || event.defaultPrevented || event.altKey || event.ctrlKey || event.metaKey || rows.length === 0) return;
    const firstVisible = virtualizer.range?.startIndex ?? 0;
    const next = event.key === "Home" ? 0 : event.key === "End" ? rows.length - 1 : event.key === "ArrowDown" ? index === undefined ? firstVisible : Math.min(rows.length - 1, index + 1) : event.key === "ArrowUp" ? index === undefined ? firstVisible : Math.max(0, index - 1) : null;
    if (next === null) return;
    event.preventDefault();
    pendingFocus.current = rows[next]!.id;
    setFocusedId(rows[next]!.id);
    virtualizer.scrollToIndex(next, { align: "auto" });
  };
  const renderRow = (row: Row<TData>, index: number) => <TableRow key={row.id} ref={virtualization ? virtualizer.measureElement : undefined} data-index={virtualization ? index : undefined} data-row-id={row.id} data-selected={row.getIsSelected() || undefined} data-active={row.id === activeRowId || undefined} aria-current={row.id === activeRowId ? "true" : undefined} aria-rowindex={virtualization ? headerGroups.length + index + 1 : undefined} tabIndex={onRowActivate ? 0 : virtualization ? -1 : undefined} className={cn(((selectionAppearance === "row" && row.getIsSelected()) || row.id === activeRowId) && "bg-surface-selected", (onRowActivate || virtualization) && "outline-none focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset")} onClick={event => { if (!event.defaultPrevented && isRowInteraction(event)) onRowActivate?.(row); }} onKeyDown={event => {
    if (event.target !== event.currentTarget) return;
    navigate(event, index);
    if (onRowActivate && !event.defaultPrevented && !event.repeat && !event.altKey && !event.ctrlKey && !event.metaKey && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); onRowActivate(row); }
  }}>{row.getVisibleCells().map(cell => {
    const meta = cell.column.columnDef.meta as DataTableColumnMeta | undefined;
    const content = flexRender(cell.column.columnDef.cell, cell.getContext());
    const cellProps = { className: cn(cellPadding(meta), cellWidth(meta)), style: sized ? { width: columnWidth(cell.column), minWidth: cell.column.columnDef.minSize, maxWidth: cell.column.columnDef.maxSize } : undefined };
    return meta?.rowHeader ? <TableHead key={cell.id} scope="row" {...cellProps}>{meta.ellipsis ? <EllipsisContent>{content}</EllipsisContent> : content}</TableHead> : <TableCell key={cell.id} {...cellProps}>{meta?.ellipsis ? <EllipsisContent>{content}</EllipsisContent> : content}</TableCell>;
  })}</TableRow>;
  const virtualRows = virtualization ? virtualizer.getVirtualItems() : [];
  let previousEnd = scrollMargin;
  return <TableContainer data-slot="data-table-container" {...containerProps} {...(virtualization ? { tabIndex: containerProps?.tabIndex ?? 0 } : {})} className={cn(virtualization && "overflow-auto", containerProps?.className)} style={virtualization ? { ...containerProps?.style, height: virtualization.height } : containerProps?.style} onWheel={event => { containerProps?.onWheel?.(event); virtualizer.cancelScroll(); pendingFocus.current = null; }} onTouchStart={event => { containerProps?.onTouchStart?.(event); virtualizer.cancelScroll(); pendingFocus.current = null; }} onKeyDown={event => { containerProps?.onKeyDown?.(event); if (event.target === event.currentTarget) navigate(event); }}><Table data-slot="data-table" data-selection-appearance={selectionAppearance} aria-busy={busy} aria-rowcount={virtualization ? headerGroups.length + Math.max(1, rows.length) : undefined} {...props} className={cn(className)} style={{ ...(sized ? { tableLayout: "fixed", width: combinedWidth(columns) } : {}), ...style }} onFocusCapture={event => {
    onFocusCapture?.(event);
    const row = event.target instanceof Element ? event.target.closest<HTMLTableRowElement>("tr[data-row-id]") : null;
    if (virtualization) {
      focusedElement.current = row && body.current?.contains(row) ? event.target as HTMLElement : null;
      setFocusedId(row && body.current?.contains(row) ? row.dataset.rowId! : null);
    }
  }} onBlurCapture={event => { onBlurCapture?.(event); if (!event.currentTarget.contains(event.relatedTarget)) { focusedElement.current = null; setFocusedId(null); } }}>
    {caption !== undefined && <TableCaption>{caption}</TableCaption>}
    {sized && <colgroup>{columns.map(column => <col key={column.id} style={{ width: columnWidth(column), minWidth: column.columnDef.minSize, maxWidth: column.columnDef.maxSize }} />)}</colgroup>}
    <TableHeader>{headerGroups.map((group, index) => <TableRow key={group.id} aria-rowindex={virtualization ? index + 1 : undefined}>{group.headers.map(header => {
      const sort = header.column.getIsSorted(); const meta = header.column.columnDef.meta as DataTableColumnMeta | undefined;
      const content = header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext());
      return <TableHead key={header.id} colSpan={header.colSpan} scope={header.subHeaders.length ? "colgroup" : "col"} aria-sort={header.column.id === primarySort && sort ? sort === "asc" ? "ascending" : "descending" : undefined} style={sized ? { width: combinedWidth(header.column.getLeafColumns()) } : undefined} className={cn(cellPadding(meta), cellWidth(meta), meta?.numeric && "[&_[data-slot=button-content]]:flex-row-reverse")}>{meta?.ellipsis ? <EllipsisContent>{content}</EllipsisContent> : content}</TableHead>;
    })}</TableRow>)}</TableHeader>
    <TableBody ref={body}>{rows.length === 0 ? <TableRow aria-rowindex={virtualization ? headerGroups.length + 1 : undefined}><TableCell colSpan={columns.length}>{emptyContent}</TableCell></TableRow> : virtualization ? <>{virtualRows.map(item => {
      const gap = item.start - previousEnd;
      previousEnd = item.end;
      return <React.Fragment key={item.key}><VirtualSpacer height={gap} columns={columns.length} />{renderRow(rows[item.index]!, item.index)}</React.Fragment>;
    })}<VirtualSpacer height={virtualizer.getTotalSize() + scrollMargin - previousEnd} columns={columns.length} /></> : rows.map(renderRow)}</TableBody>
  </Table></TableContainer>;
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
export function DataTableSelectionCell<TData>({ row, disabled, onCheckedChange, ...props }: DataTableSelectionCellProps<TData>) {
  const { messages } = useUILocale();
  return <Checkbox data-slot="data-table-selection-cell" aria-label={messages.selectRow} {...props} checked={row.getIsSelected()} disabled={Boolean(disabled || !row.getCanSelect())} onCheckedChange={(checked, details) => { onCheckedChange?.(checked, details); if (!details.isCanceled) row.toggleSelected(checked); }} />;
}
export type DataTableSelectAllProps<TData> = SelectionProps & { table: TableInstance<TData>; scope: "page" | "filtered"; "aria-label": string };
export function DataTableSelectAll<TData>({ table, scope, disabled, onCheckedChange, ...props }: DataTableSelectAllProps<TData>) {
  const rows = (scope === "page" ? table.getRowModel().flatRows : table.getFilteredRowModel().flatRows).filter(row => row.getCanSelect());
  const selected = rows.filter(row => row.getIsSelected()).length;
  return <Checkbox data-slot="data-table-select-all" {...props} disabled={Boolean(disabled || rows.length === 0)} checked={rows.length > 0 && selected === rows.length} indeterminate={selected > 0 && selected < rows.length} onCheckedChange={(checked, details) => {
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
  /** Pixel dimensions, clamped by TanStack; any explicit dimension opts the table into fixed layout. */
  size?: number;
  minSize?: number;
  maxSize?: number;
  ellipsis?: boolean;
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
  /** Cell activation preserves the existing button entry; row activation excludes nested interactive content. Both stay independent from selection. */
  activeRow?: ({ trigger?: "cell"; columnId: string } | { trigger: "row"; columnId?: never }) & { onActivate?: (row: TData) => void };
  caption?: React.ReactNode;
  emptyContent: React.ReactNode;
  busy?: boolean;
  tableProps?: Omit<DataTableProps<TData>, "table" | "caption" | "emptyContent" | "busy" | "activeRowId" | "onRowActivate" | "selectionAppearance" | "virtualization">;
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
  const content = config.cell ? config.cell(context.row.original, context.getValue()) : String(context.getValue() ?? "");
  return activeRow?.trigger !== "row" && activeRow?.columnId === config.id ? <Button data-slot="data-table-activate" variant="quiet" size="sm" aria-current={context.row.id === state.activeRowId ? "true" : undefined} onClick={() => {
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
export function DataTablePattern<TData>({ data, columns, getRowId, mode = "client", state, defaultState, onStateChange, pagination = false, selection, selectionAppearance = "row", virtualization, activeRow, caption, emptyContent, busy = false, tableProps, className, ...props }: DataTablePatternProps<TData>) {
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
    meta: { rowHeader: column.rowHeader, numeric: column.numeric, ellipsis: column.ellipsis, config: column, activeRow, state: current, update },
    header: PatternColumnHeader<TData>,
    cell: PatternColumnCell<TData>,
  }));
  if (selection) definitions.unshift({ id: "__qy_selection", enableSorting: false, meta: { marker: true, selection }, header: PatternSelectionHeader<TData>, cell: PatternSelectionCell<TData> });
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
    <DataTable<TData> {...tableProps} table={table} caption={caption} emptyContent={emptyContent} busy={busy} activeRowId={current.activeRowId} selectionAppearance={selectionAppearance} {...(virtualization ? { virtualization } : {})} {...(activeRow?.trigger === "row" ? { onRowActivate: row => {
      update(previous => ({ ...previous, activeRowId: row.id }), "active-row");
      activeRow.onActivate?.(row.original);
    } } : {})} />
    {pagination && <PaginationPattern value={source.pagination} onValueChange={next => update(previous => ({ ...previous, pagination: next }), "pagination")} {...(totalCount === null ? { totalCount: null, hasNextPage: pagination.hasNextPage! } : { totalCount })} {...(pagination.pageSizeOptions ? { pageSizeOptions: pagination.pageSizeOptions } : {})} {...(pagination["aria-label"] ? { "aria-label": pagination["aria-label"] } : {})} />}
  </div>;
}
