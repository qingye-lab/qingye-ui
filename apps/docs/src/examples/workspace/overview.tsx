import * as React from "react";
import { Link as RouterLink } from "@/components/locale-link";
import { Button } from "@qingye_lab/ui/components/button";
import { Chart } from "@qingye_lab/ui/components/chart";
import { Item, ItemActions, ItemContent, ItemLink } from "@qingye_lab/ui/components/item";
import { Meter, MeterIndicator, MeterTrack } from "@qingye_lab/ui/components/meter";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { Proportion } from "@qingye_lab/ui/components/proportion";
import { Section, SectionActions, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import { linkClassName } from "@qingye_lab/ui/components/link";
import { Stat, StatDelta, StatLabel, StatUnit, StatValue } from "@qingye_lab/ui/components/stat";
import { StatusDot, type StatusDotStatus } from "@qingye_lab/ui/components/status-dot";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { WorkspaceHeaderPortal } from "@qingye_lab/ui/components/workspace";
import { BASE } from "./shell";
import { COLLECTIONS, DAILY_FAILED, DAILY_OK, DAYS, RUNS, number, totalRecords, totalSize, type Source, type SyncRun } from "./data";
import { syncDot } from "./status";
import "./workspace.css";

const QUOTA = 100;
const sum = (list: readonly number[]) => list.reduce((a, b) => a + b, 0);
const runDot: Record<SyncRun["state"], StatusDotStatus> = { "完成": "online", "部分失败": "warning", "失败": "error", "进行中": "in-progress" };

/*
 * 概览（2026-10-30 重做）。按 design.md 的视觉基调：内容开放而操作有界，用间距成组而不靠万物卡片，以墨阶分层而彩色稀少。
 * - 一页只有一个君：每日成功同步的图，整幅宽，不另铺纸（framed={false}）。
 * - 指标是一条开放的读数带：四个读数并排，靠间距分开，不各自装进卡片，也不各配一条趋势线（四条小线是四处无事实的彩色）。
 * - 下方两栏是有名字的区块（Section），表与列表直接坐在内容面上；集合来源用一条比例条代替环图，四色收成一道细条。
 * - 彩色只剩：图的数据色、状态点、比例条的类别色；品牌青只在动作上。
 */
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
      </Stat>
      <Stat state="known" size="lg">
        <StatLabel>同步成功率</StatLabel>
        <StatValue>{currentRate.toFixed(1)}<StatUnit>%</StatUnit></StatValue>
        <StatDelta value={Number((currentRate - previousRate).toFixed(1))} period={`较前 ${range} 天`} sentiment={currentRate > previousRate ? "good" : currentRate < previousRate ? "bad" : undefined} format={n => `${n.toFixed(1)} 点`} />
      </Stat>
      <Stat state="known" size="lg">
        <StatLabel>失败的同步</StatLabel>
        <StatValue>{sum(failed)}<StatUnit>次</StatUnit></StatValue>
        <StatDelta value={Number(failedDelta.toFixed(0))} period={`较前 ${range} 天`} sentiment={failedDelta > 0 ? "bad" : failedDelta < 0 ? "good" : undefined} format={n => `${n}%`} />
      </Stat>
      <Stat state="known" size="lg">
        <StatLabel>存储用量</StatLabel>
        <StatValue>{totalSize.toFixed(1)}<StatUnit>/ {QUOTA} GB</StatUnit></StatValue>
        <dd className="m-0"><Meter value={totalSize} max={QUOTA} aria-label="存储用量" className="w-full"><MeterTrack><MeterIndicator /></MeterTrack></Meter></dd>
      </Stat>
    </div>

    {/* 图自带标题：标题与「查看数据」同一行；不铺纸，直接坐在内容面上。 */}
    <Chart framed={false} style={{ "--qy-chart-plot-height": "calc(14 * var(--qy-cai))" }} type="area" label="每日成功同步" categoryLabel="日期" valueLabel="次数" series={[{ key: "ok", label: "成功" }]} rows={DAYS.slice(-range).map((day, index) => ({ id: day, label: day, values: { ok: ok[index]! } }))} />

    <div className="ws-columns">
      <Section>
        <SectionHeader>
          <SectionTitle level={2}>最近同步</SectionTitle>
          <SectionActions><RouterLink className={linkClassName} to={`${BASE}/collections`}>全部集合</RouterLink></SectionActions>
        </SectionHeader>
        <TableContainer framed={false}>
          <Table>
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
      </Section>

      <div className="ws-aside">
        <Section>
          <SectionHeader><SectionTitle level={2}>需要处理<span className="numeric text-muted-foreground"> {attention.length}</span></SectionTitle></SectionHeader>
          <ul className="m-0 list-none p-0">
            {attention.map(item => <Item key={item.id} render={<li />} className="border-t border-border">
              <ItemContent><ItemLink render={<RouterLink to={`${BASE}/collections/${item.id}`} />} className="truncate">{item.name}</ItemLink></ItemContent>
              <ItemActions resting={<StatusDot status={syncDot[item.state]} label={`${item.state} · ${item.synced}`} className="text-muted-foreground" />}>
                <Button size="sm" variant="quiet">重新同步</Button>
              </ItemActions>
            </Item>)}
          </ul>
        </Section>
        <Section>
          <SectionHeader><SectionTitle level={2}>集合来源</SectionTitle></SectionHeader>
          <Proportion label="集合来源" format={n => `${n} 个`} items={sources.map(item => ({ key: item.source, label: item.source, value: item.count }))} />
        </Section>
      </div>
    </div>
  </div>;
}
