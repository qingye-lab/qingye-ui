import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { P as Popover, a as PopoverTrigger, b as PopoverPopup, d as PopoverDescription } from "./popover-BKcHrCxN.js";
const meta = { title: "方向", description: "side 指定弹出方向；空间不足时自动翻转到对侧。" };
const sides = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: sides.map(({ side, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Popover, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PopoverPopup, { className: "w-56", side, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PopoverDescription, { children: [
      "从",
      label,
      "弹出，与触发器保持 4px 间距。"
    ] }) })
  ] }, side)) });
}
export {
  Demo as default,
  meta
};
