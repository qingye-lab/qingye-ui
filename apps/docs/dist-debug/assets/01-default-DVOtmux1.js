import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { N as NumberField, a as NumberFieldGroup, b as NumberFieldDecrement, c as NumberFieldInput, d as NumberFieldIncrement } from "./number-field-C_V_JhD-.js";
import "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./plus-BiUnSJ5I.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useLabelableId-aT49TJD-.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./useRegisterFieldControl-KuH2MueO.js";
const meta = { title: "默认", description: "点击按钮、按 ↑ ↓ 或直接输入。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(NumberField, { "aria-label": "采购数量", className: "max-w-40", defaultValue: 12, min: 1, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NumberFieldGroup, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldDecrement, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldInput, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldIncrement, {})
  ] }) });
}
export {
  Demo as default,
  meta
};
