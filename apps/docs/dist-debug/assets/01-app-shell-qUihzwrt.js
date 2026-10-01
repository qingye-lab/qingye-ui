import { c as createLucideIcon, j as jsxRuntimeExports, f as Menu, g as MenuTrigger, h as MenuPopup, i as MenuItem, k as MenuSeparator, c7 as ChevronRight } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, e as BreadcrumbPage } from "./breadcrumb-BqRKyIQO.js";
import { C as Collapsible, b as CollapsibleTrigger, a as CollapsiblePanel } from "./collapsible-DcdXgGKL.js";
import { S as Separator } from "./separator-CcYO5Zxi.js";
import { S as SidebarProvider, a as Sidebar, b as SidebarHeader, c as SidebarMenu, d as SidebarMenuItem, e as SidebarMenuButton, f as SidebarContent, g as SidebarGroup, h as SidebarGroupLabel, i as SidebarMenuBadge, j as SidebarGroupAction, k as SidebarGroupContent, l as SidebarMenuAction, m as SidebarMenuSub, n as SidebarMenuSubItem, o as SidebarMenuSubButton, p as SidebarFooter, q as SidebarRail, r as SidebarInset, s as SidebarTrigger } from "./sidebar-DgabpEaM.js";
import { C as ChevronsUpDown } from "./chevrons-up-down-BLzcfRd-.js";
import { I as Inbox } from "./inbox-CSMexUs9.js";
import { C as Calendar } from "./calendar-DI6AfLRW.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
import { F as Folder } from "./folder-CBRvho5z.js";
import { E as Ellipsis } from "./ellipsis-BiesIFo2.js";
import "./CollapsiblePanel-B5cYZztf.js";
import "./useCollapsiblePanel-Dpoq1n6_.js";
import "./use-media-query-CGVr0VA1.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./skeleton-Dv0NPbHI.js";
const __iconNode$1 = [
  ["path", { d: "M13 5h8", key: "a7qcls" }],
  ["path", { d: "M13 12h8", key: "h98zly" }],
  ["path", { d: "M13 19h8", key: "c3s6r1" }],
  ["path", { d: "m3 17 2 2 4-4", key: "1jhpwq" }],
  ["rect", { x: "3", y: "4", width: "6", height: "6", rx: "1", key: "cif1o7" }]
];
const ListTodo = createLucideIcon("list-todo", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",
      key: "1s2grr"
    }
  ],
  ["path", { d: "M20 2v4", key: "1rf3ol" }],
  ["path", { d: "M22 4h-4", key: "gwowj6" }],
  ["circle", { cx: "4", cy: "20", r: "2", key: "6kqj1y" }]
];
const Sparkles = createLucideIcon("sparkles", __iconNode);
const meta = {
  title: "应用框架",
  description: "工作区切换、带标签的分组、可展开的子菜单、计数与悬停操作、底部用户菜单。点击侧栏边缘或按 ⌘/Ctrl + B 折叠为图标栏；窄于 800px 时侧栏变为抽屉。",
  flush: true
};
const workspace = [
  { icon: Inbox, label: "收件箱", count: 12, active: true },
  { icon: ListTodo, label: "我的任务", count: 4 },
  { icon: Calendar, label: "日程" }
];
const projects = [
  { name: "青烟官网改版", pages: ["设计稿", "开发进度", "上线清单"], open: true },
  { name: "移动端 App", pages: ["需求池", "版本计划"] },
  { name: "年度品牌活动", pages: ["物料", "预算"] }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarProvider, { className: "relative h-80 min-h-0 md:h-[34rem] overflow-hidden rounded-[calc(var(--radius-xl)-1px)]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { className: "absolute h-full", collapsible: "icon", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { size: "lg" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Sparkles, { className: "size-4" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid flex-1 text-start leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium text-sidebar-accent-foreground", children: "青烟科技" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs", children: "团队版 · 18 人" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "ms-auto" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", className: "w-56", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "青烟科技" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "远山设计工作室" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "创建工作区" })
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "工作台" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: workspace.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuItem, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { isActive: Boolean(item.active), tooltip: item.label, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
            ] }),
            item.count ? /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuBadge, { children: item.count }) : null
          ] }, item.label)) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "项目" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupAction, { "aria-label": "新建项目", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: projects.map((project) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Collapsible, { defaultOpen: project.open, render: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, {}), children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { tooltip: project.name }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: project.name }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "ms-auto transition-transform duration-200 in-data-panel-open:rotate-90 rtl:-scale-x-100" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(MenuTrigger, { "aria-label": `${project.name}操作`, render: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuAction, { showOnHover: true }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, {}) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", side: "right", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "重命名" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "复制链接" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { variant: "destructive", children: "归档" })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsiblePanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuSub, { children: project.pages.map((page, i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuSubItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuSubButton, { href: "#", isActive: Boolean(project.open) && i === 0, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: page }) }) }, page)) }) })
          ] }, project.name)) }) })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuButton, { size: "lg" }), children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { className: "size-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid flex-1 text-start leading-tight", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium text-sidebar-accent-foreground", children: "林晓" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-xs", children: "linxiao@qingyan.tech" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronsUpDown, { className: "ms-auto" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "end", className: "w-56", side: "top", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "个人资料" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "偏好设置" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "退出登录" })
        ] })
      ] }) }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarRail, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarInset, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-12 shrink-0 items-center gap-2 border-b px-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "h-4", orientation: "vertical" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbList, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbPage, { children: "收件箱" }) }) }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-2 p-4", children: ["周舟 提到了你：首页首屏的动效再收一点", "陈默 完成了「接入支付回调」", "许诺 邀请你评审 v3 设计稿"].map((text) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-lg border px-3 py-2.5 text-sm", children: text }, text)) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
