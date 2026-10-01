import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as ToggleGroup, a as ToggleGroupItem, b as ToggleGroupSeparator } from "./toggle-group-CNf3Y3ya.js";
import "./separator-CcYO5Zxi.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const meta = { title: "描边", description: "outline 把子项拼成一个整体，可用分隔线区分。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroup, { defaultValue: ["week"], variant: "outline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "day", children: "日" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "week", children: "周" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "month", children: "月" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "quarter", children: "季度" })
  ] });
}
export {
  Demo as default,
  meta
};
