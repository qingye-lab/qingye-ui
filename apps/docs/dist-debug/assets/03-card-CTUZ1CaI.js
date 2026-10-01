import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Accordion, a as AccordionItem, b as AccordionTrigger, c as AccordionPanel } from "./accordion-5lJTL7g5.js";
import { B as Bell } from "./bell-DFpxbhe9.js";
import { L as Lock } from "./lock-DdPEUqJ-.js";
import "./chevron-down-DlWyuvnt.js";
import "./useCollapsiblePanel-Dpoq1n6_.js";
const __iconNode = [
  [
    "path",
    {
      d: "M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",
      key: "e79jfc"
    }
  ],
  ["circle", { cx: "13.5", cy: "6.5", r: ".5", fill: "currentColor", key: "1okk4w" }],
  ["circle", { cx: "17.5", cy: "10.5", r: ".5", fill: "currentColor", key: "f64h9f" }],
  ["circle", { cx: "6.5", cy: "12.5", r: ".5", fill: "currentColor", key: "qy21gx" }],
  ["circle", { cx: "8.5", cy: "7.5", r: ".5", fill: "currentColor", key: "fotxhn" }]
];
const Palette = createLucideIcon("palette", __iconNode);
const meta = { title: "放在卡片中", description: "加上边框与内边距，作为设置页的分组。" };
const sections = [
  { value: "appearance", icon: Palette, title: "外观", text: "主题、字号与界面密度。" },
  { value: "notify", icon: Bell, title: "通知", text: "提及、指派与评论提醒的接收方式。" },
  { value: "security", icon: Lock, title: "安全", text: "两步验证、登录设备与访问令牌。" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Accordion, { className: "w-full max-w-md rounded-xl border bg-card px-4", children: sections.map((s) => /* @__PURE__ */ jsxRuntimeExports.jsxs(AccordionItem, { value: s.value, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionTrigger, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(s.icon, { "aria-hidden": "true", className: "size-4 text-muted-foreground" }),
      s.title
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AccordionPanel, { className: "ps-6.5", children: s.text })
  ] }, s.value)) });
}
export {
  Demo as default,
  meta
};
