import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Card, d as CardPanel } from "./card-BUhACMgh.js";
import { P as ProgressCircle } from "./progress-circle-CWEU7jeQ.js";
import "./ProgressValue-Dwq408mP.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
const meta = {
  title: "自定义中心内容",
  description: "中心放分数等自定义内容时，用 getAriaValueText 让读屏读到同样的信息。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { className: "w-full max-w-sm", size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(CardPanel, { className: "flex items-center gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      ProgressCircle,
      {
        "aria-label": "本周巡检任务",
        getAriaValueText: () => "已完成 18 项，共 24 项",
        max: 24,
        size: "xl",
        strokeWidth: 4.5,
        value: 18,
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex flex-col items-center gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-xl leading-none", children: "18" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground text-xs leading-none", children: "/ 24 项" })
        ] })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-col gap-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium text-sm", children: "本周巡检任务" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "还剩 6 项，主要集中在静安店的冷柜与消防设备。" })
    ] })
  ] }) });
}
export {
  Demo as default,
  meta
};
