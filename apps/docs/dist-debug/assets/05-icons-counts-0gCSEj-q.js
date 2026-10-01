import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as Tabs, a as TabsList, b as TabsTab } from "./tabs-DqRxi0L7.js";
import { I as Inbox } from "./inbox-CSMexUs9.js";
import { S as Send } from "./send-C5jMddXt.js";
import { A as Archive } from "./archive-VLGRAM9u.js";
import { T as Trash2 } from "./trash-2-CSLTv-pi.js";
import "./segmented-control-BQMJ2MA6.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./useForcedRerendering-B3yRwVad.js";
import "./PrehydrationScript-DonLZqUI.js";
const meta = {
  title: "图标、计数与禁用",
  description: "计数使用等宽数字；禁用的标签跳过键盘焦点。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { defaultValue: "inbox", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTab, { value: "inbox", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, {}),
        "收件箱",
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "numeric text-muted-foreground text-xs", children: "12" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTab, { value: "sent", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Send, {}),
        "已发送"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsTab, { disabled: true, value: "archive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, {}),
        "归档"
      ] })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Tabs, { defaultValue: "inbox", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TabsList, { variant: "underline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { "aria-label": "收件箱", value: "inbox", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Inbox, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { "aria-label": "已发送", value: "sent", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Send, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { "aria-label": "归档", value: "archive", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TabsTab, { "aria-label": "废纸篓", value: "trash", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, {}) })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
