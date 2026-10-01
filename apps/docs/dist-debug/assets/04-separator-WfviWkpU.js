import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, c as BreadcrumbLink, d as BreadcrumbSeparator, e as BreadcrumbPage } from "./breadcrumb-BqRKyIQO.js";
import "./ellipsis-BiesIFo2.js";
const __iconNode = [["path", { d: "M22 2 2 22", key: "y4kqgn" }]];
const Slash = createLucideIcon("slash", __iconNode);
const meta = { title: "自定义分隔符", description: "斜线更接近文件路径与代码仓库的习惯。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BreadcrumbList, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { href: "#", children: "qingye-lab" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slash, { className: "-rotate-12" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { href: "#", children: "yanqing-ui" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slash, { className: "-rotate-12" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbPage, { className: "font-mono text-[0.8125rem]", children: "packages/ui" }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
