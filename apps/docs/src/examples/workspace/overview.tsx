import * as React from "react";
import { Link as RouterLink } from "@/components/locale-link";
import { Button } from "@qingye_lab/ui/components/button";
import { Chart } from "@qingye_lab/ui/components/chart";
import { Empty, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Item, ItemActions, ItemContent, ItemLink } from "@qingye_lab/ui/components/item";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Meter, MeterIndicator, MeterTrack } from "@qingye_lab/ui/components/meter";
import { Progress, ProgressIndicator, ProgressTrack } from "@qingye_lab/ui/components/progress";
import { Proportion } from "@qingye_lab/ui/components/proportion";
import { Section, SectionActions, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import { Sparkline } from "@qingye_lab/ui/components/sparkline";
import { Stat, StatDelta, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import { StatusDot, type StatusDotStatus } from "@qingye_lab/ui/components/status-dot";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { WorkspaceHeaderPortal } from "@qingye_lab/ui/components/workspace";
import { BASE } from "./shell";
import { DAILY_FAILED, DAILY_OK, DAYS, number, type Source, type SyncRun } from "./data";
import { syncDot } from "./status";
import { useWorkspaceStore } from "./store";
import "./workspace.css";

const QUOTA = 100;
const sum = (list: readonly number[]) => list.reduce((a, b) => a + b, 0);
const runDot: Record<SyncRun["state"], StatusDotStatus> = { "完成": "online", "部分失败": "warning", "失败": "error", "进行中": "in-progress" };

/*
 * 概览：按 design.md 视觉基调——内容开放而操作有界，用间距成组而不靠万物卡片，以墨阶分层而彩色稀少。
 * 读数、图、最近同步与「需要处理」全部消费工作区共享状态；点击「重新同步」真实推进进度并回写全部视图。
 */
export default function Overview() {
  const { collections, runs, syncProgress, triggerSync } = useWorkspaceStore();
  const [range, setRange] = React.useState(7);

  const totalRecords = collections.reduce((acc, item) => acc + item.records, 0);
  const totalSize = collections.reduce((acc, item) => acc + item.size, 0);
  const ok = DAILY_OK.slice(-range);
  const failed = DAILY_FAILED.slice(-range);
  const okBefore = DAILY_OK.slice(-2 * range, -range);
  const failedBefore = DAILY_FAILED.slice(-2 * range, -range);
  const rate = (o: readonly number[], f: readonly number[]) => (sum(o) / (sum(o) + sum(f))) * 100;
  const currentRate = rate(ok, failed);
  const previousRate = okBefore.length ? rate(okBefore, failedBefore) : currentRate;
  const weeklyTotals = (collections[0]?.weekly ?? [0, 0, 0, 0, 0, 0, 0, 0]).map((_, index) =>
    sum(collections.map((item) => item.weekly[index] ?? 0)),
  );
  const prevWeek = weeklyTotals.at(-2) || 1;
  const recordDelta = ((weeklyTotals.at(-1)! - prevWeek) / prevWeek) * 100;
  const failedDelta = sum(failedBefore) ? ((sum(failed) - sum(failedBefore)) / sum(failedBefore)) * 100 : 0;
  const sources = (["手动上传", "定时导入", "接口推送", "数据库连接"] as Source[]).map((source) => ({
    source,
    count: collections.filter((item) => item.source === source).length,
  }));
  const attention = collections.filter((item) => item.state === "失败" || item.state === "未同步" || syncProgress[item.id] !== undefined);
  const pendingAttentionIds = attention.filter((item) => syncProgress[item.id] === undefined).map((item) => item.id);
  const percent = (n: number) => `${n.toFixed(1)}%`;

  return <div className="ws-overview mx-auto grid w-full max-w-[80rem] px-(--qy-page-gutter) py-(--qy-section-gap)">
    <h1 className="sr-only">概览</h1>
    <WorkspaceHeaderPortal>
      <SegmentedControl value={range} onValueChange={value => setRange(Number(value))} aria-label="时间范围">
        <SegmentedControlItem value={7}>近 7 天</SegmentedControlItem>
        <SegmentedControlItem value={14}>近 14 天</SegmentedControlItem>
      </SegmentedControl>
    </WorkspaceHeaderPortal>

    <div className="ws-metrics">
      <Stat state="known" size="lg">
        <StatLabel>记录总数</StatLabel>
        <StatValue>{number.format(totalRecords)}</StatValue>
        <StatDelta value={Number(recordDelta.toFixed(1))} period="较上周" format={percent} />
        <dd className="ws-trend"><Sparkline label="近 8 周记录总数" values={weeklyTotals} /></dd>
      </Stat>
      <Stat state="known" size="lg">
        <StatLabel>同步成功率</StatLabel>
        <StatValue>{currentRate.toFixed(1)}<StatUnit>%</StatUnit></StatValue>
        <StatDelta value={Number((currentRate - previousRate).toFixed(1))} period={`较前 ${range} 天`} sentiment={currentRate > previousRate ? "good" : currentRate < previousRate ? "bad" : undefined} format={n => `${n.toFixed(1)} 点`} />
        <dd className="ws-trend"><Sparkline label={`近 ${range} 天每日成功次数`} values={ok} /></dd>
      </Stat>
      <Stat state="known" size="lg">
        <StatLabel>失败的同步</StatLabel>
        <StatValue>{sum(failed)}<StatUnit>次</StatUnit></StatValue>
        <StatDelta value={Number(failedDelta.toFixed(0))} period={`较前 ${range} 天`} sentiment={failedDelta > 0 ? "bad" : failedDelta < 0 ? "good" : undefined} format={n => `${n}%`} />
        <dd className="ws-trend"><Sparkline label={`近 ${range} 天每日失败次数`} values={failed} /></dd>
      </Stat>
      <Stat state="known" size="lg">
        <StatLabel>存储用量</StatLabel>
        <StatValue>{totalSize.toFixed(1)}<StatUnit>/ {QUOTA} GB</StatUnit></StatValue>
        <dd className="m-0"><Meter value={totalSize} max={QUOTA} aria-label="存储用量" className="w-full"><MeterTrack><MeterIndicator /></MeterTrack></Meter></dd>
      </Stat>
    </div>

    {/* 图自带标题：标题与「查看数据」同一行；不铺纸，直接坐在内容面上。 */}
    <Chart
      framed={false}
      style={{ "--qy-chart-plot-height": "calc(11 * var(--qy-cai))" }}
      type="area"
      label="每日成功同步"
      categoryLabel="日期"
      valueLabel="次数"
      series={[{ key: "ok", label: "成功" }]}
      rows={DAYS.slice(-range).map((day, index) => ({ id: day, label: day, values: { ok: ok[index]! } }))}
    />

    <div className="ws-columns">
      <Section>
        <SectionHeader>
          <SectionTitle level={2}>最近同步</SectionTitle>
          <SectionActions><RouterLink className={linkClassName} to={`${BASE}/collections`}>全部集合</RouterLink></SectionActions>
        </SectionHeader>
        <TableContainer framed={false}>
          <Table aria-label="最近同步">
            <TableHeader>
              <TableRow>
                <TableHead>集合</TableHead>
                <TableHead>时间</TableHead>
                <TableHead numeric>写入</TableHead>
                <TableHead numeric>失败</TableHead>
                <TableHead numeric>耗时</TableHead>
                <TableHead>结果</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {runs.slice(0, 8).map(run => {
                const col = collections.find((c) => c.name === run.collection);
                return (
                  <TableRow key={run.id}>
                    <TableHead scope="row">
                      {col ? <ItemLink render={<RouterLink to={`${BASE}/collections/${col.id}`} />}>{run.collection}</ItemLink> : run.collection}
                    </TableHead>
                    <TableCell className="numeric text-muted-foreground"><time dateTime={run.at}>{run.time}</time></TableCell>
                    <TableCell numeric>{number.format(run.written)}</TableCell>
                    <TableCell numeric>
                      {run.failed > 0
                        ? <SeverityMark level={run.failed >= 5 ? 3 : 2} tone={run.failed >= 5 ? "danger" : "warning"} label={`${run.failed} 条`} />
                        : "—"}
                    </TableCell>
                    <TableCell numeric className="text-muted-foreground">{run.duration}</TableCell>
                    <TableCell><StatusDot status={runDot[run.state]} label={run.state} /></TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Section>

      <div className="ws-aside">
        <Section>
          <SectionHeader>
            <SectionTitle level={2}>需要处理<span className="numeric text-muted-foreground"> {attention.length}</span></SectionTitle>
            {pendingAttentionIds.length > 1 && (
              <SectionActions>
                <Button size="sm" variant="quiet" onClick={() => triggerSync(pendingAttentionIds)}>全部重试</Button>
              </SectionActions>
            )}
          </SectionHeader>
          {attention.length > 0 ? (
            <ul className="m-0 list-none p-0">
              {attention.map(item => {
                const progress = syncProgress[item.id];
                const syncing = progress !== undefined;
                return (
                  <Item key={item.id} render={<li />} className="border-t border-border">
                    <ItemContent>
                      <ItemLink render={<RouterLink to={`${BASE}/collections/${item.id}`} />} className="truncate">{item.name}</ItemLink>
                      {syncing && (
                        <Progress aria-label={`${item.name}同步进度`} className="mt-(--qy-fen) w-full max-w-[10rem]" value={progress}>
                          <ProgressTrack><ProgressIndicator /></ProgressTrack>
                        </Progress>
                      )}
                    </ItemContent>
                    <ItemActions resting={syncing ? undefined : <StatusDot status={syncDot[item.state]} label={`${item.state} · ${item.synced}`} className="text-muted-foreground" />}>
                      <Button aria-label={`重新同步 ${item.name}`} disabled={syncing} size="sm" variant="quiet" onClick={() => triggerSync([item.id])}>
                        {syncing ? "同步中" : "重新同步"}
                      </Button>
                    </ItemActions>
                  </Item>
                );
              })}
            </ul>
          ) : (
            <Empty state="empty" className="py-(--qy-panel-padding)">
              <EmptyTitle level={3}>没有异常集合</EmptyTitle>
            </Empty>
          )}
        </Section>
        <Section>
          <SectionHeader><SectionTitle level={2}>集合来源</SectionTitle></SectionHeader>
          <Proportion label="集合来源" format={n => `${n} 个`} items={sources.map(item => ({ key: item.source, label: item.source, value: item.count }))} />
        </Section>
      </div>
    </div>
  </div>;
}
