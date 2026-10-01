import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { E as Empty, a as EmptyHeader, d as EmptyMedia, b as EmptyTitle, c as EmptyDescription, e as EmptyContent } from "./empty-UZzeYbXj.js";
import { R as Rocket } from "./rocket-3zdUT071.js";
import { B as BookOpen } from "./book-open-BuL6MSKB.js";
const meta = { title: "带操作", description: "EmptyContent 放下一步操作：一个主要按钮，最多再配一个次要按钮。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Empty, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMedia, { variant: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, { "aria-hidden": "true" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTitle, { children: "还没有部署" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyDescription, { children: "导入一个 Git 仓库，之后每次推送都会自动构建并部署。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", children: "导入仓库" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(BookOpen, { "aria-hidden": "true" }),
        "查看文档"
      ] })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
