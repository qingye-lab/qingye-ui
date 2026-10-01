import { j as jsxRuntimeExports, B as Button, t as toastManager } from "./index-DM02Iz28.js";
const meta = {
  title: "原地更新",
  description: "用同一个 id 重复添加时不会堆叠，而是更新原消息并轻微脉冲提示，适合自动保存。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      onClick: () => toastManager.add({
        id: "draft-saved",
        type: "success",
        title: "草稿已保存",
        description: `最近保存：${(/* @__PURE__ */ new Date()).toLocaleTimeString("zh-CN")}`
      }),
      variant: "outline",
      children: "保存草稿"
    }
  );
}
export {
  Demo as default,
  meta
};
