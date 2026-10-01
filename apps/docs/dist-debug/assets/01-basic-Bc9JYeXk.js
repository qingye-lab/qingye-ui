import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as DateTimePicker } from "./date-time-picker-BzxHS-ub.js";
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
const meta = { title: "基础用法", description: "先选日期，再在底部输入时间；值为本地时间字符串。" };
function Demo() {
  const [value, setValue] = reactExports.useState("2026-10-12T14:30");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-72 flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "meeting-at", children: "评审会时间" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DateTimePicker, { id: "meeting-at", label: "评审会", value, onValueChange: setValue }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
      "value = ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "numeric text-foreground", children: value || "（空）" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
