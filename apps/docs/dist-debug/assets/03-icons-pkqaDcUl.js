import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Breadcrumb, a as BreadcrumbList, b as BreadcrumbItem, c as BreadcrumbLink, d as BreadcrumbSeparator, e as BreadcrumbPage } from "./breadcrumb-BqRKyIQO.js";
import { H as House } from "./house-CeTnFA2e.js";
import { F as Folder } from "./folder-CBRvho5z.js";
import { F as FileText } from "./file-text-BKTUvRr9.js";
import "./ellipsis-BiesIFo2.js";
const meta = { title: "带图标", description: "图标放在文字前，尺寸 4，仅首页可只用图标。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Breadcrumb, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BreadcrumbList, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbLink, { "aria-label": "首页", href: "#", children: /* @__PURE__ */ jsxRuntimeExports.jsx(House, { className: "size-4" }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BreadcrumbLink, { className: "inline-flex items-center gap-1.5", href: "#", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { className: "size-4" }),
      "产品文档"
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(BreadcrumbItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BreadcrumbPage, { className: "inline-flex items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "size-4" }),
      "接口鉴权说明"
    ] }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
