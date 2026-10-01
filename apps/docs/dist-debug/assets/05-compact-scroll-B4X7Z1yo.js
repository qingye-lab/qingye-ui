import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
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
  title: "紧凑与限高",
  description: 'density="compact" 收紧行高，maxHeight 让表体在吸顶表头下滚动；关闭分页一次显示全部记录。'
};
const messages = [
  { level: "信息", source: "gateway", message: "健康检查通过" },
  { level: "警告", source: "billing", message: "账单生成耗时 4.2s，超过阈值" },
  { level: "信息", source: "auth", message: "刷新访问令牌 128 个" },
  { level: "错误", source: "payments", message: "微信支付回调签名校验失败" },
  { level: "信息", source: "scheduler", message: "完成每日对账任务" }
];
const events = Array.from({ length: 24 }, (_, index) => ({
  time: `15:${String(59 - index * 2).padStart(2, "0")}:${String(index * 17 % 60).padStart(2, "0")}`,
  ...messages[index % messages.length]
}));
const tone = { 信息: "text-muted-foreground", 警告: "text-warning-foreground", 错误: "text-destructive-foreground" };
const columns = [
  { accessorKey: "time", header: "时间", cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground numeric", children: getValue() }) },
  { accessorKey: "level", header: "级别", cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `font-medium ${tone[row.original.level]}`, children: row.original.level }) },
  { accessorKey: "source", header: "来源", cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "text-xs", children: getValue() }) },
  { accessorKey: "message", header: "内容", enableSorting: false }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DataTable,
    {
      className: "w-full",
      columns,
      data: events,
      density: "compact",
      enablePagination: false,
      label: "系统日志",
      maxHeight: 320,
      searchPlaceholder: "搜索日志"
    }
  );
}
export {
  Demo as default,
  meta
};
