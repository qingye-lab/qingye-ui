import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, c as FieldContent, a as FieldLabel, b as FieldDescription } from "./field-BVswHr8Y.js";
import { R as RadioGroup, a as Radio } from "./radio-group-CdHI6cJj.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./RadioGroup-BEp5uKmZ.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
import "./serializeValue-BLvnTy3o.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./RadioIndicator-BxMi2w3T.js";
const meta = { title: "带说明", description: "每个选项一个 Field，说明作为描述读出。" };
const options = [
  { value: "rolling", label: "滚动发布", description: "逐台替换实例，服务不中断，耗时较长。" },
  { value: "blue-green", label: "蓝绿发布", description: "新旧两套环境并行，切换流量后可秒级回滚。" },
  { value: "recreate", label: "重建", description: "先停止全部旧实例再启动新版本，期间服务不可用。" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RadioGroup, { "aria-label": "发布策略", defaultValue: "rolling", className: "max-w-sm gap-4", children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { orientation: "horizontal", className: "items-start", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: option.value, className: "mt-px" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(FieldContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldLabel, { children: option.label }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: option.description })
    ] })
  ] }, option.value)) });
}
export {
  Demo as default,
  meta
};
