import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as ContextMenu, a as ContextMenuTrigger, b as ContextMenuPopup, c as ContextMenuItem, e as ContextMenuSeparator, k as ContextMenuSub, l as ContextMenuSubTrigger, m as ContextMenuSubPopup } from "./context-menu-Dy9Sz7xG.js";
const meta = { title: "子菜单", description: "层级不超过两级；更深的选择改用对话框。" };
const rows = [
  { id: "#2318", title: "3 号仓库温控器离线" },
  { id: "#2317", title: "扫码枪固件升级失败" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid w-full max-w-sm divide-y rounded-xl border text-sm", children: rows.map((row) => /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuTrigger, { className: "flex select-none gap-3 px-4 py-3 data-popup-open:bg-accent", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "numeric text-muted-foreground", children: row.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate", children: row.title })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuPopup, { className: "w-44", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem, { children: "打开" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem, { children: "在新标签页打开" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuSub, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuSubTrigger, { children: "设置状态" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuSubPopup, { className: "w-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem, { children: "待处理" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem, { children: "处理中" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem, { children: "已解决" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuSub, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuSubTrigger, { children: "分配给" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuSubPopup, { className: "w-36", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem, { children: "周以宁" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem, { children: "许清和" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuItem, { children: "林嘉禾" })
        ] })
      ] })
    ] })
  ] }, row.id)) });
}
export {
  Demo as default,
  meta
};
