import {
  Avatar,
  AvatarFallback,
  Badge,
  Button,
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
  Command,
  CommandCollection,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandGroupLabel,
  CommandInput,
  CommandItem,
  CommandList,
  CommandPanel,
  CommandShortcut,
  Field,
  FieldDescription,
  FieldLabel,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
  Kbd,
  Label,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
  Separator,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsList,
  TabsPanel,
  TabsTab,
  toastManager,
  useTheme,
} from "@yanqing/ui";
import { ArrowRightIcon, CornerDownLeftIcon, FolderPlusIcon, MoonIcon, SettingsIcon, UserPlusIcon } from "lucide-react";
import { Fragment, useId, useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { CodeView } from "@/components/code-block";
import { CopyCodeButton } from "@/components/copy-code-button";
import { GitHubIcon } from "@/components/logo";
import { useDocumentTitle } from "@/components/prose";
import { components } from "@/lib/registry";
import { SITE } from "@/lib/site";

function SettingRow({ title, description, defaultChecked }: { title: string; description: string; defaultChecked?: boolean }) {
  const id = useId();
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex min-w-0 flex-col gap-0.5">
        <Label htmlFor={id}>{title}</Label>
        <span className="text-muted-foreground text-xs">{description}</span>
      </div>
      <Switch defaultChecked={defaultChecked ?? false} id={id} />
    </div>
  );
}

const quietHours = [
  { label: "不设置", value: "none" },
  { label: "每天 22:00 – 08:00", value: "night" },
  { label: "工作日 19:00 之后", value: "evening" },
];

function NotificationsCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">通知</CardTitle>
        <CardDescription>选择你希望收到的提醒。</CardDescription>
      </CardHeader>
      <CardPanel className="flex flex-col gap-4">
        <SettingRow defaultChecked description="有人回复或 @ 你时" title="评论与提及" />
        <SettingRow defaultChecked description="每周一上午汇总项目进展" title="每周摘要" />
        <SettingRow description="新功能与改进说明" title="产品更新" />
        <Separator className="my-1" />
        <Field>
          <FieldLabel>免打扰时段</FieldLabel>
          <Select defaultValue="night" items={quietHours}>
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
      </CardPanel>
      <CardFooter className="justify-end gap-2">
        <Button size="sm" variant="ghost">
          恢复默认
        </Button>
        <Button onClick={() => toastManager.add({ title: "通知偏好已保存", type: "success" })} size="sm">
          保存更改
        </Button>
      </CardFooter>
    </Card>
  );
}

function ProjectCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">新建项目</CardTitle>
        <CardDescription>项目创建后可以随时修改这些设置。</CardDescription>
      </CardHeader>
      <CardPanel className="flex flex-col gap-4">
        <Field>
          <FieldLabel>项目名称</FieldLabel>
          <Input defaultValue="年度品牌升级" />
        </Field>
        <Field>
          <FieldLabel>访问地址</FieldLabel>
          <InputGroup>
            <InputGroupAddon>
              <InputGroupText>yanqing.dev/</InputGroupText>
            </InputGroupAddon>
            <InputGroupInput aria-label="访问地址" defaultValue="brand-2026" />
          </InputGroup>
        </Field>
        <div className="flex flex-col gap-2.5">
          <span className="font-medium text-sm" id="visibility-label">
            可见范围
          </span>
          <RadioGroup aria-labelledby="visibility-label" className="gap-2.5" defaultValue="members">
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
      </CardPanel>
      <CardFooter className="justify-end gap-2">
        <Button size="sm" variant="outline">
          取消
        </Button>
        <Button onClick={() => toastManager.add({ title: "已创建“年度品牌升级”", description: "可以开始邀请成员了。", type: "success" })} size="sm">
          创建项目
        </Button>
      </CardFooter>
    </Card>
  );
}

const members = [
  { name: "林晚", email: "lin.wan@example.com", role: "所有者", status: "online", active: "刚刚" },
  { name: "周屿", email: "zhou.yu@example.com", role: "管理员", status: "online", active: "4 分钟前" },
  { name: "陈默", email: "chen.mo@example.com", role: "成员", status: "away", active: "1 小时前" },
  { name: "许知远", email: "xu.zy@example.com", role: "成员", status: "away", active: "昨天" },
  { name: "宋青", email: "song.qing@example.com", role: "成员", status: "invited", active: "—" },
] as const;

const STATUS = {
  online: { label: "在线", variant: "success" },
  away: { label: "离开", variant: "secondary" },
  invited: { label: "待接受", variant: "warning" },
} as const;

function MembersCard() {
  return (
    <Card className="overflow-hidden">
      <CardHeader>
        <CardTitle className="text-base">成员</CardTitle>
        <CardDescription>5 人 · 2 人在线</CardDescription>
        <CardAction>
          <Button onClick={() => toastManager.add({ title: "邀请链接已复制", type: "success" })} size="sm" variant="outline">
            <UserPlusIcon aria-hidden="true" />
            邀请
          </Button>
        </CardAction>
      </CardHeader>
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
            {members.map((member) => {
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
                        <span className="text-muted-foreground text-xs">{member.email}</span>
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

function PalettePreview() {
  const { resolvedTheme, setTheme } = useTheme();
  const say = (title: string) => () => toastManager.add({ title, type: "info" });
  const groups: { value: string; items: PaletteItem[] }[] = [
    {
      value: "操作",
      items: [
        { value: "new", label: "新建项目", icon: <FolderPlusIcon />, shortcut: "⌘N", run: say("演示：新建项目") },
        { value: "invite", label: "邀请成员", icon: <UserPlusIcon />, shortcut: "⌘I", run: say("演示：邀请成员") },
        {
          value: "theme",
          label: resolvedTheme === "dark" ? "切换到浅色" : "切换到深色",
          icon: <MoonIcon />,
          run: () => setTheme(resolvedTheme === "dark" ? "light" : "dark"),
        },
      ],
    },
    {
      value: "前往",
      items: [
        { value: "settings", label: "项目设置", icon: <SettingsIcon />, run: say("演示：打开项目设置") },
        { value: "github", label: "GitHub 仓库", icon: <GitHubIcon className="size-4" />, run: () => window.open(SITE.repo, "_blank", "noreferrer") },
      ],
    },
  ];
  return (
    <div className="relative flex flex-col rounded-2xl border bg-popover not-dark:bg-clip-padding shadow-xs/5 before:pointer-events-none before:absolute before:inset-0 before:rounded-[calc(var(--radius-2xl)-1px)] before:bg-muted/72">
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
    </div>
  );
}

export default function HomePage() {
  useDocumentTitle();
  return (
    <>
      <main className="outline-none" id="main" tabIndex={-1}>
        <section className="mx-auto grid w-full max-w-[90rem] items-center gap-12 px-4 pt-14 pb-12 sm:px-6 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:px-8 lg:pt-24 lg:pb-20">
          <div className="flex flex-col items-start gap-6 lg:col-span-6" data-route-enter>
            <h1 className="break-keep font-semibold text-[2.125rem] text-foreground-strong leading-[1.2] sm:text-[3rem]" tabIndex={-1}>
              <span className="block">精致、耐看、不浮夸</span>
              <span className="block text-muted-foreground">为中文产品打磨的 React 组件</span>
            </h1>
            <p className="max-w-[36rem] text-pretty text-[1.0625rem] text-muted-foreground leading-relaxed">
              {SITE.name} 以 Base UI 负责行为与无障碍，以 Tailwind CSS 4 负责样式，改编自 coss ui，并补充了中文产品常用的组合组件。层次来自半透明边框与准确的间距，主题、密度和动效都由令牌控制。
            </p>
            <div className="flex flex-wrap items-center gap-2.5">
              <Button nativeButton={false} render={<Link to="/docs/installation" />} size="lg">
                快速开始
                <ArrowRightIcon aria-hidden="true" />
              </Button>
              <Button nativeButton={false} render={<Link to="/docs/components" />} size="lg" variant="outline">
                浏览组件
              </Button>
            </div>
            <ul className="flex flex-wrap items-center gap-x-5 gap-y-1.5 text-muted-foreground text-sm">
              {[`${components.length} 个组件`, "浅色与深色", "简体中文 / English", `v${SITE.version} · MIT`].map((item) => (
                <li className="flex items-center gap-2" key={item}>
                  <span aria-hidden="true" className="size-1 rounded-full bg-foreground/24" />
                  <span className="numeric">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <HeroCode />
        </section>

        <section aria-label="组件示例" className="border-y bg-surface-subtle dark:bg-surface-subtle">
          <div className="mx-auto grid w-full max-w-[90rem] gap-4 px-4 py-8 sm:px-6 sm:py-10 lg:grid-cols-12 lg:gap-5 lg:px-8 lg:py-12">
            <div className="flex min-w-0 flex-col gap-4 lg:col-span-5 lg:gap-5">
              <NotificationsCard />
              <ProjectCard />
            </div>
            <div className="flex min-w-0 flex-col gap-4 lg:col-span-7 lg:gap-5">
              <MembersCard />
              <PalettePreview />
            </div>
          </div>
        </section>
      </main>
      <footer className="mx-auto flex w-full max-w-[90rem] flex-col gap-3 px-4 py-8 text-muted-foreground text-sm sm:flex-row sm:items-center sm:justify-between sm:px-6 lg:px-8">
        <p>
          MIT 许可。行为基于 <ExternalLink href="https://base-ui.com">Base UI</ExternalLink>，组件改编自 <ExternalLink href="https://coss.com/ui">coss ui</ExternalLink>。
        </p>
        <a className="focus-ring inline-flex items-center gap-1.5 rounded-sm transition-colors hover:text-foreground" href={SITE.repo} rel="noreferrer" target="_blank">
          <GitHubIcon className="size-3.5" />
          {SITE.repo.replace("https://github.com/", "")}
        </a>
      </footer>
    </>
  );
}

const heroFiles = [
  {
    id: "css",
    name: "index.css",
    lang: "css" as const,
    code: `@import "tailwindcss";\n@import "@yanqing/ui/styles.css";\n\n/* 换成你的品牌色与圆角 */\n:root {\n  --qy-primary: oklch(0.51 0.18 268);\n  --qy-radius: 0.5rem;\n}`,
  },
  {
    id: "tsx",
    name: "save-button.tsx",
    lang: "tsx" as const,
    code: `import { Button, toastManager } from "@yanqing/ui";\n\nexport function SaveButton() {\n  return (\n    <Button onClick={() => toastManager.add({ title: "已保存" })}>\n      保存\n    </Button>\n  );\n}`,
  },
];

function HeroCode() {
  const [current, setCurrent] = useState("tsx");
  const active = heroFiles.find((file) => file.id === current) ?? heroFiles[0]!;
  return (
    <Tabs
      className="min-w-0 gap-0 overflow-hidden rounded-2xl border bg-surface-subtle shadow-xs/5 lg:col-span-6 dark:bg-surface"
      onValueChange={(value) => setCurrent(String(value))}
      value={current}
    >
      <div className="flex items-center justify-between gap-2 border-b py-1.5 ps-2 pe-1.5">
        <TabsList aria-label="示例文件" size="sm" variant="underline">
          {heroFiles.map((file) => (
            <TabsTab className="font-mono text-xs" key={file.id} value={file.id}>
              {file.name}
            </TabsTab>
          ))}
        </TabsList>
        <CopyCodeButton value={active.code} />
      </div>
      {heroFiles.map((file) => (
        <TabsPanel key={file.id} value={file.id}>
          <CodeView className="min-h-56 py-4" code={file.code} lang={file.lang} />
        </TabsPanel>
      ))}
    </Tabs>
  );
}

function ExternalLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a className="focus-ring rounded-sm text-foreground underline decoration-foreground/24 underline-offset-[0.22em] hover:decoration-foreground/72" href={href} rel="noreferrer" target="_blank">
      {children}
    </a>
  );
}
