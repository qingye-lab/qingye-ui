import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as SidebarProvider, a as Sidebar, b as SidebarHeader, u as SidebarInput, f as SidebarContent, g as SidebarGroup, h as SidebarGroupLabel, c as SidebarMenu, d as SidebarMenuItem, e as SidebarMenuButton, v as SidebarMenuSkeleton, r as SidebarInset, s as SidebarTrigger } from "./sidebar-DgabpEaM.js";
import { S as Star } from "./star-DL3e-pz-.js";
import { B as BookOpen } from "./book-open-BuL6MSKB.js";
import { F as FileText } from "./file-text-BKTUvRr9.js";
import "./use-media-query-CGVr0VA1.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./separator-CcYO5Zxi.js";
import "./skeleton-Dv0NPbHI.js";
const meta = {
  title: "内嵌样式与自定义宽度",
  description: 'variant="inset" 让主区域像一张浮在侧栏底色上的卡片；在 Provider 上覆盖 --sidebar-width 调整宽度。加载中的分组用 SidebarMenuSkeleton 占位。',
  flush: true
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    SidebarProvider,
    {
      className: "relative h-72 min-h-0 md:h-[26rem] overflow-hidden rounded-[calc(var(--radius-xl)-1px)]",
      style: { "--sidebar-width": "14rem" },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Sidebar, { className: "absolute h-full", variant: "inset", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarInput, { "aria-label": "搜索文档", placeholder: "搜索文档…" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarContent, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "收藏" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenu, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { isActive: true, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Star, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "接口鉴权说明" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "新人入职手册" })
                ] }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarMenuButton, { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, {}),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2026 年度规划" })
                ] }) })
              ] })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarGroup, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarGroupLabel, { children: "最近浏览" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenu, { children: [0, 1, 2].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarMenuSkeleton, { showIcon: true }) }, i)) })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SidebarInset, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex h-12 items-center gap-2 border-b px-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SidebarTrigger, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "接口鉴权说明" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex flex-col gap-2 p-4 text-muted-foreground text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "所有请求在 Authorization 头中携带访问令牌，令牌有效期 2 小时。" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "令牌过期后用刷新令牌换取新令牌，刷新令牌有效期 30 天。" })
          ] })
        ] })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
