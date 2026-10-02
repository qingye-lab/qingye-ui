# 侧边栏 Sidebar

Package: @qingye/ui@0.3.0
Import: @qingye/ui/components/sidebar
Source: packages/ui/src/components/sidebar.tsx
Source SHA-256: be375c0f60b4e666c2835ab8a196e38c1446182ebe6e41efc581863f9ed55b6b

应用的主导航框架：分组菜单、子菜单、计数与操作，可折叠为图标栏；在窄屏上自动变为抽屉。适合后台、工作台这类常驻导航的应用。

## Use and ownership
- 保持工作区主导航常驻，让对象入口、当前页与分组关系在连续工作中可辨认。
- Avoid: 折叠状态不能吞掉当前页语义；全局导航快捷键不能拦截输入、编辑器或合成输入。
- Library: 管理受控 / 非受控开关、已接受状态的最佳努力持久化、移动关闭与焦点返回，透传原生属性。
- Application: 维护真实路由、分组对象、权限与草稿；跨断点需要保留的子组件状态提升到稳定应用 owner。

## Composition
- Provider 关联桌面开关与移动 Sheet；导航项 isActive 表达当前页，次级内容按真实层级用 Collapsible。

## Responsive behavior
- 窄屏有可见工作区导航标题与关闭入口，正文可滚动；图标栏每项仍保留名称与当前页。

## Customization
- Provider 统一宽度，桌面局部演示定位限定 md:；自定义 style 在移动 Popup 保留，品牌不改变导航状态。

## Current exports
- Sidebar: function; owner sidebar; PASS; props: React.ComponentProps<"div"> & {
  side?: "left" | "right";
  variant?: "sidebar" | "floating" | "inset";
  collapsible?: "offcanvas" | "icon" | "none";
}
- SidebarContent: function; owner sidebar; PASS; props: React.ComponentProps<"div">
- SidebarContext: const; owner sidebar; PASS
- SidebarContextProps: type; owner sidebar; PASS
- SidebarFooter: function; owner sidebar; PASS; props: React.ComponentProps<"div">
- SidebarGroup: function; owner sidebar; PASS; props: React.ComponentProps<"div">
- SidebarGroupAction: function; owner sidebar; PASS; props: useRender.ComponentProps<"button">
- SidebarGroupContent: function; owner sidebar; PASS; props: React.ComponentProps<"div">
- SidebarGroupLabel: function; owner sidebar; PASS; props: useRender.ComponentProps<"div">
- SidebarHeader: function; owner sidebar; PASS; props: React.ComponentProps<"div">
- SidebarInput: function; owner sidebar; PASS; props: React.ComponentProps<typeof Input>
- SidebarInset: function; owner sidebar; PASS; props: React.ComponentProps<"main">
- SidebarMenu: function; owner sidebar; PASS; props: React.ComponentProps<"ul">
- SidebarMenuAction: function; owner sidebar; PASS; props: useRender.ComponentProps<"button"> & {
  showOnHover?: boolean;
}
- SidebarMenuBadge: function; owner sidebar; PASS; props: React.ComponentProps<"div">
- SidebarMenuButton: function; owner sidebar; PASS; props: useRender.ComponentProps<"button"> & {
  isActive?: boolean;
  tooltip?: string | React.ComponentProps<typeof TooltipPopup>;
} & VariantProps<typeof sidebarMenuButtonVariants>
- SidebarMenuItem: function; owner sidebar; PASS; props: React.ComponentProps<"li">
- SidebarMenuSkeleton: function; owner sidebar; PASS; props: React.ComponentProps<"div"> & {
  showIcon?: boolean;
}
- SidebarMenuSub: function; owner sidebar; PASS; props: React.ComponentProps<"ul">
- SidebarMenuSubButton: function; owner sidebar; PASS; props: useRender.ComponentProps<"a"> & {
  size?: "sm" | "md";
  isActive?: boolean;
}
- SidebarMenuSubItem: function; owner sidebar; PASS; props: React.ComponentProps<"li">
- SidebarProvider: function; owner sidebar; PASS; props: React.ComponentProps<"div"> & {
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
- SidebarRail: function; owner sidebar; PASS; props: React.ComponentProps<"button">
- SidebarSeparator: function; owner sidebar; PASS; props: React.ComponentProps<typeof Separator>
- SidebarTrigger: function; owner sidebar; PASS; props: React.ComponentProps<typeof Button>
- useSidebar: function; owner sidebar; PASS

Signatures may reference inherited types. Consult installed declarations; props are not fully resolved here.

## Dependencies and providers
- Runtime: @base-ui/react, class-variance-authority, clsx, lucide-react, react, tailwind-merge
- Optional peers: none recorded
- 侧栏桌面端使用 fixed 定位并占满视口高度；嵌在页面局部时（如本页示例），给 Provider 一个固定高度与 relative，并给 Sidebar 传 className="md:absolute md:h-full"。
- 宽度只在 Provider 上覆盖 --sidebar-width，不要直接给 Sidebar 设宽度，否则折叠动画与占位会错位。
- 页面上同时存在多个 SidebarProvider 时，快捷键会同时作用于所有侧栏。
- Required providers are not inferred from exports. Unresolved requirements: UNVERIFIED.

## Curated API
### SidebarProvider
包住侧栏与主区域，管理展开状态并注册 ⌘/Ctrl + B 快捷键。默认占满视口高度。
- defaultOpen: boolean; default true. 桌面端初始是否展开。
- open / onOpenChange: boolean / (open) => void. 受控展开状态；只传 onOpenChange 可观察非受控变化，不会阻止内部更新。
- style: CSSProperties. 覆盖 --sidebar-width（默认 16rem）与 --sidebar-width-icon（默认 3rem）。

### Sidebar
侧栏本体。桌面端固定在视口一侧；视口窄于 800px 时渲染为 Sheet 抽屉（宽 18rem）。
- side: "left" | "right"; default "left". 停靠的一侧。
- variant: "sidebar" | "floating" | "inset"; default "sidebar". 贴边、浮起卡片，或让主区域内嵌为卡片。
- collapsible: "offcanvas" | "icon" | "none"; default "offcanvas". 折叠方式：完全收起、收成图标栏，或不可折叠。
- className / style / 原生属性: div props. 透传到桌面容器或移动端弹层；移动端 style 与默认 18rem 宽度合并。局部定位仅用于 md: 及以上断点。

### SidebarHeader / SidebarFooter
顶部与底部的固定区域，常放工作区切换和用户菜单。

### SidebarContent
可滚动的中间区域，边缘渐隐。

### SidebarGroup / SidebarGroupLabel / SidebarGroupAction / SidebarGroupContent
分组、分组标题、标题右侧的操作按钮与分组内容。图标栏模式下标题与操作隐藏。

### SidebarMenu / SidebarMenuItem
菜单列表与菜单项。

### SidebarMenuButton
菜单项的可点击区域，默认 <button>，用 render 换成链接。
- isActive: boolean; default false. 当前页面，默认标记 aria-current="page"。
- tooltip: string | TooltipPopup props. 折叠为图标栏时悬停显示的名称。
- size: "sm" | "default" | "lg"; default "default". lg 用于工作区与用户这类两行内容。
- variant: "default" | "outline"; default "default". outline 带细边框。

### SidebarMenuAction
菜单项右侧的操作按钮；showOnHover 时仅悬停或聚焦该项时显示（触屏始终显示）。

### SidebarMenuBadge
菜单项右侧的计数，等宽数字。

### SidebarMenuSub / SidebarMenuSubItem / SidebarMenuSubButton
二级菜单，常与 Collapsible 组合成可展开的分组。

### SidebarMenuSkeleton
加载中的菜单项占位。

### SidebarInput / SidebarSeparator
侧栏内的搜索框与分隔线。

### SidebarTrigger
切换侧栏的图标按钮，aria-expanded 与当前模式同步；移动端打开抽屉，抽屉内有可见关闭入口。onClick 调用 preventDefault 可取消切换。

### SidebarRail
侧栏边缘的细条，点击切换折叠。

### SidebarInset
主内容区域 <main>。

### useSidebar
读取 state、open、isMobile、toggleSidebar 等状态，用于自定义触发器。

## Keyboard
- ⌘ B / Ctrl B: 展开或折叠侧栏（移动端为打开或关闭抽屉）；输入、可编辑区域、合成输入及已被处理的按键不触发。
- Tab: 依次聚焦菜单项与操作按钮。
- Esc: 关闭移动端抽屉。

## Source examples
### 应用框架
Source: apps/docs/src/content/sidebar/demos/01-app-shell.tsx
```tsx
import { Avatar, AvatarFallback } from "@qingye/ui/components/avatar";
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
      <Sidebar className="md:absolute md:h-full" collapsible="icon">
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
                      <MenuTrigger aria-label={`${project.name}操作`} render={<SidebarMenuAction showOnHover />}>
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
```

### 图标栏与浮起样式
Source: apps/docs/src/content/sidebar/demos/02-icon-collapsed.tsx
```tsx
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
      <Sidebar className="md:absolute md:h-full" collapsible="icon" variant="floating">
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
```

### 内嵌样式与自定义宽度
Source: apps/docs/src/content/sidebar/demos/03-inset.tsx
```tsx
import { SidebarContent, SidebarGroup, SidebarGroupLabel, SidebarHeader, SidebarInput, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarMenuSkeleton } from "@qingye/ui/components/sidebar";
import { SidebarProvider } from "@qingye/ui/components/sidebar";
import { SidebarTrigger } from "@qingye/ui/components/sidebar";
import { CSSProperties } from "react";
import {
  Sidebar } from "@qingye/ui";
import { BookOpenIcon, FileTextIcon, StarIcon } from "lucide-react";

export const meta = {
  title: "内嵌样式与自定义宽度",
  description:
    "variant=\"inset\" 让主区域像一张浮在侧栏底色上的卡片；在 Provider 上覆盖 --sidebar-width 调整宽度。加载中的分组用 SidebarMenuSkeleton 占位。",
  flush: true,
};

export default function Demo() {
  return (
    <SidebarProvider
      className="relative h-72 min-h-0 md:h-[26rem] overflow-hidden rounded-[calc(var(--radius-xl)-1px)]"
      style={{ "--sidebar-width": "14rem" } as CSSProperties}
    >
      <Sidebar className="md:absolute md:h-full" variant="inset">
        <SidebarHeader>
          <SidebarInput aria-label="搜索文档" placeholder="搜索文档…" />
        </SidebarHeader>
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel>收藏</SidebarGroupLabel>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton isActive>
                  <StarIcon />
                  <span>接口鉴权说明</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <BookOpenIcon />
                  <span>新人入职手册</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
              <SidebarMenuItem>
                <SidebarMenuButton>
                  <FileTextIcon />
                  <span>2026 年度规划</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroup>
          <SidebarGroup>
            <SidebarGroupLabel>最近浏览</SidebarGroupLabel>
            <SidebarMenu>
              {[0, 1, 2].map((i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="flex h-12 items-center gap-2 border-b px-3">
          <SidebarTrigger />
          <span className="font-medium text-sm">接口鉴权说明</span>
        </header>
        <article className="flex flex-col gap-2 p-4 text-muted-foreground text-sm">
          <p>所有请求在 Authorization 头中携带访问令牌，令牌有效期 2 小时。</p>
          <p>令牌过期后用刷新令牌换取新令牌，刷新令牌有效期 30 天。</p>
        </article>
      </SidebarInset>
    </SidebarProvider>
  );
}
```

