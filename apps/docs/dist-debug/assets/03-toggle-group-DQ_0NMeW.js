import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { b as segmentedControlRootClassName, c as segmentedControlItemVariants } from "./segmented-control-BQMJ2MA6.js";
import { c as ToggleGroup } from "./toggle-group-CNf3Y3ya.js";
import { b as Toggle } from "./toggle-1hwCCJTO.js";
import { L as List } from "./list-B0qcXE2k.js";
import { C as Calendar } from "./calendar-DI6AfLRW.js";
import "./separator-CcYO5Zxi.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./ToolbarGroupContext-B0PX1mgM.js";
const __iconNode = [
  ["path", { d: "M5 3v14", key: "9nsxs2" }],
  ["path", { d: "M12 3v8", key: "1h2ygw" }],
  ["path", { d: "M19 3v18", key: "1sk56x" }]
];
const Kanban = createLucideIcon("kanban", __iconNode);
const meta = {
  title: "切换视图",
  description: "基于 ToggleGroup：方向键只移动焦点，按 Space 才切换，适合视图与筛选。"
};
const item = segmentedControlItemVariants({ state: "pressed" });
const iconItem = segmentedControlItemVariants({ className: "px-0 aspect-square", state: "pressed" });
function Demo() {
  const [view, setView] = reactExports.useState(["board"]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ToggleGroup,
      {
        "aria-label": "任务视图",
        className: segmentedControlRootClassName,
        onValueChange: (next) => next.length && setView(next),
        value: view,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Toggle, { className: item, value: "list", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(List, {}),
            "列表"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Toggle, { className: item, value: "board", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Kanban, {}),
            "看板"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Toggle, { className: item, value: "calendar", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, {}),
            "日历"
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      ToggleGroup,
      {
        "aria-label": "任务视图",
        className: segmentedControlRootClassName,
        onValueChange: (next) => next.length && setView(next),
        value: view,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { "aria-label": "列表", className: iconItem, value: "list", children: /* @__PURE__ */ jsxRuntimeExports.jsx(List, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { "aria-label": "看板", className: iconItem, value: "board", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Kanban, {}) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { "aria-label": "日历", className: iconItem, value: "calendar", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, {}) })
        ]
      }
    )
  ] });
}
export {
  Demo as default,
  meta
};
