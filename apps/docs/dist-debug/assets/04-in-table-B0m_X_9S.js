import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as StatusDot } from "./status-dot-CJpp8V8E.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
const meta = { title: "表格中的状态列", description: "状态列让圆点和文字一起扫读。", flush: true };
const devices = [
  { name: "前台收银机", store: "徐汇店", status: "online", label: "在线", seen: "刚刚" },
  { name: "后厨打印机", store: "徐汇店", status: "warning", label: "缺纸", seen: "2 分钟前" },
  { name: "自助点餐屏", store: "静安店", status: "error", label: "连接异常", seen: "16 分钟前" },
  { name: "门口客流计", store: "静安店", status: "offline", label: "离线", seen: "3 天前" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "ps-4", children: "设备" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "门店" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "状态" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "pe-4 text-end", children: "最后上报" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: devices.map((device) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "ps-4 font-medium", children: device.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: device.store }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(StatusDot, { status: device.status, children: device.label }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "pe-4 text-end text-muted-foreground numeric", children: device.seen })
    ] }, device.name)) })
  ] });
}
export {
  Demo as default,
  meta
};
