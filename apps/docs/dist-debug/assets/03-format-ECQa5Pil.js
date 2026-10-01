import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { N as NumberField, a as NumberFieldGroup, b as NumberFieldDecrement, c as NumberFieldInput, d as NumberFieldIncrement } from "./number-field-C_V_JhD-.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./plus-BiUnSJ5I.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./useLabelableId-aT49TJD-.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./useRegisterFieldControl-KuH2MueO.js";
const meta = { title: "格式化", description: "format 接受 Intl.NumberFormat 选项：货币、百分比、单位。" };
const fields = [
  { label: "单价", defaultValue: 1280, format: { style: "currency", currency: "CNY" }, step: 10 },
  { label: "折扣", defaultValue: 0.85, format: { style: "percent" }, step: 0.05, min: 0, max: 1 },
  { label: "库容上限", defaultValue: 2400, format: { style: "unit", unit: "kilogram" }, step: 100 }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-full max-w-xs gap-4", children: fields.map(({ label, ...props }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NumberField, { ...props, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NumberFieldGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldDecrement, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldInput, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldIncrement, {})
    ] }) })
  ] }, label)) });
}
export {
  Demo as default,
  meta
};
