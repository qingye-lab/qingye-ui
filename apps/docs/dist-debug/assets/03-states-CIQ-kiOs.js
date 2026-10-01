import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as DateTimePicker } from "./date-time-picker-BzxHS-ub.js";
import { F as Field, b as FieldDescription, d as FieldError } from "./field-BVswHr8Y.js";
import { L as Label } from "./label-DS1FPyP3.js";
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
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./separator-CcYO5Zxi.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
const meta = { title: "状态", description: "精确到秒、错误、只读与禁用。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xl gap-5 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "cutover-at", children: "切换窗口" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DateTimePicker, { id: "cutover-at", label: "切换窗口", step: 1, defaultValue: "2026-10-18T02:00:00" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "step=1，精确到秒。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "publish-at", children: "定时发布" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DateTimePicker, { id: "publish-at", label: "发布", "aria-invalid": true, "aria-describedby": "publish-error" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { id: "publish-error", children: "请设置发布时间" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "created-at", children: "工单创建时间" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DateTimePicker, { id: "created-at", readOnly: true, defaultValue: "2026-09-28T16:42" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "locked-at", children: "锁定时间" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DateTimePicker, { id: "locked-at", disabled: true, defaultValue: "2026-09-30T18:00" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
