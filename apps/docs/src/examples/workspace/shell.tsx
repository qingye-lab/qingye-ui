import * as React from "react";
import { IconBell, IconBook2, IconDatabase, IconLayoutDashboard, IconSearch, IconSettings } from "@tabler/icons-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "@/components/locale-link";
import { useDocsLocale } from "@/lib/docs-locale";
import { localePath } from "@/lib/paths";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import { Button } from "@qingye_lab/ui/components/button";
import { CommandDialog, CommandEmpty, CommandInput, CommandItem, CommandList, type CommandFilter } from "@qingye_lab/ui/components/command";
import { CornerMark } from "@qingye_lab/ui/components/corner-mark";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarTitle, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";
import { Workspace, WorkspaceContent, WorkspaceHeader, WorkspaceSurface } from "@qingye_lab/ui/components/workspace";
import { ACTIVITY, COLLECTIONS, findCollection } from "./data";
import { useExampleEmbedded } from "../embedding";

/* 应用外壳：库的 Workspace——侧栏（可收起成图标栏）+ 一张工作面（顶栏：位置、搜索、动态；内容区）。
 * 外壳自带跳过链接、侧栏与工作面之间的间隔和面的圆角线；这里只放内容。页面级操作经 WorkspaceHeaderPortal 进顶栏。 */

export const BASE = "/examples/workspace";
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
  const rest = pathname.replace(/^.*\/examples\/workspace/, "").replace(/\/$/, "");
  const [, first = "", second] = rest.split("/");
  const crumbs: { label: string; to?: string }[] = [{ label: PLACES[first ? `/${first}` : ""] ?? "未找到", to: at(first ? `/${first}` : "") }];
  if (first === "collections" && second) crumbs.push({ label: findCollection(second)?.name ?? second });
  if (first === "settings") crumbs.push({ label: SETTINGS.find(item => item.id === (second ?? "general"))?.label ?? "未找到" });
  crumbs[crumbs.length - 1] = { label: crumbs[crumbs.length - 1]!.label };
  return { crumbs, section: first, sub: second };
}

/* 内容区是外壳里唯一的滚动容器。要跟随滚动的页面（帮助文章的目录）从这里取它，不去查 DOM。 */
const Scroller = React.createContext<React.RefObject<HTMLElement | null>>({ current: null });
export const useWorkspaceScroller = () => React.useContext(Scroller);

/** 搜集合：只按名称包含匹配（查询已去掉首尾空白）。 */
const byName: CommandFilter = (entry, query) => entry.label.includes(query);

function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const go = useWorkspaceNavigate();
  return <CommandDialog open={open} onOpenChange={onOpenChange} aria-label="搜索集合" filter={byName} onItemSelect={id => go(`/collections/${id}`)}>
    <CommandInput aria-label="搜索集合" placeholder="搜索集合" />
    <CommandList aria-label="集合">
      {COLLECTIONS.map(item => <CommandItem key={item.id} value={item.id}>{item.name}</CommandItem>)}
      <CommandEmpty>没有匹配的集合</CommandEmpty>
    </CommandList>
  </CommandDialog>;
}

export function WorkspaceShell() {
  const embedded = useExampleEmbedded();
  const { crumbs, section, sub } = useCrumbs();
  const scroller = React.useRef<HTMLElement | null>(null);
  const [searching, setSearching] = React.useState(false);
  React.useEffect(() => {
    // 应用内的 ⌘K 是应用自己的搜索：在捕获阶段接下并止步，站点的文档搜索（挂在 document 上）不再同时打开。
    const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); event.stopPropagation(); setSearching(true); } };
    window.addEventListener("keydown", onKey, true); return () => window.removeEventListener("keydown", onKey, true);
  }, []);
  const failing = COLLECTIONS.filter(item => item.state === "失败" || item.state === "未同步").length;
  const link = (path: string) => <Link to={at(path)} />;

  return <Workspace>
    {/* 侧栏是一个有名字的区域（section → region 地标）：工作区的标识、导航与账户都在其中，不游离在地标之外。
        不用 aside：侧栏里的主导航不是页面的补充内容（库在 Sidebar 根上的说明）；nav 仍是 SidebarContent 自己。 */}
    <Sidebar className="shrink-0" render={<section aria-label="青野工作区" />}>
      {/* 顶：这是谁的工作区。印与名一行，与收起按钮同一条中线；收起时只留印，收起按钮落到印下。 */}
      <SidebarHeader>
        <span aria-hidden="true" className="grid size-(--qy-control-xs) shrink-0 place-items-center rounded-(--qy-radius-xs) bg-foreground text-support-strong text-surface">青</span>
        <SidebarTitle>青野工作区</SidebarTitle>
        <SidebarToggle />
      </SidebarHeader>
      <SidebarContent aria-label="工作区" className="mt-(--qy-field-group-gap) flex-1">
        <SidebarGroup>
          <SidebarLink render={link("")} active={section === ""} icon={<IconLayoutDashboard aria-hidden="true" />}>概览</SidebarLink>
          <SidebarLink render={link("/collections")} active={section === "collections"} icon={<IconDatabase aria-hidden="true" />} count={failing}>集合</SidebarLink>
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
      {/* 底：我是谁。点开是本人的命令。 */}
      <SidebarFooter>
        <Menu>
          <MenuTrigger render={<SidebarLink icon={<Avatar size="sm" label="陈致远" aria-hidden="true"><AvatarFallback>陈</AvatarFallback></Avatar>} render={<button type="button" />} />}>陈致远</MenuTrigger>
          <MenuPortal><MenuPositioner side="top" align="start"><MenuPopup>
            <MenuItem render={link("/settings/members")}>成员与角色</MenuItem>
            <MenuItem render={link("/help")}>帮助</MenuItem>
            <MenuSeparator />
            <MenuItem>退出登录</MenuItem>
          </MenuPopup></MenuPositioner></MenuPortal>
        </Menu>
      </SidebarFooter>
    </Sidebar>

    <WorkspaceSurface>
      <WorkspaceHeader>
        <Breadcrumb className="min-w-0 flex-1">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink render={link("")}>青野工作区</BreadcrumbLink></BreadcrumbItem>
            {crumbs.map((crumb, index) => <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{crumb.to ? <BreadcrumbLink render={<Link to={crumb.to} />}>{crumb.label}</BreadcrumbLink> : <BreadcrumbCurrent>{crumb.label}</BreadcrumbCurrent>}</BreadcrumbItem>
            </React.Fragment>)}
          </BreadcrumbList>
        </Breadcrumb>
        <Button variant="bordered" size="sm" onClick={() => setSearching(true)} className="w-[calc(10*var(--qy-cai))] justify-start text-muted-foreground">
          <IconSearch aria-hidden="true" />搜索<Kbd className="ms-auto">⌘K</Kbd>
        </Button>
        <Popover>
          <PopoverTrigger render={<Button variant="quiet" shape="icon" aria-label={`动态，${ACTIVITY.length} 条新`} />}>
            <CornerMark count={ACTIVITY.length} label={`${ACTIVITY.length} 条新动态`}><IconBell aria-hidden="true" /></CornerMark>
          </PopoverTrigger>
          <PopoverPopup align="end" className="w-[calc(16*var(--qy-cai))]">
            <PopoverTitle>今天</PopoverTitle>
            <Timeline className="mt-(--qy-field-group-gap)">
              {ACTIVITY.map(item => <TimelineItem key={item.id}><TimelineTime dateTime={item.dateTime}>{item.time}</TimelineTime><TimelineTitle>{item.title}</TimelineTitle><TimelineDescription>{item.detail}</TimelineDescription></TimelineItem>)}
            </Timeline>
          </PopoverPopup>
        </Popover>
      </WorkspaceHeader>
      <WorkspaceContent ref={scroller} {...(embedded ? { render: <div /> } : { id: "main" })}>
        <Scroller.Provider value={scroller}><Outlet /></Scroller.Provider>
      </WorkspaceContent>
    </WorkspaceSurface>
    <SearchDialog open={searching} onOpenChange={setSearching} />
  </Workspace>;
}
