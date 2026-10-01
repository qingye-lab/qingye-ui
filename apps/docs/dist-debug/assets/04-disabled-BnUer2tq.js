import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { a as Toggle } from "./toggle-1hwCCJTO.js";
import { L as Lock } from "./lock-DdPEUqJ-.js";
const meta = { title: "禁用" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Toggle, { disabled: true, variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, {}),
      "只读模式"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Toggle, { defaultPressed: true, disabled: true, variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Lock, {}),
      "已锁定"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
