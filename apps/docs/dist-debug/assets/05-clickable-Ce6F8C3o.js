import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { S as Steps } from "./steps-CDSSOOyT.js";
const meta = {
  title: "可点击的向导",
  description: "onStepClick 让步骤成为按钮；之后的步骤设为 disabled，只能回到已完成的步骤。"
};
const steps = [
  { id: "plan", title: "选择套餐", body: "专业版 · 按年付费，每席位 ¥59/月。" },
  { id: "team", title: "邀请成员", body: "已邀请 林晓雯、周子航 等 6 位成员。" },
  { id: "pay", title: "确认支付", body: "合计 ¥4,248，支持对公转账与企业支付宝。" }
];
function Demo() {
  const [current, setCurrent] = reactExports.useState(1);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-xl flex-col gap-6", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Steps,
      {
        current,
        items: steps.map((step, index) => ({ ...step, disabled: index > current })),
        label: "开通向导",
        onStepClick: setCurrent
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "rounded-lg bg-muted px-4 py-3 text-sm", children: steps[current]?.body }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-end gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: current === 0, onClick: () => setCurrent(current - 1), variant: "outline", children: "上一步" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { disabled: current === steps.length - 1, onClick: () => setCurrent(current + 1), children: "下一步" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
