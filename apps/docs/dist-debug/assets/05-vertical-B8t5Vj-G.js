import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as ToggleGroup, a as ToggleGroupItem, b as ToggleGroupSeparator } from "./toggle-group-CNf3Y3ya.js";
import "./separator-CcYO5Zxi.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const __iconNode$2 = [
  ["path", { d: "M2 12h20", key: "9i4pu4" }],
  ["path", { d: "M10 16v4a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4", key: "11f1s0" }],
  ["path", { d: "M10 8V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v4", key: "t14dx9" }],
  ["path", { d: "M20 16v1a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2v-1", key: "1w07xs" }],
  ["path", { d: "M14 8V7c0-1.1.9-2 2-2h2a2 2 0 0 1 2 2v1", key: "1apec2" }]
];
const AlignCenterHorizontal = createLucideIcon("align-center-horizontal", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "6", height: "16", x: "4", y: "2", rx: "2", key: "z5wdxg" }],
  ["rect", { width: "6", height: "9", x: "14", y: "9", rx: "2", key: "um7a8w" }],
  ["path", { d: "M22 22H2", key: "19qnx5" }]
];
const AlignEndHorizontal = createLucideIcon("align-end-horizontal", __iconNode$1);
const __iconNode = [
  ["rect", { width: "6", height: "16", x: "4", y: "6", rx: "2", key: "1n4dg1" }],
  ["rect", { width: "6", height: "9", x: "14", y: "6", rx: "2", key: "17khns" }],
  ["path", { d: "M22 2H2", key: "fhrpnj" }]
];
const AlignStartHorizontal = createLucideIcon("align-start-horizontal", __iconNode);
const meta = { title: "纵向", description: 'orientation="vertical" 时用 ↑ ↓ 移动焦点。' };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroup, { defaultValue: ["top"], orientation: "vertical", variant: "outline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "顶部对齐", value: "top", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignStartHorizontal, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, { orientation: "horizontal" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "垂直居中", value: "middle", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignCenterHorizontal, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, { orientation: "horizontal" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "底部对齐", value: "bottom", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlignEndHorizontal, {}) })
  ] });
}
export {
  Demo as default,
  meta
};
