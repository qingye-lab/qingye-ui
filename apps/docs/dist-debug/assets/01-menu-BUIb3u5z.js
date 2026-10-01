import { u as useTheme, q as useUILocale, eh as Sun, M as Moon, ei as Monitor, j as jsxRuntimeExports, f as Menu, g as MenuTrigger, B as Button, h as MenuPopup, dy as MenuRadioGroup, dz as MenuRadioItem } from "./index-DM02Iz28.js";
const meta = {
  title: "主题菜单",
  description: "顶栏里最常见的形式：图标显示当前生效的主题，菜单里三选一。文案来自语言包。"
};
function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  const options = [
    { value: "light", label: messages.lightTheme, icon: Sun },
    { value: "dark", label: messages.darkTheme, icon: Moon },
    { value: "system", label: messages.systemTheme, icon: Monitor }
  ];
  const Current = resolvedTheme === "dark" ? Moon : Sun;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuTrigger, { render: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { "aria-label": messages.theme, size: "icon", variant: "outline" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Current, {}) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(MenuPopup, { className: "min-w-36", children: /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRadioGroup, { onValueChange: (value) => setTheme(value), value: theme, children: options.map(({ value, label, icon: Icon }) => /* @__PURE__ */ jsxRuntimeExports.jsx(MenuRadioItem, { value, children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-2", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Icon, { "aria-hidden": "true", className: "size-4 opacity-72" }),
      label
    ] }) }, value)) }) })
  ] });
}
export {
  Demo as default,
  meta
};
