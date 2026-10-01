import { j as jsxRuntimeExports, T as Tooltip, v as TooltipTrigger, B as Button, w as TooltipPopup } from "./index-DM02Iz28.js";
const meta = { title: "方向", description: "默认在上方；side 指定其他方向，空间不足时自动翻转。" };
const sides = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: sides.map(({ side, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TooltipPopup, { side, children: [
      "显示在",
      label
    ] })
  ] }, side)) });
}
export {
  Demo as default,
  meta
};
