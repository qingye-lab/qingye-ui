import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, d as CardPanel } from "./card-BUhACMgh.js";
import { S as Stat, a as StatLabel, b as StatValue, c as StatUnit, d as StatDescription, e as StatDelta } from "./stat-CUlQy5Ys.js";
import "./arrow-up-right-CCvFLBck.js";
const meta = { title: "基础", description: "放进 Card，数值使用等宽数字，变化量注明对比周期。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-xs", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stat, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(StatLabel, { children: "在线设备" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatValue, { children: [
      "1,284",
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatUnit, { children: "台" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(StatDescription, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatDelta, { trend: "up", children: "+8.2%" }),
      "较上周"
    ] })
  ] }) }) });
}
export {
  Demo as default,
  meta
};
