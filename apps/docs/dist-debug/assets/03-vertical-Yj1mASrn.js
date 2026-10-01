import { c as createLucideIcon, j as jsxRuntimeExports, T as Tooltip, v as TooltipTrigger, w as TooltipPopup } from "./index-DM02Iz28.js";
import { T as ToggleGroup, a as ToggleGroupItem } from "./toggle-group-CNf3Y3ya.js";
import { T as Toolbar, b as ToolbarButton } from "./toolbar-DbH1xqZI.js";
import { M as MousePointer2 } from "./mouse-pointer-2-DTg3VpSv.js";
import "./separator-CcYO5Zxi.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const __iconNode$2 = [
  ["path", { d: "M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2", key: "1fvzgz" }],
  ["path", { d: "M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2", key: "1kc0my" }],
  ["path", { d: "M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8", key: "10h0bg" }],
  [
    "path",
    {
      d: "M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15",
      key: "1s1gnw"
    }
  ]
];
const Hand = createLucideIcon("hand", __iconNode$2);
const __iconNode$1 = [
  ["rect", { width: "18", height: "18", x: "3", y: "3", rx: "2", key: "afitv7" }]
];
const Square = createLucideIcon("square", __iconNode$1);
const __iconNode = [
  ["path", { d: "M12 4v16", key: "1654pz" }],
  ["path", { d: "M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2", key: "e0r10z" }],
  ["path", { d: "M9 20h6", key: "s66wpe" }]
];
const Type = createLucideIcon("type", __iconNode);
const meta = {
  title: "纵向",
  description: '画布工具条：orientation="vertical" 后方向键改为上下，提示从右侧出现。'
};
const tools = [
  { value: "select", label: "选择", icon: MousePointer2 },
  { value: "hand", label: "抓手", icon: Hand },
  { value: "rect", label: "矩形", icon: Square },
  { value: "text", label: "文本", icon: Type }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Toolbar, { "aria-label": "画布工具", orientation: "vertical", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroup, { "aria-label": "当前工具", className: "flex-col", defaultValue: ["select"], orientation: "vertical", children: tools.map((tool) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      TooltipTrigger,
      {
        render: /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { "aria-label": tool.label, render: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: tool.value }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(tool.icon, {}) })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipPopup, { side: "right", sideOffset: 8, children: tool.label })
  ] }, tool.value)) }) });
}
export {
  Demo as default,
  meta
};
