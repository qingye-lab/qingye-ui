import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as Tabs, a as TabsList, b as TabsTab, c as TabsPanel } from "./tabs-DqRxi0L7.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
const meta = { title: "默认" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { className: "w-full max-w-md", defaultValue: "overview", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "overview", children: "概览" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "members", children: "成员" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "settings", children: "设置" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsPanel, { className: "rounded-lg border p-4 text-sm", value: "overview", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "青烟官网改版" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "本周完成 18 项任务，距离上线还有 6 天。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsPanel, { className: "rounded-lg border p-4 text-sm", value: "members", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "5 位成员" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "林晓、周舟、陈默、许诺、王一然。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsPanel, { className: "rounded-lg border p-4 text-sm", value: "settings", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "项目设置" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 text-muted-foreground", children: "可见范围：仅团队成员。" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
