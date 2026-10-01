import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, d as CardPanel } from "./card-BUhACMgh.js";
import { S as Stat, a as StatLabel, b as StatValue, d as StatDescription, e as StatDelta, c as StatUnit } from "./stat-CUlQy5Ys.js";
import "./arrow-up-right-CCvFLBck.js";
const meta = {
  title: "趋势与反向指标",
  description: "颜色表达好坏：故障率、响应时间这类以下降为好的指标设置 inverse。badge 样式增加淡色底。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stat, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatLabel, { children: "今日订单" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatValue, { children: "3,962" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(StatDescription, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatDelta, { trend: "up", children: "+12.4%" }),
        "较昨日"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stat, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatLabel, { children: "退款金额" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(StatValue, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatUnit, { children: "¥" }),
        "8,240"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(StatDescription, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatDelta, { trend: "flat", children: "0.0%" }),
        "较昨日"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stat, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatLabel, { children: "设备故障率" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(StatValue, { children: [
        "0.42",
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatUnit, { children: "%" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(StatDescription, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatDelta, { inverse: true, trend: "down", variant: "badge", children: "−0.18%" }),
        "较上月"
      ] })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stat, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatLabel, { children: "平均响应时间" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(StatValue, { children: [
        "182",
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatUnit, { children: "ms" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(StatDescription, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(StatDelta, { inverse: true, trend: "up", variant: "badge", children: "+24 ms" }),
        "较上周"
      ] })
    ] }) }) })
  ] });
}
export {
  Demo as default,
  meta
};
