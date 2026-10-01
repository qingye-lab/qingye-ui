import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { P as PageHeader, a as PageHeaderContent, b as PageHeaderTitle, c as PageHeaderDescription, d as PageHeaderActions } from "./page-header-CGzLQng4.js";
import { D as Download } from "./download-8gLaOvAL.js";
import { P as Plus } from "./plus-BiUnSJ5I.js";
const meta = { title: "基础", description: "标题、描述与操作；窄屏时操作换到下方。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeader, { className: "w-full", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderContent, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderTitle, { children: "设备管理" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(PageHeaderDescription, { children: "查看各门店终端的在线状态、固件版本与告警，支持批量重启和升级。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(PageHeaderActions, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { variant: "outline", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { "aria-hidden": "true" }),
        "导出"
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Plus, { "aria-hidden": "true" }),
        "添加设备"
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
