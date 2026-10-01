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
const meta = {
  title: "表单取值",
  description: "基于 RadioGroup，值会随表单提交；grow 让两个选项等宽。"
};
const item = segmentedControlItemVariants({ className: "grow", state: "checked" });
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    RadioGroup,
    {
      "aria-label": "计费周期",
      className: segmentedControlRootClassName,
      defaultValue: "monthly",
      name: "billing",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(RadioRoot, { className: item, value: "monthly", children: "按月付费" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioRoot, { className: item, value: "yearly", children: [
          "按年付费",
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success-foreground text-xs", children: "省 20%" })
        ] })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
