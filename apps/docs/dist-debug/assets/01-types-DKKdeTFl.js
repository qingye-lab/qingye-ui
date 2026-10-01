import { j as jsxRuntimeExports, B as Button, t as toastManager } from "./index-DM02Iz28.js";
const meta = { title: "类型", description: "success、error、warning、info 对应不同的图标与颜色。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap justify-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => toastManager.add({ type: "success", title: "设备已绑定", description: "YQ-SC-20391 已加入华东仓储。" }),
        variant: "outline",
        children: "成功"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => toastManager.add({ type: "error", priority: "high", title: "同步失败", description: "网络连接中断，请检查后重试。" }),
        variant: "outline",
        children: "错误"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => toastManager.add({ type: "warning", title: "存储空间不足", description: "已使用 92%，建议清理过期报表。" }),
        variant: "outline",
        children: "警告"
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Button,
      {
        onClick: () => toastManager.add({ type: "info", title: "新版本可用", description: "v2.8.0 将于今晚 23:00 自动更新。" }),
        variant: "outline",
        children: "提示"
      }
    )
  ] });
}
export {
  Demo as default,
  meta
};
