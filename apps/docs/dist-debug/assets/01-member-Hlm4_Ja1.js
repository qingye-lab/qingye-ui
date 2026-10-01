import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { P as PreviewCard, a as PreviewCardTrigger, b as PreviewCardPopup } from "./preview-card-k9RY87Th.js";
const meta = { title: "成员名片", description: "在正文中提到成员时，悬停查看对方的角色与近况。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-sm text-pretty text-muted-foreground text-sm", children: [
    "温控器批量离线的问题已转交给",
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PreviewCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PreviewCardTrigger,
        {
          className: "mx-1 font-medium text-foreground underline decoration-foreground/24 underline-offset-4 hover:decoration-foreground",
          href: "#zhou-yining",
          children: "@周以宁"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardPopup, { className: "w-64", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full gap-3", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "周" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "周以宁" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "运维工程师 · 华东仓储" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("dl", { className: "grid grid-cols-2 gap-3 border-t pt-3 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "本周工单" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "numeric font-medium text-sm", children: "23" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid gap-0.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("dt", { className: "text-muted-foreground", children: "平均响应" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("dd", { className: "numeric font-medium text-sm", children: "12 分钟" })
          ] })
        ] })
      ] }) })
    ] }),
    "处理，预计今天 18:00 前恢复。"
  ] });
}
export {
  Demo as default,
  meta
};
