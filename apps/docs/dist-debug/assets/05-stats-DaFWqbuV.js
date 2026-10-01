import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { C as Card, a as CardHeader, c as CardDescription, f as CardAction, d as CardPanel } from "./card-BUhACMgh.js";
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
const meta = {
  title: "统计卡片",
  description: "指标数字加 numeric，并排时位数对齐；涨跌的好坏用颜色区分，方向用图标表示。"
};
const stats = [
  { label: "本月收入", value: "¥128,430", change: "12.5%", previous: "上月 ¥114,150", good: true },
  { label: "新增客户", value: "342", change: "8.1%", previous: "上月 316 位", good: true },
  { label: "退款率", value: "1.8%", change: "0.4%", previous: "上月 1.4%", good: false }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-full gap-4 sm:grid-cols-3", children: stats.map((stat) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { size: "sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: stat.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardAction, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: stat.good ? "success" : "error", className: "numeric", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { "aria-hidden": "true" }),
        stat.change
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardPanel, { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-2xl numeric", children: stat.value }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: stat.previous })
    ] })
  ] }, stat.label)) });
}
export {
  Demo as default,
  meta
};
