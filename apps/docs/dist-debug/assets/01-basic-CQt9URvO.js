import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { N as NavigationMenu, a as NavigationMenuList, b as NavigationMenuItem, c as NavigationMenuTrigger, d as NavigationMenuContent, e as NavigationMenuLink, f as NavigationMenuLinkIcon, g as NavigationMenuLinkTitle, h as NavigationMenuLinkDescription, n as navigationMenuTriggerStyle } from "./navigation-menu-SXg5wGUX.js";
import { C as ChartColumn } from "./chart-column-SOne7cHm.js";
import { L as Layers } from "./layers-DinC0tSz.js";
import { S as ShieldCheck } from "./shield-check-CQJ_3MSV.js";
import { B as BookOpen } from "./book-open-BuL6MSKB.js";
import "./chevron-down-DlWyuvnt.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
const __iconNode$1 = [
  ["rect", { width: "8", height: "8", x: "3", y: "3", rx: "2", key: "by2w9f" }],
  ["path", { d: "M7 11v4a2 2 0 0 0 2 2h4", key: "xkn7yn" }],
  ["rect", { width: "8", height: "8", x: "13", y: "13", rx: "2", key: "1cgmvn" }]
];
const Workflow = createLucideIcon("workflow", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",
      key: "1xq2db"
    }
  ]
];
const Zap = createLucideIcon("zap", __iconNode);
const meta = {
  title: "基础用法",
  description: "在两个触发器之间移动，弹层会平滑改变尺寸，内容沿移动方向切换。"
};
const products = [
  { icon: ChartColumn, title: "数据看板", description: "实时查看核心指标，自定义图表与告警。" },
  { icon: Workflow, title: "自动化流程", description: "把重复操作编排成流程，按条件自动触发。" },
  { icon: Layers, title: "设计系统", description: "统一组件、令牌与文档，团队协作更顺畅。" },
  { icon: ShieldCheck, title: "权限与审计", description: "细粒度角色管理，所有操作留痕可查。" }
];
const resources = [
  { title: "快速上手", description: "十分钟完成安装并搭建第一个页面。" },
  { title: "最佳实践", description: "表单、表格与空状态的推荐写法。" },
  { title: "更新日志", description: "每个版本的新功能与破坏性变更。" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenu, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NavigationMenuList, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(NavigationMenuItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuTrigger, { children: "产品" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-0.5 sm:w-[34rem] sm:grid-cols-2", children: products.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NavigationMenuLink, { href: "#", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLinkIcon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(item.icon, {}) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLinkTitle, { children: item.title }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLinkDescription, { children: item.description })
      ] }) }, item.title)) }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(NavigationMenuItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuTrigger, { children: "资源" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-1 sm:w-[30rem] sm:grid-cols-[11rem_1fr]", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          NavigationMenuLink,
          {
            className: "flex flex-col items-start justify-end gap-1 bg-muted/72 p-4 hover:bg-muted",
            href: "#",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Zap, { "aria-hidden": "true", className: "mb-6 size-5 opacity-80" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLinkTitle, { children: "青云 UI 2.0" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLinkDescription, { className: "line-clamp-3", children: "全新主题令牌与深色模式，现已发布。" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-0.5", children: resources.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NavigationMenuLink, { href: "#", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLinkTitle, { children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLinkDescription, { children: item.description })
        ] }) }, item.title)) })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NavigationMenuLink, { className: navigationMenuTriggerStyle(), href: "#", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { "aria-hidden": "true" }),
      "文档"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuItem, { className: "max-sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLink, { className: navigationMenuTriggerStyle(), href: "#", children: "定价" }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
