import * as React from "react";
import { Alert, AlertDescription, AlertTitle } from "@qingye/ui/components/alert";
import { Button } from "@qingye/ui/components/button";
import { ButtonGroup } from "@qingye/ui/components/button-group";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { Inline, Stack } from "@qingye/ui/components/layout";
import { PageHeader, PageHeaderContent, PageHeaderDescription, PageHeaderTitle } from "@qingye/ui/components/page-header";
import { NativeSelect } from "@qingye/ui/components/native-select";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";
import { Switch } from "@qingye/ui/components/switch";
import { Textarea } from "@qingye/ui/components/textarea";
import { Tree, type TreeNode } from "@qingye/ui/components/tree";
import { Heading, Text } from "@qingye/ui/components/typography";
import { CircleAlertIcon } from "lucide-react";

// 成员默认权限：按区域分组，叶子是具体权限。「删除工作区」要求所有者身份，
// 对默认成员禁用——它保留自己被授予的事实，不随区域勾选/取消改变。
const DEFAULT_PERMISSIONS: TreeNode[] = [
  {
    id: "data", label: "工作区数据", children: [
      { id: "data.view", label: "查看记录" },
      { id: "data.edit", label: "编辑记录" },
      { id: "data.delete", label: "删除工作区（仅所有者）", disabled: true },
    ],
  },
  {
    id: "members", label: "成员与权限", children: [
      { id: "members.invite", label: "邀请成员" },
      { id: "members.remove", label: "移除成员" },
    ],
  },
  {
    id: "integrations", label: "集成与密钥", children: [
      { id: "integrations.webhooks", label: "管理回调地址" },
      { id: "integrations.tokens", label: "创建访问令牌" },
    ],
  },
];

/* 设置页：验证 Typography / Field / Input / Select / Checkbox / Switch / Button /
 * Error / Save state 在一个真实表单里是否成立。重点不是控件好不好看，而是：
 *   - 保存态（未改 / 已改 / 保存中 / 失败 / 结果未知）是否说得清；
 *   - 校验错误是否就近、是否与字段关联；
 *   - 一页里按钮是否只有该有的那些（克制的命令层级）。 */

type SaveState = "clean" | "dirty" | "saving" | "failed" | "unknown";

const SAVE_TEXT: Record<SaveState, string> = {
  clean: "没有未保存的更改",
  dirty: "有未保存的更改",
  saving: "正在保存…",
  failed: "保存失败，更改仍在",
  unknown: "结果未知，尚未核实",
};

export default function SettingsPage() {
  const [name, setName] = React.useState("青野科技");
  const [identifier, setIdentifier] = React.useState("qingye");
  const [frequency, setFrequency] = React.useState("daily");
  const [note, setNote] = React.useState("");
  const [notifyFail, setNotifyFail] = React.useState(true);
  const [notifyWeekly, setNotifyWeekly] = React.useState(false);
  const [scope, setScope] = React.useState("team");
  const [permissions, setPermissions] = React.useState<string[]>(["data.view", "data.delete", "members.invite"]);
  const [state, setState] = React.useState<SaveState>("clean");
  const [saved, setSaved] = React.useState({ name, identifier, frequency, note, notifyFail, notifyWeekly, scope, permissions });

  const dirty = name !== saved.name || identifier !== saved.identifier || frequency !== saved.frequency || note !== saved.note || notifyFail !== saved.notifyFail || notifyWeekly !== saved.notifyWeekly || scope !== saved.scope || permissions.length !== saved.permissions.length || permissions.some(id => !saved.permissions.includes(id));
  const identifierInvalid = identifier.length > 0 && !/^[a-z0-9-]+$/.test(identifier);

  const save = () => {
    if (identifierInvalid) return;
    setState("saving");
    window.setTimeout(() => {
      // 这里演示三种结果各自的样子；真实结果由应用的后端决定。
      setSaved({ name, identifier, frequency, note, notifyFail, notifyWeekly, scope, permissions });
      setState("clean");
    }, 900);
  };

  return <main id="main" tabIndex={-1} className="mx-auto grid w-full max-w-[56rem] gap-(--qy-section-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <PageHeader>
      <PageHeaderContent>
        <PageHeaderTitle>工作区设置</PageHeaderTitle>
        <PageHeaderDescription>这些设置对本工作区的所有成员生效。</PageHeaderDescription>
      </PageHeaderContent>
    </PageHeader>

    {state === "failed" && <Alert tone="danger">
      <CircleAlertIcon aria-hidden="true" />
      <div className="grid gap-1">
        <AlertTitle>保存失败</AlertTitle>
        <AlertDescription>网络中断，你填的内容仍在，可以重新保存。</AlertDescription>
      </div>
    </Alert>}

    <section>
      <Stack gap="fields">
        <Heading level={2} step="heading">基本信息</Heading>
        <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
          <Field>
            <FieldLabel>工作区名称</FieldLabel>
            <Input value={name} onChange={event => { setName(event.target.value); setState("dirty"); }} />
          </Field>
          <Field invalid={identifierInvalid}>
            <FieldLabel>工作区标识</FieldLabel>
            <Input value={identifier} onChange={event => { setIdentifier(event.target.value); setState("dirty"); }} aria-invalid={identifierInvalid} />
            {identifierInvalid ? <FieldError>只能使用小写字母、数字与连字符。</FieldError> : <FieldDescription>出现在地址里，创建后不可更改。</FieldDescription>}
          </Field>
        </div>
      </Stack>
    </section>

    <section>
      <Stack gap="fields">
        <Heading level={2} step="heading">同步</Heading>
        <div className="grid gap-(--qy-field-group-gap) sm:grid-cols-2">
          <Field>
            <FieldLabel>同步频率</FieldLabel>
            <NativeSelect value={frequency} onChange={event => { setFrequency(event.target.value); setState("dirty"); }}>
              <option value="hourly">每小时一次</option>
              <option value="daily">每天一次</option>
              <option value="weekly">每周一次</option>
            </NativeSelect>
          </Field>
          <Field>
            <FieldLabel>同步说明</FieldLabel>
            <Textarea rows={2} value={note} onChange={event => { setNote(event.target.value); setState("dirty"); }} placeholder="写给成员的说明" />
          </Field>
        </div>
      </Stack>
    </section>

    <section>
      <Stack gap="fields">
        <Heading level={2} step="heading">通知</Heading>
        <Stack gap="field">
          <Field orientation="horizontal">
            <Checkbox checked={notifyFail} onCheckedChange={checked => { setNotifyFail(checked); setState("dirty"); }} />
            <FieldContent><FieldLabel>同步失败时通知我</FieldLabel></FieldContent>
          </Field>
          <Field orientation="horizontal">
            <Checkbox checked={notifyWeekly} onCheckedChange={checked => { setNotifyWeekly(checked); setState("dirty"); }} />
            <FieldContent><FieldLabel>每周汇总</FieldLabel></FieldContent>
          </Field>
        </Stack>
        <Field>
          <FieldLabel>可见范围</FieldLabel>
          <RadioGroup value={scope} onValueChange={value => { setScope(value); setState("dirty"); }} className="flex-row flex-wrap gap-(--qy-field-group-gap)">
            <Field orientation="horizontal"><Radio value="self" /><FieldContent><FieldLabel>仅自己</FieldLabel></FieldContent></Field>
            <Field orientation="horizontal"><Radio value="team" /><FieldContent><FieldLabel>本团队</FieldLabel></FieldContent></Field>
            <Field orientation="horizontal"><Radio value="all" /><FieldContent><FieldLabel>全工作区</FieldLabel></FieldContent></Field>
          </RadioGroup>
        </Field>
        <Field orientation="horizontal" disabled>
          <Switch disabled />
          <FieldContent><FieldLabel>自动导出（需管理员开启）</FieldLabel></FieldContent>
        </Field>
      </Stack>
    </section>

    <section>
      <Stack gap="fields">
        <Heading level={2} step="heading">成员默认权限</Heading>
        <Tree
          aria-label="成员默认权限"
          nodes={DEFAULT_PERMISSIONS}
          checkable
          defaultExpandedIds={["data", "members", "integrations"]}
          checkedIds={permissions}
          onCheckedChange={ids => { setPermissions(ids); setState("dirty"); }}
        />
      </Stack>
    </section>

    {/* 保存行：状态在动作旁边，动作本身只有「保存」与「放弃更改」两个。 */}
    <Inline gap="actions" className="sticky bottom-0 border-t border-border bg-background py-(--qy-field-gap)">
      <span className="text-support text-muted-foreground" data-slot="settings-save-state" role="status">{SAVE_TEXT[state]}</span>
      <ButtonGroup className="ms-auto" aria-label="保存设置">
        <Button variant="quiet" disabled={!dirty || state === "saving"} onClick={() => { setName(saved.name); setIdentifier(saved.identifier); setFrequency(saved.frequency); setNote(saved.note); setNotifyFail(saved.notifyFail); setNotifyWeekly(saved.notifyWeekly); setScope(saved.scope); setPermissions(saved.permissions); setState("clean"); }}>放弃更改</Button>
        <Button disabled={!dirty || identifierInvalid || state === "saving"} state={state === "saving" ? "in-progress" : "idle"} onClick={save}>保存</Button>
      </ButtonGroup>
      {dirty && state !== "saving" && <Button variant="quiet" onClick={() => setState("failed")} aria-label="模拟保存失败（演示用）">模拟失败</Button>}
    </Inline>
  </main>;
}
