import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { B as Badge } from "./badge-_p6hdBjF.js";
import { D as DescriptionList, a as DescriptionListItem, b as DescriptionTerm, c as DescriptionDetails } from "./description-list-DbCz6cCA.js";
import "./copy-button-B3gSj0u1.js";
import "./copy-CMgYpHr5.js";
const meta = { title: "网格布局", description: "按容器宽度自动分列；窄屏单列，宽屏三到四列。可与 divided 同用。" };
const fields = [
  { term: "门店名称", value: "徐汇漕溪北路店" },
  { term: "门店编号", value: "XH-001", mono: true },
  { term: "负责人", value: "林嘉怡" },
  { term: "联系电话", value: "138 1652 0937", numeric: true },
  { term: "营业时间", value: "10:00–22:00", numeric: true },
  { term: "开业日期", value: "2023-04-18", numeric: true }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col gap-10", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionList, { layout: "grid", children: [
      fields.map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: field.term }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { className: field.mono ? "font-mono" : field.numeric ? "numeric" : void 0, children: field.value })
      ] }, field.term)),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: "门店标签" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionDetails, { className: "flex flex-wrap gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "直营" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", children: "24 小时外卖" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "info", children: "新品试点" })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionList, { divided: true, layout: "grid", children: fields.slice(0, 4).map((field) => /* @__PURE__ */ jsxRuntimeExports.jsxs(DescriptionListItem, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionTerm, { children: field.term }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DescriptionDetails, { className: field.mono ? "font-mono" : field.numeric ? "numeric" : void 0, children: field.value })
    ] }, field.term)) })
  ] });
}
export {
  Demo as default,
  meta
};
