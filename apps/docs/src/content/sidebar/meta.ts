import type { ComponentMeta } from "@/lib/types";

export default {
  title: "侧边栏 Sidebar",
  description:
    "应用的主导航框架：分组菜单、子菜单、计数与操作，可折叠为图标栏；在窄屏上自动变为抽屉。适合后台、工作台这类常驻导航的应用。",
  design: {
    "methods": [
      "展开有据",
      "随境取度",
      "进退相承"
    ],
    "whenToUse": [
      "保持工作区主导航常驻，让对象入口、当前页与分组关系在连续工作中可辨认。"
    ],
    "avoid": [
      "折叠状态不能吞掉当前页语义；全局导航快捷键不能拦截输入、编辑器或合成输入。"
    ],
    "composition": [
      "Provider 关联桌面开关与移动 Sheet；导航项 isActive 表达当前页，次级内容按真实层级用 Collapsible。"
    ],
    "stateOwner": {
      "library": [
        "管理受控 / 非受控开关、已接受状态的最佳努力持久化、移动关闭与焦点返回，透传原生属性。"
      ],
      "application": [
        "维护真实路由、分组对象、权限与草稿；跨断点需要保留的子组件状态提升到稳定应用 owner。"
      ]
    },
    "responsive": [
      "窄屏有可见工作区导航标题与关闭入口，正文可滚动；图标栏每项仍保留名称与当前页。"
    ],
    "customization": [
      "Provider 统一宽度，桌面局部演示定位限定 md:；自定义 style 在移动 Popup 保留，品牌不改变导航状态。"
    ]
  },
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
        { name: "open / onOpenChange", type: "boolean / (open) => void", description: "受控展开状态；只传 onOpenChange 可观察非受控变化，不会阻止内部更新。" },
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
        { name: "className / style / 原生属性", type: "div props", description: "透传到桌面容器或移动端弹层；移动端 style 与默认 18rem 宽度合并。局部定位仅用于 md: 及以上断点。" },
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
        { name: "isActive", type: "boolean", default: "false", description: "当前页面，默认标记 aria-current=\"page\"。" },
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
    { name: "SidebarTrigger", description: "切换侧栏的图标按钮，aria-expanded 与当前模式同步；移动端打开抽屉，抽屉内有可见关闭入口。onClick 调用 preventDefault 可取消切换。" },
    { name: "SidebarRail", description: "侧栏边缘的细条，点击切换折叠。" },
    { name: "SidebarInset", description: "主内容区域 <main>。" },
    { name: "useSidebar", description: "读取 state、open、isMobile、toggleSidebar 等状态，用于自定义触发器。" },
  ],
  keyboard: [
    { keys: "⌘ B / Ctrl B", description: "展开或折叠侧栏（移动端为打开或关闭抽屉）；输入、可编辑区域、合成输入及已被处理的按键不触发。" },
    { keys: "Tab", description: "依次聚焦菜单项与操作按钮。" },
    { keys: "Esc", description: "关闭移动端抽屉。" },
  ],
  notes: [
    "侧栏桌面端使用 fixed 定位并占满视口高度；嵌在页面局部时（如本页示例），给 Provider 一个固定高度与 relative，并给 Sidebar 传 className=\"md:absolute md:h-full\"。",
    "宽度只在 Provider 上覆盖 --sidebar-width，不要直接给 Sidebar 设宽度，否则折叠动画与占位会错位。",
    "图标栏模式下给每个 SidebarMenuButton 设置 tooltip，否则折叠后无法辨认。",
    "已接受的桌面展开状态会尽力写入名为 sidebar_state 的 Cookie（浏览器支持 Cookie Store API 时），服务端渲染可读取它作为 defaultOpen；受控 owner 拒绝的请求不写入。",
    "页面上同时存在多个 SidebarProvider 时，快捷键会同时作用于所有侧栏。",
  ],
} satisfies ComponentMeta;
