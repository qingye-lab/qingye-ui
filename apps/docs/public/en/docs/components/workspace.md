# Workspace

Package: @qingye_lab/ui@5.2.0
Import: @qingye_lab/ui/components/workspace
Source: packages/ui/src/components/workspace.tsx
Source SHA-256: ca2d713bc6ff9ae851eb0ec123c226f6252253cc01ad7d8ae069e974e119dc0a

An application shell: a sidebar on the page ground beside one work surface, with the header inside the surface and the only scroll container below it.

## Decision
A page's name, summary and page-level actions live in the header, so the body has no second large title. The surface keeps a 2-unit margin all round except on the side facing the sidebar: that gap is the sidebar's own inset, so sidebar and surface read as one gap apart. At narrow width the surface fills the viewport, with no margin, radius, line or shadow. A routed page sends its title and actions to the header with WorkspaceHeaderPortal; the header precedes the content in the DOM, so those actions also precede the body in tab order.

## Notes
- The header is a header element; outside main, section and article it is the page's banner landmark. The content is main, so place one Workspace per page.
- Workspace carries its own skip link ('Skip to main content'): it appears on the first Tab and Enter moves focus to WorkspaceContent; the shell generates the content's id, and an id you pass wins. After navigation the application moves focus to WorkspaceContent; an explicit tabIndex from the caller wins.
- Content sent to the header appears after the first commit (it is not in server HTML); write the title directly as WorkspaceHeader's children when it must be there on first paint.
- In forced colors the shadow is removed and the container line carries the surface's boundary; no extra line is needed.
- WorkspaceTitle is the page's only h1; do not add a PageHeader title inside the content, and start sections at level 2.

## Use and ownership
- The shell of an admin-style application: persistent navigation at the side, one work surface for the current page.
- Avoid: Do not use it for reading-first pages that scroll as a whole, such as documentation or landing pages; use Section for a stretch of body content and Card for an independent object.
- Avoid: The header holds only this page's title, summary and page-level actions; the application places global entries such as search or notifications without taking the title's width.
- Avoid: Do not nest a second identical sheet inside the surface.
- Library: The shell geometry, the header's row height and midline, the header's slot for the page, and the content's scrolling and focus target.
- Application: Routing, the current item, the page title and summary, the real targets of actions, and moving focus to the content after navigation.

## Composition
- Workspace holds a Sidebar and a WorkspaceSurface; the surface holds WorkspaceHeader then WorkspaceContent.
- The page sets the content inset: --qy-page-gutter lines it up with the header title; a full-width table may run to the edge.
- Inside WorkspaceContent a page wraps WorkspaceTitle, WorkspaceSummary and WorkspaceActions in WorkspaceHeaderPortal.
- See /examples/records: Stack holds filters and DataTablePattern; hide detail for a list, or use a minmax(0,…) grid for list and detail. WorkspaceContent owns vertical scrolling; TableContainer handles horizontal overflow. Pagination scrolls with the list; the header stays fixed.
- The active record is independent from batch selection. Filtering and paging retain the active record and notes keyed by stable ID. Detail sits alongside the list at xl and stacks below it otherwise; 2:1 is a capacity choice for this task.

## Responsive behavior
- At narrow width (the library's single sm: point) the surface fills the viewport; whether the sidebar collapses or becomes a drawer is the application's choice.

## Customization
- className, render and ref belong to each part; the shell reads only system roles (ground, paper, container line, panel radius, panel shadow, page gutter, row height) and adds no component tokens.

## Current exports
- Workspace: function; owner workspace; PASS; props: WorkspaceProps
- WorkspaceActions: function; owner workspace; PASS; props: WorkspaceActionsProps
- WorkspaceActionsProps: type; owner workspace; PASS
- WorkspaceContent: function; owner workspace; PASS; props: WorkspaceContentProps
- WorkspaceContentProps: type; owner workspace; PASS
- WorkspaceHeader: function; owner workspace; PASS; props: WorkspaceHeaderProps
- WorkspaceHeaderPortal: function; owner workspace; PASS; props: WorkspaceHeaderPortalProps
- WorkspaceHeaderPortalProps: type; owner workspace; PASS
- WorkspaceHeaderProps: type; owner workspace; PASS
- WorkspaceProps: type; owner workspace; PASS
- WorkspaceSummary: function; owner workspace; PASS; props: WorkspaceSummaryProps
- WorkspaceSummaryProps: type; owner workspace; PASS
- WorkspaceSurface: function; owner workspace; PASS; props: WorkspaceSurfaceProps
- WorkspaceSurfaceProps: type; owner workspace; PASS
- WorkspaceTitle: function; owner workspace; PASS; props: WorkspaceTitleProps
- WorkspaceTitleProps: type; owner workspace; PASS

## Props declared by this library
Resolved from the TypeScript types of the installed source. Props inherited from the DOM or Base UI are counted, not listed.

### Workspace
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### WorkspaceActions
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### WorkspaceContent
- `transitionKey?`: `React.Key`. 换页的标识（通常是路由路径）。变化时把滚动回到顶部、重放一次进场（`data-motion="rise-in"`，调用方给了 `data-motion` 时重放调用方的值）；首次挂载不动。地址的 `#锚点` 落在新内容里时滚到锚点而不是顶部。进场遵守 motion.css：键盘输入时不播，减少动效时只淡入。
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### WorkspaceHeader
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### WorkspaceHeaderPortal
- `children?`: `React.ReactNode`.

### WorkspaceSummary
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### WorkspaceSurface
- no props declared by this library
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

### WorkspaceTitle
- `level?`: `1 | 2 | 3 | 4 | 5 | 6`. Document outline, independent of the visual text step.
- `numeric?`: `boolean`.
- `step?`: `"body" | "caption" | "label" | "title" | "display-xl" | "display-lg" | "display" | "chapter" | "heading" | "body-strong" | "reading" | "prose" | "prose-strong" | "prose-h1" | "prose-h2" | "prose-h3" | "support" | "support-mobile" | "support-strong" | "support-strong-mobile" | "dense" | "dense-mobile" | "dense-strong" | "dense-strong-mobile" | "caption-strong" | "label-mobile" | "metric" | "metric-lg" | "micro" | "control-xs" | "control-xs-mobile" | "control-sm" | "control-sm…`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, react-dom, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: reads UILocale; works without UILocaleProvider (default locale)
- Context SidebarHandleContext: without a provider nullable; provided by Workspace
- Context WorkspaceContext: without a provider nullable; provided by Workspace

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Workspace
The shell root: the sidebar and the surface side by side on the page ground, filling its container's height.
- render / ref / children / native props: useRender.ComponentProps<div>. Gives a direct Sidebar child a 2-unit inset (zero specificity, so padding on the Sidebar and its collapsed inset win); with a header, the sidebar's first row shares the header controls' midline.

### WorkspaceSurface
The work surface: paper, a light container line, panel radius and panel shadow; it clips the header and scroller inside.
- render / ref / children / native props: useRender.ComponentProps<div>. A 2-unit margin all round, 0 on the side next to the Sidebar; full-bleed at narrow width.

### WorkspaceHeader
The header inside the surface, a native header; one row tall (--qy-row-default: 48 by default, 44 compact) with a container line below.
- render / ref / children / native props: useRender.ComponentProps<header>. Its children come first; what a page sends through WorkspaceHeaderPortal follows. Render a div when the page already has a banner.

### WorkspaceTitle
The page title, built on Heading, truncated to one line.
- level / step / render / ref / Heading props: HeadingProps; default level=1, step="chapter". chapter (20/28) is the largest heading step that fits one fill-control height; level changes only the outline level.

### WorkspaceSummary
A one-line summary beside the title in support size and muted ink; it truncates first.
- render / ref / children / native props: useRender.ComponentProps<p>. Directly after the title, the gap tightens to the in-group gap.

### WorkspaceActions
Page-level actions at the end of the row, under the same rule as SectionActions.
- render / ref / children / native props: useRender.ComponentProps<div>. When a labelled quiet button (md or sm) ends the group, the group offsets its inline padding so the text meets the content's right edge.

### WorkspaceContent
The only scroll container, a native main. With room to spare it has tabIndex=-1 and is only a focus target; when its content overflows it has tabIndex=0 so the keyboard can stop and scroll, with a thin inset line on focus.
- render / ref / children / native props: useRender.ComponentProps<main>. The ref points at the scrolling element; scroll-following parts (a table of contents, a virtual list) take their container from it.
- transitionKey: React.Key. Identifies the page, usually the route path. When it changes the content scrolls back to the top and replays its entrance; the first mount does neither. With a #anchor in the address the scroll is left to the router. The entrance is skipped during keyboard use and reduced to a fade under reduced motion.

### WorkspaceHeaderPortal
Renders its children into the header's slot for the page; they unmount with the page.
- children: ReactNode. Renders no element of its own. Renders nothing without a header, on the server, or before the first commit.

## Keyboard
- Tab: Sidebar, header (including actions a page sent up), then content, in DOM order; when the content overflows, the content area itself is a stop.
- ↑ ↓ / Page Up / Page Down / Space: Scroll the content area while it has focus.

## Source examples
### 侧栏、顶栏与内容
Source: apps/docs/src/content/workspace/demos/01-shell.tsx
```tsx
import { IconChecklist, IconDatabase, IconLayoutDashboard, IconSettings } from "@tabler/icons-react";
import { useMediaQuery } from "@qingye_lab/ui/hooks/use-media-query";
import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@qingye_lab/ui/components/item";
import { Stack } from "@qingye_lab/ui/components/layout";
import { Section, SectionHeader, SectionTitle } from "@qingye_lab/ui/components/section";
import { Separator } from "@qingye_lab/ui/components/separator";
import { Sidebar, SidebarContent, SidebarGroup, SidebarHeader, SidebarLink, SidebarTitle } from "@qingye_lab/ui/components/sidebar";
import { Workspace, WorkspaceActions, WorkspaceContent, WorkspaceHeader, WorkspaceSummary, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "侧栏、顶栏与内容", titleEn: "Sidebar, header and content", flush: true } satisfies DemoMeta;

const SYNCED = [{ name: "蚕室温湿度", time: "今天 08:30" }, { name: "桑园采叶记录", time: "今天 07:55" }, { name: "上簇批次", time: "昨天 17:12" }, { name: "茧质抽检", time: "昨天 15:40" }];
const PENDING = [{ name: "饲料入库单", time: "10 月 11 日" }, { name: "消毒记录", time: "10 月 10 日" }];

export default function Demo() {
  const narrow = useMediaQuery("max-sm");
  // 演示框的高度只为让外壳在示例里可见；应用里 Workspace 填满它所在容器的高度。
  return <div className="h-[calc(24*var(--qy-cai))]">
    <Workspace className="max-sm:flex-col">
      <Sidebar aria-label="工作区" collapsed={narrow} className="w-[calc(10*var(--qy-cai))] shrink-0 max-sm:data-[collapsed=true]:w-full">
        <SidebarHeader className="max-sm:hidden"><SidebarTitle>青野工作区</SidebarTitle></SidebarHeader>
        <SidebarContent className="mt-(--qy-field-group-gap) max-sm:mt-0">
          <SidebarGroup className="max-sm:grid max-sm:grid-cols-[repeat(auto-fit,minmax(var(--qy-touch-target),1fr))]">
            <SidebarLink href="#overview" icon={<IconLayoutDashboard aria-hidden="true" />}>概览</SidebarLink>
            <SidebarLink href="#collections" active icon={<IconDatabase aria-hidden="true" />}>集合</SidebarLink>
            <SidebarLink href="#tasks" icon={<IconChecklist aria-hidden="true" />}>任务</SidebarLink>
            <SidebarLink href="#settings" icon={<IconSettings aria-hidden="true" />}>设置</SidebarLink>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <WorkspaceSurface>
        <WorkspaceHeader className="max-sm:h-auto max-sm:flex-wrap max-sm:gap-y-(--qy-field-gap) max-sm:py-(--qy-field-gap)">
          <WorkspaceTitle level={4}>集合</WorkspaceTitle>
          <WorkspaceSummary className="max-sm:hidden">6 个，2 个未同步</WorkspaceSummary>
          <WorkspaceActions className="max-sm:basis-full max-sm:flex-wrap"><Button variant="bordered">导入</Button><Button>新建集合</Button></WorkspaceActions>
        </WorkspaceHeader>
        <WorkspaceContent render={<div />}>
          <Stack gap="section" className="p-(--qy-page-gutter)">
            <Section>
              <SectionHeader><SectionTitle>未同步 <span className="numeric text-muted-foreground">{PENDING.length}</span></SectionTitle></SectionHeader>
              {PENDING.map(item => <Item key={item.name}><ItemContent><ItemTitle>{item.name}</ItemTitle><ItemDescription>{item.time}</ItemDescription></ItemContent></Item>)}
            </Section>
            <Separator />
            <Section>
              <SectionHeader><SectionTitle>已同步 <span className="numeric text-muted-foreground">{SYNCED.length}</span></SectionTitle></SectionHeader>
              {SYNCED.map(item => <Item key={item.name}><ItemContent><ItemTitle>{item.name}</ItemTitle><ItemDescription>{item.time}</ItemDescription></ItemContent></Item>)}
            </Section>
          </Stack>
        </WorkspaceContent>
      </WorkspaceSurface>
    </Workspace>
  </div>;
}
```

### 页面把标题与操作送进顶栏
Source: apps/docs/src/content/workspace/demos/02-page-slot.tsx
```tsx
import * as React from "react";
import { IconDatabase, IconUsers } from "@tabler/icons-react";
import { useMediaQuery } from "@qingye_lab/ui/hooks/use-media-query";
import { Button } from "@qingye_lab/ui/components/button";
import { Item, ItemContent, ItemDescription, ItemTitle } from "@qingye_lab/ui/components/item";
import { Sidebar, SidebarContent, SidebarGroup, SidebarLink } from "@qingye_lab/ui/components/sidebar";
import { Workspace, WorkspaceActions, WorkspaceContent, WorkspaceHeader, WorkspaceHeaderPortal, WorkspaceSummary, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";
import type { DemoMeta } from "@/lib/types";

export const meta = { title: "页面把标题与操作送进顶栏", titleEn: "A page sends its title and actions to the header", flush: true } satisfies DemoMeta;

function Collections() {
  return <>
    <WorkspaceHeaderPortal>
      <WorkspaceTitle level={4}>集合</WorkspaceTitle>
      <WorkspaceSummary className="max-sm:hidden">6 个</WorkspaceSummary>
      <WorkspaceActions className="max-sm:basis-full max-sm:flex-wrap"><Button>新建集合</Button></WorkspaceActions>
    </WorkspaceHeaderPortal>
    <div className="p-(--qy-page-gutter)">
      <Item><ItemContent><ItemTitle>蚕室温湿度</ItemTitle><ItemDescription>今天 08:30</ItemDescription></ItemContent></Item>
      <Item><ItemContent><ItemTitle>桑园采叶记录</ItemTitle><ItemDescription>今天 07:55</ItemDescription></ItemContent></Item>
    </div>
  </>;
}

function Members() {
  return <>
    <WorkspaceHeaderPortal>
      <WorkspaceTitle level={4}>成员</WorkspaceTitle>
      <WorkspaceSummary className="max-sm:hidden">4 人</WorkspaceSummary>
      <WorkspaceActions className="max-sm:basis-full max-sm:flex-wrap"><Button variant="quiet">导出</Button><Button>邀请成员</Button></WorkspaceActions>
    </WorkspaceHeaderPortal>
    <div className="p-(--qy-page-gutter)">
      <Item><ItemContent><ItemTitle>陈致远</ItemTitle><ItemDescription>管理员</ItemDescription></ItemContent></Item>
      <Item><ItemContent><ItemTitle>林晚</ItemTitle><ItemDescription>编辑</ItemDescription></ItemContent></Item>
    </div>
  </>;
}

export default function Demo() {
  const [page, setPage] = React.useState<"collections" | "members">("collections");
  const narrow = useMediaQuery("max-sm");
  return <div className="h-[calc(16*var(--qy-cai))]">
    <Workspace className="max-sm:flex-col">
      <Sidebar aria-label="工作区" collapsed={narrow} className="w-[calc(10*var(--qy-cai))] shrink-0 max-sm:data-[collapsed=true]:w-full">
        <SidebarContent>
          <SidebarGroup className="max-sm:grid max-sm:grid-cols-[repeat(auto-fit,minmax(var(--qy-touch-target),1fr))]">
            <SidebarLink render={<button type="button" onClick={() => setPage("collections")} />} active={page === "collections"} icon={<IconDatabase aria-hidden="true" />}>集合</SidebarLink>
            <SidebarLink render={<button type="button" onClick={() => setPage("members")} />} active={page === "members"} icon={<IconUsers aria-hidden="true" />}>成员</SidebarLink>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <WorkspaceSurface>
        <WorkspaceHeader className="max-sm:h-auto max-sm:flex-wrap max-sm:gap-y-(--qy-field-gap) max-sm:py-(--qy-field-gap)" />
        <WorkspaceContent render={<div />}>{page === "collections" ? <Collections /> : <Members />}</WorkspaceContent>
      </WorkspaceSurface>
    </Workspace>
  </div>;
}
```

### 列表与详情
Source: apps/docs/src/content/workspace/demos/03-records.tsx
```tsx
import { useMemo, useState } from "react";
import type { DemoMeta } from "@/lib/types";
import { Alert, AlertDescription } from "@qingye_lab/ui/components/alert";
import { DataTablePattern, type DataTablePatternColumn, type DataTablePatternState } from "@qingye_lab/ui/components/data-table";
import { DescriptionList, DescriptionListDetail, DescriptionListItem, DescriptionListTerm } from "@qingye_lab/ui/components/description-list";
import { Field, FieldLabel } from "@qingye_lab/ui/components/field";
import { Inline, Stack } from "@qingye_lab/ui/components/layout";
import { SearchInput } from "@qingye_lab/ui/components/search-input";
import { Textarea } from "@qingye_lab/ui/components/textarea";
import { Toggle } from "@qingye_lab/ui/components/toggle";
import { Workspace, WorkspaceActions, WorkspaceContent, WorkspaceHeader, WorkspaceSummary, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";

export const meta = { title: "列表与详情", titleEn: "List and detail", flush: true } satisfies DemoMeta;

type RecordItem = { id: string; name: string; owner: string; count: number; updated: string };
const records: RecordItem[] = Array.from({ length: 36 }, (_, index) => ({
  id: `record-${index + 1}`,
  name: index === 0 ? "桑园采叶与跨区域运输交接记录（含东区、西区及临时库房的长名称核对）" : `${["蚕室温湿度", "桑园采叶", "上簇批次", "茧质抽检", "饲料入库", "消毒巡检"][index % 6]} · ${index + 1} 号`,
  owner: ["陈致远", "林晚", "周禾"][index % 3]!, count: 120 + index * 17, updated: `今天 ${String(8 + index % 3).padStart(2, "0")}:${String(index % 60).padStart(2, "0")}`,
}));
const columns: DataTablePatternColumn<RecordItem>[] = [
  { id: "name", header: "记录", accessor: row => row.name, rowHeader: true, sortable: true, cell: row => <span className="text-start whitespace-normal wrap-anywhere">{row.name}</span> },
  { id: "owner", header: "负责人", accessor: row => row.owner },
  { id: "count", header: "条目", accessor: row => row.count, numeric: true, sortable: true },
  { id: "updated", header: "更新时间", accessor: row => row.updated, cell: row => <span className="whitespace-nowrap text-muted-foreground">{row.updated}</span> },
];
const initialState: DataTablePatternState = { sorting: [], pagination: { page: 1, pageSize: 10 }, rowSelection: {}, activeRowId: records[0]!.id };

/**
 * 可复制的应用组合：Header 固定，WorkspaceContent 是唯一纵向滚动 owner；
 * 表格只拥有横向溢出。详情随页面滚动，不再建立一组嵌套的纵向滚动区。
 * 2:1 是此参考页面对列表比较与备注编辑容量的选择；表格 32 材最小宽度也是
 * 此页面四列比较与勾选列的阅读容量预设，窄屏由 TableContainer 横向滚动，不是库的默认列宽。
 */
export function RecordsWorkspace({ embedded = false }: { embedded?: boolean }) {
  const [query, setQuery] = useState("");
  const [state, setState] = useState(initialState);
  const [details, setDetails] = useState(true);
  const [compact, setCompact] = useState(false);
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  const filtered = useMemo(() => records.filter(row => row.name.includes(query.trim()) || row.owner.includes(query.trim())), [query]);
  const active = records.find(row => row.id === state.activeRowId);
  const selectedCount = Object.values(state.rowSelection).filter(Boolean).length;
  return <div className={embedded ? "h-[calc(30*var(--qy-cai))]" : "h-full"} data-density={compact ? "compact" : "default"}>
    <Workspace>
      <WorkspaceSurface>
        <WorkspaceHeader render={embedded ? <div /> : <header />} className="h-auto min-h-(--qy-row-default) flex-wrap gap-y-(--qy-field-gap) py-(--qy-field-gap)">
          <WorkspaceTitle level={embedded ? 3 : 1}>采集记录</WorkspaceTitle>
          <WorkspaceSummary className="max-sm:hidden">{filtered.length} 份记录，已选 {selectedCount} 份</WorkspaceSummary>
          <WorkspaceActions className="flex-wrap"><Toggle pressed={compact} onPressedChange={setCompact}>紧凑</Toggle><Toggle pressed={details} onPressedChange={setDetails}>详情</Toggle></WorkspaceActions>
        </WorkspaceHeader>
        <WorkspaceContent render={embedded ? <div /> : <main />} id={embedded ? undefined : "main"}>
          <Stack gap="panel" className="p-(--qy-page-gutter)">
            <Inline gap="panel"><SearchInput aria-label="搜索采集记录" placeholder="搜索记录或负责人" value={query} onValueChange={next => {
              setQuery(next); setState(previous => ({ ...previous, pagination: { ...previous.pagination, page: 1 } }));
            }} controlClassName="w-full sm:max-w-[calc(16*var(--qy-cai))]" /><span className="text-support text-muted-foreground">已选 {selectedCount} 份（含其他页）</span></Inline>
            <div className={details ? "grid min-w-0 items-start gap-(--qy-section-gap) xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]" : "min-w-0"}>
              <DataTablePattern data={filtered} columns={columns} getRowId={row => row.id} state={state} onStateChange={setState}
                pagination={{ pageSizeOptions: [10, 20, 50], "aria-label": "采集记录分页" }}
                selection={{ label: "选择本页记录", rowLabel: row => `选择${row.name}` }} activeRow={{ columnId: "name" }}
                tableProps={{ "aria-label": "采集记录", className: "min-w-[calc(32*var(--qy-cai))]", containerProps: { framed: false } }}
                emptyContent={<span className="text-muted-foreground">没有匹配的记录</span>} />
              {details && active && <Stack render={<aside aria-label="记录详情" lang="zh-CN" />} gap="panel">
                <h2 className="m-0 text-heading wrap-anywhere">{active.name}</h2>
                {!filtered.some(row => row.id === active.id) && <Alert tone="info"><AlertDescription>这份记录不在当前筛选结果中，备注仍保留。</AlertDescription></Alert>}
                <DescriptionList><DescriptionListItem><DescriptionListTerm>编号</DescriptionListTerm><DescriptionListDetail>{active.id}</DescriptionListDetail></DescriptionListItem><DescriptionListItem><DescriptionListTerm>负责人</DescriptionListTerm><DescriptionListDetail>{active.owner}</DescriptionListDetail></DescriptionListItem><DescriptionListItem><DescriptionListTerm>条目</DescriptionListTerm><DescriptionListDetail className="numeric">{active.count}</DescriptionListDetail></DescriptionListItem></DescriptionList>
                <Field><FieldLabel>本地备注</FieldLabel><Textarea value={drafts[active.id] ?? ""} onValueChange={next => setDrafts(previous => ({ ...previous, [active.id]: next }))} placeholder="写下待核对事项" /></Field>
                <p className="m-0 text-support text-muted-foreground">备注仅保留在当前页面，离开页面后清除。</p>
              </Stack>}
            </div>
          </Stack>
        </WorkspaceContent>
      </WorkspaceSurface>
    </Workspace>
  </div>;
}

export default function Demo() { return <><RecordsWorkspace embedded /><p className="m-0 p-(--qy-panel-padding-sm) text-support"><a href="/examples/records" className="text-foreground underline underline-offset-4">打开完整工作台</a></p></>; }
```
