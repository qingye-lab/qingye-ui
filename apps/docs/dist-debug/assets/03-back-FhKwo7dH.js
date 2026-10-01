import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { P as PageHeader, f as PageHeaderBack, a as PageHeaderContent, b as PageHeaderTitle, c as PageHeaderDescription, e as PageHeaderMeta, d as PageHeaderActions } from "./page-header-CGzLQng4.js";
const meta = {
  title: "返回按钮",
  description: "PageHeaderBack 放在标题左侧；渲染为链接时设置 nativeButton={false}。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeader, { className: "w-full border-b pb-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderBack, { nativeButton: false, render: /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#orders" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderTitle, { children: "订单 SO-20260930-004817" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderDescription, { children: "2026-09-30 14:26 下单 · 小程序 · 自提" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderMeta, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "已支付" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "warning", children: "待出餐" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderActions, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive-outline", children: "退款" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "标记出餐" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
