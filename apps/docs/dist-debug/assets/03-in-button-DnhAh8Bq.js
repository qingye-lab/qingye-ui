import { j as jsxRuntimeExports, B as Button, P as KbdGroup, K as Kbd } from "./index-DM02Iz28.js";
const meta = {
  title: "在按钮中",
  description: "Kbd 自动跟随按钮的文字颜色，在实心、描边与幽灵按钮上都清晰可读。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
      "保存",
      /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "S" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
      "取消",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Esc" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "ghost", children: [
      "新建工单",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "C" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
