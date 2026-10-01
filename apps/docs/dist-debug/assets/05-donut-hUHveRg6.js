import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel } from "./card-BUhACMgh.js";
import { C as ChartContainer, R as RechartsPrimitive, a as ChartTooltip, b as ChartTooltipContent, c as ChartLegend, d as ChartLegendContent } from "./chart-B5x57z_Q.js";
const { Label, Pie, PieChart } = RechartsPrimitive;
const meta = {
  title: "环形图",
  description: "中心显示总数；扇区之间留 2px 卡片色缝隙。只用于 6 类以内的占比概览。"
};
const data = [
  { channel: "miniapp", orders: 4820, fill: "var(--color-miniapp)" },
  { channel: "app", orders: 3160, fill: "var(--color-app)" },
  { channel: "store", orders: 2240, fill: "var(--color-store)" },
  { channel: "delivery", orders: 1380, fill: "var(--color-delivery)" }
];
const total = data.reduce((sum, item) => sum + item.orders, 0);
const config = {
  orders: { label: "订单" },
  miniapp: { label: "小程序", color: "var(--chart-1)" },
  app: { label: "App", color: "var(--chart-2)" },
  store: { label: "门店", color: "var(--chart-3)" },
  delivery: { label: "外卖平台", color: "var(--chart-4)" }
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "订单渠道分布" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "9 月 · 全部门店" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartContainer, { className: "mx-auto aspect-square max-h-72 w-full", config, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PieChart, { accessibilityLayer: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltip, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartTooltipContent, { hideLabel: true, nameKey: "channel" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Pie,
        {
          animationDuration: 600,
          cornerRadius: 3,
          data,
          dataKey: "orders",
          innerRadius: "62%",
          nameKey: "channel",
          outerRadius: "86%",
          strokeWidth: 2,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            Label,
            {
              content: ({ viewBox }) => {
                if (!viewBox || !("cx" in viewBox)) return null;
                const { cx, cy } = viewBox;
                return /* @__PURE__ */ jsxRuntimeExports.jsxs("text", { dominantBaseline: "middle", textAnchor: "middle", x: cx, y: cy, children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { className: "fill-foreground font-semibold text-2xl", x: cx, y: cy - 6, children: total.toLocaleString("zh-CN") }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("tspan", { className: "fill-muted-foreground text-xs", x: cx, y: cy + 16, children: "订单总数" })
                ] });
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLegend, { content: /* @__PURE__ */ jsxRuntimeExports.jsx(ChartLegendContent, { nameKey: "channel" }) })
    ] }) }) })
  ] });
}
export {
  Demo as default,
  meta
};
