import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as ToggleGroup, a as ToggleGroupItem, b as ToggleGroupSeparator } from "./toggle-group-CNf3Y3ya.js";
import "./separator-CcYO5Zxi.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const meta = { title: "禁用", description: "可禁用整组，或只禁用其中一项。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroup, { defaultValue: ["auto"], disabled: true, variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "auto", children: "自动" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "manual", children: "手动" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroup, { defaultValue: ["standard"], variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "standard", children: "标准" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "express", children: "加急" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { disabled: true, value: "same-day", children: "当日达" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
