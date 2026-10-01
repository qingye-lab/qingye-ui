import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, d as CardPanel, e as CardFooter } from "./card-BUhACMgh.js";
import { S as Skeleton } from "./skeleton-Dv0NPbHI.js";
const meta = { title: "卡片", description: "沿用 Card 的结构，只把内容换成占位块。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "aria-busy": "true", className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "正在加载文章" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-10 shrink-0 rounded-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-28" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-20" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardPanel, { className: "flex flex-col gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-2/3" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 rounded-lg sm:h-7" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-16 rounded-lg sm:h-7" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
