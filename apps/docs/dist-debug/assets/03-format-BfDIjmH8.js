import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { P as Progress, a as ProgressLabel, b as ProgressValue, c as ProgressTrack, d as ProgressIndicator } from "./progress-BZAK39FK.js";
import "./ProgressValue-Dwq408mP.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = {
  title: "自定义数值",
  description: "ProgressValue 接收一个函数，可以显示已完成量与总量；读屏文本用 getAriaValueText 同步。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Progress,
    {
      className: "max-w-sm",
      getAriaValueText: (_, value) => `已上传 ${value} MB，共 512 MB`,
      max: 512,
      value: 302,
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLabel, { children: "上传安装包" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressValue, { className: "text-muted-foreground", children: (_, value) => `${value} / 512 MB` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, {}) })
      ]
    }
  );
}
export {
  Demo as default,
  meta
};
