import { useTheme } from "@qingye/ui/components/theme-provider";
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Badge } from "@qingye/ui/components/badge";
import { Button } from "@qingye/ui/components/button";
import { Card } from "@qingye/ui/components/card";
import { Command, CommandCollection, CommandEmpty, CommandFooter, CommandGroup, CommandGroupLabel, CommandInput, CommandItem, CommandList, CommandPanel, CommandShortcut } from "@qingye/ui/components/command";
import { Dialog, DialogDescription, DialogFooter, DialogHeader, DialogPanel, DialogPopup, DialogTitle } from "@qingye/ui/components/dialog";
import { Field, FieldDescription, FieldLabel } from "@qingye/ui/components/field";
import { Input } from "@qingye/ui/components/input";
import { InputGroup, InputGroupAddon, InputGroupInput, InputGroupText } from "@qingye/ui/components/input-group";
import { Kbd } from "@qingye/ui/components/kbd";
import { Label } from "@qingye/ui/components/label";
import { Radio, RadioGroup } from "@qingye/ui/components/radio-group";
import { Select, SelectItem, SelectPopup, SelectTrigger, SelectValue } from "@qingye/ui/components/select";
import { Separator } from "@qingye/ui/components/separator";
import { Switch } from "@qingye/ui/components/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@qingye/ui/components/table";
import { toastManager } from "@qingye/ui/components/toast";
import { CornerDownLeftIcon, FolderPlusIcon, MoonIcon, SettingsIcon, UserPlusIcon } from "lucide-react";
import { Fragment, useId, useState, type ReactNode } from "react";
import { GitHubIcon } from "@/components/logo";
import { SITE } from "@/lib/site";

function SettingRow({ title, description, checked, onCheckedChange }: { title: string; description: string; checked: boolean; onCheckedChange: (checked: boolean) => void }) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-0.5">
        <Label htmlFor={id}>{title}</Label>
        <span className="text-muted-foreground text-caption">{description}</span>
      </div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} id={id} />
    </div>
  );
}

const quietHours = [
  { label: "不设置", value: "none" }, { label: "每天 22:00 – 08:00", value: "night" }, { label: "工作日 19:00 之后", value: "evening" }, ];

const defaultNotifications = { comments: true, weekly: true, updates: false, quiet: "night" };

function NotificationsCard() {
  const [preferences, setPreferences] = useState(defaultNotifications);
  return (
    <Card>
      <header className="grid gap-(--qy-panel-gap)">
        <h3 className="text-heading text-prose">通知</h3>
        <p className="text-body text-muted-foreground">选择你希望收到的提醒。</p>
      </header>
      <div className="p-(--qy-panel-padding) flex flex-col gap-4">
        <SettingRow checked={preferences.comments} onCheckedChange={(comments) => setPreferences((current) => ({ ...current, comments }))} description="有人回复或 @ 你时" title="评论与提及" />
        <SettingRow checked={preferences.weekly} onCheckedChange={(weekly) => setPreferences((current) => ({ ...current, weekly }))} description="每周一上午汇总项目进展" title="每周摘要" />
        <SettingRow checked={preferences.updates} onCheckedChange={(updates) => setPreferences((current) => ({ ...current, updates }))} description="新功能与改进说明" title="产品更新" />
        <Separator className="my-1" />
        <Field>
          <FieldLabel>免打扰时段</FieldLabel>
          <Select value={preferences.quiet} onValueChange={(quiet) => { if (quiet) setPreferences((current) => ({ ...current, quiet })); }} items={quietHours}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectPopup>
              {quietHours.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectPopup>
          </Select>
          <FieldDescription>这段时间内只推送紧急通知。</FieldDescription>
        </Field>
      </div>
      <footer className="flex items-center gap-(--qy-action-gap) p-(--qy-panel-padding) justify-end gap-2">
        <Button onClick={() => setPreferences(defaultNotifications)} size="sm" variant="quiet">
          恢复默认
        </Button>
        <Button onClick={() => toastManager.add({ title: "演示偏好已保存", description: `已启用 ${[preferences.comments, preferences.weekly, preferences.updates].filter(Boolean).length} 类通知。刷新后恢复默认。`, type: "success" })} size="sm">
          保存更改
        </Button>
      </footer>
    </Card>
  );
}

const defaultProject = { name: "年度品牌升级", slug: "brand-2026", visibility: "members" };

function ProjectCard() {
  const [project, setProject] = useState(defaultProject);
  const visibilityId = useId();
  return (
    <form onSubmit={(event) => {
      event.preventDefault();
      if (!project.name.trim() || !project.slug.trim()) return;
      toastManager.add({ title: `已创建“${project.name.trim()}”`, description: `演示项目 · ${project.visibility === "members" ? "仅成员可见" : "组织内可见"} · /${project.slug.trim()}`, type: "success" });
    }}><Card>
      <header className="grid gap-(--qy-panel-gap)">
        <h3 className="text-heading text-prose">新建项目</h3>
        <p className="text-body text-muted-foreground">项目创建后可以随时修改这些设置。</p>
      </header>
      <div className="p-(--qy-panel-padding) flex flex-col gap-4">
        <Field>
          <FieldLabel>项目名称</FieldLabel>
          <Input aria-label="新项目名称" required value={project.name} onChange={(event) => setProject((current) => ({ ...current, name: event.target.value }))} />
        </Field>
        <Field>
          <FieldLabel>访问地址</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>qingye.example/</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput aria-label="访问地址" required pattern="[a-z0-9]+(?:-[a-z0-9]+)*" title="使用小写字母、数字和连字符" value={project.slug} onChange={(event) => setProject((current) => ({ ...current, slug: event.target.value }))} />
          </InputGroup>
        </Field>
        <div className="flex flex-col gap-2.5">
          <span className="font-medium text-body" id={visibilityId}>
            可见范围
          </span>
          <RadioGroup aria-labelledby={visibilityId} className="gap-2.5" value={project.visibility} onValueChange={(visibility) => setProject((current) => ({ ...current, visibility: String(visibility) }))}>
            <Label className="font-normal">
              <Radio value="members" />
              仅项目成员
            </Label>
            <Label className="font-normal">
              <Radio value="org" />
              组织内所有人
            </Label>
          </RadioGroup>
        </div>
      </div>
      <footer className="flex items-center gap-(--qy-action-gap) p-(--qy-panel-padding) justify-end gap-2">
        <Button onClick={() => setProject(defaultProject)} size="sm" variant="quiet" type="button">
          重置
        </Button>
        <Button type="submit" size="sm">
          创建项目
        </Button>
      </footer>
    </Card></form>
  );
}

const members = [
  { name: "林晚", email: "lin.wan@example.com", role: "所有者", status: "online", active: "刚刚" }, { name: "周屿", email: "zhou.yu@example.com", role: "管理员", status: "online", active: "4 分钟前" }, { name: "陈默", email: "chen.mo@example.com", role: "成员", status: "away", active: "1 小时前" }, { name: "许知远", email: "xu.zy@example.com", role: "成员", status: "away", active: "昨天" }, { name: "宋青", email: "song.qing@example.com", role: "成员", status: "invited", active: "—" }, ] as const;

const STATUS = {
  online: { label: "在线", variant: "success" }, away: { label: "离开", variant: "secondary" }, invited: { label: "待接受", variant: "warning" }, } as const;

type Member = { name: string; email: string; role: string; status: keyof typeof STATUS; active: string };

function MembersCard({ inviteOpen, onInviteOpenChange }: { inviteOpen: boolean; onInviteOpenChange: (open: boolean) => void }) {
  const [people, setPeople] = useState<Member[]>([...members]);
  const [email, setEmail] = useState("");
  return (
    <Card className="overflow-hidden">
      <header className="grid gap-(--qy-panel-gap)">
        <h3 className="text-heading text-prose">成员</h3>
        <p className="text-body text-muted-foreground">{people.length} 人 · {people.filter((member) => member.status === "online").length} 人在线</p>
        <div className="flex items-center gap-(--qy-action-gap)">
          <Button onClick={() => onInviteOpenChange(true)} size="sm" variant="quiet">
            <UserPlusIcon aria-hidden="true" />
            邀请
          </Button>
        </div>
      </header>
      <div className="border-t">
        <Table density="compact">
          <TableHeader>
            <TableRow>
              <TableHead className="ps-6">姓名</TableHead>
              <TableHead className="max-sm:hidden">角色</TableHead>
              <TableHead>状态</TableHead>
              <TableHead className="pe-6 text-end max-sm:hidden">最近活跃</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {people.map((member) => {
              const status = STATUS[member.status];
              return (
                <TableRow key={member.email}>
                  <TableCell className="ps-6">
                    <div className="flex items-center gap-2.5">
                      <Avatar size="sm">
                        <AvatarFallback>{member.name.slice(0, 1)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col gap-1">
                        <span className="font-medium">{member.name}</span>
                        <span className="text-muted-foreground text-caption">{member.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-sm:hidden">{member.role}</TableCell>
                  <TableCell>
                    <Badge variant={status.variant}>
                      <span aria-hidden="true" className="size-1.5 rounded-full bg-current" />
                      {status.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="pe-6 text-end text-muted-foreground numeric max-sm:hidden">{member.active}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
      <Dialog open={inviteOpen} onOpenChange={onInviteOpenChange}><DialogPopup><form onSubmit={(event) => {
        event.preventDefault();
        const next = email.trim().toLowerCase();
        if (!next) return;
        if (people.some((member) => member.email === next)) { toastManager.add({ title: "该成员已在列表中", type: "warning" }); return; }
        setPeople((current) => [...current, { name: next.split("@")[0]!, email: next, role: "成员", status: "invited", active: "—" }]);
        setEmail("");
        onInviteOpenChange(false);
        toastManager.add({ title: "演示成员已添加", description: "展示待接受状态，没有发送邀请邮件。", type: "success" });
      }}><DialogHeader><DialogTitle>邀请成员</DialogTitle><DialogDescription>添加一条演示成员记录，观察表格与状态更新。</DialogDescription></DialogHeader><DialogPanel><Field><FieldLabel>成员邮箱</FieldLabel><Input type="email" required value={email} onChange={(event) => setEmail(event.target.value)} /></Field></DialogPanel><DialogFooter><Button type="button" variant="quiet" onClick={() => onInviteOpenChange(false)}>取消</Button><Button type="submit">添加成员</Button></DialogFooter></form></DialogPopup></Dialog>
    </Card>
  );
}

interface PaletteItem {
  value: string;
  label: string;
  icon: ReactNode;
  shortcut?: string;
  run: () => void;
}

function PalettePreview({ onNewProject, onInvite }: { onNewProject: () => void; onInvite: () => void }) {
  const { resolvedTheme, setTheme } = useTheme();
  const say = (title: string) => () => toastManager.add({ title, type: "info" });
  const groups: { value: string; items: PaletteItem[] }[] = [
    {
      value: "操作", items: [
        { value: "new", label: "新建项目", icon: <FolderPlusIcon />, run: onNewProject }, { value: "invite", label: "邀请成员", icon: <UserPlusIcon />, run: onInvite }, {
          value: "theme", label: resolvedTheme === "dark" ? "切换到浅色" : "切换到深色", icon: <MoonIcon />, run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"), }, ], }, {
      value: "前往", items: [
        { value: "settings", label: "项目设置", icon: <SettingsIcon />, run: say("演示：打开项目设置") }, { value: "github", label: "GitHub 仓库", icon: <GitHubIcon className="size-4" />, run: () => window.open(SITE.repo, "_blank", "noreferrer") }, ], }, ];
  return (
    <Card className="gap-0 overflow-hidden py-0">
      <Command items={groups}>
        <CommandInput aria-label="命令面板示例" autoFocus={false} placeholder="输入命令…" />
        <CommandPanel>
          <CommandEmpty>没有匹配的命令。</CommandEmpty>
          <CommandList className="max-h-80">
            {(group: (typeof groups)[number], index: number) => (
              <Fragment key={group.value}>
                <CommandGroup className={index > 0 ? "mt-2" : undefined} items={group.items}>
                  <CommandGroupLabel>{group.value}</CommandGroupLabel>
                  <CommandCollection>
                    {(item: PaletteItem) => (
                      <CommandItem className="gap-2.5 [&_svg]:size-4 [&_svg]:opacity-64" key={item.value} onClick={item.run} value={item}>
                        {item.icon}
                        <span className="flex-1 truncate">{item.label}</span>
                        {item.shortcut ? <CommandShortcut>{item.shortcut}</CommandShortcut> : null}
                      </CommandItem>
                    )}
                  </CommandCollection>
                </CommandGroup>
              </Fragment>
            )}
          </CommandList>
        </CommandPanel>
        <CommandFooter>
          <span>命令面板</span>
          <span className="flex items-center gap-1.5">
            <Kbd>
              <CornerDownLeftIcon aria-hidden="true" />
            </Kbd>
            执行
          </span>
        </CommandFooter>
      </Command>
    </Card>
  );
}

export function ComponentPreview() {
  const [inviteOpen, setInviteOpen] = useState(false);
  return (
    <div className="qy-components-preview">
      <div className="flex min-w-0 flex-col gap-5"><NotificationsCard /><ProjectCard /></div>
      <div className="flex min-w-0 flex-col gap-5"><MembersCard inviteOpen={inviteOpen} onInviteOpenChange={setInviteOpen} /><PalettePreview onInvite={() => setInviteOpen(true)} onNewProject={() => { const input = document.querySelector<HTMLInputElement>('input[aria-label="新项目名称"]'); input?.scrollIntoView({ behavior: "auto", block: "center" }); input?.focus(); }} /></div>
    </div>
  );
}
