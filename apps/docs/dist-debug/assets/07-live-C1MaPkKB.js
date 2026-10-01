import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { P as Progress, a as ProgressLabel, b as ProgressValue, c as ProgressTrack, d as ProgressIndicator } from "./progress-BZAK39FK.js";
import "./ProgressValue-Dwq408mP.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = { title: "动态更新", description: "value 变化时指示条平滑过渡，完成后切换为成功色。" };
function Demo() {
  const [value, setValue] = reactExports.useState(0);
  const [running, setRunning] = reactExports.useState(false);
  reactExports.useEffect(() => {
    if (!running || value >= 100) return;
    const timer = setTimeout(() => setValue((current) => Math.min(100, current + 12)), 400);
    return () => clearTimeout(timer);
  }, [running, value]);
  const done = value >= 100;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col items-start gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Progress, { className: "w-full", value, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLabel, { children: done ? "部署完成" : running ? "正在部署到生产环境" : "等待部署" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressValue, { className: "text-muted-foreground" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, { className: "data-complete:bg-success" }) })
    ] }),
    done ? /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setValue(0), children: "重新部署" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", variant: "outline", onClick: () => setRunning(!running), children: running ? "暂停" : value > 0 ? "继续" : "开始部署" })
  ] });
}
export {
  Demo as default,
  meta
};
