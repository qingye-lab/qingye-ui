import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription, d as FieldError } from "./field-BVswHr8Y.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = { title: "状态", description: "禁用与校验失败。Field 内的 invalid 会传给触发器。" };
const owners = { zhang: "张伟 · 运维", li: "李娜 · 网络", wang: "王磊 · 安全" };
function OwnerSelect(props) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { items: owners, ...props, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, { placeholder: "选择负责人" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: Object.entries(owners).map(([value, label]) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value, children: label }, value)) })
  ] });
}
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xl gap-5 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "负责人" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OwnerSelect, { disabled: true, defaultValue: "zhang" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "工单已关闭，不能改派。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { invalid: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "负责人" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(OwnerSelect, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { children: "请指定一位负责人" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
