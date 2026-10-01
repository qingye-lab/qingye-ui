import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as DateRangePicker } from "./date-range-picker-C_Myi8t1.js";
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
const meta = { title: "尺寸", description: "与 Select、Input 同一套高度。" };
const range = { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xs flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { "aria-label": "小尺寸", defaultValue: range, size: "sm" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { "aria-label": "默认尺寸", defaultValue: range }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DateRangePicker, { "aria-label": "大尺寸", defaultValue: range, size: "lg" })
  ] });
}
export {
  Demo as default,
  meta
};
