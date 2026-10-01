import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { F as Field, c as FieldContent, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./separator-CcYO5Zxi.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = { title: "带说明", description: "放进 Field，说明会作为复选框的描述读出。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", className: "max-w-sm items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true, className: "mt-px" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "同步到企业通讯录" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "新成员入职后自动加入「研发中心」部门，并开通邮箱与 VPN。" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
