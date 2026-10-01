import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { F as Field, g as FieldTitle, b as FieldDescription } from "./field-BVswHr8Y.js";
import { T as ToggleGroup, a as ToggleGroupItem, b as ToggleGroupSeparator } from "./toggle-group-CNf3Y3ya.js";
import "./separator-CcYO5Zxi.js";
import "./LabelableContext-DO-1KYYg.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
import "./useFieldValidation-CDOPo50V.js";
import "./useRegisteredLabelId-CQd8UikR.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const meta = {
  title: "标题",
  description: "控件不是单个输入框时，用 FieldTitle 作标题并通过 aria-labelledby 关联。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Field, { className: "w-full max-w-xs", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldTitle, { id: "delivery-slot", children: "配送时段" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroup, { "aria-labelledby": "delivery-slot", defaultValue: ["morning"], variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "morning", children: "上午" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "afternoon", children: "下午" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "evening", children: "晚间" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(FieldDescription, { children: "晚间时段仅限杭州主城区。" })
  ] });
}
export {
  Demo as default,
  meta
};
