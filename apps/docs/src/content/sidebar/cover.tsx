import { IconLayoutSidebar, IconListTree } from "@tabler/icons-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarLink } from "@qingye_lab/ui/components/sidebar";

export default function Cover() {
  return <Sidebar className="w-full">
    <SidebarContent aria-label="侧栏">
      <SidebarGroup>
        <SidebarGroupLabel>导航</SidebarGroupLabel>
        <SidebarLink href="#current" active icon={<IconLayoutSidebar aria-hidden="true" />}>侧栏导航</SidebarLink>
        <SidebarLink href="#tree" icon={<IconListTree aria-hidden="true" />}>层级集合</SidebarLink>
      </SidebarGroup>
    </SidebarContent>
  </Sidebar>;
}
