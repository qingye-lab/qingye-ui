import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { S as Stack, T as Text } from "./layout-I2EQ_Vmi.js";
const meta = { title: "Text", description: "三档字号与五种语义色；不设 tone 时继承父级颜色。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { className: "w-full max-w-sm", gap: 4, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: 1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", children: "正文 body · 部署完成后会发送邮件通知。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", size: "label", children: "标签 label · 部署区域" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { as: "p", size: "caption", children: [
        "说明 caption · 最近更新于 ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("time", { dateTime: "2026-10-01T14:32", children: "10 月 1 日 14:32" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: 1, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", tone: "muted", children: "muted · 次要信息与说明文字" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", tone: "success", children: "success · 证书已自动续期" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", tone: "warning", children: "warning · 本月构建时长已用 85%" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { as: "p", tone: "danger", children: "danger · 域名解析校验失败" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
