import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { f as FieldGroup, F as Field, a as FieldLabel, e as FieldSeparator } from "./field-BVswHr8Y.js";
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
const meta = { title: "分组与分隔", description: "FieldGroup 统一纵向间距；FieldSeparator 可带一段说明文字。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldGroup, { className: "max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "手机号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoComplete: "tel", inputMode: "tel", placeholder: "138 0000 0000" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "获取验证码" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSeparator, { children: "或" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "使用企业微信登录" })
  ] });
}
export {
  Demo as default,
  meta
};
