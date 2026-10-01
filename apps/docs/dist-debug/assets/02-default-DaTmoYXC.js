import { j as jsxRuntimeExports, B as Button, t as toastManager } from "./index-DM02Iz28.js";
const meta = { title: "标题与说明", description: "不指定 type 时只显示文字；说明是可选的。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => toastManager.add({ title: "链接已复制" }), variant: "outline", children: "仅标题" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => toastManager.add({ title: "已安排巡检", description: "10 月 8 日（周三）09:00，负责人周以宁。" }),
        variant: "outline",
        children: "标题与说明"
      }
    )
  ] });
}
export {
  Demo as default,
  meta
};
