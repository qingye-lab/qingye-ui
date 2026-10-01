import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as ToggleGroup, a as ToggleGroupItem, b as ToggleGroupSeparator } from "./toggle-group-CNf3Y3ya.js";
import { L as List } from "./list-B0qcXE2k.js";
import "./separator-CcYO5Zxi.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const __iconNode = [
  ["rect", { width: "7", height: "7", x: "3", y: "3", rx: "1", key: "1g98yp" }],
  ["rect", { width: "7", height: "7", x: "14", y: "3", rx: "1", key: "6d4xhi" }],
  ["rect", { width: "7", height: "7", x: "14", y: "14", rx: "1", key: "nxv5o0" }],
  ["rect", { width: "7", height: "7", x: "3", y: "14", rx: "1", key: "1bb6yr" }]
];
const LayoutGrid = createLucideIcon("layout-grid", __iconNode);
const meta = { title: "尺寸", description: "size 统一作用于组内所有项。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center justify-center gap-4", children: ["sm", "default", "lg"].map((size) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroup, { defaultValue: ["grid"], size, variant: "outline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "网格视图", value: "grid", children: /* @__PURE__ */ jsxRuntimeExports.jsx(LayoutGrid, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": "列表视图", value: "list", children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, {}) })
  ] }, size)) });
}
export {
  Demo as default,
  meta
};
