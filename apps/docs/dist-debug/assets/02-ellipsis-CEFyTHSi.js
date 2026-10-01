import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as Pagination, a as PaginationContent, b as PaginationItem, c as PaginationPrevious, e as PaginationEllipsis, d as PaginationLink, f as PaginationNext } from "./pagination-Ds9Vkdd5.js";
import "./chevron-left-CtqcxRzh.js";
import "./ellipsis-BiesIFo2.js";
const meta = {
  title: "省略号",
  description: "保留首尾与当前页两侧，其余收起。点击页码试试。"
};
const total = 20;
function pages(current) {
  const near = [current - 1, current, current + 1].filter((p) => p > 1 && p < total);
  const list = [1];
  if (near[0] > 2) list.push("gap");
  list.push(...near);
  if (near[near.length - 1] < total - 1) list.push("gap");
  list.push(total);
  return list;
}
function Demo() {
  const [page, setPage] = reactExports.useState(6);
  const go = (next) => (event) => {
    event.preventDefault();
    setPage(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PaginationContent, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationPrevious, { disabled: page === 1, href: `?page=${page - 1}`, onClick: go(page - 1) }) }),
    pages(page).map(
      (p, i) => p === "gap" ? /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationEllipsis, {}) }, `gap-${i}`) : /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationLink, { href: `?page=${p}`, isActive: p === page, onClick: go(p), children: p }) }, p)
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationNext, { disabled: page === total, href: `?page=${page + 1}`, onClick: go(page + 1) }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
