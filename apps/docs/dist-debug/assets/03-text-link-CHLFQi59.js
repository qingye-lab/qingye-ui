import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { T as TextLink } from "./typography-Co1wZ35x.js";
import "./arrow-up-right-CCvFLBck.js";
const meta = { title: "文字链接", description: "默认样式、弱化样式与外部链接。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex max-w-md flex-col gap-3 text-sm", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "修改结算周期前，请先阅读",
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextLink, { href: "#billing", children: "结算规则" }),
      "。"
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground", children: [
      "没有收到验证码？",
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextLink, { href: "#resend", variant: "muted", children: "重新发送" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
      "设备型号参数见",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx(TextLink, { external: true, href: "https://developer.sunmi.com/", children: "商米开发者中心" }),
      "。"
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
