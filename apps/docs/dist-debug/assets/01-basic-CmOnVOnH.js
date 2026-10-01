import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { A as AspectRatio } from "./aspect-ratio-CXQy_XBU.js";
const meta = { title: "基础用法", description: "16:9 的封面，圆角与裁切写在 AspectRatio 上。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AspectRatio, { className: "overflow-hidden rounded-xl border bg-muted", ratio: 16 / 9, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { "aria-label": "湖畔晨雾的风景插画", preserveAspectRatio: "xMidYMid slice", role: "img", viewBox: "0 0 1600 900", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("defs", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ar-sky", x1: "0", x2: "0", y1: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#dfe8f1" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#f6efe6" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("linearGradient", { id: "ar-lake", x1: "0", x2: "0", y1: "0", y2: "1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "0", stopColor: "#c9d7e2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("stop", { offset: "1", stopColor: "#9fb3c4" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { fill: "url(#ar-sky)", height: "900", width: "1600" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("circle", { cx: "1130", cy: "300", fill: "#f3d9b8", r: "86" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 560 L260 380 L430 500 L640 300 L900 520 L1080 420 L1300 560 L1600 400 L1600 900 L0 900 Z", fill: "#b7c4cf" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M0 640 L220 520 L420 610 L700 470 L960 620 L1240 520 L1600 640 L1600 900 L0 900 Z", fill: "#8fa1b1" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("rect", { fill: "url(#ar-lake)", height: "230", width: "1600", y: "670" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M140 760 H520 M760 800 H1180 M300 840 H640", stroke: "#e8eef3", strokeLinecap: "round", strokeOpacity: ".6", strokeWidth: "6" })
  ] }) }) });
}
export {
  Demo as default,
  meta
};
