import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
const meta = { title: "行选择", description: '选中行设置 data-state="selected"；表头复选框在部分选中时显示为半选。' };
const invoices = [
  { id: "INV-0931", client: "北京拾光影业", due: "10-08", amount: 26400 },
  { id: "INV-0930", client: "苏州木与石家居", due: "10-12", amount: 8350 },
  { id: "INV-0929", client: "厦门潮汐咖啡", due: "10-15", amount: 3120 }
];
function Demo() {
  const [selected, setSelected] = reactExports.useState(["INV-0930"]);
  const all = selected.length === invoices.length;
  const toggle = (id, checked) => setSelected((current) => checked ? [...current, id] : current.filter((item) => item !== id));
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(
        Checkbox,
        {
          "aria-label": "选择全部发票",
          checked: all,
          indeterminate: selected.length > 0 && !all,
          onCheckedChange: (checked) => setSelected(checked ? invoices.map((item) => item.id) : [])
        }
      ) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "发票号" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "客户" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "到期" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "金额" })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: invoices.map((invoice) => {
      const checked = selected.includes(invoice.id);
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { "data-state": checked ? "selected" : void 0, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { "aria-label": `选择 ${invoice.id}`, checked, onCheckedChange: (next) => toggle(invoice.id, next) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium numeric", children: invoice.id }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: invoice.client }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end text-muted-foreground numeric", children: invoice.due }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(TableCell, { className: "text-end numeric", children: [
          "¥",
          invoice.amount.toLocaleString("zh-CN")
        ] })
      ] }, invoice.id);
    }) })
  ] });
}
export {
  Demo as default,
  meta
};
