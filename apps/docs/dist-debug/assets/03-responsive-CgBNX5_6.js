import { j as jsxRuntimeExports, e0 as Sheet, e1 as SheetTrigger, e2 as Menu, B as Button, e3 as SheetPopup, e4 as SheetHeader, e5 as SheetTitle, e6 as SheetPanel } from "./index-DM02Iz28.js";
import { N as NavigationMenu, a as NavigationMenuList, b as NavigationMenuItem, c as NavigationMenuTrigger, d as NavigationMenuContent, e as NavigationMenuLink, g as NavigationMenuLinkTitle, h as NavigationMenuLinkDescription, n as navigationMenuTriggerStyle } from "./navigation-menu-SXg5wGUX.js";
import "./chevron-down-DlWyuvnt.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
const meta = {
  title: "响应式",
  description: "≥640px 显示导航菜单；更窄时换成抽屉菜单，链接平铺、点按区域更大。缩小窗口查看效果。"
};
const solutions = [
  { title: "电商零售", description: "商品、订单与会员一体化运营。" },
  { title: "企业服务", description: "审批、合同与客户成功的协同工作台。" },
  { title: "教育培训", description: "课程排期、学员管理与学习数据分析。" }
];
const links = ["客户案例", "定价", "联系我们"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "flex w-full max-w-2xl items-center justify-between gap-4 rounded-xl border px-3 py-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sm", children: "青云" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenu, { className: "max-sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NavigationMenuList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(NavigationMenuItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuTrigger, { children: "解决方案" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid w-80 gap-0.5", children: solutions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NavigationMenuLink, { href: "#", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLinkTitle, { children: item.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLinkDescription, { children: item.description })
        ] }) }, item.title)) }) })
      ] }),
      links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NavigationMenuLink, { className: navigationMenuTriggerStyle(), href: "#", children: link }) }, link))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "打开导航", className: "sm:hidden", size: "icon", variant: "ghost" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPopup, { side: "right", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "导航" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { "aria-label": "主导航", className: "flex flex-col gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "px-2 font-medium text-muted-foreground text-xs", children: "解决方案" }),
            solutions.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex min-h-11 items-center rounded-md px-2 text-base hover:bg-accent", href: "#", children: item.title }, item.title))
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-1", children: links.map((link) => /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "flex min-h-11 items-center rounded-md px-2 text-base hover:bg-accent", href: "#", children: link }, link)) })
        ] }) })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
