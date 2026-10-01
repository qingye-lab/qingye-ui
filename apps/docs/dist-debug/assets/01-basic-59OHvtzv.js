import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import { O as OTPField, a as OTPFieldInput } from "./otp-field-1pTGqpPn.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "基础用法", description: "6 位数字验证码。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "items-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "短信验证码" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(OTPField, { length: 6, children: Array.from({ length: 6 }, (_, index) => /* @__PURE__ */ jsxRuntimeExports.jsx(OTPFieldInput, {}, index)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "已发送至 138 **** 6021" })
  ] });
}
export {
  Demo as default,
  meta
};
