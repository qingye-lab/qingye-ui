import { j as jsxRuntimeExports, B as Button, t as toastManager } from "./index-DM02Iz28.js";
const meta = { title: "带操作按钮", description: "可撤销的操作给出“撤销”，并适当延长显示时间。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Button,
    {
      onClick: () => {
        const id = toastManager.add({
          type: "success",
          title: "已归档 3 张工单",
          timeout: 8e3,
          actionProps: {
            children: "撤销",
            onClick: () => {
              toastManager.close(id);
              toastManager.add({ type: "info", title: "已恢复 3 张工单" });
            }
          }
        });
      },
      variant: "outline",
      children: "归档工单"
    }
  );
}
export {
  Demo as default,
  meta
};
