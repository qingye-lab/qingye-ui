import { j as jsxRuntimeExports, a6 as CircleAlert } from "./index-DM02Iz28.js";
import { A as Alert, a as AlertTitle, b as AlertDescription } from "./alert-twlv_qhe.js";
const meta = {
  title: "仅标题与多段说明",
  description: "标题可以单独使用；说明里可以放列表等多段内容。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xl gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Alert, { variant: "info", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "你正在以只读身份查看“华东仓储”项目。" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "destructive", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "导入失败，共 3 处错误" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "list-disc ps-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "第 12 行：设备编号 YQ-SC-2039 已存在" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "第 27 行：所属仓库不能为空" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: "第 41 行：负责人手机号格式不正确" })
      ] }) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
