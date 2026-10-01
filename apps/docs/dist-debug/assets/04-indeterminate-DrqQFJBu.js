import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as Progress, a as ProgressLabel, c as ProgressTrack, d as ProgressIndicator } from "./progress-BZAK39FK.js";
import "./ProgressValue-Dwq408mP.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = {
  title: "不确定进度",
  description: "value={null} 时一道光带循环扫过轨道，适合还算不出总量的阶段。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Progress, { className: "max-w-sm", value: null, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLabel, { children: "正在准备备份" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "计算文件数量…" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, {}) })
  ] });
}
export {
  Demo as default,
  meta
};
