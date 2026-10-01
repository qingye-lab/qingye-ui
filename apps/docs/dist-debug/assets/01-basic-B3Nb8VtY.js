import { j as jsxRuntimeExports, D as Search } from "./index-DM02Iz28.js";
import { A as Autocomplete, a as AutocompleteInput, b as AutocompletePopup, c as AutocompleteEmpty, d as AutocompleteList, e as AutocompleteItem } from "./autocomplete-DlyiU5Sk.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./ComboboxEmpty-BQp7q2Mg.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./stringifyLocale-DOx30wH1.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = { title: "基础用法", description: "输入时给出建议，也可以直接提交任意文字。" };
const questions = [
  "如何重置设备管理员密码",
  "设备离线后如何排查网络",
  "批量升级固件的步骤",
  "如何导出近 30 天的告警记录",
  "如何为子账号分配只读权限",
  "如何更换绑定的手机号",
  "发票申请与下载"
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Autocomplete, { items: questions, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteInput, { "aria-label": "搜索帮助中心", placeholder: "搜索帮助中心", startAddon: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(AutocompletePopup, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteEmpty, { children: "没有相关文章，按回车搜索全部内容" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteList, { children: (question) => /* @__PURE__ */ jsxRuntimeExports.jsx(AutocompleteItem, { value: question, children: question }, question) })
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
