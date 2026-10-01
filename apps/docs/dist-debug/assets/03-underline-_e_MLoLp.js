import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as Tabs, a as TabsList, b as TabsTab, c as TabsPanel } from "./tabs-DqRxi0L7.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
const meta = {
  title: "下划线",
  description: "页面级分区用 underline，配合一条贯穿的底边。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { className: "w-full max-w-md", defaultValue: "activity", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { variant: "underline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "activity", children: "动态" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "deployments", children: "部署" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "logs", children: "日志" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "analytics", children: "分析" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "py-3 text-muted-foreground text-sm", value: "activity", children: "周舟 10 分钟前合并了「修复移动端导航遮挡」。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "py-3 text-muted-foreground text-sm", value: "deployments", children: "生产环境最近一次部署于今天 14:32，耗时 48 秒。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "py-3 text-muted-foreground text-sm", value: "logs", children: "过去 24 小时没有错误日志。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "py-3 text-muted-foreground text-sm", value: "analytics", children: "本周访问 12,480 次，较上周增长 8%。" })
  ] });
}
export {
  Demo as default,
  meta
};
