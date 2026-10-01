import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { D as DataTable } from "./data-table-BtHbLvNm.js";
import "./checkbox-bpAJmCBs.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./search-input-DR84Mv-7.js";
import "./input-group-2ApKrTnA.js";
import "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./useLabelableId-aT49TJD-.js";
import "./textarea-DkoqBXET.js";
import "./select-D8_OW39t.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
import "./skeleton-Dv0NPbHI.js";
import "./table-CptMCabx.js";
import "./columns-3-DOsRGz8Y.js";
import "./arrow-up-BkVdZzdH.js";
import "./arrow-down-D6zHiGm4.js";
import "./chevron-left-CtqcxRzh.js";
const meta = { title: "排序、搜索与分页", description: "点击表头排序，搜索覆盖所有列；金额和日期列右对齐。" };
const customers = ["上海云杉科技", "杭州青禾文化", "成都远山物流", "深圳明川电子", "北京拾光影业", "苏州木与石家居", "厦门潮汐咖啡"];
const cities = ["上海", "杭州", "成都", "深圳", "北京", "苏州", "厦门"];
const statuses = ["已付款", "已付款", "待付款", "已付款", "已退款"];
const orders = Array.from({ length: 32 }, (_, index) => ({
  id: `SO-${20481 - index}`,
  customer: customers[index % customers.length],
  city: cities[index % cities.length],
  status: statuses[index % statuses.length],
  amount: 860 + index * 3779 % 31e3,
  date: `2026-09-${String(30 - index % 28).padStart(2, "0")}`
}));
const tone = { 已付款: "bg-success", 待付款: "bg-warning", 已退款: "bg-muted-foreground/64" };
const columns = [
  { accessorKey: "id", header: "订单号", cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium numeric", children: getValue() }) },
  { accessorKey: "customer", header: "客户" },
  { accessorKey: "city", header: "城市" },
  {
    accessorKey: "status",
    header: "状态",
    cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { variant: "outline", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "aria-hidden": "true", className: `size-1.5 rounded-full ${tone[row.original.status]}` }),
      row.original.status
    ] })
  },
  {
    accessorKey: "amount",
    header: "金额",
    meta: { align: "end" },
    cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "numeric", children: [
      "¥",
      getValue().toLocaleString("zh-CN")
    ] })
  },
  { accessorKey: "date", header: "下单日期", meta: { align: "end", cellClassName: "numeric text-muted-foreground" } }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { className: "w-full", columns, data: orders, defaultSorting: [{ id: "date", desc: true }], getRowId: (order) => order.id, label: "订单" });
}
export {
  Demo as default,
  meta
};
