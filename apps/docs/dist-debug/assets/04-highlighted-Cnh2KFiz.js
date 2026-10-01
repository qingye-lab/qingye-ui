import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as CodeBlock } from "./code-block-BmCAJUBV.js";
import "./copy-button-B3gSj0u1.js";
import "./copy-CMgYpHr5.js";
const meta = {
  title: "传入已高亮的节点",
  description: "组件不绑定高亮库：把 Shiki 等工具生成的节点作为 children，每行加 data-line 即可使用行号。"
};
const code = `const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log(\`合计 ¥\${total.toFixed(2)}\`);`;
const keyword = "text-[oklch(0.55_0.2_300)] dark:text-[oklch(0.75_0.14_300)]";
const string = "text-[oklch(0.52_0.13_150)] dark:text-[oklch(0.78_0.13_150)]";
const fn = "text-[oklch(0.52_0.17_250)] dark:text-[oklch(0.76_0.12_250)]";
const muted = "text-muted-foreground";
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CodeBlock, { className: "w-full", code, filename: "cart.ts", lineNumbers: true, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "data-line": "", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: keyword, children: "const" }),
      " total ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted, children: "=" }),
      " items.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: fn, children: "reduce" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted, children: "(" }),
      "(sum, item) ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: keyword, children: "=>" }),
      " sum ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted, children: "+" }),
      " item.price",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted, children: "*" }),
      " item.qty, ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: string, children: "0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted, children: ");" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "data-line": "", children: [
      "console.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: fn, children: "log" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted, children: "(" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: string, children: "`合计 ¥${" }),
      "total.",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: fn, children: "toFixed" }),
      "(",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: string, children: "2" }),
      ")",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: string, children: "}`" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: muted, children: ");" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
