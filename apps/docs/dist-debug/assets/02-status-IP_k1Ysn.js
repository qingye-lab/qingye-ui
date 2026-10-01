import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as ProgressCircle } from "./progress-circle-CWEU7jeQ.js";
import "./ProgressValue-Dwq408mP.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
const meta = { title: "状态色", description: "进度弧取状态色，轨道保持半透明中性。" };
const items = [
  { status: "default", value: 42, label: "默认" },
  { status: "success", value: 100, label: "已完成" },
  { status: "info", value: 64, label: "同步中" },
  { status: "warning", value: 86, label: "容量偏高" },
  { status: "error", value: 97, label: "即将耗尽" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-start justify-center gap-6", children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-16 flex-col items-center gap-2", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressCircle, { "aria-label": item.label, showValue: true, size: "lg", status: item.status, value: item.value }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs", children: item.label })
  ] }, item.status)) });
}
export {
  Demo as default,
  meta
};
