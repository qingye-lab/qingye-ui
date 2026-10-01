import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { C as CheckboxGroup } from "./checkbox-group-B5IO7j-P.js";
import { F as Fieldset, a as FieldsetLegend } from "./fieldset-BmPegBmZ.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useFieldValidation-CDOPo50V.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = { title: "横向排列与禁用", description: "Fieldset 命名整组；禁用的选项保持可见。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Fieldset, { className: "max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldsetLegend, { children: "工作日" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CheckboxGroup, { defaultValue: ["mon", "tue", "wed", "thu", "fri"], className: "flex-row flex-wrap gap-x-5 gap-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "mon" }),
        "周一"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "tue" }),
        "周二"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "wed" }),
        "周三"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "thu" }),
        "周四"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "fri" }),
        "周五"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "sat", disabled: true }),
        "周六"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "sun", disabled: true }),
        "周日"
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
