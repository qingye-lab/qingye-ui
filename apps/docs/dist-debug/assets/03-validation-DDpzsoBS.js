import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
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
const meta = {
  title: "校验与上限",
  description: "validate 返回文案即拒绝该标签，输入保留以便修改；max 限制数量。"
};
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "抄送成员" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TagInput,
      {
        defaultValue: ["lin.yue@qingyun.design"],
        max: 5,
        name: "cc",
        placeholder: "输入邮箱，以逗号分隔",
        validate: (tag) => emailPattern.test(tag) ? null : `“${tag}”不是有效的邮箱地址`
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "最多 5 人。试试输入一个不完整的地址。" })
  ] });
}
export {
  Demo as default,
  meta
};
