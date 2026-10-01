import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { P as ProgressCircle } from "./progress-circle-CWEU7jeQ.js";
import "./ProgressValue-Dwq408mP.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
const meta = { title: "不确定进度与动态更新", description: "value 为 null 时旋转；数值变化时进度弧平滑过渡。" };
function Demo() {
  const [value, setValue] = reactExports.useState(24);
  const [running, setRunning] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      setValue((current) => {
        const next = Math.min(100, current + 9);
        if (next === 100) setRunning(false);
        return next;
      });
    }, 500);
    return () => window.clearInterval(timer);
  }, [running]);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center justify-center gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressCircle, { "aria-label": "正在准备导出", size: "sm", value: null }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "正在准备导出…" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressCircle, { "aria-label": "固件升级进度", showValue: true, size: "lg", status: value === 100 ? "success" : "default", value }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: running || value === 100, onClick: () => setRunning(true), size: "sm", variant: "outline", children: "开始升级" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => {
          setRunning(false);
          setValue(0);
        }, size: "sm", variant: "ghost", children: "重置" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
