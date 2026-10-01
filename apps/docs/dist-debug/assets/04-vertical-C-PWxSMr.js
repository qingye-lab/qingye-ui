import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Slider } from "./slider-si_iHGt9.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
import "./valueToPercent-B3zKfIMz.js";
import "./PrehydrationScript-DonLZqUI.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "竖向与禁用", description: "竖向滑块需要父元素有确定高度；禁用时整体降低不透明度。" };
const bands = [
  { label: "60Hz", value: 62 },
  { label: "230Hz", value: 48 },
  { label: "910Hz", value: 55 },
  { label: "3.6kHz", value: 70 },
  { label: "14kHz", value: 40 }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-end gap-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex h-40 gap-5", children: bands.map((band) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { orientation: "vertical", defaultValue: band.value, getAriaLabel: () => `${band.label} 增益` }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-xs numeric", children: band.label })
    ] }, band.label)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-48", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { "aria-label": "扬声器音量", defaultValue: 30, disabled: true }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-muted-foreground text-xs", children: "设备离线，无法调节" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
