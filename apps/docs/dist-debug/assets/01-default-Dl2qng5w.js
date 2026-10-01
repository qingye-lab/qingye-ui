import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as Pagination, a as PaginationContent, b as PaginationItem, c as PaginationPrevious, d as PaginationLink, f as PaginationNext } from "./pagination-Ds9Vkdd5.js";
import "./chevron-left-CtqcxRzh.js";
import "./ellipsis-BiesIFo2.js";
const meta = { title: "默认", description: "页码少时全部列出；首页禁用“上一页”。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PaginationContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationPrevious, { disabled: true, href: "?page=0" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationLink, { href: "?page=1", isActive: true, children: "1" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationLink, { href: "?page=2", children: "2" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationLink, { href: "?page=3", children: "3" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationNext, { href: "?page=2" }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
