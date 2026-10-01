import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as DateRangePicker } from "./date-range-picker-C_Myi8t1.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { N as NativeSelect, a as NativeSelectOption } from "./native-select-3N5bSCwi.js";
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
import "./FieldControl-CFc5_9rC.js";
const meta = {
  title: "筛选栏",
  description: "startName / endName 以本地 YYYY-MM-DD 提交，适合直接拼进查询参数。"
};
function Demo() {
  const [query, setQuery] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "form",
    {
      className: "flex w-full max-w-2xl flex-col gap-3",
      onSubmit: (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        setQuery(new URLSearchParams(data).toString());
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-3 sm:grid-cols-[1fr_10rem_auto] sm:items-end", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "下单时间" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              DateRangePicker,
              {
                defaultValue: { from: new Date(2026, 8, 1), to: new Date(2026, 8, 30) },
                endName: "to",
                startName: "from"
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "订单状态" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(NativeSelect, { defaultValue: "paid", name: "status", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "all", children: "全部" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "paid", children: "已支付" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "refunded", children: "已退款" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "submit", variant: "outline", children: "查询" })
        ] }),
        query ? /* @__PURE__ */ jsxRuntimeExports.jsxs("code", { className: "truncate rounded-md bg-muted px-2 py-1 font-mono text-muted-foreground text-xs", children: [
          "?",
          query
        ] }) : null
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
