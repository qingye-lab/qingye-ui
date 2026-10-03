"use client";
import { flexRender, type Column, type ColumnDef, type Row, type Table as TableInstance } from "@tanstack/react-table";
import * as React from "react";
import { Button, type ButtonProps } from "./button";
import { Checkbox, type CheckboxProps } from "./checkbox";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow, type TableProps, type TableContainerProps } from "./table";
import { useUILocale } from "../locale";
import { cn } from "../utils";

export type DataTableInstance<TData> = TableInstance<TData>;
export type DataTableColumnDef<TData, TValue = unknown> = ColumnDef<TData, TValue>;
export interface DataTableColumnMeta { rowHeader?: boolean }
export type DataTableProps<TData> = Omit<TableProps, "children"> & { table: TableInstance<TData>; caption?: React.ReactNode; emptyContent: React.ReactNode; busy?: boolean; containerProps?: TableContainerProps };
export function DataTable<TData>({ table, caption, emptyContent, busy = false, containerProps, className, ...props }: DataTableProps<TData>) {
  if (!table.options.getRowId) throw new Error("DataTable requires an explicit stable getRowId.");
  const columns = table.getVisibleLeafColumns(); if (columns.length === 0) throw new Error("DataTable requires at least one visible comparison column.");
  const rows = table.getRowModel().rows; const primarySort = table.getState().sorting?.[0]?.id;
  return <TableContainer data-slot="data-table-container" {...containerProps}><Table data-slot="data-table" aria-busy={busy} {...props} className={cn(className)}>
    {caption !== undefined && <TableCaption>{caption}</TableCaption>}
    <TableHeader>{table.getHeaderGroups().map(group => <TableRow key={group.id}>{group.headers.map(header => {
      const sort = header.column.getIsSorted(); return <TableHead key={header.id} colSpan={header.colSpan} scope={header.subHeaders.length ? "colgroup" : "col"} aria-sort={header.column.id === primarySort && sort ? sort === "asc" ? "ascending" : "descending" : undefined}>{header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}</TableHead>;
    })}</TableRow>)}</TableHeader>
    <TableBody>{rows.length === 0 ? <TableRow><TableCell colSpan={columns.length}>{emptyContent}</TableCell></TableRow> : rows.map(row => <TableRow key={row.id} data-row-id={row.id} data-selected={row.getIsSelected() || undefined} className={row.getIsSelected() ? "bg-accent" : undefined}>{row.getVisibleCells().map(cell => (cell.column.columnDef.meta as DataTableColumnMeta | undefined)?.rowHeader ? <TableHead key={cell.id} scope="row">{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableHead> : <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>)}</TableRow>)}</TableBody>
  </Table></TableContainer>;
}
export type DataTableSortButtonProps<TData> = ButtonProps & { column: Column<TData, unknown> };
export function DataTableSortButton<TData>({ column, children, disabled, onClick, ...props }: DataTableSortButtonProps<TData>) {
  const sort = column.getIsSorted(); const { messages } = useUILocale(); const next = column.getNextSortingOrder();
  return <Button data-slot="data-table-sort-button" variant="quiet" size="sm" {...props} disabled={Boolean(disabled || !column.getCanSort())} onClick={event => { onClick?.(event); if (!event.defaultPrevented && !event.baseUIHandlerPrevented) column.getToggleSortingHandler()?.(event); }}>{children}<span aria-hidden="true">{sort === "asc" ? "↑" : sort === "desc" ? "↓" : null}</span><span className="sr-only">{next === "asc" ? messages.sortAscending : next === "desc" ? messages.sortDescending : messages.clear}</span></Button>;
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
