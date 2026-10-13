# DataTable

Package: @qingye_lab/ui@4.0.0
Import: @qingye_lab/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: 8200e643ee3e02eb8bc515f1ee1c3f364f1609b5c4c1abdd17f37221b4aca0fa

Comparison, sorting and scoped selection for a real caller-owned collection.

## Decision
Applications supply the TanStack instance and getRowId; filtered/page selection changes only its scope and preserves outside selections.

## Notes
- TanStack is a declared optional peer; applications explicitly enable sorting, filtering and pagination models.
- With sorting and selection only and no pagination, pass `autoResetAll: false` to useReactTable: its automatic reset queues a state update outside render, and when the page loads lazily through Suspense a discarded render makes React warn about updating an unmounted component.

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

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### DataTable
- `busy?`: `boolean`.
- `caption?`: `React.ReactNode`.
- `containerProps?`: `TableContainerProps`.
- `emptyContent`: `React.ReactNode`.
- `table`: `TableInstance<TData>`.
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

### DataTableSelectAll
- `aria-label`: `string`. Defines a string value that labels the current element.
- `onCheckedChange?`: `CheckboxProps["onCheckedChange"]`.
- `scope`: `"page" | "filtered"`.
- `table`: `TableInstance<TData>`.
- plus 286 inherited (@types/react 272, @base-ui/react 14); not expanded, see the installed declarations

### DataTableSelectionCell
- `onCheckedChange?`: `CheckboxProps["onCheckedChange"]`.
- `row`: `Row<TData>`.
- plus 287 inherited (@types/react 273, @base-ui/react 14); not expanded, see the installed declarations

### DataTableSortButton
- `className?`: `string`.
- `column`: `Column<TData, unknown>`.
- `data-slot?`: `string`.
- `loading?`: `boolean`. 这个动作正在执行。事实由调用方持有；按钮只表示忙碌并挡住重复触发，不启动请求、不推断完成。 成功、失败与结果未知不是按钮的事：就地说明用 Alert，短暂反馈用 Toast，字段错误用 FieldError。
- `shape?`: `"label" | "icon"`.
- `size?`: `"xs" | "sm" | "md" | "lg" | "xl"`.
- `tone?`: `"neutral" | "danger"`.
- `variant?`: `"solid" | "bordered" | "quiet"`.
- plus 288 inherited (@types/react 285, @base-ui/react 3); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: @tanstack/react-table
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

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
import { DataTable, DataTableSelectAll, DataTableSelectionCell, DataTableSortButton } from "@qingye_lab/ui/components/data-table";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "真实排序与范围选择", titleEn: "Real sorting and scoped selection" } satisfies DemoMeta;

type Entry = { id: string; label: string; count: number };
const data: Entry[] = [
  { id: "sensors", label: "接入设备", count: 12 },
  { id: "roles", label: "权限与角色", count: 8 },
  { id: "sync", label: "同步与导出", count: 0 },
];

export default function Demo() {
  const columns = React.useMemo<ColumnDef<Entry>[]>(() => [
    // marker 列只放一个复选框，不占文字列的留白（基础层 §6）。
    { id: "selection", enableSorting: false, meta: { marker: true }, header: ({ table }) => <DataTableSelectAll table={table} scope="filtered" aria-label="选择当前本地集合" />, cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择${row.original.label}`} /> },
    { accessorKey: "label", meta: { rowHeader: true }, header: "名称" },
    { accessorKey: "count", header: ({ column }) => <DataTableSortButton column={column}>记录数</DataTableSortButton>, sortDescFirst: false, meta: { numeric: true } },
  ], []);
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), autoResetAll: false });
  return <Stack>
    <DataTable table={table} caption="本地集合 · 3 项" emptyContent="本地集合没有条目" />
    <output className="text-support text-muted-foreground">已选：{table.getSelectedRowModel().rows.map(row => row.original.label).join("、") || "无"}</output>
  </Stack>;
}
```
