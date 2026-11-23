import * as React from "react";
import { IconBell, IconBook2, IconDatabase, IconLayoutDashboard, IconRefresh, IconSearch, IconSettings } from "@tabler/icons-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "@/components/locale-link";
import { useDocsLocale } from "@/lib/docs-locale";
import { localePath } from "@/lib/paths";
import { AlertDialog, AlertDialogClose, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogPopup, AlertDialogTitle } from "@qingye_lab/ui/components/alert-dialog";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import { Button } from "@qingye_lab/ui/components/button";
import { CommandDialog, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator, type CommandFilter } from "@qingye_lab/ui/components/command";
import { CornerMark } from "@qingye_lab/ui/components/corner-mark";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Result, ResultActions, ResultDescription, ResultTitle } from "@qingye_lab/ui/components/result";
import { Sidebar, SidebarButton, SidebarContent, SidebarDrawerTrigger, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarTitle, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import { StatusDot } from "@qingye_lab/ui/components/status-dot";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";
import { Workspace, WorkspaceContent, WorkspaceHeader, WorkspaceSurface } from "@qingye_lab/ui/components/workspace";
import { useExampleEmbedded } from "../embedding";
import { useWorkspaceStore } from "./store";
import { syncDot } from "./status";

/* 应用外壳：库的 Workspace——侧栏（可收起成图标栏）+ 一张工作面（顶栏：位置、搜索、动态；内容区）。
 * 外壳自带跳过链接、侧栏与工作面之间的间隔和面的圆角线；这里只放内容。页面级操作经 WorkspaceHeaderPortal 进顶栏。 */

const inFrame = typeof window !== "undefined" && /^(\/en)?\/frame\//.test(window.location.pathname);
export const BASE = inFrame ? "/frame/examples/workspace" : "/examples/workspace";
const at = (path = "") => `${BASE}${path}`;

/** 站内跳转保留 URL 的语言前缀；<Link> 已自带，命令式跳转用这个。 */
export function useWorkspaceNavigate() {
  const navigate = useNavigate(); const locale = useDocsLocale();
  return (path: string) => navigate(localePath(at(path), locale));
}

const PLACES: Record<string, string> = { "": "概览", "/collections": "集合", "/settings": "设置", "/help": "帮助" };
export const SETTINGS = [{ id: "general", label: "常规" }, { id: "members", label: "成员" }, { id: "permissions", label: "默认权限" }, { id: "notifications", label: "通知" }] as const;

function useCrumbs() {
  const { pathname } = useLocation();
  const { collections } = useWorkspaceStore();
  const rest = pathname.replace(/^.*\/examples\/workspace/, "").replace(/\/$/, "");
  const [, first = "", second] = rest.split("/");
  const crumbs: { label: string; to?: string }[] = [{ label: PLACES[first ? `/${first}` : ""] ?? "未找到", to: at(first ? `/${first}` : "") }];
  if (first === "collections" && second) crumbs.push({ label: collections.find(item => item.id === second)?.name ?? second });
  if (first === "settings") crumbs.push({ label: SETTINGS.find(item => item.id === (second ?? "general"))?.label ?? "未找到" });
  crumbs[crumbs.length - 1] = { label: crumbs[crumbs.length - 1]!.label };
  return { crumbs, section: first, sub: second };
}

/* 内容区是外壳里唯一的滚动容器。要跟随滚动的页面（帮助文章的目录）从这里取它，不去查 DOM。 */
const Scroller = React.createContext<React.RefObject<HTMLElement | null>>({ current: null });
export const useWorkspaceScroller = () => React.useContext(Scroller);

/** 搜集合与快捷动作：按名称包含匹配（查询已去掉首尾空白）。 */
const byName: CommandFilter = (entry, query) => entry.label.toLowerCase().includes(query.toLowerCase());

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const go = useWorkspaceNavigate();
  const { collections, triggerSync } = useWorkspaceStore();
  const attentionIds = collections.filter(item => item.state === "失败" || item.state === "未同步").map(item => item.id);

  const onSelect = (value: string) => {
    if (value.startsWith("col:")) go(`/collections/${value.slice(4)}`);
    else if (value === "act:sync-attention") triggerSync(attentionIds);
    else if (value.startsWith("nav:")) go(value.slice(4));
  };

  return <CommandDialog open={open} onOpenChange={onOpenChange} aria-label="命令与搜索" filter={byName} onItemSelect={onSelect}>
    <CommandInput aria-label="搜索集合或命令" placeholder="搜索集合、页面或快捷命令" />
    <CommandList aria-label="集合与命令">
      <CommandGroup heading="集合">
        {collections.map(item => (
          <CommandItem key={item.id} value={`col:${item.id}`} keywords={[item.name, item.source, item.owner]}>
            <span className="truncate">{item.name}</span>
            <StatusDot className="ms-auto shrink-0 text-muted-foreground" status={syncDot[item.state]} label={item.state} />
          </CommandItem>
        ))}
      </CommandGroup>
      <CommandSeparator />
      <CommandGroup heading="页面与操作">
        {attentionIds.length > 0 && (
          <CommandItem value="act:sync-attention" keywords={["同步全部异常集合", "重试", "失败"]}>
            <IconRefresh aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
            <span>同步全部异常集合（{attentionIds.length}）</span>
          </CommandItem>
        )}
        <CommandItem value="nav:" keywords={["概览", "首页"]}>概览</CommandItem>
        <CommandItem value="nav:/collections" keywords={["集合列表", "数据表"]}>全部集合</CommandItem>
        <CommandItem value="nav:/settings/members" keywords={["成员与角色", "邀请"]}>成员与角色</CommandItem>
        <CommandItem value="nav:/help" keywords={["帮助", "文档", "故障排查"]}>同步帮助与故障排查</CommandItem>
      </CommandGroup>
      <CommandEmpty>没有匹配的集合或命令</CommandEmpty>
    </CommandList>
  </CommandDialog>;
}

export function WorkspaceShell() {
  const embedded = useExampleEmbedded();
  const { crumbs, section, sub } = useCrumbs();
  const { workspaceName, collections, activity, unreadCount, markActivityRead, signedOut, setSignedOut } = useWorkspaceStore();
  const scroller = React.useRef<HTMLElement | null>(null);
  const [searching, setSearching] = React.useState(false);
  const [signOutOpen, setSignOutOpen] = React.useState(false);

  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        event.stopPropagation();
        setSearching(true);
      }
    };
    window.addEventListener("keydown", onKey, true);
    return () => window.removeEventListener("keydown", onKey, true);
  }, []);

  const failing = collections.filter(item => item.state === "失败" || item.state === "未同步").length;
  const link = (path: string) => <Link to={at(path)} />;

  if (signedOut) {
    return <div className="grid h-full place-items-center bg-background p-(--qy-page-gutter)">
      <Result tone="info">
        <ResultTitle level={1}>已退出{workspaceName}</ResultTitle>
        <ResultDescription>本示例的会话状态仅保存在当前页面中，可以随时重新进入。</ResultDescription>
        <ResultActions>
          <Button onClick={() => setSignedOut(false)}>重新进入工作区</Button>
        </ResultActions>
      </Result>
    </div>;
  }

  return <Workspace>
    <Sidebar className="shrink-0" drawer render={<section aria-label={workspaceName} />}>
      <SidebarHeader>
        <span aria-hidden="true" className="grid size-(--qy-control-xs) shrink-0 place-items-center rounded-(--qy-radius-xs) bg-foreground text-support-strong text-surface">{workspaceName.slice(0, 1)}</span>
        <SidebarTitle>{workspaceName}</SidebarTitle>
        <SidebarToggle />
      </SidebarHeader>
      <SidebarContent aria-label="工作区" className="mt-(--qy-field-group-gap) flex-1">
        <SidebarGroup>
          <SidebarLink render={link("")} active={section === ""} icon={<IconLayoutDashboard aria-hidden="true" />}>概览</SidebarLink>
          <SidebarLink render={link("/collections")} active={section === "collections"} icon={<IconDatabase aria-hidden="true" />} {...(failing > 0 ? { count: failing } : {})}>集合</SidebarLink>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>常用集合</SidebarGroupLabel>
          {collections.slice(0, 4).map(item => (
            <SidebarLink
              key={item.id}
              render={link(`/collections/${item.id}`)}
              active={section === "collections" && sub === item.id}
              icon={<StatusDot status={syncDot[item.state]} label={item.state} className="[&>span:last-child]:sr-only" />}
            >
              {item.name}
            </SidebarLink>
          ))}
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>工作区</SidebarGroupLabel>
          <SidebarSub defaultOpen={section === "settings"}>
            <SidebarSubTrigger icon={<IconSettings aria-hidden="true" />}>设置</SidebarSubTrigger>
            <SidebarSubContent>
              {SETTINGS.map(item => <SidebarLink key={item.id} render={link(`/settings/${item.id}`)} active={section === "settings" && (sub ?? "general") === item.id}>{item.label}</SidebarLink>)}
            </SidebarSubContent>
          </SidebarSub>
          <SidebarLink render={link("/help")} active={section === "help"} icon={<IconBook2 aria-hidden="true" />}>帮助</SidebarLink>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Menu>
          <MenuTrigger render={<SidebarButton icon={<Avatar size="sm" label="陈致远" aria-hidden="true"><AvatarFallback>陈</AvatarFallback></Avatar>} />}>陈致远</MenuTrigger>
          <MenuPortal><MenuPositioner side="top" align="start"><MenuPopup>
            <MenuItem render={link("/settings/members")}>成员与角色</MenuItem>
            <MenuItem render={link("/help")}>帮助</MenuItem>
            <MenuSeparator />
            <MenuItem onClick={() => setSignOutOpen(true)}>退出登录</MenuItem>
          </MenuPopup></MenuPositioner></MenuPortal>
        </Menu>
      </SidebarFooter>
    </Sidebar>

    <WorkspaceSurface>
      <WorkspaceHeader>
        <SidebarDrawerTrigger />
        <Breadcrumb className="min-w-0 flex-1">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink render={link("")}>{workspaceName}</BreadcrumbLink></BreadcrumbItem>
            {crumbs.map((crumb, index) => <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{crumb.to ? <BreadcrumbLink render={<Link to={crumb.to} />}>{crumb.label}</BreadcrumbLink> : <BreadcrumbCurrent>{crumb.label}</BreadcrumbCurrent>}</BreadcrumbItem>
            </React.Fragment>)}
          </BreadcrumbList>
        </Breadcrumb>
        <Button variant="bordered" size="sm" onClick={() => setSearching(true)} className="w-[calc(10*var(--qy-cai))] justify-start text-muted-foreground max-sm:w-auto">
          <IconSearch aria-hidden="true" /><span className="max-sm:sr-only">搜索</span><Kbd className="ms-auto max-sm:hidden">⌘K</Kbd>
        </Button>
        <Popover>
          <PopoverTrigger render={<Button variant="quiet" shape="icon" aria-label={unreadCount > 0 ? `动态，${unreadCount} 条未读` : "动态"} />}>
            {unreadCount > 0
              ? <CornerMark count={unreadCount} label={`${unreadCount} 条新动态`}><IconBell aria-hidden="true" /></CornerMark>
              : <IconBell aria-hidden="true" />}
          </PopoverTrigger>
          <PopoverPopup align="end" className="w-[min(calc(18*var(--qy-cai)),calc(100vw-2rem))]">
            <div className="flex items-center justify-between gap-(--qy-field-gap)">
              <PopoverTitle>工作区动态</PopoverTitle>
              {unreadCount > 0 && <Button size="sm" variant="quiet" onClick={markActivityRead}>全部已读</Button>}
            </div>
            <Timeline className="mt-(--qy-field-group-gap)">
              {activity.slice(0, 6).map(item => (
                <TimelineItem key={item.id}>
                  <TimelineTime dateTime={item.dateTime}>{item.time}</TimelineTime>
                  <TimelineTitle>{item.title}</TimelineTitle>
                  <TimelineDescription>{item.detail}</TimelineDescription>
                </TimelineItem>
              ))}
            </Timeline>
          </PopoverPopup>
        </Popover>
      </WorkspaceHeader>
      <WorkspaceContent ref={scroller} {...(embedded ? { render: <div /> } : { id: "main" })}>
        <Scroller.Provider value={scroller}><Outlet /></Scroller.Provider>
      </WorkspaceContent>
    </WorkspaceSurface>

    <SearchDialog open={searching} onOpenChange={setSearching} />

    <AlertDialog open={signOutOpen} onOpenChange={setSignOutOpen}>
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>退出{workspaceName}</AlertDialogTitle>
          <AlertDialogDescription>当前演示中的本地修改仍会保留在内存里，稍后可以一键返回。</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose>取消</AlertDialogClose>
          <Button variant="bordered" onClick={() => { setSignOutOpen(false); setSignedOut(true); }}>确认退出</Button>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  </Workspace>;
}
