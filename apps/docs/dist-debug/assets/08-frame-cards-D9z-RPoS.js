import { c as createLucideIcon, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { g as CardFrame, h as CardFrameHeader, i as CardFrameTitle, j as CardFrameDescription, k as CardFrameAction, C as Card, d as CardPanel, l as CardFrameFooter } from "./card-BUhACMgh.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
const __iconNode = [
  [
    "path",
    {
      d: "M2.586 17.414A2 2 0 0 0 2 18.828V21a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h1a1 1 0 0 0 1-1v-1a1 1 0 0 1 1-1h.172a2 2 0 0 0 1.414-.586l.814-.814a6.5 6.5 0 1 0-4-4z",
      key: "1s6t7t"
    }
  ],
  ["circle", { cx: "16.5", cy: "7.5", r: ".5", fill: "currentColor", key: "w0ekpg" }]
];
const KeyRound = createLucideIcon("key-round", __iconNode);
const meta = {
  title: "卡片框架：卡片",
  description: "标题与说明落在外框的浅底上，内部卡片去掉阴影并贴合外框圆角。"
};
const keys = [
  { name: "生产环境服务端", value: "yq_live_••••3f9a", usage: "3月2日创建 · 今天使用过" },
  { name: "数据同步脚本", value: "yq_live_••••a71c", usage: "8月19日创建 · 从未使用" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFrame, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFrameHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameTitle, { children: "API 密钥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameDescription, { children: "仅用于服务端调用，不要放进前端代码。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameAction, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { "aria-hidden": "true" }),
        "新建"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { className: "py-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "divide-y", children: keys.map((key) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(KeyRound, { "aria-hidden": "true", className: "size-4 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: key.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-mono text-muted-foreground text-xs", children: key.value }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-muted-foreground text-xs", children: key.usage })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "destructive-outline", children: "撤销" })
    ] }, key.value)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameFooter, { className: "text-muted-foreground text-sm", children: "密钥只在创建时完整显示一次。" })
  ] });
}
export {
  Demo as default,
  meta
};
