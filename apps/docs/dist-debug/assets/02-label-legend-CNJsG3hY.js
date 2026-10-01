import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { F as Fieldset, a as FieldsetLegend } from "./fieldset-BmPegBmZ.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = { title: "作为问题", description: 'variant="label" 的标题与字段标签同级，适合一组复选框。' };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { className: "max-w-sm gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsetLegend, { variant: "label", children: "通过哪些方式通知你？" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true, name: "channel", value: "sms" }),
      "短信"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true, name: "channel", value: "email" }),
      "邮件"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { name: "channel", value: "wecom" }),
      "企业微信"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
