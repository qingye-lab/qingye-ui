"use client";

import {
  type Column,
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type Row,
  type RowData,
  type RowSelectionState,
  type SortingState,
  type Table as TanstackTable,
  type TableOptions,
  type VisibilityState,
  flexRender,
  functionalUpdate,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowDownIcon,
  ArrowUpIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  ChevronsUpDownIcon,
  Columns3Icon,
} from "lucide-react";
import { type ReactElement, type ReactNode, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useUILocale } from "../locale";
import { cn } from "../utils";
import { Button } from "./button";
import { Checkbox } from "./checkbox";
import { Menu, MenuCheckboxItem, MenuPopup, MenuTrigger } from "./menu";
import { SearchInput } from "./search-input";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "./select";
import { Skeleton } from "./skeleton";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow, type TableDensity, type TableVariant } from "./table";

export type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  RowSelectionState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";
export type { TanstackTable as DataTableInstance };

declare module "@tanstack/react-table" {
  // The type parameters must match TanStack's declaration to merge.
  interface ColumnMeta<TData extends RowData, TValue> {
    /** Name shown in the column menu when `header` is not a plain string. */
    label?: string;
    /** Header and cell alignment. Use `end` for numbers, amounts and dates. */
    align?: "start" | "center" | "end";
    /** Extra classes for this column's header cell. */
    headerClassName?: string;
    /** Extra classes for this column's body cells. */
    cellClassName?: string;
  }
}

/** What the bulk-actions slot receives while rows are selected. */
export type DataTableBulkContext<TData> = {
  /** Selected rows present in `data` (with manual pagination: the current page only). */
  rows: TData[];
  /** Every selected row id, including rows on other pages. */
  ids: string[];
  clear: () => void;
  table: TanstackTable<TData>;
};

export type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData, any>[];
  /** Stable row ids keep selection correct across sorting, paging and refetches. */
  getRowId?: (row: TData, index: number) => string;
  /** Accessible name of the table. */
  label?: string;

  /** Search box filtering every column. */
  enableGlobalFilter?: boolean;
  searchPlaceholder?: string;
  globalFilter?: string;
  onGlobalFilterChange?: (value: string) => void;
  columnFilters?: ColumnFiltersState;
  onColumnFiltersChange?: (filters: ColumnFiltersState) => void;
  /** Filtering happens on the server; rows are shown as given. */
  manualFiltering?: boolean;

  enableSorting?: boolean;
  sorting?: SortingState;
  defaultSorting?: SortingState;
  onSortingChange?: (sorting: SortingState) => void;
  /** Sorting happens on the server; rows are shown in the given order. */
  manualSorting?: boolean;

  enablePagination?: boolean;
  pagination?: PaginationState;
  /** Initial rows per page when `pagination` is uncontrolled. */
  defaultPageSize?: number;
  pageSizeOptions?: number[];
  onPaginationChange?: (pagination: PaginationState) => void;
  /** `data` is already the current page; pair with `rowCount`. */
  manualPagination?: boolean;
  /** Total rows on the server, for page count and summary. */
  rowCount?: number;

  /** Adds a checkbox column. A function decides per row. */
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  rowSelection?: RowSelectionState;
  defaultRowSelection?: RowSelectionState;
  onRowSelectionChange?: (selection: RowSelectionState) => void;
  /** Actions shown next to the selected count, e.g. export or delete. */
  bulkActions?: (context: DataTableBulkContext<TData>) => ReactNode;

  /** Adds a menu for showing and hiding columns. */
  enableColumnVisibility?: boolean;
  columnVisibility?: VisibilityState;
  defaultColumnVisibility?: VisibilityState;
  onColumnVisibilityChange?: (visibility: VisibilityState) => void;

  /** Custom filters, placed after the search box. */
  toolbar?: ReactNode | ((table: TanstackTable<TData>) => ReactNode);
  /** Shows skeleton rows in place of the body. */
  loading?: boolean;
  /** Content when there are no rows. */
  empty?: ReactNode;
  density?: TableDensity;
  variant?: TableVariant;
  /** Caps the table height; the body scrolls under a pinned header. */
  maxHeight?: number | string;
  /** Pins the header row. Defaults to on when `maxHeight` is set. */
  stickyHeader?: boolean;
  className?: string;
};

const SELECT_COLUMN_ID = "__select";
const skeletonWidths = ["w-3/5", "w-4/5", "w-2/5", "w-1/2", "w-2/3"];

/** Controlled when `value` is defined, otherwise internal; reports every change. */
function useTableState<T>(value: T | undefined, initial: T, onChange: ((value: T) => void) | undefined) {
  const [internal, setInternal] = useState(initial);
  const current = value === undefined ? internal : value;
  const latest = useRef(current);
  latest.current = current;
  const controlled = value !== undefined;
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const set = useCallback<OnChangeFn<T>>(
    (updater) => {
      const next = functionalUpdate(updater, latest.current);
      latest.current = next;
      if (!controlled) setInternal(next);
      onChangeRef.current?.(next);
    },
    [controlled],
  );
  return [current, set] as const;
}

function columnLabel<TData>(column: Column<TData, unknown>): string {
  const { header, meta } = column.columnDef;
  return meta?.label ?? (typeof header === "string" ? header : column.id);
}

const alignClassName = { center: "text-center", end: "text-end", start: "text-start" } as const;

export function DataTable<TData>(props: DataTableProps<TData>): ReactElement {
  const { messages } = useUILocale();
  const {
    data,
    columns,
    getRowId,
    label = messages.table,
    enableGlobalFilter = true,
    searchPlaceholder = messages.searchTable,
    manualFiltering = false,
    enableSorting = true,
    manualSorting = false,
    enablePagination = true,
    defaultPageSize = 10,
    pageSizeOptions = [10, 20, 50],
    manualPagination = false,
    rowCount,
    enableRowSelection = false,
    bulkActions,
    enableColumnVisibility = false,
    toolbar,
    loading = false,
    empty,
    density = "default",
    variant = "default",
    maxHeight,
    stickyHeader = maxHeight !== undefined,
    className,
  } = props;

  const [sorting, setSorting] = useTableState(props.sorting, props.defaultSorting ?? [], props.onSortingChange);
  const [globalFilter, setGlobalFilter] = useTableState(props.globalFilter, "", props.onGlobalFilterChange);
  const [columnFilters, setColumnFilters] = useTableState<ColumnFiltersState>(props.columnFilters, [], props.onColumnFiltersChange);
  const [pagination, setPagination] = useTableState<PaginationState>(
    props.pagination,
    { pageIndex: 0, pageSize: Math.max(1, defaultPageSize) },
    props.onPaginationChange,
  );
  const [rowSelection, setRowSelection] = useTableState(props.rowSelection, props.defaultRowSelection ?? {}, props.onRowSelectionChange);
  const [columnVisibility, setColumnVisibility] = useTableState(
    props.columnVisibility,
    props.defaultColumnVisibility ?? {},
    props.onColumnVisibilityChange,
  );

  // A new search, filter or sort order starts again from the first page.
  const toFirstPage = useCallback(
    () => setPagination((previous) => (previous.pageIndex === 0 ? previous : { ...previous, pageIndex: 0 })),
    [setPagination],
  );
  const handleSorting = useCallback<OnChangeFn<SortingState>>((updater) => { setSorting(updater); toFirstPage(); }, [setSorting, toFirstPage]);
  const handleGlobalFilter = useCallback<OnChangeFn<string>>((updater) => { setGlobalFilter(updater); toFirstPage(); }, [setGlobalFilter, toFirstPage]);
  const handleColumnFilters = useCallback<OnChangeFn<ColumnFiltersState>>((updater) => { setColumnFilters(updater); toFirstPage(); }, [setColumnFilters, toFirstPage]);

  const selectable = Boolean(enableRowSelection);
  const allColumns = useMemo<ColumnDef<TData, any>[]>(() => {
    if (!selectable) return columns;
    const selectColumn: ColumnDef<TData, unknown> = {
      id: SELECT_COLUMN_ID,
      enableGlobalFilter: false,
      enableHiding: false,
      enableSorting: false,
      header: ({ table }) => (
        <Checkbox
          aria-label={messages.selectAllRows}
          checked={table.getIsAllPageRowsSelected()}
          indeterminate={table.getIsSomePageRowsSelected()}
          onCheckedChange={(checked) => table.toggleAllPageRowsSelected(checked)}
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          aria-label={messages.selectRow}
          checked={row.getIsSelected()}
          disabled={!row.getCanSelect()}
          onCheckedChange={(checked) => row.toggleSelected(checked)}
        />
      ),
    };
    return [selectColumn, ...columns];
  }, [columns, selectable, messages.selectAllRows, messages.selectRow]);

  const options: TableOptions<TData> = {
    data,
    columns: allColumns,
    state: { columnFilters, columnVisibility, globalFilter, pagination, rowSelection, sorting },
    onColumnFiltersChange: handleColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    onGlobalFilterChange: handleGlobalFilter,
    onPaginationChange: setPagination,
    onRowSelectionChange: setRowSelection,
    onSortingChange: handleSorting,
    enableSorting,
    enableRowSelection,
    manualFiltering,
    manualPagination,
    manualSorting,
    autoResetPageIndex: false,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  };
  if (enablePagination) options.getPaginationRowModel = getPaginationRowModel();
  if (getRowId) options.getRowId = getRowId;
  if (rowCount !== undefined) options.rowCount = rowCount;
  const table = useReactTable(options);

  const pageCount = Math.max(1, table.getPageCount());
  const total = table.getRowCount();
  // Keep the page in range when rows disappear (deleted, filtered on the server).
  useEffect(() => {
    if (!loading && pagination.pageIndex >= pageCount) {
      setPagination((previous) => ({ ...previous, pageIndex: pageCount - 1 }));
    }
  }, [loading, pageCount, pagination.pageIndex, setPagination]);

  const selectedIds = Object.keys(rowSelection).filter((id) => rowSelection[id]);
  const clearSelection = () => setRowSelection({});
  const visibleColumns = table.getVisibleLeafColumns();
  const hideableColumns = table.getAllLeafColumns().filter((column) => column.getCanHide());
  const rows = table.getRowModel().rows;
  const toolbarContent = typeof toolbar === "function" ? toolbar(table) : toolbar;
  const showToolbar = enableGlobalFilter || toolbarContent != null || selectable || (enableColumnVisibility && hideableColumns.length > 0);
  const skeletonRows = Math.min(pagination.pageSize, 8);
  const sizes = pageSizeOptions.includes(pagination.pageSize)
    ? pageSizeOptions
    : [...pageSizeOptions, pagination.pageSize].sort((a, b) => a - b);

  const tableProps = maxHeight === undefined ? {} : { render: <div style={{ maxHeight }} /> };

  return (
    <div className={cn("flex min-w-0 flex-col gap-3", className)} data-slot="data-table">
      {showToolbar ? (
        <div className="relative" data-slot="data-table-toolbar">
          {/* Selection mode overlays the toolbar row in place, so the table never shifts. */}
          <div
            className={cn("flex flex-wrap items-center gap-2", selectedIds.length > 0 && "invisible")}
            data-slot="data-table-toolbar-content"
          >
            {enableGlobalFilter ? (
              <div className="w-full sm:w-64">
                <SearchInput
                  aria-label={searchPlaceholder}
                  onValueChange={(value) => table.setGlobalFilter(value)}
                  placeholder={searchPlaceholder}
                  value={globalFilter}
                />
              </div>
            ) : null}
            {toolbarContent}
            {enableColumnVisibility && hideableColumns.length > 0 ? (
              <Menu>
                <MenuTrigger className="ms-auto" render={<Button variant="outline" />}>
                  <Columns3Icon aria-hidden="true" />
                  {messages.toggleColumns}
                </MenuTrigger>
                <MenuPopup align="end" className="min-w-40">
                  {hideableColumns.map((column) => (
                    <MenuCheckboxItem
                      checked={column.getIsVisible()}
                      key={column.id}
                      onCheckedChange={(checked) => column.toggleVisibility(checked)}
                    >
                      {columnLabel(column)}
                    </MenuCheckboxItem>
                  ))}
                </MenuPopup>
              </Menu>
            ) : null}
          </div>
          {selectable ? (
            // Present before anything is selected, so the first change is announced.
            <span aria-live="polite" className="sr-only">
              {selectedIds.length > 0 ? messages.selectedCount(selectedIds.length) : ""}
            </span>
          ) : null}
          {selectedIds.length > 0 ? (
            <div
              className="absolute inset-x-0 top-0 flex h-9 min-w-0 items-center gap-2 sm:h-8"
              data-motion="fade-in"
              data-slot="data-table-selection"
            >
              <span aria-hidden="true" className="me-1 whitespace-nowrap font-medium text-sm numeric">
                {messages.selectedCount(selectedIds.length)}
              </span>
              {bulkActions?.({
                clear: clearSelection,
                ids: selectedIds,
                rows: table.getSelectedRowModel().rows.map((row) => row.original),
                table,
              })}
              <Button className="ms-auto" onClick={clearSelection} size="sm" variant="ghost">
                {messages.clearSelection}
              </Button>
            </div>
          ) : null}
        </div>
      ) : null}

      <Table aria-busy={loading || undefined} aria-label={label} density={density} stickyHeader={stickyHeader} variant={variant} {...tableProps}>
        <TableHeader>
          {table.getHeaderGroups().map((group) => (
            <TableRow key={group.id}>
              {group.headers.map((header) => {
                const { column } = header;
                const meta = column.columnDef.meta;
                const sorted = column.getIsSorted();
                const content = header.isPlaceholder ? null : flexRender(column.columnDef.header, header.getContext());
                return (
                  <TableHead
                    aria-sort={sorted === "asc" ? "ascending" : sorted === "desc" ? "descending" : undefined}
                    className={cn(meta?.align && alignClassName[meta.align], meta?.headerClassName)}
                    colSpan={header.colSpan}
                    key={header.id}
                  >
                    {!header.isPlaceholder && column.getCanSort() ? (
                      <button
                        className={cn(
                          "group/sort touch-target relative -mx-1.5 inline-flex h-7 items-center gap-1 rounded-md px-1.5 font-medium outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-sorted:text-foreground",
                          meta?.align === "end" && "flex-row-reverse",
                        )}
                        data-slot="data-table-sort"
                        data-sorted={sorted || undefined}
                        onClick={column.getToggleSortingHandler()}
                        type="button"
                      >
                        {content}
                        {sorted === "asc" ? (
                          <ArrowUpIcon aria-hidden="true" className="size-3.5" />
                        ) : sorted === "desc" ? (
                          <ArrowDownIcon aria-hidden="true" className="size-3.5" />
                        ) : (
                          <ChevronsUpDownIcon
                            aria-hidden="true"
                            className="size-3.5 opacity-40 transition-opacity group-hover/sort:opacity-80"
                          />
                        )}
                      </button>
                    ) : (
                      content
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {loading ? (
            Array.from({ length: skeletonRows }, (_, rowIndex) => (
              <TableRow data-slot="data-table-skeleton-row" key={rowIndex}>
                {visibleColumns.map((column, columnIndex) => (
                  <TableCell key={column.id}>
                    {column.id === SELECT_COLUMN_ID ? (
                      <Skeleton className="size-4 rounded-[.25rem]" />
                    ) : (
                      <Skeleton
                        className={cn(
                          "h-3.5",
                          skeletonWidths[(rowIndex + columnIndex * 2) % skeletonWidths.length],
                          column.columnDef.meta?.align === "end" && "ms-auto",
                          column.columnDef.meta?.align === "center" && "mx-auto",
                        )}
                      />
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : rows.length > 0 ? (
            rows.map((row) => (
              <TableRow data-state={row.getIsSelected() ? "selected" : undefined} key={row.id}>
                {row.getVisibleCells().map((cell) => {
                  const meta = cell.column.columnDef.meta;
                  return (
                    <TableCell className={cn(meta?.align && alignClassName[meta.align], meta?.cellClassName)} key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow className="hover:bg-transparent!">
              <TableCell className="h-auto whitespace-normal py-10 text-center" colSpan={visibleColumns.length}>
                {empty ?? (
                  <div className="flex flex-col items-center gap-3" data-slot="data-table-empty">
                    <p className="text-muted-foreground">{messages.noResults}</p>
                    {globalFilter ? (
                      <Button onClick={() => table.setGlobalFilter("")} size="sm" variant="outline">
                        {messages.clearSearch}
                      </Button>
                    ) : null}
                  </div>
                )}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {enablePagination ? (
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2" data-slot="data-table-pagination">
          <p aria-live="polite" className="text-muted-foreground text-sm numeric">
            {messages.pageSummary(Math.min(pagination.pageIndex + 1, pageCount), pageCount, total)}
          </p>
          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex items-center gap-2">
              <span aria-hidden="true" className="text-muted-foreground text-sm max-sm:hidden">
                {messages.rowsPerPage}
              </span>
              <Select
                items={sizes.map((size) => ({ label: String(size), value: size }))}
                onValueChange={(value) => {
                  if (typeof value === "number") table.setPagination({ pageIndex: 0, pageSize: value });
                }}
                value={pagination.pageSize}
              >
                <SelectTrigger aria-label={messages.rowsPerPage} className="w-auto min-w-0 numeric" size="sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  {sizes.map((size) => (
                    <SelectItem className="numeric" key={size} value={size}>
                      {size}
                    </SelectItem>
                  ))}
                </SelectPopup>
              </Select>
            </div>
            <div className="flex items-center gap-1">
              <Button
                aria-label={messages.firstPage}
                className="max-sm:hidden"
                disabled={loading || !table.getCanPreviousPage()}
                onClick={() => table.firstPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronsLeftIcon aria-hidden="true" className="rtl:-scale-x-100" />
              </Button>
              <Button
                aria-label={messages.previousPage}
                disabled={loading || !table.getCanPreviousPage()}
                onClick={() => table.previousPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronLeftIcon aria-hidden="true" className="rtl:-scale-x-100" />
              </Button>
              <Button
                aria-label={messages.nextPage}
                disabled={loading || !table.getCanNextPage()}
                onClick={() => table.nextPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronRightIcon aria-hidden="true" className="rtl:-scale-x-100" />
              </Button>
              <Button
                aria-label={messages.lastPage}
                className="max-sm:hidden"
                disabled={loading || !table.getCanNextPage()}
                onClick={() => table.lastPage()}
                size="icon-sm"
                variant="outline"
              >
                <ChevronsRightIcon aria-hidden="true" className="rtl:-scale-x-100" />
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
