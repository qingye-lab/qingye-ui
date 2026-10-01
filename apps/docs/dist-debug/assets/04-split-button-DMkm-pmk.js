import { j as jsxRuntimeExports, B as Button, f as Menu, g as MenuTrigger, h as MenuPopup, i as MenuItem } from "./index-DM02Iz28.js";
import { G as Group, a as GroupSeparator } from "./group-BcPpzhme.js";
import { C as ChevronDown } from "./chevron-down-DlWyuvnt.js";
import "./separator-CcYO5Zxi.js";
const meta = { title: "拆分按钮", description: "主操作加一个展开更多选项的菜单。" };
function Demo() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { "aria-label": "合并方式", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { children: "合并请求" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(GroupSeparator, { className: "bg-primary-foreground/24" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": "选择合并方式", size: "icon" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronDown, {}) }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(MenuPopup, { align: "end", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "创建合并提交" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "压缩后合并" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(MenuItem, { children: "变基后合并" })
      ] })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
