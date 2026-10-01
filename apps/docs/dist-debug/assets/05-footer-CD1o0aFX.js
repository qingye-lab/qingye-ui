import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell, g as TableFooter } from "./table-CptMCabx.js";
const meta = { title: "合计行", description: "TableFooter 放汇总数据，底色与表体略有区分。" };
const items = [
  { name: "云服务器 4核8G", quantity: 3, price: 389 },
  { name: "对象存储 500GB", quantity: 1, price: 59 },
  { name: "CDN 流量包 1TB", quantity: 2, price: 126 }
];
const yuan = (value) => `¥${value.toLocaleString("zh-CN", { minimumFractionDigits: 2 })}`;
function Demo() {
  const total = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "项目" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "数量" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "单价" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "小计" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: items.map((item) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: item.name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: item.quantity }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: yuan(item.price) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: yuan(item.quantity * item.price) })
    ] }, item.name)) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableFooter, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { colSpan: 3, children: "本月合计" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: yuan(total) })
    ] }) })
  ] });
}
export {
  Demo as default,
  meta
};
