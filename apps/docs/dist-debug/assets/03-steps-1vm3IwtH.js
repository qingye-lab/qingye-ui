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
const meta = { title: "刻度", description: "step 限定可选值，下方刻度标出每一档。" };
const levels = ["关闭", "低", "中", "高", "最大"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Slider, { "aria-label": "新风档位", defaultValue: 2, max: levels.length - 1, getAriaValueText: (_, value) => levels[value] ?? "" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "aria-hidden": "true", className: "mt-3 flex justify-between px-2.5 text-muted-foreground text-xs sm:px-2", children: levels.map((level) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex w-0 flex-col items-center gap-1.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1 w-px bg-muted-foreground/48" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "whitespace-nowrap", children: level })
    ] }, level)) })
  ] });
}
export {
  Demo as default,
  meta
};
