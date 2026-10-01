import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = { title: "多选", description: "列表在选择后保持打开；触发器上汇总显示。" };
const channels = { sms: "短信", email: "邮件", wecom: "企业微信", dingtalk: "钉钉", phone: "电话" };
const summary = (value) => value.length === 0 ? "选择通知渠道" : value.length <= 2 ? value.map((item) => channels[item]).join("、") : `${channels[value[0]]}、${channels[value[1]]} 等 ${value.length} 项`;
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { multiple: true, items: channels, defaultValue: ["sms", "wecom"], "aria-label": "告警通知渠道", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { className: "w-full max-w-64", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { children: summary }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: Object.keys(channels).map((value) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: channels[value] }, value)) })
  ] });
}
export {
  Demo as default,
  meta
};
