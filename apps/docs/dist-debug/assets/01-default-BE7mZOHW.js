import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { a as Toggle } from "./toggle-1hwCCJTO.js";
import { B as Bold, I as Italic, U as Underline } from "./underline-CFTCyIzH.js";
const meta = { title: "默认", description: "按下后保持浅色填充，再次点击恢复。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { "aria-label": "加粗", defaultPressed: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bold, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { "aria-label": "斜体", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Italic, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Toggle, { "aria-label": "下划线", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Underline, {}) })
  ] });
}
export {
  Demo as default,
  meta
};
