import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { Button } from "@qingye/ui/components/button";
import { ButtonGroup } from "@qingye/ui/components/button-group";
import { ButtonProtection } from "@qingye/ui/components/button";
import { Card } from "@qingye/ui/components/card";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye/ui/components/description-list";
import { Field, FieldDescription, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { Inline, Stack } from "@qingye/ui/components/layout";
import { NativeSelect } from "@qingye/ui/components/native-select";
import { TagInput } from "@qingye/ui/components/tag-input";
import { Textarea } from "@qingye/ui/components/textarea";
import { Heading, Text } from "@qingye/ui/components/typography";
import { CircleAlertIcon } from "lucide-react";

/* 编辑详情：验证 InputGroup / Readonly / Disabled / Validation / Unsaved /
 * Saving / Failure / Unknown result / Cancel / Return 在一个真实编辑界面里是否成立。
 *
 * 三条必须成立的：**未保存的更改不会因为离开而消失**；**失败后草稿仍在**；
 * **结果未知不宣称失败、也不宣称成功**，并且给出核实入口而不是默认重试。 */

type Draft = { name: string; endpoint: string; retention: string; tags: string[]; note: string };
type Status = "clean" | "dirty" | "saving" | "failed" | "unknown";

const ORIGINAL: Draft = { name: "接入设备", endpoint: "qingye.dev/ingest", retention: "90", tags: ["设备", "同步"], note: "每台设备接入时写入一条记录。" };

export default function DetailPage() {
  const [draft, setDraft] = React.useState<Draft>(ORIGINAL);
  const [status, setStatus] = React.useState<Status>("clean");

  const dirty = JSON.stringify(draft) !== JSON.stringify(ORIGINAL);
  const endpointInvalid = draft.endpoint.length > 0 && !/^[a-z0-9.-]+(\/[a-z0-9-]+)*$/.test(draft.endpoint);

  const edit = (patch: Partial<Draft>) => { setDraft(value => ({ ...value, ...patch })); setStatus(previous => previous === "saving" ? previous : "dirty"); };
  const save = () => {
    if (endpointInvalid) return;
    setStatus("saving");
    // 演示三种结果；真实结果由应用的后端决定，组件不推断。
    window.setTimeout(() => setStatus(Math.random() < 0.5 ? "failed" : "clean"), 900);
  };

  return <main id="main" tabIndex={-1} className="mx-auto grid w-full max-w-[60rem] gap-(--qy-section-gap) px-(--qy-page-gutter) pt-(--qy-section-gap) pb-[calc(var(--qy-section-gap)+3rem)]">
    <Stack gap="fields">
      <Heading level={1} step="chapter">{draft.name || "未命名集合"}</Heading>
      <Text step="reading" className="text-muted-foreground">编辑这个集合的接入方式与保留策略。</Text>
    </Stack>

    {/* 失败与未知是两种事实，分开表达。未知不宣称失败，主入口是核实而不是重试。 */}
    {status === "failed" && <Alert tone="danger">
      <CircleAlertIcon aria-hidden="true" className="mt-[0.1875em] size-(--qy-control-md-icon) shrink-0" />
      <div className="grid gap-1">
        <AlertTitle>保存失败</AlertTitle>
        <AlertDescription>你填的内容仍在下方，没有丢失。可以重新保存。</AlertDescription>
      </div>
    </Alert>}
    {status === "unknown" && <Alert tone="warning">
      <CircleAlertIcon aria-hidden="true" className="mt-[0.1875em] size-(--qy-control-md-icon) shrink-0" />
      <div className="grid gap-1">
        <AlertTitle>结果尚未核实</AlertTitle>
        <AlertDescription>请求已发出但没有收到确认。先核实服务端当前的值，再决定是否需要重新保存——直接重试可能写入两次。</AlertDescription>
      </div>
      <Button variant="bordered" size="sm" onClick={() => setStatus("clean")}>核实当前值</Button>
    </Alert>}

    <Card className="p-(--qy-panel-padding)">
      <Stack gap="fields">
        <Heading level={2} step="heading">接入</Heading>
        <Field invalid={endpointInvalid}>
          <FieldLabel>接入地址</FieldLabel>
          {/* 共同边界：前缀不是可编辑内容，因此是附件而不是输入的一部分。 */}
          <InputGroup>
            <InputGroupAddon>https://</InputGroupAddon>
            <InputGroupInput value={draft.endpoint} onChange={event => edit({ endpoint: event.target.value })} aria-invalid={endpointInvalid} />
          </InputGroup>
          {endpointInvalid && <FieldError>只能使用小写字母、数字、点与连字符。</FieldError>}
        </Field>
        <Field>
          <FieldLabel>集合标识（只读）</FieldLabel>
          <Input value="devices" readOnly />
          <FieldDescription>创建后不可更改。</FieldDescription>
        </Field>
        <Field disabled>
          <FieldLabel>所属组织（禁用）</FieldLabel>
          <Input value="青野科技" />
          <FieldDescription>需要管理员权限才能更改此字段。</FieldDescription>
        </Field>
      </Stack>
    </Card>

    <Card className="p-(--qy-panel-padding)">
      <Stack gap="fields">
        <Heading level={2} step="heading">保留与分类</Heading>
        <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
          <Field>
            <FieldLabel>保留天数</FieldLabel>
            <NativeSelect value={draft.retention} onChange={event => edit({ retention: event.target.value })}>
              <option value="30">30 天</option>
              <option value="90">90 天</option>
              <option value="365">365 天</option>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel>名称</FieldLabel>
            <Input value={draft.name} onChange={event => edit({ name: event.target.value })} />
          </Field>
        </div>
        <Field>
          <FieldLabel>分类</FieldLabel>
          <TagInput value={draft.tags} onValueChange={tags => edit({ tags })} />
        </Field>
        <Field>
          <FieldLabel>说明</FieldLabel>
          <Textarea rows={2} value={draft.note} onChange={event => edit({ note: event.target.value })} />
        </Field>
      </Stack>
    </Card>

    <Card className="p-(--qy-panel-padding)">
      <Stack gap="fields">
        <Heading level={2} step="heading">原始值</Heading>
        <DescriptionList>
          <DescriptionListItem><DescriptionListTerm>接入地址</DescriptionListTerm><DescriptionListDetail className="numeric">{ORIGINAL.endpoint}</DescriptionListDetail></DescriptionListItem>
          <DescriptionListItem><DescriptionListTerm>保留天数</DescriptionListTerm><DescriptionListDetail className="numeric">{ORIGINAL.retention} 天</DescriptionListDetail></DescriptionListItem>
          <DescriptionListItem><DescriptionListTerm>最近修改</DescriptionListTerm><DescriptionListDetail>2026-10-04 14:20 · 陈致远</DescriptionListDetail></DescriptionListItem>
        </DescriptionList>
      </Stack>
    </Card>

    {/* 动作行：状态在动作旁；危险动作用 ButtonProtection 带出可见后果。 */}
    <Stack gap="field" className="sticky bottom-0 border-t border-border bg-background py-(--qy-field-gap)">
      <Inline gap="actions">
        <span className="text-support text-muted-foreground" role="status" data-slot="detail-status">
          {status === "clean" ? "没有未保存的更改" : status === "dirty" ? "有未保存的更改" : status === "saving" ? "正在保存…" : status === "failed" ? "保存失败，更改仍在" : "结果未核实"}
        </span>
        <ButtonGroup className="ms-auto" aria-label="编辑动作">
          <Button variant="quiet" disabled={!dirty || status === "saving"} onClick={() => { setDraft(ORIGINAL); setStatus("clean"); }}>放弃更改</Button>
          <Button disabled={!dirty || endpointInvalid || status === "saving"} state={status === "saving" ? "in-progress" : "idle"} onClick={save}>保存</Button>
        </ButtonGroup>
        {status === "dirty" && <Button variant="quiet" onClick={() => setStatus("unknown")}>模拟结果未知</Button>}
        {status === "dirty" && <Button variant="quiet" onClick={() => setStatus("failed")}>模拟失败</Button>}
      </Inline>
      <ButtonProtection consequence="删除后这个集合的记录会一并移除，无法恢复。">
        <Button tone="danger" disabled={status === "saving"}>删除集合</Button>
        <Button variant="quiet">返回列表</Button>
      </ButtonProtection>
    </Stack>
  </main>;
}
