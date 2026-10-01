import { j as jsxRuntimeExports, P as KbdGroup, K as Kbd } from "./index-DM02Iz28.js";
const meta = { title: "在说明文字中" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-sm text-pretty text-center text-muted-foreground text-sm", children: [
    "按",
    /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { className: "mx-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Enter" })
    ] }),
    "发送消息，按 ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Esc" }),
    " 放弃编辑。"
  ] });
}
export {
  Demo as default,
  meta
};
