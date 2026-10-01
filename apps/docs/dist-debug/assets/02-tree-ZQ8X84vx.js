import { j as jsxRuntimeExports, c7 as ChevronRight } from "./index-DM02Iz28.js";
import { C as Collapsible, b as CollapsibleTrigger, a as CollapsiblePanel } from "./collapsible-DcdXgGKL.js";
import { F as Folder } from "./folder-CBRvho5z.js";
import { F as File } from "./file-tUYWJKRx.js";
import "./CollapsiblePanel-B5cYZztf.js";
import "./useCollapsiblePanel-Dpoq1n6_.js";
const meta = { title: "自定义触发器", description: "触发器完全自定：这里做成文件夹节点。" };
const folders = [
  { name: "components", files: ["button.tsx", "tabs.tsx", "carousel.tsx"] },
  { name: "tokens", files: ["semantic.css", "components.css"] }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-xs text-sm", children: folders.map((folder, i) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Collapsible, { defaultOpen: i === 0, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CollapsibleTrigger, { className: "flex w-full items-center gap-1.5 rounded-md px-1.5 py-1 outline-none hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "size-4 text-muted-foreground transition-transform duration-200 in-data-panel-open:rotate-90 rtl:-scale-x-100" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Folder, { "aria-hidden": "true", className: "size-4 text-muted-foreground" }),
      folder.name
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CollapsiblePanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx("ul", { className: "ms-3.5 border-s ps-3", children: folder.files.map((file) => /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-1.5 px-1.5 py-1 text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(File, { "aria-hidden": "true", className: "size-4" }),
      file
    ] }, file)) }) })
  ] }, folder.name)) });
}
export {
  Demo as default,
  meta
};
