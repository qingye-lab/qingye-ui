import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel } from "./card-BUhACMgh.js";
import { E as Empty, a as EmptyHeader, d as EmptyMedia, b as EmptyTitle, c as EmptyDescription } from "./empty-UZzeYbXj.js";
import { B as Bell } from "./bell-DFpxbhe9.js";
const meta = { title: "在卡片中", description: "嵌在卡片里时收紧留白，标题降到 text-base。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-md", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "border-b", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "待办" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "需要你审批或回复的事项" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Empty, { className: "px-0 py-8 md:py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMedia, { variant: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Bell, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTitle, { className: "text-base", children: "全部处理完了" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyDescription, { children: "新的审批和评论会出现在这里。" })
    ] }) }) })
  ] });
}
export {
  Demo as default,
  meta
};
