import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Steps } from "./steps-CDSSOOyT.js";
const meta = { title: "垂直步骤", description: "说明较长或在窄屏上时使用。" };
const items = [
  { id: "pull", title: "拉取代码", description: "main 分支 · 提交 7f3c2a1" },
  { id: "build", title: "构建镜像", description: "用时 1 分 42 秒，镜像 312 MB" },
  { id: "test", title: "运行测试", description: "正在执行 1,284 项用例" },
  { id: "release", title: "发布上线", description: "灰度 10% 流量后全量发布" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Steps, { className: "max-w-sm", current: 2, items, label: "部署进度", orientation: "vertical" });
}
export {
  Demo as default,
  meta
};
