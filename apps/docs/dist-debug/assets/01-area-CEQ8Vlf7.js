import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel } from "./card-BUhACMgh.js";
import { C as ChartContainer, R as RechartsPrimitive, a as ChartTooltip, b as ChartTooltipContent } from "./chart-B5x57z_Q.js";
const { Area, AreaChart, CartesianGrid, XAxis, YAxis } = RechartsPrimitive;
const meta = { title: "面积图", description: "单一系列不放图例，由标题说明；渐变填充保持在 16% 以内。" };
const data = [
  1102,
  1118,
  1109,
  1131,
  1146,
  1139,
  1152,
  1168,
  1160,
  1175,
  1189,
  1181,
  1194,
  1207,
  1199,
  1213,
  1226,
  1218,
  1231,
  1240,
  1236,
  1249,
  1258,
  1251,
  1263,
  1270,
  1266,
  1275,
  1281,
  1284
].map((online, index) => ({ date: `9月${index + 1}日`, online }));
const config = {
  online: { label: "在线设备", color: "var(--chart-1)" }
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "在线设备数" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "9 月每日峰值 · 全部门店" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContainer, { className: "aspect-auto h-56 w-full sm:h-64", config, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(AreaChart, { accessibilityLayer: true, data, margin: { left: 0, right: 8, top: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("defs", { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "fill-online", x1: "0", x2: "0", y1: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0%", stopColor: "var(--color-online)", stopOpacity: 0.16 }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "100%", stopColor: "var(--color-online)", stopOpacity: 0 })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { vertical: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { axisLine: false, dataKey: "date", minTickGap: 24, tickLine: false, tickMargin: 8 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        YAxis,
        {
          axisLine: false,
          domain: [1e3, 1300],
          ticks: [1e3, 1100, 1200, 1300],
          tickFormatter: (value) => value.toLocaleString("zh-CN"),
          tickLine: false,
          tickMargin: 4,
          width: "auto"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, { valueFormatter: (value) => `${Number(value).toLocaleString("zh-CN")} 台` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Area,
        {
          activeDot: { r: 4, strokeWidth: 2 },
          animationDuration: 600,
          dataKey: "online",
          fill: "url(#fill-online)",
          stroke: "var(--color-online)",
          strokeWidth: 2,
          type: "monotone"
        }
      )
    ] }) }) })
  ] });
}
export {
  Demo as default,
  meta
};
