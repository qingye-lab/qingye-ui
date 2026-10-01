import { j as jsxRuntimeExports, f as Menu, g as MenuTrigger, h as MenuPopup, i as MenuItem, r as reactExports } from "./index-DM02Iz28.js";
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, c as BreadcrumbLink, d as BreadcrumbSeparator, f as BreadcrumbEllipsis, e as BreadcrumbPage } from "./breadcrumb-BqRKyIQO.js";
import "./ellipsis-BiesIFo2.js";
const meta = {
  title: "窄屏折叠",
  description: "宽屏显示完整路径；窄于 640px 时中间层收进省略菜单，当前页过长时截断。"
};
const middle = ["设备管理", "华东机房", "机柜 A-12"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { className: "w-full max-w-xl", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BreadcrumbList, { className: "flex-nowrap *:shrink-0", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { href: "#", children: "控制台" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { className: "sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        MenuTrigger,
        {
          "aria-label": "显示更多路径",
          className: "flex size-6 items-center justify-center rounded-md outline-none hover:bg-accent hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring data-popup-open:bg-accent",
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbEllipsis, {})
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuPopup, { align: "start", children: middle.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#" }), children: name }, name)) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, { className: "sm:hidden" }),
    middle.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsxs(reactExports.Fragment, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { className: "hidden sm:inline-flex", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { href: "#", children: name }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, { className: "hidden sm:block" })
    ] }, name)),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { className: "min-w-0 shrink!", children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbPage, { className: "truncate", children: "服务器 hz-a12-07（Ubuntu 24.04）" }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
