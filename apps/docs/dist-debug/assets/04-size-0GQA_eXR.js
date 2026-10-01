import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel, e as CardFooter } from "./card-BUhACMgh.js";
const meta = { title: "紧凑尺寸", description: 'size="sm" 把内边距从 24px 收到 16px，区块间距从 16px 收到 12px。' };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-64", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "每周报告" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "每周一 09:00 发送" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { className: "text-sm", children: "上周访问 12,840 次" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "预览报告" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-64", size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "每周报告" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "每周一 09:00 发送" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { className: "text-sm", children: "上周访问 12,840 次" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "预览报告" }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
