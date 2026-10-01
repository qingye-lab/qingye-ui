import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { F as Field, c as FieldContent, a as FieldLabel, b as FieldDescription, e as FieldSeparator } from "./field-BVswHr8Y.js";
import { S as Switch } from "./switch-aO11CiwY.js";
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
import "./useLabelableId-aT49TJD-.js";
const meta = {
  title: "横向",
  description: 'orientation="horizontal" 用于开关与复选框；FieldContent 包住标签和说明，控件与第一行对齐。'
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-md flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "设备离线提醒" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "设备超过 10 分钟未上报时，通过短信通知负责人。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "每周运维报告" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "每周一 9:00 发送到团队邮箱。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, {})
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "同步到企业微信" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "工单状态变化时推送到“运维值班”群。" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "同时抄送给我" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
