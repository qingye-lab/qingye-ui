import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { D as Disclosure, a as DisclosureTrigger, b as DisclosurePanel } from "./disclosure-seuRJb5m.js";
import { L as Label } from "./label-DS1FPyP3.js";
import { S as Switch } from "./switch-aO11CiwY.js";
import "./chevron-down-DlWyuvnt.js";
import "./CollapsiblePanel-B5cYZztf.js";
import "./useCollapsiblePanel-Dpoq1n6_.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
const meta = {
  title: "收尾一个区域",
  description: "separated：分隔线下的整行，常放在设置卡片底部。"
};
const options = [
  { id: "preview", label: "为每个分支生成预览地址", on: true },
  { id: "comment", label: "在合并请求中评论部署结果", on: true },
  { id: "skip", label: "仅文档变更时跳过构建", on: false }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full max-w-md rounded-xl border bg-card px-4 pt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-medium text-sm", children: "自动部署" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1 mb-4 text-muted-foreground text-sm", children: "推送到 main 分支后自动部署到生产环境。" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Disclosure, { variant: "separated", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosureTrigger, { children: "更多选项" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosurePanel, { className: "flex flex-col gap-3", children: options.map((option) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-4", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: option.id, children: option.label }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Switch, { defaultChecked: option.on, id: option.id })
      ] }, option.id)) })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
