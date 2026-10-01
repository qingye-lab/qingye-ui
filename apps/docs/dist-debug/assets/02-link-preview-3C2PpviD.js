import { c as createLucideIcon, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as PreviewCard, a as PreviewCardTrigger, b as PreviewCardPopup } from "./preview-card-k9RY87Th.js";
const __iconNode$1 = [
  ["circle", { cx: "12", cy: "12", r: "10", key: "1mglay" }],
  ["circle", { cx: "12", cy: "12", r: "1", key: "41hilf" }]
];
const CircleDot = createLucideIcon("circle-dot", __iconNode$1);
const __iconNode = [
  ["circle", { cx: "18", cy: "18", r: "3", key: "1xkwt0" }],
  ["circle", { cx: "6", cy: "6", r: "3", key: "1lh9wr" }],
  ["path", { d: "M13 6h3a2 2 0 0 1 2 2v7", key: "1yeb86" }],
  ["line", { x1: "6", x2: "6", y1: "9", y2: "21", key: "rroup" }]
];
const GitPullRequest = createLucideIcon("git-pull-request", __iconNode);
const meta = { title: "链接预览", description: "在工单、文档中引用其他条目时，悬停即可看到摘要，不必跳转。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-md text-pretty text-muted-foreground text-sm leading-relaxed", children: [
    "该问题已在",
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PreviewCard, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        PreviewCardTrigger,
        {
          className: "mx-1 inline-flex items-center gap-1 rounded-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background text-foreground underline decoration-foreground/24 underline-offset-4 hover:decoration-foreground/64",
          delay: 300,
          href: "#",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(GitPullRequest, { "aria-hidden": "true", className: "size-3.5 text-success-foreground" }),
            "#2481"
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PreviewCardPopup, { align: "start", className: "w-80", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-muted-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "numeric", children: "qingyun/console #2481" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", children: "·" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "2 天前" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-foreground text-sm", children: "修复结算页在 Safari 中金额输入框跳动的问题" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-xs", children: "为金额输入框固定字宽并改用等宽数字，避免输入时宽度变化导致布局抖动。" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleDot, { "aria-hidden": "true", className: "size-3.5 text-success-foreground" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-success-foreground", children: "已合并" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "· 4 个文件变更" })
        ] })
      ] }) })
    ] }),
    "中修复，下个版本发布。"
  ] });
}
export {
  Demo as default,
  meta
};
