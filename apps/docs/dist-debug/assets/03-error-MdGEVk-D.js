import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Steps } from "./steps-CDSSOOyT.js";
const meta = { title: "出错状态", description: 'status="error" 覆盖推导出的状态，标出失败的步骤。' };
const items = [
  { id: "upload", title: "上传文件" },
  { id: "parse", title: "解析数据", status: "error", description: "第 128 行缺少手机号" },
  { id: "import", title: "导入客户" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Steps, { className: "max-w-xl", current: 1, items, label: "导入进度" });
}
export {
  Demo as default,
  meta
};
