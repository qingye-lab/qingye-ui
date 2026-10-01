import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card } from "./card-BUhACMgh.js";
import { S as Stat, a as StatLabel, b as StatValue, c as StatUnit, d as StatDescription, e as StatDelta } from "./stat-CUlQy5Ys.js";
import "./arrow-up-right-CCvFLBck.js";
const meta = {
  title: "指标网格",
  description: "一张卡片内用发丝线分隔多个指标：窄屏两列，宽屏四列。"
};
const stats = [
  { label: "在线设备", value: "1,284", unit: "台", delta: "+8.2%", trend: "up", period: "较上周" },
  { label: "今日订单", value: "3,962", unit: "单", delta: "+12.4%", trend: "up", period: "较昨日" },
  { label: "客单价", value: "32.4", unit: "元", delta: "−1.6%", trend: "down", period: "较昨日" },
  { label: "未处理告警", value: "17", unit: "条", delta: "−5", trend: "down", period: "较昨日", inverse: true }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("dl", { className: "m-0 grid grid-cols-2 gap-px bg-border lg:grid-cols-4", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Stat, { className: "bg-card p-4 sm:p-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatLabel, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("dt", {}), children: stat.label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatValue, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "m-0" }), children: [
      stat.value,
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatUnit, { children: stat.unit })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatDescription, { render: /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "m-0" }), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatDelta, { inverse: "inverse" in stat, trend: stat.trend, children: stat.delta }),
      stat.period
    ] })
  ] }, stat.label)) }) });
}
export {
  Demo as default,
  meta
};
