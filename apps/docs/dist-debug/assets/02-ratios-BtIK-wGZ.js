import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as AspectRatio } from "./aspect-ratio-CXQy_XBU.js";
const meta = { title: "常用比例", description: "宽度相同时，比例决定高度。" };
const ratios = [
  { label: "1 : 1", value: 1, use: "头像、商品" },
  { label: "4 : 3", value: 4 / 3, use: "相册、缩略图" },
  { label: "16 : 9", value: 16 / 9, use: "视频、封面" },
  { label: "21 : 9", value: 21 / 9, use: "横幅" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-full max-w-2xl grid-cols-2 items-start gap-4 sm:grid-cols-4", children: ratios.map((ratio) => /* @__PURE__ */ jsxRuntimeExports.jsxs("figure", { className: "flex flex-col gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(AspectRatio, { className: "rounded-lg border border-dashed bg-muted/60", ratio: ratio.value, children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center font-medium text-muted-foreground text-sm numeric", children: ratio.label }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("figcaption", { className: "text-muted-foreground text-xs", children: ratio.use })
  ] }, ratio.label)) });
}
export {
  Demo as default,
  meta
};
