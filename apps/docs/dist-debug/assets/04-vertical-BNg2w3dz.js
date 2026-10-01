import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as Tabs, a as TabsList, b as TabsTab, c as TabsPanel } from "./tabs-DqRxi0L7.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
const meta = { title: "纵向", description: "设置页常用；方向键改为上下。" };
const sections = [
  { value: "profile", label: "个人资料", text: "头像、昵称与个人简介。" },
  { value: "account", label: "账号与安全", text: "登录邮箱、密码与两步验证。" },
  { value: "notifications", label: "通知", text: "选择通过邮件或站内信接收哪些提醒。" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-lg gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "profile", orientation: "vertical", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { children: sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: s.value, children: s.label }, s.value)) }),
      sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "px-2 py-1.5 text-muted-foreground text-sm", value: s.value, children: s.text }, s.value))
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Tabs, { defaultValue: "account", orientation: "vertical", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-s", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TabsList, { variant: "underline", children: sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { value: s.value, children: s.label }, s.value)) }) }),
      sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsx(TabsPanel, { className: "px-2 py-1.5 text-muted-foreground text-sm", value: s.value, children: s.text }, s.value))
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
