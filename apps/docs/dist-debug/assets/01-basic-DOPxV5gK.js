import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { S as Slider, a as SliderValue } from "./slider-si_iHGt9.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
import "./valueToPercent-B3zKfIMz.js";
import "./PrehydrationScript-DonLZqUI.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "标签与数值", description: "Field 提供标签，SliderValue 显示当前值。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { defaultValue: 68, format: { style: "unit", unit: "percent" }, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mb-3 flex items-center justify-between gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "屏幕亮度" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SliderValue, { className: "text-muted-foreground numeric" })
  ] }) }) });
}
export {
  Demo as default,
  meta
};
