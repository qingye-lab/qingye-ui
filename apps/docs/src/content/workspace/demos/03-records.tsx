import { useMemo, useState } from "react";
import type { DemoMeta } from "@/lib/types";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "@qingye_lab/ui/components/data-table";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { Toggle } from "@qingye_lab/ui/components/toggle";
import { Workspace, WorkspaceActions, WorkspaceContent, WorkspaceHeader, WorkspaceSummary, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";

export const meta = { title: "列表与详情", titleEn: "List and detail", flush: true } satisfies DemoMeta;

type RecordItem = { id: string; name: string; owner: string; count: number; updated: string };
const records: RecordItem[] = Array.from({ length: 36 }, (_, index) => ({
  id: `record-${index + 1}`,
  name: index === 0 ? "桑园采叶与跨区域运输交接记录（含东区、西区及临时库房的长名称核对）" : `${["蚕室温湿度", "桑园采叶", "上簇批次", "茧质抽检", "饲料入库", "消毒巡检"][index % 6]} · ${index + 1} 号`,
  owner: ["陈致远", "林晚", "周禾"][index % 3]!, count: 120 + index * 17, updated: `今天 ${String(8 + index % 3).padStart(2, "0")}:${String(index % 60).padStart(2, "0")}`,
}));
const columns: DataTablePatternColumn<RecordItem>[] = [
  { id: "name", header: "记录", accessor: row => row.name, rowHeader: true, sortable: true, cell: row => <span className="text-start whitespace-normal wrap-anywhere">{row.name}</span> },
  { id: "owner", header: "负责人", accessor: row => row.owner },
  { id: "count", header: "条目", accessor: row => row.count, numeric: true, sortable: true },
  { id: "updated", header: "更新时间", accessor: row => row.updated, cell: row => <span className="whitespace-nowrap text-muted-foreground">{row.updated}</span> },
];
const initialState: DataTablePatternState = { sorting: [], pagination: { page: 1, pageSize: 10 }, rowSelection: {}, activeRowId: records[0]!.id };

/**
 * 可复制的应用组合：Header 固定，WorkspaceContent 是唯一纵向滚动 owner；
 * 表格只拥有横向溢出。详情随页面滚动，不再建立一组嵌套的纵向滚动区。
 * 2:1 是此参考页面对列表比较与备注编辑容量的选择；表格 32 材最小宽度也是
 * 此页面四列比较与勾选列的阅读容量预设，窄屏由 TableContainer 横向滚动，不是库的默认列宽。
 */
export function RecordsWorkspace({ embedded = false }: { embedded?: boolean }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState(initialState);
  const [details, setDetails] = useState(true);
  const [compact, setCompact] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const filtered = useMemo(() => records.filter(row => row.name.includes(query.trim()) || row.owner.includes(query.trim())), [query]);
  const active = records.find(row => row.id === state.activeRowId);
  const selectedCount = Object.values(state.rowSelection).filter(Boolean).length;
  return <div className={embedded ? "h-[calc(30*var(--qy-cai))]" : "h-full"} data-density={compact ? "compact" : "default"}>
    <Workspace>
      <WorkspaceSurface>
        <WorkspaceHeader render={embedded ? <div /> : <header />} className="h-auto min-h-(--qy-row-default) flex-wrap gap-y-(--qy-field-gap) py-(--qy-field-gap)">
          <WorkspaceTitle level={embedded ? 3 : 1}>采集记录</WorkspaceTitle>
          <WorkspaceSummary className="max-sm:hidden">{filtered.length} 份记录，已选 {selectedCount} 份</WorkspaceSummary>
          <WorkspaceActions className="flex-wrap"><Toggle pressed={compact} onPressedChange={setCompact}>紧凑</Toggle><Toggle pressed={details} onPressedChange={setDetails}>详情</Toggle></WorkspaceActions>
        </WorkspaceHeader>
        <WorkspaceContent render={embedded ? <div /> : <main />} id={embedded ? undefined : "main"}>
          <Stack gap="panel" className="p-(--qy-page-gutter)">
            <Inline gap="panel"><SearchInput aria-label="搜索采集记录" placeholder="搜索记录或负责人" value={query} onValueChange={next => {
              setQuery(next); setState(previous => ({ ...previous, pagination: { ...previous.pagination, page: 1 } }));
            }} controlClassName="w-full sm:max-w-[calc(16*var(--qy-cai))]" /><span className="text-support text-muted-foreground">已选 {selectedCount} 份（含其他页）</span></Inline>
            <div className={details ? "grid min-w-0 items-start gap-(--qy-section-gap) xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "min-w-0"}>
              <DataTablePattern data={filtered} columns={columns} getRowId={row => row.id} state={state} onStateChange={setState}
                pagination={{ pageSizeOptions: [10, 20, 50], "aria-label": "采集记录分页" }}
                selection={{ label: "选择本页记录", rowLabel: row => `选择${row.name}` }} activeRow={{ columnId: "name" }}
                tableProps={{ "aria-label": "采集记录", className: "min-w-[calc(32*var(--qy-cai))]", containerProps: { framed: false } }}
                emptyContent={<span className="text-muted-foreground">没有匹配的记录</span>} />
              {details && active && <Stack render={<aside aria-label="记录详情" lang="zh-CN" />} gap="panel">
                <h2 className="m-0 text-heading wrap-anywhere">{active.name}</h2>
                {!filtered.some(row => row.id === active.id) && <Alert tone="info"><AlertDescription>这份记录不在当前筛选结果中，备注仍保留。</AlertDescription></Alert>}
                <DescriptionList><DescriptionListItem><DescriptionListTerm>编号</DescriptionListTerm><DescriptionListDetail>{active.id}</DescriptionListDetail></DescriptionListItem><DescriptionListItem><DescriptionListTerm>负责人</DescriptionListTerm><DescriptionListDetail>{active.owner}</DescriptionListDetail></DescriptionListItem><DescriptionListItem><DescriptionListTerm>条目</DescriptionListTerm><DescriptionListDetail className="numeric">{active.count}</DescriptionListDetail></DescriptionListItem></DescriptionList>
                <Field><FieldLabel>本地备注</FieldLabel><Textarea value={drafts[active.id] ?? ""} onValueChange={next => setDrafts(previous => ({ ...previous, [active.id]: next }))} placeholder="写下待核对事项" /></Field>
                <p className="m-0 text-support text-muted-foreground">备注仅保留在当前页面，离开页面后清除。</p>
              </Stack>}
            </div>
          </Stack>
        </WorkspaceContent>
      </WorkspaceSurface>
    </Workspace>
  </div>;
}

export default function Demo() { return <><RecordsWorkspace embedded /><p className="m-0 p-(--qy-panel-padding-sm) text-support"><a href="/examples/records" className="text-foreground underline underline-offset-4">打开完整工作台</a></p></>; }
