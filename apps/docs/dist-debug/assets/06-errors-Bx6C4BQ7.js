import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
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
  title: "表单库错误",
  description: "errors 接收 react-hook-form、TanStack Form 等给出的错误数组：自动去重，多条时显示为列表。"
};
function check(value) {
  return [
    value.length < 8 ? { message: "至少 8 位" } : void 0,
    /\d/.test(value) ? void 0 : { message: "至少包含 1 个数字" },
    /[A-Za-z]/.test(value) ? void 0 : { message: "至少包含 1 个字母" }
  ].filter(Boolean);
}
function Demo() {
  const [value, setValue] = reactExports.useState("2026");
  const errors = check(value);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", invalid: errors.length > 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "设备管理密码" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { onChange: (event) => setValue(event.target.value), value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { errors })
  ] });
}
export {
  Demo as default,
  meta
};
