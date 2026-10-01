import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as Pagination, a as PaginationContent, b as PaginationItem, c as PaginationPrevious, f as PaginationNext } from "./pagination-Ds9Vkdd5.js";
import "./chevron-left-CtqcxRzh.js";
import "./ellipsis-BiesIFo2.js";
const meta = {
  title: "紧凑",
  description: "移动端或空间有限时，只保留前后翻页与当前位置。"
};
const total = 12;
function Demo() {
  const [page, setPage] = reactExports.useState(3);
  const go = (next) => (event) => {
    event.preventDefault();
    setPage(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PaginationContent, { className: "gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationPrevious, { disabled: page === 1, href: `?page=${page - 1}`, onClick: go(page - 1) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PaginationItem, { "aria-live": "polite", className: "numeric text-muted-foreground text-sm", children: [
      "第 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground", children: page }),
      " / ",
      total,
      " 页"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationNext, { disabled: page === total, href: `?page=${page + 1}`, onClick: go(page + 1) }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
