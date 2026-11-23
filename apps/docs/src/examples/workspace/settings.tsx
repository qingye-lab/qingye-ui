import * as React from "react";
import { useParams } from "react-router-dom";
import { IconUserPlus } from "@tabler/icons-react";
import { Link as RouterLink } from "@/components/locale-link";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Button, buttonVariants } from "@qingye_lab/ui/components/button";
import { Dialog, DialogClose, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@qingye_lab/ui/components/dialog";
import { Empty, EmptyActions, EmptyTitle } from "@qingye_lab/ui/components/empty";
import { Field, FieldDescription, FieldError, FieldLabel } from "@qingye_lab/ui/components/field";
import { Form } from "@qingye_lab/ui/components/form";
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
import { WorkspaceHeaderPortal } from "@qingye_lab/ui/components/workspace";
import { type Member } from "./data";
import "./workspace.css";
import { BASE, SETTINGS } from "./shell";
import { useWorkspaceStore } from "./store";

/*
 * 设置：左侧二级导航按任务分组；正文是一栏表单（40 材以内），字段上下排、保存紧跟在它保存的字段之下。
 * 全部改动直连工作区共享状态，邀请成员弹出 Dialog 并实时加入成员列表。
 */

const REGIONS = ["华东（上海）", "华北（北京）", "华南（深圳）"];
const ROLES: Member["role"][] = ["所有者", "管理员", "成员"];
const INVITABLE_ROLES: Member["role"][] = ["管理员", "成员"];
const PERMISSIONS: TreeNode[] = [
  { id: "data", label: "集合数据", children: [{ id: "data.read", label: "查看记录" }, { id: "data.write", label: "编辑记录" }, { id: "data.export", label: "导出" }] },
  { id: "sync", label: "同步", children: [{ id: "sync.run", label: "手动同步" }, { id: "sync.schedule", label: "修改计划" }] },
  { id: "admin", label: "工作区", children: [{ id: "admin.invite", label: "邀请成员" }, { id: "admin.delete", label: "删除工作区（仅所有者）", disabled: true }] },
];

function SettingsGroup({ title, children, onSave, dirty }: { title?: string; children: React.ReactNode; onSave?: () => void; dirty?: boolean }) {
  return <Section className="grid gap-(--qy-field-group-gap)">
    {title && <SectionHeader className="mb-0"><SectionTitle level={2}>{title}</SectionTitle></SectionHeader>}
    {children}
    {onSave && <Inline gap="actions"><Button disabled={!dirty} onClick={onSave}>保存</Button></Inline>}
  </Section>;
}

export default function Settings() {
  const { workspaceName, region: savedRegion, members, setWorkspaceGeneral, inviteMember, updateMemberRole } = useWorkspaceStore();
  const [name, setName] = React.useState(workspaceName);
  const [region, setRegion] = React.useState(savedRegion);
  const [checked, setChecked] = React.useState<string[]>(["data.read", "data.export", "sync.run"]);
  const [savedChecked, setSavedChecked] = React.useState<string[]>(["data.read", "data.export", "sync.run"]);
  const [notify, setNotify] = React.useState({ failed: true, weekly: true, members: false });

  // 邀请成员弹窗
  const [inviteOpen, setInviteOpen] = React.useState(false);
  const [inviteName, setInviteName] = React.useState("");
  const [inviteEmail, setInviteEmail] = React.useState("");
  const [inviteRole, setInviteRole] = React.useState<Member["role"]>("成员");
  const [inviteError, setInviteError] = React.useState<{ name?: string; email?: string }>({});

  const notifyId = React.useId();

  React.useEffect(() => {
    setName(workspaceName);
    setRegion(savedRegion);
  }, [workspaceName, savedRegion]);

  const { section = "general" } = useParams();
  if (!SETTINGS.some((item) => item.id === section)) {
    return <div className="mx-auto grid w-full max-w-[80rem] px-(--qy-page-gutter) py-(--qy-section-gap)">
      <Empty state="not-applicable"><EmptyTitle level={1}>没有这个页面</EmptyTitle><EmptyActions><RouterLink to={BASE} className={buttonVariants({ variant: "bordered" })}>回到概览</RouterLink></EmptyActions></Empty>
    </div>;
  }

  const label = SETTINGS.find((item) => item.id === section)!.label;
  const permissionsDirty = [...checked].sort().join(",") !== [...savedChecked].sort().join(",");

  const handleInvite = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const errs: { name?: string; email?: string } = {};
    if (!inviteName.trim()) errs.name = "请填写成员姓名";
    if (!inviteEmail.trim() || !inviteEmail.includes("@")) errs.email = "请填写有效的邮箱地址";
    else if (members.some((m) => m.email.toLowerCase() === inviteEmail.trim().toLowerCase())) errs.email = "该邮箱已在成员列表中";
    if (errs.name || errs.email) {
      setInviteError(errs);
      return;
    }
    inviteMember({ name: inviteName, email: inviteEmail, role: inviteRole });
    setInviteOpen(false);
    setInviteName("");
    setInviteEmail("");
    setInviteRole("成员");
    setInviteError({});
  };

  return <div className="ws-settings grid w-full gap-(--qy-section-gap) px-(--qy-page-gutter) py-(--qy-section-gap)">
    <h1 className="ws-page-title">{label}</h1>

    {section === "general" && (
      <SettingsGroup
        dirty={name !== workspaceName || region !== savedRegion}
        onSave={() => setWorkspaceGeneral(name, region)}
      >
        <div className="grid gap-(--qy-field-group-gap)">
          <Field><FieldLabel>工作区名称</FieldLabel><Input value={name} onChange={(event) => setName(event.target.value)} /></Field>
          <Field>
            <FieldLabel>数据所在区域</FieldLabel>
            <Select<string> items={REGIONS.map((item) => ({ value: item, label: item }))} value={region} onValueChange={(value) => value && setRegion(value)}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectPopup>{REGIONS.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectPopup>
            </Select>
            <FieldDescription>更换区域会迁移全部集合，期间暂停同步。</FieldDescription>
          </Field>
        </div>
      </SettingsGroup>
    )}

    {section === "members" && (
      <>
        <WorkspaceHeaderPortal>
          <Button variant="bordered" onClick={() => setInviteOpen(true)}><IconUserPlus aria-hidden="true" />邀请</Button>
        </WorkspaceHeaderPortal>
        <TableContainer framed={false}>
          <Table aria-label="成员列表">
            <TableCaption>{members.length} 位成员</TableCaption>
            <TableHeader><TableRow><TableHead>成员</TableHead><TableHead>邮箱</TableHead><TableHead className="w-[calc(8*var(--qy-cai))]">角色</TableHead></TableRow></TableHeader>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableHead scope="row">
                    <Inline gap="field">
                      <Avatar size="xs" label={member.name}><AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback></Avatar>
                      {member.name}
                    </Inline>
                  </TableHead>
                  <TableCell className="text-muted-foreground">{member.email}</TableCell>
                  <TableCell>
                    <Select<Member["role"]>
                      items={ROLES.map((item) => ({ value: item, label: item }))}
                      value={member.role}
                      disabled={member.role === "所有者"}
                      onValueChange={(value) => { if (value) updateMemberRole(member.id, value); }}
                    >
                      <SelectTrigger aria-label={`${member.name}的角色`}><SelectValue /></SelectTrigger>
                      <SelectPopup>{INVITABLE_ROLES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectPopup>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={inviteOpen} onOpenChange={(open) => { setInviteOpen(open); if (!open) setInviteError({}); }}>
          <DialogPopup>
            <Form noValidate onSubmit={handleInvite}>
              <DialogHeader>
                <DialogTitle>邀请成员</DialogTitle>
                <DialogDescription>新成员将按「默认权限」中的勾选配置获得初始访问范围。</DialogDescription>
              </DialogHeader>
              <DialogPanel className="grid gap-(--qy-field-group-gap)">
                <Field invalid={!!inviteError.name} name="inviteName">
                  <FieldLabel>姓名</FieldLabel>
                  <Input
                    placeholder="例如：周宁"
                    value={inviteName}
                    onChange={(event) => {
                      setInviteName(event.target.value);
                      if (inviteError.name) setInviteError(({ name: _, ...rest }) => rest);
                    }}
                  />
                  {inviteError.name && <FieldError>{inviteError.name}</FieldError>}
                </Field>
                <Field invalid={!!inviteError.email} name="inviteEmail">
                  <FieldLabel>工作邮箱</FieldLabel>
                  <Input
                    type="email"
                    placeholder="zhou@qingye.dev"
                    value={inviteEmail}
                    onChange={(event) => {
                      setInviteEmail(event.target.value);
                      if (inviteError.email) setInviteError(({ email: _, ...rest }) => rest);
                    }}
                  />
                  {inviteError.email && <FieldError>{inviteError.email}</FieldError>}
                </Field>
                <Field name="inviteRole">
                  <FieldLabel>角色</FieldLabel>
                  <Select<Member["role"]> items={INVITABLE_ROLES.map((item) => ({ value: item, label: item }))} value={inviteRole} onValueChange={(value) => value && setInviteRole(value)}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectPopup>{INVITABLE_ROLES.map((item) => <SelectItem key={item} value={item}>{item}</SelectItem>)}</SelectPopup>
                  </Select>
                </Field>
              </DialogPanel>
              <DialogFooter>
                <DialogClose>取消</DialogClose>
                <Button type="submit">发送邀请</Button>
              </DialogFooter>
            </Form>
          </DialogPopup>
        </Dialog>
      </>
    )}

    {section === "permissions" && (
      <SettingsGroup
        title="新成员的默认权限"
        dirty={permissionsDirty}
        onSave={() => {
          setSavedChecked(checked);
          toastManager.add({ title: `已保存默认权限（共 ${checked.length} 项）`, type: "success" });
        }}
      >
        <Tree aria-label="默认权限" nodes={PERMISSIONS} checkable checkedIds={checked} onCheckedChange={setChecked} defaultExpandedIds={["data", "sync", "admin"]} />
      </SettingsGroup>
    )}

    {section === "notifications" && (
      <Section>
        <ul className="m-0 list-none p-0">
          {([["failed", "同步失败"], ["weekly", "每周摘要"], ["members", "成员变动"]] as const).map(([key, itemLabel]) => (
            <Item key={key} render={<li />} className="border-b border-border last:border-b-0">
              <ItemContent><Label htmlFor={`${notifyId}-${key}`}>{itemLabel}</Label></ItemContent>
              <ItemActions>
                <Switch
                  id={`${notifyId}-${key}`}
                  checked={notify[key]}
                  onCheckedChange={(value) => {
                    setNotify((current) => ({ ...current, [key]: value }));
                    toastManager.add({ title: `${itemLabel}通知已${value ? "开启" : "关闭"}`, type: "info" });
                  }}
                />
              </ItemActions>
            </Item>
          ))}
        </ul>
      </Section>
    )}
  </div>;
}
