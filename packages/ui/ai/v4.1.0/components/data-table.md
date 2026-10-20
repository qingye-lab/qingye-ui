# 数据集合 DataTable

Package: @qingye_lab/ui@4.1.0
Import: @qingye_lab/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: 0b21dfecf3278e2a19393f39bf35b35bb362a90aa161d580ac1a4cc47a243842

调用方真实集合的比较、排序与范围选择。

## Decision
常用集合用 DataTablePattern 配置数据、列与稳定 ID；高级 TanStack 组合继续使用 DataTable。服务端模式不排序或切片传入页；完整跨页选择保存在 rowSelection ID 映射中。

## Notes
- 标准组合从 components/data-table 导入 DataTablePattern；分页内置复用 PaginationPattern。跨页选择的对象内容、权限与批量执行范围仍由应用核实。
- TanStack 为已声明的可选 peer；应用明确启用排序/筛选/分页模型。
- 只用排序与选择、不分页时，给 useReactTable 传 `autoResetAll: false`：它的自动重置在渲染之外排队更新状态，页面经 Suspense 懒加载时，被丢弃的那次渲染会让 React 报「未挂载组件更新状态」。

## Use and ownership
- 真实集合按共同维度比较并需要排序或选择。
- Avoid: 不请求服务、不猜总数、不把未知当空、不自动删列。
- Library: 表格语义、公共组合与范围选择。
- Application: 数据、稳定标识、服务端结果与业务范围；高级模式另持有 TanStack 实例。

## Composition
- DataTablePattern：配置式排序、当页全选、活动行与分页组合，不发请求。
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
配置式排序、当页全选、活动行与分页组合，不发请求。
- data / columns / getRowId / emptyContent: T[] / DataTablePatternColumn<T>[] / (row: T) => string / ReactNode. 列显式配置 id、header、accessor、cell、sortable、rowHeader、numeric；稳定 getRowId 必填。
- state / defaultState / onStateChange: DataTablePatternState / Partial<DataTablePatternState> / (state, details) => void. sorting、pagination、rowSelection、activeRowId 共用快照；排序与回到第 1 页只通知一次。外部页码从 1 开始。
- mode / pagination: client | server / false | DataTablePatternPagination. client 对完整数据排序切片并从 data.length 得到总数；server 只展示传入页，分页必须给 totalCount；未知 null 时还必须给 hasNextPage。
- selection: { label, rowLabel, canSelect? }. 启用选择列；全选只改当页可选行并保留范围外 ID。服务端完整选中范围读取 state.rowSelection，不读当前页的 getSelectedRowModel。
- activeRow: { columnId: string, onActivate?: (row: T) => void }. 该列内容成为可键盘操作的按钮，cell 保持非交互内容；活动行与复选状态独立。
- caption / busy / tableProps / native div props: ReactNode / boolean / DataTableProps / HTML props. 刷新保留传入行；属性分别归属表格或组合外层，不推断请求成功或失败。

### DataTable
原生二维集合。
- table / emptyContent / caption / busy / activeRowId / containerProps: TableInstance<T> / ReactNode / TableContainerProps. getRowId 必填、至少一列；零值/caption 保留，busy 不删除有效 rows。
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
