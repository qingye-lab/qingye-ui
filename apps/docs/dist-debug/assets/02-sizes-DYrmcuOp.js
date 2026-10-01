import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { b as segmentedControlRootClassName, c as segmentedControlItemVariants } from "./segmented-control-BQMJ2MA6.js";
import { R as RadioGroup, a as RadioRoot } from "./RadioGroup-BEp5uKmZ.js";
import "./LabelableContext-DO-1KYYg.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
import "./serializeValue-BLvnTy3o.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useFieldValidation-CDOPo50V.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
const meta = { title: "尺寸", description: "sm、default、lg 三档。" };
const sizes = ["sm", "default", "lg"];
const ranges = [
  { value: "24h", label: "24 小时" },
  { value: "7d", label: "7 天" },
  { value: "30d", label: "30 天" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-4", children: sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    RadioGroup,
    {
      "aria-label": "统计范围",
      className: segmentedControlRootClassName,
      defaultValue: "7d",
      children: ranges.map((range) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        RadioRoot,
        {
          className: segmentedControlItemVariants({ size, state: "checked" }),
          value: range.value,
          children: range.label
        },
        range.value
      ))
    },
    size
  )) });
}
export {
  Demo as default,
  meta
};
