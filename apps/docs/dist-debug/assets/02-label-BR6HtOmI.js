import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as Progress, a as ProgressLabel, b as ProgressValue, c as ProgressTrack, d as ProgressIndicator } from "./progress-BZAK39FK.js";
import "./ProgressValue-Dwq408mP.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = { title: "标签与数值", description: "标签和数值放在轨道上方的一行，两端对齐。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Progress, { className: "max-w-sm", value: 64, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLabel, { children: "导出订单数据" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressValue, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, {}) })
  ] });
}
export {
  Demo as default,
  meta
};
