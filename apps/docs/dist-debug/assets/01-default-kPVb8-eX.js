import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Carousel, a as CarouselContent, b as CarouselItem, c as CarouselDots, d as CarouselPrevious, e as CarouselNext } from "./carousel-DgH4Ozs0.js";
import "./chevron-left-CtqcxRzh.js";
const meta = { title: "默认", description: "一次一张；在触屏上直接左右滑动。" };
const products = [
  { name: "云台相机 Q3", price: "¥2,199", tone: "from-sky-100 to-indigo-200 dark:from-sky-950 dark:to-indigo-900" },
  { name: "降噪耳机 Air", price: "¥899", tone: "from-emerald-100 to-teal-200 dark:from-emerald-950 dark:to-teal-900" },
  { name: "机械键盘 K75", price: "¥649", tone: "from-amber-100 to-orange-200 dark:from-amber-950 dark:to-orange-900" },
  { name: "便携屏 15.6″", price: "¥1,299", tone: "from-rose-100 to-fuchsia-200 dark:from-rose-950 dark:to-fuchsia-900" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Carousel, { "aria-label": "新品推荐", className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselContent, { children: products.map((product) => /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselItem, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex aspect-[4/3] flex-col justify-end rounded-xl bg-gradient-to-br p-5 ${product.tone}`, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-lg", children: product.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "numeric text-foreground/70 text-sm", children: [
        product.price,
        " 起"
      ] })
    ] }) }, product.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselDots, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselPrevious, {}),
        /* @__PURE__ */ jsxRuntimeExports.jsx(CarouselNext, {})
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
