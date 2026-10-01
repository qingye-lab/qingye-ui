import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
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
const meta = { title: "基础用法", description: "在 Field 中使用时，标签与描述自动关联。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: "所在城市" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(NativeSelect, { name: "city", placeholder: "选择城市", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "beijing", children: "北京" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "shanghai", children: "上海" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "guangzhou", children: "广州" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "shenzhen", children: "深圳" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "hangzhou", children: "杭州" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(NativeSelectOption, { value: "chengdu", children: "成都" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "用于计算配送时效，可随时修改。" })
  ] });
}
export {
  Demo as default,
  meta
};
