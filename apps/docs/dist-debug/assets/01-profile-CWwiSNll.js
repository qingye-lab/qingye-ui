import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { P as PreviewCard, a as PreviewCardTrigger, b as PreviewCardPopup } from "./preview-card-k9RY87Th.js";
import { M as MapPin } from "./map-pin-ZOHj_P5X.js";
const __iconNode = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode);
const meta = { title: "成员资料", description: "悬停或用 Tab 聚焦 @林悦 查看资料卡。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-md text-pretty text-muted-foreground text-sm leading-relaxed", children: [
    "结算页的新版交互由",
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PreviewCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PreviewCardTrigger,
        {
          className: "mx-1 rounded-sm font-medium text-foreground underline outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background decoration-foreground/24 underline-offset-4 transition-colors hover:decoration-foreground/64",
          href: "#",
          children: "@林悦"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardPopup, { className: "w-72", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-semibold text-foreground text-sm", children: "林悦" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { size: "sm", variant: "success", children: "在线" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "高级交互设计师 · 支付体验组" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-pretty text-sm", children: "负责结算与支付流程的体验设计，关注表单效率与错误恢复。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5 text-muted-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { "aria-hidden": "true", className: "size-3.5" }),
            "杭州 · 西溪园区"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 numeric", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { "aria-hidden": "true", className: "size-3.5" }),
            "2021 年 3 月加入"
          ] })
        ] })
      ] }) })
    ] }),
    "负责，评审意见请直接在原型中批注。"
  ] });
}
export {
  Demo as default,
  meta
};
