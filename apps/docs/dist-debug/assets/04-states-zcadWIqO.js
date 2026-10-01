import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, d as FieldError } from "./field-BVswHr8Y.js";
import { T as Textarea } from "./textarea-DkoqBXET.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "状态", description: "无效、只读与禁用。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-sm gap-5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { invalid: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "退款原因" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { defaultValue: "不想要了" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldError, { children: "请至少填写 10 个字，便于客服核实。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "审核意见" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { defaultValue: "资料齐全，同意开通企业账户。—— 王敏，9 月 28 日", readOnly: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "内部备注" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Textarea, { placeholder: "仅管理员可编辑" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
