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
const meta = {
  title: "校验",
  description: 'validationMode="onBlur" 在离开输入框时校验；match 让每条文案只对应一种错误。试着留空或输入不完整的邮箱。'
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", validationMode: "onBlur", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldLabel, { children: [
      "工作邮箱 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: "text-destructive-foreground", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { placeholder: "name@company.com", required: true, type: "email" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { match: "valueMissing", children: "请填写工作邮箱。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { match: "typeMismatch", children: "邮箱格式不正确，例如 lin.xiao@company.com。" })
  ] });
}
export {
  Demo as default,
  meta
};
