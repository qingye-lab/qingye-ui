import * as React from "react";
import { IconDatabase, IconUsers } from "@tabler/icons-react";
import { useMediaQuery } from "@qingye_lab/ui";
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
