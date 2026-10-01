import { j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { C as Card, a as CardHeader, b as CardTitle, c as CardDescription, d as CardPanel, e as CardFooter } from "./card-BUhACMgh.js";
import { I as Input } from "./input-D9i-AULz.js";
import "./FieldControl-CFc5_9rC.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useLabelableId-aT49TJD-.js";
const meta = {
  title: "分隔区块",
  description: "头部加 border-b、底部加 border-t 后，CardPanel 自动恢复上下内边距；底部用 py-4 收成一条紧凑的操作栏。"
};
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { className: "w-full max-w-lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardHeader, { className: "border-b", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardTitle, { children: "项目名称" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(CardDescription, { children: "显示在控制台、通知邮件和访问链接中。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(CardPanel, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Input, { "aria-label": "项目名称", defaultValue: "会员中心" }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(CardFooter, { className: "justify-between gap-4 border-t py-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground text-sm", children: "最多 32 个字符。" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { size: "sm", children: "保存" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
