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
const meta = { title: "禁用", description: "可以禁用单个选项，也可以禁用整组。" };
const item = segmentedControlItemVariants({ state: "checked" });
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioGroup, { "aria-label": "部署区域", className: segmentedControlRootClassName, defaultValue: "hz", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RadioRoot, { className: item, value: "hz", children: "华东" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RadioRoot, { className: item, value: "bj", children: "华北" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(RadioRoot, { className: item, disabled: true, value: "sg", children: "新加坡（即将开放）" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      RadioGroup,
      {
        "aria-label": "部署区域",
        className: segmentedControlRootClassName,
        defaultValue: "hz",
        disabled: true,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadioRoot, { className: item, value: "hz", children: "华东" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(RadioRoot, { className: item, value: "bj", children: "华北" })
        ]
      }
    )
  ] });
}
export {
  Demo as default,
  meta
};
