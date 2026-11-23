import * as React from "react";
import { IconDownload, IconLayoutSidebarRightExpand, IconPlus, IconRefresh } from "@tabler/icons-react";
import { getCoreRowModel, getPaginationRowModel, getSortedRowModel, useReactTable, type ColumnDef, type PaginationState, type RowSelectionState, type SortingState } from "@tanstack/react-table";
import { Link as RouterLink } from "@/components/locale-link";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Badge } from "@qingye_lab/ui/components/badge";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";
import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { Checkbox } from "@qingye_lab/ui/components/checkbox";
import { ComboboxSelect } from "@qingye_lab/ui/components/combobox";
import { ContextMenu, ContextMenuItem, ContextMenuPopup, ContextMenuPortal, ContextMenuPositioner, ContextMenuSeparator, ContextMenuTrigger } from "@qingye_lab/ui/components/context-menu";
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { DataTable, DataTableSelectAll, DataTableSelectionCell, DataTableSortButton } from "@qingye_lab/ui/components/data-table";
import { DateRangePicker, type DateRangeValue } from "@qingye_lab/ui/components/date-range-picker";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@qingye_lab/ui/components/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerPopup, DrawerTitle } from "@qingye_lab/ui/components/drawer";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Field, FieldContent, FieldDescription, FieldError, FieldItem, FieldLabel, FieldTitle } from "@qingye_lab/ui/components/field";
import { Form } from "@qingye_lab/ui/components/form";
import { HoverCard, HoverCardPopup, HoverCardTrigger } from "@qingye_lab/ui/components/hover-card";
import { Input } from "@qingye_lab/ui/components/input";
import { ItemLink } from "@qingye_lab/ui/components/item";
import { Inline } from "@qingye_lab/ui/components/layout";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { PaginationPattern } from "@qingye_lab/ui/components/pagination";
import { Progress, ProgressIndicator, ProgressTrack } from "@qingye_lab/ui/components/progress";
import { Radio, RadioGroup } from "@qingye_lab/ui/components/radio-group";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Switch } from "@qingye_lab/ui/components/switch";
import { TagInput } from "@qingye_lab/ui/components/tag-input";
import { toastManager } from "@qingye_lab/ui/components/toast";
import { Tooltip, TooltipPopup, TooltipTrigger } from "@qingye_lab/ui/components/tooltip";
import { BASE, useWorkspaceNavigate } from "./shell";
import { number, type Collection, type Source } from "./data";
import { syncDot } from "./status";
import { useWorkspaceStore } from "./store";

/* 集合列表：过滤即输即滤；选中后工具条就地换成批量动作；支持新建集合、导出弹窗、行级右键菜单、负责人名片预览与侧边抽屉。 */

const PAGE_SIZE = 8;
const SOURCES: ("全部来源" | Source)[] = ["全部来源", "接口推送", "数据库连接", "定时导入", "手动上传"];
const CREATE_SOURCES: Source[] = ["接口推送", "数据库连接", "定时导入", "手动上传"];

export default function Collections() {
  const go = useWorkspaceNavigate();
  const { collections, members, syncProgress, tagsById, triggerSync, createCollection } = useWorkspaceStore();

  const [query, setQuery] = React.useState("");
  const [scope, setScope] = React.useState("all");
  const [source, setSource] = React.useState<(typeof SOURCES)[number]>("全部来源");
  const [sorting, setSorting] = React.useState<SortingState>([{ id: "records", desc: true }]);
  const [selection, setSelection] = React.useState<RowSelectionState>({});
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: PAGE_SIZE });
  const [peekId, setPeekId] = React.useState<string | null>(null);

  // 新建集合弹窗状态
  const [createOpen, setCreateOpen] = React.useState(false);
  const [newName, setNewName] = React.useState("");
  const [newNameError, setNewNameError] = React.useState<string | undefined>();
  const [newSource, setNewSource] = React.useState<Source>("接口推送");
  const [newOwner, setNewOwner] = React.useState<string | null>(members[0]?.name ?? "陈致远");
  const [newRetention, setNewRetention] = React.useState<number | null>(180);
  const [newTags, setNewTags] = React.useState<string[]>(["核心"]);
  const [newAutoSync, setNewAutoSync] = React.useState(true);

  // 导出弹窗状态
  const [exportTargets, setExportTargets] = React.useState<Collection[] | null>(null);
  const [exportFormat, setExportFormat] = React.useState("csv");
  const [exportRange, setExportRange] = React.useState<DateRangeValue | undefined>();
  const [exportIncludeFailed, setExportIncludeFailed] = React.useState(true);
  const exportFormatLabel = React.useId();

  const peek = React.useMemo(() => collections.find((item) => item.id === peekId) ?? null, [collections, peekId]);

  const matched = React.useMemo(
    () =>
      collections.filter(
        (item) =>
          (!query.trim() || item.name.includes(query.trim()) || (tagsById[item.id] ?? []).some((tag) => tag.includes(query.trim()))) &&
          (scope === "all" || item.state !== "已同步") &&
          (source === "全部来源" || item.source === source),
      ),
    [collections, query, scope, source, tagsById],
  );

  const memberNames = React.useMemo(() => members.map((item) => item.name), [members]);

  const columns = React.useMemo<ColumnDef<Collection>[]>(
    () => [
      {
        id: "selection",
        enableSorting: false,
        meta: { marker: true },
        header: ({ table }) => <DataTableSelectAll table={table} scope="filtered" aria-label="选择集合" />,
        cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择${row.original.name}`} />,
      },
      {
        accessorKey: "name",
        meta: { rowHeader: true },
        header: ({ column }) => <DataTableSortButton column={column}>名称</DataTableSortButton>,
        cell: ({ row }) => {
          const item = row.original;
          const tags = tagsById[item.id] ?? [];
          return (
            <ContextMenu>
              <ContextMenuTrigger className="flex min-w-0 items-center gap-(--qy-field-gap)">
                <ItemLink render={<RouterLink to={`${BASE}/collections/${item.id}`} />} className="truncate">
                  {item.name}
                </ItemLink>
                {tags[0] && <Badge className="shrink-0 max-md:hidden">{tags[0]}</Badge>}
              </ContextMenuTrigger>
              <ContextMenuPortal>
                <ContextMenuPositioner>
                  <ContextMenuPopup>
                    <ContextMenuItem onClick={() => go(`/collections/${item.id}`)}>打开详情</ContextMenuItem>
                    <ContextMenuItem onClick={() => setPeekId(item.id)}>侧边预览</ContextMenuItem>
                    <ContextMenuItem onClick={() => triggerSync([item.id])}>立即同步</ContextMenuItem>
                    <ContextMenuSeparator />
                    <ContextMenuItem onClick={() => setExportTargets([item])}>导出集合…</ContextMenuItem>
                  </ContextMenuPopup>
                </ContextMenuPositioner>
              </ContextMenuPortal>
            </ContextMenu>
          );
        },
      },
      {
        accessorKey: "source",
        header: "来源",
        enableSorting: false,
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.source}</span>,
      },
      {
        accessorKey: "owner",
        header: "负责人",
        enableSorting: false,
        cell: ({ row }) => {
          const ownerName = row.original.owner;
          const member = members.find((m) => m.name === ownerName);
          const ownedCount = collections.filter((c) => c.owner === ownerName).length;
          return (
            <HoverCard>
              <HoverCardTrigger
                render={
                  <RouterLink
                    to={`${BASE}/settings/members`}
                    className="inline-flex items-center gap-(--qy-field-gap) rounded-(--qy-radius-xs) text-foreground no-underline hover:underline"
                  />
                }
              >
                <Avatar size="xs" label={ownerName} aria-hidden="true">
                  <AvatarFallback>{ownerName.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <span>{ownerName}</span>
              </HoverCardTrigger>
              <HoverCardPopup className="w-[calc(15*var(--qy-cai))]">
                <div className="grid gap-(--qy-field-gap)">
                  <Inline gap="field" className="items-center justify-between">
                    <Inline gap="field">
                      <Avatar size="sm" label={ownerName} aria-hidden="true">
                        <AvatarFallback>{ownerName.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <span className="text-body-strong">{ownerName}</span>
                    </Inline>
                    {member && <Badge>{member.role}</Badge>}
                  </Inline>
                  {member && <p className="m-0 text-support text-muted-foreground">{member.email}</p>}
                  <p className="m-0 text-support text-muted-foreground">当前负责 {ownedCount} 个数据集合</p>
                </div>
              </HoverCardPopup>
            </HoverCard>
          );
        },
      },
      {
        accessorKey: "records",
        meta: { numeric: true },
        sortDescFirst: true,
        header: ({ column }) => <DataTableSortButton column={column}>记录数</DataTableSortButton>,
        cell: ({ row }) => number.format(row.original.records),
      },
      {
        id: "trend",
        enableSorting: false,
        header: "近 8 周",
        cell: ({ row }) => <Sparkline label={`${row.original.name}近 8 周记录数`} values={row.original.weekly} width={80} />,
      },
      {
        accessorKey: "state",
        header: "状态",
        enableSorting: false,
        cell: ({ row }) => <StatusDot status={syncDot[row.original.state]} label={row.original.state} />,
      },
      {
        accessorKey: "synced",
        header: "最近同步",
        enableSorting: false,
        cell: ({ row }) => <span className="text-muted-foreground">{row.original.synced}</span>,
      },
      {
        id: "peek",
        enableSorting: false,
        meta: { marker: true },
        header: () => <span className="sr-only">预览</span>,
        cell: ({ row }) => (
          <Tooltip>
            <TooltipTrigger
              render={
                <Button
                  variant="quiet"
                  size="sm"
                  shape="icon"
                  aria-label={`预览${row.original.name}`}
                  onClick={() => setPeekId(row.original.id)}
                  className="text-muted-foreground"
                />
              }
            >
              <IconLayoutSidebarRightExpand aria-hidden="true" />
            </TooltipTrigger>
            <TooltipPopup>侧边预览</TooltipPopup>
          </Tooltip>
        ),
      },
    ],
    [collections, go, members, tagsById, triggerSync],
  );

  const table = useReactTable({
    data: matched,
    columns,
    state: { sorting, rowSelection: selection, pagination },
    onSortingChange: setSorting,
    onRowSelectionChange: setSelection,
    onPaginationChange: setPagination,
    getRowId: (row) => row.id,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const setPage = (n: number) => setPagination((value) => ({ ...value, pageIndex: n - 1 }));
  const selected = collections.filter((item) => selection[item.id]);
  const filter = (apply: () => void) => {
    apply();
    setPage(1);
  };

  const handleCreateSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!newName.trim()) {
      setNewNameError("请填写集合名称");
      return;
    }
    createCollection({
      name: newName,
      source: newSource,
      owner: newOwner || members[0]?.name || "陈致远",
      retention: newRetention ?? 180,
      tags: newTags,
      autoSync: newAutoSync,
    });
    setCreateOpen(false);
    setNewName("");
    setNewNameError(undefined);
    setNewTags(["核心"]);
    setQuery("");
    setScope("all");
    setSource("全部来源");
    setSorting([]);
    setPage(1);
  };

  const handleExportConfirm = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!exportTargets) return;
    const total = exportTargets.reduce((sum, item) => sum + item.records, 0);
    toastManager.add({
      title: `已生成 ${exportTargets.length} 个集合的 ${exportFormat.toUpperCase()} 导出包`,
      description: `共 ${number.format(total)} 条记录${exportIncludeFailed ? "（含失败条目）" : ""}`,
      type: "success",
    });
    setExportTargets(null);
    setSelection({});
  };

  const peekSyncing = peek ? syncProgress[peek.id] !== undefined : false;

  return <div className="mx-auto grid w-full max-w-[80rem] gap-(--qy-panel-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <h1 className="sr-only">集合</h1>

    <div className="flex min-h-(--qy-fill-height) min-w-0 items-center">
      {selected.length > 0 ? (
        <BulkActionBar className="w-full" scope="集合" targets={selected.map((item) => ({ id: item.id, label: item.name, version: item.synced }))} onClear={() => setSelection({})}>
          <BulkActionBarActions>
            <BulkActionBarAction
              size="sm"
              onExecute={() => {
                triggerSync(selected.map((item) => item.id));
                setSelection({});
              }}
            >
              重新同步
            </BulkActionBarAction>
            <BulkActionBarAction size="sm" onExecute={() => setExportTargets(selected)}>
              导出
            </BulkActionBarAction>
            <BulkActionBarClear size="sm" />
          </BulkActionBarActions>
        </BulkActionBar>
      ) : (
        <Inline gap="actions" className="w-full flex-wrap">
          <div className="w-[16rem] min-w-0 max-sm:w-full">
            <SearchInput
              value={query}
              onChange={(event) => filter(() => setQuery(event.target.value))}
              placeholder="搜索集合或标签"
              aria-label="搜索集合"
            />
          </div>
          <div className="min-w-0">
            <Select<(typeof SOURCES)[number]>
              items={SOURCES.map((item) => ({ value: item, label: item }))}
              value={source}
              onValueChange={(value) => value && filter(() => setSource(value))}
            >
              <SelectTrigger aria-label="来源"><SelectValue /></SelectTrigger>
              <SelectPopup>{SOURCES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectPopup>
            </Select>
          </div>
          <SegmentedControl value={scope} onValueChange={(value) => filter(() => setScope(String(value)))} aria-label="状态">
            <SegmentedControlItem value="all">全部</SegmentedControlItem>
            <SegmentedControlItem value="attention">需要处理</SegmentedControlItem>
          </SegmentedControl>
          <Button className="ms-auto" onClick={() => setCreateOpen(true)}>
            <IconPlus aria-hidden="true" />新建集合
          </Button>
        </Inline>
      )}
    </div>

    <DataTable
      table={table}
      aria-label="集合"
      emptyContent={
        <Empty state="empty">
          <EmptyTitle level={2}>没有匹配的集合</EmptyTitle>
          <EmptyActions>
            <Button variant="bordered" size="sm" onClick={() => filter(() => { setQuery(""); setScope("all"); setSource("全部来源"); })}>
              清除条件
            </Button>
          </EmptyActions>
        </Empty>
      }
    />

    {matched.length > 0 && (
      <PaginationPattern
        aria-label="集合分页"
        totalCount={matched.length}
        value={{ page: pagination.pageIndex + 1, pageSize: pagination.pageSize }}
        onValueChange={(next) => setPagination({ pageIndex: next.page - 1, pageSize: next.pageSize })}
      />
    )}

    <Drawer swipeDirection="right" open={peek !== null} onOpenChange={(open) => { if (!open) setPeekId(null); }}>
      {peek && (
        <DrawerPopup className="w-[min(26rem,100vw)] content-start">
          <div className="grid gap-(--qy-field-gap)">
            <DrawerTitle>{peek.name}</DrawerTitle>
            <Inline gap="field" className="flex-wrap">
              <StatusDot status={syncDot[peek.state]} label={`${peek.state} · ${peek.synced}`} />
              {(tagsById[peek.id] ?? []).map((tag) => <Badge key={tag}>{tag}</Badge>)}
            </Inline>
          </div>
          <DrawerContent className="grid gap-(--qy-panel-gap)">
            {peekSyncing && (
              <Progress aria-label={`${peek.name}同步进度`} value={syncProgress[peek.id] ?? 30}>
                <ProgressTrack><ProgressIndicator /></ProgressTrack>
              </Progress>
            )}
            <Sparkline label={`${peek.name}近 8 周记录数`} values={peek.weekly} width={320} />
            <DescriptionList>
              <DescriptionListItem>
                <DescriptionListTerm>标识</DescriptionListTerm>
                <DescriptionListDetail>
                  <Inline gap="field">
                    <code className="font-mono text-support">{peek.id}</code>
                    <CopyButton aria-label={`复制标识 ${peek.id}`} size="sm" shape="icon" variant="quiet" value={peek.id} />
                  </Inline>
                </DescriptionListDetail>
              </DescriptionListItem>
              <DescriptionListItem><DescriptionListTerm>记录数</DescriptionListTerm><DescriptionListDetail className="numeric">{number.format(peek.records)}</DescriptionListDetail></DescriptionListItem>
              <DescriptionListItem><DescriptionListTerm>来源</DescriptionListTerm><DescriptionListDetail>{peek.source}</DescriptionListDetail></DescriptionListItem>
              <DescriptionListItem><DescriptionListTerm>负责人</DescriptionListTerm><DescriptionListDetail>{peek.owner}</DescriptionListDetail></DescriptionListItem>
              <DescriptionListItem><DescriptionListTerm>占用</DescriptionListTerm><DescriptionListDetail className="numeric">{peek.size} GB</DescriptionListDetail></DescriptionListItem>
              <DescriptionListItem><DescriptionListTerm>保留</DescriptionListTerm><DescriptionListDetail className="numeric">{peek.retention} 天</DescriptionListDetail></DescriptionListItem>
            </DescriptionList>
            <Inline gap="actions">
              <RouterLink to={`${BASE}/collections/${peek.id}`} className={buttonVariants()}>打开集合</RouterLink>
              <Button variant="bordered" disabled={peekSyncing} onClick={() => triggerSync([peek.id])}>
                <IconRefresh aria-hidden="true" />{peekSyncing ? "同步中" : "重新同步"}
              </Button>
              <DrawerClose className="ms-auto" />
            </Inline>
          </DrawerContent>
        </DrawerPopup>
      )}
    </Drawer>

    <Dialog open={createOpen} onOpenChange={(open) => { setCreateOpen(open); if (!open) setNewNameError(undefined); }}>
      <DialogPopup>
        <Form noValidate onSubmit={handleCreateSubmit}>
          <DialogHeader>
            <DialogTitle>新建集合</DialogTitle>
            <DialogDescription>创建后会立即出现在工作区集合表中，可随时触发首次同步。</DialogDescription>
          </DialogHeader>
          <DialogPanel className="grid gap-(--qy-field-group-gap)">
            <Field invalid={!!newNameError} name="name">
              <FieldLabel>集合名称</FieldLabel>
              <Input
                placeholder="例如：质检回执"
                value={newName}
                onChange={(event) => {
                  setNewName(event.target.value);
                  if (newNameError) setNewNameError(undefined);
                }}
              />
              {newNameError && <FieldError>{newNameError}</FieldError>}
            </Field>
            <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
              <Field name="source">
                <FieldLabel>数据来源</FieldLabel>
                <Select<Source> items={CREATE_SOURCES.map((item) => ({ value: item, label: item }))} value={newSource} onValueChange={(value) => value && setNewSource(value)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectPopup>{CREATE_SOURCES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectPopup>
                </Select>
              </Field>
              <Field name="owner">
                <FieldLabel>负责人</FieldLabel>
                <ComboboxSelect items={memberNames} itemToStringLabel={(item) => item} value={newOwner} onValueChange={setNewOwner} emptyContent="没有匹配的成员" />
              </Field>
            </div>
            <Field name="retention">
              <FieldLabel>保留天数</FieldLabel>
              <NumberField min={7} max={3650} value={newRetention} onValueChange={setNewRetention}>
                <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>
              </NumberField>
            </Field>
            <Field name="tags">
              <FieldLabel>分类标签</FieldLabel>
              <TagInput value={newTags} onValueChange={setNewTags} />
              <FieldDescription>按 Enter 添加标签，方便后续在集合列表中检索。</FieldDescription>
            </Field>
            <Field name="autoSync" orientation="horizontal">
              <Switch checked={newAutoSync} onCheckedChange={setNewAutoSync} />
              <FieldContent>
                <FieldLabel>创建后启用按计划自动同步</FieldLabel>
                <FieldDescription>每 15 分钟增量拉取一次</FieldDescription>
              </FieldContent>
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose>取消</DialogClose>
            <Button type="submit">创建集合</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>

    <Dialog open={exportTargets !== null} onOpenChange={(open) => { if (!open) setExportTargets(null); }}>
      <DialogPopup>
        <Form noValidate onSubmit={handleExportConfirm}>
          <DialogHeader>
            <DialogTitle>导出集合</DialogTitle>
            <DialogDescription>
              {exportTargets ? `已选 ${exportTargets.length} 个集合：${exportTargets.map((item) => item.name).join("、")}` : ""}
            </DialogDescription>
          </DialogHeader>
          <DialogPanel className="grid gap-(--qy-field-group-gap)">
            <Field name="format">
              <FieldTitle id={exportFormatLabel}>文件格式</FieldTitle>
              <RadioGroup aria-labelledby={exportFormatLabel} value={exportFormat} onValueChange={(value) => setExportFormat(String(value))} className="grid grid-cols-2 gap-(--qy-field-gap)">
                <FieldItem><Radio value="csv" /><FieldContent><FieldLabel>CSV 表格</FieldLabel><FieldDescription>适合电子表格审阅</FieldDescription></FieldContent></FieldItem>
                <FieldItem><Radio value="json" /><FieldContent><FieldLabel>NDJSON</FieldLabel><FieldDescription>保留完整嵌套字段</FieldDescription></FieldContent></FieldItem>
              </RadioGroup>
            </Field>
            <Field name="range">
              <FieldLabel>时间范围（可选）</FieldLabel>
              <DateRangePicker value={exportRange} onValueChange={setExportRange} />
              <FieldDescription>留空时导出当前保留周期内的全部记录。</FieldDescription>
            </Field>
            <Field name="includeFailed" orientation="horizontal">
              <Checkbox checked={exportIncludeFailed} onCheckedChange={(checked) => setExportIncludeFailed(checked === true)} />
              <FieldContent><FieldLabel>附带失败与待核实条目</FieldLabel></FieldContent>
            </Field>
          </DialogPanel>
          <DialogFooter>
            <DialogClose>取消</DialogClose>
            <Button type="submit"><IconDownload aria-hidden="true" />生成导出包</Button>
          </DialogFooter>
        </Form>
      </DialogPopup>
    </Dialog>
  </div>;
}
