import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
const meta = {
  title: "加载中",
  description: "loading 显示居中的旋转指示并禁用按钮，文字透明但保留宽度，按钮不会跳动。"
};
function Demo() {
  const [saving, setSaving] = reactExports.useState(false);
  const save = () => {
    setSaving(true);
    setTimeout(() => setSaving(false), 1500);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: saving, onClick: save, children: "保存更改" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: true, variant: "outline", children: "同步中" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { loading: true, variant: "destructive", children: "删除中" })
  ] });
}
export {
  Demo as default,
  meta
};
