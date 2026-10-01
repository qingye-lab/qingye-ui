import { j as jsxRuntimeExports, v as TooltipTrigger, T as Tooltip, w as TooltipPopup, eo as TooltipCreateHandle } from "./index-DM02Iz28.js";
import { T as ToggleGroup, a as ToggleGroupItem } from "./toggle-group-CNf3Y3ya.js";
import { T as TextAlignStart, a as TextAlignCenter, b as TextAlignEnd } from "./text-align-start-BwugBTv_.js";
import "./separator-CcYO5Zxi.js";
import "./toggle-1hwCCJTO.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const meta = {
  title: "工具栏共用提示",
  description: "通过 handle 让一组触发器共用一个提示，切换时提示跟随移动，而不是闪烁重建。"
};
const handle = TooltipCreateHandle();
const items = [
  { value: "left", label: "左对齐", icon: TextAlignStart },
  { value: "center", label: "居中对齐", icon: TextAlignCenter },
  { value: "right", label: "右对齐", icon: TextAlignEnd }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroup, { defaultValue: ["left"], children: items.map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      TooltipTrigger,
      {
        handle,
        payload: label,
        render: /* @__PURE__ */ jsxRuntimeExports.jsx(ToggleGroupItem, { "aria-label": label, value }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {})
      },
      value
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { handle, children: ({ payload }) => /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipPopup, { children: payload }) })
  ] });
}
export {
  Demo as default,
  meta
};
