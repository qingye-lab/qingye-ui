import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { F as Frame, a as FrameHeader, b as FrameTitle, c as FrameDescription, d as FramePanel, e as FrameFooter } from "./frame-CYCij40I.js";
import { M as Meter, a as MeterLabel, b as MeterValue, c as MeterTrack, d as MeterIndicator } from "./meter-BMdIhHJC.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = { title: "组合：账单概览", description: "套餐、用量与扣款信息分成三层：面板放主要内容，底部放次要信息。" };
const usage = [
  { label: "带宽", value: 318, max: 500, unit: "GB" },
  { label: "构建时长", value: 1240, max: 3e3, unit: "分钟" },
  { label: "函数调用", value: 86, max: 100, unit: "万次" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Frame, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FrameHeader, { className: "flex-row items-center justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FrameTitle, { children: "本期账单" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FrameDescription, { children: "9月1日 – 9月30日" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "更改套餐" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FramePanel, { className: "flex items-end justify-between gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "专业版" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", children: "年付" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-semibold text-2xl numeric", children: [
          "¥299",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground text-sm", children: " / 月" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "5 个席位" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FramePanel, { className: "flex flex-col gap-4", children: usage.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Meter, { max: item.max, value: item.value, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterLabel, { children: item.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterValue, { className: "text-muted-foreground", children: (_, value) => `${value.toLocaleString("zh-CN")} / ${item.max.toLocaleString("zh-CN")} ${item.unit}` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MeterTrack, { className: "h-1.5 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeterIndicator, {}) })
    ] }, item.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FrameFooter, { className: "flex items-center justify-between gap-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-muted-foreground", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "numeric", children: "10月1日" }),
        "扣款 · 尾号 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "numeric", children: "4821" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "link", className: "px-0", children: "查看发票" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
