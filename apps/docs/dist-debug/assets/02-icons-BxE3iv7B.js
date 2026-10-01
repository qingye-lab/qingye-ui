import { c as createLucideIcon, j as jsxRuntimeExports, F as TriangleAlert } from "./index-DM02Iz28.js";
import { T as Timeline } from "./timeline-h_XCBdWA.js";
import { R as Rocket } from "./rocket-3zdUT071.js";
const __iconNode$2 = [
  ["circle", { cx: "12", cy: "12", r: "3", key: "1v7zrd" }],
  ["line", { x1: "3", x2: "9", y1: "12", y2: "12", key: "1dyftd" }],
  ["line", { x1: "15", x2: "21", y1: "12", y2: "12", key: "oup4p8" }]
];
const GitCommitHorizontal = createLucideIcon("git-commit-horizontal", __iconNode$2);
const __iconNode$1 = [
  [
    "path",
    {
      d: "M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",
      key: "oel41y"
    }
  ],
  ["path", { d: "M12 8v4", key: "1got3b" }],
  ["path", { d: "M12 16h.01", key: "1drbdi" }]
];
const ShieldAlert = createLucideIcon("shield-alert", __iconNode$1);
const __iconNode = [
  ["path", { d: "M3 7v6h6", key: "1v2h90" }],
  ["path", { d: "M21 17a9 9 0 0 0-9-9 9 9 0 0 0-6 2.3L3 13", key: "1r6uu6" }]
];
const Undo = createLucideIcon("undo", __iconNode);
const meta = { title: "图标与状态", description: "icon 作为标记，status 标出成功、警告、失败与提示。" };
const items = [
  { id: "1", title: "v2.8.1 发布到生产环境", description: "全量发布，耗时 6 分钟", time: "16:20", status: "success", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Rocket, {}) },
  { id: "2", title: "回滚 v2.8.0", description: "订单服务 P99 延迟升高至 1.8s", time: "15:58", status: "error", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Undo, {}) },
  { id: "3", title: "灰度 10% 流量", description: "错误率 0.4%，高于 0.1% 阈值", time: "15:41", status: "warning", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, {}) },
  { id: "4", title: "安全扫描完成", description: "发现 2 个低危依赖，已记录", time: "15:30", status: "info", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldAlert, {}) },
  { id: "5", title: "合并 #1842 优化结算页", time: "15:12", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(GitCommitHorizontal, {}) }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Timeline, { className: "w-full max-w-md", items, label: "部署记录" });
}
export {
  Demo as default,
  meta
};
