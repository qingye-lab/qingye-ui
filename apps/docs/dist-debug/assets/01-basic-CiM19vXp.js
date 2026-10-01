import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as DateRangePicker } from "./date-range-picker-C_Myi8t1.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
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
const meta = { title: "基础用法", description: "第一次点击定起点，第二次点击定终点；桌面端并排显示两个月。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "入住日期" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DateRangePicker,
      {
        defaultValue: { from: new Date(2026, 9, 12), to: new Date(2026, 9, 15) },
        disabledDates: { before: new Date(2026, 9, 1) },
        endName: "checkOut",
        startName: "checkIn"
      }
    )
  ] });
}
export {
  Demo as default,
  meta
};
