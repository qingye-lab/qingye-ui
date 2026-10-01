import { j as jsxRuntimeExports, a5 as CircleCheck, B as Button } from "./index-DM02Iz28.js";
import { P as Progress, a as ProgressLabel, b as ProgressValue, c as ProgressTrack, d as ProgressIndicator } from "./progress-BZAK39FK.js";
import { F as FileImage, a as FileArchive } from "./file-image-B9HNmRf2.js";
import { F as FileText } from "./file-text-BKTUvRr9.js";
import { R as RotateCw } from "./rotate-cw-DbtdIEQE.js";
import "./ProgressValue-Dwq408mP.js";
import "./formatNumber-_NNc_BMA.js";
import "./stringifyLocale-DOx30wH1.js";
import "./valueToPercent-B3zKfIMz.js";
import "./useRegisteredLabelId-CQd8UikR.js";
const meta = { title: "组合：上传列表", description: "每个文件一条进度；完成和失败的文件换成状态说明与操作。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "w-full max-w-md divide-y rounded-xl border", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { "aria-hidden": "true", className: "size-5 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Progress, { className: "min-w-0 flex-1 gap-1.5", value: 72, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLabel, { className: "truncate", children: "门店实拍-徐汇店.jpg" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressValue, { className: "text-muted-foreground text-xs" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { className: "h-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileArchive, { "aria-hidden": "true", className: "size-5 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Progress, { className: "min-w-0 flex-1 gap-1.5", max: 86, value: 15, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressLabel, { className: "truncate", children: "2026年9月订单导出.zip" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressValue, { className: "text-muted-foreground text-xs", children: (_, value) => `${value} / 86 MB` })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressTrack, { className: "h-1", children: /* @__PURE__ */ jsxRuntimeExports.jsx(ProgressIndicator, {}) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { "aria-hidden": "true", className: "size-5 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium text-sm", children: "供应商合同-云杉科技.pdf" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1 text-success-foreground text-xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { "aria-hidden": "true", className: "size-3.5" }),
          "已上传 · 2.4 MB"
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-center gap-3 p-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FileImage, { "aria-hidden": "true", className: "size-5 shrink-0 text-muted-foreground" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-w-0 flex-1 flex-col gap-0.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "truncate font-medium text-sm", children: "新品海报-秋季.png" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-destructive-foreground text-xs", children: "上传失败：文件超过 20 MB" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "icon-sm", variant: "ghost", "aria-label": "重试上传 新品海报-秋季.png", children: /* @__PURE__ */ jsxRuntimeExports.jsx(RotateCw, { "aria-hidden": "true" }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
