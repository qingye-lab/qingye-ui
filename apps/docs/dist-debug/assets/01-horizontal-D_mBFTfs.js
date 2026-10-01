import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { D as DescriptionList, a as DescriptionListItem, b as DescriptionTerm, c as DescriptionDetails } from "./description-list-DbCz6cCA.js";
import "./copy-button-B3gSj0u1.js";
import "./copy-CMgYpHr5.js";
const meta = { title: "水平布局", description: "名称在左侧固定列，适合详情页和抽屉。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionList, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: "订单号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { className: "font-mono", copyLabel: "复制订单号", copyValue: "SO-20260930-004817", children: "SO-20260930-004817" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: "订单状态" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "success", children: "已支付" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: "下单时间" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { className: "numeric", children: "2026-09-30 14:26:08" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: "实付金额" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { className: "numeric", children: "¥ 1,286.00" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: "收货地址" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { children: "上海市徐汇区漕溪北路 398 号汇智大厦 12 层 1203 室（工作日 9:00–18:00 可收货）" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: "备注" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { className: "text-muted-foreground", children: "—" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
