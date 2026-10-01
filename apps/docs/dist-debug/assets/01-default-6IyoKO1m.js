import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as ContextMenu, a as ContextMenuTrigger, b as ContextMenuPopup, c as ContextMenuItem, d as ContextMenuShortcut, e as ContextMenuSeparator } from "./context-menu-Dy9Sz7xG.js";
import { F as FileText } from "./file-text-BKTUvRr9.js";
import { P as Pencil } from "./pencil-DgXZTkvr.js";
import { C as Copy } from "./copy-CMgYpHr5.js";
import { D as Download } from "./download-8gLaOvAL.js";
import { T as Trash2 } from "./trash-2-CSLTv-pi.js";
const meta = { title: "基础用法", description: "在卡片上点击右键，触屏设备上长按。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuTrigger, { className: "flex w-full max-w-xs select-none items-center gap-3 rounded-xl border p-4 text-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { "aria-hidden": "true", className: "size-8 shrink-0 text-muted-foreground", strokeWidth: 1.5 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid min-w-0 gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium", children: "2026 年第三季度巡检报告.pdf" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: "右键点击或长按查看操作" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuPopup, { className: "w-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, {}),
        "重命名",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuShortcut, { children: "F2" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, {}),
        "创建副本",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuShortcut, { children: "⌘D" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, {}),
        "下载"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuItem, { variant: "destructive", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, {}),
        "移到回收站",
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuShortcut, { children: "⌘⌫" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
