import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as DatePicker } from "./date-picker-Co0Hqohd.js";
import { F as Field, b as FieldDescription, d as FieldError } from "./field-BVswHr8Y.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./calendar-D2f3pu0H.js";
import "./chevron-left-CtqcxRzh.js";
import "./chevrons-up-down-BLzcfRd-.js";
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
const meta = { title: "状态", description: "不可选日期、错误、禁用与不可清除。" };
function Demo() {
  const today = /* @__PURE__ */ new Date();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xl gap-5 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visit-date", children: "预约上门" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { id: "visit-date", disabledDates: [{ before: today }, { dayOfWeek: [0] }] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "周日不上门，今天之前不可选。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "expire-date", children: "合同到期日" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { id: "expire-date", "aria-invalid": true, "aria-describedby": "expire-error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { id: "expire-error", children: "请选择合同到期日" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "signed-date", children: "签订日期" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { id: "signed-date", defaultValue: new Date(2026, 3, 8), disabled: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "entry-date", children: "入职日期" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { id: "entry-date", defaultValue: new Date(2026, 8, 1), clearable: false }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "必填字段不提供清除。" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
