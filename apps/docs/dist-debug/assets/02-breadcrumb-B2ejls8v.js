import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, c as BreadcrumbLink, d as BreadcrumbSeparator, e as BreadcrumbPage } from "./breadcrumb-BqRKyIQO.js";
import { P as PageHeader, a as PageHeaderContent, b as PageHeaderTitle, c as PageHeaderDescription, e as PageHeaderMeta, d as PageHeaderActions } from "./page-header-CGzLQng4.js";
import { S as StatusDot } from "./status-dot-CJpp8V8E.js";
import { C as Calendar } from "./calendar-DI6AfLRW.js";
import { R as RotateCw } from "./rotate-cw-DbtdIEQE.js";
import { E as Ellipsis } from "./ellipsis-BiesIFo2.js";
const meta = { title: "面包屑与元信息", description: "Breadcrumb 直接放入即占满一行；元信息放状态、标签与时间。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeader, { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BreadcrumbList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { href: "#stores", children: "门店" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { href: "#xh-001", children: "徐汇漕溪北路店" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbPage, { children: "前台收银机" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderTitle, { children: "前台收银机" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderDescription, { children: "SUNMI T2s · 序列号 T2S-8F3A-21C7-0049" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderMeta, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { pulse: true, status: "online", children: "在线" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "固件 4.2.1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { "aria-hidden": "true" }),
          "2023-04-18 接入"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderActions, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { "aria-hidden": "true" }),
        "重启"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "更多操作", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Ellipsis, { "aria-hidden": "true" }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
