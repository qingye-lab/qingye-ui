import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Carousel, d as CarouselPrevious, e as CarouselNext, a as CarouselContent, b as CarouselItem } from "./carousel-DgH4Ozs0.js";
import "./chevron-left-CtqcxRzh.js";
const meta = {
  title: "一次多张",
  description: "用 className 设置 --carousel-per-view 随断点变化：手机 1 张多一点，640px 起 2 张，1024px 起 3 张。"
};
const posts = [
  { tag: "设计", title: "为什么我们的边框都是半透明的", date: "9 月 28 日" },
  { tag: "工程", title: "用原生滚动吸附做一个轮播", date: "9 月 21 日" },
  { tag: "产品", title: "青烟云 2.0：更快的构建与回滚", date: "9 月 14 日" },
  { tag: "团队", title: "远程协作的第三年", date: "9 月 7 日" },
  { tag: "工程", title: "深色模式里的阴影应该怎么画", date: "8 月 31 日" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Carousel,
    {
      "aria-label": "最新文章",
      className: "w-full [--carousel-per-view:1.15] sm:[--carousel-per-view:2] lg:[--carousel-per-view:3]",
      gap: 3,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "最新文章" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, {}),
            /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, {})
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { children: posts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("a", { className: "flex h-full flex-col gap-3 rounded-xl border p-4 transition-colors hover:bg-accent/50", href: "#", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: post.tag }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-pretty font-medium text-sm leading-snug", children: post.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "mt-auto text-muted-foreground text-xs", children: post.date })
        ] }) }, post.title)) })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
