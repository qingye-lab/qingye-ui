import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as Prose } from "./typography-Co1wZ35x.js";
import "./arrow-up-right-CCvFLBck.js";
const meta = { title: "紧凑长文", description: 'size="sm" 用于侧栏、抽屉中的说明文字。' };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Prose, { className: "w-full max-w-sm", size: "sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { children: "关于自动对账" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "每天凌晨 2:00 系统会拉取前一日的支付流水与订单，自动比对金额与笔数。差异会出现在",
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#diff", children: "对账差异" }),
      "中。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "金额差异小于 0.01 元的记录自动忽略。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "退款以原支付渠道的到账时间为准。" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
