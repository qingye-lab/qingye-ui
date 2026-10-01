import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { A as Avatar, a as AvatarFallback } from "./avatar-95P5m5ew.js";
import { D as DataTable } from "./data-table-BtHbLvNm.js";
import { S as Select, a as SelectTrigger, b as SelectValue, c as SelectPopup, d as SelectItem } from "./select-D8_OW39t.js";
import { D as Download } from "./download-8gLaOvAL.js";
import { T as Trash2 } from "./trash-2-CSLTv-pi.js";
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
import "./skeleton-Dv0NPbHI.js";
import "./table-CptMCabx.js";
import "./columns-3-DOsRGz8Y.js";
import "./arrow-up-BkVdZzdH.js";
import "./arrow-down-D6zHiGm4.js";
import "./chevrons-up-down-BLzcfRd-.js";
import "./chevron-left-CtqcxRzh.js";
import "./chevron-down-DlWyuvnt.js";
import "./ListboxSeparator-DfAtCXVV.js";
import "./serializeValue-BLvnTy3o.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./areArraysEqual-Bigu0Aq6.js";
import "./resolveAriaLabelledBy-JxsTST5s.js";
const meta = {
  title: "选择、批量操作与列菜单",
  description: "勾选行后出现已选计数与批量操作；toolbar 放自定义筛选，列菜单切换可隐藏的列。"
};
const people = [
  { id: "u1", name: "林晓雯", email: "lin.xiaowen@yunshan.cn", team: "增长组", role: "管理员", lastActive: "2 分钟前" },
  { id: "u2", name: "周子航", email: "zhou.zihang@yunshan.cn", team: "平台组", role: "成员", lastActive: "1 小时前" },
  { id: "u3", name: "陈一诺", email: "chen.yinuo@yunshan.cn", team: "体验组", role: "成员", lastActive: "昨天" },
  { id: "u4", name: "王嘉树", email: "wang.jiashu@yunshan.cn", team: "平台组", role: "所有者", lastActive: "3 天前" },
  { id: "u5", name: "赵思远", email: "zhao.siyuan@yunshan.cn", team: "增长组", role: "成员", lastActive: "5 分钟前" },
  { id: "u6", name: "孙可欣", email: "sun.kexin@yunshan.cn", team: "体验组", role: "访客", lastActive: "上周" }
];
const columns = [
  {
    accessorKey: "name",
    header: "成员",
    cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Avatar, { size: "sm", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AvatarFallback, { children: row.original.name.slice(0, 1) }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-medium", children: row.original.name })
    ] })
  },
  { accessorKey: "email", header: "邮箱", cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: getValue() }) },
  { accessorKey: "team", header: "团队", filterFn: "equalsString" },
  { accessorKey: "role", header: "角色" },
  { accessorKey: "lastActive", header: "最近活跃", enableSorting: false, meta: { align: "end", cellClassName: "text-muted-foreground" } }
];
const teams = [
  { label: "全部团队", value: "" },
  { label: "增长组", value: "增长组" },
  { label: "平台组", value: "平台组" },
  { label: "体验组", value: "体验组" }
];
function Demo() {
  const [members, setMembers] = reactExports.useState(people);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DataTable,
    {
      bulkActions: ({ ids, clear }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "sm", variant: "outline", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { "aria-hidden": "true" }),
          "导出"
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Button,
          {
            onClick: () => {
              setMembers((current) => current.filter((member) => !ids.includes(member.id)));
              clear();
            },
            size: "sm",
            variant: "destructive-outline",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Trash2, { "aria-hidden": "true" }),
              "移除"
            ]
          }
        )
      ] }),
      className: "w-full",
      columns,
      data: members,
      defaultColumnVisibility: { email: false },
      enableColumnVisibility: true,
      enableRowSelection: (row) => row.original.role !== "所有者",
      getRowId: (member) => member.id,
      label: "团队成员",
      searchPlaceholder: "搜索成员",
      toolbar: (table) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
        Select,
        {
          items: teams,
          onValueChange: (value) => table.getColumn("team")?.setFilterValue(value || void 0),
          value: table.getColumn("team")?.getFilterValue() ?? "",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectTrigger, { "aria-label": "按团队筛选", className: "w-auto min-w-32", children: /* @__PURE__ */ jsxRuntimeExports.jsx(SelectValue, {}) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(SelectPopup, { children: teams.map((team) => /* @__PURE__ */ jsxRuntimeExports.jsx(SelectItem, { value: team.value, children: team.label }, team.value)) })
          ]
        }
      )
    }
  );
}
export {
  Demo as default,
  meta
};
