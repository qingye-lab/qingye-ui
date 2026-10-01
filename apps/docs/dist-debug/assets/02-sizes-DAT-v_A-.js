import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as Tabs, a as TabsList, b as TabsTab } from "./tabs-DqRxi0L7.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
const meta = { title: "尺寸", description: "sm、default、lg 三档；移动端自动加高 4px。" };
const sizes = ["sm", "default", "lg"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col items-center gap-4", children: sizes.map((size) => /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { defaultValue: "day", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { size, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "day", children: "日" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "week", children: "周" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "month", children: "月" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: "year", children: "年" })
  ] }) }, size)) });
}
export {
  Demo as default,
  meta
};
