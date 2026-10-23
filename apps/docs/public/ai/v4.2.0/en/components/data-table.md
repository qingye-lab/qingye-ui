# DataTable

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: 4ee6be6405131aadb5c4186fe2e261baf09de557de964e4a9e1ead508199c41b

Comparison, sorting, scoped selection and optional virtualization for a caller-owned collection.

## Decision
Configure data, columns and stable IDs with DataTablePattern; retain DataTable for advanced TanStack composition. Server mode does not sort or slice supplied pages; the complete cross-page selection lives in the rowSelection ID map. Virtualization changes only the rendered window of the current row model, preserving selection and pagination scope.

## Notes
- Import DataTablePattern from components/data-table; its pager reuses PaginationPattern. Applications still verify cross-page object data, permissions and bulk-action scope.
- TanStack is a declared optional peer; applications explicitly enable sorting, filtering and pagination models.
- With sorting and selection only and no pagination, pass `autoResetAll: false` to useReactTable: its automatic reset queues a state update outside render, and when the page loads lazily through Suspense a discarded render makes React warn about updating an unmounted component.
- In fixed layout, unsized text columns use TanStack's default dimensions; marker columns retain their marker and cell-inset roles. Interactive content is not clipped to force a narrow width: allow actual capacity for action columns.
- Virtualization retains table/thead/tbody/tr/th/td. Aria-rowcount and aria-rowindex describe the current table page including headers, without presenting server totals as loaded rows. Select-all still covers the complete current model scope.
- Virtual rows are measured by stable ID and support variable actual heights. Choose an estimateRowHeight close to actual rows: distant unmeasured heights remain estimates. Explicit column widths prevent window content from changing natural layout. Disable virtualization to view or print all client rows.
- One extra offscreen row retains focus and editor drafts while scrolling. When it leaves the current model, focus returns to the viewport only if that row still owned focus.

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
- DataTableVirtualization: type; owner data-table; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### DataTable
- `activeRowId?`: `string | null`.
- `busy?`: `boolean`.
- `caption?`: `React.ReactNode`.
- `containerProps?`: `TableContainerProps`.
- `emptyContent`: `React.ReactNode`.
- `onRowActivate?`: `(row: Row<TData>) => void`. Click noninteractive row content, or focus the row and press Enter / Space. Never toggles selection.
- `selectionAppearance?`: `"row" | "checkbox"`. Checkbox mode removes only the selected-row fill; selection controls and active-row emphasis remain.
- `table`: `TableInstance<TData>`.
- `virtualization?`: `DataTableVirtualization`.
- plus 289 inherited (@types/react 288, @base-ui/react 1); not expanded, see the installed declarations

### DataTablePattern
- `activeRow?`: `({ trigger?: "cell"; columnId: string } | { trigger: "row"; columnId?: never }) & { onActivate?: (row: TData) => void }`. Cell activation preserves the existing button entry; row activation excludes nested interactive content. Both stay independent from selection.
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
- `selectionAppearance?`: `"row" | "checkbox"`.
- `state?`: `DataTablePatternState`.
- `tableProps?`: `Omit<DataTableProps<TData>, "table" | "caption" | "emptyContent" | "busy" | "activeRowId" | "onRowActivate" | "selectionAppearance" | "virtualization">`.
- `virtualization?`: `DataTableVirtualization`.
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
- Runtime: @base-ui/react, @tabler/icons-react, @tanstack/react-virtual, class-variance-authority, clsx, react, tailwind-merge
- Optional peers: @tanstack/react-table
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)

## Curated API
Written descriptions; the list above is the type-resolved fact.

### DataTablePattern
Configured sorting, page selection, active rows and pagination without issuing requests.
- data / columns / getRowId / emptyContent: T[] / DataTablePatternColumn<T>[] / (row: T) => string / ReactNode. Columns configure id, header, accessor, cell, sortable, rowHeader and numeric, with optional size/minSize/maxSize in pixels and ellipsis. Stable getRowId is required.
- state / defaultState / onStateChange: DataTablePatternState / Partial<DataTablePatternState> / (state, details) => void. A shared snapshot contains sorting, pagination, rowSelection and activeRowId; sorting and reset to page 1 produce one notification. Public page numbers start at 1.
- mode / pagination: client | server / false | DataTablePatternPagination. Client mode sorts/slices complete data and derives totals from data.length; server mode presents supplied rows and requires totalCount, plus explicit hasNextPage when null.
- selection: { label, rowLabel, canSelect? }. Enables selection; select-all changes eligible rows on the current page while preserving outside IDs. Read state.rowSelection for the complete server selection, not the loaded-page getSelectedRowModel.
- activeRow: ({ trigger?: 'cell', columnId: string } | { trigger: 'row' }) & { onActivate?: (row: T) => void }. By default the named column gets an activation button and its cell must be noninteractive. With trigger=row, click row content or focus the row and press Enter/Space. Nested controls, links, labels and editors do not activate the row; activation and selection remain independent.
- selectionAppearance: row | checkbox; default row. Checkbox mode removes only selected-row fill, retaining actual checkboxes and independent active-row emphasis.
- virtualization: { height: number, estimateRowHeight: number, overscan?: number }. Explicitly virtualizes the current row model. Height includes the caption and header; actual row heights are measured. Dimensions must be finite and positive; overscan is a nonnegative integer, defaulting to 1.
- caption / busy / tableProps / native div props: ReactNode / boolean / DataTableProps / HTML props. Refreshes retain supplied rows; props target the table or composition root and never infer request outcomes.

### DataTable
A native two-dimensional collection.
- table / emptyContent / caption / busy / activeRowId / containerProps: TableInstance<T> / ReactNode / TableContainerProps. GetRowId and at least one visible column are required; zero and caption are retained, and busy preserves valid rows.
- table.options.columns[].size / table.options.columns[].minSize / table.options.columns[].maxSize / table.options.state.columnSizing: number / number / number / TanStack state. Actual pixel widths clamped by minSize/maxSize. Any explicit dimension or nonempty columnSizing opts into fixed layout with colgroup; grouped headers sum visible leaf widths. Otherwise native auto layout remains. Drag resizing is not built in.
- columnDef.meta.ellipsis: boolean; default false. Ellipsizes noninteractive header/cell text on one line while retaining full rendered text in the DOM, accessible name and native title. Interactive content is not clipped. Column widths determine capacity; keep critical consequences visible.
- selectionAppearance / onRowActivate / virtualization: row | checkbox / (row: Row<T>) => void / DataTableVirtualization. Selection appearance and virtualization match Pattern. Row activation receives a TanStack Row; the caller owns activeRowId. Nested interactive elements and custom data-row-activate-ignore regions are excluded, and activation never changes selection.
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
- Enter / Space: Activate a focused actionable row; nested controls retain their own keyboard behavior.
- ArrowUp / ArrowDown / Home / End: In virtual mode, move focus from the viewport or row itself without intercepting editing keys in nested inputs.

## Source examples
### 排序、选择与分页
Source: apps/docs/src/content/data-table/demos/01-task.tsx
```tsx
import * as React from "react";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "@qingye_lab/ui/components/data-table";
import { Stack } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "排序、选择与分页", titleEn: "Sorting, selection and pagination" } satisfies DemoMeta;

type Entry = { id: string; label: string; labelEn: string; count: number };
const data: Entry[] = [
  { id: "sensors", label: "接入设备", labelEn: "Connected devices", count: 12 },
  { id: "roles", label: "权限与角色", labelEn: "Permissions and roles", count: 8 },
  { id: "sync", label: "同步与导出", labelEn: "Sync and export", count: 0 },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const label = (row: Entry) => english ? row.labelEn : row.label;
  const columns: DataTablePatternColumn<Entry>[] = [
    { id: "label", header: english ? "Name" : "名称", accessor: label, rowHeader: true },
    { id: "count", header: english ? "Records" : "记录数", accessor: row => row.count, sortable: true, sortDescFirst: false, numeric: true },
  ];
  const [state, setState] = React.useState<DataTablePatternState>({ sorting: [], pagination: { page: 1, pageSize: 2 }, rowSelection: {}, activeRowId: null });
  const selected = data.filter(row => state.rowSelection[row.id]);
  return <Stack>
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption={english ? "Local collection · 3 entries" : "本地集合 · 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} state={state} onStateChange={setState} pagination={{ pageSizeOptions: [2, 5] }} selection={{ label: english ? "Select this page" : "选择当页条目", rowLabel: row => english ? `Select ${label(row)}` : `选择${label(row)}` }} activeRow={{ columnId: "label" }} />
    <output className="text-support text-muted-foreground">{english ? "Selected: " : "已选："}{selected.map(label).join(english ? ", " : "、") || (english ? "None" : "无")}</output>
  </Stack>;
}
```

### 列宽与完整文字
Source: apps/docs/src/content/data-table/demos/02-instance.tsx
```tsx
import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable, DataTableSortButton } from "@qingye_lab/ui/components/data-table";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "列宽与完整文字", titleEn: "Column widths and complete text" } satisfies DemoMeta;

type Entry = { id: string; label: string; count: number };
export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const data: Entry[] = [
    { id: "sensors", label: english ? "Connected devices — workshop and remote locations" : "接入设备——车间与远端站点的完整列表", count: 12 },
    { id: "roles", label: english ? "Permissions and roles" : "权限与角色", count: 8 },
    { id: "sync", label: english ? "Sync and export" : "同步与导出", count: 0 },
  ];
  const columns: ColumnDef<Entry>[] = [{ id: "collection", header: english ? "Local collection" : "本地集合", columns: [
    { accessorKey: "label", header: english ? "Name" : "名称", size: 240, minSize: 160, maxSize: 320, meta: { rowHeader: true, ellipsis: true } },
    { accessorKey: "count", header: ({ column }) => <DataTableSortButton column={column}>{english ? "Records" : "记录数"}</DataTableSortButton>, size: 120, minSize: 100, sortDescFirst: false, meta: { numeric: true } },
  ] }];
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), autoResetAll: false });
  return <DataTable table={table} caption={english ? "Local collection · 3 entries" : "本地集合 · 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} />;
}
```

### 长集合、行激活与编辑
Source: apps/docs/src/content/data-table/demos/03-window.tsx
```tsx
import * as React from "react";
import { Button } from "@qingye_lab/ui/components/button";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "@qingye_lab/ui/components/data-table";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "长集合、行激活与编辑", titleEn: "Long collection, row activation and editing" } satisfies DemoMeta;

type Entry = { id: string; index: number };
const initialRows: Entry[] = Array.from({ length: 500 }, (_, index) => ({ id: `record-${index + 1}`, index: index + 1 }));

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const [data, setData] = React.useState(initialRows);
  const [drafts, setDrafts] = React.useState<Record<string, string>>({});
  const [state, setState] = React.useState<DataTablePatternState>({ sorting: [], pagination: { page: 1, pageSize: 20 }, rowSelection: {}, activeRowId: null });
  const [appearance, setAppearance] = React.useState<"row" | "checkbox">("checkbox");
  const [density, setDensity] = React.useState("comfortable");
  const label = (row: Entry) => english ? `Record ${String(row.index).padStart(3, "0")}` : `记录 ${String(row.index).padStart(3, "0")}`;
  const columns: DataTablePatternColumn<Entry>[] = [
    { id: "label", header: english ? "Name" : "名称", accessor: label, rowHeader: true, size: 160, ellipsis: true },
    { id: "note", header: english ? "Note" : "备注", accessor: row => row.index % 7 === 0 ? english ? "Keep the complete note available while comparing records, including text that wraps onto several lines." : "比较记录时保留完整备注；这条较长的记录会自然换行，行高由实际内容决定。" : english ? "Ready for comparison" : "待比较", size: 240 },
    { id: "draft", header: english ? "Draft" : "草稿", accessor: row => drafts[row.id] ?? "", size: 200, cell: row => <Input aria-label={english ? `Draft for ${label(row)}` : `${label(row)}的草稿`} value={drafts[row.id] ?? ""} onChange={event => setDrafts(previous => ({ ...previous, [row.id]: event.target.value }))} /> },
    { id: "actions", header: english ? "Action" : "操作", accessor: row => row.id, size: 100, cell: row => <Button variant="quiet" size="sm" aria-label={english ? `Remove ${label(row)}` : `移除${label(row)}`} onClick={() => {
      setData(previous => previous.filter(item => item.id !== row.id));
      setState(previous => {
        const rowSelection = { ...previous.rowSelection };
        delete rowSelection[row.id];
        return { ...previous, rowSelection, activeRowId: previous.activeRowId === row.id ? null : previous.activeRowId };
      });
    }}>{english ? "Remove" : "移除"}</Button> },
  ];
  const active = data.find(row => row.id === state.activeRowId);
  return <Stack data-density={density === "compact" ? "compact" : undefined}>
    <Inline gap="field" className="flex-wrap">
      <SegmentedControl aria-label={english ? "Selection appearance" : "选择外观"} value={appearance} onValueChange={value => setAppearance(value as "row" | "checkbox")}>
        <SegmentedControlItem value="checkbox">{english ? "Checkbox" : "复选框"}</SegmentedControlItem>
        <SegmentedControlItem value="row">{english ? "Row fill" : "行底色"}</SegmentedControlItem>
      </SegmentedControl>
      <SegmentedControl aria-label={english ? "Density" : "密度"} value={density} onValueChange={setDensity}>
        <SegmentedControlItem value="comfortable">{english ? "Comfortable" : "常规"}</SegmentedControlItem>
        <SegmentedControlItem value="compact">{english ? "Compact" : "紧凑"}</SegmentedControlItem>
      </SegmentedControl>
    </Inline>
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption={english ? `Local collection · ${data.length} records` : `本地集合 · ${data.length} 项`} emptyContent={english ? "No local records" : "本地集合没有记录"} state={state} onStateChange={setState} selection={{ label: english ? "Select the complete collection" : "选择整个集合", rowLabel: row => english ? `Select ${label(row)}` : `选择${label(row)}` }} selectionAppearance={appearance} activeRow={{ trigger: "row" }} virtualization={{ height: 320, estimateRowHeight: 48, overscan: 2 }} />
    <output className="text-support text-muted-foreground">{english ? `Selected: ${Object.keys(state.rowSelection).length} · Active: ${active ? label(active) : "None"}` : `已选 ${Object.keys(state.rowSelection).length} 项 · 当前：${active ? label(active) : "无"}`}</output>
  </Stack>;
}
```
