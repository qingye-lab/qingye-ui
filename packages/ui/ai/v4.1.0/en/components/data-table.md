# DataTable

Package: @qingye_lab/ui@4.1.0
Import: @qingye_lab/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: 0b21dfecf3278e2a19393f39bf35b35bb362a90aa161d580ac1a4cc47a243842

Comparison, sorting and scoped selection for a real caller-owned collection.

## Decision
Configure data, columns and stable IDs with DataTablePattern; retain DataTable for advanced TanStack composition. Server mode does not sort or slice supplied pages; the complete cross-page selection lives in the rowSelection ID map.

## Notes
- Import DataTablePattern from components/data-table; its pager reuses PaginationPattern. Applications still verify cross-page object data, permissions and bulk-action scope.
- TanStack is a declared optional peer; applications explicitly enable sorting, filtering and pagination models.
- With sorting and selection only and no pagination, pass `autoResetAll: false` to useReactTable: its automatic reset queues a state update outside render, and when the page loads lazily through Suspense a discarded render makes React warn about updating an unmounted component.

## Use and ownership
- Compare an actual collection along shared dimensions with sorting or selection.
- Avoid: Requesting services, guessing totals, treating unknown as empty, or automatically removing columns.
- Library: Table semantics, public composition, and scoped selection.
- Application: TanStack instance, data, stable identifiers, model configuration, and state.

## Composition
- DataTablePattern: Configured sorting, page selection, active rows and pagination without issuing requests.
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
- DataTablePattern: function; owner data-table; PASS; props: DataTablePatternProps<TData>
- DataTablePatternChangeDetails: type; owner data-table; PASS
- DataTablePatternColumn: type; owner data-table; PASS
- DataTablePatternPagination: type; owner data-table; PASS
- DataTablePatternProps: type; owner data-table; PASS
- DataTablePatternState: type; owner data-table; PASS
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
- `activeRowId?`: `string | null`.
- `busy?`: `boolean`.
- `caption?`: `React.ReactNode`.
- `containerProps?`: `TableContainerProps`.
- `emptyContent`: `React.ReactNode`.
- `table`: `TableInstance<TData>`.
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

### DataTablePattern
- `activeRow?`: `{ columnId: string; onActivate?: (row: TData) => void }`. The named column contains a keyboard-accessible activation button. Its cell content must be noninteractive; row selection stays independent.
- `busy?`: `boolean`.
- `caption?`: `React.ReactNode`.
- `columns`: `readonly DataTablePatternColumn<TData>[]`.
- `data`: `TData[]`.
- `defaultState?`: `Partial<DataTablePatternState>`.
- `emptyContent`: `React.ReactNode`.
- `getRowId`: `(row: TData) => string`.
- `mode?`: `"client" | "server"`.
- `onStateChange?`: `(state: DataTablePatternState, details: DataTablePatternChangeDetails) => void`.
- `pagination?`: `false | DataTablePatternPagination`.
- `selection?`: `{ label: string; rowLabel: (row: TData) => string; canSelect?: (row: TData) => boolean }`.
- `state?`: `DataTablePatternState`.
- `tableProps?`: `Omit<DataTableProps<TData>, "table" | "caption" | "emptyContent" | "busy" | "activeRowId">`.
- plus 277 inherited (@types/react 277); not expanded, see the installed declarations

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

### DataTablePattern
Configured sorting, page selection, active rows and pagination without issuing requests.
- data / columns / getRowId / emptyContent: T[] / DataTablePatternColumn<T>[] / (row: T) => string / ReactNode. Columns configure id, header, accessor, cell, sortable, rowHeader and numeric; stable getRowId is required.
- state / defaultState / onStateChange: DataTablePatternState / Partial<DataTablePatternState> / (state, details) => void. A shared snapshot contains sorting, pagination, rowSelection and activeRowId; sorting and reset to page 1 produce one notification. Public page numbers start at 1.
- mode / pagination: client | server / false | DataTablePatternPagination. Client mode sorts/slices complete data and derives totals from data.length; server mode presents supplied rows and requires totalCount, plus explicit hasNextPage when null.
- selection: { label, rowLabel, canSelect? }. Enables selection; select-all changes eligible rows on the current page while preserving outside IDs. Read state.rowSelection for the complete server selection, not the loaded-page getSelectedRowModel.
- activeRow: { columnId: string, onActivate?: (row: T) => void }. The named column gets a keyboard-accessible activation button and its cell must contain noninteractive content; activation and checkbox selection remain independent.
- caption / busy / tableProps / native div props: ReactNode / boolean / DataTableProps / HTML props. Refreshes retain supplied rows; props target the table or composition root and never infer request outcomes.

### DataTable
A native two-dimensional collection.
- table / emptyContent / caption / busy / activeRowId / containerProps: TableInstance<T> / ReactNode / TableContainerProps. GetRowId and at least one visible column are required; zero and caption are retained, and busy preserves valid rows.
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
### 排序、选择与分页
Source: apps/docs/src/content/data-table/demos/01-task.tsx
```tsx
import * as React from "react";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "@qingye_lab/ui/components/data-table";
import { Stack } from "@qingye_lab/ui/components/layout";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "排序、选择与分页", titleEn: "Sorting, selection and pagination" } satisfies DemoMeta;

type Entry = { id: string; label: string; count: number };
const data: Entry[] = [
  { id: "sensors", label: "接入设备", count: 12 },
  { id: "roles", label: "权限与角色", count: 8 },
  { id: "sync", label: "同步与导出", count: 0 },
];
const columns: DataTablePatternColumn<Entry>[] = [
  { id: "label", header: "名称", accessor: row => row.label, rowHeader: true },
  { id: "count", header: "记录数", accessor: row => row.count, sortable: true, sortDescFirst: false, numeric: true },
];

export default function Demo() {
  const [state, setState] = React.useState<DataTablePatternState>({ sorting: [], pagination: { page: 1, pageSize: 2 }, rowSelection: {}, activeRowId: null });
  const selected = data.filter(row => state.rowSelection[row.id]);
  return <Stack>
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption="本地集合 · 3 项" emptyContent="本地集合没有条目" state={state} onStateChange={setState} pagination={{ pageSizeOptions: [2, 5] }} selection={{ label: "选择当页条目", rowLabel: row => `选择${row.label}` }} activeRow={{ columnId: "label" }} />
    <output className="text-support text-muted-foreground">已选：{selected.map(row => row.label).join("、") || "无"}</output>
  </Stack>;
}
```

### 自定实例
Source: apps/docs/src/content/data-table/demos/02-instance.tsx
```tsx
import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableSortButton } from "@qingye_lab/ui/components/data-table";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "自定实例", titleEn: "Custom instance" } satisfies DemoMeta;

type Entry = { id: string; label: string; count: number };
const data: Entry[] = [{ id: "sensors", label: "接入设备", count: 12 }, { id: "roles", label: "权限与角色", count: 8 }, { id: "sync", label: "同步与导出", count: 0 }];
const columns: ColumnDef<Entry>[] = [
  { accessorKey: "label", header: "名称", meta: { rowHeader: true } },
  { accessorKey: "count", header: ({ column }) => <DataTableSortButton column={column}>记录数</DataTableSortButton>, sortDescFirst: false, meta: { numeric: true } },
];

export default function Demo() {
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), autoResetAll: false });
  return <DataTable table={table} caption="本地集合 · 3 项" emptyContent="本地集合没有条目" />;
}
```
