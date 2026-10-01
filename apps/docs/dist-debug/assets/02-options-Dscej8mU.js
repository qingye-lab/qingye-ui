import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as ContextMenu, a as ContextMenuTrigger, b as ContextMenuPopup, f as ContextMenuGroup, g as ContextMenuGroupLabel, h as ContextMenuRadioGroup, i as ContextMenuRadioItem, e as ContextMenuSeparator, j as ContextMenuCheckboxItem } from "./context-menu-Dy9Sz7xG.js";
const meta = { title: "勾选与单选", description: "在看板空白处右键，调整视图选项；切换时菜单保持打开。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuTrigger, { className: "flex h-36 w-full max-w-sm select-none items-center justify-center rounded-xl border border-dashed text-muted-foreground text-sm", children: "在看板空白处右键" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuPopup, { className: "w-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuGroupLabel, { children: "分组方式" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuRadioGroup, { defaultValue: "status", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuRadioItem, { value: "status", children: "按状态" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuRadioItem, { value: "assignee", children: "按负责人" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuRadioItem, { value: "warehouse", children: "按仓库" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(ContextMenuGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuGroupLabel, { children: "显示" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuCheckboxItem, { defaultChecked: true, children: "负责人头像" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuCheckboxItem, { defaultChecked: true, children: "截止日期" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuCheckboxItem, { children: "已完成的工单" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ContextMenuCheckboxItem, { variant: "switch", children: "紧凑卡片" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
