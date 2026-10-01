import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
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
const meta = {
  title: "服务端分页与排序",
  description: "manualPagination、manualSorting 与 rowCount 把分页排序交给接口；请求期间传 loading。"
};
const titles = ["支付回调超时", "导出报表缺少字段", "登录页验证码不显示", "订单列表加载缓慢", "发票抬头无法保存", "推送通知重复"];
const assignees = ["林晓雯", "周子航", "陈一诺", "王嘉树"];
function fetchTickets(pagination, sorting) {
  const all = Array.from({ length: 87 }, (_, index) => ({
    id: 1201 + index,
    title: titles[index % titles.length],
    assignee: assignees[index % assignees.length],
    priority: index * 7 % 4
  }));
  const sort = sorting[0];
  if (sort) all.sort((a, b) => (a[sort.id] > b[sort.id] ? 1 : -1) * (sort.desc ? -1 : 1));
  const start = pagination.pageIndex * pagination.pageSize;
  return new Promise(
    (resolve) => setTimeout(() => resolve({ rows: all.slice(start, start + pagination.pageSize), total: all.length }), 600)
  );
}
const priorities = ["P0 紧急", "P1 高", "P2 中", "P3 低"];
const columns = [
  { accessorKey: "id", header: "编号", cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-medium numeric", children: [
    "#",
    getValue()
  ] }) },
  { accessorKey: "title", header: "标题", enableSorting: false },
  { accessorKey: "assignee", header: "负责人" },
  { accessorKey: "priority", header: "优先级", meta: { align: "end" }, cell: ({ getValue }) => priorities[getValue()] }
];
function Demo() {
  const [pagination, setPagination] = reactExports.useState({ pageIndex: 0, pageSize: 10 });
  const [sorting, setSorting] = reactExports.useState([]);
  const [result, setResult] = reactExports.useState();
  const [loading, setLoading] = reactExports.useState(true);
  reactExports.useEffect(() => {
    let current = true;
    setLoading(true);
    fetchTickets(pagination, sorting).then((next) => {
      if (!current) return;
      setResult(next);
      setLoading(false);
    });
    return () => {
      current = false;
    };
  }, [pagination, sorting]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DataTable,
    {
      className: "w-full",
      columns,
      data: result?.rows ?? [],
      enableGlobalFilter: false,
      getRowId: (ticket) => String(ticket.id),
      label: "工单",
      loading,
      manualPagination: true,
      manualSorting: true,
      onPaginationChange: setPagination,
      onSortingChange: setSorting,
      pagination,
      rowCount: result?.total ?? 0,
      sorting
    }
  );
}
export {
  Demo as default,
  meta
};
