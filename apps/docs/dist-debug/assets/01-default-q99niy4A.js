import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import { F as Fieldset, a as FieldsetLegend } from "./fieldset-BmPegBmZ.js";
import { I as Input } from "./input-D9i-AULz.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "默认" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { className: "max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsetLegend, { children: "发票信息" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "发票抬头" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "杭州言青科技有限公司" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "纳税人识别号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "numeric", placeholder: "18 位统一社会信用代码" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "可在营业执照上找到。" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
