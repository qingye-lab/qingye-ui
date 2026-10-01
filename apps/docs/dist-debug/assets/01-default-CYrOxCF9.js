import { c as createLucideIcon, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { G as Group, a as GroupSeparator } from "./group-BcPpzhme.js";
import { C as Clock } from "./clock-CKIGwLdk.js";
import { A as Archive } from "./archive-VLGRAM9u.js";
import "./separator-CcYO5Zxi.js";
const __iconNode = [
  ["path", { d: "M20 18v-2a4 4 0 0 0-4-4H4", key: "5vmcpk" }],
  ["path", { d: "m9 17-5-5 5-5", key: "nvlc11" }]
];
const Reply = createLucideIcon("reply", __iconNode);
const meta = { title: "默认", description: "outline 按钮相接，用 GroupSeparator 分隔。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "邮件操作", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Reply, {}),
      "回复"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, {}),
      "稍后提醒"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, {}),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Archive, {}),
      "归档"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
