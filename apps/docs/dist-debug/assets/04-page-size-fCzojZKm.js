import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as Pagination, a as PaginationContent, b as PaginationItem, c as PaginationPrevious, d as PaginationLink, f as PaginationNext } from "./pagination-Ds9Vkdd5.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import "./chevron-left-CtqcxRzh.js";
import "./ellipsis-BiesIFo2.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = {
  title: "每页条数",
  description: "列表底栏：每页条数、范围说明与翻页。窄屏时换行，页码只保留前后翻页。"
};
const total = 236;
const sizes = [10, 20, 50];
function Demo() {
  const [size, setSize] = reactExports.useState(20);
  const [page, setPage] = reactExports.useState(1);
  const pageCount = Math.ceil(total / size);
  const from = (page - 1) * size + 1;
  const to = Math.min(page * size, total);
  const go = (next) => (event) => {
    event.preventDefault();
    setPage(next);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-wrap items-center justify-between gap-x-6 gap-y-3 text-muted-foreground text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "每页" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          items: sizes.map((n) => ({ label: `${n} 条`, value: n })),
          onValueChange: (value) => {
            setSize(value);
            setPage(1);
          },
          value: size,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "每页条数", className: "w-auto min-w-24", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: sizes.map((n) => /* @__PURE__ */ jsxRuntimeExports.jsxs(SelectItem, { value: n, children: [
              n,
              " 条"
            ] }, n)) })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "numeric", children: [
        from,
        "–",
        to,
        "，共 ",
        total,
        " 条"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Pagination, { className: "ms-auto me-0 w-auto", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PaginationContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationPrevious, { disabled: page === 1, href: `?page=${page - 1}`, onClick: go(page - 1) }) }),
      [1, 2, 3].map(
        (p) => p <= pageCount ? /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { className: "max-sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationLink, { href: `?page=${p}`, isActive: p === page, onClick: go(p), children: p }) }, p) : null
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(PaginationNext, { disabled: page === pageCount, href: `?page=${page + 1}`, onClick: go(page + 1) }) })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
