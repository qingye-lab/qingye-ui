import * as React from "react";
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { BulkActionBar, BulkActionBarAction, BulkActionBarActions, BulkActionBarClear } from "@qingye/ui/components/bulk-action-bar";
import { Button } from "@qingye/ui/components/button";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye/ui/components/description-list";
import { Input } from "@qingye/ui/components/input";
import { Inline } from "@qingye/ui/components/layout";
import { Pagination, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious } from "@qingye/ui/components/pagination";
import { SegmentedControl, SegmentedControlItem } from "@qingye/ui/components/segmented-control";
import { StatusDot, type StatusDotStatus } from "@qingye/ui/components/status-dot";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { Heading } from "@qingye/ui/components/typography";

/* 集合工作台：列表与详情是主从关系。
 * - 过滤很廉价，所以即输即滤，不设草稿与「应用」；数量写在标题旁，不另写一句结果说明。
 * - 选中后，工具条就地换成批量动作：同一行、同一高度，列表不跳。
 * - 空结果坐在表格的纸里，只说没有什么、给一个出路。
 * - 当前查看的行用清染：一整行的面积大，同样的染读来比小条目重，面积越大染越淡。 */

type State = "已同步" | "同步中" | "未同步";
type Row = { id: string; name: string; owner: string; records: number; synced: string; state: State };

const rows: Row[] = [
  { id: "devices", name: "接入设备", owner: "陈致远", records: 1284, synced: "3 分钟前", state: "已同步" },
  { id: "roles", name: "权限与角色", owner: "李一鸣", records: 42, synced: "3 分钟前", state: "已同步" },
  { id: "sync", name: "同步与导出", owner: "陈致远", records: 0, synced: "2 天前", state: "未同步" },
  { id: "audit", name: "操作记录", owner: "王一帆", records: 90512, synced: "12 分钟前", state: "已同步" },
  { id: "webhooks", name: "回调地址", owner: "李一鸣", records: 6, synced: "12 分钟前", state: "已同步" },
  { id: "groups", name: "成员分组", owner: "王一帆", records: 17, synced: "1 小时前", state: "同步中" },
  { id: "tokens", name: "访问令牌", owner: "陈致远", records: 3, synced: "1 小时前", state: "已同步" },
  { id: "templates", name: "通知模板", owner: "赵子纯", records: 11, synced: "昨天", state: "已同步" },
];
const PAGE_SIZE = 5;
const dot: Record<State, StatusDotStatus> = { "已同步": "online", "同步中": "in-progress", "未同步": "warning" };

export default function WorkbenchPage() {
  const [query, setQuery] = React.useState("");
  const [scope, setScope] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const [selected, setSelected] = React.useState<string[]>([]);
  const [current, setCurrent] = React.useState<Row>(rows[0]!);

  const matched = rows.filter(row => (!query || row.name.includes(query)) && (scope === "all" || row.state !== "已同步"));
  const totalPages = Math.max(1, Math.ceil(matched.length / PAGE_SIZE));
  const visible = matched.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const allShown = visible.length > 0 && visible.every(row => selected.includes(row.id));
  const unsynced = rows.filter(row => row.state !== "已同步").length;
  const filter = (next: { query?: string; scope?: string }) => { if (next.query !== undefined) setQuery(next.query); if (next.scope !== undefined) setScope(next.scope); setPage(1); };

  return <main id="main" tabIndex={-1} className="mx-auto grid w-full max-w-[80rem] gap-(--qy-panel-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <Inline gap="panel" align="baseline">
      <Heading level={1} step="chapter">本地集合</Heading>
      <span className="text-support text-muted-foreground numeric">{rows.length} 个 · {unsynced} 个尚未同步</span>
    </Inline>

    <div className="grid items-start gap-(--qy-panel-gap) lg:grid-cols-[minmax(0,1fr)_20rem]">
      <div className="grid min-w-0 gap-(--qy-field-group-gap)">
        {/* 工具条与批量动作占同一行：选中时就地替换，列表不跳。 */}
        <div className="flex min-h-(--qy-fill-height) min-w-0 items-center">
          {selected.length > 0
            ? <BulkActionBar targets={rows.filter(row => selected.includes(row.id)).map(row => ({ id: row.id, label: row.name, version: row.synced }))} scope="本地集合" onClear={() => setSelected([])} className="w-full">
              <BulkActionBarActions>
                <BulkActionBarAction size="sm" onExecute={() => setSelected([])}>标记为待核实</BulkActionBarAction>
                <BulkActionBarAction size="sm" onExecute={() => setSelected([])}>重新同步</BulkActionBarAction>
                <BulkActionBarClear size="sm" />
              </BulkActionBarActions>
            </BulkActionBar>
            : <Inline gap="actions" className="w-full flex-nowrap">
              <div className="w-[20rem] min-w-0"><Input type="search" value={query} onChange={event => filter({ query: event.target.value })} onClear={() => filter({ query: "" })} placeholder="搜索集合" aria-label="搜索集合" /></div>
              <SegmentedControl value={scope} onValueChange={value => filter({ scope: String(value) })} aria-label="状态">
                <SegmentedControlItem value="all">全部</SegmentedControlItem>
                <SegmentedControlItem value="unsynced">未同步</SegmentedControlItem>
              </SegmentedControl>
            </Inline>}
        </div>

        <TableContainer>
          <Table aria-label="本地集合">
            <TableHeader>
              <TableRow>
                <TableHead className="w-px">
                  <Checkbox aria-label="选择本页全部" disabled={!visible.length} checked={allShown} indeterminate={visible.some(row => selected.includes(row.id)) && !allShown} onCheckedChange={checked => setSelected(checked ? [...new Set([...selected, ...visible.map(row => row.id)])] : selected.filter(id => !visible.some(row => row.id === id)))} />
                </TableHead>
                <TableHead>名称</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead className="text-end">记录数</TableHead>
                <TableHead>最近同步</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.length === 0
                ? <TableRow><TableCell colSpan={6} className="h-[calc(3*var(--qy-row-default))] text-center">
                  <span className="text-muted-foreground">没有匹配{query ? `「${query}」` : "条件"}的集合</span>
                  <Button variant="quiet" size="sm" className="ms-(--qy-field-gap)" onClick={() => filter({ query: "", scope: "all" })}>清除搜索</Button>
                </TableCell></TableRow>
                : visible.map(row => <TableRow key={row.id} data-current={current.id === row.id ? "" : undefined} className="data-current:bg-neutral-soft">
                  <TableCell className="w-px">
                    <Checkbox aria-label={`选择${row.name}`} checked={selected.includes(row.id)} onCheckedChange={checked => setSelected(value => checked ? [...value, row.id] : value.filter(id => id !== row.id))} />
                  </TableCell>
                  <TableHead scope="row">
                    <button type="button" aria-current={current.id === row.id ? "true" : undefined} className="rounded-item text-body text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring focus-visible:ring-inset" onClick={() => setCurrent(row)}>{row.name}</button>
                  </TableHead>
                  <TableCell>
                    <Inline gap="field"><Avatar size="xs" label={row.owner}><AvatarFallback>{row.owner.slice(0, 1)}</AvatarFallback></Avatar><span>{row.owner}</span></Inline>
                  </TableCell>
                  <TableCell className="text-end numeric">{row.records.toLocaleString("zh-CN")}</TableCell>
                  <TableCell className="text-muted-foreground">{row.synced}</TableCell>
                  <TableCell><StatusDot status={dot[row.state]} label={row.state} /></TableCell>
                </TableRow>)}
            </TableBody>
          </Table>
        </TableContainer>

        {totalPages > 1 && <Pagination page={page} totalPages={totalPages} aria-label="集合分页" className="justify-self-end">
          <PaginationList>
            <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => <PaginationItem key={number}>
              <PaginationLink page={number} href={`#page-${number}`} onClick={event => { event.preventDefault(); setPage(number); }}>{number}</PaginationLink>
            </PaginationItem>)}
            <PaginationItem><PaginationNext disabled={page === totalPages} onClick={() => setPage(page + 1)} /></PaginationItem>
          </PaginationList>
        </Pagination>}
      </div>

      {/* 详情：与表格同一种纸，顶边对齐工具条之下的表格；状态紧跟名称。 */}
      <aside aria-label={`${current.name}详情`} className="grid gap-(--qy-field-group-gap) rounded-panel border border-border bg-surface p-(--qy-panel-padding) lg:mt-[calc(var(--qy-fill-height)+var(--qy-field-group-gap))]">
        <div className="grid gap-(--qy-field-gap)">
          <Heading level={2} step="heading">{current.name}</Heading>
          <StatusDot status={dot[current.state]} label={`${current.state} · ${current.synced}`} />
        </div>
        <DescriptionList>
          <DescriptionListItem><DescriptionListTerm>标识</DescriptionListTerm><DescriptionListDetail className="font-mono">{current.id}</DescriptionListDetail></DescriptionListItem>
          <DescriptionListItem><DescriptionListTerm>负责人</DescriptionListTerm><DescriptionListDetail>{current.owner}</DescriptionListDetail></DescriptionListItem>
          <DescriptionListItem><DescriptionListTerm>记录数</DescriptionListTerm><DescriptionListDetail className="numeric">{current.records.toLocaleString("zh-CN")}</DescriptionListDetail></DescriptionListItem>
        </DescriptionList>
        <Inline gap="actions">
          <Button size="sm" variant="bordered">查看记录</Button>
          <Button size="sm" variant="bordered">重新同步</Button>
        </Inline>
      </aside>
    </div>
  </main>;
}
