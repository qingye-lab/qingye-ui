import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
const meta = {
  title: "样式",
  description: "一个区域只放一个主按钮；次要操作用 outline、secondary 或 ghost，危险操作用 destructive。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "保存" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "outline", children: "取消" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "secondary", children: "存为草稿" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", children: "稍后再说" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "link", children: "查看详情" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive", children: "删除设备" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "destructive-outline", children: "解除绑定" })
  ] });
}
export {
  Demo as default,
  meta
};
