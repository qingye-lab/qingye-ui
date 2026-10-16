# 工作面 Workspace

Package: @qingye_lab/ui@4.0.0
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
