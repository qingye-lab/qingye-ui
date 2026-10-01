import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { R as RadioGroup, a as Radio } from "./radio-group-CdHI6cJj.js";
import "./RadioGroup-BEp5uKmZ.js";
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
import "./RadioIndicator-BxMi2w3T.js";
const meta = { title: "基础用法" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { id: "billing", className: "font-medium text-sm", children: "计费方式" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioGroup, { "aria-labelledby": "billing", defaultValue: "monthly", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "hourly" }),
        "按量付费"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "monthly" }),
        "包年包月"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Radio, { value: "spot", disabled: true }),
        "抢占式实例（当前地域不可用）"
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
