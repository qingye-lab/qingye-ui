import { LayoutPanelLeftIcon, ListTreeIcon, SquareStackIcon } from "lucide-react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarLink, SidebarSub, SidebarSubContent, SidebarSubTrigger, SidebarToggle } from "@qingye/ui/components/sidebar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "可逆导航与二级", titleEn: "Reversible navigation with a sub-level" } satisfies DemoMeta;
export default function Demo() {
  return <Sidebar className="w-full max-w-sm"><SidebarToggle /><SidebarContent aria-label="组件侧栏"><SidebarGroup><SidebarGroupLabel>导航</SidebarGroupLabel><SidebarLink href="/components/sidebar" active icon={<LayoutPanelLeftIcon aria-hidden="true" />}>侧栏导航</SidebarLink><SidebarSub defaultOpen><SidebarSubTrigger icon={<SquareStackIcon aria-hidden="true" />}>视角标签</SidebarSubTrigger><SidebarSubContent><SidebarLink href="/components/tabs">标签页</SidebarLink><SidebarLink href="/components/segmented-control">分段控件</SidebarLink></SidebarSubContent></SidebarSub><SidebarLink href="/components/tree" icon={<ListTreeIcon aria-hidden="true" />}>层级集合</SidebarLink></SidebarGroup></SidebarContent></Sidebar>;
}
