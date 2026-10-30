# DataTable

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: cfdf9f32b1ff5756b784180248b461763ef5254eba022343cf2c30838a8d4ff3

Comparison, sorting, scoped selection and optional virtualization for a caller-owned collection.

## Decision
Configure data, columns and stable IDs with DataTablePattern; retain DataTable for advanced TanStack composition. Server mode does not sort or slice supplied pages; the complete cross-page selection lives in the rowSelection ID map. Virtualization changes only the rendered window of the current row model, preserving selection and pagination scope.

## Notes
- Import DataTablePattern from components/data-table; its pager reuses PaginationPattern. Applications still verify cross-page object data, permissions and bulk-action scope.
- TanStack is a declared optional peer; applications explicitly enable sorting, filtering and pagination models.
- With sorting and selection only and no pagination, pass `autoResetAll: false` to useReactTable: its automatic reset queues a state update outside render, and when the page loads lazily through Suspense a discarded render makes React warn about updating an unmounted component.
- In fixed layout, text columns without size are flexible and split the width left over by fixed and marker columns; marker columns retain their marker and cell-inset roles. Interactive content is not clipped to force a narrow width: allow actual capacity for action columns.
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
- `busy?`: `boolean`. 正在取数。旧数据行原样保留（已有内容刷新时保留仍然有效的工作面），表格顶缘出现一条不定进度记号，不推挤布局； aria-busy 仍然设置。数据、请求与完成时机由应用持有。
- `caption?`: `React.ReactNode`.
- `containerProps?`: `TableContainerProps`.
- `emptyContent`: `React.ReactNode`.
- `error?`: `React.ReactNode`. 取数失败等需要读者处理的情况，由应用给出内容（说明与重试动作）；组件只把它摆在表格上方并声明 role="alert"。 出现错误时旧数据行不撤走：它们仍是读者可用的工作面，是否过期由应用在错误内容里说明。
- `onRowActivate?`: `(row: Row<TData>) => void`. Click noninteractive row content, or focus the row and press Enter / Space. Never toggles selection. 需要至少一个可见的 meta.rowHeader 列来给每一行命名，否则抛错。
- `selectionAppearance?`: `"row" | "checkbox"`. Checkbox mode removes only the selected-row fill; selection controls and active-row emphasis remain.
- `stickyHeader?`: `boolean`. 表头吸顶。sticky 只在最近的滚动容器里生效，而 TableContainer 本身是横向滚动容器：表头只会吸在「表格自己的有界高度容器」里—— 虚拟化模式（固定 height 的视口），或调用方用 containerProps 给容器设了 height / max-height。 没有高度限制时表格随页面流动，表头不会吸在页面顶部。
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
- `error?`: `React.ReactNode`. 见 DataTable 的 error：应用给出内容与重试动作，旧数据行保留。
- `getRowId`: `(row: TData) => string`.
- `mode?`: `"client" | "server"`.
- `onStateChange?`: `(state: DataTablePatternState, details: DataTablePatternChangeDetails) => void`.
- `pagination?`: `false | DataTablePatternPagination`.
- `selection?`: `{ label: string; rowLabel: (row: TData) => string; canSelect?: (row: TData) => boolean }`.
- `selectionAppearance?`: `"row" | "checkbox"`.
- `state?`: `DataTablePatternState`.
- `stickyHeader?`: `boolean`. 表头吸顶；仅在表格自己的有界高度容器里生效（虚拟化视口，或 tableProps.containerProps 设了 height / max-height），不会吸在页面顶部。
- `tableProps?`: `Omit<DataTableProps<TData>, "table" | "caption" | "emptyContent" | "busy" | "error" | "activeRowId" | "onRowActivate" | "selectionAppearance" | "virtualization" | "stickyHeader">`.
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
- data / columns / getRowId / emptyContent: T[] / DataTablePatternColumn<T>[] / (row: T) => string / ReactNode. Columns configure id, header, accessor, cell, sortable, rowHeader and numeric, with optional size/minSize/maxSize in pixels and ellipsis. Columns with size are fixed; columns without it share the remaining width. Stable getRowId is required.
- state / defaultState / onStateChange: DataTablePatternState / Partial<DataTablePatternState> / (state, details) => void. A shared snapshot contains sorting, pagination, rowSelection and activeRowId; sorting and reset to page 1 produce one notification. Public page numbers start at 1.
- mode / pagination: client | server / false | DataTablePatternPagination. Client mode sorts/slices complete data and derives totals from data.length; server mode presents supplied rows and requires totalCount, plus explicit hasNextPage when null.
- selection: { label, rowLabel, canSelect? }. Enables selection; select-all changes eligible rows on the current page while preserving outside IDs. Read state.rowSelection for the complete server selection, not the loaded-page getSelectedRowModel.
- activeRow: ({ trigger?: 'cell', columnId: string } | { trigger: 'row' }) & { onActivate?: (row: T) => void }. By default the named column gets an activation button and its cell must be noninteractive. With trigger=row, click row content or focus the row and press Enter/Space. Nested controls, links, labels and editors do not activate the row; activation and selection remain independent.
- selectionAppearance: row | checkbox; default row. Checkbox mode removes only selected-row fill, retaining actual checkboxes and independent active-row emphasis.
- virtualization: { height: number, estimateRowHeight: number, overscan?: number }. Explicitly virtualizes the current row model. Height includes the caption and header; actual row heights are measured. Dimensions must be finite and positive; overscan is a nonnegative integer, defaulting to 1.
- stickyHeader: boolean. Sticks the header to the top of the table's own bounded-height container: the virtualization viewport, or a height / max-height set through tableProps.containerProps. An unbounded table does not stick to the page top.
- columns[].pinned / columns[].empty: boolean / ReactNode. pinned fixes a contiguous run of leading columns (the selection column is pinned with them; non-contiguous pins throw) and draws an edge line once scrolled sideways. empty replaces the default dash plus screen-reader 'No value' for null, undefined or empty strings in columns without cell; zero still renders. Callers distinguish unknown from not applicable through empty.
- caption / busy / error / tableProps / native div props: ReactNode / boolean / ReactNode / DataTableProps / HTML props. While busy the old rows stay put, an indeterminate mark appears along the top edge and the pager blocks paging while keeping focus on the pressed button. error is application content with its own retry action, placed above the table as role=alert; old rows stay as well. Props target the table or composition root and never infer request outcomes.

### DataTable
A native two-dimensional collection.
- table / emptyContent / caption / busy / error / activeRowId / containerProps: TableInstance<T> / ReactNode / TableContainerProps. GetRowId and at least one visible column are required; zero and caption are retained, and busy keeps valid rows without dimming them. Data rows take the hover surface on pointer hover; selected and active rows keep the deeper selected surface. error is placed above the table as role=alert and carries its own retry action.
- table.options.columns[].size / table.options.columns[].minSize / table.options.columns[].maxSize / table.options.state.columnSizing: number / number / number / TanStack state. Actual pixel widths clamped by minSize/maxSize. Any explicit dimension or nonempty columnSizing opts into fixed layout with colgroup; otherwise native auto layout remains. A column with size (or defaultColumn.size, or an entry in columnSizing) is fixed, a marker column takes its content width, and every other column is flexible: the table is 100% wide, flexible columns split the remaining space, minSize is a flexible column's floor, and without minSize the floor is 150px (TanStack's default size). The table's minimum width is the fixed columns plus the marker columns plus the flexible column count times the largest flexible floor; below it the table scrolls horizontally. maxSize does not constrain a flexible column; write size when a cap is needed. Without flexible columns the table is as wide as its columns together, and grouped headers sum visible leaf widths. Drag resizing is not built in.
- columnDef.meta.ellipsis: boolean; default false. Ellipsizes noninteractive header/cell text on one line. The full text always stays in the DOM and accessible name; when actually truncated the cell becomes a keyboard stop and shows the full text in a Tooltip on focus or hover (not a native title, which keyboards and touch cannot read). Cells that fit stay out of the Tab sequence. Interactive content is not clipped. Without ellipsis cells wrap and show the full text; column widths determine capacity, so keep critical consequences visible.
- columnDef.meta.numeric: boolean; default false. A numeric column is declared by the column definition, never guessed from content: header and every cell share one alignment, at the inline end (left in RTL), with tabular figures. The Pattern column config uses the same name.
- selectionAppearance / onRowActivate / virtualization: row | checkbox / (row: Row<T>) => void / DataTableVirtualization. Selection appearance and virtualization match Pattern. Row activation receives a TanStack Row; the caller owns activeRowId. Only one row is in the Tab sequence (the last focused row, else the active row, else the first) and arrow keys move between rows. Nested interactive elements and custom data-row-activate-ignore regions are excluded, and activation never changes selection. A visible meta.rowHeader column is required to name the rows; without one it throws.
- columnDef.meta.rowHeader: boolean. Actual row headers use th scope=row; comparison columns are never automatically hidden. With a visible row-header column, each row's aria-labelledby points at all of its row-header cells, so the row's accessible name is their text (several row-header columns join in column order). DataTableSelectionCell names each checkbox after this row, falling back to a generic name only without a row-header column. onRowActivate without a visible row-header column throws.
- render / ref / native props: Base UI part props. Props and refs target actual elements; caller events and styles are preserved.

### DataTableSortButton
A real sorting control for the caller instance.
- column / Button props: Column<T, unknown> / ButtonProps. Invokes TanStack sorting; only the primary header gets aria-sort, and applications explain secondary sort order.

### DataTableSelectionCell / DataTableSelectAll
Row selection and explicit scope selection.
- row / table / scope / aria-label: Row<T> / TableInstance<T> / page | filtered / string. Select-all requires aria-label and scope; checked/mixed considers only selectable rows in that scope. Write the action and object in aria-label (for example "Select entries"); the component appends the range to the accessible name ("this page only" or "all filtered results") so screen reader users know what checking it selects.
- onCheckedChange / disabled / ref: CheckboxProps. Primitive cancellation prevents selection changes; disabled rows are excluded from select-all.

## Keyboard
- Enter / Space: Activate a focused actionable row; nested controls retain their own keyboard behavior.
- ArrowUp / ArrowDown / Home / End: With row activation or virtualization, move focus between rows (in virtual mode also from the viewport, scrolling the target row into render first) without intercepting editing keys in nested inputs.

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
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption={english ? "Local collection · 3 entries" : "本地集合 · 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} state={state} onStateChange={setState} pagination={{ pageSizeOptions: [2, 5] }} selection={{ label: english ? "Select entries" : "选择条目", rowLabel: row => english ? `Select ${label(row)}` : `选择${label(row)}` }} activeRow={{ columnId: "label" }} />
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
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption={english ? `Local collection · ${data.length} records` : `本地集合 · ${data.length} 项`} emptyContent={english ? "No local records" : "本地集合没有记录"} state={state} onStateChange={setState} selection={{ label: english ? "Select entries" : "选择条目", rowLabel: row => english ? `Select ${label(row)}` : `选择${label(row)}` }} selectionAppearance={appearance} activeRow={{ trigger: "row" }} virtualization={{ height: 320, estimateRowHeight: 48, overscan: 2 }} />
    <output className="text-support text-muted-foreground">{english ? `Selected: ${Object.keys(state.rowSelection).length} · Active: ${active ? label(active) : "None"}` : `已选 ${Object.keys(state.rowSelection).length} 项 · 当前：${active ? label(active) : "无"}`}</output>
  </Stack>;
}
```

### 固定表头、固定列与空值
Source: apps/docs/src/content/data-table/demos/04-pinned.tsx
```tsx
import { DataTablePattern, type DataTablePatternColumn } from "@qingye_lab/ui/components/data-table";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "固定表头、固定列与空值", titleEn: "Sticky header, pinned columns and empty values" } satisfies DemoMeta;

type Account = { id: string; name: string; region: string; owner: string | null; orders: number; refunds: number | null; plan: string; renewal: string | null };
const regions = ["华东", "华北", "华南", "西南"];
const rows: Account[] = Array.from({ length: 40 }, (_, index) => ({
  id: `account-${index + 1}`,
  name: `账户 ${String(index + 1).padStart(2, "0")}`,
  region: regions[index % regions.length]!,
  owner: index % 5 === 0 ? null : `负责人 ${index % 9 + 1}`,
  orders: index % 6 === 0 ? 0 : (index * 37) % 400,
  refunds: index % 4 === 0 ? null : index % 3,
  plan: index % 2 ? "标准版" : "企业版",
  renewal: index % 7 === 0 ? "" : `2027-0${index % 9 + 1}-1${index % 9}`,
}));

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const columns: DataTablePatternColumn<Account>[] = [
    { id: "name", header: english ? "Account" : "账户", accessor: row => row.name, rowHeader: true, size: 140, pinned: true },
    { id: "region", header: english ? "Region" : "区域", accessor: row => row.region, size: 120 },
    { id: "owner", header: english ? "Owner" : "负责人", accessor: row => row.owner, size: 160 },
    { id: "orders", header: english ? "Orders" : "订单", accessor: row => row.orders, size: 120, numeric: true },
    { id: "refunds", header: english ? "Refunds" : "退款", accessor: row => row.refunds, size: 120, numeric: true, empty: english ? "N/A" : "不适用" },
    { id: "plan", header: english ? "Plan" : "套餐", accessor: row => row.plan, size: 160 },
    { id: "renewal", header: english ? "Renewal" : "续费日", accessor: row => row.renewal, size: 180 },
  ];
  return <DataTablePattern data={rows} columns={columns} getRowId={row => row.id} caption={english ? "Accounts" : "账户"} emptyContent={english ? "No accounts" : "没有账户"} stickyHeader selection={{ label: english ? "Select accounts" : "选择账户", rowLabel: row => english ? `Select ${row.name}` : `选择${row.name}` }} tableProps={{ containerProps: { className: "max-h-72" } }} />;
}
```

### 刷新与失败
Source: apps/docs/src/content/data-table/demos/05-refresh.tsx
```tsx
import * as React from "react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { Button } from "@qingye_lab/ui/components/button";
import { DataTablePattern, type DataTablePatternColumn } from "@qingye_lab/ui/components/data-table";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "刷新与失败", titleEn: "Refreshing and failure" } satisfies DemoMeta;

type Entry = { id: string; label: string; labelEn: string; count: number };
const data: Entry[] = [
  { id: "sensors", label: "接入设备", labelEn: "Connected devices", count: 12 },
  { id: "roles", label: "权限与角色", labelEn: "Permissions and roles", count: 8 },
  { id: "sync", label: "同步与导出", labelEn: "Sync and export", count: 0 },
];

export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const columns: DataTablePatternColumn<Entry>[] = [
    { id: "label", header: english ? "Name" : "名称", accessor: row => english ? row.labelEn : row.label, rowHeader: true },
    { id: "count", header: english ? "Records" : "记录数", accessor: row => row.count, numeric: true },
  ];
  // 请求由应用持有：这里用定时器代替，第一次刷新失败，第二次成功。
  const [busy, setBusy] = React.useState(false);
  const [failed, setFailed] = React.useState(false);
  const attempts = React.useRef(0);
  const refresh = () => {
    setBusy(true); setFailed(false);
    window.setTimeout(() => { setBusy(false); setFailed(attempts.current++ === 0); }, 1600);
  };
  return <Stack>
    <Inline><Button variant="bordered" onClick={refresh} disabled={busy}>{english ? "Refresh" : "刷新"}</Button></Inline>
    <DataTablePattern data={data} columns={columns} getRowId={row => row.id} caption={english ? "Local collection · 3 entries" : "本地集合 · 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} busy={busy}
      error={failed ? <Alert tone="danger"><AlertDescription>{english ? "Refresh failed. The rows below are from the last load." : "刷新失败，下面是上次加载的数据。"}<Button variant="quiet" size="sm" onClick={refresh}>{english ? "Retry" : "重试"}</Button></AlertDescription></Alert> : undefined} />
  </Stack>;
}
```

### 定宽列与弹性列
Source: apps/docs/src/content/data-table/demos/06-mixed-width.tsx
```tsx
import { getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { DataTable } from "@qingye_lab/ui/components/data-table";
import { StatusDot, type StatusDotStatus } from "@qingye_lab/ui/components/status-dot";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "定宽列与弹性列", titleEn: "Fixed and flexible columns" } satisfies DemoMeta;

type Entry = { id: string; name: string; status: string; dot: StatusDotStatus; count: number; note: string };
export default function Demo() {
  const english = useUILocale().code.startsWith("en");
  const data: Entry[] = english ? [
    { id: "sensors", name: "Connected devices", status: "Online", dot: "online", count: 12, note: "Workshop sensors and the remote sites that report through the gateway." },
    { id: "roles", name: "Permissions and roles", status: "Draft", dot: "neutral", count: 8, note: "Who may view, edit and export each collection." },
    { id: "sync", name: "Sync and export", status: "Paused", dot: "neutral", count: 0, note: "Nightly export to the shared archive." },
  ] : [
    { id: "sensors", name: "接入设备", status: "在线", dot: "online", count: 12, note: "车间传感器，以及经网关上报的远端站点。" },
    { id: "roles", name: "权限与角色", status: "草稿", dot: "neutral", count: 8, note: "谁可以查看、编辑和导出各个集合。" },
    { id: "sync", name: "同步与导出", status: "暂停", dot: "neutral", count: 0, note: "每晚导出到共享归档。" },
  ];
  const columns: ColumnDef<Entry>[] = [
    { accessorKey: "status", header: english ? "Status" : "状态", size: 96, cell: ({ row }) => <StatusDot status={row.original.dot} label={row.original.status} /> },
    { accessorKey: "name", header: english ? "Name" : "名称", minSize: 160, meta: { rowHeader: true } },
    { accessorKey: "note", header: english ? "Description" : "描述" },
    { accessorKey: "count", header: english ? "Records" : "记录数", size: 96, meta: { numeric: true } },
  ];
  const table = useReactTable({ data, columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), autoResetAll: false });
  return <DataTable table={table} caption={english ? "Local collection · 3 entries" : "本地集合 · 3 项"} emptyContent={english ? "No local entries" : "本地集合没有条目"} />;
}
```
