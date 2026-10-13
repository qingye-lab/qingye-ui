import { IconDatabase, IconLayoutDashboard } from "@tabler/icons-react";
import { Button } from "@qingye_lab/ui/components/button";
import { Sidebar, SidebarContent, SidebarGroup, SidebarLink } from "@qingye_lab/ui/components/sidebar";
import { Workspace, WorkspaceActions, WorkspaceContent, WorkspaceHeader, WorkspaceSurface, WorkspaceTitle } from "@qingye_lab/ui/components/workspace";

export default function Cover() {
  return <div className="h-[calc(10*var(--qy-cai))] w-full">
    <Workspace>
      <Sidebar aria-label="工作区" className="w-[calc(7*var(--qy-cai))] shrink-0">
        <SidebarContent>
          <SidebarGroup>
            <SidebarLink href="#overview" icon={<IconLayoutDashboard aria-hidden="true" />}>概览</SidebarLink>
            <SidebarLink href="#collections" active icon={<IconDatabase aria-hidden="true" />}>集合</SidebarLink>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <WorkspaceSurface>
        <WorkspaceHeader><WorkspaceTitle level={3}>集合</WorkspaceTitle><WorkspaceActions><Button size="sm">新建</Button></WorkspaceActions></WorkspaceHeader>
        <WorkspaceContent render={<div />} />
      </WorkspaceSurface>
    </Workspace>
  </div>;
}
