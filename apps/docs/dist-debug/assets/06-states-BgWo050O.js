import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, d as FieldError } from "./field-BVswHr8Y.js";
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
const meta = { title: "状态", description: "无效、只读与禁用。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xs gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { invalid: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "补货数量" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberField, { defaultValue: 0, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NumberFieldGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldDecrement, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldInput, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldIncrement, {})
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { children: "补货数量至少为 1。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "当前库存" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberField, { defaultValue: 326, readOnly: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NumberFieldGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldDecrement, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldInput, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldIncrement, {})
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "安全库存" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NumberField, { defaultValue: 50, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(NumberFieldGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldDecrement, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldInput, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NumberFieldIncrement, {})
      ] }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
