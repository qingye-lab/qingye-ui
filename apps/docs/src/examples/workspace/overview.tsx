import * as React from "react";
import { Link as RouterLink } from "@/components/locale-link";
import { Button } from "@qingye_lab/ui/components/button";
import { Card } from "@qingye_lab/ui/components/card";
import { Chart } from "@qingye_lab/ui/components/chart";
import { Item, ItemActions, ItemContent, ItemLink } from "@qingye_lab/ui/components/item";
import { Meter, MeterIndicator, MeterTrack } from "@qingye_lab/ui/components/meter";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import { StatusDot, type StatusDotStatus } from "@qingye_lab/ui/components/status-dot";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { Heading } from "@qingye_lab/ui/components/typography";
import { WorkspaceHeaderPortal } from "@qingye_lab/ui/components/workspace";
import { BASE } from "./shell";
import { COLLECTIONS, DAILY_FAILED, DAILY_OK, DAYS, RUNS, number, totalRecords, totalSize, type Source, type SyncRun } from "./data";
import { syncDot } from "./status";

const QUOTA = 100;
const sum = (list: readonly number[]) => list.reduce((a, b) => a + b, 0);
const runDot: Record<SyncRun["state"], StatusDotStatus> = { "完成": "online", "部分失败": "warning", "失败": "error", "进行中": "in-progress" };

/*
 * 指标卡：Stat 的文档顺序——标签、数字、变化量、趋势；留白由 Stat 自己的 padding 给出，各部分不另加。
 * 数字是这张卡的君；趋势抵消面板内边距，铺满卡的底边，与数字连成一体，而不是缩在一角的一笔。
 * 存储卡的计量条没有趋势那样的「铺满」，留在内边距之内、沉到卡的底部（mt-auto），四张卡同高时底边对齐。
 */
const trendEdge = "m-0 mt-auto -mx-(--qy-panel-padding) -mb-(--qy-panel-padding)";
function MetricCard({ label, value, delta, foot }: { label: string; value: React.ReactNode; delta: React.ReactNode; foot: React.ReactNode }) {
  return <Card className="grid overflow-hidden">
    <Stat state="known" className="p-(--qy-panel-padding)">
      <StatLabel>{label}</StatLabel>
      <StatValue>{value}</StatValue>
      {delta}
      {foot}
    </Stat>
  </Card>;
}

export default function Overview() {
  const [range, setRange] = React.useState(7);
  const ok = DAILY_OK.slice(-range), failed = DAILY_FAILED.slice(-range);
  const okBefore = DAILY_OK.slice(-2 * range, -range), failedBefore = DAILY_FAILED.slice(-2 * range, -range);
  const rate = (o: readonly number[], f: readonly number[]) => sum(o) / (sum(o) + sum(f)) * 100;
  const currentRate = rate(ok, failed), previousRate = okBefore.length ? rate(okBefore, failedBefore) : currentRate;
  const weeklyTotals = COLLECTIONS[0]!.weekly.map((_, index) => sum(COLLECTIONS.map(item => item.weekly[index]!)));
  const recordDelta = (weeklyTotals.at(-1)! - weeklyTotals.at(-2)!) / weeklyTotals.at(-2)! * 100;
  const failedDelta = sum(failedBefore) ? (sum(failed) - sum(failedBefore)) / sum(failedBefore) * 100 : 0;
  const sources = (["手动上传", "定时导入", "接口推送", "数据库连接"] as Source[]).map(source => ({ source, count: COLLECTIONS.filter(item => item.source === source).length }));
  const attention = COLLECTIONS.filter(item => item.state === "失败" || item.state === "未同步");
  const percent = (n: number) => `${n.toFixed(1)}%`;
  const recentId = React.useId(), attentionId = React.useId();

  return <div className="mx-auto grid w-full max-w-[80rem] gap-(--qy-panel-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <h1 className="sr-only">概览</h1>
    <WorkspaceHeaderPortal>
      <SegmentedControl value={range} onValueChange={value => setRange(Number(value))} aria-label="时间范围">
        <SegmentedControlItem value={7}>近 7 天</SegmentedControlItem>
        <SegmentedControlItem value={14}>近 14 天</SegmentedControlItem>
      </SegmentedControl>
    </WorkspaceHeaderPortal>

    <div className="grid gap-(--qy-panel-gap) sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="记录总数" value={number.format(totalRecords)}
        delta={<StatDelta value={Number(recordDelta.toFixed(1))} period="较上周" format={percent} />}
        foot={<dd className={trendEdge}><Sparkline appearance="area" label="近 8 周记录总数" values={weeklyTotals} /></dd>} />
      <MetricCard label="同步成功率" value={<>{currentRate.toFixed(1)}<StatUnit>%</StatUnit></>}
        delta={<StatDelta value={Number((currentRate - previousRate).toFixed(1))} period={`较前 ${range} 天`} sentiment={currentRate > previousRate ? "good" : currentRate < previousRate ? "bad" : undefined} format={n => `${n.toFixed(1)} 点`} />}
        foot={<dd className={trendEdge}><Sparkline appearance="area" label={`近 ${range} 天每日成功次数`} values={ok} /></dd>} />
      <MetricCard label="失败的同步" value={<>{sum(failed)}<StatUnit>次</StatUnit></>}
        delta={<StatDelta value={Number(failedDelta.toFixed(0))} period={`较前 ${range} 天`} sentiment={failedDelta > 0 ? "bad" : failedDelta < 0 ? "good" : undefined} format={n => `${n}%`} />}
        foot={<dd className={trendEdge}><Sparkline appearance="area" label={`近 ${range} 天每日失败次数`} values={failed} /></dd>} />
      <MetricCard label="存储用量" value={<>{totalSize.toFixed(1)}<StatUnit>/ {QUOTA} GB</StatUnit></>}
        delta={<StatDescription>余 {(QUOTA - totalSize).toFixed(1)} GB</StatDescription>}
        foot={<dd className="m-0 mt-auto"><Meter value={totalSize} max={QUOTA} aria-label="存储用量" className="w-full"><MeterTrack><MeterIndicator /></MeterTrack></Meter></dd>} />
    </div>

    <div className="grid items-start gap-(--qy-panel-gap) lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <Chart type="area" label="每日成功同步" categoryLabel="日期" valueLabel="次数" series={[{ key: "ok", label: "成功" }]} rows={DAYS.slice(-range).map((day, index) => ({ id: day, label: day, values: { ok: ok[index]! } }))} />
      <Chart type="donut" label="集合来源" categoryLabel="来源" valueLabel="个集合" series={sources.map(item => ({ key: item.source, label: item.source }))} rows={[{ id: "all", label: "全部", values: Object.fromEntries(sources.map(item => [item.source, item.count])) }]} />
    </div>

    <div className="grid items-start gap-(--qy-panel-gap) lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      {/* 最近同步：表放在 Card 这张纸上（TableContainer framed={false}），标题在纸内，表以它命名。 */}
      <Card className="overflow-hidden" render={<section aria-labelledby={recentId} />}>
        <Heading id={recentId} level={2} step="heading" className="px-(--qy-panel-padding) pt-(--qy-panel-padding-sm) pb-(--qy-field-gap)">最近同步</Heading>
        <TableContainer framed={false}>
          <Table aria-labelledby={recentId}>
            <TableHeader><TableRow><TableHead>集合</TableHead><TableHead>时间</TableHead><TableHead numeric>写入</TableHead><TableHead numeric>失败</TableHead><TableHead numeric>耗时</TableHead><TableHead>结果</TableHead></TableRow></TableHeader>
            <TableBody>{RUNS.map(run => <TableRow key={run.id}>
              <TableHead scope="row">{run.collection}</TableHead>
              <TableCell className="numeric text-muted-foreground"><time dateTime={run.at}>{run.time}</time></TableCell>
              <TableCell numeric>{number.format(run.written)}</TableCell>
              <TableCell numeric>{run.failed || "—"}</TableCell>
              <TableCell numeric className="text-muted-foreground">{run.duration}</TableCell>
              <TableCell><StatusDot status={runDot[run.state]} label={run.state} /></TableCell>
            </TableRow>)}</TableBody>
          </Table>
        </TableContainer>
      </Card>

      {/* 需要处理：与左侧同一种纸、同一个标题几何——行线贯通到纸边；一行一件事，状态是平时就在的事实（resting），动作轻，不立一排描边大按钮。 */}
      <Card className="overflow-hidden" render={<section aria-labelledby={attentionId} />}>
        <Heading id={attentionId} level={2} step="heading" className="px-(--qy-panel-padding) pt-(--qy-panel-padding-sm) pb-(--qy-field-gap)">需要处理</Heading>
        <ul className="m-0 list-none p-0">
          {attention.map(item => <Item key={item.id} render={<li />} className="border-t border-border ps-(--qy-panel-padding) pe-[calc(var(--qy-panel-padding)-var(--qy-control-sm-padding))]">
            <ItemContent><ItemLink render={<RouterLink to={`${BASE}/collections/${item.id}`} />} className="truncate">{item.name}</ItemLink></ItemContent>
            <ItemActions resting={<StatusDot status={syncDot[item.state]} label={`${item.state} · ${item.synced}`} className="text-muted-foreground" />}>
              <Button size="sm" variant="quiet">重新同步</Button>
            </ItemActions>
          </Item>)}
        </ul>
      </Card>
    </div>
  </div>;
}
