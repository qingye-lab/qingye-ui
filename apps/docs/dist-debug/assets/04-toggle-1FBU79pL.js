import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { C as Card, a as CardHeader, d as CardPanel, e as CardFooter } from "./card-BUhACMgh.js";
import { S as Skeleton } from "./skeleton-Dv0NPbHI.js";
import { R as RotateCw } from "./rotate-cw-DbtdIEQE.js";
const meta = {
  title: "加载切换",
  description: "骨架与真实内容尺寸一致，加载完成时卡片高度不变。"
};
function Demo() {
  const [loading, setLoading] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { "aria-busy": loading, className: "w-full", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardHeader, { className: "flex items-center gap-3", children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "size-10 shrink-0 rounded-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-20" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-28" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "正在加载" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: "林" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "林晓雯" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "产品经理 · 增长组" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-3/4" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "line-clamp-2 text-sm", children: "负责会员中心的增长实验，最近在推进新人礼包与积分商城的改版。" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFooter, { children: loading ? /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-20 rounded-lg sm:h-7" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", children: "发消息" }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", disabled: loading, onClick: () => setLoading(true), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { "aria-hidden": "true" }),
      "重新加载"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
