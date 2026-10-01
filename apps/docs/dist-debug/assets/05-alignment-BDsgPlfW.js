import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { I as Input } from "./input-D9i-AULz.js";
import { N as NativeSelect, a as NativeSelectOption } from "./native-select-3N5bSCwi.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = {
  title: "与 Select、Input 并排",
  description: "高度、边框、内边距与图标位置和 Select 触发器完全一致，混用时不会错位。"
};
const plans = [
  { value: "monthly", label: "按月付费" },
  { value: "yearly", label: "按年付费" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-2xl gap-3 sm:grid-cols-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { "aria-label": "团队名称", defaultValue: "青云设计" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelect, { "aria-label": "付费周期（原生）", defaultValue: "yearly", children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: plan.value, children: plan.label }, plan.value)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Select, { defaultValue: "yearly", items: plans, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "付费周期", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: plans.map((plan) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: plan.value, children: plan.label }, plan.value)) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
