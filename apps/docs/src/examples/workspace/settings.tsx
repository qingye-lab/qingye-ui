import * as React from "react";
import { useParams } from "react-router-dom";
import { IconUserPlus } from "@tabler/icons-react";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Button } from "@qingye_lab/ui/components/button";
import { Field, FieldDescription, FieldLabel } from "@qingye_lab/ui/components/field";
import { Input } from "@qingye_lab/ui/components/input";
import { Item, ItemActions, ItemContent } from "@qingye_lab/ui/components/item";
import { Label } from "@qingye_lab/ui/components/label";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Section, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye_lab/ui/components/select";
import { Switch } from "@qingye_lab/ui/components/switch";
import { Table, TableBody, TableCaption, TableCell, TableContainer, TableHead, TableHeader, TableRow } from "@qingye_lab/ui/components/table";
import { toastManager } from "@qingye_lab/ui/components/toast";
import { Tree, type TreeNode } from "@qingye_lab/ui/components/tree";
import { Link as RouterLink } from "@/components/locale-link";
import { buttonVariants } from "@qingye_lab/ui/components/button";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { MEMBERS, type Member } from "./data";
import "./workspace.css";
import { WorkspaceHeaderPortal } from "@qingye_lab/ui/components/workspace";
import { BASE, SETTINGS } from "./shell";

/*
 * 设置（2026-10-30 重做）：左侧二级导航按任务分组；正文是一栏表单（40 材以内），字段上下排、保存紧跟在它保存的字段之下，
 * 改动在组内保存，不把无关设置绑在一个「保存」上。不套卡片：一页只有一组，围合没有要区分的东西（NG4）。
 */

const REGIONS = ["华东（上海）", "华北（北京）", "华南（深圳）"];
const ROLES: Member["role"][] = ["所有者", "管理员", "成员"];
const PERMISSIONS: TreeNode[] = [
  { id: "data", label: "集合数据", children: [{ id: "data.read", label: "查看记录" }, { id: "data.write", label: "编辑记录" }, { id: "data.export", label: "导出" }] },
  { id: "sync", label: "同步", children: [{ id: "sync.run", label: "手动同步" }, { id: "sync.schedule", label: "修改计划" }] },
  { id: "admin", label: "工作区", children: [{ id: "admin.invite", label: "邀请成员" }, { id: "admin.delete", label: "删除工作区（仅所有者）", disabled: true }] },
];

/** 一组设置：库的 Section，标题只在它说出导航没说的东西时才写（如「新成员的」）。保存在字段之下、与字段同一条左缘。 */
function SettingsGroup({ title, children, onSave, dirty }: { title?: string; children: React.ReactNode; onSave?: () => void; dirty?: boolean }) {
  return <Section className="grid gap-(--qy-field-group-gap)">
    {title && <SectionHeader className="mb-0"><SectionTitle level={2}>{title}</SectionTitle></SectionHeader>}
    {children}
    {onSave && <Inline gap="actions"><Button disabled={!dirty} onClick={onSave}>保存</Button></Inline>}
  </Section>;
}

export default function Settings() {
  const [name, setName] = React.useState("青野工作区");
  const [region, setRegion] = React.useState(REGIONS[0]!);
  const [saved, setSaved] = React.useState({ name: "青野工作区", region: REGIONS[0]! });
  const [roles, setRoles] = React.useState(() => Object.fromEntries(MEMBERS.map(member => [member.id, member.role])) as Record<string, Member["role"]>);
  const [checked, setChecked] = React.useState<string[]>(["data.read", "data.export", "sync.run"]);
  const [notify, setNotify] = React.useState({ failed: true, weekly: true, members: false });
  const save = (title: string) => toastManager.add({ title, type: "success" });
  const notifyId = React.useId();

  const { section = "general" } = useParams();
  if (!SETTINGS.some(item => item.id === section)) return <div className="mx-auto grid w-full max-w-[80rem] px-(--qy-page-gutter) py-(--qy-section-gap)">
    <Empty state="not-applicable"><EmptyTitle level={1}>没有这个页面</EmptyTitle><EmptyActions><RouterLink to={BASE} className={buttonVariants({ variant: "bordered" })}>回到概览</RouterLink></EmptyActions></Empty>
  </div>;
  // 正文一栏：页题是这一组的名字（面包屑在顶栏里很小，页题让这一页一眼可认），其下是这一组。
  const label = SETTINGS.find(item => item.id === section)!.label;
  return <div className="ws-settings grid w-full gap-(--qy-section-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <h1 className="ws-page-title">{label}</h1>
    {section === "general" && <>
        <SettingsGroup dirty={name !== saved.name || region !== saved.region} onSave={() => { setSaved({ name, region }); save("已保存常规设置"); }}>
          <div className="grid gap-(--qy-field-group-gap)">
            <Field><FieldLabel>工作区名称</FieldLabel><Input value={name} onChange={event => setName(event.target.value)} /></Field>
            <Field><FieldLabel>数据所在区域</FieldLabel>
              <Select<string> items={REGIONS.map(item => ({ value: item, label: item }))} value={region} onValueChange={value => value && setRegion(value)}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectPopup>{REGIONS.map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectPopup>
              </Select>
              <FieldDescription>更换区域会迁移全部集合，期间暂停同步。</FieldDescription>
            </Field>
          </div>
        </SettingsGroup>
    </>}
    {section === "members" && <>
        {/* 邀请是这一页的主要动作，进顶栏；表的名字只留成员数。 */}
        <WorkspaceHeaderPortal><Button variant="bordered"><IconUserPlus aria-hidden="true" />邀请</Button></WorkspaceHeaderPortal>
        <TableContainer framed={false}>
          <Table>
            <TableCaption>{MEMBERS.length} 位成员</TableCaption>
            <TableHeader><TableRow><TableHead>成员</TableHead><TableHead>邮箱</TableHead><TableHead className="w-[calc(8*var(--qy-cai))]">角色</TableHead></TableRow></TableHeader>
            <TableBody>{MEMBERS.map(member => <TableRow key={member.id}>
              <TableHead scope="row"><Inline gap="field"><Avatar size="xs" label={member.name}><AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback></Avatar>{member.name}</Inline></TableHead>
              <TableCell className="text-muted-foreground">{member.email}</TableCell>
              <TableCell>
                <Select<Member["role"]> items={ROLES.map(item => ({ value: item, label: item }))} value={roles[member.id]!} disabled={member.role === "所有者"} onValueChange={value => { if (value) { setRoles(current => ({ ...current, [member.id]: value })); save(`${member.name}已改为${value}`); } }}>
                  <SelectTrigger aria-label={`${member.name}的角色`}><SelectValue /></SelectTrigger>
                  <SelectPopup>{ROLES.filter(item => item !== "所有者").map(item => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectPopup>
                </Select>
              </TableCell>
            </TableRow>)}</TableBody>
          </Table>
        </TableContainer>
    </>}
    {section === "permissions" && <>
        <SettingsGroup title="新成员的默认权限" dirty onSave={() => save("已保存默认权限")}>
          <Tree aria-label="默认权限" nodes={PERMISSIONS} checkable checkedIds={checked} onCheckedChange={setChecked} defaultExpandedIds={["data", "sync", "admin"]} />
        </SettingsGroup>
    </>}
    {section === "notifications" && <>
      {/* 设置列表：名称在左、开关在右，行与行之间一道清墨线——与表格行同一种疏密。名称是开关的标签（htmlFor + id），点名称也能切换。 */}
      <Section>
        <ul className="m-0 list-none p-0">
          {([["failed", "同步失败"], ["weekly", "每周摘要"], ["members", "成员变动"]] as const).map(([key, label]) =>
            <Item key={key} render={<li />} className="border-b border-border last:border-b-0">
              <ItemContent><Label htmlFor={`${notifyId}-${key}`}>{label}</Label></ItemContent>
              <ItemActions><Switch id={`${notifyId}-${key}`} checked={notify[key]} onCheckedChange={value => setNotify(current => ({ ...current, [key]: value }))} /></ItemActions>
            </Item>)}
        </ul>
      </Section>
    </>}
  </div>;
}
