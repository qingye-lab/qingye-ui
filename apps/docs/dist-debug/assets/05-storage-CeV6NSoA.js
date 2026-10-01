import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel, e as CardFooter } from "./card-BUhACMgh.js";
import { M as Meter, a as MeterLabel, b as MeterValue, c as MeterTrack, d as MeterIndicator } from "./meter-BMdIhHJC.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = { title: "组合：存储空间", description: "总量在上，分类在下；分类用图表色区分，并配文字标签。" };
const categories = [
  { label: "照片", value: 32.1, color: "bg-chart-1" },
  { label: "视频", value: 21.4, color: "bg-chart-2" },
  { label: "文档", value: 9.8, color: "bg-chart-3" },
  { label: "其他", value: 5.1, color: "bg-chart-4" }
];
const gb = { style: "unit", unit: "gigabyte", maximumFractionDigits: 1 };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "存储空间" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "团队云盘 · 专业版 100 GB" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardPanel, { className: "flex flex-col gap-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Meter, { format: gb, max: 100, value: 68.4, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-baseline justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MeterLabel, { children: "已使用" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MeterValue, { className: "font-semibold text-lg" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterTrack, { className: "h-2.5 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeterIndicator, { className: "rounded-full" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-2 gap-x-6 gap-y-4", children: categories.map((category) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Meter, { format: gb, max: 100, value: category.value, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(MeterLabel, { className: "flex items-center gap-2 font-normal text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: `size-2 rounded-full ${category.color}` }),
            category.label
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MeterValue, {})
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterTrack, { className: "h-1 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeterIndicator, { className: category.color }) })
      ] }, category.label)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "剩余 31.6 GB" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "升级到 1 TB" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
