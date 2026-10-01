import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { N as NumberField, e as NumberFieldScrubArea, a as NumberFieldGroup, b as NumberFieldDecrement, c as NumberFieldInput, d as NumberFieldIncrement } from "./number-field-C_V_JhD-.js";
import "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./plus-BiUnSJ5I.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useLabelableId-aT49TJD-.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./useRegisterFieldControl-KuH2MueO.js";
const meta = { title: "拖动调整", description: "在标签上左右拖动即可改值，适合设计、调参类界面。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(NumberField, { className: "max-w-40", defaultValue: 16, max: 64, min: 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldScrubArea, { label: "圆角（px）" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(NumberFieldGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldDecrement, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldInput, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldIncrement, {})
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
