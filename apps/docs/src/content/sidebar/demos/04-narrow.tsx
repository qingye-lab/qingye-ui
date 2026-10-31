import * as React from "react";
import { IconDatabase, IconLayoutDashboard, IconSettings } from "@tabler/icons-react";
import { Sidebar, SidebarContent, SidebarDrawerTrigger, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarLink, SidebarTitle, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import { Workspace, WorkspaceContent, WorkspaceHeader, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";
import { useUILocale } from "@qingye_lab/ui/locale";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "窄屏：抽屉承载侧栏", titleEn: "Narrow screens: a drawer carries the sidebar", flush: true } satisfies DemoMeta;

// 窄屏（< 40rem）时侧栏进入抽屉，WorkspaceHeader 里出现打开它的按钮；更宽时就是原位的侧栏。
export default function Demo() {
  const { code } = useUILocale(); const en = code.startsWith("en");
  const pages = [
    { id: "overview", name: en ? "Overview" : "概览", icon: <IconLayoutDashboard aria-hidden="true" /> },
    { id: "collections", name: en ? "Collections" : "集合", icon: <IconDatabase aria-hidden="true" /> },
    { id: "settings", name: en ? "Settings" : "设置", icon: <IconSettings aria-hidden="true" /> },
  ];
  const [page, setPage] = React.useState("collections");
  return <div className="h-[calc(20*var(--qy-cai))]">
    <Workspace>
      <Sidebar drawer>
        <SidebarHeader><SidebarTitle render={<h2 />}>{en ? "Qingye" : "青野工作区"}</SidebarTitle><SidebarToggle /></SidebarHeader>
        <SidebarContent aria-label="窄屏侧栏导航" className="mt-(--qy-field-group-gap)">
          <SidebarGroup>
            <SidebarGroupLabel>{en ? "Pages" : "页面"}</SidebarGroupLabel>
            {pages.map(item => <SidebarLink key={item.id} render={<button type="button" onClick={() => setPage(item.id)} />} active={page === item.id} icon={item.icon}>{item.name}</SidebarLink>)}
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <WorkspaceSurface>
        <WorkspaceHeader><SidebarDrawerTrigger /><WorkspaceTitle level={3}>{pages.find(item => item.id === page)?.name}</WorkspaceTitle></WorkspaceHeader>
        <WorkspaceContent render={<div />} />
      </WorkspaceSurface>
    </Workspace>
  </div>;
}
