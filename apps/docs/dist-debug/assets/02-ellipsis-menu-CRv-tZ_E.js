import { j as jsxRuntimeExports, f as Menu, g as MenuTrigger, h as MenuPopup, i as MenuItem } from "./index-DM02Iz28.js";
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, c as BreadcrumbLink, d as BreadcrumbSeparator, f as BreadcrumbEllipsis, e as BreadcrumbPage } from "./breadcrumb-BqRKyIQO.js";
import "./ellipsis-BiesIFo2.js";
const meta = {
  title: "省略菜单",
  description: "层级较深时，把中间层收进菜单。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BreadcrumbList, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { href: "#", children: "工作台" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuTrigger,
        {
          "aria-label": "显示更多路径",
          className: "flex size-6 items-center justify-center rounded-md outline-none transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbEllipsis, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#" }), children: "项目" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#" }), children: "青烟官网改版" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#" }), children: "设计稿" })
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { href: "#", children: "首页" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbPage, { children: "v3 评审稿" }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
