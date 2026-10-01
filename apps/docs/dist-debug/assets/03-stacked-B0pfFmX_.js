import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel } from "./card-BUhACMgh.js";
import { C as ChartContainer, R as RechartsPrimitive, a as ChartTooltip, b as ChartTooltipContent, c as ChartLegend, d as ChartLegendContent } from "./chart-B5x57z_Q.js";
const { Bar, BarChart, CartesianGrid, XAxis, YAxis } = RechartsPrimitive;
const meta = {
  title: "堆叠柱状图",
  description: "段与段之间用 2px 卡片色描边隔开，只在最上一段做圆角。"
};
const data = [
  { week: "第 36 周", miniapp: 2860, app: 1740, delivery: 980 },
  { week: "第 37 周", miniapp: 3020, app: 1810, delivery: 1040 },
  { week: "第 38 周", miniapp: 2940, app: 1920, delivery: 1120 },
  { week: "第 39 周", miniapp: 3310, app: 1880, delivery: 1260 },
  { week: "第 40 周", miniapp: 3480, app: 2050, delivery: 1190 }
];
const config = {
  miniapp: { label: "小程序", color: "var(--chart-1)" },
  app: { label: "App", color: "var(--chart-2)" },
  delivery: { label: "外卖平台", color: "var(--chart-3)" }
};
const gap = { stroke: "var(--color-card)", strokeWidth: 2 };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "订单渠道构成" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "近 5 周 · 单位：单" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContainer, { className: "aspect-auto h-64 w-full sm:h-72", config, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { accessibilityLayer: true, data, margin: { left: 0, right: 0, top: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { vertical: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { axisLine: false, dataKey: "week", tickLine: false, tickMargin: 8 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        YAxis,
        {
          axisLine: false,
          ticks: [0, 2e3, 4e3, 6e3, 8e3],
          tickFormatter: (value) => value.toLocaleString("zh-CN"),
          tickLine: false,
          tickMargin: 4,
          width: "auto"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, { indicator: "dashed" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLegend, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLegendContent, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { ...gap, animationDuration: 600, dataKey: "miniapp", fill: "var(--color-miniapp)", maxBarSize: 32, stackId: "channel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { ...gap, animationDuration: 600, dataKey: "app", fill: "var(--color-app)", maxBarSize: 32, stackId: "channel" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Bar,
        {
          ...gap,
          animationDuration: 600,
          dataKey: "delivery",
          fill: "var(--color-delivery)",
          maxBarSize: 32,
          radius: [4, 4, 0, 0],
          stackId: "channel"
        }
      )
    ] }) }) })
  ] });
}
export {
  Demo as default,
  meta
};
