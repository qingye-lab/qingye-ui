import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Skeleton } from "./skeleton-Dv0NPbHI.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
const meta = { title: "表格行", description: "表头照常显示，只有表体用占位；数字列的占位同样靠右。" };
const widths = ["w-24", "w-32", "w-20", "w-28"];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { "aria-busy": "true", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "设备" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "门店" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "今日订单" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: widths.map((width) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: `h-4 ${width}` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-4 w-16" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "ms-auto h-4 w-10" }) })
    ] }, width)) })
  ] });
}
export {
  Demo as default,
  meta
};
