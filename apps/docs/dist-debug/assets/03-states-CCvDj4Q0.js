import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as DataTable } from "./data-table-BtHbLvNm.js";
import { E as Empty, a as EmptyHeader, d as EmptyMedia, b as EmptyTitle, c as EmptyDescription, e as EmptyContent } from "./empty-UZzeYbXj.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import { S as Server } from "./server-CpaPaZZv.js";
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
const meta = { title: "加载与空状态", description: "loading 显示骨架行；没有数据时显示 empty，可放入 Empty 组件引导下一步。" };
const servers = [
  { name: "api-prod-01", region: "华东 2（上海）", cpu: 42 },
  { name: "api-prod-02", region: "华东 2（上海）", cpu: 37 },
  { name: "worker-01", region: "华北 2（北京）", cpu: 81 }
];
const columns = [
  { accessorKey: "name", header: "实例", cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: getValue() }) },
  { accessorKey: "region", header: "地域" },
  { accessorKey: "cpu", header: "CPU", meta: { align: "end" }, cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "numeric", children: [
    getValue(),
    "%"
  ] }) }
];
function Demo() {
  const [loading, setLoading] = reactExports.useState(true);
  const [empty, setEmpty] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap gap-x-6 gap-y-3", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: loading, onCheckedChange: setLoading }),
        "加载中"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: empty, onCheckedChange: setEmpty }),
        "无数据"
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      DataTable,
      {
        columns,
        data: empty ? [] : servers,
        defaultPageSize: 5,
        empty: /* @__PURE__ */ jsxRuntimeExports.jsxs(Empty, { className: "py-4 md:py-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(EmptyHeader, { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyMedia, { variant: "icon", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Server, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyTitle, { className: "text-base", children: "还没有实例" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyDescription, { children: "创建第一台云服务器后，它会出现在这里。" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyContent, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", children: "创建实例" }) })
        ] }),
        enableGlobalFilter: false,
        label: "云服务器",
        loading
      }
    )
  ] });
}
export {
  Demo as default,
  meta
};
