import { j as jsxRuntimeExports, A as ArrowRight } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, d as FieldError } from "./field-BVswHr8Y.js";
import { I as InputGroup, c as InputGroupInput, a as InputGroupAddon, b as InputGroupText, d as InputGroupButton } from "./input-group-2ApKrTnA.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
const meta = { title: "状态", description: "无效与禁用作用于整个组合。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xs gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { invalid: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "回调地址" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { className: "*:[input]:ps-0!", defaultValue: "hooks.example" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupText, { children: "https://" }) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { children: "请填写完整域名，例如 hooks.example.com" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "订阅邮箱" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(InputGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupInput, { placeholder: "name@company.com", type: "email" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupAddon, { align: "inline-end", children: /* @__PURE__ */ jsxRuntimeExports.jsx(InputGroupButton, { "aria-label": "订阅", disabled: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { "aria-hidden": "true" }) }) })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
