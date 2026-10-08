import * as React from "react";
import { Link as RouterLink } from "@/components/locale-link";
import { Button } from "@qingye_lab/ui/components/button";
import { Card } from "@qingye_lab/ui/components/card";
import { Chart } from "@qingye_lab/ui/components/chart";
import { Meter, MeterIndicator, MeterTrack } from "@qingye_lab/ui/components/meter";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import { Stat, StatDelta, StatDescription, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { Heading } from "@qingye_lab/ui/components/typography";
import { BASE, PageActions } from "./shell";
import { COLLECTIONS, DAILY_FAILED, DAILY_OK, DAYS, RUNS, number, totalRecords, totalSize, type Source, type SyncRun } from "./data";
import { syncDot } from "./status";

const QUOTA = 100;
const sum = (list: readonly number[]) => list.reduce((a, b) => a + b, 0);
const runDot: Record<SyncRun["state"], "online" | "warning" | "error" | "in-progress"> = { "完成": "online", "部分失败": "warning", "失败": "error", "进行中": "in-progress" };

/*
 * 指标卡：标签与变化量同一行（变化量居右）；数字在下，是这张卡的君；趋势铺满卡的底边——
 * 与数字连成一体，而不是缩在一角的一笔。四张卡一种排法。
 */
function MetricCard({ label, value, delta, foot }: { label: string; value: React.ReactNode; delta: React.ReactNode; foot: React.ReactNode }) {
  return <Card className="grid overflow-hidden">
    <Stat state="known" className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-(--qy-field-gap) gap-y-(--qy-field-gap)">
      <StatLabel className="px-(--qy-panel-padding) pt-(--qy-panel-padding)">{label}</StatLabel>
      <div className="contents [&>dd]:pe-(--qy-panel-padding) [&>dd]:pt-(--qy-panel-padding)">{delta}</div>
      <StatValue className="col-span-2 px-(--qy-panel-padding)">{value}</StatValue>
      <dd className="col-span-2 m-0 mt-(--qy-field-gap)">{foot}</dd>
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

  return <div className="mx-auto grid w-full max-w-[80rem] gap-(--qy-panel-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <h1 className="sr-only">概览</h1>
    <PageActions>
      <SegmentedControl value={range} onValueChange={value => setRange(Number(value))} aria-label="时间范围">
        <SegmentedControlItem value={7}>近 7 天</SegmentedControlItem>
        <SegmentedControlItem value={14}>近 14 天</SegmentedControlItem>
      </SegmentedControl>
    </PageActions>

    <div className="grid gap-(--qy-panel-gap) sm:grid-cols-2 xl:grid-cols-4">
      <MetricCard label="记录总数" value={number.format(totalRecords)}
        delta={<StatDelta value={Number(recordDelta.toFixed(1))} period="较上周" format={percent} />}
        foot={<Sparkline appearance="area" label="近 8 周记录总数" values={weeklyTotals} />} />
      <MetricCard label="同步成功率" value={<>{currentRate.toFixed(1)}<StatUnit>%</StatUnit></>}
        delta={<StatDelta value={Number((currentRate - previousRate).toFixed(1))} period={`较前 ${range} 天`} sentiment={currentRate > previousRate ? "good" : currentRate < previousRate ? "bad" : undefined} format={n => `${n.toFixed(1)} 点`} />}
        foot={<Sparkline appearance="area" label={`近 ${range} 天每日成功次数`} values={ok} />} />
      <MetricCard label="失败的同步" value={<>{sum(failed)}<StatUnit>次</StatUnit></>}
        delta={<StatDelta value={Number(failedDelta.toFixed(0))} period={`较前 ${range} 天`} sentiment={failedDelta > 0 ? "bad" : failedDelta < 0 ? "good" : undefined} format={n => `${n}%`} />}
        foot={<Sparkline appearance="area" label={`近 ${range} 天每日失败次数`} values={failed} />} />
      <MetricCard label="存储用量" value={<>{totalSize.toFixed(1)}<StatUnit>/ {QUOTA} GB</StatUnit></>}
        delta={<StatDescription>余 {(QUOTA - totalSize).toFixed(1)} GB</StatDescription>}
        foot={<div className="flex h-[calc(2*var(--qy-cai))] items-end px-(--qy-panel-padding) pb-(--qy-panel-padding)"><Meter value={totalSize} max={QUOTA} aria-label="存储用量" className="w-full"><MeterTrack><MeterIndicator /></MeterTrack></Meter></div>} />
    </div>

    <div className="grid items-start gap-(--qy-panel-gap) lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <Chart type="area" label="每日成功同步" categoryLabel="日期" valueLabel="次数" series={[{ key: "ok", label: "成功" }]} rows={DAYS.slice(-range).map((day, index) => ({ id: day, label: day, values: { ok: ok[index]! } }))} />
      <Chart type="donut" label="集合来源" categoryLabel="来源" valueLabel="个集合" series={sources.map(item => ({ key: item.source, label: item.source }))} rows={[{ id: "all", label: "全部", values: Object.fromEntries(sources.map(item => [item.source, item.count])) }]} />
    </div>

    <div className="grid items-start gap-(--qy-panel-gap) lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
      <TableContainer>
        <Table>
          <caption className="px-(--qy-panel-padding) pt-(--qy-panel-padding) pb-(--qy-field-group-gap) text-start"><Heading level={2} step="heading">最近同步</Heading></caption>
          <TableHeader><TableRow><TableHead>集合</TableHead><TableHead>时间</TableHead><TableHead className="text-end">写入</TableHead><TableHead className="text-end">失败</TableHead><TableHead className="text-end">耗时</TableHead><TableHead>结果</TableHead></TableRow></TableHeader>
          <TableBody>{RUNS.map(run => <TableRow key={run.id}>
            <TableHead scope="row">{run.collection}</TableHead>
            <TableCell className="numeric text-muted-foreground"><time dateTime={run.at}>{run.time}</time></TableCell>
            <TableCell className="text-end numeric">{number.format(run.written)}</TableCell>
            <TableCell className="text-end numeric">{run.failed || "—"}</TableCell>
            <TableCell className="text-end numeric text-muted-foreground">{run.duration}</TableCell>
            <TableCell><StatusDot status={runDot[run.state]} label={run.state} /></TableCell>
          </TableRow>)}</TableBody>
        </Table>
      </TableContainer>

      {/* 需要处理：与表格同一种纸——标题在纸内，行线贯通到纸边；一行一件事，动作轻，不立一排描边大按钮。 */}
      <Card className="overflow-hidden">
        <Heading level={2} step="heading" className="px-(--qy-panel-padding) pt-(--qy-panel-padding) pb-(--qy-field-gap)">需要处理</Heading>
        <ul className="m-0 list-none p-0">
          {attention.map(item => <li key={item.id} className="flex min-h-(--qy-row-default) items-center gap-(--qy-field-gap) border-t border-border ps-(--qy-panel-padding) pe-[calc(var(--qy-panel-padding)-var(--qy-control-sm-padding))]">
            <RouterLink to={`${BASE}/collections/${item.id}`} className="min-w-0 flex-1 truncate rounded-item text-body text-foreground underline-offset-4 outline-none hover:underline focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring">{item.name}</RouterLink>
            <StatusDot status={syncDot[item.state]} label={`${item.state} · ${item.synced}`} className="shrink-0 text-support text-muted-foreground" />
            <Button size="sm" variant="quiet">重新同步</Button>
          </li>)}
        </ul>
      </Card>
    </div>
  </div>;
}
