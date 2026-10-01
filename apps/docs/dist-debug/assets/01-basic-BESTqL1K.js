import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as DatePicker } from "./date-picker-Co0Hqohd.js";
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
const meta = { title: "基础用法", description: "触发器与 Select 同款；选中后可点末端按钮清除。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-64 flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "ship-date", children: "发货日期" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { id: "ship-date", defaultValue: /* @__PURE__ */ new Date() })
  ] });
}
export {
  Demo as default,
  meta
};
