import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { a as Toggle } from "./toggle-1hwCCJTO.js";
import { T as ToggleGroup, a as ToggleGroupItem } from "./toggle-group-CNf3Y3ya.js";
import { T as Toolbar, a as ToolbarGroup, b as ToolbarButton, c as ToolbarSeparator } from "./toolbar-DbH1xqZI.js";
import { B as Bold, I as Italic, U as Underline } from "./underline-CFTCyIzH.js";
import { T as TextAlignStart, a as TextAlignCenter, b as TextAlignEnd } from "./text-align-start-BwugBTv_.js";
import "./separator-CcYO5Zxi.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const meta = {
  title: "格式栏",
  description: "Tab 进入后用方向键在按钮之间移动。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Toolbar, { "aria-label": "正文格式", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ToolbarGroup, { "aria-label": "字形", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { "aria-label": "加粗", render: /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { defaultPressed: true }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { "aria-label": "斜体", render: /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { "aria-label": "下划线", render: /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, {}), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Underline, {}) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ToggleGroup, { "aria-label": "对齐方式", defaultValue: ["left"], children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { "aria-label": "左对齐", render: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "left" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignStart, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { "aria-label": "居中", render: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "center" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignCenter, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ToolbarButton, { "aria-label": "右对齐", render: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { value: "right" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(TextAlignEnd, {}) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
