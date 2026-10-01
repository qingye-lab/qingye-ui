import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as ToggleGroup, a as ToggleGroupItem } from "./toggle-group-CNf3Y3ya.js";
import { B as Bold, I as Italic, U as Underline } from "./underline-CFTCyIzH.js";
import "./separator-CcYO5Zxi.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const __iconNode = [
  ["path", { d: "M16 4H9a3 3 0 0 0-2.83 4", key: "43sutm" }],
  ["path", { d: "M14 12a4 4 0 0 1 0 8H6", key: "nlfj13" }],
  ["line", { x1: "4", x2: "20", y1: "12", y2: "12", key: "1e0a9i" }]
];
const Strikethrough = createLucideIcon("strikethrough", __iconNode);
const meta = { title: "多选", description: "multiple 允许叠加，例如同时加粗与斜体。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroup, { defaultValue: ["bold", "italic"], multiple: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "加粗", value: "bold", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "斜体", value: "italic", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "下划线", value: "underline", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Underline, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "删除线", value: "strike", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Strikethrough, {}) })
  ] });
}
export {
  Demo as default,
  meta
};
