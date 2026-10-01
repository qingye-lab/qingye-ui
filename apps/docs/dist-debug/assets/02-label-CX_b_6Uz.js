import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { M as Meter, a as MeterLabel, b as MeterValue, c as MeterTrack, d as MeterIndicator } from "./meter-BMdIhHJC.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = { title: "标签与数值", description: "MeterValue 默认显示数值在范围内的百分比。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Meter, { className: "max-w-sm", value: 75, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MeterLabel, { children: "团队席位" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MeterValue, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MeterTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeterIndicator, {}) })
  ] });
}
export {
  Demo as default,
  meta
};
