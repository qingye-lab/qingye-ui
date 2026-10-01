import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { F as Frame } from "./frame-CYCij40I.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
const meta = { title: "组合：订单状态", description: "表格状态列统一用 outline + 圆点，颜色之外始终保留文字。" };
const orders = [
  { id: "YQ-20481", customer: "上海云杉科技", status: "已完成", amount: "¥12,800.00" },
  { id: "YQ-20480", customer: "杭州白鹭文化", status: "已发货", amount: "¥3,260.00" },
  { id: "YQ-20479", customer: "北京青柠餐饮", status: "待付款", amount: "¥980.00" },
  { id: "YQ-20478", customer: "深圳星图电子", status: "支付失败", amount: "¥15,000.00" },
  { id: "YQ-20477", customer: "成都知行教育", status: "已退款", amount: "¥4,500.00" }
];
const dot = {
  已完成: "bg-success",
  已发货: "bg-info",
  待付款: "bg-warning",
  支付失败: "bg-destructive",
  已退款: "bg-muted-foreground/64"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Frame, { className: "w-full", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { variant: "card", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "客户" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "状态" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "金额" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: orders.map((order) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium", children: order.customer }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-muted-foreground text-xs numeric", children: order.id })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: `size-1.5 rounded-full ${dot[order.status]}` }),
        order.status
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: order.amount })
    ] }, order.id)) })
  ] }) });
}
export {
  Demo as default,
  meta
};
