import { j as jsxRuntimeExports, e0 as Sheet, e1 as SheetTrigger, B as Button, e3 as SheetPopup, e4 as SheetHeader, e5 as SheetTitle, ee as SheetDescription, e6 as SheetPanel, ef as SheetFooter, eg as SheetClose } from "./index-DM02Iz28.js";
const meta = {
  title: "内嵌样式",
  description: 'variant="inset" 在宽屏下与屏幕边缘留出间距并加圆角，适合轻量的详情面板。'
};
const rows = [
  ["订单号", "YQ20260930-0418"],
  ["客户", "杭州青禾餐饮有限公司"],
  ["商品", "智能温控器 × 12"],
  ["金额", "¥ 14,280.00"],
  ["下单时间", "2026-09-30 14:22"],
  ["状态", "待发货"]
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: "订单详情" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPopup, { variant: "inset", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "订单详情" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetDescription, { children: "预计 10 月 2 日从杭州仓发出。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "grid gap-3 text-sm", children: rows.map(([label, value]) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "numeric text-end font-medium", children: value })
      ] }, label)) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetClose, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost" }), children: "关闭" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "安排发货" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
