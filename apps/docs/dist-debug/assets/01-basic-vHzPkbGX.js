import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { C as CheckboxGroup } from "./checkbox-group-B5IO7j-P.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useFieldValidation-CDOPo50V.js";
import "./areArraysEqual-Bigu0Aq6.js";
const meta = { title: "基础用法" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "notify-title", className: "font-medium text-sm", children: "接收以下事件的通知" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CheckboxGroup, { "aria-labelledby": "notify-title", defaultValue: ["offline", "alarm"], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "offline" }),
        "设备离线"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "alarm" }),
        "温度告警"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "firmware" }),
        "固件可升级"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { value: "report" }),
        "每周运行报告"
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
