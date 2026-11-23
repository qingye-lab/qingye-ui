import * as React from "react";
import { IconPaperclip } from "@tabler/icons-react";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Badge } from "@qingye_lab/ui/components/badge";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye_lab/ui/components/bulk-action-bar";
import { Button } from "@qingye_lab/ui/components/button";
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "@qingye_lab/ui/components/data-table";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { FileTrigger } from "@qingye_lab/ui/components/file-trigger";
import { ImagePreview, type ImagePreviewImage } from "@qingye_lab/ui/components/image-preview";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { RelativeTime } from "@qingye_lab/ui/components/relative-time";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import { StatusDot, type StatusDotStatus } from "@qingye_lab/ui/components/status-dot";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { TagInput } from "@qingye_lab/ui/components/tag-input";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";
import { toastManager } from "@qingye_lab/ui/components/toast";
import { Toggle } from "@qingye_lab/ui/components/toggle";
import { Workspace, WorkspaceActions, WorkspaceContent, WorkspaceHeader, WorkspaceSummary, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";
import { useExampleEmbedded } from "./embedding";

type ReviewStatus = "待核查" | "已复核" | "需复测";
type Category = "蚕室温湿度" | "桑园采叶" | "上簇批次" | "茧质抽检" | "饲料入库" | "消毒巡检";

type RecordItem = {
  id: string;
  name: string;
  category: Category;
  owner: string;
  count: number;
  status: ReviewStatus;
  updatedAt: string;
  rating: number;
  tags: string[];
};

type LogEntry = {
  id: string;
  at: string;
  time: string;
  title: string;
  detail: string;
};

const CATEGORIES: readonly Category[] = ["蚕室温湿度", "桑园采叶", "上簇批次", "茧质抽检", "饲料入库", "消毒巡检"];
const CATEGORY_FILTER: readonly ("全部类别" | Category)[] = ["全部类别", ...CATEGORIES];
const STATUS_DOT: Record<ReviewStatus, StatusDotStatus> = { "已复核": "online", "待核查": "in-progress", "需复测": "error" };

const RECORD_NAMES: Record<Category, readonly string[]> = {
  "蚕室温湿度": ["东区一号蚕室晨间读数", "东区二号蚕室夜间读数", "西区稚蚕室恒温核对", "西区壮蚕室通风记录", "临时库房温湿度巡测", "催青室升温曲线"],
  "桑园采叶": ["东坡春叶采摘量", "西坡夏叶采摘量", "老园秋叶采摘量", "新垦桑园首批采叶", "雨后桑叶含水复称", "晚秋叶留养记录"],
  "上簇批次": ["春蚕一批上簇", "春蚕二批上簇", "夏蚕首批上簇", "秋蚕一批上簇", "晚秋蚕上簇", "补簇批次复核"],
  "茧质抽检": ["春茧上车茧抽检", "夏茧解舒率抽检", "秋茧茧层率抽检", "双宫茧剔除记录", "薄皮茧比例统计", "出库前随机抽检"],
  "饲料入库": ["鲜叶入库过磅", "桑叶粉入库验收", "人工饲料首批入库", "稚蚕饲料补库", "辅料入库验收", "退库饲料复称"],
  "消毒巡检": ["蚕室石灰消毒", "蚕具日晒消毒", "防僵粉撒布巡查", "入口脚踏池换液", "晚间熏烟消毒", "库房消毒复查"],
};

const REFERENCE_NOW = new Date("2026-10-07T14:30:00+08:00").getTime();

const INITIAL_RECORDS: RecordItem[] = Array.from({ length: 36 }, (_, index) => {
  const category = CATEGORIES[index % CATEGORIES.length]!;
  const status: ReviewStatus = index % 7 === 2 ? "需复测" : index % 3 === 0 ? "已复核" : "待核查";
  const offsetMinutes = 8 + index * 27;
  return {
    id: `record-${index + 1}`,
    name:
      index === 0
        ? "桑园采叶与跨区域运输交接记录（含东区、西区及临时库房的长名称核对）"
        : RECORD_NAMES[category][Math.floor(index / CATEGORIES.length)]!,
    category,
    owner: ["陈致远", "林晚", "周禾"][index % 3]!,
    count: 120 + index * 17,
    status,
    updatedAt: new Date(REFERENCE_NOW - offsetMinutes * 60_000).toISOString(),
    rating: status === "需复测" ? 2 : status === "已复核" ? 5 : 4,
    tags: index === 0 ? ["跨区交接", "东区"] : [category.slice(0, 2), index % 2 === 0 ? "常规抽检" : "班次交接"],
  };
});

/** 本地矢量样片：它是附件图片的内容，颜色属于图片本身、不随主题变化；用于真实演示 ImagePreview 的缩放与翻页，不依赖外网图片。 */
function specimenSvg(title: string, metric: string, sub: string, accent: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="600" viewBox="0 0 960 600">
    <rect width="960" height="600" fill="#18181b"/>
    <rect x="48" y="48" width="864" height="504" rx="12" fill="#222226" stroke="#34343b" stroke-width="2"/>
    <line x1="88" y1="132" x2="872" y2="132" stroke="#34343b" stroke-width="1.5"/>
    <text x="88" y="102" fill="#f4f4f5" font-family="system-ui,sans-serif" font-size="28" font-weight="600">${title}</text>
    <text x="872" y="102" fill="#a1a1aa" font-family="ui-monospace,monospace" font-size="20" text-anchor="end">${sub}</text>
    <path d="M88 430 L210 390 L330 408 L450 326 L570 350 L690 278 L812 246 L872 262" fill="none" stroke="${accent}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="450" cy="326" r="7" fill="${accent}"/>
    <circle cx="812" cy="246" r="7" fill="${accent}"/>
    <text x="88" y="220" fill="#f4f4f5" font-family="ui-monospace,monospace" font-size="56" font-weight="600">${metric}</text>
    <text x="88" y="496" fill="#a1a1aa" font-family="system-ui,sans-serif" font-size="20">青野现场采集仪 · 自动校准曲线与样片快照</text>
  </svg>`;
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const SPECIMENS: Record<string, readonly ImagePreviewImage[]> = {
  default: [
    { src: specimenSvg("东区温湿度采样曲线", "24.6 ℃ / 76%", "SENSOR-E04", "#38bdf8"), alt: "东区温湿度采样曲线：24.6 ℃ / 76%" },
    { src: specimenSvg("批次称重与含水率复核", "1,284 kg · 11.2%", "SCALE-W02", "#34d399"), alt: "批次称重与含水率复核：1,284 kg" },
  ],
};

const initialState: DataTablePatternState = {
  sorting: [],
  pagination: { page: 1, pageSize: 10 },
  rowSelection: {},
  activeRowId: INITIAL_RECORDS[0]!.id,
};

/**
 * 采集记录核查台：列表与详情并置。
 * 保持 WorkspaceHeader 固定、WorkspaceContent 为唯一纵向滚动容器、TableContainer 承接横向溢出；
 * 跨页选择可触发真实批量核查，详情区按摘要备注、现场附件与核查流转分组。
 */
export default function RecordsPage() {
  const insideMain = useExampleEmbedded();
  const [items, setItems] = React.useState<RecordItem[]>(() => INITIAL_RECORDS);
  const [query, setQuery] = React.useState("");
  const [category, setCategory] = React.useState<(typeof CATEGORY_FILTER)[number]>("全部类别");
  const [statusFilter, setStatusFilter] = React.useState<"all" | ReviewStatus>("all");
  const [state, setState] = React.useState<DataTablePatternState>(initialState);
  const [details, setDetails] = React.useState(true);
  const [compact, setCompact] = React.useState(false);
  const [drafts, setDrafts] = React.useState<Record<string, string>>({});
  const [attachments, setAttachments] = React.useState<Record<string, string[]>>({
    "record-1": ["交接签收单-东区.pdf", "温湿度校准日志.csv"],
  });
  const [logs, setLogs] = React.useState<Record<string, LogEntry[]>>({});

  const filtered = React.useMemo(() => {
    const q = query.trim();
    return items.filter(
      (row) =>
        (!q || row.name.includes(q) || row.owner.includes(q) || row.tags.some((tag) => tag.includes(q))) &&
        (category === "全部类别" || row.category === category) &&
        (statusFilter === "all" || row.status === statusFilter),
    );
  }, [items, query, category, statusFilter]);

  const active = items.find((row) => row.id === state.activeRowId);
  const selectedIds = React.useMemo(
    () => Object.entries(state.rowSelection).filter(([, checked]) => checked).map(([id]) => id),
    [state.rowSelection],
  );
  const selectedCount = selectedIds.length;

  const appendLog = React.useCallback((id: string, title: string, detail: string) => {
    const now = new Date();
    const time = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;
    setLogs((prev) => ({
      ...prev,
      [id]: [{ id: `log-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`, at: now.toISOString(), time, title, detail }, ...(prev[id] ?? [])],
    }));
  }, []);

  const updateRecord = React.useCallback((id: string, patch: Partial<RecordItem>) => {
    setItems((prev) => prev.map((row) => (row.id === id ? { ...row, ...patch } : row)));
  }, []);

  const bulkSetStatus = (nextStatus: ReviewStatus) => {
    setItems((prev) => prev.map((row) => (selectedIds.includes(row.id) ? { ...row, status: nextStatus } : row)));
    for (const id of selectedIds) appendLog(id, `批量设为「${nextStatus}」`, "通过采集记录批量核查操作更新");
    setState((prev) => ({ ...prev, rowSelection: {} }));
    toastManager.add({ title: `已将 ${selectedIds.length} 份记录标记为「${nextStatus}」`, type: "success" });
  };

  const columns = React.useMemo<DataTablePatternColumn<RecordItem>[]>(
    () => [
      {
        id: "name",
        header: "记录",
        accessor: (row) => row.name,
        rowHeader: true,
        sortable: true,
        cell: (row) => <span className="block min-w-[11rem] text-start whitespace-normal wrap-anywhere">{row.name}</span>,
      },
      {
        id: "category",
        header: "类别",
        accessor: (row) => row.category,
        cell: (row) => <span className="whitespace-nowrap text-muted-foreground">{row.category}</span>,
      },
      {
        id: "status",
        header: "核查",
        accessor: (row) => row.status,
        cell: (row) => <StatusDot className="whitespace-nowrap" status={STATUS_DOT[row.status]} label={row.status} />,
      },
      {
        id: "retest",
        header: "复测",
        accessor: (row) => (row.status === "需复测" ? 1 : 0),
        cell: (row) => (row.status === "需复测" ? <SeverityMark className="whitespace-nowrap" level={3} tone="danger" label="待复测" /> : null),
      },
      {
        id: "owner",
        header: "负责人",
        accessor: (row) => row.owner,
        cell: (row) => (
          <Inline gap="field" className="flex-nowrap whitespace-nowrap">
            <Avatar size="xs" label={row.owner} aria-hidden="true"><AvatarFallback>{row.owner.slice(0, 1)}</AvatarFallback></Avatar>
            <span>{row.owner}</span>
          </Inline>
        ),
      },
      { id: "count", header: "条目", accessor: (row) => row.count, numeric: true, sortable: true },
      {
        id: "updated",
        header: "更新时间",
        accessor: (row) => row.updatedAt,
        cell: (row) => <RelativeTime className="whitespace-nowrap text-muted-foreground" now={REFERENCE_NOW} value={row.updatedAt} />,
      },
    ],
    [],
  );

  const activeLogs: LogEntry[] = active
    ? [
        ...(logs[active.id] ?? []),
        { id: `${active.id}-init`, at: active.updatedAt, time: "采集完成", title: `${active.owner}提交了现场记录`, detail: `${active.category} · 共 ${active.count} 条读数` },
      ]
    : [];

  return (
    <div className="h-full" data-density={compact ? "compact" : "default"}>
      <Workspace>
        <WorkspaceSurface className="sm:m-0 sm:rounded-none sm:border-0 sm:shadow-none">
          <WorkspaceHeader render={<header />} className="h-auto min-h-(--qy-row-default) flex-wrap gap-y-(--qy-field-gap) py-(--qy-field-gap)">
            <WorkspaceTitle level={1}>采集记录</WorkspaceTitle>
            <WorkspaceSummary className="max-sm:hidden">{selectedCount > 0 ? `已选 ${selectedCount} 份，共 ${filtered.length} 份记录` : `${filtered.length} 份记录`}</WorkspaceSummary>
            <WorkspaceActions className="flex-wrap">
              <Toggle pressed={compact} onPressedChange={setCompact}>紧凑行距</Toggle>
              <Toggle pressed={details} onPressedChange={setDetails}>详情栏</Toggle>
            </WorkspaceActions>
          </WorkspaceHeader>

          <WorkspaceContent render={insideMain ? <div /> : <main />} id={insideMain ? undefined : "main"}>
            <Stack gap="panel" className="p-(--qy-page-gutter)">
              <Inline gap="actions" className="flex-wrap">
                <SearchInput
                  aria-label="搜索采集记录"
                  placeholder="搜索记录、负责人或标签"
                  value={query}
                  onValueChange={(next) => {
                    setQuery(next);
                    setState((previous) => ({ ...previous, rowSelection: {}, pagination: { ...previous.pagination, page: 1 } }));
                  }}
                  controlClassName="w-full sm:w-[calc(15*var(--qy-cai))]"
                />
                <Select<(typeof CATEGORY_FILTER)[number]>
                  items={CATEGORY_FILTER.map((item) => ({ value: item, label: item }))}
                  value={category}
                  onValueChange={(value) => {
                    if (!value) return;
                    setCategory(value);
                    setState((previous) => ({ ...previous, rowSelection: {}, pagination: { ...previous.pagination, page: 1 } }));
                  }}
                >
                  <SelectTrigger aria-label="记录类别"><SelectValue /></SelectTrigger>
                  <SelectPopup>{CATEGORY_FILTER.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectPopup>
                </Select>
                <SegmentedControl
                  aria-label="核查状态"
                  size="sm"
                  value={statusFilter}
                  onValueChange={(value) => {
                    setStatusFilter(value as "all" | ReviewStatus);
                    setState((previous) => ({ ...previous, rowSelection: {}, pagination: { ...previous.pagination, page: 1 } }));
                  }}
                >
                  <SegmentedControlItem value="all">全部</SegmentedControlItem>
                  <SegmentedControlItem value="待核查">待核查</SegmentedControlItem>
                  <SegmentedControlItem value="已复核">已复核</SegmentedControlItem>
                  <SegmentedControlItem value="需复测">需复测</SegmentedControlItem>
                </SegmentedControl>
                              </Inline>

              {selectedCount > 0 && (
                <BulkActionBar
                  scope="采集记录"
                  targets={selectedIds.map((id) => {
                    const found = items.find((item) => item.id === id);
                    return { id, label: found?.name ?? id, version: found?.updatedAt ?? "0" };
                  })}
                  onClear={() => setState((prev) => ({ ...prev, rowSelection: {} }))}
                >
                  <BulkActionBarActions>
                    <BulkActionBarAction size="sm" onExecute={() => bulkSetStatus("已复核")}>标记已复核</BulkActionBarAction>
                    <BulkActionBarAction size="sm" onExecute={() => bulkSetStatus("需复测")}>标记需复测</BulkActionBarAction>
                    <BulkActionBarClear size="sm" />
                  </BulkActionBarActions>
                </BulkActionBar>
              )}

              <div className={details ? "grid min-w-0 items-start gap-(--qy-section-gap) xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "min-w-0"}>
                <DataTablePattern
                  data={filtered}
                  columns={columns}
                  getRowId={(row) => row.id}
                  state={state}
                  onStateChange={setState}
                  pagination={{ pageSizeOptions: [10, 20, 50], "aria-label": "采集记录分页" }}
                  selectionAppearance="checkbox"
                  selection={{ label: "选择本页记录", rowLabel: (row) => `选择${row.name}` }}
                  activeRow={{ columnId: "name" }}
                  tableProps={{
                    "aria-label": "采集记录",
                    className: "min-w-[calc(38*var(--qy-cai))] [&_tbody_tr[data-active=true]>td]:font-medium",
                    containerProps: { framed: false },
                  }}
                  emptyContent={<span className="text-muted-foreground">没有匹配的记录</span>}
                />

                {details && active && (
                  <Stack render={<aside aria-label="记录详情" lang="zh-CN" />} gap="panel" className="min-w-0 border-t border-border pt-(--qy-panel-padding) xl:border-t-0 xl:border-s xl:pt-0 xl:ps-(--qy-section-gap)">
                    <Stack gap="field">
                      <h2 className="m-0 text-heading wrap-anywhere">{active.name}</h2>
                      <Inline gap="field" className="flex-wrap">
                        <Badge>{active.category}</Badge>
                        <SegmentedControl
                          aria-label="更新当前记录状态"
                          size="sm"
                          value={active.status}
                          onValueChange={(next) => {
                            const status = next as ReviewStatus;
                            updateRecord(active.id, { status });
                            appendLog(active.id, `状态变更为「${status}」`, `操作人：当前核查员`);
                            toastManager.add({ title: `已标记为「${status}」`, type: "success" });
                          }}
                        >
                          <SegmentedControlItem value="待核查">待核查</SegmentedControlItem>
                          <SegmentedControlItem value="已复核">已复核</SegmentedControlItem>
                          <SegmentedControlItem value="需复测">需复测</SegmentedControlItem>
                        </SegmentedControl>
                      </Inline>
                    </Stack>

                    {!filtered.some((row) => row.id === active.id) && (
                      <Alert tone="info">
                        <AlertDescription>这份记录不在当前筛选结果中，备注仍保留。</AlertDescription>
                      </Alert>
                    )}

                    <Tabs defaultValue="summary">
                      <TabsList>
                        <TabsTab value="summary">摘要与备注</TabsTab>
                        <TabsTab value="attachments">现场附件</TabsTab>
                        <TabsTab value="history">核查流转</TabsTab>
                      </TabsList>

                      <TabsPanel value="summary" className="grid gap-(--qy-panel-gap) pt-(--qy-field-group-gap)">
                        <DescriptionList>
                          <DescriptionListItem>
                            <DescriptionListTerm>编号</DescriptionListTerm>
                            <DescriptionListDetail>
                              <Inline gap="field">
                                <code className="font-mono text-support">{active.id}</code>
                                <CopyButton aria-label={`复制编号 ${active.id}`} shape="icon" size="sm" variant="quiet" value={active.id} />
                              </Inline>
                            </DescriptionListDetail>
                          </DescriptionListItem>
                          <DescriptionListItem><DescriptionListTerm>负责人</DescriptionListTerm><DescriptionListDetail>{active.owner}</DescriptionListDetail></DescriptionListItem>
                          <DescriptionListItem><DescriptionListTerm>条目</DescriptionListTerm><DescriptionListDetail className="numeric">{active.count}</DescriptionListDetail></DescriptionListItem>
                          <DescriptionListItem>
                            <DescriptionListTerm>采集时间</DescriptionListTerm>
                            <DescriptionListDetail><RelativeTime now={REFERENCE_NOW} value={active.updatedAt} /></DescriptionListDetail>
                          </DescriptionListItem>
                        </DescriptionList>

                        <Field name="tags">
                          <FieldLabel>核查标签</FieldLabel>
                          <TagInput value={active.tags} onValueChange={(tags) => updateRecord(active.id, { tags })} />
                        </Field>

                        <Field>
                          <FieldLabel>本地备注</FieldLabel>
                          <Textarea
                            value={drafts[active.id] ?? ""}
                            onValueChange={(next) => setDrafts((previous) => ({ ...previous, [active.id]: next }))}
                            placeholder="写下待核对事项"
                          />
                        </Field>
                        <Inline gap="actions" className="justify-end">
                          <Button
                            size="sm"
                            variant="bordered"
                            disabled={!(drafts[active.id] ?? "").trim()}
                            onClick={() => {
                              const text = (drafts[active.id] ?? "").trim();
                              if (!text) return;
                              appendLog(active.id, "记录核查备注", text);
                              toastManager.add({ title: "已记入本条流转", type: "success" });
                            }}
                          >
                            记入流转
                          </Button>
                        </Inline>
                      </TabsPanel>

                      <TabsPanel value="attachments" className="grid gap-(--qy-panel-gap) pt-(--qy-field-group-gap)">
                        <ImagePreview images={SPECIMENS.default!} />
                        <Stack gap="field">
                          <Inline gap="field" className="justify-between">
                            <span className="text-body-strong">关联文件（{(attachments[active.id] ?? []).length}）</span>
                            <FileTrigger
                              size="sm"
                              variant="bordered"
                              accept=".csv,.pdf,.txt,image/*"
                              onSelect={(accepted) => {
                                if (!accepted.length) return;
                                setAttachments((prev) => ({
                                  ...prev,
                                  [active.id]: [...(prev[active.id] ?? []), ...accepted.map((file) => file.name)],
                                }));
                                appendLog(active.id, `新增 ${accepted.length} 份现场附件`, accepted.map((file) => file.name).join("、"));
                                toastManager.add({ title: `已添加 ${accepted.map((file) => file.name).join("、")}`, type: "success" });
                              }}
                            >
                              <IconPaperclip aria-hidden="true" />添加附件
                            </FileTrigger>
                          </Inline>
                          {(attachments[active.id] ?? []).length > 0 ? (
                            <ul className="m-0 grid list-none gap-(--qy-fen) p-0">
                              {(attachments[active.id] ?? []).map((fileName, idx) => (
                                <li key={`${fileName}-${idx}`} className="flex items-center justify-between gap-(--qy-field-gap) border-b border-border py-(--qy-field-gap) text-support last:border-b-0">
                                  <span className="truncate">{fileName}</span>
                                  <Badge>本地</Badge>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p className="m-0 text-support text-muted-foreground">尚未附加额外文件，可点击上方按钮选择本地文件。</p>
                          )}
                        </Stack>
                      </TabsPanel>

                      <TabsPanel value="history" className="pt-(--qy-field-group-gap)">
                        <Timeline>
                          {activeLogs.map((entry) => (
                            <TimelineItem key={entry.id}>
                              <TimelineTime dateTime={entry.at}>{entry.time}</TimelineTime>
                              <TimelineTitle>{entry.title}</TimelineTitle>
                              <TimelineDescription>{entry.detail}</TimelineDescription>
                            </TimelineItem>
                          ))}
                        </Timeline>
                      </TabsPanel>
                    </Tabs>
                  </Stack>
                )}
              </div>
            </Stack>
          </WorkspaceContent>
        </WorkspaceSurface>
      </Workspace>
    </div>
  );
}
