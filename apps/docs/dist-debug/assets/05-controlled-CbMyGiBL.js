import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
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
const meta = { title: "受控与快捷日期", description: "外部按钮直接写入值，日历打开时定位到对应月份。" };
const addDays = (days) => {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() + days);
  return date;
};
function Demo() {
  const [date, setDate] = reactExports.useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "follow-up", children: "下次回访" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DatePicker, { id: "follow-up", value: date, onValueChange: setDate, disabledDates: { before: /* @__PURE__ */ new Date() } }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xs", variant: "outline", onClick: () => setDate(addDays(1)), children: "明天" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xs", variant: "outline", onClick: () => setDate(addDays(7)), children: "一周后" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xs", variant: "outline", onClick: () => setDate(addDays(30)), children: "30 天后" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
