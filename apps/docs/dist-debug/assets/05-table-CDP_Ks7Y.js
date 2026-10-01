import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { E as Empty, a as EmptyHeader, b as EmptyTitle, c as EmptyDescription, e as EmptyContent } from "./empty-UZzeYbXj.js";
import { F as Frame } from "./frame-CYCij40I.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
const meta = {
  title: "在表格中",
  description: "表体放一行一格，colSpan 覆盖全部列；单元格默认不换行，要加 whitespace-normal。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Frame, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { variant: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "订单号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "客户" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "状态" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "金额" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableRow, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 4, className: "whitespace-normal", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Empty, { className: "gap-4 px-4 py-10 md:py-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTitle, { className: "text-base", children: "没有符合条件的订单" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyDescription, { children: "筛选条件：华东区 · 待付款 · 本月" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "清除筛选" }) })
    ] }) }) }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
