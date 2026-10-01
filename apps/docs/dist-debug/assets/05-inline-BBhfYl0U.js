import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { I as InlineCode } from "./code-block-BmCAJUBV.js";
import "./copy-button-B3gSj0u1.js";
import "./copy-CMgYpHr5.js";
const meta = { title: "行内代码", description: "字号随所在文字缩放，长内容可在行间断开。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "max-w-md text-pretty text-sm leading-relaxed", children: [
    "安装后在入口样式中加入 ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(InlineCode, { children: '@import "@yanqing/ui/styles.css"' }),
    "，再用",
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(InlineCode, { children: "ThemeProvider" }),
    " 包裹应用。需要密集表格时设置",
    " ",
    /* @__PURE__ */ jsxRuntimeExports.jsx(InlineCode, { children: 'density="compact"' }),
    "。"
  ] });
}
export {
  Demo as default,
  meta
};
