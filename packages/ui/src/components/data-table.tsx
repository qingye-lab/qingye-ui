"use client";

import { useUILocale } from "../locale";

import { useEffect, useState } from "react";
import { flexRender, getCoreRowModel, getFilteredRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type SortingState } from "@tanstack/react-table";
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from "lucide-react";
import { Button } from "./button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./table";
import { SearchInput } from "./search-input";

export type { ColumnDef } from "@tanstack/react-table";
export type DataTableProps<T> = {
  data: T[];
  columns: ColumnDef<T, any>[];
  getRowId?: (row: T) => string;
  pageSize?: number;
  search?: boolean;
  label?: string;
  emptyLabel?: string;
  searchLabel?: string;
  previousLabel?: string;
  nextLabel?: string;
  pageLabel?: (page: number, pages: number, total: number) => string;
};

export function DataTable<T>(props: DataTableProps<T>) {
  const { messages } = useUILocale();
  const { data, columns, getRowId, pageSize = 10, search = true, label = messages.table, emptyLabel = messages.noResults, searchLabel = messages.searchTable, previousLabel = messages.previousPage, nextLabel = messages.nextPage, pageLabel = messages.pageSummary } = props;
  const [sorting, setSorting] = useState<SortingState>([]);
  const [filter, setFilter] = useState("");
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: Math.max(1, pageSize) });
  const resetPage = () => setPagination((previous) => ({ ...previous, pageIndex: 0 }));
  const table = useReactTable({ data, columns, ...(getRowId ? { getRowId } : {}), state: { sorting, globalFilter: filter, pagination }, onPaginationChange: setPagination, autoResetPageIndex: false,
    onSortingChange: (next) => { setSorting(next); resetPage(); }, onGlobalFilterChange: (next) => { setFilter(next); resetPage(); },
    getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getFilteredRowModel: getFilteredRowModel(), getPaginationRowModel: getPaginationRowModel() });
  const pages = Math.max(1, table.getPageCount());
  useEffect(() => { setPagination((previous) => previous.pageIndex >= pages ? { ...previous, pageIndex: pages - 1 } : previous); }, [pages]);
  useEffect(() => { setPagination((previous) => previous.pageSize === Math.max(1, pageSize) ? previous : { pageIndex: 0, pageSize: Math.max(1, pageSize) }); }, [pageSize]);
  return <div className="flex min-w-0 flex-col gap-3">
    {search ? <SearchInput value={filter} onValueChange={setFilter} aria-label={searchLabel} placeholder={searchLabel} /> : null}
    <Table aria-label={label}><TableHeader>{table.getHeaderGroups().map((group) => <TableRow key={group.id}>{group.headers.map((header) => <TableHead key={header.id} aria-sort={header.column.getIsSorted() === "asc" ? "ascending" : header.column.getIsSorted() === "desc" ? "descending" : "none"}>
      {header.isPlaceholder ? null : header.column.getCanSort() ? <Button type="button" variant="ghost" size="sm" onClick={header.column.getToggleSortingHandler()}>{flexRender(header.column.columnDef.header, header.getContext())}{header.column.getIsSorted() === "asc" ? <ArrowUpIcon aria-hidden="true" /> : header.column.getIsSorted() === "desc" ? <ArrowDownIcon aria-hidden="true" /> : <ChevronsUpDownIcon aria-hidden="true" />}</Button> : flexRender(header.column.columnDef.header, header.getContext())}
    </TableHead>)}</TableRow>)}</TableHeader><TableBody>{table.getRowModel().rows.length ? table.getRowModel().rows.map((row) => <TableRow key={row.id}>{row.getVisibleCells().map((cell) => <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>) : <TableRow><TableCell colSpan={columns.length} className="h-24 text-center text-muted-foreground">{emptyLabel}</TableCell></TableRow>}</TableBody></Table>
    <div className="flex flex-wrap items-center justify-between gap-3"><span aria-live="polite" className="text-sm text-muted-foreground">{pageLabel(table.getState().pagination.pageIndex + 1, Math.max(1, table.getPageCount()), table.getFilteredRowModel().rows.length)}</span><div className="flex gap-2"><Button type="button" variant="outline" size="sm" disabled={!table.getCanPreviousPage()} onClick={() => table.previousPage()}>{previousLabel}</Button><Button type="button" variant="outline" size="sm" disabled={!table.getCanNextPage()} onClick={() => table.nextPage()}>{nextLabel}</Button></div></div>
  </div>;
}
