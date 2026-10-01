import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
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
const meta = { title: "配合标签与字数", description: "放在 Field 中，并用 maxLength 提示剩余字数。" };
function Demo() {
  const max = 200;
  const [value, setValue] = reactExports.useState("");
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "问题描述" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Textarea,
      {
        maxLength: max,
        onChange: (event) => setValue(event.target.value),
        placeholder: "请描述故障现象、出现时间和影响范围",
        value
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldDescription, { "aria-live": "polite", className: "numeric self-end", children: [
      value.length,
      " / ",
      max
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
