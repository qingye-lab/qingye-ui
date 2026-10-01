import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
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
const meta = { title: "范围与步长", description: "到达边界时对应按钮自动禁用；Shift + ↑ ↓ 按 largeStep 调整。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "告警阈值（°C）" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NumberField, { defaultValue: 38, largeStep: 5, max: 40, min: 20, step: 0.5, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NumberFieldGroup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldDecrement, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldInput, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldIncrement, {})
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "机房温度超过阈值时通知值班人员，范围 20 – 40。" })
  ] });
}
export {
  Demo as default,
  meta
};
