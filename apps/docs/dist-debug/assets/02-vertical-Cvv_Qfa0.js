import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Separator } from "./separator-CcYO5Zxi.js";
const meta = { title: "纵向", description: "在 flex 行内自动拉伸到行高。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-6 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { "aria-label": "页脚", className: "flex items-center gap-3 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-foreground", href: "#", children: "文档" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-foreground", href: "#", children: "更新日志" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("a", { className: "hover:text-foreground", href: "#", children: "问题反馈" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-12 items-center gap-4 rounded-xl border px-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "今日访问" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "numeric font-medium", children: "3,206" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { orientation: "vertical" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-muted-foreground text-xs", children: "转化率" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "numeric font-medium", children: "4.8%" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
