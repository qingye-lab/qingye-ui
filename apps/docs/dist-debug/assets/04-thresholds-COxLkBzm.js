import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { M as Meter, a as MeterLabel, b as MeterValue, c as MeterTrack, d as MeterIndicator } from "./meter-BMdIhHJC.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = {
  title: "阈值颜色",
  description: "根据数值计算指示条颜色：60% 以下正常，85% 以下偏高，其余告警；状态同时写成文字。"
};
const resources = [
  { label: "CPU", value: 42 },
  { label: "内存", value: 78 },
  { label: "磁盘", value: 93 }
];
function level(value) {
  if (value < 60) return { status: "正常", indicator: "bg-success", text: "text-muted-foreground" };
  if (value < 85) return { status: "偏高", indicator: "bg-warning", text: "text-warning-foreground" };
  return { status: "接近上限", indicator: "bg-destructive", text: "text-destructive-foreground" };
}
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full max-w-sm flex-col gap-5", children: resources.map((resource) => {
    const { status, indicator, text } = level(resource.value);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Meter, { value: resource.value, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MeterLabel, { children: resource.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2 text-sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: text, children: status }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(MeterValue, {})
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(MeterTrack, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(MeterIndicator, { className: indicator }) })
    ] }, resource.label);
  }) });
}
export {
  Demo as default,
  meta
};
