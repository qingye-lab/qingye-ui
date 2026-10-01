import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as PreviewCard, a as PreviewCardTrigger, b as PreviewCardPopup } from "./preview-card-k9RY87Th.js";
const meta = { title: "方向", description: "默认在下方，side 可改为上、左、右；空间不足时自动翻转。" };
const sides = [
  { side: "top", label: "上方" },
  { side: "right", label: "右侧" },
  { side: "bottom", label: "下方" },
  { side: "left", label: "左侧" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap justify-center gap-6 text-sm", children: sides.map(({ side, label }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(PreviewCard, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      PreviewCardTrigger,
      {
        className: "font-medium underline decoration-foreground/24 underline-offset-4 hover:decoration-foreground",
        href: `#preview-${side}`,
        children: label
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PreviewCardPopup, { className: "grid w-56 gap-1", side, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium", children: "工单 #2318" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-xs", children: "3 号仓库温控器离线 · 处理中" })
    ] })
  ] }, side)) });
}
export {
  Demo as default,
  meta
};
