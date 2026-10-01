import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as DateTimePicker } from "./date-time-picker-BzxHS-ub.js";
import { F as Field, b as FieldDescription } from "./field-BVswHr8Y.js";
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
const meta = { title: "组合：预约上门安装", description: "只能约今天以后的工作日，默认时间 09:00，通过 name 提交。" };
function Demo() {
  const [submitted, setSubmitted] = reactExports.useState(null);
  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get("visitAt")));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex w-full max-w-sm flex-col gap-4 rounded-2xl border bg-card p-5 shadow-xs/5", onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "空调安装预约" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "订单 2026100388 · 格力云佳 1.5 匹" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "visit-at", children: "上门时间" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        DateTimePicker,
        {
          id: "visit-at",
          name: "visitAt",
          label: "上门",
          defaultTime: "09:00",
          disabledDates: [{ before: /* @__PURE__ */ new Date() }, { dayOfWeek: [0, 6] }]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "师傅会在约定时间前 30 分钟电话联系。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", children: "确认预约" }),
    submitted !== null ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
      "visitAt = ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "numeric text-foreground", children: submitted || "（空）" })
    ] }) : null
  ] });
}
export {
  Demo as default,
  meta
};
