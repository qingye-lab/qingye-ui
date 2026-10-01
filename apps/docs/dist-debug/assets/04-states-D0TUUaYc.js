import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, d as FieldError } from "./field-BVswHr8Y.js";
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
const meta = { title: "状态", description: "无效、只读与禁用。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xs gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { invalid: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "邮箱" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "li.na@company", type: "email" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { children: "邮箱格式不正确，例如 li.na@company.com" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "工号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "YQ-20481", readOnly: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "所属部门" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "运维中心" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
