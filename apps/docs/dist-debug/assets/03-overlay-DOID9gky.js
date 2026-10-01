import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Carousel, a as CarouselContent, b as CarouselItem, d as CarouselPrevious, e as CarouselNext, c as CarouselDots } from "./carousel-DgH4Ozs0.js";
import "./chevron-left-CtqcxRzh.js";
const meta = {
  title: "按钮浮于两侧",
  description: "图集常用：按钮叠在画面两侧，指示点居中。"
};
const photos = [
  { place: "杭州 · 西溪", tone: "from-teal-200 via-emerald-100 to-lime-100 dark:from-teal-900 dark:via-emerald-950 dark:to-lime-950" },
  { place: "大理 · 洱海", tone: "from-sky-300 via-sky-100 to-blue-100 dark:from-sky-900 dark:via-sky-950 dark:to-blue-950" },
  { place: "敦煌 · 鸣沙山", tone: "from-amber-200 via-orange-100 to-yellow-100 dark:from-amber-900 dark:via-orange-950 dark:to-yellow-950" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Carousel, { "aria-label": "旅行相册", className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { children: photos.map((photo) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: `flex aspect-video items-end rounded-xl bg-gradient-to-br p-4 ${photo.tone}`, children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "rounded-md bg-background/80 px-2 py-1 font-medium text-xs backdrop-blur-sm", children: photo.place }) }) }, photo.place)) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, { className: "absolute start-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm max-sm:hidden" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, { className: "absolute end-3 top-1/2 -translate-y-1/2 bg-background/80 backdrop-blur-sm max-sm:hidden" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselDots, { className: "justify-center" })
  ] });
}
export {
  Demo as default,
  meta
};
