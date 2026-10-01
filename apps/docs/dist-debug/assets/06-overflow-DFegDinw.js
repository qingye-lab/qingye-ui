import { j as jsxRuntimeExports, bq as ScrollArea } from "./index-DM02Iz28.js";
import { T as Tabs, a as TabsList, b as TabsTab } from "./tabs-DqRxi0L7.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
const meta = {
  title: "窄屏溢出",
  description: "标签多时放进 ScrollArea 横向滚动，边缘渐隐提示还有内容。"
};
const channels = ["全部", "设计", "前端", "后端", "测试", "运维", "产品", "市场", "客服"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { className: "w-full max-w-sm", defaultValue: "全部", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ScrollArea, { scrollFade: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-max min-w-full border-b", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { variant: "underline", children: channels.map((name) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: name, children: name }, name)) }) }) }) });
}
export {
  Demo as default,
  meta
};
