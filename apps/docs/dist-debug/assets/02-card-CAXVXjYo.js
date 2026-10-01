import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { g as CardFrame, h as CardFrameHeader, i as CardFrameTitle, j as CardFrameDescription, k as CardFrameAction } from "./card-BUhACMgh.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
const meta = { title: "卡片样式", description: 'variant="card" 放进 CardFrame，表头落在外框的浅底上。' };
const devices = [
  { name: "前台收银机", model: "SUNMI T2s", location: "徐汇店", uptime: "18 天" },
  { name: "后厨打印机", model: "佳博 GP-L80", location: "徐汇店", uptime: "6 天" },
  { name: "自助点餐屏", model: "SUNMI K2", location: "静安店", uptime: "42 天" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFrame, { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFrameHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameTitle, { children: "门店设备" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameDescription, { children: "3 台在线" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameAction, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { "aria-hidden": "true" }),
        "添加设备"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { variant: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "设备" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "型号" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "门店" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "持续在线" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: devices.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: device.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: device.model }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: device.location }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: device.uptime })
      ] }, device.name)) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
