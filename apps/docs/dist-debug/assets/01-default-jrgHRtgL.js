import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as ToggleGroup, a as ToggleGroupItem } from "./toggle-group-CNf3Y3ya.js";
import { T as TextAlignStart, a as TextAlignCenter, b as TextAlignEnd } from "./text-align-start-BwugBTv_.js";
import "./separator-CcYO5Zxi.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const meta = { title: "单选", description: "默认一次只按下一项，适合对齐方式、视图模式。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroup, { defaultValue: ["left"], children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "左对齐", value: "left", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignStart, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "居中", value: "center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignCenter, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "右对齐", value: "right", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignEnd, {}) })
  ] });
}
export {
  Demo as default,
  meta
};
