import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarSeparator, SidebarTrigger } from "@qingye/ui/components/sidebar";
import {
  BarChart3Icon,
  HomeIcon,
  LifeBuoyIcon,
  RocketIcon,
  ServerIcon,
  SettingsIcon,
  TriangleIcon,
} from "lucide-react";

export const meta = {
  title: "图标栏与浮起样式",
  description: "variant=\"floating\" 与 collapsible=\"icon\"，初始折叠；折叠时悬停图标显示名称。",
  flush: true,
};

const items = [
  { icon: HomeIcon, label: "概览", active: true },
  { icon: RocketIcon, label: "部署" },
  { icon: ServerIcon, label: "服务器" },
  { icon: BarChart3Icon, label: "监控" },
];

export default function Demo() {
  return (
    <SidebarProvider
      className="relative h-72 min-h-0 md:h-[26rem] overflow-hidden rounded-[calc(var(--radius-xl)-1px)]"
      defaultOpen={false}
    >
      <Sidebar className="absolute h-full" collapsible="icon" variant="floating">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="青烟云">
                <TriangleIcon />
                <span className="font-semibold text-sidebar-accent-foreground">青烟云</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>
        <SidebarSeparator />
        <SidebarContent>
          <SidebarGroup>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={Boolean(item.active)} tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="帮助中心">
                <LifeBuoyIcon />
                <span>帮助中心</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip="设置">
                <SettingsIcon />
                <span>设置</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 px-3">
          <SidebarTrigger />
          <span className="font-medium text-sm">概览</span>
        </header>
        <div className="grid grid-cols-2 gap-3 px-3 pb-3">
          {[
            ["本月部署", "126"],
            ["在线服务器", "18"],
          ].map(([label, value]) => (
            <div className="rounded-xl border p-4" key={label}>
              <div className="text-muted-foreground text-xs">{label}</div>
              <div className="numeric mt-1 font-semibold text-2xl">{value}</div>
            </div>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
