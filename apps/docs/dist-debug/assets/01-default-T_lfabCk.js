import { j as jsxRuntimeExports, K as Kbd, P as KbdGroup } from "./index-DM02Iz28.js";
const meta = { title: "单键与组合" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⇧" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌥" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌃" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Esc" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Enter" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "K" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⌘" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "⇧" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "P" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(KbdGroup, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Ctrl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Alt" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Kbd, { children: "Delete" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
