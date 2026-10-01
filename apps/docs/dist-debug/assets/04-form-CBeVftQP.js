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
const meta = { title: "表单提交", description: "通过 name 提交，值为本地日期 YYYY-MM-DD。" };
function Demo() {
  const [submitted, setSubmitted] = reactExports.useState("");
  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitted(String(new FormData(event.currentTarget).get("purchasedAt")));
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { className: "flex w-full max-w-64 flex-col gap-3", onSubmit, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: "purchased-at", children: "购买日期" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DatePicker,
      {
        id: "purchased-at",
        name: "purchasedAt",
        disabledDates: { after: /* @__PURE__ */ new Date() },
        calendarProps: { captionLayout: "dropdown", startMonth: new Date(2015, 0), endMonth: /* @__PURE__ */ new Date() }
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "outline", children: "提交保修登记" }),
    submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-sm", children: [
      "purchasedAt = ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "numeric text-foreground", children: submitted || "（空）" })
    ] }) : null
  ] });
}
export {
  Demo as default,
  meta
};
