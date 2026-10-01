import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription, d as FieldError } from "./field-BVswHr8Y.js";
import { P as PasswordInput } from "./password-input-b3Ih0lnd.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "配合 Field", description: "标签、规则说明与校验信息。提交后未满足 minLength 时显示错误。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xs gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "新密码" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { autoComplete: "new-password", minLength: 8, required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "至少 8 位，建议包含字母与数字。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { invalid: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "确认密码" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { autoComplete: "new-password", defaultValue: "hangzhou" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { children: "两次输入的密码不一致。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "当前密码" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PasswordInput, { defaultValue: "unchanged" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
