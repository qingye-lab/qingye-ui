import * as React from "react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "@/components/locale-link";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { Card } from "@qingye_lab/ui/components/card";
import { Chart } from "@qingye_lab/ui/components/chart";
import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline } from "@qingye_lab/ui/components/layout";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Switch } from "@qingye_lab/ui/components/switch";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";
import { toastManager } from "@qingye_lab/ui/components/toast";
import { Heading } from "@qingye_lab/ui/components/typography";
import { BASE, useWorkspaceNavigate } from "./shell";
import { findCollection, number, RUNS } from "./data";
import { syncDot } from "./status";

/* 集合详情：标题行说清「这是什么、现在怎样、能做什么」；其余按任务分到标签页，危险操作单独成节、需要确认。 */

const FIELDS = [
  { name: "device_id", type: "文本", required: true, sample: "QY-2041-0087" },
  { name: "model", type: "文本", required: true, sample: "QY-M2" },
  { name: "firmware", type: "版本号", required: false, sample: "4.2.1" },
  { name: "last_seen", type: "时间", required: true, sample: "2026-10-07 14:18" },
  { name: "battery", type: "数字", required: false, sample: "86" },
];

export default function CollectionDetail() {
  const { id } = useParams(); const navigate = useWorkspaceNavigate();
  const item = findCollection(id);
  const [name, setName] = React.useState(item?.name ?? "");
  const [retention, setRetention] = React.useState<number | null>(item?.retention ?? 30);
  const [auto, setAuto] = React.useState(true);
  if (!item) return <div className="mx-auto grid w-full max-w-[80rem] px-(--qy-page-gutter) py-(--qy-section-gap)">
    <Empty state="not-applicable"><EmptyTitle level={1}>没有这个集合</EmptyTitle><EmptyActions><RouterLink to={`${BASE}/collections`} className={buttonVariants({ variant: "bordered" })}>回到集合</RouterLink></EmptyActions></Empty>
  </div>;
  const runs = RUNS.filter(run => run.collection === item.name);
  const dirty = name !== item.name || retention !== item.retention;

  return <div className="mx-auto grid w-full max-w-[80rem] gap-(--qy-panel-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <div className="flex min-w-0 flex-wrap items-start justify-between gap-(--qy-panel-gap)">
      <div className="grid min-w-0 gap-(--qy-field-gap)">
        <Heading level={1} step="chapter">{item.name}</Heading>
        <Inline gap="panel" className="text-support text-muted-foreground">
          <StatusDot status={syncDot[item.state]} label={`${item.state} · ${item.synced}`} />
          <span>{item.source}</span>
          <span className="numeric">{number.format(item.records)} 条</span>
        </Inline>
      </div>
      <Inline gap="actions">
        <Button variant="bordered">导出</Button>
        <Button onClick={() => toastManager.add({ title: `${item.name}已开始同步`, type: "loading" })}>立即同步</Button>
      </Inline>
    </div>

    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTab value="overview">概览</TabsTab>
        <TabsTab value="runs">同步记录</TabsTab>
        <TabsTab value="fields">字段</TabsTab>
        <TabsTab value="settings">设置</TabsTab>
      </TabsList>

      <TabsPanel value="overview" className="grid gap-(--qy-panel-gap) lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Chart type="area" label="近 8 周记录数" categoryLabel="周" valueLabel="条" series={[{ key: "records", label: "记录数" }]} rows={item.weekly.map((value, index) => ({ id: `w${index}`, label: `第 ${index + 1} 周`, values: { records: value } }))} />
        <Card className="grid content-start gap-(--qy-field-group-gap) p-(--qy-panel-padding)">
          <Heading level={2} step="heading">信息</Heading>
          <DescriptionList>
            <DescriptionListItem><DescriptionListTerm>标识</DescriptionListTerm><DescriptionListDetail className="font-mono">{item.id}</DescriptionListDetail></DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>负责人</DescriptionListTerm><DescriptionListDetail><Inline gap="field"><Avatar size="xs" label={item.owner}><AvatarFallback>{item.owner.slice(0, 1)}</AvatarFallback></Avatar>{item.owner}</Inline></DescriptionListDetail></DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>占用</DescriptionListTerm><DescriptionListDetail className="numeric">{item.size} GB</DescriptionListDetail></DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>保留</DescriptionListTerm><DescriptionListDetail className="numeric">{item.retention} 天</DescriptionListDetail></DescriptionListItem>
          </DescriptionList>
        </Card>
      </TabsPanel>

      <TabsPanel value="runs">
        {runs.length ? <Card className="p-(--qy-panel-padding)">
          <Timeline>
            {runs.map(run => <TimelineItem key={run.id}><TimelineTime dateTime={run.at}>今天 {run.time}</TimelineTime><TimelineTitle>{run.state}</TimelineTitle><TimelineDescription>写入 {number.format(run.written)} 条{run.failed ? ` · ${run.failed} 条失败` : ""} · 用时 {run.duration}</TimelineDescription></TimelineItem>)}
          </Timeline>
        </Card> : <Empty state="empty"><EmptyTitle>今天还没有同步</EmptyTitle></Empty>}
      </TabsPanel>

      <TabsPanel value="fields">
        <TableContainer>
          <Table aria-label="字段">
            <TableHeader><TableRow><TableHead>字段</TableHead><TableHead>类型</TableHead><TableHead>必填</TableHead><TableHead>示例</TableHead></TableRow></TableHeader>
            <TableBody>{FIELDS.map(field => <TableRow key={field.name}>
              <TableHead scope="row" className="font-mono">{field.name}</TableHead>
              <TableCell>{field.type}</TableCell>
              <TableCell className="text-muted-foreground">{field.required ? "必填" : "—"}</TableCell>
              <TableCell className="font-mono text-muted-foreground">{field.sample}</TableCell>
            </TableRow>)}</TableBody>
          </Table>
        </TableContainer>
      </TabsPanel>

      <TabsPanel value="settings" className="grid gap-(--qy-panel-gap)">
        <Card className="grid gap-(--qy-field-group-gap) p-(--qy-panel-padding)">
          <Heading level={2} step="heading">基本</Heading>
          <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
            <Field><FieldLabel>名称</FieldLabel><Input value={name} onChange={event => setName(event.target.value)} /></Field>
            <Field><FieldLabel>保留天数</FieldLabel>
              <NumberField value={retention} onValueChange={setRetention} min={7} max={3650}><NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup></NumberField>
            </Field>
          </div>
          <Field orientation="horizontal"><Switch checked={auto} onCheckedChange={setAuto} /><FieldContent><FieldLabel>按计划自动同步</FieldLabel><FieldDescription>每 15 分钟一次</FieldDescription></FieldContent></Field>
          <Inline gap="actions" className="justify-end">
            <Button variant="quiet" disabled={!dirty} onClick={() => { setName(item.name); setRetention(item.retention); }}>放弃更改</Button>
            <Button disabled={!dirty} onClick={() => toastManager.add({ title: "已保存", type: "success" })}>保存</Button>
          </Inline>
        </Card>
        <Card className="flex flex-wrap items-center justify-between gap-(--qy-panel-gap) p-(--qy-panel-padding)">
          <div className="grid min-w-0 gap-(--qy-field-gap)">
            <Heading level={2} step="heading">删除集合</Heading>
            <p className="m-0 text-support text-muted-foreground">{number.format(item.records)} 条记录与全部同步历史将一并删除，无法恢复。</p>
          </div>
          <ConfirmAction tone="danger" snapshot={{ objectId: item.id, objectLabel: item.name, version: item.synced, change: "删除", consequence: `${number.format(item.records)} 条记录与全部同步历史将一并删除，无法恢复。` }}
            title={`删除${item.name}`} triggerLabel="删除集合" actionLabel="删除" confirmationText={item.name} confirmationLabel={`输入「${item.name}」以确认`}
            onConfirm={() => { toastManager.add({ title: `已删除${item.name}`, type: "success" }); navigate("/collections"); }} />
        </Card>
      </TabsPanel>
    </Tabs>
  </div>;
}
