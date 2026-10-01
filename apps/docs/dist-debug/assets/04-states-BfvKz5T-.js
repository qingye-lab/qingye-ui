import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as DateRangePicker } from "./date-range-picker-C_Myi8t1.js";
import { F as Field, a as FieldLabel, d as FieldError } from "./field-BVswHr8Y.js";
import "./use-media-query-CGVr0VA1.js";
import "./calendar-D2f3pu0H.js";
import "./chevron-left-CtqcxRzh.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./date-picker-Co0Hqohd.js";
import "./popover-BKcHrCxN.js";
import "./select-D8_OW39t.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
import "./calendar-DI6AfLRW.js";
import "./separator-CcYO5Zxi.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
const meta = { title: "状态", description: "占位、跨年范围、禁用与无效。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-2xl gap-5 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "活动周期" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { placeholder: "选择开始与结束日期" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "年度盘点" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { defaultValue: { from: new Date(2025, 11, 20), to: new Date(2026, 0, 5) } })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "合同有效期" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { defaultValue: { from: new Date(2026, 0, 1), to: new Date(2026, 11, 31) }, disabled: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { invalid: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "请假时间" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { "aria-invalid": true, required: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { children: "请选择请假的起止日期" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
