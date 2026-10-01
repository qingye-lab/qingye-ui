import { j as jsxRuntimeExports, B as Button, t as toastManager } from "./index-DM02Iz28.js";
const meta = { title: "加载中", description: 'type="loading" 显示旋转图标，任务结束后用 update 换成结果。' };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      onClick: () => {
        const id = toastManager.add({ type: "loading", title: "正在生成报表…", description: "共 1,286 条记录", timeout: 0 });
        setTimeout(() => {
          toastManager.update(id, { type: "success", title: "报表已生成", description: "已发送到 finance@yanqing.cn", timeout: 4e3 });
        }, 2e3);
      },
      variant: "outline",
      children: "生成报表"
    }
  );
}
export {
  Demo as default,
  meta
};
