import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { S as Stack, I as Inline, T as Text } from "./layout-I2EQ_Vmi.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
const meta = { title: "Inline", description: "标题与操作两端对齐；标签一行放不下时自动换行。" };
const tags = ["React", "TypeScript", "设计系统", "无障碍", "深色模式", "国际化"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { className: "w-full max-w-md", gap: 3, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Inline, { justify: "between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", className: "font-medium", children: "技术标签" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, {}),
        "添加"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Inline, { as: "ul", "aria-label": "技术标签", children: tags.map((tag) => /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: tag }) }, tag)) })
  ] });
}
export {
  Demo as default,
  meta
};
