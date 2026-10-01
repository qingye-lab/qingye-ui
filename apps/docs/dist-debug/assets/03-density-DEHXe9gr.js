import { r as reactExports, j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import { T as Table, a as TableHeader, b as TableRow, c as TableHead, d as TableBody, e as TableCell } from "./table-CptMCabx.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = { title: "紧凑密度", description: "compact 将行高从 48px 收到 40px，适合信息密集的后台列表。" };
const members = [
  { name: "林晓雯", role: "产品经理", team: "增长组", joined: "2023-04-12" },
  { name: "周子航", role: "前端工程师", team: "平台组", joined: "2022-11-03" },
  { name: "陈一诺", role: "设计师", team: "体验组", joined: "2024-02-19" },
  { name: "王嘉树", role: "后端工程师", team: "平台组", joined: "2021-08-30" }
];
function Demo() {
  const [compact, setCompact] = reactExports.useState(true);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Label, { className: "self-end", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { checked: compact, onCheckedChange: setCompact }),
      "紧凑"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Table, { density: compact ? "compact" : "default", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableHeader, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "姓名" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "职位" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { children: "团队" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableHead, { className: "text-end", children: "入职日期" })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(TableBody, { children: members.map((member) => /* @__PURE__ */ jsxRuntimeExports.jsxs(TableRow, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "font-medium", children: member.name }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { children: member.role }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-muted-foreground", children: member.team }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(TableCell, { className: "text-end numeric", children: member.joined })
      ] }, member.name)) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
