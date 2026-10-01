const e=`import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbList, BreadcrumbPage } from "@qingye/ui/components/breadcrumb";
import { Collapsible, CollapsiblePanel, CollapsibleTrigger } from "@qingye/ui/components/collapsible";
import { Menu, MenuItem, MenuPopup, MenuSeparator, MenuTrigger } from "@qingye/ui/components/menu";
import { Separator } from "@qingye/ui/components/separator";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupAction, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubButton, SidebarMenuSubItem, SidebarProvider, SidebarRail, SidebarTrigger } from "@qingye/ui/components/sidebar";
import {
  CalendarIcon,
  ChevronRightIcon,
  ChevronsUpDownIcon,
  EllipsisIcon,
  FolderIcon,
  InboxIcon,
  ListTodoIcon,
  PlusIcon,
  SparklesIcon,
} from "lucide-react";

export const meta = {
  title: "应用框架",
  description:
    "工作区切换、带标签的分组、可展开的子菜单、计数与悬停操作、底部用户菜单。点击侧栏边缘或按 ⌘/Ctrl + B 折叠为图标栏；窄于 800px 时侧栏变为抽屉。",
  flush: true,
};

const workspace = [
  { icon: InboxIcon, label: "收件箱", count: 12, active: true },
  { icon: ListTodoIcon, label: "我的任务", count: 4 },
  { icon: CalendarIcon, label: "日程" },
];

const projects = [
  { name: "青烟官网改版", pages: ["设计稿", "开发进度", "上线清单"], open: true },
  { name: "移动端 App", pages: ["需求池", "版本计划"] },
  { name: "年度品牌活动", pages: ["物料", "预算"] },
];

export default function Demo() {
  return (
    <SidebarProvider className="relative h-80 min-h-0 md:h-[34rem] overflow-hidden rounded-[calc(var(--radius-xl)-1px)]">
      <Sidebar className="absolute h-full" collapsible="icon">
        <SidebarHeader>
          <SidebarMenu>
            <SidebarMenuItem>
              <Menu>
                <MenuTrigger render={<SidebarMenuButton size="lg" />}>
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                    <SparklesIcon className="size-4" />
                  </div>
                  <div className="grid flex-1 text-start leading-tight">
                    <span className="truncate font-medium text-sidebar-accent-foreground">青烟科技</span>
                    <span className="truncate text-xs">团队版 · 18 人</span>
                  </div>
                  <ChevronsUpDownIcon className="ms-auto" />
                </MenuTrigger>
                <MenuPopup align="start" className="w-56">
                  <MenuItem>青烟科技</MenuItem>
                  <MenuItem>远山设计工作室</MenuItem>
                  <MenuSeparator />
                  <MenuItem>创建工作区</MenuItem>
                </MenuPopup>
              </Menu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarHeader>

        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>工作台</SidebarGroupLabel>
            <SidebarMenu>
              {workspace.map((item) => (
                <SidebarMenuItem key={item.label}>
                  <SidebarMenuButton isActive={Boolean(item.active)} tooltip={item.label}>
                    <item.icon />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                  {item.count ? <SidebarMenuBadge>{item.count}</SidebarMenuBadge> : null}
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>

          <SidebarGroup>
            <SidebarGroupLabel>项目</SidebarGroupLabel>
            <SidebarGroupAction aria-label="新建项目">
              <PlusIcon />
            </SidebarGroupAction>
            <SidebarGroupContent>
              <SidebarMenu>
                {projects.map((project) => (
                  <Collapsible defaultOpen={project.open} key={project.name} render={<SidebarMenuItem />}>
                    <CollapsibleTrigger render={<SidebarMenuButton tooltip={project.name} />}>
                      <FolderIcon />
                      <span>{project.name}</span>
                      <ChevronRightIcon className="ms-auto transition-transform duration-200 in-data-panel-open:rotate-90 rtl:-scale-x-100" />
                    </CollapsibleTrigger>
                    <Menu>
                      <MenuTrigger aria-label={\`\${project.name}操作\`} render={<SidebarMenuAction showOnHover />}>
                        <EllipsisIcon />
                      </MenuTrigger>
                      <MenuPopup align="start" side="right">
                        <MenuItem>重命名</MenuItem>
                        <MenuItem>复制链接</MenuItem>
                        <MenuItem variant="destructive">归档</MenuItem>
                      </MenuPopup>
                    </Menu>
                    <CollapsiblePanel>
                      <SidebarMenuSub>
                        {project.pages.map((page, i) => (
                          <SidebarMenuSubItem key={page}>
                            <SidebarMenuSubButton href="#" isActive={Boolean(project.open) && i === 0}>
                              <span>{page}</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        ))}
                      </SidebarMenuSub>
                    </CollapsiblePanel>
                  </Collapsible>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>

        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <Menu>
                <MenuTrigger render={<SidebarMenuButton size="lg" />}>
                  <Avatar className="size-8">
                    <AvatarFallback>林</AvatarFallback>
                  </Avatar>
                  <div className="grid flex-1 text-start leading-tight">
                    <span className="truncate font-medium text-sidebar-accent-foreground">林晓</span>
                    <span className="truncate text-xs">linxiao@qingyan.tech</span>
                  </div>
                  <ChevronsUpDownIcon className="ms-auto" />
                </MenuTrigger>
                <MenuPopup align="end" className="w-56" side="top">
                  <MenuItem>个人资料</MenuItem>
                  <MenuItem>偏好设置</MenuItem>
                  <MenuSeparator />
                  <MenuItem>退出登录</MenuItem>
                </MenuPopup>
              </Menu>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
        <SidebarRail />
      </Sidebar>

      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <Separator className="h-4" orientation="vertical" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>收件箱</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>
        <div className="flex flex-col gap-2 p-4">
          {["周舟 提到了你：首页首屏的动效再收一点", "陈默 完成了「接入支付回调」", "许诺 邀请你评审 v3 设计稿"].map((text) => (
            <div className="rounded-lg border px-3 py-2.5 text-sm" key={text}>
              {text}
            </div>
          ))}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
`;export{e as default};
