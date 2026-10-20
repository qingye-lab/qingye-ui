"use client";
import { flexRender, functionalUpdate, getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type CellContext, type HeaderContext, type Column, type ColumnDef, type Row, type RowSelectionState, type SortingState, type Table as TableInstance } from "@tanstack/react-table";
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
}
const cellPadding = (meta: DataTableColumnMeta | undefined) => cn(meta?.numeric && "text-end numeric");
/**
 * 标记列的宽度不是一个尺寸预设，而是一条「谁吸收剩余空间」的关系：表格宽 100%，
 * 文字列吸收全部剩余宽度，标记列只占它自己的内容宽（width:1% 是让浏览器把该列
 * 压到最小的标准写法，实际宽度仍由其中的复选框决定）。列宽比例由表头与单元格
 * 共同决定，所以两处都写。
 */
const cellWidth = (meta: DataTableColumnMeta | undefined) => meta?.marker ? "w-px" : undefined;
export type DataTableProps<TData> = Omit<TableProps, "children"> & { table: TableInstance<TData>; caption?: React.ReactNode; emptyContent: React.ReactNode; busy?: boolean; activeRowId?: string | null; containerProps?: TableContainerProps };
export function DataTable<TData>({ table, caption, emptyContent, busy = false, activeRowId, containerProps, className, ...props }: DataTableProps<TData>) {
  if (!table.options.getRowId) throw new Error("DataTable requires an explicit stable getRowId.");
  const columns = table.getVisibleLeafColumns(); if (columns.length === 0) throw new Error("DataTable requires at least one visible comparison column.");
  const rows = table.getRowModel().rows; const primarySort = table.getState().sorting?.[0]?.id;
  return <TableContainer data-slot="data-table-container" {...containerProps}><Table data-slot="data-table" aria-busy={busy} {...props} className={cn(className)}>
    {caption !== undefined && <TableCaption>{caption}</TableCaption>}
    <TableHeader>{table.getHeaderGroups().map(group => <TableRow key={group.id}>{group.headers.map(header => {
      const sort = header.column.getIsSorted(); const meta = header.column.columnDef.meta as DataTableColumnMeta | undefined;
      return <TableHead key={header.id} colSpan={header.colSpan} scope={header.subHeaders.length ? "colgroup" : "col"} aria-sort={header.column.id === primarySort && sort ? sort === "asc" ? "ascending" : "descending" : undefined} className={cn(cellPadding(meta), cellWidth(meta), meta?.numeric && "[&_[data-slot=button-content]]:flex-row-reverse")}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
    })}</TableRow>)}</TableHeader>
    <TableBody>{rows.length === 0 ? <TableRow><TableCell colSpan={columns.length}>{emptyContent}</TableCell></TableRow> : rows.map(row => <TableRow key={row.id} data-row-id={row.id} data-selected={row.getIsSelected() || undefined} data-active={row.id === activeRowId || undefined} className={row.getIsSelected() || row.id === activeRowId ? "bg-surface-selected" : undefined}>{row.getVisibleCells().map(cell => { const meta = cell.column.columnDef.meta as DataTableColumnMeta | undefined; return meta?.rowHeader ? <TableHead key={cell.id} scope="row" className={cn(cellPadding(meta), cellWidth(meta))}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableHead> : <TableCell key={cell.id} className={cn(cellPadding(meta), cellWidth(meta))}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>; })}</TableRow>)}</TableBody>
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
  /** The named column contains a keyboard-accessible activation button. Its cell content must be noninteractive; row selection stays independent. */
  activeRow?: { columnId: string; onActivate?: (row: TData) => void };
  caption?: React.ReactNode;
  emptyContent: React.ReactNode;
  busy?: boolean;
  tableProps?: Omit<DataTableProps<TData>, "table" | "caption" | "emptyContent" | "busy" | "activeRowId">;
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
  return activeRow?.columnId === config.id ? <Button data-slot="data-table-activate" variant="quiet" size="sm" aria-current={context.row.id === state.activeRowId ? "true" : undefined} onClick={() => {
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
export function DataTablePattern<TData>({ data, columns, getRowId, mode = "client", state, defaultState, onStateChange, pagination = false, selection, activeRow, caption, emptyContent, busy = false, tableProps, className, ...props }: DataTablePatternProps<TData>) {
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
  if (activeRow && !columns.some(column => column.id === activeRow.columnId)) throw new Error("DataTablePattern activeRow.columnId must identify a configured column.");
  const definitions: ColumnDef<TData, unknown>[] = columns.map(column => ({
    id: column.id,
    accessorFn: column.accessor,
    enableSorting: column.sortable ?? false,
    ...(column.sortDescFirst === undefined ? {} : { sortDescFirst: column.sortDescFirst }),
    meta: { rowHeader: column.rowHeader, numeric: column.numeric, config: column, activeRow, state: current, update },
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
    <DataTable {...tableProps} table={table} caption={caption} emptyContent={emptyContent} busy={busy} activeRowId={current.activeRowId} />
    {pagination && <PaginationPattern value={source.pagination} onValueChange={next => update(previous => ({ ...previous, pagination: next }), "pagination")} {...(totalCount === null ? { totalCount: null, hasNextPage: pagination.hasNextPage! } : { totalCount })} {...(pagination.pageSizeOptions ? { pageSizeOptions: pagination.pageSizeOptions } : {})} {...(pagination["aria-label"] ? { "aria-label": pagination["aria-label"] } : {})} />}
  </div>;
}
