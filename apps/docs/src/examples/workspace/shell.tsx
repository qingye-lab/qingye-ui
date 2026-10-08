import * as React from "react";
import { createPortal } from "react-dom";
import { IconBell, IconBook2, IconDatabase, IconLayoutDashboard, IconSearch, IconSettings } from "@tabler/icons-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Link } from "@/components/locale-link";
import { useDocsLocale } from "@/lib/docs-locale";
import { localePath } from "@/lib/paths";
import { Avatar, AvatarFallback } from "@qingye_lab/ui/components/avatar";
import { Breadcrumb, BreadcrumbCurrent, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@qingye_lab/ui/components/breadcrumb";
import { Button } from "@qingye_lab/ui/components/button";
import { Combobox, ComboboxEmpty, ComboboxInput, ComboboxItem, ComboboxList } from "@qingye_lab/ui/components/combobox";
import { CornerMark } from "@qingye_lab/ui/components/corner-mark";
import { Dialog, DialogPopup, DialogTitle } from "@qingye_lab/ui/components/dialog";
import { Kbd } from "@qingye_lab/ui/components/kbd";
import { Menu, MenuItem, MenuPopup, MenuPortal, MenuPositioner, MenuSeparator, MenuTrigger } from "@qingye_lab/ui/components/menu";
import { Popover, PopoverPopup, PopoverTitle, PopoverTrigger } from "@qingye_lab/ui/components/popover";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import { Timeline, TimelineDescription, TimelineItem, TimelineTime, TimelineTitle } from "@qingye_lab/ui/components/timeline";
import { ACTIVITY, COLLECTIONS, findCollection } from "./data";

/* 应用外壳：侧栏（可收起成图标栏）+ 顶栏（位置、搜索、动态、本人）+ 内容。
 * 侧栏的底比纸深一级，内容区是底纸，内容里的对象各铺一张纸——三层面，各有其所。 */

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

/* 页面级的操作放进顶栏：正文里不再立一个重复面包屑的标题。页面用 <PageActions> 把操作送到这里。 */
const ActionsSlot = React.createContext<HTMLElement | null>(null);
export function PageActions({ children }: { children: React.ReactNode }) {
  const slot = React.useContext(ActionsSlot);
  return slot ? createPortal(children, slot) : null;
}

type SearchItem = { id: string; label: string };
function SearchDialog({ open, onOpenChange }: { open: boolean; onOpenChange: (open: boolean) => void }) {
  const go = useWorkspaceNavigate(); const [query, setQuery] = React.useState("");
  const items: SearchItem[] = COLLECTIONS.map(item => ({ id: item.id, label: item.name }));
  const filtered = query.trim() ? items.filter(item => item.label.includes(query.trim())) : items;
  return <Combobox<SearchItem> items={items} filteredItems={filtered} filter={null} inline open={open} onOpenChange={onOpenChange} value={null} inputValue={query} onInputValueChange={setQuery}
    itemToStringLabel={item => item.label} itemToStringValue={item => item.id} isItemEqualToValue={(a, b) => a.id === b.id} autoHighlight
    onValueChange={item => { if (!item) return; onOpenChange(false); go(`/collections/${item.id}`); }}>
    <Dialog open={open} onOpenChange={onOpenChange} onOpenChangeComplete={next => { if (!next) setQuery(""); }}>
      <DialogPopup className="w-[min(32rem,100%)] gap-(--qy-field-gap)">
        <DialogTitle className="sr-only">搜索集合</DialogTitle>
        <ComboboxInput aria-label="搜索集合" placeholder="搜索集合" />
        <ComboboxEmpty>没有匹配的集合</ComboboxEmpty>
        <ComboboxList className="max-h-[min(24rem,60dvh)]">{(item: { id: string; label: string }) => <ComboboxItem key={item.id} value={item}>{item.label}</ComboboxItem>}</ComboboxList>
      </DialogPopup>
    </Dialog>
  </Combobox>;
}

export function WorkspaceShell() {
  const { crumbs, section, sub } = useCrumbs();
  const [actions, setActions] = React.useState<HTMLElement | null>(null);
  const [searching, setSearching] = React.useState(false);
  const [collapsed, setCollapsed] = React.useState(false);
  React.useEffect(() => {
    const onKey = (event: KeyboardEvent) => { if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") { event.preventDefault(); setSearching(true); } };
    window.addEventListener("keydown", onKey); return () => window.removeEventListener("keydown", onKey);
  }, []);
  const failing = COLLECTIONS.filter(item => item.state === "失败" || item.state === "未同步").length;
  const link = (path: string) => <Link to={at(path)} />;

  return <div className="flex h-full min-h-0 bg-background text-foreground">
    <Sidebar aria-label="工作区" collapsed={collapsed} onCollapsedChange={setCollapsed} className="h-full w-[calc(12*var(--qy-cai))] shrink-0 border-e border-border p-(--qy-overlay-inset)">
      {/* 顶：这是谁的工作区。印与名一行，与收起按钮同一条中线；收起时只留印，收起按钮落到印下。 */}
      <div className={collapsed ? "grid justify-items-center gap-(--qy-field-gap)" : "flex min-h-(--qy-fill-height) min-w-0 items-center gap-(--qy-field-gap) ps-(--qy-control-sm-padding)"}>
        <span aria-hidden="true" className="grid size-(--qy-control-xs) shrink-0 place-items-center rounded-(--qy-radius-xs) bg-foreground text-support-strong text-surface">青</span>
        {!collapsed && <span className="min-w-0 flex-1 truncate text-body-strong">青野工作区</span>}
        <SidebarToggle />
      </div>
      <SidebarContent className="mt-(--qy-field-group-gap) flex-1">
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
      <Menu>
        <MenuTrigger render={<button type="button" aria-label="陈致远" className={`flex min-w-0 items-center gap-(--qy-field-gap) rounded-item p-(--qy-overlay-inset) text-start outline-none hover:bg-accent focus-visible:ring-(length:--qy-focus-quiet-width) focus-visible:ring-ring ${collapsed ? "justify-center" : ""}`} />}>
          <Avatar size="sm" label="陈致远"><AvatarFallback>陈</AvatarFallback></Avatar>
          {!collapsed && <span className="min-w-0 flex-1 truncate text-body">陈致远</span>}
        </MenuTrigger>
        <MenuPortal><MenuPositioner side="top" align="start"><MenuPopup>
          <MenuItem render={link("/settings/members")}>成员与角色</MenuItem>
          <MenuItem render={link("/help")}>帮助</MenuItem>
          <MenuSeparator />
          <MenuItem>退出登录</MenuItem>
        </MenuPopup></MenuPositioner></MenuPortal>
      </Menu>
    </Sidebar>

    <div className="flex min-w-0 flex-1 flex-col">
      <header className="flex h-[calc(var(--qy-fill-height)+2*var(--qy-panel-padding-sm))] shrink-0 items-center gap-(--qy-panel-gap) border-b border-border px-(--qy-page-gutter)">
        <Breadcrumb className="min-w-0 flex-1">
          <BreadcrumbList>
            <BreadcrumbItem><BreadcrumbLink render={link("")}>青野工作区</BreadcrumbLink></BreadcrumbItem>
            {crumbs.map((crumb, index) => <React.Fragment key={index}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>{crumb.to ? <BreadcrumbLink render={<Link to={crumb.to} />}>{crumb.label}</BreadcrumbLink> : <BreadcrumbCurrent>{crumb.label}</BreadcrumbCurrent>}</BreadcrumbItem>
            </React.Fragment>)}
          </BreadcrumbList>
        </Breadcrumb>
        <div ref={setActions} data-slot="page-actions" className="flex items-center gap-(--qy-action-gap) empty:hidden" />
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
      </header>
      <main id="main" tabIndex={-1} className="min-h-0 flex-1 overflow-y-auto outline-none">
        <ActionsSlot.Provider value={actions}><Outlet /></ActionsSlot.Provider>
      </main>
    </div>
    <SearchDialog open={searching} onOpenChange={setSearching} />
  </div>;
}
