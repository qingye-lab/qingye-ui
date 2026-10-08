import * as React from "react";
import { IconLayoutSidebarRightExpand } from "@tabler/icons-react";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type PaginationState, type RowSelectionState, type SortingState } from "@tanstack/react-table";
import { Link as RouterLink } from "@/components/locale-link";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";
import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { DataTable, DataTableSelectAll, DataTableSelectionCell, DataTableSortButton } from "@qingye_lab/ui/components/data-table";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle } from "@qingye_lab/ui/components/drawer";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Pagination, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious } from "@qingye_lab/ui/components/pagination";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { BASE } from "./shell";
import { COLLECTIONS, number, type Collection, type Source } from "./data";
import { syncDot } from "./status";

/* 集合列表：过滤即输即滤；选中后工具条就地换成批量动作；点名称从右侧抽屉看摘要，不离开列表。 */

const PAGE_SIZE = 8;
const SOURCES: ("全部来源" | Source)[] = ["全部来源", "接口推送", "数据库连接", "定时导入", "手动上传"];

export default function Collections() {
  const [query, setQuery] = React.useState("");
  const [scope, setScope] = React.useState("all");
  const [source, setSource] = React.useState<(typeof SOURCES)[number]>("全部来源");
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "records", desc: true }]);
  const [selection, setSelection] = React.useState<RowSelectionState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: PAGE_SIZE });
  const [peek, setPeek] = React.useState<Collection | null>(null);

  const matched = React.useMemo(() => COLLECTIONS.filter(item =>
    (!query.trim() || item.name.includes(query.trim()))
    && (scope === "all" || item.state !== "已同步")
    && (source === "全部来源" || item.source === source)) as Collection[], [query, scope, source]);

  const columns = React.useMemo<ColumnDef<Collection>[]>(() => [
    { id: "selection", enableSorting: false, meta: { marker: true }, header: ({ table }) => <DataTableSelectAll table={table} scope="filtered" aria-label="选择全部集合" />, cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择${row.original.name}`} /> },
    { accessorKey: "name", meta: { rowHeader: true }, header: ({ column }) => <DataTableSortButton column={column}>名称</DataTableSortButton>,
      // 名称是去处：链到详情页，与其他行正文同一字重（行标题靠位置识别）。
      cell: ({ row }) => <RouterLink to={`${BASE}/collections/${row.original.id}`} className="rounded-item text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring">{row.original.name}</RouterLink> },
    { accessorKey: "source", header: "来源", enableSorting: false, cell: ({ row }) => <span className="text-muted-foreground">{row.original.source}</span> },
    { accessorKey: "owner", header: "负责人", enableSorting: false, cell: ({ row }) => <Inline gap="field"><Avatar size="xs" label={row.original.owner}><AvatarFallback>{row.original.owner.slice(0, 1)}</AvatarFallback></Avatar><span>{row.original.owner}</span></Inline> },
    { accessorKey: "records", meta: { numeric: true }, sortDescFirst: true, header: ({ column }) => <DataTableSortButton column={column}>记录数</DataTableSortButton>, cell: ({ row }) => number.format(row.original.records) },
    { id: "trend", enableSorting: false, header: "近 8 周", cell: ({ row }) => <Sparkline label={`${row.original.name}近 8 周记录数`} values={row.original.weekly} width={80} /> },
    { accessorKey: "state", header: "状态", enableSorting: false, cell: ({ row }) => <StatusDot status={syncDot[row.original.state]} label={row.original.state} /> },
    { accessorKey: "synced", header: "最近同步", enableSorting: false, cell: ({ row }) => <span className="text-muted-foreground">{row.original.synced}</span> },
    // 侧边预览是动作：每行末尾一枚图标按钮，名称说清预览的是谁。
    { id: "peek", enableSorting: false, meta: { marker: true }, header: () => <span className="sr-only">预览</span>, cell: ({ row }) => <Button variant="quiet" size="sm" shape="icon" aria-label={`预览${row.original.name}`} onClick={() => setPeek(row.original)} className="text-muted-foreground"><IconLayoutSidebarRightExpand aria-hidden="true" /></Button> },
  ], []);

  const table = useReactTable({ data: matched, columns, state: { sorting, rowSelection: selection, pagination }, onSortingChange: setSorting, onRowSelectionChange: setSelection, onPaginationChange: setPagination, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), getPaginationRowModel: getPaginationRowModel() });
  const page = pagination.pageIndex + 1; const totalPages = Math.max(1, table.getPageCount());
  const setPage = (n: number) => setPagination(value => ({ ...value, pageIndex: n - 1 }));
  const selected = COLLECTIONS.filter(item => selection[item.id]);
  const filter = (apply: () => void) => { apply(); setPage(1); };

  return <div className="mx-auto grid w-full max-w-[80rem] gap-(--qy-panel-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <h1 className="sr-only">集合</h1>

    <div className="flex min-h-(--qy-fill-height) min-w-0 items-center">
      {selected.length > 0
        ? <BulkActionBar className="w-full" scope="集合" targets={selected.map(item => ({ id: item.id, label: item.name, version: item.synced }))} onClear={() => setSelection({})}>
          <BulkActionBarActions>
            <BulkActionBarAction size="sm" onExecute={() => setSelection({})}>重新同步</BulkActionBarAction>
            <BulkActionBarAction size="sm" onExecute={() => setSelection({})}>导出</BulkActionBarAction>
            <BulkActionBarClear size="sm" />
          </BulkActionBarActions>
        </BulkActionBar>
        : <Inline gap="actions" className="w-full flex-nowrap">
          <div className="w-[16rem] min-w-0"><Input type="search" value={query} onChange={event => filter(() => setQuery(event.target.value))} onClear={() => filter(() => setQuery(""))} placeholder="搜索集合" aria-label="搜索集合" /></div>
          <div className="min-w-0">
            <Select<(typeof SOURCES)[number]> items={SOURCES.map(item => ({ value: item, label: item }))} value={source} onValueChange={value => value && filter(() => setSource(value))}>
              <SelectTrigger aria-label="来源"><SelectValue /></SelectTrigger>
              <SelectPopup>{SOURCES.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectPopup>
            </Select>
          </div>
          <SegmentedControl value={scope} onValueChange={value => filter(() => setScope(String(value)))} aria-label="状态">
            <SegmentedControlItem value="all">全部</SegmentedControlItem>
            <SegmentedControlItem value="attention">需要处理</SegmentedControlItem>
          </SegmentedControl>
          <Button className="ms-auto">新建集合</Button>
        </Inline>}
    </div>

    <DataTable table={table} caption="集合" className="[&_caption]:sr-only" emptyContent={<span className="text-muted-foreground">没有匹配的集合 <Button variant="quiet" size="sm" onClick={() => filter(() => { setQuery(""); setScope("all"); setSource("全部来源"); })}>清除条件</Button></span>} />

    {totalPages > 1 && <Pagination page={page} totalPages={totalPages} aria-label="集合分页" className="justify-self-end">
      <PaginationList>
        <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>
        {Array.from({ length: totalPages }, (_, index) => index + 1).map(n => <PaginationItem key={n}><PaginationLink page={n} href={`#page-${n}`} onClick={event => { event.preventDefault(); setPage(n); }}>{n}</PaginationLink></PaginationItem>)}
        <PaginationItem><PaginationNext disabled={page === totalPages} onClick={() => setPage(page + 1)} /></PaginationItem>
      </PaginationList>
    </Pagination>}

    <Drawer swipeDirection="right" open={peek !== null} onOpenChange={open => { if (!open) setPeek(null); }}>
      {peek && <DrawerPopup className="w-[min(26rem,100vw)] content-start p-(--qy-panel-padding)">
        <div className="grid gap-(--qy-field-gap)">
          <DrawerTitle>{peek.name}</DrawerTitle>
          <StatusDot status={syncDot[peek.state]} label={`${peek.state} · ${peek.synced}`} />
        </div>
        <DrawerContent className="grid gap-(--qy-panel-gap)">
          <Sparkline label={`${peek.name}近 8 周记录数`} values={peek.weekly} width={320} />
          <DescriptionList>
            <DescriptionListItem><DescriptionListTerm>记录数</DescriptionListTerm><DescriptionListDetail className="numeric">{number.format(peek.records)}</DescriptionListDetail></DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>来源</DescriptionListTerm><DescriptionListDetail>{peek.source}</DescriptionListDetail></DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>负责人</DescriptionListTerm><DescriptionListDetail>{peek.owner}</DescriptionListDetail></DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>占用</DescriptionListTerm><DescriptionListDetail className="numeric">{peek.size} GB</DescriptionListDetail></DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>保留</DescriptionListTerm><DescriptionListDetail className="numeric">{peek.retention} 天</DescriptionListDetail></DescriptionListItem>
          </DescriptionList>
          <Inline gap="actions">
            <RouterLink to={`${BASE}/collections/${peek.id}`} className={buttonVariants()}>打开集合</RouterLink>
            <Button variant="bordered">重新同步</Button>
            <DrawerClose className="ms-auto" />
          </Inline>
        </DrawerContent>
      </DrawerPopup>}
    </Drawer>
  </div>;
}
