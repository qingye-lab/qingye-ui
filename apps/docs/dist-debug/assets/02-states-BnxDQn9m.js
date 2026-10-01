import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
const meta = { title: "状态" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, {}),
      "未选"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true }),
      "已选"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { indeterminate: true }),
      "半选"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { disabled: true }),
      "禁用"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { disabled: true, defaultChecked: true }),
      "禁用已选"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { "aria-invalid": true }),
      "错误"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
