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
const meta = { title: "默认", description: "标签、控件、说明自上而下排列。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "显示名称" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { defaultValue: "林晓" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "同事在评论与提及中看到的名字。" })
  ] });
}
export {
  Demo as default,
  meta
};
