import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, d as CardPanel } from "./card-BUhACMgh.js";
import { S as Stat, a as StatLabel, b as StatValue, c as StatUnit, d as StatDescription, e as StatDelta, f as StatSparkline } from "./stat-CUlQy5Ys.js";
import { S as Server } from "./server-CpaPaZZv.js";
import "./arrow-up-right-CCvFLBck.js";
const __iconNode = [
  [
    "path",
    {
      d: "M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2",
      key: "169zse"
    }
  ]
];
const Activity = createLucideIcon("activity", __iconNode);
const meta = {
  title: "迷你趋势线",
  description: "StatSparkline 不依赖图表库；颜色取 currentColor，线宽在任意尺寸下保持 1.5px。"
};
const online = [1102, 1136, 1121, 1158, 1190, 1176, 1204, 1231, 1218, 1250, 1266, 1284];
const latency = [212, 205, 198, 204, 191, 188, 196, 179, 184, 176, 171, 182];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full grid-cols-1 gap-3 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardPanel, { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Stat, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(StatLabel, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Server, { "aria-hidden": "true" }),
          "在线设备"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(StatValue, { children: [
          "1,284",
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatUnit, { children: "台" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(StatDescription, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatDelta, { trend: "up", children: "+8.2%" }),
          "近 12 周"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatSparkline, { data: online, label: "近 12 周在线设备从 1,102 台升至 1,284 台" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardPanel, { className: "flex flex-col gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Stat, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(StatLabel, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { "aria-hidden": "true" }),
          "接口平均耗时"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(StatValue, { children: [
          "182",
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatUnit, { children: "ms" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(StatDescription, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(StatDelta, { inverse: true, trend: "down", children: "−14.2%" }),
          "近 12 周"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(StatSparkline, { className: "text-chart-2", data: latency, fill: false, label: "近 12 周接口平均耗时从 212ms 降至 182ms" })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
