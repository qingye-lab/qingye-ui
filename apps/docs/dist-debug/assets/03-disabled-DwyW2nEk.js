import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
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
const meta = { title: "禁用", description: "disabled 作用于组内所有表单项，例如审核期间锁定资料。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { className: "max-w-sm", disabled: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsetLegend, { children: "开户资料（审核中）" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "开户银行" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "招商银行杭州分行" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "银行账号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { className: "numeric", defaultValue: "5719 0012 3456 789" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
