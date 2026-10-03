# DataTable

Package: @qingye/ui@1.0.0
Import: @qingye/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: 6313affe4fc777784287b601733b60430c3bbe748181643867f1709ed07ee0ca

Comparison, sorting and scoped selection for a real caller-owned collection.

## Decision
Applications supply the TanStack instance and getRowId; filtered/page selection changes only its scope and preserves outside selections.

## Notes
- TanStack is a declared optional peer; applications explicitly enable sorting, filtering and pagination models.

## Use and ownership
- Compare an actual collection along shared dimensions with sorting or selection.
- Avoid: Requesting services, guessing totals, treating unknown as empty, or automatically removing columns.
- Library: Table semantics, public composition, and scoped selection.
- Application: TanStack instance, data, stable identifiers, model configuration, and state.

## Composition
- DataTable: A native two-dimensional collection.
- DataTableSortButton: A real sorting control for the caller instance.
- DataTableSelectionCell / DataTableSelectAll: Row selection and explicit scope selection.

## Responsive behavior
- Keep actual desktop structure; menus fit available space and tables retain complete comparison columns.

## Customization
- Control profiles, spacing, and popup surfaces consume existing roles; their appearance is a preset.

## Current exports
- DataTable: function; owner data-table; PASS; props: DataTableProps<TData>
- DataTableColumnDef: type; owner data-table; PASS
- DataTableColumnMeta: interface; owner data-table; PASS
- DataTableInstance: type; owner data-table; PASS
- DataTableProps: type; owner data-table; PASS
- DataTableSelectAll: function; owner data-table; PASS; props: DataTableSelectAllProps<TData>
- DataTableSelectAllProps: type; owner data-table; PASS
- DataTableSelectionCell: function; owner data-table; PASS; props: DataTableSelectionCellProps<TData>
- DataTableSelectionCellProps: type; owner data-table; PASS
- DataTableSortButton: function; owner data-table; PASS; props: DataTableSortButtonProps<TData>
- DataTableSortButtonProps: type; owner data-table; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: @tanstack/react-table
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DataTable
A native two-dimensional collection.
- table / emptyContent / caption / busy / containerProps: TableInstance<T> / ReactNode / TableContainerProps. GetRowId and at least one visible column are required; zero and caption are retained, and busy preserves valid rows.
- columnDef.meta.rowHeader: boolean. Actual row headers use th scope=row; comparison columns are never automatically hidden.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### DataTableSortButton
A real sorting control for the caller instance.
- column / Button props: Column<T, unknown> / ButtonProps. Invokes TanStack sorting; only the primary header gets aria-sort, and applications explain secondary sort order.

### DataTableSelectionCell / DataTableSelectAll
Row selection and explicit scope selection.
- row / table / scope / aria-label: Row<T> / TableInstance<T> / page | filtered / string. Select-all requires aria-label and scope; checked/mixed considers only selectable rows in that scope.
- onCheckedChange / disabled / ref: CheckboxProps. Primitive cancellation prevents selection changes; disabled rows are excluded from select-all.

## Keyboard

## Source examples
### 真实排序与范围选择
Source: apps/docs/src/content/data-table/demos/01-task.tsx
```tsx
import * as React from "react";
import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableSelectAll, DataTableSelectionCell, DataTableSortButton } from "@qingye/ui/components/data-table";
import { Stack } from "@qingye/ui/components/layout";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "真实排序与范围选择", titleEn: "Real sorting and scoped selection" } satisfies DemoMeta;
type Entry = { id: string; label: string; count: number };
const data: Entry[] = [{ id: "a", label: "条目 A", count: 0 }, { id: "b", label: "条目 B", count: 3 }, { id: "c", label: "条目 C", count: 1 }];
export default function Demo() {
  const columns = React.useMemo<ColumnDef<Entry>[]>(() => [{ id: "selection", enableSorting: false, header: ({ table }) => <DataTableSelectAll table={table} scope="filtered" aria-label="选择当前本地集合" />, cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择 ${row.original.label}`} /> }, { accessorKey: "label", meta: { rowHeader: true }, header: "条目" }, { accessorKey: "count", header: ({ column }) => <DataTableSortButton column={column}>数量</DataTableSortButton>, sortDescFirst: false }], []);
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() });
  return <Stack><DataTable table={table} caption="本地集合 · 3 项" emptyContent="本地集合没有条目" /><output className="text-support">已选标识：{table.getSelectedRowModel().rows.map(row => row.id).join("、") || "无"}</output></Stack>;
}
```
