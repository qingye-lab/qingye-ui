import { IconLayoutSidebar, IconListTree, IconStack2 } from "@tabler/icons-react";
import { Inline } from "@qingye_lab/ui/components/layout";
import { Sidebar, SidebarContent, SidebarGroup, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarToggle } from "@qingye_lab/ui/components/sidebar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "当前位置", titleEn: "Current location" } satisfies DemoMeta;

function Links({ current }: { current: "sidebar" | "tabs" }) {
  return <SidebarGroup>
    <SidebarLink href="/components/sidebar" active={current === "sidebar"} icon={<IconLayoutSidebar aria-hidden="true" />}>侧栏导航</SidebarLink>
    <SidebarSub defaultOpen>
      <SidebarSubTrigger icon={<IconStack2 aria-hidden="true" />}>视角标签</SidebarSubTrigger>
      <SidebarSubContent>
        <SidebarLink href="/components/tabs" active={current === "tabs"}>标签页</SidebarLink>
        <SidebarLink href="/components/segmented-control">分段控件</SidebarLink>
      </SidebarSubContent>
    </SidebarSub>
    <SidebarLink href="/components/tree" icon={<IconListTree aria-hidden="true" />}>层级集合</SidebarLink>
  </SidebarGroup>;
}

export default function Demo() {
  return <Inline gap="section" align="start" className="w-full">
    <Sidebar className="w-full max-w-xs"><SidebarToggle /><SidebarContent aria-label="当前位置在二级"><Links current="tabs" /></SidebarContent></Sidebar>
    <Sidebar defaultCollapsed><SidebarToggle /><SidebarContent aria-label="收起时的当前位置"><Links current="sidebar" /></SidebarContent></Sidebar>
  </Inline>;
}
