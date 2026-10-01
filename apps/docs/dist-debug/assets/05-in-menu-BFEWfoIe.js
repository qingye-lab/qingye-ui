import { j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, i as MenuItem, P as KbdGroup, K as Kbd, k as MenuSeparator } from "./index-DM02Iz28.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
const meta = { title: "在菜单中", description: "菜单项末端标出对应快捷键。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline" }), children: [
      "编辑",
      /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, { "aria-hidden": "true" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "start", className: "min-w-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
        "撤销",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { className: "ms-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Z" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
        "重做",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { className: "ms-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⇧" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Z" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuSeparator, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuItem, { children: [
        "查找",
        /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { className: "ms-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "F" })
        ] })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
