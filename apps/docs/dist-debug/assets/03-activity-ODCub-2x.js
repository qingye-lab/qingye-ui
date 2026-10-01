import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { T as Timeline, a as TimelineItem, b as TimelineMarker, c as TimelineContent, d as TimelineHeader, e as TimelineTitle, f as TimelineTime, g as TimelineDescription } from "./timeline-h_XCBdWA.js";
import { P as Paperclip } from "./paperclip-BAloTUU3.js";
const __iconNode = [
  [
    "path",
    {
      d: "M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z",
      key: "vktsd0"
    }
  ],
  ["circle", { cx: "7.5", cy: "7.5", r: ".5", fill: "currentColor", key: "kqv944" }]
];
const Tag = createLucideIcon("tag", __iconNode);
const meta = { title: "动态与评论", description: "用子组件组合：头像标记、语句式标题与评论内容。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Timeline, { className: "w-full max-w-lg", label: "工单动态", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineMarker, { variant: "plain", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" }) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineTitle, { className: "font-normal text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "林晓雯" }),
            " 发表了评论"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineTime, { dateTime: "2026-10-01T11:08", children: "11:08" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-2 rounded-lg border bg-card px-3 py-2.5 text-sm", children: "已和支付宝确认，回调地址在 9 月 28 日的配置变更中被覆盖，今晚 22:00 前恢复。" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineMarker, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineTitle, { className: "font-normal text-muted-foreground", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "周子航" }),
          " 将优先级改为 ",
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "error", children: "P0 紧急" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineTime, { dateTime: "2026-10-01T10:41", children: "10:41" })
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineMarker, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Paperclip, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineTitle, { className: "font-normal text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "陈一诺" }),
            " 上传了附件"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineTime, { dateTime: "2026-10-01T09:57", children: "09:57" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineDescription, { children: "callback-error-0930.log · 284 KB" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineMarker, { status: "primary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TimelineHeader, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineTitle, { children: "工单已创建" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineTime, { dateTime: "2026-10-01T09:30", children: "09:30" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TimelineDescription, { children: "来自客服系统 · 支付回调失败率异常" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
