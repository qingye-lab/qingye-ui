import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { R as ResizablePanelGroup, a as ResizablePanel, b as ResizableHandle } from "./resizable-Bh5SYnUB.js";
import { F as Folder } from "./folder-CBRvho5z.js";
import { F as FileText } from "./file-text-BKTUvRr9.js";
const meta = { title: "基础用法", description: "拖动中间的分隔条，或聚焦后用方向键调整。" };
const files = ["季度复盘.md", "品牌规范.pdf", "首页改版.fig", "用户访谈纪要.docx"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-64 w-full max-w-2xl overflow-hidden rounded-xl border", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(ResizablePanelGroup, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { defaultSize: 34, maxSize: 60, minSize: 22, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-full flex-col gap-0.5 p-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "flex items-center gap-2 px-2 py-1.5 font-medium text-muted-foreground text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { "aria-hidden": "true", className: "size-3.5" }),
        "设计资料"
      ] }),
      files.map((file, index) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: `flex items-center gap-2 truncate rounded-md px-2 py-1.5 text-sm ${index === 0 ? "bg-accent font-medium" : "text-muted-foreground"}`,
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { "aria-hidden": "true", className: "size-4 shrink-0 opacity-72" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: file })
          ]
        },
        file
      ))
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizableHandle, { "aria-label": "调整文件列表宽度", withHandle: true }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ResizablePanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "flex h-full flex-col gap-2 overflow-auto p-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-sm", children: "季度复盘" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm text-pretty", children: "本季度新用户留存提升 6.4%，主要来自引导流程的简化。下季度重点关注付费转化与团队协作功能的渗透率。" })
    ] }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
