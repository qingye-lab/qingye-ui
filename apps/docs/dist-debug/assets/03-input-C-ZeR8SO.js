import { j as jsxRuntimeExports, B as Button, D as Search } from "./index-DM02Iz28.js";
import { G as Group, b as GroupText } from "./group-BcPpzhme.js";
import { I as Input } from "./input-D9i-AULz.js";
import { N as NativeSelect, a as NativeSelectOption } from "./native-select-3N5bSCwi.js";
import "./separator-CcYO5Zxi.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./chevrons-up-down-BLzcfRd-.js";
const meta = { title: "与输入框组合", description: "输入框、选择框、文字前缀与按钮拼接为一行。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-md flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { "aria-label": "搜索订单", placeholder: "订单号或手机号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "搜索", size: "icon", variant: "outline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Search, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupText, { children: "https://" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { "aria-label": "自定义域名", defaultValue: "shop.qingyun.design" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "验证" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(NativeSelect, { "aria-label": "币种", className: "w-24 min-w-0 shrink-0", defaultValue: "cny", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "cny", children: "CNY" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "usd", children: "USD" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "eur", children: "EUR" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { "aria-label": "金额", className: "numeric", defaultValue: "1,280.00", inputMode: "decimal" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(GroupText, { children: "元" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
