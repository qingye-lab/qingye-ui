import * as React from "react";
import { IconDownload, IconRefresh } from "@tabler/icons-react";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "@/components/locale-link";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Badge } from "@qingye_lab/ui/components/badge";
import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { Chart } from "@qingye_lab/ui/components/chart";
import { CodeBlock } from "@qingye_lab/ui/components/code-block";
import { ConfirmAction } from "@qingye_lab/ui/components/confirm-action";
import { CopyButton } from "@qingye_lab/ui/components/copy-button";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Field, FieldContent, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Inline } from "@qingye_lab/ui/components/layout";
import { NumberField, NumberFieldDecrement, NumberFieldGroup, NumberFieldIncrement, NumberFieldInput } from "@qingye_lab/ui/components/number-field";
import { PageHeader, PageHeaderActions, PageHeaderContent, PageHeaderTitle } from "@qingye_lab/ui/components/page-header";
import { PasswordInput } from "@qingye_lab/ui/components/password-input";
import { Progress, ProgressIndicator, ProgressLabel, ProgressTrack, ProgressValue } from "@qingye_lab/ui/components/progress";
import { ScatterChart } from "@qingye_lab/ui/components/scatter-chart";
import { Section, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import { SegmentedControl, SegmentedControlItem } from "@qingye_lab/ui/components/segmented-control";
import { SeverityMark } from "@qingye_lab/ui/components/severity-mark";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Switch } from "@qingye_lab/ui/components/switch";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { Tabs, TabsList, TabsPanel, TabsTab } from "@qingye_lab/ui/components/tabs";
import { TagInput } from "@qingye_lab/ui/components/tag-input";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";
import { toastManager } from "@qingye_lab/ui/components/toast";
import "./workspace.css";
import { BASE, useWorkspaceNavigate } from "./shell";
import { number } from "./data";
import { syncDot } from "./status";
import { useWorkspaceStore } from "./store";

/*
 * 集合详情：标题行说清「这是什么、现在怎样、能做什么」；其余按任务分到标签页，危险操作单独成节、需要确认。
 * 所有编辑、同步与删除均回写工作区共享状态；接口接入提供真实可复制代码与密钥可见切换。
 */

const FIELDS = [
  { name: "device_id", type: "文本", required: true, sample: "QY-2041-0087" },
  { name: "model", type: "文本", required: true, sample: "QY-M2" },
  { name: "firmware", type: "版本号", required: false, sample: "4.2.1" },
  { name: "last_seen", type: "时间", required: true, sample: "2026-10-07 14:18" },
  { name: "battery", type: "数字", required: false, sample: "86" },
];

const LATENCY_POINTS = [
  { id: "b1", label: "09:15 批次", x: 180, y: 12 },
  { id: "b2", label: "10:30 批次", x: 640, y: 24 },
  { id: "b3", label: "11:45 批次", x: 1120, y: 31 },
  { id: "b4", label: "13:08 批次", x: 960, y: 29 },
  { id: "b5", label: "14:11 批次", x: 2112, y: 76 },
  { id: "b6", label: "14:20 批次", x: 1284, y: 38 },
];

export default function CollectionDetail() {
  const { id } = useParams();
  const navigate = useWorkspaceNavigate();
  const { collections, runs: allRuns, syncProgress, tagsById, autoSyncById, triggerSync, updateCollection, deleteCollection } = useWorkspaceStore();

  const item = collections.find((col) => col.id === id);
  const savedTags = item ? (tagsById[item.id] ?? []) : [];
  const savedAuto = item ? (autoSyncById[item.id] ?? true) : true;

  const [name, setName] = React.useState(item?.name ?? "");
  const [retention, setRetention] = React.useState<number | null>(item?.retention ?? 30);
  const [auto, setAuto] = React.useState(savedAuto);
  const [tags, setTags] = React.useState<string[]>(savedTags);
  const [sdkLang, setSdkLang] = React.useState("curl");

  React.useEffect(() => {
    if (!item) return;
    setName(item.name);
    setRetention(item.retention);
    setAuto(autoSyncById[item.id] ?? true);
    setTags(tagsById[item.id] ?? []);
  }, [item?.id]);

  if (!item) {
    return <div className="mx-auto grid w-full max-w-[80rem] px-(--qy-page-gutter) py-(--qy-section-gap)">
      <Empty state="not-applicable">
        <EmptyTitle level={1}>没有这个集合</EmptyTitle>
        <EmptyActions><RouterLink to={`${BASE}/collections`} className={buttonVariants({ variant: "bordered" })}>回到集合</RouterLink></EmptyActions>
      </Empty>
    </div>;
  }

  const runs = allRuns.filter((run) => run.collection === item.name);
  const progress = syncProgress[item.id];
  const syncing = progress !== undefined;
  const dirty =
    name !== item.name ||
    retention !== item.retention ||
    auto !== savedAuto ||
    tags.join("\u0000") !== savedTags.join("\u0000");

  const endpoint = `https://api.qingye.dev/v1/collections/${item.id}/sync`;
  const tokenValue = `qy_live_${item.id}_9f4c2a8e1b6d`;
  const curlSnippet = `curl -X POST ${endpoint} \\\n  -H "Authorization: Bearer $QINGYE_TOKEN" \\\n  -H "Content-Type: application/json" \\\n  -d '{"mode":"incremental","idempotencyKey":"batch-2026-10-07"}'`;
  const tsSnippet = `import { createSyncClient } from "@qingye_lab/sync";\n\nconst client = createSyncClient({ token: process.env.QINGYE_TOKEN });\nconst receipt = await client.sync("${item.id}", {\n  mode: "incremental",\n  retentionDays: ${item.retention},\n});`;

  return <div className="mx-auto grid w-full max-w-[80rem] gap-(--qy-panel-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderTitle>{item.name}</PageHeaderTitle>
        <Inline gap="panel" className="flex-wrap text-support text-muted-foreground">
          <StatusDot status={syncDot[item.state]} label={`${item.state} · ${item.synced}`} />
          <span>{item.source}</span>
          <span className="numeric">{number.format(item.records)} 条</span>
          {savedTags.map((tag) => <Badge key={tag}>{tag}</Badge>)}
        </Inline>
      </PageHeaderContent>
      <PageHeaderActions>
        <Button
          variant="bordered"
          onClick={() => toastManager.add({ title: `已导出「${item.name}」`, description: `共 ${number.format(item.records)} 条记录（CSV）`, type: "success" })}
        >
          <IconDownload aria-hidden="true" />导出
        </Button>
        <Button disabled={syncing} onClick={() => triggerSync([item.id])}>
          <IconRefresh aria-hidden="true" />{syncing ? "同步中" : "立即同步"}
        </Button>
      </PageHeaderActions>
    </PageHeader>

    {syncing && (
      <Progress value={progress} className="max-w-md">
        <ProgressLabel>正在拉取增量记录</ProgressLabel>
        <ProgressValue />
        <ProgressTrack><ProgressIndicator /></ProgressTrack>
      </Progress>
    )}

    <Tabs defaultValue="overview">
      <TabsList>
        <TabsTab value="overview">概览</TabsTab>
        <TabsTab value="runs">同步记录</TabsTab>
        <TabsTab value="fields">字段</TabsTab>
        <TabsTab value="api">接口接入</TabsTab>
        <TabsTab value="settings">设置</TabsTab>
      </TabsList>

      <TabsPanel value="overview" className="ws-detail-overview">
        <Chart
          framed={false}
          type="area"
          label="近 8 周记录数"
          categoryLabel="周"
          valueLabel="条"
          series={[{ key: "records", label: "记录数" }]}
          rows={item.weekly.map((value, index) => ({ id: `w${index}`, label: `第 ${index + 1} 周`, values: { records: value } }))}
        />
        <Section className="grid content-start gap-(--qy-field-group-gap)">
          <SectionHeader className="mb-0"><SectionTitle level={2}>信息</SectionTitle></SectionHeader>
          <DescriptionList>
            <DescriptionListItem>
              <DescriptionListTerm>标识</DescriptionListTerm>
              <DescriptionListDetail>
                <Inline gap="field">
                  <code className="font-mono">{item.id}</code>
                  <CopyButton aria-label={`复制标识 ${item.id}`} shape="icon" size="sm" variant="quiet" value={item.id} />
                </Inline>
              </DescriptionListDetail>
            </DescriptionListItem>
            <DescriptionListItem>
              <DescriptionListTerm>负责人</DescriptionListTerm>
              <DescriptionListDetail>
                <Inline gap="field">
                  <Avatar size="xs" label={item.owner}><AvatarFallback>{item.owner.slice(0, 1)}</AvatarFallback></Avatar>
                  {item.owner}
                </Inline>
              </DescriptionListDetail>
            </DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>占用</DescriptionListTerm><DescriptionListDetail className="numeric">{item.size} GB</DescriptionListDetail></DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>保留</DescriptionListTerm><DescriptionListDetail className="numeric">{item.retention} 天</DescriptionListDetail></DescriptionListItem>
            <DescriptionListItem><DescriptionListTerm>自动同步</DescriptionListTerm><DescriptionListDetail>{savedAuto ? "已开启（每 15 分钟）" : "已暂停"}</DescriptionListDetail></DescriptionListItem>
          </DescriptionList>
        </Section>
      </TabsPanel>

      <TabsPanel value="runs" className="grid gap-(--qy-section-gap) pt-(--qy-field-group-gap)">
        <ScatterChart
          framed={false}
          label="近期批次写入量与耗时"
          xLabel="写入条数"
          yLabel="耗时（秒）"
          formatX={(value) => `${number.format(value)} 条`}
          formatY={(value) => `${value} 秒`}
          series={[{ key: "batches", label: "同步批次", points: LATENCY_POINTS }]}
        />
        {runs.length ? (
          <div className="ws-column pt-0">
            <Timeline>
              {runs.map((run) => (
                <TimelineItem key={run.id}>
                  <TimelineTime dateTime={run.at}>今天 {run.time}</TimelineTime>
                  <TimelineTitle>
                    <Inline gap="field">
                      <span>{run.state}</span>
                      {run.failed > 0 && <SeverityMark level={run.failed >= 5 ? 3 : 2} tone={run.failed >= 5 ? "danger" : "warning"} label={`${run.failed} 条失败`} />}
                    </Inline>
                  </TimelineTitle>
                  <TimelineDescription>
                    写入 {number.format(run.written)} 条{run.failed ? ` · ${run.failed} 条失败` : ""} · 用时 {run.duration}
                  </TimelineDescription>
                </TimelineItem>
              ))}
            </Timeline>
          </div>
        ) : (
          <Empty state="empty">
            <EmptyTitle level={2}>今天还没有同步</EmptyTitle>
            <EmptyActions>
              <Button variant="bordered" disabled={syncing} onClick={() => triggerSync([item.id])}>立即触发一次</Button>
            </EmptyActions>
          </Empty>
        )}
      </TabsPanel>

      <TabsPanel value="fields" className="ws-bleed">
        <TableContainer framed={false}>
          <Table aria-label="字段">
            <TableHeader><TableRow><TableHead>字段</TableHead><TableHead>类型</TableHead><TableHead>必填</TableHead><TableHead>示例</TableHead></TableRow></TableHeader>
            <TableBody>
              {FIELDS.map((field) => (
                <TableRow key={field.name}>
                  <TableHead scope="row" className="font-mono">{field.name}</TableHead>
                  <TableCell><Badge>{field.type}</Badge></TableCell>
                  <TableCell className="text-muted-foreground">{field.required ? "必填" : "—"}</TableCell>
                  <TableCell className="font-mono text-muted-foreground">{field.sample}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </TabsPanel>

      <TabsPanel value="api" className="ws-column grid gap-(--qy-section-gap)">
        <Section className="grid gap-(--qy-field-group-gap)">
          <SectionHeader className="mb-0"><SectionTitle level={2}>接入凭据</SectionTitle></SectionHeader>
          <Field>
            <FieldLabel>写入端点</FieldLabel>
            <Inline gap="field" className="w-full">
              <Input readOnly value={endpoint} className="font-mono" />
              <CopyButton aria-label="复制写入端点" variant="bordered" value={endpoint}>复制</CopyButton>
            </Inline>
          </Field>
          <Field>
            <FieldLabel>集合密钥（示例）</FieldLabel>
            <Inline gap="field" className="w-full">
              <PasswordInput readOnly value={tokenValue} className="font-mono" />
              <CopyButton aria-label="复制集合密钥" variant="bordered" value={tokenValue}>复制</CopyButton>
            </Inline>
            <FieldDescription>示例密钥仅作演示，不对应任何线上服务。</FieldDescription>
          </Field>
        </Section>
        <Section className="grid gap-(--qy-field-group-gap)">
          <SectionHeader className="mb-0">
            <SectionTitle level={2}>触发同步示例</SectionTitle>
            <SegmentedControl aria-label="示例语言" size="sm" value={sdkLang} onValueChange={(value) => setSdkLang(String(value))}>
              <SegmentedControlItem value="curl">cURL</SegmentedControlItem>
              <SegmentedControlItem value="ts">TypeScript</SegmentedControlItem>
            </SegmentedControl>
          </SectionHeader>
          <CodeBlock language={sdkLang === "curl" ? "bash" : "TypeScript"} code={sdkLang === "curl" ? curlSnippet : tsSnippet} />
        </Section>
      </TabsPanel>

      <TabsPanel value="settings" className="ws-column grid gap-(--qy-section-gap)">
        <Section className="grid gap-(--qy-field-group-gap)">
          <SectionHeader className="mb-0"><SectionTitle level={2}>基本</SectionTitle></SectionHeader>
          <div className="grid gap-(--qy-field-group-gap)">
            <Field><FieldLabel>名称</FieldLabel><Input value={name} onChange={(event) => setName(event.target.value)} /></Field>
            <Field>
              <FieldLabel>保留天数</FieldLabel>
              <NumberField value={retention} onValueChange={setRetention} min={7} max={3650}>
                <NumberFieldGroup><NumberFieldDecrement /><NumberFieldInput /><NumberFieldIncrement /></NumberFieldGroup>
              </NumberField>
            </Field>
            <Field>
              <FieldLabel>分类标签</FieldLabel>
              <TagInput value={tags} onValueChange={setTags} />
            </Field>
          </div>
          <Field orientation="horizontal">
            <Switch checked={auto} onCheckedChange={setAuto} />
            <FieldContent><FieldLabel>按计划自动同步</FieldLabel><FieldDescription>每 15 分钟一次</FieldDescription></FieldContent>
          </Field>
          <Inline gap="actions">
            <Button
              disabled={!dirty || !name.trim()}
              onClick={() => updateCollection(item.id, { name, retention: retention ?? item.retention, autoSync: auto, tags })}
            >
              保存
            </Button>
            <Button
              variant="quiet"
              disabled={!dirty}
              onClick={() => {
                setName(item.name);
                setRetention(item.retention);
                setAuto(savedAuto);
                setTags(savedTags);
              }}
            >
              放弃更改
            </Button>
          </Inline>
        </Section>
        <Section className="ws-danger grid justify-items-start gap-(--qy-field-group-gap)">
          <div className="grid min-w-0 gap-(--qy-field-gap)">
            <SectionTitle level={2}>删除集合</SectionTitle>
            <p className="m-0 text-support text-muted-foreground">{number.format(item.records)} 条记录与全部同步历史将一并删除，无法恢复。</p>
          </div>
          <ConfirmAction
            tone="danger"
            snapshot={{ objectId: item.id, objectLabel: item.name, version: item.synced, change: "删除", consequence: `${number.format(item.records)} 条记录与全部同步历史将一并删除，无法恢复。` }}
            title={`删除${item.name}`}
            triggerLabel="删除集合"
            actionLabel="删除"
            confirmationText={item.name}
            confirmationLabel={`输入「${item.name}」以确认`}
            onConfirm={() => {
              deleteCollection(item.id);
              navigate("/collections");
            }}
          />
        </Section>
      </TabsPanel>
    </Tabs>
  </div>;
}
