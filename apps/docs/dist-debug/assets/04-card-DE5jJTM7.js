import { j as jsxRuntimeExports } from "./index-DM02Iz28.js";
import { C as Checkbox } from "./checkbox-bpAJmCBs.js";
import { L as Label } from "./label-DS1FPyP3.js";
import "./minus-CRNaljKP.js";
import "./CheckboxIndicator-CqP__vRN.js";
import "./LabelableContext-DO-1KYYg.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
const meta = { title: "卡片选项", description: "整张卡片是标签；选中时边框与底色一起变化。" };
const addons = [
  { id: "backup", title: "自动备份", detail: "每日 03:00 快照，保留 7 天", price: "¥30/月", checked: true },
  { id: "waf", title: "Web 应用防火墙", detail: "拦截 SQL 注入、XSS 与恶意爬虫", price: "¥199/月" },
  { id: "monitor", title: "高级监控", detail: "秒级指标与短信告警", price: "¥49/月" }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex w-full max-w-sm flex-col gap-2", children: addons.map((addon) => /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Label,
    {
      className: "flex items-start gap-3 rounded-lg border p-3 transition-colors hover:bg-accent/50 has-data-checked:border-primary/48 has-data-checked:bg-accent/50",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { defaultChecked: addon.checked, className: "mt-px" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex min-w-0 flex-1 flex-col gap-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: addon.title }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground text-xs", children: addon.detail })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-normal text-muted-foreground text-xs numeric", children: addon.price })
      ]
    },
    addon.id
  )) });
}
export {
  Demo as default,
  meta
};
