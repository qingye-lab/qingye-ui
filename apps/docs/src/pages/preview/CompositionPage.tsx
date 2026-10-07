import * as React from "react";
import { Button } from "@qingye/ui/components/button";
import { ButtonGroup } from "@qingye/ui/components/button-group";
import { Checkbox } from "@qingye/ui/components/checkbox";
import { Field, FieldContent, FieldDescription, FieldError, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput } from "@qingye/ui/components/input-group";
import { Inline, Stack } from "@qingye/ui/components/layout";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { SegmentedControl, SegmentedControlItem } from "@qingye/ui/components/segmented-control";
import { Select, SelectItem, SelectPopup, SelectTrigger } from "@qingye/ui/components/select";
import { Prose } from "@qingye/ui/components/prose";
import { Toc, useTocHeadings, useTocScrollSpy } from "@qingye/ui/components/toc";
import { Text } from "@qingye/ui/components/typography";
import { ChevronDownIcon } from "lucide-react";
import { GalleryPage, Row, Section } from "./gallery";

/* 组合：评审 2026-10-05 第二包——「分开摆着都协调，不代表放在同一行里仍协调」。
 * 这一页不新造组件，只把已有组件按真实关系放在一起，检查：
 *   外部对齐与基线、子动作的独立焦点与命中、错误关联、切换密度后是否仍成立。 */

const scopes = [{ value: "all", label: "全部状态" }, { value: "unsynced", label: "未同步" }, { value: "failed", label: "同步失败" }];

export default function CompositionPage() {
  const [query, setQuery] = React.useState("接入");
  const [scope, setScope] = React.useState("all");
  const [onlyMine, setOnlyMine] = React.useState(false);
  const [applied, setApplied] = React.useState({ query: "", scope: "all", onlyMine: false });
  const [quota, setQuota] = React.useState("1200");
  const [saveState, setSaveState] = React.useState<"idle" | "in-progress">("idle");

  const dirty = query !== applied.query || scope !== applied.scope || onlyMine !== applied.onlyMine;
  const hasApplied = Boolean(applied.query) || applied.scope !== "all" || applied.onlyMine;
  const quotaNumber = Number(quota);
  const quotaInvalid = quota !== "" && (!Number.isInteger(quotaNumber) || quotaNumber < 1 || quotaNumber > 1000);

  // 目录读文章自己的标题，不手写第二份列表；当前项跟随整页滚动——这是一篇真实流动的长文，
  // 不是关在小盒子里的演示区（可滚动盒子的用法见 Toc 自己的 playground 示例）。
  const articleRef = React.useRef<HTMLDivElement>(null);
  const headings = useTocHeadings(articleRef);
  const currentHeading = useTocScrollSpy(headings);

  return <GalleryPage>
    <Section title="同一行里的不同控件">
      <Row label="混合行" block lead="control">
        {/* 只有这一行没有字段标签：标签会把输入框往下推，那是另一种对齐，见下面「搜索与筛选」。 */}
        <Inline gap="actions" align="center" data-slot="mixed-row">
          <Input aria-label="名称包含" value={query} onChange={event => setQuery(event.target.value)} className="w-56" controlClassName="w-56" />
          <Select items={scopes} value={scope} onValueChange={value => setScope(String(value))}>
            <SelectTrigger aria-label="状态" />
            <SelectPopup>{scopes.map(item => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectPopup>
          </Select>
          <Field orientation="horizontal"><Checkbox checked={onlyMine} onCheckedChange={setOnlyMine} /><FieldContent><FieldLabel>只看我负责的</FieldLabel></FieldContent></Field>
          <Button variant="bordered">导出</Button>
          <Button>应用</Button>
        </Inline>
      </Row>
    </Section>

    <Section title="保存与更多操作">
      <Row label="主动作 + 菜单">
        <ButtonGroup aria-label="集合动作">
          <Button state={saveState} onClick={() => { setSaveState("in-progress"); window.setTimeout(() => setSaveState("idle"), 900); }}>保存</Button>
          <Menu>
            <MenuTrigger render={<Button variant="bordered" />}>更多<ChevronDownIcon aria-hidden="true" /></MenuTrigger>
            <MenuPortal><MenuPositioner><MenuPopup>
              <MenuItem>另存为模板</MenuItem>
              <MenuItem>复制集合</MenuItem>
              <MenuSeparator />
              <MenuItem disabled>移动到其他工作区</MenuItem>
            </MenuPopup></MenuPositioner></MenuPortal>
          </Menu>
        </ButtonGroup>
      </Row>
    </Section>

    <Section title="搜索、筛选与清除条件">
      <Row label="筛选条" block>
        <Stack gap="field">
          <Inline gap="panel" align="end" className="flex-wrap">
            <Field className="min-w-[14rem] flex-1">
              <FieldLabel>名称包含</FieldLabel>
              <Input type="search" value={query} onChange={event => setQuery(event.target.value)} onClear={() => setQuery("")} />
            </Field>
            <Stack gap="field" align="start">
              <span className="text-label text-foreground" id="scope-label">状态</span>
              <SegmentedControl aria-labelledby="scope-label" value={scope} onValueChange={value => setScope(String(value))}>
                {scopes.map(item => <SegmentedControlItem key={item.value} value={item.value}>{item.label}</SegmentedControlItem>)}
              </SegmentedControl>
            </Stack>
            <ButtonGroup aria-label="筛选动作">
              <Button variant="quiet" disabled={!hasApplied && !dirty} onClick={() => { setQuery(""); setScope("all"); setOnlyMine(false); setApplied({ query: "", scope: "all", onlyMine: false }); }}>清除条件</Button>
              <Button disabled={!dirty} onClick={() => setApplied({ query, scope, onlyMine })}>应用</Button>
            </ButtonGroup>
          </Inline>
          <Inline gap="actions">
            <Text step="support" className="text-muted-foreground">{hasApplied ? `已应用：${scopes.find(item => item.value === applied.scope)?.label}${applied.query ? ` · 名称包含「${applied.query}」` : ""}` : "已应用：全部集合"}</Text>
            {dirty && <Text step="support" className="text-warning-foreground">条件尚未应用</Text>}
          </Inline>
        </Stack>
      </Row>
    </Section>

    <Section title="输入、单位、清除与字段错误">
      <Row label="带单位的值">
        <Field invalid={quotaInvalid} className="w-72">
          <FieldLabel>每日同步上限</FieldLabel>
          <InputGroup>
            <InputGroupInput inputMode="numeric" value={quota} onChange={event => setQuota(event.target.value)} clearable onClear={() => setQuota("")} aria-invalid={quotaInvalid} />
            <InputGroupAddon>条 / 天</InputGroupAddon>
          </InputGroup>
          {quotaInvalid ? <FieldError>上限需要是 1–1000 之间的整数。</FieldError> : <FieldDescription>超过上限的记录留到第二天同步。</FieldDescription>}
        </Field>
      </Row>
    </Section>

    <Section title="联合状态">
      <Row label="焦点 + 选中">
        <SegmentedControl aria-label="对齐" defaultValue="center">
          <SegmentedControlItem value="left">左</SegmentedControlItem>
          <SegmentedControlItem value="center">中</SegmentedControlItem>
          <SegmentedControlItem value="right">右</SegmentedControlItem>
        </SegmentedControl>
        <Field orientation="horizontal"><Checkbox defaultChecked /><FieldContent><FieldLabel>已勾选，Tab 到这里</FieldLabel></FieldContent></Field>
      </Row>
      <Row label="焦点 + 无效">
        <Field invalid className="w-56"><FieldLabel>工作区标识</FieldLabel><Input defaultValue="Qing Ye" aria-invalid /><FieldError>只能使用小写字母、数字与连字符。</FieldError></Field>
      </Row>
    </Section>

    <Section title="长文阅读">
      <Row label="阅读面" block lead="framed-chapter">
        {/* 目录在左、文章在右：两者是同一份标题数据的两种呈现，不是各自维护的列表
         * （经营位置：一屏只有一个版心，目录贴着它，不另起一张纸）。 */}
        <Inline gap="panel" align="start" className="flex-wrap">
          {/* 目录第一项与文章标题同一条行中线：标题在纸内，目录下移一道边线加面板内缘。 */}
          <Toc items={headings} current={currentHeading} className="mt-[calc(1px+var(--qy-panel-padding))] w-44 shrink-0" />
          <div ref={articleRef} className="min-w-0 flex-1">
            <Prose>
              <h2 id="demo-sync-overview">同步失败时，数据会怎样</h2>
              <p>每次同步开始时，青野会先记录本次要处理的范围，再逐条写入。如果在写入 <strong>1,284</strong> 条记录的过程中网络中断，已经写入的部分会保留，未写入的部分留到下一次同步——不会因为一次失败就清空整个集合。</p>
              <h3 id="demo-sync-retry">重试与核实</h3>
              <p>失败记录会在「操作记录」里单独列出，并附上失败原因。你可以在 <a href="#retry">重试设置</a> 里调整自动重试的次数：</p>
              <ul>
                <li>默认重试 3 次，间隔依次为 1、5、15 分钟</li>
                <li>超过次数仍失败，转入人工核实队列，可以手动重新触发或放弃这一条</li>
              </ul>
              <blockquote><p>如果结果显示为「未知」，说明请求已经发出、但没有收到确认。这时直接重试可能写入两次；先在 Webhook 回调或审计日志里核实，再决定下一步。</p></blockquote>
              <h3 id="demo-sync-stats">按失败原因统计</h3>
              <p>最近一次同步的结果如下；命令行用户可以运行 <code>qingye sync --retry-failed --reason=network</code> 只重试网络中断的记录：</p>
              <table>
                <thead><tr><th>原因</th><th align="right">记录数</th></tr></thead>
                <tbody>
                  <tr><td>网络中断</td><td align="right">812</td></tr>
                  <tr><td>字段校验失败</td><td align="right">96</td></tr>
                  <tr><td>结果未知</td><td align="right">14</td></tr>
                </tbody>
              </table>
            </Prose>
          </div>
        </Inline>
      </Row>
    </Section>
  </GalleryPage>;
}
