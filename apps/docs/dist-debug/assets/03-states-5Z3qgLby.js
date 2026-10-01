import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, d as FieldError } from "./field-BVswHr8Y.js";
import { N as NativeSelect, a as NativeSelectOption } from "./native-select-3N5bSCwi.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "状态", description: "占位、禁用与无效。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xl gap-5 sm:grid-cols-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "发票类型" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(NativeSelect, { placeholder: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "normal", children: "增值税普通发票" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "special", children: "增值税专用发票" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "结算币种" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(NativeSelect, { defaultValue: "cny", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "cny", children: "人民币 CNY" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "usd", children: "美元 USD" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { invalid: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "所属部门" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(NativeSelect, { placeholder: "选择部门", required: true, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "design", children: "设计部" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "engineering", children: "研发部" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "operations", children: "运营部" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { children: "请选择所属部门" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
