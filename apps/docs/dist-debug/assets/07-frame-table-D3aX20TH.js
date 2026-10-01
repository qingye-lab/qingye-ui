import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { g as CardFrame, h as CardFrameHeader, i as CardFrameTitle, j as CardFrameDescription, k as CardFrameAction, l as CardFrameFooter } from "./card-BUhACMgh.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
import { D as Download } from "./download-8gLaOvAL.js";
const meta = {
  title: "卡片框架：表格",
  description: 'CardFrame 包住 <Table variant="card">，表头落在外框的浅底上，表体成为一张卡片。'
};
const invoices = [
  { id: "INV-2026-0918", date: "9月18日", status: "已支付", amount: "¥2,990.00" },
  { id: "INV-2026-0904", date: "9月4日", status: "已支付", amount: "¥1,280.00" },
  { id: "INV-2026-0827", date: "8月27日", status: "待支付", amount: "¥640.00" },
  { id: "INV-2026-0812", date: "8月12日", status: "已逾期", amount: "¥3,200.00" }
];
const dot = {
  已支付: "bg-success",
  待支付: "bg-warning",
  已逾期: "bg-destructive"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFrame, { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFrameHeader, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameTitle, { children: "发票" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameDescription, { children: "最近 30 天开具的发票" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameAction, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { "aria-hidden": "true" }),
        "导出"
      ] }) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { variant: "card", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "发票号" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "状态" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "金额" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: invoices.map((invoice) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "font-medium numeric", children: invoice.id }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-1 text-muted-foreground text-xs", children: invoice.date })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: `size-1.5 rounded-full ${dot[invoice.status]}` }),
          invoice.status
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: invoice.amount })
      ] }, invoice.id)) })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardFrameFooter, { className: "text-muted-foreground text-sm", children: "共 12 张发票，显示最近 4 张。" })
  ] });
}
export {
  Demo as default,
  meta
};
