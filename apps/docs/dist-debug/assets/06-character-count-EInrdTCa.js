import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
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
const meta = { title: "字数提示", description: "用 maxLength 限制长度，并在说明里实时显示剩余字数。" };
function Demo() {
  const max = 20;
  const [value, setValue] = reactExports.useState("杭州滨江仓");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "仓库简称" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { maxLength: max, onChange: (event) => setValue(event.target.value), value }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldDescription, { "aria-live": "polite", className: "numeric", children: [
      "还可输入 ",
      max - value.length,
      " 个字"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
