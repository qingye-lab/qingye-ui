import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarLink, SidebarToggle } from "@qingye/ui/components/sidebar";
import type { DemoMeta } from "@/lib/types";
export const meta = { title: "可逆导航", titleEn: "Reversible navigation" } satisfies DemoMeta;
export default function Demo() { return <Sidebar className="w-full max-w-sm"><SidebarToggle /><SidebarContent aria-label="组件侧栏"><SidebarGroup><SidebarGroupLabel>导航</SidebarGroupLabel><SidebarLink href="/components/sidebar" active>侧栏导航</SidebarLink><SidebarLink href="/components/tabs">视角标签</SidebarLink><SidebarLink href="/components/tree">层级集合</SidebarLink></SidebarGroup></SidebarContent></Sidebar>; }
