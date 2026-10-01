import { j as jsxRuntimeExports, a5 as CircleCheck, a6 as CircleAlert } from "./index-DM02Iz28.js";
import { P as Progress, a as ProgressLabel, c as ProgressTrack, d as ProgressIndicator, b as ProgressValue } from "./progress-BZAK39FK.js";
import "./ProgressValue-Dwq408mP.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = {
  title: "颜色与粗细",
  description: "用 className 修改指示条颜色和轨道高度；结果同时用文字或图标说明。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Progress, { value: 100, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLabel, { children: "数据库备份" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-sm text-success-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { "aria-hidden": "true", className: "size-4" }),
          "已完成"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, { className: "bg-success" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Progress, { value: 64, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLabel, { children: "同步商品库存" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-destructive-foreground text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { "aria-hidden": "true", className: "size-4" }),
          "在 64% 处中断"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, { className: "bg-destructive" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Progress, { value: 30, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLabel, { children: "索引重建" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressValue, { className: "text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { className: "h-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, {}) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
