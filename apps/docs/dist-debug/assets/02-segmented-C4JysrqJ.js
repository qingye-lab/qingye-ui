import { u as useTheme, q as useUILocale, j as jsxRuntimeExports, eh as Sun, M as Moon, ei as Monitor } from "./index-DM02Iz28.js";
import { b as segmentedControlRootClassName, c as segmentedControlItemVariants } from "./segmented-control-BQMJ2MA6.js";
import { R as RadioGroup, a as RadioRoot } from "./RadioGroup-BEp5uKmZ.js";
import "./LabelableContext-DO-1KYYg.js";
import "./CompositeRoot-xQsp56hN.js";
import "./isElementDisabled-2KG8-O4B.js";
import "./FieldItemContext-DnsCt0VY.js";
import "./useAriaLabelledBy-CcCbgu8M.js";
import "./useLabelableId-aT49TJD-.js";
import "./serializeValue-BLvnTy3o.js";
import "./useRegisterFieldControl-KuH2MueO.js";
import "./useFieldValidation-CDOPo50V.js";
import "./FieldsetRootContext-Dg8z8pLL.js";
const meta = {
  title: "设置页中的分段选择",
  description: "设置页里直接平铺三个选项；下方显示用户的选择与实际生效的主题。"
};
const item = segmentedControlItemVariants({ state: "checked" });
function Demo() {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const { messages } = useUILocale();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      RadioGroup,
      {
        "aria-label": messages.theme,
        className: segmentedControlRootClassName,
        onValueChange: (value) => setTheme(value),
        value: theme,
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioRoot, { className: item, value: "light", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Sun, {}),
            messages.lightTheme
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioRoot, { className: item, value: "dark", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Moon, {}),
            messages.darkTheme
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(RadioRoot, { className: item, value: "system", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Monitor, {}),
            messages.systemTheme
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-muted-foreground text-xs", children: [
      "theme = ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-foreground", children: theme }),
      "，resolvedTheme =",
      " ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("code", { className: "font-mono text-foreground", children: resolvedTheme })
    ] })
  ] });
}
export {
  Demo as default,
  meta
};
