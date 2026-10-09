import * as React from "react";
import { getCoreRowModel, getSortedRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Badge } from "@qingye_lab/ui/components/badge";
import { Button } from "@qingye_lab/ui/components/button";
import { Chart, type ChartSeries } from "@qingye_lab/ui/components/chart";
import { Heatmap } from "@qingye_lab/ui/components/heatmap";
import { ScatterChart } from "@qingye_lab/ui/components/scatter-chart";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { DataTable, DataTableSelectAll, DataTableSelectionCell, DataTableSortButton } from "@qingye_lab/ui/components/data-table";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Empty, EmptyActions, EmptyDescription, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Item, ItemActions, ItemContent, ItemDescription, ItemLink, ItemTitle } from "@qingye_lab/ui/components/item";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue } from "@qingye_lab/ui/components/meter";
import { Pagination, PaginationEllipsis, PaginationItem, PaginationLink, PaginationList, PaginationNext, PaginationPrevious } from "@qingye_lab/ui/components/pagination";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye_lab/ui/components/progress";
import { ScrollArea } from "@qingye_lab/ui/components/scroll-area";
import { Separator } from "@qingye_lab/ui/components/separator";
import { Proportion } from "@qingye_lab/ui/components/proportion";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Step, StepDescription, Steps, StepTitle } from "@qingye_lab/ui/components/steps";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableFooter, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";
import { Tree, type TreeNode } from "@qingye_lab/ui/components/tree";
import { VirtualList } from "@qingye_lab/ui/components/virtual-list";
import { COLLECTIONS, type Collection, GalleryPage, Row, Section } from "./gallery";

/* 数据展示：表格、可排序可选择的数据表、分页、列表、名称与值、度量、时间线、
 * 步骤、层级、空态、度量条与图表。全部是同一个工作区的数据，不编新流程。 */

const PAGE_SIZE = 5;

function StateBadge({ state }: { state: Collection["state"] }) {
  return state === "未同步" ? <Badge tone="warning">未同步</Badge> : <Badge>{state}</Badge>;
}

/* 可排序、可选择的数据表：排序与选择由 TanStack 持有，组件只表达。 */
function CollectionsDataTable() {
  const columns = React.useMemo<ColumnDef<Collection>[]>(() => [
    { id: "selection", enableSorting: false, meta: { marker: true }, header: ({ table }) => <DataTableSelectAll table={table} scope="filtered" aria-label="选择全部集合" />, cell: ({ row }) => <DataTableSelectionCell row={row} aria-label={`选择${row.original.name}`} /> },
    { accessorKey: "name", meta: { rowHeader: true }, header: ({ column }) => <DataTableSortButton column={column}>名称</DataTableSortButton> },
    { accessorKey: "owner", header: "负责人", enableSorting: false, cell: ({ row }) => <Inline gap="field"><Avatar size="xs" label={row.original.owner}><AvatarFallback>{row.original.owner.slice(0, 1)}</AvatarFallback></Avatar><span>{row.original.owner}</span></Inline> },
    { accessorKey: "records", meta: { numeric: true }, header: ({ column }) => <DataTableSortButton column={column}>记录数</DataTableSortButton>, sortDescFirst: true, cell: ({ row }) => <span className="numeric">{row.original.records.toLocaleString("zh-CN")}</span> },
    { accessorKey: "state", header: "状态", enableSorting: false, cell: ({ row }) => <StateBadge state={row.original.state} /> },
  ], []);
  const table = useReactTable({ data: COLLECTIONS.slice(0, 6) as Collection[], columns, getRowId: row => row.id, getCoreRowModel: getCoreRowModel(), getSortedRowModel: getSortedRowModel(), autoResetAll: false });
  const selected = table.getSelectedRowModel().rows.map(row => row.original.name);
  return <Stack gap="field">
    <DataTable table={table} caption="本地集合" emptyContent="没有集合" />
    <p className="m-0 text-support text-muted-foreground">已选：{selected.join("、") || "无"}</p>
  </Stack>;
}

const tree: TreeNode[] = [
  { id: "workspace", label: "青野科技", children: [
    { id: "collections", label: "本地集合", children: [
      { id: "devices", label: "接入设备" },
      { id: "roles", label: "权限与角色" },
      { id: "sync", label: "同步与导出", disabled: true },
    ] },
    { id: "members", label: "成员", children: [{ id: "admins", label: "管理员" }, { id: "editors", label: "编辑者" }] },
  ] },
  { id: "archive", label: "已归档" },
];

const series: readonly ChartSeries[] = [
  { key: "success", label: "成功" },
  { key: "failed", label: "失败" },
];
const weekdays = ["周一", "周二", "周三", "周四", "周五"];
const success = [182, 204, 196, 221, 240];
const failed = [6, 3, 11, 4, { state: "unknown" as const, label: "尚未统计" }];

/** 列表的一行 = --qy-row-default（48px：一个填值控件 + 上下各一个组内间隔）。虚拟列表需要像素数。 */
const ROW = 48;
const logRows = Array.from({ length: 200 }, (_, index) => ({ id: index, text: `#${(10200 - index).toString()} · 接入设备 · ${index % 7 === 0 ? "同步失败" : "同步完成"}` }));

export default function DataPage() {
  const [page, setPage] = React.useState(1);
  const [selectedNode, setSelectedNode] = React.useState<string | null>("devices");
  const totalPages = Math.ceil(COLLECTIONS.length / PAGE_SIZE);
  const visible = COLLECTIONS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return <GalleryPage>
    <Section title="表格">
      <Row label="比较表" block lead="framed-caption">
        <TableContainer>
          <Table>
            <TableCaption>本地集合</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>名称</TableHead>
                <TableHead>负责人</TableHead>
                <TableHead className="text-end">记录数</TableHead>
                <TableHead>最近同步</TableHead>
                <TableHead>状态</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {visible.map(row => <TableRow key={row.id}>
                <TableHead scope="row">{row.name}</TableHead>
                <TableCell>{row.owner}</TableCell>
                <TableCell className="numeric text-end">{row.records.toLocaleString("zh-CN")}</TableCell>
                <TableCell className="text-muted-foreground">{row.synced}</TableCell>
                <TableCell><StateBadge state={row.state} /></TableCell>
              </TableRow>)}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableHead scope="row">本页合计</TableHead>
                <TableCell />
                <TableCell className="numeric text-end">{visible.reduce((sum, row) => sum + row.records, 0).toLocaleString("zh-CN")}</TableCell>
                <TableCell />
                <TableCell />
              </TableRow>
            </TableFooter>
          </Table>
        </TableContainer>
      </Row>
      <Row label="分页">
        <Pagination page={page} totalPages={totalPages} aria-label="集合分页">
          <PaginationList>
            <PaginationItem><PaginationPrevious disabled={page === 1} onClick={() => setPage(page - 1)} /></PaginationItem>
            {Array.from({ length: totalPages }, (_, index) => index + 1).map(number => <PaginationItem key={number}>
              <PaginationLink page={number} href={`#page-${number}`} onClick={event => { event.preventDefault(); setPage(number); }}>{number}</PaginationLink>
            </PaginationItem>)}
            <PaginationItem><PaginationNext disabled={page === totalPages} onClick={() => setPage(page + 1)} /></PaginationItem>
          </PaginationList>
        </Pagination>
      </Row>
      <Row label="长分页" note="省略页">
        <Pagination page={6} totalPages={24} aria-label="长分页示例">
          <PaginationList>
            <PaginationItem><PaginationPrevious /></PaginationItem>
            <PaginationItem><PaginationLink page={1} href="#p1">1</PaginationLink></PaginationItem>
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            {[5, 6, 7].map(number => <PaginationItem key={number}><PaginationLink page={number} href={`#p${number}`}>{number}</PaginationLink></PaginationItem>)}
            <PaginationItem><PaginationEllipsis /></PaginationItem>
            <PaginationItem><PaginationLink page={24} href="#p24">24</PaginationLink></PaginationItem>
            <PaginationItem><PaginationNext /></PaginationItem>
          </PaginationList>
        </Pagination>
      </Row>
      <Row label="未知总数">
        <Pagination page={3} totalPages={null} aria-label="未知总数的分页">
          <PaginationList>
            <PaginationItem><PaginationPrevious /></PaginationItem>
            <PaginationItem><span className="text-support text-muted-foreground">第 3 页</span></PaginationItem>
            <PaginationItem><PaginationNext /></PaginationItem>
          </PaginationList>
        </Pagination>
      </Row>
    </Section>

    <Separator />

    <Section title="数据表">
      <Row label="排序与选择" block lead="framed-caption"><CollectionsDataTable /></Row>
    </Section>

    <Separator />

    <Section title="列表">
      <Row label="条目列表" block lead="padded-text">
        <ul className="m-0 list-none divide-y divide-border p-0">
          {COLLECTIONS.slice(0, 4).map(row => <Item key={row.id} render={<li />}>
            <Avatar size="sm" label={row.owner}><AvatarFallback>{row.owner.slice(0, 1)}</AvatarFallback></Avatar>
            <ItemContent>
              <ItemTitle><ItemLink href={`#${row.id}`}>{row.name}</ItemLink></ItemTitle>
              <ItemDescription>{row.owner} · {row.records.toLocaleString("zh-CN")} 条记录 · {row.synced}</ItemDescription>
            </ItemContent>
            <ItemActions><StateBadge state={row.state} /><Button variant="quiet" size="sm">重新同步</Button></ItemActions>
          </Item>)}
        </ul>
      </Row>
      <Row label="长列表" note="虚拟滚动 200 条" block lead="framed-row">
        <VirtualList aria-label="同步日志" items={logRows} getKey={item => item.id} itemSize={ROW} height={ROW * 5} className="rounded-panel border border-border" renderItem={item => <span className="flex h-full items-center px-(--qy-panel-padding-sm) text-body numeric">{item.text}</span>} />
      </Row>
      <Row label="滚动区域" block lead="framed-row">
        <ScrollArea aria-label="成员" role="region" className="rounded-panel border border-border" style={{ maxHeight: "12rem" }}>
          {["陈致远", "李一鸣", "王一帆", "赵子纯", "孙若溪", "周景行", "吴念安", "郑清和"].map(name => <div key={name} className="flex min-h-(--qy-row-default) items-center gap-(--qy-field-gap) px-(--qy-panel-padding-sm) py-(--qy-field-gap) text-body">
            <Avatar size="xs" label={name}><AvatarFallback>{name.slice(0, 1)}</AvatarFallback></Avatar>{name}
          </div>)}
        </ScrollArea>
      </Row>
    </Section>

    <Separator />

    <Section title="名称与值、度量">
      <Row label="名称与值" block>
        <DescriptionList className="max-w-lg">
          <DescriptionListItem><DescriptionListTerm>工作区</DescriptionListTerm><DescriptionListDetail>青野科技</DescriptionListDetail></DescriptionListItem>
          <DescriptionListItem><DescriptionListTerm>标识</DescriptionListTerm><DescriptionListDetail className="numeric">qingye</DescriptionListDetail></DescriptionListItem>
          <DescriptionListItem><DescriptionListTerm>成员</DescriptionListTerm><DescriptionListDetail className="numeric">24 人</DescriptionListDetail></DescriptionListItem>
          <DescriptionListItem><DescriptionListTerm>保留策略</DescriptionListTerm><DescriptionListDetail>滚动保留最近 90 天，更早的记录按周归档</DescriptionListDetail></DescriptionListItem>
        </DescriptionList>
      </Row>
      <Row label="度量">
        <Inline gap="section" align="start">
          <Stat state="known"><StatLabel>记录总数</StatLabel><StatValue>91,915</StatValue><StatDelta value={2.8} period="较上周" format={n => `${n}%`} /><dd className="m-0"><Sparkline label="近 8 周记录总数" values={[84210, 85102, 86044, 87310, 88020, 89144, 89410, 91915]} /></dd></Stat>
          <Stat state="known"><StatLabel>同步成功率</StatLabel><StatValue>97.6<StatUnit>%</StatUnit></StatValue><StatDelta value={-0.4} period="较上周" sentiment="bad" format={n => `${n}%`} /><StatDescription>最近 7 天</StatDescription></Stat>
          <Stat state="unknown"><StatLabel>今日失败</StatLabel><StatValue>未知</StatValue><StatDescription>统计尚未完成</StatDescription></Stat>
          <Stat state="not-applicable"><StatLabel>导出配额</StatLabel><StatValue>不适用</StatValue><StatDescription>当前方案不限量</StatDescription></Stat>
        </Inline>
      </Row>
      <Row label="状态点">
        <StatusDot status="online" label="在线" /><StatusDot status="in-progress" label="同步中" /><StatusDot status="warning" label="即将过期" /><StatusDot status="error" label="同步失败" /><StatusDot status="unknown" label="未知" /><StatusDot status="offline" label="离线" />
      </Row>
      <Row label="头像">
        <Inline gap="field">{["陈致远", "李一鸣", "王一帆", "赵子纯"].map(name => <Avatar key={name} label={name}><AvatarFallback>{name.slice(0, 1)}</AvatarFallback></Avatar>)}<span className="text-support text-muted-foreground">等 24 人</span></Inline>
      </Row>
    </Section>

    <Separator />

    <Section title="进度与计量">
      <Row label="进度" block>
        <div className="grid max-w-xl gap-(--qy-field-group-gap)">
          <Progress value={64}><Inline gap="actions"><ProgressLabel>导出操作记录</ProgressLabel><ProgressValue className="ms-auto" /></Inline><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>
          <Progress value={null}><Inline gap="actions"><ProgressLabel>读取远端记录</ProgressLabel><ProgressValue className="ms-auto" /></Inline><ProgressTrack><ProgressIndicator /></ProgressTrack></Progress>
        </div>
      </Row>
      <Row label="计量" block>
        <div className="grid max-w-xl gap-(--qy-field-group-gap)">
          <Meter value={72}><Inline gap="actions"><MeterLabel>存储用量</MeterLabel><MeterValue className="ms-auto" /></Inline><MeterTrack><MeterIndicator /></MeterTrack></Meter>
        </div>
      </Row>
      <Row label="构成" block lead="track">
        <Proportion className="max-w-xl" label="存储用量" total={100} format={n => `${n} GB`} items={[{ key: "rec", label: "记录", value: 42 }, { key: "att", label: "附件", value: 23 }, { key: "log", label: "日志", value: 9 }]} />
      </Row>
    </Section>

    <Separator />

    <Section title="图表">
      <Row label="趋势" block lead="framed-panel-heading">
        <Chart type="line" className="max-w-2xl" label="最近 5 天的同步结果" categoryLabel="日期" valueLabel="次数" series={series} rows={weekdays.map((day, index) => ({ id: day, label: day, values: { success: success[index]!, failed: failed[index]! } }))} />
      </Row>
      <Row label="比较" block lead="framed-panel-heading">
        <Chart type="bar" className="max-w-2xl" label="各来源记录数" categoryLabel="来源" valueLabel="记录数" series={[{ key: "count", label: "记录数" }]} rows={[["接口推送", 1284], ["定时导入", 912], ["数据库连接", 640], ["手动上传", 155]].map(([name, count]) => ({ id: String(name), label: String(name), values: { count: Number(count) } }))} />
      </Row>
      <Row label="分组比较" block lead="framed-panel-heading">
        <Chart type="bar" className="max-w-2xl" label="各来源成功与失败" categoryLabel="来源" valueLabel="次数" series={series} rows={[["接口推送", 412, 9], ["定时导入", 288, 21], ["数据库连接", 197, 4]].map(([name, ok, bad]) => ({ id: String(name), label: String(name), values: { success: Number(ok), failed: Number(bad) } }))} />
      </Row>
      <Row label="随时间的量" block lead="framed-panel-heading">
        <Chart type="area" className="max-w-2xl" label="近五天写入记录数" categoryLabel="日期" valueLabel="记录数" series={[{ key: "records", label: "记录数" }]} rows={weekdays.map((day, index) => ({ id: day, label: day, values: { records: [742, 815, 798, 861, 904][index]! } }))} />
      </Row>
      <Row label="随时间的构成" block lead="framed-panel-heading">
        <Chart type="area-stacked" className="max-w-2xl" label="近五天各来源记录数" categoryLabel="日期" valueLabel="记录数" series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }]} rows={weekdays.map((day, index) => ({ id: day, label: day, values: { api: success[index]! * 3, scheduled: success[index]! } }))} />
      </Row>
      <Row label="排行" block lead="framed-panel-heading">
        <Chart type="bar-horizontal" className="max-w-2xl" label="本周各集合写入次数" categoryLabel="集合" valueLabel="写入次数" series={[{ key: "writes", label: "写入次数" }]} rows={([["操作记录", 418], ["接入设备", 356], ["权限与角色", 241], ["回调地址", 187], ["成员分组", 96], ["通知模板", 52]] as const).map(([name, writes]) => ({ id: name, label: name, values: { writes } }))} />
      </Row>
      <Row label="构成比较" block lead="framed-panel-heading">
        <Chart type="bar-stacked" className="max-w-2xl" label="各来源成功与失败" categoryLabel="来源" valueLabel="次数" series={series} rows={[["接口推送", 412, 9], ["定时导入", 288, 21], ["数据库连接", 197, 4]].map(([name, ok, bad]) => ({ id: String(name), label: String(name), values: { success: Number(ok), failed: Number(bad) } }))} />
      </Row>
      <Row label="一眼占比" block lead="framed-panel-heading">
        <Chart type="donut" className="max-w-xs" label="本周记录来源占比" categoryLabel="周" valueLabel="记录数" series={[{ key: "api", label: "接口推送" }, { key: "scheduled", label: "定时导入" }, { key: "manual", label: "手动上传" }]} rows={[{ id: "week", label: "本周", values: { api: 3254, scheduled: 1180, manual: 206 } }]} />
      </Row>
      <Row label="两个量的关系" block lead="framed-panel-heading">
        <ScatterChart className="max-w-2xl" label="本周各集合写入次数与失败率" xLabel="写入次数" yLabel="失败率" formatY={value => `${(value * 100).toFixed(1)}%`}
          series={[{ key: "all", label: "全部集合", points: ([["audit", "操作记录", 418, 0.006], ["devices", "接入设备", 356, 0.012], ["roles", "权限与角色", 241, 0.021], ["webhooks", "回调地址", 187, 0.064], ["groups", "成员分组", 96, 0.038], ["templates", "通知模板", 52, 0.09], ["tokens", "访问令牌", 140, 0.015]] as const).map(([id, label, x, y]) => ({ id, label, x, y })) }]} />
      </Row>
      <Row label="分布" block lead="framed-panel-heading">
        <Heatmap className="max-w-2xl" label="每周时段的同步次数" rowLabel="时段" columnLabel="星期" valueLabel="同步次数"
          columns={["周一", "周二", "周三", "周四", "周五", "周六", "周日"].map((label, index) => ({ key: `d${index}`, label }))}
          rows={([["00 时", [2, 1, 3, 2, 4, 0, 0]], ["06 时", [18, 20, 16, 22, 19, 6, 4]], ["12 时", [42, 46, 38, 50, 44, 14, 9]], ["18 时", [30, 28, 25, 33, 29, 10, 7]]] as const).map(([label, counts]) => ({ id: label, label, values: Object.fromEntries(counts.map((count, index) => [`d${index}`, count])) }))} />
      </Row>
    </Section>

    <Separator />

    <Section title="序列与层级">
      <Row label="时间线" block>
        <Timeline>
          <TimelineItem><TimelineTime dateTime="2026-10-05T14:20:00+08:00">14:20</TimelineTime><TimelineTitle>同步完成</TimelineTitle><TimelineDescription>接入设备 · 写入 1,284 条</TimelineDescription></TimelineItem>
          <TimelineItem><TimelineTime dateTime="2026-10-05T14:02:00+08:00">14:02</TimelineTime><TimelineTitle>陈致远修改了保留策略</TimelineTitle><TimelineDescription>90 天 → 365 天</TimelineDescription></TimelineItem>
          <TimelineItem><TimelineTime dateTime="2026-10-05T09:15:00+08:00">09:15</TimelineTime><TimelineTitle>同步失败</TimelineTitle><TimelineDescription>连接中断，原数据仍在</TimelineDescription></TimelineItem>
        </Timeline>
      </Row>
      <Row label="步骤" block>
        <Steps>
          <Step state="complete"><StepTitle>连接来源</StepTitle><StepDescription>3 个设备来源</StepDescription></Step>
          <Step state="current"><StepTitle>映射字段</StepTitle><StepDescription>12 个字段已映射 8 个</StepDescription></Step>
          <Step state="error"><StepTitle>试运行</StepTitle><StepDescription>2 条记录格式不符</StepDescription></Step>
          <Step state="upcoming"><StepTitle>启用同步</StepTitle></Step>
        </Steps>
      </Row>
      <Row label="层级" block lead="row">
        <Stack gap="field" className="max-w-sm">
          <Tree aria-label="工作区结构" nodes={tree} defaultExpandedIds={["workspace", "collections"]} selectedId={selectedNode} onSelectionChange={setSelectedNode} />
          <p className="m-0 text-support text-muted-foreground">已选：{selectedNode ?? "无"}</p>
        </Stack>
      </Row>
    </Section>

    <Separator />

    <Section title="空态">
      <Row label="空态" block lead="framed-heading">
        <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-3">
          <Empty state="empty" className="rounded-panel border border-border p-(--qy-panel-padding-sm)"><EmptyTitle level={3}>还没有集合</EmptyTitle><EmptyDescription>从一个来源导入第一批记录。</EmptyDescription><EmptyActions><Button size="sm">新建集合</Button></EmptyActions></Empty>
          <Empty state="unknown" className="rounded-panel border border-border p-(--qy-panel-padding-sm)"><EmptyTitle level={3}>结果未知</EmptyTitle><EmptyDescription>请求超时，尚不知道是否有数据。</EmptyDescription><EmptyActions><Button size="sm" variant="bordered">重新读取</Button></EmptyActions></Empty>
          <Empty state="not-applicable" className="rounded-panel border border-border p-(--qy-panel-padding-sm)"><EmptyTitle level={3}>不适用</EmptyTitle><EmptyDescription>归档的集合不再同步。</EmptyDescription></Empty>
        </div>
      </Row>
    </Section>

    <Separator />

    <Section title="内容">
      <Row label="代码" block>
        <CodeBlock language="TypeScript" code={'import { Button } from "@qingye_lab/ui/components/button";\n\nexport function Save() {\n  return <Button>保存</Button>;\n}\n'} />
      </Row>
    </Section>
  </GalleryPage>;
}
