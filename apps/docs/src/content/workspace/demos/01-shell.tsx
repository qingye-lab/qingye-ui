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
        <SidebarContent aria-label="外壳示例导航" className="mt-(--qy-field-group-gap) max-sm:mt-0">
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
