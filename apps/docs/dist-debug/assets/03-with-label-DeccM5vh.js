import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import { I as Input } from "./input-D9i-AULz.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "配合标签", description: "放在 Field 中，标签、说明与输入框自动关联。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldLabel, { children: [
      "联系电话 ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive-foreground", children: "*" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { autoComplete: "tel", inputMode: "tel", placeholder: "138 0000 0000", required: true, type: "tel" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "仅用于工单进度通知。" })
  ] });
}
export {
  Demo as default,
  meta
};
