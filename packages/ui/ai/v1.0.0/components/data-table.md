# 数据集合 DataTable

Package: @qingye_lab/ui@1.0.0
Import: @qingye_lab/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: 6c90102f2bc72cc10b6b9a886cc1a8f2f9e64f91aac5bf57befb245b63422055

调用方真实集合的比较、排序与范围选择。

## Decision
TanStack 实例与 getRowId 由应用提供；筛选/当前页选择只改该范围，保留范围外选择。

## Notes
- TanStack 为已声明的可选 peer；应用明确启用排序/筛选/分页模型。

## Use and ownership
- 真实集合按共同维度比较并需要排序或选择。
- Avoid: 不请求服务、不猜总数、不把未知当空、不自动删列。
- Library: 表格语义、公共组合与范围选择。
- Application: TanStack 实例、数据、稳定标识、模型配置与状态。

## Composition
- DataTable：原生二维集合。
- DataTableSortButton：应用实例的真实排序入口。
- DataTableSelectionCell / DataTableSelectAll：行选择与显式范围选择。

## Responsive behavior
- 桌面保持真实结构；菜单受可用空间限制，表格保留完整比较列。

## Customization
- 控件档案、间距和浮层表面消费现有角色；具体外观是预设。

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
- Runtime: @base-ui/react, @tabler/icons-react, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: @tanstack/react-table
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### DataTable
原生二维集合。
- table / emptyContent / caption / busy / containerProps: TableInstance<T> / ReactNode / TableContainerProps. getRowId 必填、至少一列；零值/caption 保留，busy 不删除有效 rows。
- columnDef.meta.rowHeader: boolean. 实际行标题用 th scope=row；比较列不自动隐藏。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### DataTableSortButton
应用实例的真实排序入口。
- column / Button props: Column<T, unknown> / ButtonProps. 触发 TanStack sorter；仅主排序表头写 aria-sort，多重顺序由应用补充。

### DataTableSelectionCell / DataTableSelectAll
行选择与显式范围选择。
- row / table / scope / aria-label: Row<T> / TableInstance<T> / page | filtered / string. 全选的 aria-label 和 scope 必填；checked/mixed 只看该范围可选择 rows。
- onCheckedChange / disabled / ref: CheckboxProps. 取消原语细节可阻止改变选择，禁用行不进入全选。

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
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel() });
  return <Stack>
    <DataTable table={table} caption="本地集合 · 3 项" emptyContent="本地集合没有条目" />
    <output className="text-support text-muted-foreground">已选：{table.getSelectedRowModel().rows.map(row => row.original.label).join("、") || "无"}</output>
  </Stack>;
}
```
