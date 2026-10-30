# 数据集合 DataTable

Package: @qingye_lab/ui@5.0.0
Import: @qingye_lab/ui/components/data-table
Source: packages/ui/src/components/data-table.tsx
Source SHA-256: cfdf9f32b1ff5756b784180248b461763ef5254eba022343cf2c30838a8d4ff3

调用方真实集合的比较、排序、范围选择与可选虚拟化。

## Decision
常用集合用 DataTablePattern 配置数据、列与稳定 ID；高级 TanStack 组合继续使用 DataTable。服务端模式不排序或切片传入页；完整跨页选择保存在 rowSelection ID 映射中。虚拟化只改变当前行模型的渲染窗口，不改变全选与分页范围。

## Notes
- 标准组合从 components/data-table 导入 DataTablePattern；分页内置复用 PaginationPattern。跨页选择的对象内容、权限与批量执行范围仍由应用核实。
- TanStack 为已声明的可选 peer；应用明确启用排序/筛选/分页模型。
- 只用排序与选择、不分页时，给 useReactTable 传 `autoResetAll: false`：它的自动重置在渲染之外排队更新状态，页面经 Suspense 懒加载时，被丢弃的那次渲染会让 React 报「未挂载组件更新状态」。
- 固定布局中未写 size 的文字列是弹性列，平分定宽列与标记列之外的剩余空间；标记列仍按已有 marker 与单元格内缘角色取宽。列宽过小不会裁掉交互控件，请给操作列留下真实容量。
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
配置式排序、当页全选、活动行与分页组合，不发请求。
- data / columns / getRowId / emptyContent: T[] / DataTablePatternColumn<T>[] / (row: T) => string / ReactNode. 列显式配置 id、header、accessor、cell、sortable、rowHeader、numeric；可选 size、minSize、maxSize（px）与 ellipsis。写了 size 的列定宽，没写的列平分剩余空间。稳定 getRowId 必填。
- state / defaultState / onStateChange: DataTablePatternState / Partial<DataTablePatternState> / (state, details) => void. sorting、pagination、rowSelection、activeRowId 共用快照；排序与回到第 1 页只通知一次。外部页码从 1 开始。
- mode / pagination: client | server / false | DataTablePatternPagination. client 对完整数据排序切片并从 data.length 得到总数；server 只展示传入页，分页必须给 totalCount；未知 null 时还必须给 hasNextPage。
- selection: { label, rowLabel, canSelect? }. 启用选择列；全选只改当页可选行并保留范围外 ID。服务端完整选中范围读取 state.rowSelection，不读当前页的 getSelectedRowModel。
- activeRow: ({ trigger?: 'cell', columnId: string } | { trigger: 'row' }) & { onActivate?: (row: T) => void }. 默认在指定列放激活按钮，cell 保持非交互内容；trigger=row 时点击行正文或聚焦行后按 Enter/Space。内部控件、链接、label 与编辑区不触发行激活；活动行与复选状态独立。
- selectionAppearance: row | checkbox; default row. checkbox 只取消选中行的底色，真实复选框仍保留；活动行的强调独立保留。
- virtualization: { height: number, estimateRowHeight: number, overscan?: number }. 显式启用当前行模型的虚拟化；height 含 caption 与表头，实际行高自动测量。尺寸须有限且为正，overscan 为非负整数（默认 1）。
- stickyHeader: boolean. 表头吸顶。只在表格自己的有界高度容器里生效：虚拟化视口，或 tableProps.containerProps 设了 height / max-height；无高度限制的表格不会吸在页面顶部。
- columns[].pinned / columns[].empty: boolean / ReactNode. pinned 固定从第一列起连续的前导列（选择列自动一并固定，不连续时抛错），横向滚动后末端出现一条线。empty 是无 cell 的列在 null、undefined、空串时显示的内容，默认「—」加读屏的「无值」；0 照常显示。未知与不适用由调用方用 empty 区分。
- caption / busy / error / tableProps / native div props: ReactNode / boolean / ReactNode / DataTableProps / HTML props. busy 时旧数据行不动，表格顶缘出现不定进度记号，分页暂时挡住翻页但焦点留在原按钮。error 由应用给出内容和重试动作，摆在表格上方并声明 role=alert，旧数据行同样保留。属性分别归属表格或组合外层，不推断请求成功或失败。

### DataTable
原生二维集合。
- table / emptyContent / caption / busy / error / activeRowId / containerProps: TableInstance<T> / ReactNode / TableContainerProps. getRowId 必填、至少一列；零值/caption 保留，busy 不删除有效 rows，也不变暗。数据行悬停读悬停面，选中与活动行保持更深的选中面。error 摆在表格上方（role=alert），应用自带重试动作。
- table.options.columns[].size / table.options.columns[].minSize / table.options.columns[].maxSize / table.options.state.columnSizing: number / number / number / TanStack state. 实际像素列宽，按 minSize/maxSize 钳制。显式配置任一尺寸或非空 columnSizing 时启用固定布局与 colgroup；未配置尺寸时保持原生自动布局。写了 size（或 defaultColumn.size，或 columnSizing 里有它）的列定宽，标记列取内容宽，其余列是弹性列：表宽 100%，弹性列平分剩余空间，minSize 是它的下限，未写 minSize 时下限为 150px（TanStack 默认 size）。表格最小宽度 = 定宽列之和 + 标记列之和 + 弹性列数 × 各弹性列下限的最大值，窄于此值时横向滚动。弹性列的 maxSize 不约束宽度，需要上限就写 size。没有弹性列时表宽等于各列之和，组合表头取可见叶列之和。不内置拖拽调宽。
- columnDef.meta.ellipsis: boolean; default false. 对非交互的表头与单元格文字启用单行省略。完整文字始终在 DOM 与可访问名称里；真的被截断时这一格成为键盘停靠点，聚焦或悬停以 Tooltip 显示全文（不用原生 title：键盘与触屏读不到）。放得下的格不占 Tab 序列。含控件的内容不裁切。不省略时单元格默认折行显示全文；列宽决定容量，关键后果仍应直接可见。
- columnDef.meta.numeric: boolean; default false. 数值列由列定义声明，不由内容猜：表头与该列每个单元格同一对齐——行内末端（RTL 下在左）并用等宽数字。Pattern 的列配置同名。
- selectionAppearance / onRowActivate / virtualization: row | checkbox / (row: Row<T>) => void / DataTableVirtualization. 选择外观与虚拟化同 Pattern；行激活回调收到 TanStack Row，调用方持有 activeRowId。整张表只有一行在 Tab 序列里（最近聚焦的行，否则活动行，否则第一行），方向键在行间移动。点击内部交互元素不激活，data-row-activate-ignore 可排除自定义区域；不改变选择。需要一个可见的 meta.rowHeader 列给行命名，否则抛错。
- columnDef.meta.rowHeader: boolean. 实际行标题用 th scope=row；比较列不自动隐藏。有可见行标题列时，每一行的 aria-labelledby 指向该行所有行标题单元格，行的可访问名称即这些单元格的文字（多个行标题列按列序连接）。DataTableSelectionCell 用它给每个选择框命名为「选择“该行名称”」，没有行标题列时才用泛称。设置了 onRowActivate 却没有可见的行标题列时抛错。
- render / ref / native props: Base UI part props. 属性和 ref 归属实际元素；调用方事件与样式保留。

### DataTableSortButton
应用实例的真实排序入口。
- column / Button props: Column<T, unknown> / ButtonProps. 触发 TanStack sorter；仅主排序表头写 aria-sort，多重顺序由应用补充。

### DataTableSelectionCell / DataTableSelectAll
行选择与显式范围选择。
- row / table / scope / aria-label: Row<T> / TableInstance<T> / page | filtered / string. 全选的 aria-label 和 scope 必填；checked/mixed 只看该范围可选择 rows。aria-label 只写动作与对象（如「选择条目」），组件按 scope 把范围追加到可访问名称末尾（「仅本页」或「全部筛选结果」），读屏用户据此知道勾选的后果。
- onCheckedChange / disabled / ref: CheckboxProps. 取消原语细节可阻止改变选择，禁用行不进入全选。

## Keyboard
- Enter / Space: 聚焦可激活行后执行行激活；内部控件保留自己的键盘行为。
- ArrowUp / ArrowDown / Home / End: 行激活或虚拟化时，在行间移动焦点（虚拟化时也可从滚动容器出发，目标行先滚动渲染）；不会接管内部输入框的编辑键位。

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
