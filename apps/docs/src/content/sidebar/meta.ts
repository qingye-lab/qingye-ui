import type { ComponentMeta } from "@/lib/types";

export default {
  title: "侧边栏 Sidebar",
  description:
    "应用的主导航框架：分组菜单、子菜单、计数与操作，可折叠为图标栏；在窄屏上自动变为抽屉。适合后台、工作台这类常驻导航的应用。",
  category: "布局",
  source: "coss",
  exports: [
    "SidebarProvider",
    "Sidebar",
    "SidebarHeader",
    "SidebarContent",
    "SidebarFooter",
    "SidebarGroup",
    "SidebarGroupLabel",
    "SidebarMenu",
    "SidebarMenuItem",
    "SidebarMenuButton",
    "SidebarInset",
    "SidebarTrigger",
  ],
  keywords: ["sidebar", "侧边栏", "侧栏", "导航", "app shell", "抽屉"],
  api: [
    {
      name: "SidebarProvider",
      description: "包住侧栏与主区域，管理展开状态并注册 ⌘/Ctrl + B 快捷键。默认占满视口高度。",
      props: [
        { name: "defaultOpen", type: "boolean", default: "true", description: "桌面端初始是否展开。" },
        { name: "open / onOpenChange", type: "boolean / (open) => void", description: "受控展开状态。" },
        { name: "style", type: "CSSProperties", description: "覆盖 --sidebar-width（默认 16rem）与 --sidebar-width-icon（默认 3rem）。" },
      ],
    },
    {
      name: "Sidebar",
      description: "侧栏本体。桌面端固定在视口一侧；视口窄于 800px 时渲染为 Sheet 抽屉（宽 18rem）。",
      props: [
        { name: "side", type: '"left" | "right"', default: '"left"', description: "停靠的一侧。" },
        { name: "variant", type: '"sidebar" | "floating" | "inset"', default: '"sidebar"', description: "贴边、浮起卡片，或让主区域内嵌为卡片。" },
        { name: "collapsible", type: '"offcanvas" | "icon" | "none"', default: '"offcanvas"', description: "折叠方式：完全收起、收成图标栏，或不可折叠。" },
      ],
    },
    { name: "SidebarHeader / SidebarFooter", description: "顶部与底部的固定区域，常放工作区切换和用户菜单。" },
    { name: "SidebarContent", description: "可滚动的中间区域，边缘渐隐。" },
    { name: "SidebarGroup / SidebarGroupLabel / SidebarGroupAction / SidebarGroupContent", description: "分组、分组标题、标题右侧的操作按钮与分组内容。图标栏模式下标题与操作隐藏。" },
    { name: "SidebarMenu / SidebarMenuItem", description: "菜单列表与菜单项。" },
    {
      name: "SidebarMenuButton",
      description: "菜单项的可点击区域，默认 <button>，用 render 换成链接。",
      props: [
        { name: "isActive", type: "boolean", default: "false", description: "当前页面。" },
        { name: "tooltip", type: "string | TooltipPopup props", description: "折叠为图标栏时悬停显示的名称。" },
        { name: "size", type: '"sm" | "default" | "lg"', default: '"default"', description: "lg 用于工作区与用户这类两行内容。" },
        { name: "variant", type: '"default" | "outline"', default: '"default"', description: "outline 带细边框。" },
      ],
    },
    { name: "SidebarMenuAction", description: "菜单项右侧的操作按钮；showOnHover 时仅悬停或聚焦该项时显示（触屏始终显示）。" },
    { name: "SidebarMenuBadge", description: "菜单项右侧的计数，等宽数字。" },
    { name: "SidebarMenuSub / SidebarMenuSubItem / SidebarMenuSubButton", description: "二级菜单，常与 Collapsible 组合成可展开的分组。" },
    { name: "SidebarMenuSkeleton", description: "加载中的菜单项占位。" },
    { name: "SidebarInput / SidebarSeparator", description: "侧栏内的搜索框与分隔线。" },
    { name: "SidebarTrigger", description: "切换侧栏的图标按钮；移动端打开抽屉。" },
    { name: "SidebarRail", description: "侧栏边缘的细条，点击切换折叠。" },
    { name: "SidebarInset", description: "主内容区域 <main>。" },
    { name: "useSidebar", description: "读取 state、open、isMobile、toggleSidebar 等状态，用于自定义触发器。" },
  ],
  keyboard: [
    { keys: "⌘ B / Ctrl B", description: "展开或折叠侧栏（移动端为打开或关闭抽屉）。" },
    { keys: "Tab", description: "依次聚焦菜单项与操作按钮。" },
    { keys: "Esc", description: "关闭移动端抽屉。" },
  ],
  notes: [
    "侧栏桌面端使用 fixed 定位并占满视口高度；嵌在页面局部时（如本页示例），给 Provider 一个固定高度与 relative，并给 Sidebar 传 className=\"absolute h-full\"。",
    "宽度只在 Provider 上覆盖 --sidebar-width，不要直接给 Sidebar 设宽度，否则折叠动画与占位会错位。",
    "图标栏模式下给每个 SidebarMenuButton 设置 tooltip，否则折叠后无法辨认。",
    "展开状态会写入名为 sidebar_state 的 Cookie（浏览器支持 Cookie Store API 时），服务端渲染可读取它作为 defaultOpen。",
    "页面上同时存在多个 SidebarProvider 时，快捷键会同时作用于所有侧栏。",
  ],
} satisfies ComponentMeta;
