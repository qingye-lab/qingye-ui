import { c as createLucideIcon, j as jsxRuntimeExports, em as TooltipProvider, T as Tooltip, v as TooltipTrigger, w as TooltipPopup } from "./index-DM02Iz28.js";
import { T as ToggleGroup, a as ToggleGroupItem } from "./toggle-group-CNf3Y3ya.js";
import "./separator-CcYO5Zxi.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const __iconNode$2 = [
  ["path", { d: "m16 18 6-6-6-6", key: "eg8j8" }],
  ["path", { d: "m8 6-6 6 6 6", key: "ppft3o" }]
];
const Code = createLucideIcon("code", __iconNode$2);
const __iconNode$1 = [
  ["path", { d: "M11 5h10", key: "1cz7ny" }],
  ["path", { d: "M11 12h10", key: "1438ji" }],
  ["path", { d: "M11 19h10", key: "11t30w" }],
  ["path", { d: "M4 4h1v5", key: "10yrso" }],
  ["path", { d: "M4 9h2", key: "r1h2o0" }],
  ["path", { d: "M6.5 20H3.4c0-1 2.6-1.925 2.6-3.5a1.5 1.5 0 0 0-2.6-1.02", key: "xtkcd5" }]
];
const ListOrdered = createLucideIcon("list-ordered", __iconNode$1);
const __iconNode = [
  [
    "path",
    {
      d: "M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "rib7q0"
    }
  ],
  [
    "path",
    {
      d: "M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z",
      key: "1ymkrd"
    }
  ]
];
const Quote = createLucideIcon("quote", __iconNode);
const meta = { title: "配合 Tooltip", description: "仅图标时，用 Tooltip 给鼠标用户补充说明。" };
const items = [
  { value: "quote", label: "引用", icon: Quote },
  { value: "list", label: "有序列表", icon: ListOrdered },
  { value: "code", label: "代码块", icon: Code }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipProvider, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroup, { multiple: true, children: items.map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": label, value }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipPopup, { children: label })
  ] }, value)) }) });
}
export {
  Demo as default,
  meta
};
