import { j as jsxRuntimeExports, B as Button, c7 as ChevronRight } from "./index-DM02Iz28.js";
const meta = {
  title: "组合：卡片式按钮",
  description: "整块可点击的选项，悬停时箭头轻移提示去向。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-full max-w-md gap-2", children: [
    { name: "华东一区 · 杭州", detail: "12 台设备在线，1 台告警" },
    { name: "华南二区 · 深圳", detail: "8 台设备在线" }
  ].map((region) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { className: "h-auto! justify-between gap-4 px-4 py-3 text-start", variant: "outline", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col gap-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: region.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-normal font-normal text-muted-foreground", children: region.detail })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ChevronRight,
      {
        "aria-hidden": "true",
        className: "transition-transform duration-(--qy-duration-fast) in-[[data-slot=button]:hover]:translate-x-0.5"
      }
    )
  ] }, region.name)) });
}
export {
  Demo as default,
  meta
};
