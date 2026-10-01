import { j as jsxRuntimeExports, T as Tooltip, v as TooltipTrigger, B as Button, w as TooltipPopup } from "./index-DM02Iz28.js";
import { P as Pencil } from "./pencil-DgXZTkvr.js";
import { C as Copy } from "./copy-CMgYpHr5.js";
import { D as Download } from "./download-8gLaOvAL.js";
import { T as Trash2 } from "./trash-2-CSLTv-pi.js";
const meta = {
  title: "图标按钮",
  description: "第一次悬停按默认延迟出现；在相邻按钮间移动时立即切换，不再等待。"
};
const actions = [
  { label: "编辑", icon: Pencil },
  { label: "复制", icon: Copy },
  { label: "下载", icon: Download },
  { label: "删除", icon: Trash2 }
];
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", children: actions.map(({ label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(Tooltip, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": label, size: "icon", variant: "ghost" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(TooltipPopup, { children: label })
  ] }, label)) });
}
export {
  Demo as default,
  meta
};
