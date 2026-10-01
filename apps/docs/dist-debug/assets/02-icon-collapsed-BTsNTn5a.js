import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as SidebarProvider, a as Sidebar, b as SidebarHeader, c as SidebarMenu, d as SidebarMenuItem, e as SidebarMenuButton, t as SidebarSeparator, f as SidebarContent, g as SidebarGroup, p as SidebarFooter, r as SidebarInset, s as SidebarTrigger } from "./sidebar-DgabpEaM.js";
import { H as House } from "./house-CeTnFA2e.js";
import { R as Rocket } from "./rocket-3zdUT071.js";
import { S as Server } from "./server-CpaPaZZv.js";
import { C as ChartColumn } from "./chart-column-SOne7cHm.js";
import { S as Settings } from "./settings-D0--ss7R.js";
import "./use-media-query-CGVr0VA1.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./separator-CcYO5Zxi.js";
import "./skeleton-Dv0NPbHI.js";
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["path", { d: "m4.93 4.93 4.24 4.24", key: "1ymg45" }],
  ["path", { d: "m14.83 9.17 4.24-4.24", key: "1cb5xl" }],
  ["path", { d: "m14.83 14.83 4.24 4.24", key: "q42g0n" }],
  ["path", { d: "m9.17 14.83-4.24 4.24", key: "bqpfvv" }],
  ["circle", { cx: "12", cy: "12", r: "4", key: "4exip2" }]
];
const LifeBuoy = createLucideIcon("life-buoy", __iconNode$1);
const __iconNode = [
  [
    "path",
    { d: "M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z", key: "14u9p9" }
  ]
];
const Triangle = createLucideIcon("triangle", __iconNode);
const meta = {
  title: "图标栏与浮起样式",
  description: 'variant="floating" 与 collapsible="icon"，初始折叠；折叠时悬停图标显示名称。',
  flush: true
};
const items = [
  { icon: House, label: "概览", active: true },
  { icon: Rocket, label: "部署" },
  { icon: Server, label: "服务器" },
  { icon: ChartColumn, label: "监控" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SidebarProvider,
    {
      className: "relative h-72 min-h-0 md:h-[26rem] overflow-hidden rounded-[calc(var(--radius-xl)-1px)]",
      defaultOpen: false,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { className: "absolute h-full", collapsible: "icon", variant: "floating", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { tooltip: "青烟云", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Triangle, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sidebar-accent-foreground", children: "青烟云" })
          ] }) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarSeparator, {}),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroup, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { isActive: Boolean(item.active), tooltip: item.label, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: item.label })
          ] }) }, item.label)) }) }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenu, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { tooltip: "帮助中心", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(LifeBuoy, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "帮助中心" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { tooltip: "设置", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Settings, {}),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "设置" })
            ] }) })
          ] }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarInset, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-12 items-center gap-2 px-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "概览" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-3 px-3 pb-3", children: [
            ["本月部署", "126"],
            ["在线服务器", "18"]
          ].map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl border p-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: label }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "numeric mt-1 font-semibold text-2xl", children: value })
          ] }, label)) })
        ] })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
