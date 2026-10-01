import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { T as Table, f as TableCaption, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
const meta = { title: "基础用法", description: "金额列右对齐并使用等宽数字。" };
const orders = [
  { id: "SO-20481", customer: "上海云杉科技", status: "已付款", amount: 12800 },
  { id: "SO-20480", customer: "杭州青禾文化", status: "待付款", amount: 4600 },
  { id: "SO-20479", customer: "成都远山物流", status: "已付款", amount: 32150 },
  { id: "SO-20478", customer: "深圳明川电子", status: "已退款", amount: 980 }
];
const tone = { 已付款: "bg-success", 待付款: "bg-warning", 已退款: "bg-muted-foreground/64" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableCaption, { children: "最近 4 笔订单" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "订单号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "客户" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "状态" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "金额" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: orders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium numeric", children: order.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: order.customer }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: `size-1.5 rounded-full ${tone[order.status]}` }),
        order.status
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-end numeric", children: [
        "¥",
        order.amount.toLocaleString("zh-CN")
      ] })
    ] }, order.id)) })
  ] });
}
export {
  Demo as default,
  meta
};
