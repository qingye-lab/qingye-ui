import { j as jsxRuntimeExports, e0 as Sheet, e1 as SheetTrigger, B as Button, e3 as SheetPopup, e4 as SheetHeader, e5 as SheetTitle, ee as SheetDescription, e6 as SheetPanel } from "./index-DM02Iz28.js";
const meta = { title: "四个方向", description: "通过 side 指定滑入的边。" };
const sides = [
  { side: "right", label: "右侧" },
  { side: "left", label: "左侧" },
  { side: "top", label: "顶部" },
  { side: "bottom", label: "底部" }
];
const notices = [
  "09:42 仓库 3 号扫码枪电量低于 15%",
  "09:30 周以宁完成了工单 #2318",
  "08:55 华东仓储新增 4 台设备"
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-2", children: sides.map(({ side, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Sheet, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: label }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetPopup, { side, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(SheetTitle, { children: "最近动态" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(SheetDescription, { children: [
          "从",
          label,
          "滑入的面板。"
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(SheetPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "grid gap-2.5 text-sm", children: notices.map((notice) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { className: "numeric text-muted-foreground", children: notice }, notice)) }) })
    ] })
  ] }, side)) });
}
export {
  Demo as default,
  meta
};
