import { r as reactExports, j as jsxRuntimeExports, B as Button } from "./index-DM02Iz28.js";
import { D as Disclosure, a as DisclosureTrigger, b as DisclosurePanel } from "./disclosure-seuRJb5m.js";
import "./chevron-down-DlWyuvnt.js";
import "./CollapsiblePanel-B5cYZztf.js";
import "./useCollapsiblePanel-Dpoq1n6_.js";
const meta = {
  title: "受控与禁用",
  description: "open 与 onOpenChange 由外部控制；disabled 时标题置灰且不可展开。"
};
function Demo() {
  const [open, setOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex w-full max-w-sm flex-col gap-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setOpen(true), size: "sm", variant: "outline", children: "展开" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: () => setOpen(false), size: "sm", variant: "outline", children: "收起" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Disclosure, { onOpenChange: setOpen, open, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosureTrigger, { children: "退款规则" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosurePanel, { className: "text-muted-foreground text-sm", children: "购买后 7 天内未使用可全额退款，超过 7 天按剩余时长折算。" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Disclosure, { disabled: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosureTrigger, { children: "发票信息（付款后可填写）" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(DisclosurePanel, { children: "—" })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
