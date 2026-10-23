# 数据集合 DataTable

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: 4ee6be6405131aadb5c4186fe2e261baf09de557de964e4a9e1ead508199c41b

调用方真实集合的比较、排序、范围选择与可选虚拟化。

## Decision
常用集合用 DataTablePattern 配置数据、列与稳定 ID；高级 TanStack 组合继续使用 DataTable。服务端模式不排序或切片传入页；完整跨页选择保存在 rowSelection ID 映射中。虚拟化只改变当前行模型的渲染窗口，不改变全选与分页范围。

## Notes
- 标准组合从 components/data-table 导入 DataTablePattern；分页内置复用 PaginationPattern。跨页选择的对象内容、权限与批量执行范围仍由应用核实。
- TanStack 为已声明的可选 peer；应用明确启用排序/筛选/分页模型。
- 只用排序与选择、不分页时，给 useReactTable 传 `autoResetAll: false`：它的自动重置在渲染之外排队更新状态，页面经 Suspense 懒加载时，被丢弃的那次渲染会让 React 报「未挂载组件更新状态」。
- 固定布局中未配置尺寸的文字列使用 TanStack 的默认尺寸；标记列仍按已有 marker 与单元格内缘角色取宽。列宽过小不会裁掉交互控件，请给操作列留下真实容量。
- 虚拟化保留 table/thead/tbody/tr/th/td。aria-rowcount 与 aria-rowindex 描述当前表格页（含表头），不把服务端全局总数冒充已加载行；全选仍覆盖当前模型的完整范围。
- 虚拟行按稳定 ID 测量，支持实际可变行高；estimateRowHeight 应接近真实行高，未测量的远端行仍是估计。建议显式列宽，避免自动布局因窗口内容变化而重排；纯客户端页面需要查看或打印所有行时关闭虚拟化。
- 焦点所在的离屏行额外保留一行，输入草稿不因滚动丢失；该行移出当前模型时，焦点仍属于它才回到滚动容器。

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
配置式排序、当页全选、活动行与分页组合，不发请求。
- data / columns / getRowId / emptyContent: T[] / DataTablePatternColumn<T>[] / (row: T) => string / ReactNode. 列显式配置 id、header、accessor、cell、sortable、rowHeader、numeric；可选 size、minSize、maxSize（px）与 ellipsis。稳定 getRowId 必填。
- state / defaultState / onStateChange: DataTablePatternState / Partial<DataTablePatternState> / (state, details) => void. sorting、pagination、rowSelection、activeRowId 共用快照；排序与回到第 1 页只通知一次。外部页码从 1 开始。
- mode / pagination: client | server / false | DataTablePatternPagination. client 对完整数据排序切片并从 data.length 得到总数；server 只展示传入页，分页必须给 totalCount；未知 null 时还必须给 hasNextPage。
- selection: { label, rowLabel, canSelect? }. 启用选择列；全选只改当页可选行并保留范围外 ID。服务端完整选中范围读取 state.rowSelection，不读当前页的 getSelectedRowModel。
- activeRow: ({ trigger?: 'cell', columnId: string } | { trigger: 'row' }) & { onActivate?: (row: T) => void }. 默认在指定列放激活按钮，cell 保持非交互内容；trigger=row 时点击行正文或聚焦行后按 Enter/Space。内部控件、链接、label 与编辑区不触发行激活；活动行与复选状态独立。
- selectionAppearance: row | checkbox; default row. checkbox 只取消选中行的底色，真实复选框仍保留；活动行的强调独立保留。
- virtualization: { height: number, estimateRowHeight: number, overscan?: number }. 显式启用当前行模型的虚拟化；height 含 caption 与表头，实际行高自动测量。尺寸须有限且为正，overscan 为非负整数（默认 1）。
- caption / busy / tableProps / native div props: ReactNode / boolean / DataTableProps / HTML props. 刷新保留传入行；属性分别归属表格或组合外层，不推断请求成功或失败。

### DataTable
原生二维集合。
- table / emptyContent / caption / busy / activeRowId / containerProps: TableInstance<T> / ReactNode / TableContainerProps. getRowId 必填、至少一列；零值/caption 保留，busy 不删除有效 rows。
- table.options.columns[].size / table.options.columns[].minSize / table.options.columns[].maxSize / table.options.state.columnSizing: number / number / number / TanStack state. 实际像素列宽，按 minSize/maxSize 钳制。显式配置任一尺寸或非空 columnSizing 时启用固定布局与 colgroup，组合表头取可见叶列之和；未配置尺寸时保持原生自动布局。不内置拖拽调宽。
- columnDef.meta.ellipsis: boolean; default false. 对非交互的表头与单元格文字启用单行省略；完整渲染文字保留在 DOM、可访问名称与原生 title 中。含控件的内容不裁切。列宽决定容量，关键后果仍应直接可见。
- selectionAppearance / onRowActivate / virtualization: row | checkbox / (row: Row<T>) => void / DataTableVirtualization. 选择外观与虚拟化同 Pattern；行激活回调收到 TanStack Row，调用方持有 activeRowId。点击内部交互元素不激活，data-row-activate-ignore 可排除自定义区域；不改变选择。
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
- Enter / Space: 聚焦可激活行后执行行激活；内部控件保留自己的键盘行为。
- ArrowUp / ArrowDown / Home / End: 虚拟化时，在滚动容器或行本身移动焦点；不会接管内部输入框的编辑键位。

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
