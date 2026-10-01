import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel } from "./field-BVswHr8Y.js";
import { T as TagInput } from "./tag-input-qOJAIGC3.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./FieldControl-CFc5_9rC.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "只读与禁用" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-2xl gap-5 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "项目标签（只读）" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TagInput, { defaultValue: ["已归档", "2025 Q4", "品牌升级"], readOnly: true })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "技能（禁用）" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TagInput, { defaultValue: ["Figma", "原型设计"], disabled: true })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
