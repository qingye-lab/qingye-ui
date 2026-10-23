# 工作面 Workspace

Package: @qingye_lab/ui@4.2.0
Import: @qingye_lab/ui/components/workspace
Source: packages/ui/src/components/workspace.tsx
Source SHA-256: ee8afe35a87b7c2482febea3328ed6d9a3dbb3e4cd5e697fc0e2064b91bb68b0

应用外壳：底纸上的侧栏旁放一张工作面，顶栏在工作面里，下面是唯一的滚动区。

## Decision
页面的名称、摘要与页面级操作在顶栏里，正文不再立第二个大标题。工作面四周一个 2 分的外边距，紧挨侧栏的一侧不另加：那道间隔是侧栏的内缘，侧栏与工作面之间读来只有一个间隔。窄屏工作面贴满视口，去掉外边距、圆角、线与阴影。路由页面用 WorkspaceHeaderPortal 把自己的标题与操作送进顶栏；顶栏在 DOM 里先于内容区，送上去的操作在 Tab 顺序里也先于正文。

## Notes
- 顶栏是一个 header；不在 main、section 或 article 里时，它是页面的 banner 地标。内容区是 main，一页只放一个 Workspace。
- 换页后由应用把焦点移到 WorkspaceContent，跳转链接也指向它的 id；调用方显式传入的 tabIndex 优先。
- 送进顶栏的内容在首次提交后出现（服务端渲染时不在 HTML 里）；需要首屏就有标题时，直接写在 WorkspaceHeader 的 children 里。
- 强制颜色下阴影被移除，工作面的范围由容器线承担，不需要额外补线。

## Use and ownership
- 后台类应用的外壳：长期导航在侧，一张工作面承载当前页面。
- Avoid: 文档、落地页这类以阅读为主、整页滚动的页面不用；正文里的一段内容用 Section，独立对象用 Card。
- Avoid: 顶栏只放这一页的标题、摘要与页面级操作；全局搜索、通知等应用级入口由应用决定位置，不挤占标题的宽度。
- Avoid: 工作面里不再套第二张同样的纸。
- Library: 外壳的几何、顶栏的行高与中线、顶栏留给页面的位置、内容区的滚动与焦点落点。
- Application: 路由、当前项、页面标题与摘要的内容、操作的真实目标、换页后把焦点移到内容区。

## Composition
- Workspace 的子级是 Sidebar 与 WorkspaceSurface；WorkspaceSurface 里依次是 WorkspaceHeader 与 WorkspaceContent。
- 内容区的内缘由页面给：取 --qy-page-gutter 时与顶栏标题同一条左缘；整幅的表格可以贴边。
- 页面在 WorkspaceContent 里用 WorkspaceHeaderPortal 包住 WorkspaceTitle、WorkspaceSummary、WorkspaceActions。
- 列表参考组合见 /examples/records：Stack 放筛选与 DataTablePattern，关闭详情即为列表；展开时用 minmax(0,…) 网格放列表与详情。WorkspaceContent 唯一拥有纵向滚动，TableContainer 只承接横向溢出。分页随列表滚动，顶栏固定。
- 活动记录与批量选择独立；筛选或翻页保留活动记录和以稳定 ID 保存的备注。示例详情在 xl 以上并排，以下堆叠；2:1 比例是此任务的容量选择。

## Responsive behavior
- 窄屏（与全库同一个 sm: 点）工作面贴满视口；侧栏是否收起或换成抽屉由应用决定。

## Customization
- className、render 与 ref 属于各自的部件；外壳只读系统角色（底纸、纸、容器线、面板圆角、面板阴影、页边距、行高），不另设组件令牌。

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
- no props declared by this library
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
- `step?`: `"body" | "caption" | "label" | "title" | "display-xl" | "display-lg" | "display" | "chapter" | "heading" | "body-strong" | "reading" | "prose" | "prose-strong" | "prose-h1" | "prose-h2" | "prose-h3" | "support" | "support-mobile" | "support-strong" | "support-strong-mobile" | "dense" | "dense-mobile" | "dense-strong" | "dense-strong-mobile" | "caption-strong" | "metric" | "metric-lg" | "micro" | "control-xs" | "control-xs-mobile" | "control-sm" | "control-sm-mobile" | "contr…`.
- plus 281 inherited (@types/react 280, @base-ui/react 1); not expanded, see the installed declarations

## Dependencies and providers
- Runtime: @base-ui/react, clsx, react, react-dom, tailwind-merge
- Optional peers: none recorded
- Required providers: none
- Locale: does not read UILocale
- Context WorkspaceContext: without a provider nullable; provided by Workspace

## Curated API
Written descriptions; the list above is the type-resolved fact.

### Workspace
外壳根：底纸上横向排布侧栏与工作面，填满所在容器的高度。
- render / ref / children / native props: useRender.ComponentProps<div>. 给直接子级 Sidebar 一圈 2 分的内缘（零特异度，Sidebar 上写的内缘与收起时的内缩优先）；有顶栏时侧栏第一行与顶栏控件同一条中线。

### WorkspaceSurface
工作面：纸本色、清墨容器线、面板圆角、面板阴影；裁切内部的顶栏与滚动区。
- render / ref / children / native props: useRender.ComponentProps<div>. 四周外边距 2 分，紧挨 Sidebar 的一侧为 0；窄屏贴满视口。

### WorkspaceHeader
工作面里的顶栏，原生 header；高度为一行（--qy-row-default，默认 48、紧凑 44），下缘一道容器线。
- render / ref / children / native props: useRender.ComponentProps<header>. children 在前，页面经 WorkspaceHeaderPortal 送来的内容排在其后。页面另有 banner 时可 render 为 div。

### WorkspaceTitle
页面标题，复用 Heading，单行截断。
- level / step / render / ref / Heading props: HeadingProps; default level=1, step="chapter". chapter（20/28）是放得进一个填值控件高的最大标题档；level 只改大纲层级。

### WorkspaceSummary
标题旁的一句摘要：辅助字号、浓墨、单行，空间不够时先截断它。
- render / ref / children / native props: useRender.ComponentProps<p>. 紧跟标题时间隔收回到组内间隔。

### WorkspaceActions
页面级操作，靠行尾；与 SectionActions 同一规则。
- render / ref / children / native props: useRender.ComponentProps<div>. 以有名称的 quiet 按钮（md 或 sm）收尾时整组抵消它的横向留白，文字压在内容右缘。

### WorkspaceContent
唯一的滚动容器，原生 main。放得下时 tabIndex=-1，只作焦点落点；内容溢出时 tabIndex=0，键盘可停下滚动，获焦时盒内一道细线。
- render / ref / children / native props: useRender.ComponentProps<main>. ref 指向滚动元素，跟随滚动的部件（目录、虚拟列表）从这里取容器。

### WorkspaceHeaderPortal
把子级渲染进顶栏留给页面的位置；页面卸下时随之卸下。
- children: ReactNode. 不产生自己的元素。没有顶栏、在服务端或首次提交之前时什么也不渲染。

## Keyboard
- Tab: 侧栏、顶栏（含页面送上来的操作）、内容区，按 DOM 顺序；内容溢出时内容区本身也是一站。
- ↑ ↓ / Page Up / Page Down / Space: 焦点在内容区时滚动它。

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
              {details && active && <Stack render={<aside aria-label="记录详情" />} gap="panel">
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
