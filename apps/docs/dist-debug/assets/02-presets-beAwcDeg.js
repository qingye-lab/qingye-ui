import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
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
const meta = {
  title: "快捷范围",
  description: "常用时间段一键选定；桌面端在日历左侧，窄屏在顶部横向排列。"
};
const daysAgo = (days) => {
  const date = /* @__PURE__ */ new Date();
  date.setDate(date.getDate() - days);
  return date;
};
const presets = [
  { label: "今天", value: () => ({ from: /* @__PURE__ */ new Date(), to: /* @__PURE__ */ new Date() }) },
  { label: "最近 7 天", value: () => ({ from: daysAgo(6), to: /* @__PURE__ */ new Date() }) },
  { label: "最近 30 天", value: () => ({ from: daysAgo(29), to: /* @__PURE__ */ new Date() }) },
  {
    label: "本月",
    value: () => {
      const today = /* @__PURE__ */ new Date();
      return { from: new Date(today.getFullYear(), today.getMonth(), 1), to: today };
    }
  }
];
function Demo() {
  const [range, setRange] = reactExports.useState(() => ({ from: daysAgo(6), to: /* @__PURE__ */ new Date() }));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "统计区间" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DateRangePicker,
      {
        disabledDates: { after: /* @__PURE__ */ new Date() },
        onValueChange: setRange,
        presets,
        value: range
      }
    )
  ] });
}
export {
  Demo as default,
  meta
};
