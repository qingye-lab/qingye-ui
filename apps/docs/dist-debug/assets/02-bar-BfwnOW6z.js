import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel } from "./card-BUhACMgh.js";
import { C as ChartContainer, R as RechartsPrimitive, a as ChartTooltip, b as ChartTooltipContent, c as ChartLegend, d as ChartLegendContent } from "./chart-B5x57z_Q.js";
const { Bar, BarChart, CartesianGrid, XAxis, YAxis } = RechartsPrimitive;
const meta = { title: "分组柱状图", description: "柱宽不超过 24px，同组柱之间留 2px 背景色缝隙，数据端 4px 圆角。" };
const data = [
  { month: "4月", online: 8420, store: 6130 },
  { month: "5月", online: 9160, store: 6480 },
  { month: "6月", online: 10240, store: 6020 },
  { month: "7月", online: 11830, store: 6740 },
  { month: "8月", online: 12460, store: 7210 },
  { month: "9月", online: 11920, store: 7580 }
];
const config = {
  online: { label: "线上订单", color: "var(--chart-1)" },
  store: { label: "门店订单", color: "var(--chart-2)" }
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "月度订单" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "2026 年 4–9 月 · 单位：单" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContainer, { className: "aspect-auto h-64 w-full sm:h-72", config, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(BarChart, { accessibilityLayer: true, barGap: 2, data, margin: { left: 0, right: 0, top: 8 }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CartesianGrid, { vertical: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(XAxis, { axisLine: false, dataKey: "month", tickLine: false, tickMargin: 8 }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        YAxis,
        {
          axisLine: false,
          ticks: [0, 5e3, 1e4, 15e3],
          tickFormatter: (value) => value.toLocaleString("zh-CN"),
          tickLine: false,
          tickMargin: 4,
          width: "auto"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLegend, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLegendContent, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { animationDuration: 600, dataKey: "online", fill: "var(--color-online)", maxBarSize: 24, radius: [4, 4, 0, 0] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Bar, { animationDuration: 600, dataKey: "store", fill: "var(--color-store)", maxBarSize: 24, radius: [4, 4, 0, 0] })
    ] }) }) })
  ] });
}
export {
  Demo as default,
  meta
};
