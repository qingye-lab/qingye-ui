import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { I as Item, a as ItemMedia, b as ItemContent, c as ItemTitle, d as ItemDescription, h as ItemHeader, i as ItemFooter, e as ItemActions } from "./item-CPHg7cF5.js";
import { M as MapPin } from "./map-pin-ZOHj_P5X.js";
import "./separator-CcYO5Zxi.js";
const meta = {
  title: "缩略图、页眉与页脚",
  description: "image 媒体裁切缩略图；ItemHeader / ItemFooter 占满整行。"
};
const thumb = (hue) => `data:image/svg+xml,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="oklch(0.86 0.06 ${hue})"/><stop offset="1" stop-color="oklch(0.66 0.1 ${hue + 30})"/></linearGradient></defs><rect width="80" height="80" fill="url(#g)"/></svg>`
)}`;
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full items-start gap-4 sm:grid-cols-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Item, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemMedia, { variant: "image", children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { alt: "", src: thumb(40) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemTitle, { children: "生椰拿铁" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemDescription, { children: "本月销量 4,218 杯" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Item, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ItemHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("img", { alt: "", className: "aspect-[16/7] w-full rounded-lg object-cover", src: thumb(200) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemContent, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemTitle, { children: "静安南京西路店" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemDescription, { children: "计划 10 月 18 日开业，设备已到店 6 / 8 台。" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ItemFooter, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "inline-flex items-center gap-1 text-muted-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(MapPin, { "aria-hidden": "true", className: "size-3.5" }),
          "南京西路 1266 号"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ItemActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "xs", variant: "outline", children: "查看进度" }) })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
