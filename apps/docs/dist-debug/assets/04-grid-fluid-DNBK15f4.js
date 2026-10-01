import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { G as Grid, I as Inline, S as Stack, T as Text } from "./layout-I2EQ_Vmi.js";
const meta = {
  title: "按容器自适应",
  description: 'minItemWidth="12rem"：按容器宽度放下尽可能多的列，适合宽度不确定的区域。'
};
const members = [
  { name: "林晓", role: "设计负责人" },
  { name: "周舟", role: "前端工程师" },
  { name: "陈默", role: "后端工程师" },
  { name: "许诺", role: "产品经理" },
  { name: "王一然", role: "测试工程师" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Grid, { as: "ul", "aria-label": "团队成员", className: "w-full", gap: 3, minItemWidth: "12rem", children: members.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Inline, { as: "li", className: "rounded-xl border p-3", gap: 3, wrap: false, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: member.name.slice(-1) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { className: "min-w-0", gap: 0, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "truncate font-medium", children: member.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "truncate", size: "caption", tone: "muted", children: member.role })
    ] })
  ] }, member.name)) });
}
export {
  Demo as default,
  meta
};
