import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { M as Meter, a as MeterLabel, b as MeterValue, c as MeterTrack, d as MeterIndicator } from "./meter-BMdIhHJC.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = {
  title: "格式化数值",
  description: "format 接收 Intl.NumberFormat 选项，可显示金额、单位；min / max 可以是任意范围。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Meter,
      {
        format: { style: "currency", currency: "CNY", maximumFractionDigits: 0 },
        locale: "zh-CN",
        max: 5e3,
        value: 3260,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MeterLabel, { children: "本月广告预算" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(MeterValue, { className: "text-muted-foreground", children: (formatted) => `${formatted} / ¥5,000` })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MeterTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeterIndicator, {}) })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Meter, { format: { style: "unit", unit: "gigabyte", maximumFractionDigits: 1 }, max: 16, value: 12.4, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterLabel, { children: "内存" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterValue, { className: "text-muted-foreground", children: (formatted) => `${formatted} / 16 GB` })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MeterTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeterIndicator, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Meter, { format: { style: "unit", unit: "celsius" }, max: 100, min: 30, value: 68, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterLabel, { children: "CPU 温度" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterValue, { className: "text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MeterTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeterIndicator, {}) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
