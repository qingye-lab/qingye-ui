import { j as jsxRuntimeExports, I as Info, a5 as CircleCheck, F as TriangleAlert, a6 as CircleAlert } from "./index-DM02Iz28.js";
import { A as Alert, a as AlertTitle, b as AlertDescription } from "./alert-twlv_qhe.js";
import { T as Terminal } from "./terminal-DPsb7hrp.js";
const meta = { title: "类型", description: "default、info、success、warning、error 五种语义。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid w-full max-w-xl gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Terminal, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "API 密钥已轮换" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "旧密钥将在 24 小时后失效，请及时更新服务端配置。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "info", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Info, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "今晚 23:00 例行维护" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "预计 30 分钟，期间设备数据会缓存在本地，恢复后自动上传。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "success", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "实名认证已通过" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "现在可以开具增值税专用发票。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "warning", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "设备配额即将用完" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "已绑定 47 / 50 台设备，升级套餐后可继续添加。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Alert, { variant: "error", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertTitle, { children: "3 台设备同步失败" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(AlertDescription, { children: "最近一次尝试：今天 09:42。请检查设备网络后重试。" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
