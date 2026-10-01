import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { P as PageHeader, a as PageHeaderContent, b as PageHeaderTitle, c as PageHeaderDescription, d as PageHeaderActions } from "./page-header-CGzLQng4.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
const meta = {
  title: "按容器换行",
  description: "放在窄容器（如侧栏布局的内容区）中时，操作按自身宽度换行，与视口无关。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full max-w-sm rounded-xl border border-dashed p-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeader, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderTitle, { children: "优惠券" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderDescription, { children: "进行中 12 个，本月已核销 3,286 张。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderActions, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { "aria-hidden": "true" }),
      "新建优惠券"
    ] }) })
  ] }) });
}
export {
  Demo as default,
  meta
};
