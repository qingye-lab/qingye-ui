import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { R as ResizablePanelGroup, a as ResizablePanel, b as ResizableHandle } from "./resizable-Bh5SYnUB.js";
const meta = {
  title: "多栏与嵌套",
  description: "三栏布局中嵌套纵向分组。拖到最小值后继续拖动，会依次压缩更远的面板。"
};
function Pane({ title, hint }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col justify-between gap-2 p-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: title }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate text-muted-foreground text-xs", children: hint })
  ] });
}
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-80 w-full max-w-3xl overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { defaultSize: 22, minSize: 14, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pane, { hint: "最小 14%", title: "资源管理器" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { "aria-label": "调整资源管理器宽度" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { defaultSize: 56, minSize: 30, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { direction: "vertical", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { defaultSize: 70, minSize: 25, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pane, { hint: "最小 30%", title: "编辑器" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { "aria-label": "调整终端高度" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { minSize: 15, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pane, { hint: "最小 15%", title: "终端" }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { "aria-label": "调整大纲宽度" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { minSize: 12, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Pane, { hint: "最小 12%", title: "大纲" }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
